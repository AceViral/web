import React from "react";
import s from "../Profile.module.scss";

const UploadFileInput = ({ onMainPhotoSelected }) => {
   return (
      <div className={s.inputWrapper}>
         <input
            type={"file"}
            onChange={onMainPhotoSelected}
            id={"fileInputID"}
            className={s.fileInput}
            multiple
         />
         <label className={s.fileInputLabel} for={"fileInputID"}>
            <box-icon name="upload" color="#61dbfb"></box-icon>
         </label>
      </div>
   );
};

export default UploadFileInput;
