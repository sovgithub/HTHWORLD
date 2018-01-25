/**
|--------------------------------------------------
| Login Component - connected to redux, and passes
| state & actions to ./Login component.
|--------------------------------------------------
*/
import { connect } from "react-redux";
import loginRequest from "./actions";

import Login from "./Login";

function mapStateToProps(state) {
  return { login: state.login };
}

export default connect(mapStateToProps, { loginRequest })(Login);
