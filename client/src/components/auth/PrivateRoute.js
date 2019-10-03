import React from "react";
import { connect } from "react-redux";
import { Route, Redirect, withRouter } from "react-router-dom";

const PrivateRoute = ({ component, auth, ...rest }) => {
  let ComponentToRender = component;

  return (
    <Route
      {...rest}
      render={props =>
        auth
          ? console.log("Trying to render component") || <ComponentToRender {...props} />
          : console.log("Redirected") || <Redirect to={{ pathname: "/", state: { from: props.location } }} />
      }
    />
  );
};

const mapStateToProps = (state, ownProps) => ({ auth: state.auth.isAuthenticated });
export default withRouter(connect(mapStateToProps)(PrivateRoute));
