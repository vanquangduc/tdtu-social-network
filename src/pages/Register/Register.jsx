import React from 'react'
import './Register.css'
import { useRef, useState, useEffect } from 'react'
import { ArrowBack } from '@mui/icons-material'
import { Link } from 'react-router-dom'
import axios from 'axios'

export default function Register() {

    const SV = process.env.REACT_APP_SV_HOST

    const emailnameRef = useRef()
    const nameRef = useRef()
    const passwordRef = useRef()
    const confirmPasswordRef = useRef()

    const [permissions, setPermissions] = useState([])
    const [errorMessage, setErrorMessage] = useState("")

    const handleCheckbox = (e) => {
        if(e.target.checked){
            setPermissions([...permissions, e.target.value])
        }
        else{
            setPermissions(permissions.filter(p => p !== e.target.value))
        }
    }

    useEffect(() => {
        console.log(errorMessage)
    }, [errorMessage])

    const handleRegister = async (e) => {
        e.preventDefault()

        const emailname = emailnameRef.current.value
        const name = nameRef.current.value
        const password = passwordRef.current.value
        const confirmPassword = confirmPasswordRef.current.value
        if(emailname === "" || emailname === null){
            setErrorMessage("Please enter Username")
            return false
        }
        if(name === "" || name === null){
            setErrorMessage("Please enter Name")
            return false
        }
        if(password === "" || password === null){
            setErrorMessage("Please enter Password")
            return false
        }
        if(password !== confirmPassword){
            setErrorMessage("Password does not match")
            return false
        }
        if(permissions.length === 0){
            setErrorMessage("You must grant at least one permission")
            return false
        }

        try {
            const res = await axios.post(SV+"/auth/register", {emailname, name, password, permissions})
        }
        catch(err){

        }
    }

    return (
        <>
        <div className="register-form">
            <h1 className="register-logo">TDTU</h1>

            <form className="register" onSubmit={handleRegister}>
                <div className="register-input-group">
                    <div className="form-group">
                        <input type="text" placeholder="Username" ref={emailnameRef}/>
                    </div>
                    <br/>
                    <div className="form-group">
                        <input type="text" placeholder="Name" ref={nameRef}/>
                    </div>
                    <br/>
                    <div className="form-group">  
                        <input type="password" placeholder="Password" ref={passwordRef}/>
                    </div>
                    <br/>
                    <div className="form-group">  
                        <input type="password" placeholder="Confirm Password" ref={confirmPasswordRef}/>
                    </div>
                </div>

                <div className="register-checkbox-group1">
                    
                    <label><input type="checkbox" name="permission" value="Phòng Công tác học sinh sinh viên" onChange={handleCheckbox} /> Phòng Công tác học sinh sinh viên</label>
                    <br />
                    <label><input type="checkbox" name="permission" value="Phòng Đại học" onChange={handleCheckbox} /> Phòng Đại học</label>
                    <br />
                    <label><input type="checkbox" name="permission" value="Phòng Sau đại học" onChange={handleCheckbox} /> Phòng Sau đại học</label>
                    <br />
                    <label><input type="checkbox" name="permission" value="Phòng điện toán và máy tính" onChange={handleCheckbox} /> Phòng điện toán và máy tính</label>
                    <br />
                    <label><input type="checkbox" name="permission" value="Phòng khảo thí và kiểm định chất lượng" onChange={handleCheckbox} /> Phòng khảo thí và kiểm định chất lượng</label>
                    <br />
                    <label><input type="checkbox" name="permission" value="Phòng tài chính" onChange={handleCheckbox} /> Phòng tài chính</label>
                    <br />
                    <label><input type="checkbox" name="permission" value="TDT Creative Language Center" onChange={handleCheckbox} /> TDT Creative Language Center</label>
                    <br />
                    <label><input type="checkbox" name="permission" value="Trung tâm tin học" onChange={handleCheckbox} /> Trung tâm tin học</label>
                    <br />
                    <label><input type="checkbox" name="permission" value="Trung tâm đào tạo phát triển xã hội" onChange={handleCheckbox} /> Trung tâm đào tạo phát triển xã hội</label>
                    <br />
                    <label><input type="checkbox" name="permission" value="Trung tâm phát triển Khoa học quản lý và Ứng dụng công nghệ" onChange={handleCheckbox} /> Trung tâm phát triển Khoa học quản lý và Ứng dụng công nghệ</label>
                    <br />
                    <label><input type="checkbox" name="permission" value="Trung tâm hợp tác doanh nghiệp và cựu sinh viên" onChange={handleCheckbox} /> Trung tâm hợp tác doanh nghiệp và cựu sinh viên</label>
                    
                </div>

                <div className="register-checkbox-group2">
                    
                    <label><input type="checkbox" name="permission" value="Khoa Luật" onChange={handleCheckbox} /> Khoa Luật</label>
                    <br />
                    <label><input type="checkbox" name="permission" value="Trung tâm ngoại ngữ - tin học - bồi dưỡng văn hóa" onChange={handleCheckbox} /> Trung tâm ngoại ngữ - tin học - bồi dưỡng văn hóa</label>
                    <br />
                    <label><input type="checkbox" name="permission" value="Viện chính sách kinh tế và kinh doanh" onChange={handleCheckbox} /> Viện chính sách kinh tế và kinh doanh</label>
                    <br />
                    <label><input type="checkbox" name="permission" value="Khoa Mỹ thuật công nghiệp" onChange={handleCheckbox} /> Khoa Mỹ thuật công nghiệp</label>
                    <br />
                    <label><input type="checkbox" name="permission" value="Khoa Điện - Điện tử" onChange={handleCheckbox} /> Khoa Điện - Điện tử</label>
                    <br />
                    <label><input type="checkbox" name="permission" value="Khoa Công nghệ thông tin" onChange={handleCheckbox} /> Khoa Công nghệ thông tin</label>
                    <br />
                    <label><input type="checkbox" name="permission" value="Khoa Quản trị kinh doanh" onChange={handleCheckbox} /> Khoa Quản trị kinh doanh</label>
                    <br />
                    <label><input type="checkbox" name="permission" value="Khoa Môi trường và bảo hộ lao động" onChange={handleCheckbox} /> Khoa Môi trường và bảo hộ lao động</label>
                    <br />
                    <label><input type="checkbox" name="permission" value="Khoa Lao động công đoàn" onChange={handleCheckbox} /> Khoa Lao động công đoàn</label>
                    <br />
                    <label><input type="checkbox" name="permission" value="Khoa Tài chính ngân hàng" onChange={handleCheckbox} />  Khoa Tài chính ngân hàng</label>
                    <br />
                    <label><input type="checkbox" name="permission" value="Khoa giáo dục quốc tế" onChange={handleCheckbox} />  Khoa giáo dục quốc tế</label>
                </div>
                
                <button className="submit-btn" type="submit" >Register</button>
                <br />
            </form>
            <Link className="register-back" to="/"><ArrowBack /></Link>
        </div>
        </>
    )
}
