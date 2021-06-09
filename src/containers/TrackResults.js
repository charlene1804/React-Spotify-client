import { connect } from 'react-redux';

import TrackResults from 'src/components/TrackResults';

const mapStateToProps = (state) => ({
  results: state.trackSearch,
  errorMessage: state.errorMessage,
});

export default connect(mapStateToProps)(TrackResults);
