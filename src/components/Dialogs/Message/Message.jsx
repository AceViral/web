import s from "../Dialogs.module.scss";
import clsx from "clsx";

const MessageCopy = (props) => {
   console.log(props.class);
   return (
      <div
         className={clsx(
            s.message,
            props.isFriend ? s.friend_message : s.my_message
         )}
      >
         <p>{props.text}</p>
      </div>
   );
};

export default MessageCopy;
