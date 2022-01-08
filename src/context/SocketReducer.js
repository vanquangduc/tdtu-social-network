export const SocketReducer = (state, action) => {
    switch(action.type){
        case "SOCKET_START":
            return{
                socket: null,
                isFetching: true,
                error: false,
            }
        
        case "SOCKET_SUCCESS":
            return{
                socket: action.payload,
                isFetching: false,
                error: false,
            }
            
        case "SOCKET_FAILURE":
            return{
                socket: null,
                isFetching: false,
                error: action.payload,
            }    

        default:
            return state
    }
}

