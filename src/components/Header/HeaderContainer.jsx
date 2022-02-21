import React from "react";
import { connect } from "react-redux";
import Header from "./Header";
import { logout } from "../../redux/auth-reducer";
import { getProfile, getStatus } from "../../redux/profile-reducer";
import { withRouter } from "react-router";
import { withAuthRedirect } from "../../hoc/AuthRedirect";
import { compose } from "redux";

class HeaderContainer extends React.Component {
   refreshProfile() {
      this.props.getProfile(this.props.match.params.userId);
      this.props.getStatus(this.props.match.params.userId);
   }

   componentDidMount() {
      this.refreshProfile();
   }

   componentDidUpdate(prevProps, prevState, snapshot) {
      if (this.props.match.params.userId !== prevProps.match.params.userId)
         this.refreshProfile();
   }
   render() {
      return <Header {...this.props} />;
   }
}

const mapStateToProps = (state) => {
   return {
      isAuth: state.auth.isAuth,
      login: state.auth.login,
      profile: state.profilePage.profile,
   };
};

export default compose(
   connect(mapStateToProps, { logout, getProfile, getStatus }),
   withRouter,
   withAuthRedirect
)(HeaderContainer);
