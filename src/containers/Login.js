import { connect } from 'react-redux';

import Login from 'src/components/Login';

import { changeField } from 'src/store/actions';

const mapStateToProps = (state) => ({
  accessToken: state.accessToken,
});

const mapDispatchToProps = (dispatch) => ({
  setAccessToken: (value) => {
    dispatch(changeField('accessToken', value));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
