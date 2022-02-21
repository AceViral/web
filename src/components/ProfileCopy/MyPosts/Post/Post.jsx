import s from "../../Profile.module.scss";
import userPhoto from "../../../../assets/images/person.png";
const PostC = (props) => {
   return (
      <div className={s.item}>
         <img src={props.photos.large || userPhoto} alt={userPhoto} />
         <div className={s.frame}>
            <p>{props.text}</p>
         </div>
      </div>
   );
};

export default PostC;
