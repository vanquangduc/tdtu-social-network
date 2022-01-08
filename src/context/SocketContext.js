import { createContext, useReducer } from "react";
import { SocketReducer } from "./SocketReducer";

const initialState = {
    socket: null,
    isFetching: false,
    error: false
}

export const SocketContext = createContext(initialState)

export const SocketContextProvider = ({children}) => {
    const [state, dispatch] = useReducer(SocketReducer, initialState)

    return (
        <SocketContext.Provider value={{socket: state.socket, isFetching: state.isFetching, error: state.error, dispatch}}>
            {children}
        </SocketContext.Provider>
    )
}