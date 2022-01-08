import './Rightbar.css'
import { useContext, useEffect, useRef, useState } from 'react'
import { AuthContext } from '../../context/AuthContext'
import axios from 'axios'
import { SocketContext } from '../../context/SocketContext'

export default function Rightbar() {
    const PF = process.env.REACT_APP_PUBLIC_FOLDER

    const { user } = useContext(AuthContext)
    const { socket } = useContext(SocketContext)
    const [onlineUsers, setOnlineUsers] = useState([])
    const [allUsers, setAllUsers] = useState([])
    const [onlineUsersInfo, setOnlineUsersInfo] = useState([])

    useEffect(() => {
        const fetchUser = async () =>{
            const res = await axios.get(process.env.REACT_APP_SV_HOST + '/users/all')
            setAllUsers(res.data)
        }
        fetchUser()

        socket.emit('addUser', user._id)
        socket.on('getUsers', users => {
            setOnlineUsers(users.filter(u => u.userId !== user._id))
        })
    }, [user])

    useEffect(() => {
        setOnlineUsersInfo(allUsers.filter(a => onlineUsers.some(o => o.userId === a._id)))
    }, [allUsers, onlineUsers])
    

    return (
        <div className="rightbar">
            <div className="rightbar-title">User Online ({onlineUsersInfo.length})</div>
            <ul className="rightbar-online-list">
                {onlineUsersInfo.map(o => (
                    <li className="rightbar-online-list-items">
                        <div className="rightbar-online-list-item-avatar">
                            <img src={PF+o.avatar} alt="" />
                            <span className="rightbar-online-tick"></span>
                        </div>
                        <span className="rightbar-online-list-item-user">{o.username}</span>
                    </li>
                ))}
                
            </ul>
        </div>
    )
}
