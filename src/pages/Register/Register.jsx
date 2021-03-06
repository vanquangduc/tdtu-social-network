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
                    
                    <label><input type="checkbox" name="permission" value="Ph??ng C??ng t??c h???c sinh sinh vi??n" onChange={handleCheckbox} /> Ph??ng C??ng t??c h???c sinh sinh vi??n</label>
                    <br />
                    <label><input type="checkbox" name="permission" value="Ph??ng ?????i h???c" onChange={handleCheckbox} /> Ph??ng ?????i h???c</label>
                    <br />
                    <label><input type="checkbox" name="permission" value="Ph??ng Sau ?????i h???c" onChange={handleCheckbox} /> Ph??ng Sau ?????i h???c</label>
                    <br />
                    <label><input type="checkbox" name="permission" value="Ph??ng ??i???n to??n v?? m??y t??nh" onChange={handleCheckbox} /> Ph??ng ??i???n to??n v?? m??y t??nh</label>
                    <br />
                    <label><input type="checkbox" name="permission" value="Ph??ng kh???o th?? v?? ki???m ?????nh ch???t l?????ng" onChange={handleCheckbox} /> Ph??ng kh???o th?? v?? ki???m ?????nh ch???t l?????ng</label>
                    <br />
                    <label><input type="checkbox" name="permission" value="Ph??ng t??i ch??nh" onChange={handleCheckbox} /> Ph??ng t??i ch??nh</label>
                    <br />
                    <label><input type="checkbox" name="permission" value="TDT Creative Language Center" onChange={handleCheckbox} /> TDT Creative Language Center</label>
                    <br />
                    <label><input type="checkbox" name="permission" value="Trung t??m tin h???c" onChange={handleCheckbox} /> Trung t??m tin h???c</label>
                    <br />
                    <label><input type="checkbox" name="permission" value="Trung t??m ????o t???o ph??t tri???n x?? h???i" onChange={handleCheckbox} /> Trung t??m ????o t???o ph??t tri???n x?? h???i</label>
                    <br />
                    <label><input type="checkbox" name="permission" value="Trung t??m ph??t tri???n Khoa h???c qu???n l?? v?? ???ng d???ng c??ng ngh???" onChange={handleCheckbox} /> Trung t??m ph??t tri???n Khoa h???c qu???n l?? v?? ???ng d???ng c??ng ngh???</label>
                    <br />
                    <label><input type="checkbox" name="permission" value="Trung t??m h???p t??c doanh nghi???p v?? c???u sinh vi??n" onChange={handleCheckbox} /> Trung t??m h???p t??c doanh nghi???p v?? c???u sinh vi??n</label>
                    
                </div>

                <div className="register-checkbox-group2">
                    
                    <label><input type="checkbox" name="permission" value="Khoa Lu???t" onChange={handleCheckbox} /> Khoa Lu???t</label>
                    <br />
                    <label><input type="checkbox" name="permission" value="Trung t??m ngo???i ng??? - tin h???c - b???i d?????ng v??n h??a" onChange={handleCheckbox} /> Trung t??m ngo???i ng??? - tin h???c - b???i d?????ng v??n h??a</label>
                    <br />
                    <label><input type="checkbox" name="permission" value="Vi???n ch??nh s??ch kinh t??? v?? kinh doanh" onChange={handleCheckbox} /> Vi???n ch??nh s??ch kinh t??? v?? kinh doanh</label>
                    <br />
                    <label><input type="checkbox" name="permission" value="Khoa M??? thu???t c??ng nghi???p" onChange={handleCheckbox} /> Khoa M??? thu???t c??ng nghi???p</label>
                    <br />
                    <label><input type="checkbox" name="permission" value="Khoa ??i???n - ??i???n t???" onChange={handleCheckbox} /> Khoa ??i???n - ??i???n t???</label>
                    <br />
                    <label><input type="checkbox" name="permission" value="Khoa C??ng ngh??? th??ng tin" onChange={handleCheckbox} /> Khoa C??ng ngh??? th??ng tin</label>
                    <br />
                    <label><input type="checkbox" name="permission" value="Khoa Qu???n tr??? kinh doanh" onChange={handleCheckbox} /> Khoa Qu???n tr??? kinh doanh</label>
                    <br />
                    <label><input type="checkbox" name="permission" value="Khoa M??i tr?????ng v?? b???o h??? lao ?????ng" onChange={handleCheckbox} /> Khoa M??i tr?????ng v?? b???o h??? lao ?????ng</label>
                    <br />
                    <label><input type="checkbox" name="permission" value="Khoa Lao ?????ng c??ng ??o??n" onChange={handleCheckbox} /> Khoa Lao ?????ng c??ng ??o??n</label>
                    <br />
                    <label><input type="checkbox" name="permission" value="Khoa T??i ch??nh ng??n h??ng" onChange={handleCheckbox} />  Khoa T??i ch??nh ng??n h??ng</label>
                    <br />
                    <label><input type="checkbox" name="permission" value="Khoa gi??o d???c qu???c t???" onChange={handleCheckbox} />  Khoa gi??o d???c qu???c t???</label>
                </div>
                
                <button className="submit-btn" type="submit" >Register</button>
                <br />
            </form>
            <Link className="register-back" to="/"><ArrowBack /></Link>
        </div>
        </>
    )
}
