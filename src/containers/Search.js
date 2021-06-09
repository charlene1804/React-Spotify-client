import { connect } from 'react-redux';

import Search from 'src/components/Search';

import { changeField, submitSearch } from 'src/store/actions';

const mapStateToProps = (state) => ({
  searchValue: state.searchValue,
  accessToken: state.accessToken,
  isLoading: state.isLoading,
});

const mapDispatchToProps = (dispatch) => ({
  setSearchValue: (value) => {
    dispatch(changeField('searchValue', value));
  },
  handleSubmit: () => {
    dispatch(submitSearch());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Search);
