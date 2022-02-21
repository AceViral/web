import { usersAPI } from "../api/api";
import { updateObjectInArray } from "../utils/object-helpers";

const FOLLOW = "social-network/users/FOLLOW";
const UNFOLLOW = "social-network/users/UNFOLLOW";
const SET_USERS = "social-network/users/SET-USERS";
const SET_CURRENT_PAGE = "social-network/users/SET-CURRENT-PAGE";
const SET_TOTAL_USERS_COUNT = "social-network/users/SET-TOTAL-USERS-COUNT";
const TOGGLE_IS_FETCHING = "social-network/users/TOGGLE-IS-FETCHING";
const TOGGLE_IS_FOLLOWING_PROGRESS =
   "social-network/users/TOGGLE_IS_FOLLOWING_PROGRESS";

let initialState = {
   users: [],
   pageSize: 8,
   totalUsersCount: 0,
   currentPage: 1,
   isFetching: false,
   followingInProgress: [],
};

const usersReducer = (state = initialState, action) => {
   let stateCopy;

   switch (action.type) {
      case FOLLOW:
         return {
            ...state,
            users: updateObjectInArray(state.users, action.userId, "id", {
               followed: true,
            }),
         };
      case UNFOLLOW:
         return {
            ...state,
            users: updateObjectInArray(state.users, action.userId, "id", {
               followed: false,
            }),
         };
      case SET_USERS:
         return {
            ...state,
            users: action.users,
         };
      case SET_CURRENT_PAGE:
         return { ...state, currentPage: action.currentPage };
      case SET_TOTAL_USERS_COUNT:
         return { ...state, totalUsersCount: action.count };
      case TOGGLE_IS_FETCHING:
         return { ...state, isFetching: action.isFetching };
      case TOGGLE_IS_FOLLOWING_PROGRESS:
         return {
            ...state,
            followingInProgress: action.toggleFollowingInProgress
               ? [...state.followingInProgress, action.userId]
               : [
                    state.followingInProgress.filter(
                       (id) => id != action.userId
                    ),
                 ],
         };
      default:
         return state;
   }
   return state;
};

export const acceptFollow = (userId) => ({ type: FOLLOW, userId });
export const acceptUnfollow = (userId) => ({ type: UNFOLLOW, userId });
export const setUsers = (users) => ({ type: SET_USERS, users });
export const setCurrentPage = (currentPage) => ({
   type: SET_CURRENT_PAGE,
   currentPage,
});
export const setTotalUsersCount = (totalUsersCount) => ({
   type: SET_TOTAL_USERS_COUNT,
   count: totalUsersCount,
});
export const toggleIsFetching = (isFetching) => ({
   type: TOGGLE_IS_FETCHING,
   isFetching,
});
export const toggleFollowingInProgress = (followingInProgress, userId) => ({
   type: TOGGLE_IS_FOLLOWING_PROGRESS,
   followingInProgress,
   userId,
});
// THUNK
export const getUsers = (currentPage, pageSize) => async (dispatch) => {
   dispatch(toggleIsFetching(true));
   let responce = await usersAPI.getUsers(currentPage, pageSize);
   dispatch(toggleIsFetching(false));
   dispatch(setUsers(responce.items));
   dispatch(setTotalUsersCount(responce.totalCount));
};

const followUnfollowFlow = async (
   dispatch,
   usersId,
   apiMethod,
   actionCreator
) => {
   dispatch(toggleFollowingInProgress(true, usersId));
   let responce = await apiMethod(usersId);
   if (responce.resultCode === 0) {
      dispatch(actionCreator(usersId));
   }
   dispatch(toggleFollowingInProgress(false, usersId));
};

export const follow = (usersId) => async (dispatch) => {
   followUnfollowFlow(
      dispatch,
      usersId,
      usersAPI.followUser.bind(usersAPI),
      acceptFollow
   );
};
export const unfollow = (usersId) => async (dispatch) => {
   followUnfollowFlow(
      dispatch,
      usersId,
      usersAPI.unfollowUser.bind(usersAPI),
      acceptUnfollow
   );
};

export default usersReducer;
