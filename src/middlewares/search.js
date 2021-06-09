/* eslint-disable no-console */
import axios from 'axios';

import {
  SUBMIT_SEARCH, setTrackSearch, searchError, setIsLoading,
} from 'src/store/actions';

const searchMiddleware = (store) => (next) => (action) => {
  if (action.type === SUBMIT_SEARCH) {
    const { searchValue, accessToken } = store.getState();
    const config = {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    };
    store.dispatch(setIsLoading(true));
    axios.get(`https://api.spotify.com/v1/search?q=${searchValue}&type=track&market=FR&limit=20&offset=0`, config).then((response) => {
      const trackResults = response.data.tracks.items;
      store.dispatch(setTrackSearch(trackResults));
    }).catch((error) => {
      console.log(error.response.data);
      store.dispatch(searchError(error.response.data.error.message));
    }).finally(() => {
      store.dispatch(setIsLoading(false));
    });
  }
  next(action);
};

export default searchMiddleware;
