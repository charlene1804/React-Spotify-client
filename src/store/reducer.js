import {
  CHANGE_FIELD, SET_TRACKSEARCH, SEARCH_ERROR, SET_ISLOADING,
} from './actions';

const initialState = {
  searchValue: '',
  accessToken: '',
  trackSearch: [],
  searchError: false,
  errorMessage: '',
  isLoading: false,
};

function reducer(oldState = initialState, action) {
  switch (action.type) {
    case CHANGE_FIELD:
      return {
        ...oldState,
        [action.field]: action.text,
        errorMessage: '',
      };
    case SET_TRACKSEARCH:
      return {
        ...oldState,
        trackSearch: action.results,
      };
    case SEARCH_ERROR:
      return {
        ...oldState,
        searchError: true,
        errorMessage: action.message,
      };
    case SET_ISLOADING:
      return {
        ...oldState,
        isLoading: action.value,
      };
    default:
      return { ...oldState };
  }
}

export default reducer;
