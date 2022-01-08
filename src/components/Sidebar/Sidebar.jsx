
import './Sidebar.css'
import { useContext } from 'react'
import { AuthContext } from '../../context/AuthContext'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBell, faCalendarAlt, faClipboardCheck, faClipboardList, faClock, faHome } from '@fortawesome/free-solid-svg-icons'

export default function Sidebar() {
    const PF = process.env.REACT_APP_PUBLIC_FOLDER

    const { user } = useContext(AuthContext)

    const sidebarItem = [
        {
            name: "Trang chủ",
            icon: <FontAwesomeIcon icon={faHome} className="font-awesome" />
        },
        {
            name: "Thông báo",
            icon: <FontAwesomeIcon icon={faBell} className="font-awesome" />
        },
        {
            name: "Thời khóa biểu",
            icon: <FontAwesomeIcon icon={faClock} className="font-awesome" />
        },
        {
            name: "Lịch thi",
            icon: <FontAwesomeIcon icon={faCalendarAlt} className="font-awesome" />
        },
        {
            name: "Điểm thi",
            icon: <FontAwesomeIcon icon={faClipboardList} className="font-awesome" />
        },
        {
            name: "Điểm rèn luyện",
            icon: <FontAwesomeIcon icon={faClipboardCheck} className="font-awesome" />
        },
    ]

    const category = [
        {
            name: "Phòng Công tác học sinh sinh viên",
            avatar: PF+"avatar/noAvatar.jpg" 
        },
        {
            name: "Phòng tài chính",
            avatar: PF+"avatar/noAvatar.jpg" 
        },
        {
            name: "TDT Creative Language Center",
            avatar: PF+"avatar/noAvatar.jpg" 
        },
        {
            name: "Trung tâm tin học",
            avatar: PF+"avatar/noAvatar.jpg" 
        },
        {
            name: "Trung tâm đào tạo phát triển xã hội",
            avatar: PF+"avatar/noAvatar.jpg" 
        },
        {
            name: "Trung tâm phát triển Khoa học quản lý và Ứng dụng công nghệ",
            avatar: PF+"avatar/noAvatar.jpg" 
        },
        {
            name: "Trung tâm hợp tác doanh nghiệp và cựu sinh viên",
            avatar: PF+"avatar/noAvatar.jpg" 
        },
        {
            name: "Khoa Luật",
            avatar: PF+"avatar/noAvatar.jpg" 
        },
        {
            name: "Trung tâm ngoại ngữ - tin học - bồi dưỡng văn hóa",
            avatar: PF+"avatar/noAvatar.jpg" 
        },
        {
            name: "Viện chính sách kinh tế và kinh doanh",
            avatar: PF+"avatar/noAvatar.jpg" 
        },
        {
            name: "Khoa Mỹ thuật công nghiệp",
            avatar: PF+"avatar/noAvatar.jpg" 
        },
        {
            name: "Khoa Điện - Điện tử",
            avatar: PF+"avatar/noAvatar.jpg" 
        },
        {
            name: "Khoa Công nghệ thông tin",
            avatar: PF+"avatar/noAvatar.jpg" 
        },
        {
            name: "Khoa Quản trị kinh doanh",
            avatar: PF+"avatar/noAvatar.jpg" 
        },
        {
            name: "Khoa Môi trường và bảo hộ lao động",
            avatar: PF+"avatar/noAvatar.jpg" 
        },
        {
            name: "Khoa Lao động công đoàn",
            avatar: PF+"avatar/noAvatar.jpg" 
        },
        {
            name: "Khoa Tài chính ngân hàng",
            avatar: PF+"avatar/noAvatar.jpg" 
        },
        {
            name: "Khoa giáo dục quốc tế",
            avatar: PF+"avatar/noAvatar.jpg" 
        }
    ]

    return (
        <div className="sidebar">
            <div className="sidebar-items">
                <div className="sidebar-user"> 
                    <img src={PF+user.avatar} alt="" className="sidebar-user-avatar" />
                    <div className="sidebar-user-name">{user.username}</div>
                </div>
                <ul className="sidebar-list">
                    {sidebarItem.map(s => (
                        <li className="sidebar-list-item">
                        {s.icon}
                        <span className="sidebar-list-item-text">{s.name}</span>
                    </li>
                    ))}
                </ul>
                <hr className="sidebar-line" />
                <div className="sidebar-title">Lối tắt</div>
                <ul className="sidebar-group">
                    {category.map(c => (
                        <li className="sidebar-group-item">
                            <img src={c.avatar} alt="" className="sidebar-group-item-avatar" />
                            <span className="sidebar-group-item-user">{c.name}</span>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}
