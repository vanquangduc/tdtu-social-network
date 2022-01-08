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
    const [avtFile, setAvtFile] = useState(null)
    const [errorMessage, setErrorMessage] = useState('')
    const [avt, setAvt] = useState({ profileImage:PF+userProfile.avatar})
    const [major, setMajor] = useState(user.major)
    const [date, setDate] = useState(new Date(user.birthday))

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

        console.log(nameRef)
        console.log(classNameRef)
        console.log(major)
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
                        <DialogTitle>Cập nhật thông tin</DialogTitle>
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
                                        <TextField required id="outlined-required" label="Tên" defaultValue={user.username} onChange={(e) => setNameRef(e.target.value)} />
                                        <TextField id="outlined-required" label="Lớp" defaultValue={user.className}onChange={(e) => setClassNameRef(e.target.value)} />
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
                                                    <MenuItem value={'duoc'}>Dược</MenuItem>
                                                    <MenuItem value={'dientu'}>Điện - điện tử</MenuItem>
                                                    <MenuItem value={'giaoducquocte'}>Giáo dục quốc tế</MenuItem>
                                                    <MenuItem value={'ketoan'}>Kế toán</MenuItem>
                                                    <MenuItem value={'khthethao'}>Khoa học thể thao</MenuItem>
                                                    <MenuItem value={'khungdung'}>Khoa học ứng dụng</MenuItem>
                                                    <MenuItem value={'khxhvnv'}>Khoa học xã hội và nhân văn</MenuItem>
                                                    <MenuItem value={'kythuatcongtrinh'}>Kỹ thuật công trình</MenuItem>
                                                    <MenuItem value={'laodongvacongdoan'}>Lao động và công đoàn</MenuItem>
                                                    <MenuItem value={'luat'}>Luật</MenuItem>
                                                    <MenuItem value={'moitruong'}>Môi trường và bảo hộ lao động</MenuItem>
                                                    <MenuItem value={'mythuat'}>Mỹ thuật công nghiệp</MenuItem>
                                                    <MenuItem value={'ngoaingu'}>Ngoại ngữ</MenuItem>
                                                    <MenuItem value={'qtkd'}>Quản trị kinh doanh</MenuItem>
                                                    <MenuItem value={'tcnh'}>Tài chính - ngân hàng</MenuItem>
                                                    <MenuItem value={'toanthongke'}>Toán - thống kê</MenuItem>
                                                </Select>
                                        </FormControl>
                                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                                            <DatePicker
                                                label="Ngày/Tháng/Năm sinh"
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
                                <Button onClick={clickClose} >Hủy</Button>
                                <Button onClick={editProfileHandler} type='submit'>Cập nhật</Button>
                            </DialogActions>
                        </Dialog>
                    <div className="profile-user-email">{userProfile.email}</div>
                </div>
                <div className="profile-info">
                    <div className="profile-info-left">
                        <div className="profile-info-text">Khoa {userProfile.major}</div>
                        <div className="profile-info-text">Lớp: {userProfile.className}</div>
                    </div>
                    <div className="profile-info-right">
                        <div className="profile-info-text">Ngay sinh: {userProfile.birthday}</div>
                        <div className="profile-info-text">Noi o</div>
                    </div>
                    
                </div>
            </div>
        </div>
    )
}

                           
                            
                    