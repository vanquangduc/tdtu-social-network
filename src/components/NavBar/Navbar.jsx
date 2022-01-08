import * as React from 'react'
import { useContext, useEffect } from 'react'
import {Search, Notifications, Person, Home, NotificationImportant, PersonAdd, Settings, Logout, AddAlert} from '@mui/icons-material'
import {Menu, MenuItem, Avatar, Divider, ListItemIcon, List, ListItemAvatar, ListItemText, Typography, ListItemButton} from '@mui/material'
import './Navbar.css'
import { Link } from 'react-router-dom'
import { AuthContext } from '../../context/AuthContext'
import { SocketContext } from '../../context/SocketContext'
import { useState } from 'react'

export default function Navbar() {
    const PF = process.env.REACT_APP_PUBLIC_FOLDER
    const { socket } = useContext(SocketContext)

    const [anchorEl, setAnchorEl] = useState(null);
    const [anchorE2, setAnchorE2] = useState(null);
    const [anchorE3, setAnchorE3] = useState(null);
    const openE1 = Boolean(anchorEl);
    const openE2 = Boolean(anchorE2);
    const openE3 = Boolean(anchorE3);
    const handleClickE1 = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleCloseE1 = () => {
        setAnchorEl(null);
    };

    const handleClickE2 = (event) => {
        setAnchorE2(event.currentTarget);
    };
    const handleCloseE2 = () => {
        setAnchorE2(null);
    };

    const handleClickE3 = (event) => {
        setAnchorE3(event.currentTarget);
        setRead(notificationLength)
        setNotificationLength(0)
    };
    const handleCloseE3 = () => {
        setAnchorE3(null);
    };

    const { user } = useContext(AuthContext)

    const logoutHandler = () => {
        localStorage.clear()
        window.location.reload()
    }

    const [notification, setNotification] = useState([])
    const [notificationLength, setNotificationLength] = useState(0)
    const [read, setRead] = useState(0)

    useEffect(() => {
        socket.on('getAnnouncementNotification', (data) => {
            setNotification(prev => [data, ...prev])
        })
    }, [socket])

    useEffect(() => {
        setNotificationLength(notification.length - read)
    }, [notification])


    return (
        <div className="navbarContainer">
            <div className="navbar-left">
                <Link to="/">
                    <div className="logo">TDTU</div>
                </Link>
                
                <div className="navbar-search">
                    <Search className="navbar-search-icon"/>
                    <input placeholder="Tìm kiếm người dùng" className="navbar-search-bar" />
                </div>
            </div>
            <div className="navbar-center">
                <Link to="/">
                <div className="navbar-link">
                    <Home/>
                    <div className="navbar-link-text">Trang chủ</div>
                </div>
                </Link>
                <Link to="/announcement">
                <div className="navbar-link">
                    <NotificationImportant/>
                    <div className="navbar-link-text">Thông báo</div>
                </div>
                </Link>
            </div>
            <div className="navbar-right">
                <div className="navbar-icons">
                    <div className="navbar-icons-item" onClick={handleClickE1}>
                        <Person className="navbar-icons-item-icon"/>
                        <span className="navbar-icons-item-badge">1</span>
                    </div>

                    <Menu
                        anchorEl={anchorEl}
                        open={openE1}
                        onClose={handleCloseE1}
                        onClick={handleCloseE1}
                        
                        PaperProps={{
                        elevation: 0,
                        sx: {
                            overflowY: 'scroll',
                            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                            mt: 1.5,
                            height: '90vh',
                            width: '100%', 
                            maxWidth: 360,
                        },
                        }}
                        transformOrigin={{ horizontal: 'center', vertical: 'top' }}
                        anchorOrigin={{ horizontal: 'center', vertical: 'bottom' }}
                    >
                        <List sx={{  bgcolor: 'background.paper' }}>
                        <ListItemButton alignItems="flex-start">
                            <ListItemAvatar>
                            <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
                            </ListItemAvatar>
                            <ListItemText
                            primary="Brunch this weekend?"
                            secondary={
                                <React.Fragment>
                                <Typography
                                    sx={{ display: 'inline' }}
                                    component="span"
                                    variant="body2"
                                    color="text.primary"
                                >
                                    Ali Connors
                                </Typography>
                                {" — I'll be in your neighborhood doing errands this…"}
                                </React.Fragment>
                            }
                            />
                        </ListItemButton>
                        <Divider variant="inset" component="li" />
                        <ListItemButton alignItems="flex-start">
                            <ListItemAvatar>
                            <Avatar alt="Travis Howard" src="/static/images/avatar/2.jpg" />
                            </ListItemAvatar>
                            <ListItemText
                            primary="Summer BBQ"
                            secondary={
                                <React.Fragment>
                                <Typography
                                    sx={{ display: 'inline' }}
                                    component="span"
                                    variant="body2"
                                    color="text.primary"
                                >
                                    to Scott, Alex, Jennifer
                                </Typography>
                                {" — Wish I could come, but I'm out of town this…"}
                                </React.Fragment>
                            }
                            />
                        </ListItemButton>
                        <Divider variant="inset" component="li" />
                        <ListItemButton alignItems="flex-start">
                            <ListItemAvatar>
                            <Avatar alt="Cindy Baker" src="/static/images/avatar/3.jpg" />
                            </ListItemAvatar>
                            <ListItemText
                            primary="Oui Oui"
                            secondary={
                                <React.Fragment>
                                <Typography
                                    sx={{ display: 'inline' }}
                                    component="span"
                                    variant="body2"
                                    color="text.primary"
                                >
                                    Sandra Adams
                                </Typography>
                                {' — Do you have Paris recommendations? Have you ever…'}
                                </React.Fragment>
                            }
                            />
                        </ListItemButton>
                        <Divider variant="inset" component="li" />
                        <ListItemButton alignItems="flex-start">
                            <ListItemAvatar>
                            <Avatar alt="Cindy Baker" src="/static/images/avatar/3.jpg" />
                            </ListItemAvatar>
                            <ListItemText
                            primary="Oui Oui"
                            secondary={
                                <React.Fragment>
                                <Typography
                                    sx={{ display: 'inline' }}
                                    component="span"
                                    variant="body2"
                                    color="text.primary"
                                >
                                    Sandra Adams
                                </Typography>
                                {' — Do you have Paris recommendations? Have you ever…'}
                                </React.Fragment>
                            }
                            />
                        </ListItemButton>
                        </List>
                    </Menu>

                    <div className="navbar-icons-item" onClick={handleClickE3}>
                        <Notifications className="navbar-icons-item-icon"/>
                        {notificationLength === 0 ? null : <span className="navbar-icons-item-badge">{notificationLength}</span>}
                    </div>

                    <Menu
                        anchorEl={anchorE3}
                        open={openE3}
                        onClose={handleCloseE3}
                        onClick={handleCloseE3}
                        
                        PaperProps={{
                        elevation: 0,
                        sx: {
                            overflowY: 'scroll',
                            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                            mt: 1.5,
                            height: '90vh',
                            width: '100%', 
                            maxWidth: 360,
                        },
                        }}
                        transformOrigin={{ horizontal: 'center', vertical: 'top' }}
                        anchorOrigin={{ horizontal: 'center', vertical: 'bottom' }}
                    >
                        <List sx={{  bgcolor: 'background.paper' }}>
                        {notification.map(n => (
                            <>
                            <ListItemButton alignItems="flex-start">
                                <ListItemAvatar>
                                <Avatar alt="Remy Sharp" src={PF + n.avatar} />
                                </ListItemAvatar>
                                <ListItemText
                                primary={n.sendName}
                                secondary={
                                    <React.Fragment>
                                    <Typography
                                        sx={{ display: 'inline' }}
                                        component="span"
                                        variant="body2"
                                        color="text.primary"
                                    >
                                       {n.category + ' — Vừa đăng một thông báo mới'}
                                    </Typography>
                                   
                                    </React.Fragment>
                                }
                                />
                            </ListItemButton>
                            <Divider variant="inset" component="li" />                           
                            </>
                            
                        ))}
                        
                        
                        </List>
                    </Menu>
                </div>
                <div className="navbar-user" onClick={handleClickE2}>
                    <div className="navbar-user-name">{user.username}</div>
                    <img src={PF+user.avatar} alt="" className="navbar-avatar" />
                </div>
                
                <Menu
                    anchorEl={anchorE2}
                    open={openE2}
                    onClose={handleCloseE2}
                    onClick={handleCloseE2}
                    className="navbar-user-menu"
                    PaperProps={{
                    elevation: 0,
                    sx: {
                        overflow: 'visible',
                        filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                        mt: 1.5,
                        '& .MuiAvatar-root': {
                        width: 32,
                        height: 32,
                        ml: -0.5,
                        mr: 1,
                        },
                        '&:before': {
                        content: '""',
                        display: 'block',
                        position: 'absolute',
                        top: 0,
                        right: 14,
                        width: 10,
                        height: 10,
                        bgcolor: 'background.paper',
                        transform: 'translateY(-50%) rotate(45deg)',
                        zIndex: 0,
                        },
                    },
                    }}
                    transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                    anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                >
                    <Link to={"/profile/" + user.emailname}>
                        <MenuItem>
                        <Avatar src={PF+user.avatar} /> Trang cá nhân
                        </MenuItem>
                    </Link>
                    
                    <Divider />
                    {user.role === 'admin' 
                        ? <Link to="/register">
                            <MenuItem>
                            <ListItemIcon>
                                <PersonAdd fontSize="small" />
                            </ListItemIcon>
                            Tạo tài khoản Phòng/Khoa
                            </MenuItem>
                        </Link> 
                        
                        : user.role === 'faculty'
                        ? <Link to="/announcement/list">
                            <MenuItem>
                            <ListItemIcon>
                            <AddAlert fontSize="small" />
                            </ListItemIcon>
                            Quản lý thông báo
                            </MenuItem>
                        </Link>
                        : null
                    }
                    
                    <MenuItem>
                    <ListItemIcon>
                        <Settings fontSize="small" />
                    </ListItemIcon>
                    Cài Đặt
                    </MenuItem>
                    
                    <MenuItem onClick={logoutHandler} >
                    <ListItemIcon>
                        <Logout fontSize="small" />
                    </ListItemIcon>
                    Đăng xuất
                    </MenuItem>
                
                    
                    
                </Menu>
            </div>
        </div>
    )
}
