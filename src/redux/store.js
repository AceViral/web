import dialogsReducer from "./dialogs-reducer";
import profileReducer from "./profile-reducer";
import sidebarReducer from "./sidebar-reducer";

let store = {
  _state: {
    profilePage: {
      posts: [
        { id: 1, message: "Hello", likesCount: 12 },
        { id: 2, message: "Hi", likesCount: 13 },
        { id: 3, message: "How are you?", likesCount: 10 },
        { id: 4, message: "I'm fine, and you?", likesCount: 15 },
        { id: 5, message: "I'm well", likesCount: 2 },
        { id: 6, message: "Bye", likesCount: 5 },
      ],
      newPostText: "",
    },
    dialogsPage: {
      dialogs: [
        { id: 1, name: "Sasha" },
        { id: 2, name: "Vadim" },
        { id: 3, name: "Kirill" },
        { id: 4, name: "Gulnaz" },
        { id: 5, name: "Valeria" },
        { id: 6, name: "Bulat" },
      ],
      messages: [
        { id: 1, message: "Hello" },
        { id: 2, message: "Hi" },
        { id: 3, message: "How are you?" },
        { id: 4, message: "I'm fine, and you?" },
        { id: 5, message: "I'm well" },
        { id: 6, message: "Bye" },
      ],
      newMessageBody: "",
    },
    sidebar: {},
  },
  _callSubscriber() {},

  getState() {
    return this._state;
  },
  subscribe(observer) {
    this._callSubscriber = observer;
  },

  dispatch(action) {
    this._state.dialogsPage = dialogsReducer(this._state.dialogsPage, action);
    this._state.profilePage = profileReducer(this._state.profilePage, action);
    this._state.sidebar = sidebarReducer(this._state.sidebar, action);
    this._callSubscriber(this._state);
  },
};

export default store;
window.store = store;
