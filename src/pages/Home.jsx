import { useContext, useEffect } from "react"
import Feed from "../components/Feed/Feed"
import Navbar from "../components/NavBar/Navbar"
import Rightbar from "../components/Rightbar/Rightbar"
import Sidebar from "../components/Sidebar/Sidebar"
import { PostContext } from "../context/PostContext"

export default function Home() {
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
                <Feed/>
                <Rightbar/>
            </div>
        </div>
    )
}
