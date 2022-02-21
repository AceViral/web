import { authAPI, securityAPI } from "../api/api";

const SET_USER_DATA = "social-network/auth/SET_USER_DATA";
const SET_MESSAGE = "social-network/auth/SET_MESSAGE";
const GET_CAPTCHA_URL_SUCCESS = "social-network/auth/GET_CAPTCHA_URL_SUCCESS";
let initialState = {
   userId: null,
   email: null,
   login: null,
   isAuth: false,
   messages: "",
   captchaUrl: null,
};

const authReducer = (state = initialState, action) => {
   switch (action.type) {
      case SET_USER_DATA:
         return { ...state, ...action.payload };
      case SET_MESSAGE:
         return {
            ...state,
            messages: action.message,
         };
      case GET_CAPTCHA_URL_SUCCESS:
         return { ...state, captchaUrl: action.captchaUrl };
      default:
         return state;
   }
};

export const setAuthUserData = (userId, email, login, isAuth) => ({
   type: SET_USER_DATA,
   payload: { userId, email, login, isAuth },
});
export const setMessages = (message) => ({ type: SET_MESSAGE, message });
export const getCaptchaUrlSuccess = (captchaUrl) => ({
   type: GET_CAPTCHA_URL_SUCCESS,
   captchaUrl,
});

// THUNK
export const getAuthUserData = () => async (dispatch) => {
   let responce = await authAPI.me();
   if (responce.resultCode === 0) {
      let { id, email, login } = responce.data;
      dispatch(setAuthUserData(id, email, login, true));
   }
};
export const login =
   (email, password, rememberMe, captcha) => async (dispatch) => {
      let responce = await authAPI.login(email, password, rememberMe, captcha);
      console.log(responce);
      if (responce.data.resultCode === 0) {
         dispatch(getAuthUserData());
      } else {
         if (responce.data.resultCode === 10) {
            dispatch(getCaptchaUrl());
         }
         dispatch(setMessages(responce.data.messages));
      }
   };
export const logout = () => async (dispatch) => {
   let responce = await authAPI.logout();
   if (responce.resultCode === 0) {
      dispatch(setAuthUserData(null, null, null, false));
   }
};

export const getCaptchaUrl = () => async (dispatch) => {
   let responce = await securityAPI.getCaptchaUrl();
   const captchaUrl = responce.url;
   dispatch(getCaptchaUrlSuccess(captchaUrl));
};

export default authReducer;
