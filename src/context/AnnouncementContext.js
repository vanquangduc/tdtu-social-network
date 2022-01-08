import { createContext, useReducer } from "react";
import { AnnouncementReducer } from "./AnnouncementReducer";

const initialState = {
    announcements: [],
    isFetching: false,
    error: false
}

export const AnnouncementContext = createContext(initialState)

export const AnnouncementContextProvider = ({children}) => {
    const [state, dispatch] = useReducer(AnnouncementReducer, initialState)

    return (
        <AnnouncementContext.Provider value={{announcements: state.announcements, isFetching: state.isFetching, error: state.error, dispatch}}>
            {children}
        </AnnouncementContext.Provider>
    )
}