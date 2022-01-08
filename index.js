const express = require('express')
require('dotenv').config()
const app = express()
PORT =  8080 || process.env.PORT
const db = require('./db')
const helmet = require('helmet')
const userRoute = require('./routes/users')
const authRoute = require('./routes/auth')
const postRoute = require('./routes/posts')
const commentRoute = require('./routes/comments')
const announcementRoute = require('./routes/announcements')
const expressSession = require('express-session')
const passport = require('passport')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const multer = require('multer')
const path = require('path')
const http = require('http')
const socketio = require('socket.io')

const corsOptions = {
    origin: true, 
    credentials: true,
};
app.use("/images", express.static(path.join(__dirname, "public/images")))
app.use(cors(corsOptions))
app.use(express.json())
app.use(express.urlencoded({ extended: false }));
app.use(helmet())
app.use(expressSession({
    resave: false,   
    saveUninitialized: false,  
    secret: process.env.COOKIE_SECRET,  
}))
app.use(cookieParser())
app.use(passport.initialize())
app.use(passport.session())


const postStorage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, "public/images/post")
    },
    filename: (req, file, callback) => {
        callback(null, req.body.name)
    }
})
const postUpload = multer({
    storage: postStorage
})
app.post('/api/upload/post', postUpload.single("file"), (req, res) => {
    try{
        res.json("file uploaded")
    }
    catch(err){
        console.log(err)
    }
})

const avtStorage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, "public/images/avatar")
    },
    filename: (req, file, callback) => {
        callback(null, req.body.name)
    }
})
const avtUpload = multer({
    storage: avtStorage
})
app.post('/api/upload/avatar', avtUpload.single("file"), (req, res) => {
    try{
        res.json("file uploaded")
    }
    catch(err){
        console.log(err)
    }
})

const fileStorage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, "public/images/file")
    },
    filename: (req, file, callback) => {
        callback(null, req.body.name)
    }
})
const fileUpload = multer({
    storage: fileStorage
})
app.post('/api/upload/announcement', fileUpload.single("file"), (req, res) => {
    try{
        res.json("file uploaded")
    }
    catch(err){
        console.log(err)
    }
})


app.use('/api/users', userRoute)
app.use('/api/auth', authRoute)
app.use('/api/posts', postRoute)
app.use('/api/comments', commentRoute)
app.use('/api/announcements', announcementRoute)


const server = app.listen(PORT, () => {
    console.log(`App is running on port ${PORT}`)
})

const io = socketio(server, {
    cors: {
        origin: 'http://localhost:3000'
    },
})

let users = []
const addUser = (userId, socketId) => {
    if(!users.some(u => u.userId === userId)) users.push({userId, socketId})
}

const removeUser = (socketId) => {
    users = users.filter(u => u.socketId !== socketId)
}

io.on('connection', socket => {
    console.log('new connection')

    socket.on('addUser', userId => {
        addUser(userId, socket.id)
        io.emit('getUsers', users)
    })

    socket.on('createNewAnnouncement', ({sendName, avatar, data}) => {
        io.emit('getAnnouncementNotification', {sendName, avatar, category: data.faculty})
    })

    socket.on('disconnect', () => {
        console.log('disconnected')
        removeUser(socket.id)
        io.emit('getUsers', users)
    })
})