export const SigninStart = (user) => ({
    type: "SIGNIN_START",

})

export const SigninSuccess = (user) => ({
    type: "SIGNIN_SUCCESS",
    payload: user,
    
})

export const SigninFailure = (error) => ({
    type: "SIGNIN_FAILURE",
    payload: error,
})