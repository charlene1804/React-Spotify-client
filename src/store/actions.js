/* eslint-disable object-shorthand */
export const CHANGE_FIELD = 'CHANGE_FIELD';
export const SUBMIT_SEARCH = 'SUBMIT_SEARCH';
export const SET_TRACKSEARCH = 'SET_TRACKSEARCH';
export const SEARCH_ERROR = 'SEACH_ERROR';
export const SET_ISLOADING = 'SET_ISLOADING';

export const changeField = (field, text) => ({
  type: CHANGE_FIELD,
  field: field,
  text: text,
});

export const submitSearch = () => ({
  type: SUBMIT_SEARCH,
});

export const setTrackSearch = (results) => ({
  type: SET_TRACKSEARCH,
  results: results,
});

export const searchError = (message) => ({
  type: SEARCH_ERROR,
  message: message,
});

export const setIsLoading = (value) => ({
  type: SET_ISLOADING,
  value: value,
});
