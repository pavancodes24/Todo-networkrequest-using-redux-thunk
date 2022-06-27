import { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux";
import { addTodo, deleteTodo, getTodo, toggleTodo } from "../redux/action";
import { TOGGLE_TODO_REQUEST_CLEAR, UPDATE_ADD_TODO_REQUEST, UPDATE_DELETE_TODO_REQUEST } from "../redux/actionType";

export const Todo = () => {
    const { todos, isLoading, isUpdated, isError, isDeleted, isToggled } = useSelector(state => state)
    const [query, setQuery] = useState("");
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getTodo())
        if (isUpdated) {
            dispatch({ type: UPDATE_ADD_TODO_REQUEST })
        }
        if (isDeleted) {
            dispatch({ type: UPDATE_DELETE_TODO_REQUEST })
        }
        if (isToggled) {
            dispatch({ type: TOGGLE_TODO_REQUEST_CLEAR })
        }
    }, [dispatch, isUpdated, isDeleted, isToggled])
    const handleAdd = () => {
        const payload = {
            title: query,
            status: false
        }
        dispatch(addTodo(payload))
        setQuery("")
    }
    const handleDelete = (id) => {
        dispatch(deleteTodo(id))
    }
    const handleToggle = (id) => {
        dispatch(toggleTodo(id))
    }
    return isLoading ? <div>...loading</div> : (
        <div>
            <h1>Async todo</h1>
            <input type="text" placeholder="enter something" onChange={e => setQuery(e.target.value)} value={query} />
            <button onClick={handleAdd}>ADD TODO</button>
            {todos && todos.map(item => (
                <div key={item.id}>
                    <div>{item.title} - {`${item.status}`}</div>
                    <div><button onClick={() => handleToggle(item.id)}>Toggle</button><button onClick={() => handleDelete(item.id)}>DELETE</button></div>
                </div>
            ))}
        </div>
    )
}