import {
  ADD_TODO_FAILURE,
  ADD_TODO_REQUEST,
  ADD_TODO_SUCCESS,
  DELETE_TODO_FAILURE,
  DELETE_TODO_REQUEST,
  DELETE_TODO_SUCCESS,
  GET_TODO_FAILURE,
  GET_TODO_REQUEST,
  GET_TODO_SUCCESS,
  TOGGLE_TODO_FAILURE,
  TOGGLE_TODO_REQUEST,
  TOGGLE_TODO_REQUEST_CLEAR,
  TOGGLE_TODO_SUCCESS,
  UPDATE_ADD_TODO_REQUEST,
  UPDATE_DELETE_TODO_REQUEST,
} from "./actionType";
const initState = {
  todos: [],
  isLoading: false,
  isUpdated: false,
  isDeleted: false,
  isError: false,
  isToggled: false,
};
export const reducer = (state = initState, action) => {
  switch (action.type) {
    case GET_TODO_REQUEST:
    case ADD_TODO_REQUEST:
    case DELETE_TODO_REQUEST:
    case TOGGLE_TODO_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case ADD_TODO_SUCCESS:
      return {
        ...state,
        isUpdated: true,
        isLoading: false,
      };
    case GET_TODO_SUCCESS:
      return {
        ...state,
        isLoading: false,
        todos: action.payload,
      };
    case TOGGLE_TODO_SUCCESS: {
      return {
        ...state,
        isToggled: true,
        todos: action.payload,
      };
    }
    case DELETE_TODO_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isDeleted: true,
      };
    case GET_TODO_FAILURE:
    case ADD_TODO_FAILURE:
    case DELETE_TODO_FAILURE:
    case TOGGLE_TODO_FAILURE:
      return {
        ...state,
        isLoading: false,
        isError: true,
      };

    case UPDATE_ADD_TODO_REQUEST:
      return {
        ...state,
        isUpdated: false,
      };
    case UPDATE_DELETE_TODO_REQUEST:
      return {
        ...state,
        isDeleted: false,
      };
    case TOGGLE_TODO_REQUEST_CLEAR:
      return {
        ...state,
        isToggled: false,
      };
    default:
      return state;
  }
};
