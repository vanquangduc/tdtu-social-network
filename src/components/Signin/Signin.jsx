import axios from 'axios'
import { useRef } from 'react'
import { useContext } from 'react'
import { useState } from 'react'
import {GoogleLogin} from 'react-google-login'
import './Signin.css'
import { AuthContext } from '../../context/AuthContext'
import { CircularProgress } from '@mui/material'

export default function Signin() {

    const [toggle, setToggle] = useState('toggle')
    const [toggleBtnStd, setToggleBtnStd] = useState('toggle-btn std or')
    const [toggleBtnOth, setToggleBtnOth] = useState('toggle-btn oth')
    const [students, setStudents] = useState('students')
    const [others, setOthers] = useState('others')
    const [ggErrorMessage, setGgErrorMessage] = useState("")
    const [errorMessage, setErrorMessage] = useState("")

    const SV = process.env.REACT_APP_SV_HOST
    const emailnameRef = useRef()
    const passwordRef = useRef()
    const {isFetching, error, dispatch} = useContext(AuthContext)

    const studentSignin = () => {
        setToggle('toggle')
        setStudents('students') 
        setOthers('others')
        setToggleBtnOth('toggle-btn oth')
        setToggleBtnStd('toggle-btn std or')
    }
    const othersSignin = () => {
        setToggle('toggle or')
        setStudents('students or') 
        setOthers('others or')
        setToggleBtnOth('toggle-btn oth or')
        setToggleBtnStd('toggle-btn std')
    }

    const signInHandler = async (e) => {
        e.preventDefault()

        const emailname = emailnameRef.current.value
        const password = passwordRef.current.value

        if(emailname === "" || emailname === null){
            setErrorMessage("Vui lòng nhập tài khoản")
            return false
        }
        if(password === "" || password === null){
            setErrorMessage("Vui lòng nhập mật khẩu")
            return false
        }

        dispatch({type: "SIGNIN_START"})
        try{
            const res = await axios.post(SV+"/auth/signin", {emailname, password})
            if(res.data.code === "success"){
                localStorage.setItem('userToken', res.data.userToken)
                const user = await axios.get(SV+"/auth/user/" + localStorage.getItem('userToken'))
                
                dispatch({type: "SIGNIN_SUCCESS", payload: user.data})
            }
            if(res.data.code === "user not found"){
                setErrorMessage("Tài khoản không tồn tại")
                dispatch({type: "SIGNIN_FAILURE", payload: res.data.code})
                return false
            }
            if(res.data.code === "wrong password"){
                setErrorMessage("Sai mật khẩu")
                dispatch({type: "SIGNIN_FAILURE", payload: res.data.code})
                return false
            }
            
        }
        catch(err){
            dispatch({type: "SIGNIN_FAILURE", payload: err})
        }
    }

    const googleRespone = async (res) => {
        const userData = res.profileObj
        
        dispatch({type: "SIGNIN_START"})
        try{
            const res = await axios.post(SV+"/auth/signin/google", {authId: userData.googleId, email: userData.email, name: userData.name})
            if(res.data.code === "success"){
                localStorage.setItem('userToken', res.data.userToken)
                const user = await axios.get(SV+"/auth/user/" + localStorage.getItem('userToken'))
                dispatch({type: "SIGNIN_SUCCESS", payload: user.data})
            }
            if(res.data.code === "email not aceptable"){
                setGgErrorMessage("Chỉ được phép đăng nhập bằng email có đuôi student.tdtu.edu.vn hoặc tdtu.edu.vn")
                dispatch({type: "SIGNIN_FAILURE", payload: res.data.code})
                return false
            }
        }
        catch(err){
            dispatch({type: "SIGNIN_FAILURE", payload: err})
        }
    }

    return (
        <>
        <div className="signin-container">
            
            <div className="signin-form">
                <h1 className="signin-logo">TDTU</h1>
                <div className="toggle-box">
                    <div className={toggle}></div>
                    <button type="button" className={toggleBtnStd} onClick={studentSignin}>Students</button>
                    <button type="button" className={toggleBtnOth} onClick={othersSignin}>Others</button>
                </div>


                <form className={others} onSubmit={signInHandler}>
                    <div className="form-group">
                        <input type="text" placeholder="Tài khoản" ref={emailnameRef}/>
                    </div>
                    <br/>
                    <div className="form-group">  
                        <input type="password" placeholder="Mật khẩu" ref={passwordRef}/>
                    </div>
                    {errorMessage ? <div className='signin-error'>{errorMessage}</div> : null}
                    <button className="signin-submit-btn" type="submit">{ isFetching ? <CircularProgress color="secondary" size="20px" /> : "Đăng nhập"}</button>
                </form>

                <div className={students}>
                    

                    <GoogleLogin 
                        clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
                        
                        onSuccess={googleRespone}
                        onFailure={googleRespone}
                        cookiePolicy={'single_host_origin'}
                    ></GoogleLogin>

                    {ggErrorMessage ? <div className='signin-error'>{ggErrorMessage}</div> : null}
                </div>
                
            </div>
            
        </div>  
        </>
    )
}
