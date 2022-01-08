export const SocketStart = (socket) => ({
    type: "SOCKET_START",

})

export const SocketSuccess = (socket) => ({
    type: "SOCKET_SUCCESS",
    payload: socket,
    
})

export const SocketFailure = (error) => ({
    type: "SOCKET_FAILURE",
    payload: error,
})