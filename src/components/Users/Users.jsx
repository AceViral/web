import s from "./Users.module.css";
import userPhoto from "../../assets/images/person.png";
import { NavLink } from "react-router-dom";

let Users = (props) => {
   return (
      <div>
         {props.users.map((users) => (
            <div key={users.id} className={s.userBlock}>
               <NavLink to={"/profile/" + users.id}>
                  <img
                     src={
                        users.photos.small != null
                           ? users.photos.small
                           : userPhoto
                     }
                     alt="usersPhoto"
                     className={s.userPhoto}
                  />
               </NavLink>
               <div className={s.userInfo}>{users.name}</div>
               <div>
                  {users.followed ? (
                     <a
                        className={s.userFollowUnfollow}
                        disabled={props.followingInProgress.some(
                           (id) => id === users.id
                        )}
                        onClick={() => {
                           props.unfollow(users.id);
                        }}
                     >
                        Unfollow
                     </a>
                  ) : (
                     <a
                        className={s.userFollowUnfollow}
                        disabled={props.followingInProgress.some(
                           (id) => id === users.id
                        )}
                        onClick={() => {
                           props.follow(users.id);
                        }}
                     >
                        Follow
                     </a>
                  )}
               </div>
            </div>
         ))}
      </div>
   );
};

export default Users;
