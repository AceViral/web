const UPDATE_NEW_MESSAGE_BODY =
   "social-network/dialogs/UPDATE-NEW-MESSAGE-BODY";
const SEND_MESSAGE = "social-network/dialogs/SEND-MESSAGE";

let initialState = {
   dialogs: [
      { id: 1, name: "Valeria", messages: [{ id: 1, message: "I love you" }] },
      {
         id: 2,
         name: "Sasha",
         messages: [{ id: 2, message: "Where is Ilsaf?" }],
      },
      {
         id: 3,
         name: "Kirill",
         messages: [{ id: 3, message: "Hello" }],
      },
      {
         id: 4,
         name: "Bulat",
         messages: [{ id: 3, message: "I am a frontend developer" }],
      },
      {
         id: 5,
         name: "Ilsaf",
         messages: [{ id: 3, message: "How are you?" }],
      },
      {
         id: 6,
         name: "Artur",
         messages: [{ id: 3, message: "I am in Kazan!" }],
      },
   ],
   messages: [],
   newMessageBody: "",
};

const dialogsReducer = (state = initialState, action) => {
   let stateCopy;

   switch (action.type) {
      case UPDATE_NEW_MESSAGE_BODY:
         stateCopy = { ...state, newMessageBody: action.body };
         return stateCopy;
      case SEND_MESSAGE:
         let body = state.newMessageBody;
         stateCopy = {
            ...state,
            messages: [...state.messages, { id: 7, message: body }],
            newMessageBody: "",
         };
         console.log(stateCopy.dialogs);
         return stateCopy;
      default:
         return state;
   }
};

export const onSendMessage = () => ({
   type: SEND_MESSAGE,
});
export const updateNewMessageBody = (body) => ({
   type: UPDATE_NEW_MESSAGE_BODY,
   body: body,
});

export default dialogsReducer;
