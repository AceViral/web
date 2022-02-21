import s from "./Dialogs.module.scss";
import React from "react";
import userPhoto from "../../assets/images/person.png";
import "boxicons";
import DialogItem from "./DialogItem/DialogItem";
import { Redirect, Route, Switch } from "react-router-dom";
import MessageCopy from "./Message/Message";
import { Field, Form, Formik } from "formik";
import clsx from "clsx";

const DialogsCopy = (props) => {
   console.log(props.profile);
   // Input
   const [searchValue, setSearchValue] = React.useState("");
   const onChangeSearchInput = (event) => {
      setSearchValue(event.target.value);
   };
   //
   const state = props.dialogsPage;
   // Create message
   const newMessageBody = state.newMessageBody;
   const onSendMessageClick = () => {
      props.onSendMessage();
   };
   const onNewMessageChange = (e) => {
      let body = e.target.value;
      props.updateNewMessageBody(body);
   };
   // Redirect
   if (!props.isAuth) return <Redirect to={"/login"} />;
   // Create a dialogs
   const renderItems = () => {
      return state.dialogs
         .filter((dialog) =>
            dialog.name.toLowerCase().includes(searchValue.toLowerCase())
         )
         .map((dialog) => (
            <DialogItem name={dialog.name} key={dialog.id} id={dialog.id} />
         ));
   };
   return (
      <div className={s.container}>
         <div className={s.leftSide}>
            <div className={s.header}>
               <div className={s.userImg}>
                  <img src={props.profile.photos.large} alt="" />
               </div>
               <h3>{props.login}</h3>
            </div>
            <div className={s.searchChat}>
               <div>
                  <input
                     type="text"
                     placeholder="Search or start new Chat"
                     value={searchValue}
                     onChange={onChangeSearchInput}
                  />
                  <box-icon name="search-alt" color="#61dbfb"></box-icon>
               </div>
            </div>
            <div className={s.chatList}>{renderItems()}</div>
         </div>

         <div className={s.rightSide}>
            <Switch>
               <Route
                  path={`/dialogs/:id`}
                  component={(props) => {
                     const userName = state.dialogs.find(
                        (dialog) =>
                           Number(dialog.id) === Number(props.match.params.id)
                     ).name;
                     const friendsMessagesElements = state.dialogs
                        .find(
                           (dialog) =>
                              Number(dialog.id) ===
                              Number(props.match.params.id)
                        )
                        .messages.map((message) => (
                           <MessageCopy
                              text={message.message}
                              key={message.id}
                              id={message.id}
                              isFriend={true}
                           />
                        ));
                     const myMessageElements = state.messages.map((message) => (
                        <MessageCopy
                           text={message.message}
                           key={message.id}
                           id={message.id}
                           isFriend={false}
                        />
                     ));
                     return (
                        <>
                           <div className={s.header}>
                              <div className={s.imgText}>
                                 <div className={s.userImg}>
                                    <img src={userPhoto} alt="" />
                                 </div>
                                 <h4>{userName}</h4>
                              </div>
                           </div>
                           <div className={s.chatBox}>
                              {friendsMessagesElements}
                              {myMessageElements}
                           </div>
                        </>
                     );
                  }}
               />
               <Route
                  path="/dialogs"
                  component={() => {
                     return (
                        <div>
                           {" "}
                           <div className={s.header}></div>
                           <div className={clsx(s.chatBox, s.chatBoxInLoad)}>
                              <div>
                                 <box-icon
                                    name="message-square-add"
                                    color="#61dbfb"
                                 ></box-icon>
                                 <h3>Start a new chat</h3>
                              </div>
                           </div>
                        </div>
                     );
                  }}
               />
            </Switch>
            <AddMessageForm
               onNewMessageChange={onNewMessageChange}
               newMessageBody={newMessageBody}
               onSendMessageClick={onSendMessageClick}
            />
         </div>
      </div>
   );
};
const AddMessageForm = (props) => {
   return (
      <Formik initialValues={{ message: "" }}>
         <Form>
            <div className={s.chatBox_input}>
               <box-icon name="wink-smile" color="#61dbfb"></box-icon>
               <box-icon name="paperclip" color="#61dbfb"></box-icon>
               <Field
                  component="input"
                  onChange={props.onNewMessageChange}
                  value={props.newMessageBody}
                  name={"message"}
                  placeholder="Type a message"
                  autocomplete="off"
               ></Field>
               <box-icon
                  name="send"
                  color="#61dbfb"
                  onClick={props.newMessageBody && props.onSendMessageClick}
                  type="submit"
               ></box-icon>
            </div>
         </Form>
      </Formik>
   );
};
export default DialogsCopy;
