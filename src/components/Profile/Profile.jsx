import * as React from 'react'
import {useState, useEffect, useRef, useContext} from 'react'
import './Profile.css'
import axios from 'axios'

// Dialog
import {Edit} from '@mui/icons-material';
import {Avatar, Button, TextField, Dialog,
    IconButton, DialogActions,DialogContent,DialogContentText,
    DialogTitle,Tooltip,Box, InputLabel, MenuItem, FormControl, 
    Select,} from '@mui/material/'

import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';
import { AuthContext } from '../../context/AuthContext';

export default function Profile({emailname}) {

    const {user, dispatch} = useContext(AuthContext)

    const PF = process.env.REACT_APP_PUBLIC_FOLDER
    const SV = process.env.REACT_APP_SV_HOST
    const [userProfile, setUserProfile] = useState({})
    const [open, setOpen] = useState(false)
    const [openChangePassword, setOpenChangePassword] = useState(false)
    const [avtFile, setAvtFile] = useState(null)
    const [errorMessage, setErrorMessage] = useState('')
    const [avt, setAvt] = useState({ profileImage:PF+userProfile.avatar})
    const [major, setMajor] = useState(user.major)
    const [date, setDate] = useState(new Date(user.birthday))
    const [oldPassword, setOldPassword] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [rePassword, setRePassword] = useState('')

    const {profileImage} = avt

    const ITEM_HEIGHT = 48;
    const ITEM_PADDING_TOP = 8;

    const MenuProps = {
        PaperProps: {
          style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 300,
          },
        },
    };

    useEffect(() => {
        let isActive = true
        const fetchUser = async () => {
            const res = await axios.get(process.env.REACT_APP_SV_HOST + '/users?emailname=' + emailname)
            if (isActive) {
                setUserProfile(res.data)
            }
        }
        fetchUser()
        return () => isActive = false
    }, [emailname])
    

    const clickOpen = () => {
        setOpen(true)
        setAvt({profileImage: PF+userProfile.avatar})
    }
    const clickClose = () => {
        setOpen(false)
        setAvt({profileImage: PF+userProfile.avatar})
    }

    const clickOpenChangePassword = () => {
        setOpenChangePassword(true)
    }
    const clickCloseChangePassword = () => {
        setOpenChangePassword(false)
    }

    const fileSelected = event => {
        console.log(event.target.files[0]);
    }

    const imageHandler = event => {
        const reader = new FileReader()

        reader.onload = () => {
            if(reader.readyState === 2){
                setAvt({profileImage: reader.result})
                console.log(reader.result)
            }
        }
        reader.readAsDataURL(event.target.files[0])
        setAvtFile(event.target.files[0])
    }

    const handleChangeMajor = (event) => {
        setMajor(event.target.value);
    };


    const [nameRef, setNameRef] = useState(user.username)
    const [classNameRef, setClassNameRef] = useState(user.className)

    const editProfileHandler = async (e) => {
        e.preventDefault()
        const userToUpdate = user

        if(nameRef === "" || nameRef === null){
            setErrorMessage("Name can not be empty")
            console.log(errorMessage)
            return false
        }
        else{
            if(avtFile){
                const data = new FormData()
                const fileName = Date.now() + "_" + avtFile.name
                data.append("name", fileName)
                data.append("file", avtFile)
                userToUpdate.avatar = "avatar/" + fileName
                try{
                    await axios.post(SV + "/upload/avatar", data)
                }
                catch(err){
                    console.log(err)
                }
            }
    
            userToUpdate.username = nameRef
            userToUpdate.className = classNameRef
            userToUpdate.major = major
            userToUpdate.birthday = date.toLocaleDateString("en-US")
    
            try{
                await axios.put(SV + "/users/" + user._id, userToUpdate)
                dispatch({type: "SIGNIN_SUCCESS", payload: userToUpdate})
            }
            catch(err){
                console.log(err)
            }
        }
       
        
    }

    const changePasswordHandler = async (e) => {
        e.preventDefault()
        const userToUpdate = user

        if(oldPassword === "" || oldPassword === null){
            setErrorMessage("Old password can not be empty")
            console.log(errorMessage)
            return false
        }
        if(newPassword === "" || newPassword === null){
            setErrorMessage("New password can not be empty")
            console.log(errorMessage)
            return false
        }
        if(rePassword === "" || rePassword === null){
            setErrorMessage("Re password can not be empty")
            console.log(errorMessage)
            return false
        }
        if(oldPassword === newPassword){
            setErrorMessage("M???t kh???u m???i tr??ng v???i m???t kh???u c??")
            console.log(errorMessage)
            return false
        }
        if(rePassword !== newPassword){
            setErrorMessage("X??c nh???n m???t kh???u kh??ng ch??nh x??c")
            console.log(errorMessage)
            return false
        }
        
        userToUpdate.password = oldPassword

        try{
            const comparePassword = await axios.post(SV + "/users/compare/" + user._id, userToUpdate)
            if(comparePassword.data.code === 'success'){
                userToUpdate.password = newPassword
                const result = await axios.put(SV + "/users/" + user._id, userToUpdate)
                if(result.data.code === 'success'){
                    clickCloseChangePassword()
                    setErrorMessage("")
                }
            }
            else{
                setErrorMessage("M???t kh???u c?? kh??ng ch??nh x??c")
                console.log(errorMessage)
            }
            
        }
        catch(err){
            console.log(err)
        }
    }

    return (
        <div>
            <div className="profile">
                <div className="profile-cover">
                    <img src={PF+userProfile.background} alt="" className="profile-cover-background" />
                    <img src={PF+userProfile.avatar} alt="" className="profile-cover-avatar" />
                </div>
                <div className="profile-user">
                    <div className="profile-user-name">
                        {user.emailname === emailname
                        ? <>
                        <div className="profile-user-name-box">t</div>
                        <h2 >{userProfile.username}</h2>
                        <Tooltip title="Click to update profile">
                            <IconButton onClick={clickOpen}>
                                <Edit fontSize="small" />
                            </IconButton>
                        </Tooltip>
                        </>
                        : <h2 >{userProfile.username}</h2>
                        }
                        
                    </div>
                    
                    <Dialog open={open} onClose={clickOpen}>
                        <DialogTitle>C???p nh???t th??ng tin</DialogTitle>
                            <div className='profile-avatar-upload'>
                            <input accept="image/*" id="icon-button-file" type="file" style={{ display: 'none' }} onChange={imageHandler} />
                            <label htmlFor="icon-button-file" style={{  textAlign: 'center' }}>
                                <IconButton component="span" >
                                    <Avatar
                                        src={profileImage} 
                                        style={{ margin: "10px", width: "200px", height: "200px",}} 
                                    />
                                </IconButton>
                            </label>
                            </div>
                            
                            <DialogContent>
                                <Box
                                component="form"
                                sx={{
                                    '& .MuiTextField-root': { m: 2, width: '25ch' },
                                }}
                                autoComplete="off"
                                >
                                    <div>
                                        <TextField required id="outlined-required" label="T??n" defaultValue={user.username} onChange={(e) => setNameRef(e.target.value)} />
                                        <TextField id="outlined-required" label="L???p" defaultValue={user.className}onChange={(e) => setClassNameRef(e.target.value)} />
                                        <FormControl sx={{m: 2, width: '25ch'}}>
                                            <InputLabel id="demo-simple-select-label">Khoa</InputLabel>
                                                <Select
                                                labelId="demo-simple-select-label"
                                                id="demo-simple-select"
                                                value={major}
                                                label="Khoa"
                                                onChange={handleChangeMajor}
                                                defaultValue={major}
                                                MenuProps={MenuProps}
                                                >
                                                    <MenuItem value={'CNTT'}>CNTT</MenuItem>
                                                    <MenuItem value={'duoc'}>D?????c</MenuItem>
                                                    <MenuItem value={'dientu'}>??i???n - ??i???n t???</MenuItem>
                                                    <MenuItem value={'giaoducquocte'}>Gi??o d???c qu???c t???</MenuItem>
                                                    <MenuItem value={'ketoan'}>K??? to??n</MenuItem>
                                                    <MenuItem value={'khthethao'}>Khoa h???c th??? thao</MenuItem>
                                                    <MenuItem value={'khungdung'}>Khoa h???c ???ng d???ng</MenuItem>
                                                    <MenuItem value={'khxhvnv'}>Khoa h???c x?? h???i v?? nh??n v??n</MenuItem>
                                                    <MenuItem value={'kythuatcongtrinh'}>K??? thu???t c??ng tr??nh</MenuItem>
                                                    <MenuItem value={'laodongvacongdoan'}>Lao ?????ng v?? c??ng ??o??n</MenuItem>
                                                    <MenuItem value={'luat'}>Lu???t</MenuItem>
                                                    <MenuItem value={'moitruong'}>M??i tr?????ng v?? b???o h??? lao ?????ng</MenuItem>
                                                    <MenuItem value={'mythuat'}>M??? thu???t c??ng nghi???p</MenuItem>
                                                    <MenuItem value={'ngoaingu'}>Ngo???i ng???</MenuItem>
                                                    <MenuItem value={'qtkd'}>Qu???n tr??? kinh doanh</MenuItem>
                                                    <MenuItem value={'tcnh'}>T??i ch??nh - ng??n h??ng</MenuItem>
                                                    <MenuItem value={'toanthongke'}>To??n - th???ng k??</MenuItem>
                                                </Select>
                                        </FormControl>
                                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                                            <DatePicker
                                                label="Ng??y/Th??ng/N??m sinh"
                                                value={date}
                                                defaultValue={date}
                                                onChange={(newValue) => {
                                                setDate(newValue);
                                                }}
                                                renderInput={(params) => <TextField {...params} />}
                                            />
                                        </LocalizationProvider>
                                    </div>
                                </Box>
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={editProfileHandler} type='submit'>C???p nh???t</Button>
                                <Button onClick={clickClose} >H???y</Button>
                            </DialogActions>
                        </Dialog>


                    <Dialog open={openChangePassword} onClose={clickOpenChangePassword}>
                        <DialogTitle>?????i m???t kh???u</DialogTitle>
                        
                        <DialogContent>
                            <Box
                            component="form"
                            sx={{
                                '& .MuiTextField-root': { m: 2, width: '100%', maxWidth: '57ch'},
                            }}
                            autoComplete="off"
                            >
                                <div>
                                    <TextField type="password" required id="outlined-password-input" label="M???t kh???u hi???n t???i" onChange={(e) => setOldPassword(e.target.value)} />
                                    <TextField type="password" required id="outlined-password-input" label="M???t kh???u m???i" onChange={(e) => setNewPassword(e.target.value)} />
                                    <TextField type="password" required id="outlined-password-input" label="Nh???p l???i m???t kh???u m???i" onChange={(e) => setRePassword(e.target.value)} />
                                    <div className='change-password-message'>{errorMessage!="" ? errorMessage : ""}</div>
                                </div>
                            </Box>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={changePasswordHandler} type='submit'>C???p nh???t</Button>
                            <Button onClick={clickCloseChangePassword} >H???y</Button>
                        </DialogActions>
                    </Dialog>
                    <div className="profile-user-email">{userProfile.email}</div>
                </div>
                <div className="profile-info">
                    <div className="profile-info-left">
                        <div className="profile-info-text">Khoa: {userProfile.major ? userProfile.major : "Kh??ng x??c ?????nh"}</div>
                        <div className="profile-info-text">L???p: {userProfile.className ? userProfile.className : "Kh??ng x??c ?????nh"}</div>
                    </div>
                    <div className="profile-info-right">
                        <div className="profile-info-text">Ng??y sinh: {userProfile.birthday ? userProfile.birthday : "Kh??ng x??c ?????nh"}</div>
                        {(user.role != "student") && (user.emailname === emailname) ? <div className="profile-info-text pw" onClick={clickOpenChangePassword}>?????i m???t kh???u </div> : null}
                    </div>
                    
                </div>
            </div>
        </div>
    )
}

                           
                            
                    