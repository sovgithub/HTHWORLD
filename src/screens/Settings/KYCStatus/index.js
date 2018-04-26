import { connect } from 'react-redux';

import KYCStatus from './KYCStatus';

import { documentVerificationRequest } from 'screens/Settings/actions';

function mapStateToProps(state) {
  return { kyc: state.kyc };
}

const mapDispatchToProps = {
  documentVerificationRequest
};

export default connect(mapStateToProps, mapDispatchToProps)(KYCStatus);