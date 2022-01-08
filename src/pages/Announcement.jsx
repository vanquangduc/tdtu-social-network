import { useParams } from "react-router-dom"
import Announcement from "../components/Announcemnet/Announcement"
import Navbar from "../components/NavBar/Navbar"
import Rightbar from "../components/Rightbar/Rightbar"
import Sidebar from "../components/Sidebar/Sidebar"

export default function Profile() {
    const announceCategory = useParams().categoryId
    return (
        <div>
            <Navbar/>
            <div className="mainContainer">
                <Sidebar/>
                <Announcement announceCategory={announceCategory} />
                <Rightbar/>
            </div>
        </div>
    )
}
