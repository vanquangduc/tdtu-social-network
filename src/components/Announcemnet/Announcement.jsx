import React from 'react'
import Announcements from './Announcements/Announcements'
import {Pagination} from '@mui/material'
import './Announcement.css'
import axios from 'axios'
import { useEffect } from 'react'
import { useState } from 'react'

export default function Announcement({announceCategory}) {
    const SV = process.env.REACT_APP_SV_HOST;

    const [announcements, setAnnouncements] = useState([])
    const [display, setDisplay] = useState([])
    const [page, setPage] = useState(1)
    const [totalPage, setTotalPage] = useState(0)
    const [categoryName, setCategoryName] = useState('')
    const limit = 5
    const category = [
        {
            id: "cthhsv",
            name: "Phòng Công tác học sinh sinh viên",
        },
        {
            id: "ptc",
            name: "Phòng tài chính",
        },
        {
            id: "tdtclc",
            name: "TDT Creative Language Center",
        },
        {
            id: "ttth",
            name: "Trung tâm tin học",
        },
        {
            id: "ttdtptxh",
            name: "Trung tâm đào tạo phát triển xã hội",
        },
        {
            id: "ttptkh",
            name: "Trung tâm phát triển Khoa học quản lý và Ứng dụng công nghệ",
        },
        {
            id: "tthtdn",
            name: "Trung tâm hợp tác doanh nghiệp và cựu sinh viên",
        },
        {
            id: "kl",
            name: "Khoa Luật",
        },
        {
            id: "ttnn",
            name: "Trung tâm ngoại ngữ - tin học - bồi dưỡng văn hóa",
        },
        {
            id: "vcskt",
            name: "Viện chính sách kinh tế và kinh doanh",
        },
        {
            id: "kmtcn",
            name: "Khoa Mỹ thuật công nghiệp",
        },
        {
            id: "kddt",
            name: "Khoa Điện - Điện tử",
        },
        {
            id: "kcntt",
            name: "Khoa Công nghệ thông tin",
        },
        {
            id: "kqtkd",
            name: "Khoa Quản trị kinh doanh",
        },
        {
            id: "kmt",
            name: "Khoa Môi trường và bảo hộ lao động",
        },
        {
            id: "kldcd",
            name: "Khoa Lao động công đoàn",
        },
        {
            id: "ktcnn",
            name: "Khoa Tài chính ngân hàng",
        },
        {
            id: "kgdqt",
            name: "Khoa giáo dục quốc tế",
        }
    ]

    const fetchAnnouncement = async () => {
        try{
            const res = announceCategory ? await axios.get(SV + '/announcements/' + announceCategory) : await axios.get(SV + '/announcements/')
            announceCategory ? setCategoryName(category.filter(c => c.id == announceCategory)[0].name) : setCategoryName("Tất cả thông báo")
            setAnnouncements(res.data)
        }
        catch(err){

        }
    }

    useEffect(() => {
        fetchAnnouncement()
        
        
    }, [announceCategory])

    useEffect(() => {
        setTotalPage(Math.ceil(announcements.length/limit))
        const dp = announcements.slice((page - 1) * limit, page * limit)
        setDisplay([...dp])

    }, [page, announcements])


    const pageHandle = (event, value) => {
        setPage(value)
    }

    return (
        <div className="announcement">
            
            <div className="announcement-top">
                <div className="announcement-category">
                    {categoryName}
                </div>
            
            </div>
            <div className="announcement-bottom">
                {display.map(a => <Announcements key={a._id} announcement={a} />)}
                
                <Pagination count={totalPage} onChange={pageHandle} />
            </div>
        </div>
    )
}
