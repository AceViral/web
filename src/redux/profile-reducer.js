import { usersAPI, profileAPI } from "../api/api";

const ADD_POST = "social-network/profile/ADD-POST";
const UPDATE_NEW_POST_TEXT = "social-network/profile/UPDATE-NEW-POST-TEXT";
const SET_USER_PROFILE = "social-network/profile/SET-USER-PROFILE";
const SET_STATUS = "social-network/profile/SET_STATUS";
const SAVE_PHOTO_SUCCESS = "social-network/profile/SAVE_PHOTO_SUCCESS";
const SET_MESSAGE = "social-network/profile/SET_MESSAGE";

let initialState = {
   posts: [
      { id: 1, message: "Hello", likesCount: 12 },
      { id: 2, message: "Hi", likesCount: 13 },
      { id: 3, message: "How are you?", likesCount: 10 },
      { id: 4, message: "I'm fine, and you?", likesCount: 15 },
      { id: 5, message: "I'm well", likesCount: 2 },
      { id: 6, message: "Bye", likesCount: 5 },
   ],
   newPostText: "",
   profile: null,
   status: "",
   messages: "",
};

const profileReducer = (state = initialState, action) => {
   switch (action.type) {
      case ADD_POST:
         let newPost = {
            id: 5,
            message: state.newPostText,
            likesCount: 0,
         };
         return {
            ...state,
            posts: [newPost, ...state.posts],
            newPostText: "",
         };
      case UPDATE_NEW_POST_TEXT:
         return {
            ...state,
            newPostText: action.newText,
         };
      case SET_USER_PROFILE:
         return {
            ...state,
            profile: { ...state.profile, ...action.profile },
         };
      case SET_STATUS:
         return {
            ...state,
            status: action.status,
         };
      case SAVE_PHOTO_SUCCESS:
         return {
            ...state,
            profile: { ...state.profile, photos: action.photos },
         };
      case SET_MESSAGE:
         return {
            ...state,
            messages: action.message,
         };
      default:
         return state;
   }
};

export const addPost = () => ({
   type: ADD_POST,
});
export const updateNewPostText = (text) => ({
   type: UPDATE_NEW_POST_TEXT,
   newText: text,
});
export const setUserProfile = (profile) => ({
   type: SET_USER_PROFILE,
   profile,
});
export const setStatus = (status) => ({
   type: SET_STATUS,
   status,
});
export const savePhotoSuccess = (photos) => ({
   type: SAVE_PHOTO_SUCCESS,
   photos,
});
export const setMessages = (message) => ({ type: SET_MESSAGE, message });
//THUNK
export const getProfile = (userId) => async (dispatch, getState) => {
   if (!userId) userId = getState().auth.userId;
   let responce = await usersAPI.getProfile(userId);
   dispatch(setUserProfile(responce));
};
export const getStatus = (userId) => async (dispatch, getState) => {
   if (!userId) userId = getState().auth.userId;
   let responce = await profileAPI.getStatus(userId);
   dispatch(setStatus(responce));
};
export const updateStatus = (status) => async (dispatch) => {
   let responce = await profileAPI.updateStatus(status);
   if (responce.resultCode === 0) dispatch(setStatus(responce.status));
};
export const savePhoto = (file) => async (dispatch) => {
   let responce = await profileAPI.savePhoto(file);
   if (responce.resultCode === 0)
      dispatch(savePhotoSuccess(responce.data.photos));
};
export const saveProfile = (profile) => async (dispatch, getState) => {
   const userId = getState().auth.userId;
   let responce = await profileAPI.saveProfile(profile);
   if (responce.resultCode === 0) {
      dispatch(getProfile(userId));
      dispatch(setMessages(null));
   } else {
      dispatch(setMessages(responce.messages));
      return Promise.reject(responce.messages);
   }
};
export default profileReducer;
