import s from "../Profile.module.scss";
import Preloader from "../../common/Preloader/Preloader";
import ProfileStatusWithHoooks from "./ProfileStatusWithHoooks";
import userPhoto from "../../../assets/images/person.png";
import "boxicons";
import UploadFileInput from "./UploadFileInput";

const ProfileInfo = (props) => {
   if (!props.profile) {
      return <Preloader />;
   }

   const onMainPhotoSelected = (e) => {
      if (e.target.files.length) {
         props.savePhoto(e.target.files[0]);
      }
   };

   return (
      <div className={s.descriptionBlock}>
         <h3>{props.profile.fullName}</h3>
         <img src={props.profile.photos.large || userPhoto} alt={"userPhoto"} />
         {props.isOwner && (
            <UploadFileInput onMainPhotoSelected={onMainPhotoSelected} />
         )}
         <ProfileStatusWithHoooks
            status={props.status}
            updateStatus={props.updateStatus}
         />
      </div>
   );
};

export default ProfileInfo;
