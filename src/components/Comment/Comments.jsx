import './Comments.css'
import { MoreHoriz, Settings } from '@mui/icons-material'
import { IconButton, MenuItem, Menu, ListItemIcon, Divider, CircularProgress, Dialog, DialogActions, DialogContent, DialogTitle, DialogContentText, Button } from '@mui/material'
import { AuthContext } from '../../context/AuthContext';
import { useState, useEffect, useContext } from "react";
import axios from 'axios';
import { format } from 'timeago.js'

export default function Comments({ comment }) {
    const PF = process.env.REACT_APP_PUBLIC_FOLDER
    const SV = process.env.REACT_APP_SV_HOST

    const { user } = useContext(AuthContext)

    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
      setAnchorEl(null);
    };

    const [openDelConfirm, setOpenDelConfirm] = useState(false);
    const handleClickOpenDelConfirm = () => {
        setOpenDelConfirm(true);
    };
    
    const handleCloseDelConfirm = () => {
        setOpenDelConfirm(false);
    };

    const [userComment, setUserComment] = useState({})
    const [isDeleted, setIsDeleted] = useState(false)

    useEffect(() => {
        let isActive = true
        const fetchUser = async () => {
            const res = await axios.get(SV + '/users?userId=' + comment.userId)
            if (isActive) {
                setUserComment(res.data)
            }
        }
        fetchUser()
        return () => isActive = false
    }, [comment.userId])


    const deleteHandle = async () => {
        try{
            await axios.post(SV + '/comments/' + comment._id, {userId: user._id})
            setIsDeleted(true)
        }
        catch(err){
            console.log(err)
        }
    }

    return (
        <>
            <div className="comment-container">
            {!isDeleted 
            ? 
            <div className="comment">
                    
                    <div className="comment-left">
                        {userComment.avatar ? <img src={PF+userComment.avatar} alt="" className="comment-avatar" /> : <CircularProgress />}
                    </div>
                    <div className="comment-center">
                        <div className="comment-name">
                            {userComment.username}
                            <p className="comment-time">{format(comment.createdAt)}</p>
                        </div>
                        <div className="comment-text">{comment.text}</div>
                    </div>
                    <div className="comment-right">
                    <IconButton
                        aria-label="more"
                        id="long-button"
                        aria-controls="long-menu"
                        aria-expanded={open ? 'true' : undefined}
                        aria-haspopup="true"
                        onClick={handleClick}
                    >
                        <MoreHoriz />
                    </IconButton>
                    
                    <Dialog open={openDelConfirm} onClose={handleCloseDelConfirm}>
                        <DialogTitle>Delete Confirmation</DialogTitle>
                        <DialogContent>
                            <DialogContentText>
                                Do you want to delete this post?
                            </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={deleteHandle}>Confirm</Button>
                            <Button onClick={handleCloseDelConfirm}>Cancel</Button>
                        </DialogActions>
                    </Dialog>
                    
                    <Menu
                        id="long-menu"
                        MenuListProps={{
                        'aria-labelledby': 'long-button',
                        }}
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                        onClick={handleClose}
                        PaperProps={{
                        style: {
                            maxHeight: 60 * 4.5,
                            width: '30ch',
                        },
                        }}
                        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                    >
                        {user._id === comment.userId 
                        ?
                        <MenuItem onClick={handleClickOpenDelConfirm}>
                        <ListItemIcon>
                            <Settings fontSize="small" />
                        </ListItemIcon>
                        Delete comment
                        </MenuItem>     
                        : null
                        }
                        
                        {user._id === comment.userId 
                        ?
                        <MenuItem>
                        <ListItemIcon>
                            <Settings fontSize="small" />
                        </ListItemIcon>
                        Edit comment
                        </MenuItem>
                        
                        : null
                        }
                        <MenuItem>
                        <ListItemIcon>
                            <Settings fontSize="small" />
                        </ListItemIcon>
                        Report
                        </MenuItem>

                    </Menu>
                    </div>
                </div>
            : 
            <div className='comment'>
                <div className="comment-left">
                    <div className='comment-temp'>t</div>
                </div>
                <div className='comment-deleted'>This comment has been deleted</div>
                <div className='comment-right'>
                    <div className='comment-temp'>t</div>
                </div>
            </div>

            }
                
            </div>
        </>
    )
}
