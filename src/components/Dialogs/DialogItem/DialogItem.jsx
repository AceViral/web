import React from "react";
import userPhoto from "../../../assets/images/person.png";
import s from "../Dialogs.module.scss";
import { NavLink } from "react-router-dom";

const DialogItemCopy = (props) => {
   return (
      <NavLink
         to={"/dialogs/" + props.id}
         className={s.block}
         activeClassName={s.active}
      >
         <div className={s.imgbx}>
            <img src={userPhoto} alt="userPhoto" />
         </div>
         <div className={s.details}>
            <div className={s.listHead}>
               <h4>{props.name}</h4>
            </div>
            <div className={s.message_p}>
               <p></p>
            </div>
         </div>
      </NavLink>
   );
};

export default DialogItemCopy;
