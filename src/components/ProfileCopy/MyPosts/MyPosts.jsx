import { Formik, Field, Form } from "formik";
import React from "react";
import s from "../Profile.module.scss";
import Post from "./Post/Post";
import * as yup from "yup";

const MyPosts = (props) => {
   let postsElements = props.posts.map((post) => (
      <Post
         text={post.message}
         likesCount={post.likesCount}
         photos={props.photos}
      />
   ));

   let onAddPost = () => {
      props.addPost();
   };

   let onPostChange = (e) => {
      props.updateNewPostText(e.target.value);
   };
   return (
      <>
         <AddPostForm
            onPostChange={onPostChange}
            newPostText={props.newPostText}
            onAddPost={onAddPost}
         />
         <div className={s.posts}>{postsElements}</div>
      </>
   );
};

function AddPostForm(props) {
   const validate = yup.object({ post: yup.string().required("Обязательно") });
   return (
      <Formik
         initialValues={{ post: "" }}
         validateOnBlur
         validationSchema={validate}
      >
         {({ handleBlur, handleSubmit }) => (
            <Form onSubmit={handleSubmit}>
               <div className={s.postInput}>
                  <Field
                     component="textarea"
                     placeholder={"Post"}
                     name={"post"}
                     onBlur={handleBlur}
                     onChange={props.onPostChange}
                     value={props.newPostText}
                  />
                  <div className={s.postButton}>
                     <button
                        type="submit"
                        onClick={props.newPostText && props.onAddPost}
                     >
                        Add post
                     </button>
                  </div>
               </div>
            </Form>
         )}
      </Formik>
   );
}

export default MyPosts;
