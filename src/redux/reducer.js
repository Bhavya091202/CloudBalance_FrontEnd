import { SET_USER_DATA, CLEAR_USER_DATA } from "./action";

const initialState = {
    firstName:null,
    lastName:null,
    role:null,
};

const userReducer = (state = initialState, action) => {

  switch (action.type) {
    
    case SET_USER_DATA:
      return {
        ...state,
        firstName: action.payload.firstName,
        lastName: action.payload.lastName,
        role: action.payload.role
      };
    
      case CLEAR_USER_DATA:
      return {
        ...state,
        firstName:null,
        lastName:null,
        role:null,
      };
    
      default:
      return state;
  }
};

export default userReducer;
