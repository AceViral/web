import s from "./Profile.module.scss";
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import ProfileDataForm from "./ProfileInfo/ProfileDataForm";
import { useState } from "react";
import MyPostsContainer from "./MyPosts/MyPostsСontainer";

const Profile = (props) => {
   let [editMode, setEditMode] = useState(false);
   const onSubmit = async (formData) => {
      await props.saveProfile(formData).then(() => {
         setEditMode(false);
      });
   };
   console.log(props.profile);
   return (
      <div className={s.profile}>
         <div className={s.leftSide}>
            <ProfileInfo
               isOwner={props.isOwner}
               profile={props.profile}
               status={props.status}
               updateStatus={props.updateStatus}
               savePhoto={props.savePhoto}
               saveProfile={props.saveProfile}
               messages={props.messages}
            />
         </div>
         <div className={s.rightSide}>
            {editMode ? (
               <ProfileDataForm
                  profile={props.profile}
                  onSubmit={onSubmit}
                  messages={props.messages}
               />
            ) : (
               <ProfileData
                  profile={props.profile}
                  isOwner={props.isOwner}
                  goToEditMode={() => {
                     setEditMode(true);
                  }}
               />
            )}
            <div className={s.postWrapper}>
               <MyPostsContainer />
            </div>
         </div>
      </div>
   );
};
const ProfileData = ({ profile, isOwner, goToEditMode }) => {
   return (
      <div className={s.informationWrapper}>
         {isOwner ? (
            <div className={s.editButtonWrapper}>
               <button onClick={goToEditMode} className={s.editButton}>
                  Edit
               </button>
            </div>
         ) : null}
         <div className={s.informationBlock}>
            <div className={s.informationBlockElement}>
               <b className={s.desctiption}>Мое полное имя: </b>
               <b className={s.information}>{profile.fullName}</b>
            </div>
            <div className={s.informationBlockElement}>
               <b className={s.desctiption}>Обо мне: </b>
               <b className={s.information}>{profile.aboutMe}</b>
            </div>
            <div className={s.informationBlockElement}>
               <b className={s.desctiption}>Ищу ли я работу? </b>
               <b className={s.information}>
                  {profile.lookingForAJob ? (
                     <>Да я ищу работу</>
                  ) : (
                     <>Нет я не ищу работу</>
                  )}
               </b>
            </div>
            <div className={s.informationBlockElement}>
               <b className={s.desctiption}>Что я делаю для этого? </b>
               <b className={s.information}>
                  {profile.lookingForAJobDescription}
               </b>
            </div>
            <div className={s.contactsBlockElement}>
               <div>
                  <a href={profile.contacts.vk}>
                     <box-icon
                        type="logo"
                        name="vk"
                        color={profile.contacts.vk ? "#61dbfb" : "#5e5c5c"}
                     ></box-icon>
                  </a>
                  <a href={profile.contacts.facebook}>
                     <box-icon
                        type="logo"
                        name="facebook"
                        color={
                           profile.contacts.facebook ? "#61dbfb" : "#5e5c5c"
                        }
                     ></box-icon>
                  </a>
                  <a href={profile.contacts.website}>
                     <box-icon
                        name="sitemap"
                        color={profile.contacts.website ? "#61dbfb" : "#5e5c5c"}
                     ></box-icon>
                  </a>
                  <a href={profile.contacts.twitter}>
                     <box-icon
                        name="twitter"
                        type="logo"
                        color={profile.contacts.twitter ? "#61dbfb" : "#5e5c5c"}
                     ></box-icon>
                  </a>
               </div>
               <div>
                  <a href={profile.contacts.instagram}>
                     <box-icon
                        name="instagram-alt"
                        type="logo"
                        color={
                           profile.contacts.instagram ? "#61dbfb" : "#5e5c5c"
                        }
                     ></box-icon>
                  </a>
                  <a href={profile.contacts.youtube}>
                     <box-icon
                        name="youtube"
                        type="logo"
                        color={profile.contacts.youtube ? "#61dbfb" : "#5e5c5c"}
                     ></box-icon>
                  </a>
                  <a href={profile.contacts.github}>
                     <box-icon
                        name="github"
                        type="logo"
                        color={profile.contacts.github ? "#61dbfb" : "#5e5c5c"}
                     ></box-icon>
                  </a>
                  <a href={profile.contacts.mainLink}>
                     <box-icon
                        name="link"
                        color={
                           profile.contacts.mainLink ? "#61dbfb" : "#5e5c5c"
                        }
                     ></box-icon>
                  </a>
               </div>
            </div>
         </div>
      </div>
   );
};
export default Profile;
