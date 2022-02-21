import {
   onSendMessage,
   updateNewMessageBody,
} from "../../redux/dialogs-reducer";
import { connect } from "react-redux";
import { withAuthRedirect } from "../../hoc/AuthRedirect";
import Dialogs from "./Dialogs.jsx";
import { compose } from "redux";

let mapStateToProps = (state) => {
   return {
      dialogsPage: state.dialogsPage,
      profile: state.profilePage.profile,
      login: state.auth.login,
   };
};

export default compose(
   connect(mapStateToProps, { updateNewMessageBody, onSendMessage }),
   withAuthRedirect
)(Dialogs);
