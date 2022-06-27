import axios from "axios";
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
  TOGGLE_TODO_SUCCESS,
} from "./actionType";

export const getTodo = () => async (dispatch) => {
  try {
    dispatch({ type: GET_TODO_REQUEST });

    const { data } = await axios.get(
      "https://json-server-mocker-masai.herokuapp.com/tasks"
    );
    // console.log(data, "success");
    dispatch({ type: GET_TODO_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: GET_TODO_FAILURE, payload: error.message });
  }
};

export const addTodo = (payload) => async (dispatch) => {
  try {
    dispatch({ type: ADD_TODO_REQUEST });
    // console.log("inside addtodo");
    const data = await axios.post(
      "https://json-server-mocker-masai.herokuapp.com/tasks",
      payload
    );
    // console.log(data, "data in success");
    dispatch({ type: ADD_TODO_SUCCESS });
  } catch (error) {
    dispatch({ type: ADD_TODO_FAILURE });
  }
};

export const deleteTodo = (payload) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_TODO_REQUEST });
    const data = await axios.delete(
      `https://json-server-mocker-masai.herokuapp.com/tasks/${payload}`
    );
    // console.log(data, "delete todo");
    dispatch({ type: DELETE_TODO_SUCCESS });
  } catch (error) {
    dispatch({ type: DELETE_TODO_FAILURE, payload: error.message });
  }
};

export const toggleTodo = (payload) => async (dispatch) => {
  try {
    dispatch({ type: TOGGLE_TODO_REQUEST });
    const { data: itemData } = await axios.get(
      `https://json-server-mocker-masai.herokuapp.com/tasks/${payload}`
    );
    // console.log(itemData, "itemdata");
    const data = await axios.put(
      `https://json-server-mocker-masai.herokuapp.com/tasks/${payload}`,
      { ...itemData, status: !itemData.status }
    );
    // console.log(data, "TOGGLE todo");
    dispatch({ type: TOGGLE_TODO_SUCCESS });
  } catch (error) {
    dispatch({ type: TOGGLE_TODO_FAILURE, payload: error.message });
  }
};
