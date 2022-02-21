import React from "react";
import s from "./NotFound.module.scss";

const NotFound = () => {
   return (
      <div className={s.notFoundWrapper}>
         <box-icon
            name="react"
            type="logo"
            animation="tada"
            color="#61dbfb"
         ></box-icon>
         <h3>
            <box-icon name="code" color="#61dbfb"></box-icon>
            In progress...
            <box-icon name="code-alt" color="#61dbfb"></box-icon>
         </h3>
      </div>
   );
};

export default NotFound;
