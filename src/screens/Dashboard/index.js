import {connect} from 'react-redux';
import Dashboard from './Dashboard';
import {showReceiveModal} from 'containers/ReceiveModal/actions';
import {showSendModal} from 'containers/SendModal/actions';

const mapStateToProps = () => ({});

const mapDispatchToProps = {
  showReceiveModal,
  showSendModal
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
