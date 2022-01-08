import React from 'react'
import Announcements from './Announcements/Announcements'
import {Pagination} from '@mui/material'
import './Announcement.css'
import axios from 'axios'
import { useEffect } from 'react'
import { useState } from 'react'

export default function Announcement() {
    const SV = process.env.REACT_APP_SV_HOST;

    const [announcements, setAnnouncements] = useState([])
    const [display, setDisplay] = useState([])
    const [page, setPage] = useState(1)
    const [totalPage, setTotalPage] = useState(0)
    const limit = 5

    const fetchAnnouncement = async () => {
        try{
            const res = await axios.get(SV + '/announcements/')
            setAnnouncements(res.data)
        }
        catch(err){

        }
    }

    useEffect(() => {
        fetchAnnouncement()
        
        
    }, [])

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
                
            </div>
            <div className="announcement-bottom">
                {display.map(a => <Announcements key={a._id} announcement={a} />)}
                
                <Pagination count={totalPage} onChange={pageHandle} />
            </div>
        </div>
    )
}
