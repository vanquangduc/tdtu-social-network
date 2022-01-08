export const AnnouncementStart = (announcements) => ({
    type: "ANNOUNCEMENT_START",

})

export const AnnouncementSuccess = (announcements) => ({
    type: "ANNOUNCEMENT_SUCCESS",
    payload: announcements,
    
})

export const AnnouncemenFailure = (error) => ({
    type: "ANNOUNCEMENT_FAILURE",
    payload: error,
})