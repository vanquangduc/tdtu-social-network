import {Photo, Tag, AddReaction} from '@mui/icons-material'
import './Share.css'
import { useContext, useRef, useState } from 'react'
import { AuthContext } from '../../context/AuthContext'
import { PostContext } from '../../context/PostContext'
import axios from 'axios'

export default function Share() {
    const PF = process.env.REACT_APP_PUBLIC_FOLDER
    const SV = process.env.REACT_APP_SV_HOST

    const { user } = useContext(AuthContext)
    const { posts, dispatch} = useContext(PostContext)

    const [file, setFile] = useState(null)
    const [errorMessage, setErrorMessage] = useState('')

    const statusTextRef = useRef("")

    const submitHandle = async (e) => {
        e.preventDefault()
        if(statusTextRef.current.value === "" || statusTextRef.current.value === null){
            setErrorMessage("Please enter Username")
            return false
        }

        const newPost = {
            userId: user._id,
            text: statusTextRef.current.value
        }

        if(file){
            const data = new FormData()
            const fileName = Date.now() + "_" + file.name
            data.append("name", fileName)
            data.append("file", file)
            newPost.img = "post/" + fileName
            try{
                await axios.post(SV + "/upload/post", data)
            }
            catch(err){
                console.log(err)
            }
        }
        try{
            await axios.post(SV + "/posts/", {newPost})
            const getNewPost = await axios.get(SV + '/posts/profile/emailname/'+ user.emailname +'/page/1/limit/1')
            dispatch({type: "POST_SUCCESS", payload: [getNewPost.data[0], ...posts]})
        }
        catch(err){
            console.log(err)
        }
    }

    return (
        <div className="share">
            <form className="shareContainer" onSubmit={submitHandle}>
                <div className="share-top">
                    <img src={PF+user.avatar} alt="" className="share-avatar" />
                    <div className="share-input">
                        <input type="text" className="share-input-box" placeholder={"What's on your mind " + user.username + "?"} ref={statusTextRef} />
                    </div>
                    <div >
                        <button className="share-btn" type='submit'>Share</button>
                    </div>
                </div>
                
                <div className="share-bottom">
                    <div className="share-options">
                        <label htmlFor="file" className="share-option-item">
                            <Photo htmlColor="#20ab00" className="share-option-item-icon"/>
                            <span className="share-option-item-text">Photo or Video</span>
                        </label>
                        <input type="file" name="file" id="file" style={{display: "none"}} onChange={(e) => setFile(e.target.files[0])} />
                        <div className="share-option-item">
                            <Tag htmlColor="#fa7500" className="share-option-item-icon"/>
                            <span className="share-option-item-text">Tag Friends</span>
                        </div>
                        <div className="share-option-item">
                            <AddReaction htmlColor="#fcba03" className="share-option-item-icon"/>
                            <span className="share-option-item-text">Feeling</span>
                        </div>
                        
                    </div>
                </div>
            </form>
        </div>
    )
}
