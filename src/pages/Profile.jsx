import Feed from "../components/Feed/Feed"
import Navbar from "../components/NavBar/Navbar"
import Rightbar from "../components/Rightbar/Rightbar"
import Sidebar from "../components/Sidebar/Sidebar"
import { useParams } from "react-router"
import { PostContext } from "../context/PostContext"
import { useContext, useEffect } from "react"

export default function Profile() {
    const emailname = useParams().emailname
    const { posts, dispatch } = useContext(PostContext)
    useEffect(() => {
        window.scrollTo(0, 0)
        dispatch({type: "POST_START"})
        
    }, [])

    return (
        <div>
            <Navbar/>
            <div className="mainContainer">
                <Sidebar/>
                <Feed emailname={emailname} />
                <Rightbar/>
            </div>
        </div>
    )
}
