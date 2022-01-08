export const PostReducer = (state, action) => {
    switch(action.type){
        case "POST_START":
            return{
                posts: [],
                isFetching: true,
                error: false,
            }
        
        case "POST_SUCCESS":
            return{
                posts: action.payload,
                isFetching: false,
                error: false,
            }
            
        case "POST_FAILURE":
            return{
                posts: [],
                isFetching: false,
                error: action.payload,
            }    

        default:
            return state
    }
}

