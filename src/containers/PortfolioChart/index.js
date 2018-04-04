import {connect} from 'react-redux';
import PortfolioChart from './PortfolioChart';

const mapStateToProps = ({transactions, wallet, pricing}) => ({
  transactions,
  wallet,
  pricing
});

const mapDispatchToProps = {
};

export default connect(mapStateToProps, mapDispatchToProps)(PortfolioChart);
