import React from "react";
import Profile from "./Profile";
import { connect } from "react-redux";
import {
   getProfile,
   getStatus,
   updateStatus,
   savePhoto,
   saveProfile,
} from "../../redux/profile-reducer";
import { withRouter } from "react-router";
import { withAuthRedirect } from "../../hoc/AuthRedirect";
import { compose } from "redux";

class ProfileContainer extends React.Component {
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
      return (
         <Profile
            {...this.props}
            isOwner={!this.props.match.params.userId}
            profile={this.props.profile}
            status={this.props.status}
            updateStatus={this.props.updateStatus}
            savePhoto={this.props.savePhoto}
            saveProfile={this.props.saveProfile}
         />
      );
   }
}

let mapStateToProps = (state) => ({
   profile: state.profilePage.profile,
   status: state.profilePage.status,
   messages: state.profilePage.messages,
});
export default compose(
   connect(mapStateToProps, {
      getProfile,
      getStatus,
      updateStatus,
      savePhoto,
      saveProfile,
   }),
   withRouter,
   withAuthRedirect
)(ProfileContainer);
