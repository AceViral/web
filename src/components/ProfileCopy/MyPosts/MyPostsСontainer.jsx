import { connect } from "react-redux";
import { addPost, updateNewPostText } from "../../../redux/profile-reducer";
import MyPosts from "./MyPosts";

let mapStateToProps = (state) => {
   return {
      photos: state.profilePage.profile.photos,
      posts: state.profilePage.posts,
      newPostText: state.profilePage.newPostText,
   };
};

const MyPostsContainerC = connect(mapStateToProps, {
   updateNewPostText,
   addPost,
})(MyPosts);

export default MyPostsContainerC;
