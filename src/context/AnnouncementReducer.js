export const AnnouncementReducer = (state, action) => {
    switch(action.type){
        case "ANNOUNCEMENT_START":
            return{
                announcements: [],
                isFetching: true,
                error: false,
            }
        
        case "ANNOUNCEMENT_SUCCESS":
            return{
                announcements: action.payload,
                isFetching: false,
                error: false,
            }
            
        case "ANNOUNCEMENT_FAILURE":
            return{
                announcements: [],
                isFetching: false,
                error: action.payload,
            }    

        default:
            return state
    }
}

