import { getAuthUserData } from "./auth-reducer";

const SET_INITIALIZED = "SET_INITIALIZED";

let initialState = {
   initialized: false,
};

const appReducer = (state = initialState, action) => {
   switch (action.type) {
      case SET_INITIALIZED:
         return { ...state, initialized: true };
      default:
         return state;
   }
};

export const initializedSuccess = () => ({
   type: SET_INITIALIZED,
});
// THUNK
export const initializeApp = () => async (dispatch) => {
   await dispatch(getAuthUserData());
   dispatch(initializedSuccess());
};

export default appReducer;
