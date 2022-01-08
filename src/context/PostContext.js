import { createContext, useReducer } from "react";
import { PostReducer } from "./PostReducer";

const initialState = {
    posts: [],
    isFetching: false,
    error: false
}

export const PostContext = createContext(initialState)

export const PostContextProvider = ({children}) => {
    const [state, dispatch] = useReducer(PostReducer, initialState)

    return (
        <PostContext.Provider value={{posts: state.posts, isFetching: state.isFetching, error: state.error, dispatch}}>
            {children}
        </PostContext.Provider>
    )
}