import Announcement from "../components/Announcemnet/Announcement"
import Navbar from "../components/NavBar/Navbar"
import Rightbar from "../components/Rightbar/Rightbar"
import Sidebar from "../components/Sidebar/Sidebar"

export default function Profile() {
    return (
        <div>
            <Navbar/>
            <div className="mainContainer">
                <Sidebar/>
                <Announcement/>
                <Rightbar/>
            </div>
        </div>
    )
}
