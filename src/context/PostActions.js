export const PostStart = (posts) => ({
    type: "POST_START",

})

export const PostSuccess = (posts) => ({
    type: "POST_SUCCESS",
    payload: posts,
    
})

export const PostFailure = (error) => ({
    type: "POST_FAILURE",
    payload: error,
})