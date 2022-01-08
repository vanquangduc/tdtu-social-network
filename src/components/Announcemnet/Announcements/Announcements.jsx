import React from 'react'
import './Announcements.css'
import { useState, useEffect, useRef } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from '@mui/material';
import parse from 'html-react-parser'

export default function Announcements({announcement}) {

    const [date, setDate] = useState(new Date(announcement.createdAt))
    const [open, setOpen] = useState(false);
    const handleClickOpen = () => () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    const descriptionElementRef = useRef(null);
    useEffect(() => {
        if (open) {
            const { current: descriptionElement } = descriptionElementRef;
            if (descriptionElement !== null) {
                descriptionElement.focus();
            }
        }
    }, [open]);

    return (
        <div className="announcements">
            <ul className="announcements-list">
                <li className="announcements-list-item" onClick={handleClickOpen()}>
                    <div className="announcements-list-item-title">{announcement.title}</div>
                    <div className="announcements-list-item-text">{parse(announcement.text)}</div>
                    <div className="announcements-list-item-bottom">
                        <div className="announcements-list-item-faculty">{announcement.faculty}</div>
                        <div className="announcements-list-item-date">{date.toLocaleDateString("en-US")}</div>
                    </div>  
                </li>           
            </ul>

            <Dialog
                open={open}
                onClose={handleClose}
                scroll="paper"
                aria-labelledby="scroll-dialog-title"
                aria-describedby="scroll-dialog-description"
            >
                <DialogTitle id="scroll-dialog-title">{announcement.title}</DialogTitle>
                <DialogContent dividers={true}>
                <div className='announcements-container'>
                    <div className='announcements-sender'>{announcement.faculty} | {date.toLocaleDateString("en-US")}</div>
                    <DialogContentText
                        id="scroll-dialog-description"
                        ref={descriptionElementRef}
                        tabIndex={-1}
                    >
                        {parse(announcement.text)}
                    </DialogContentText>
                </div>
                </DialogContent>
                <DialogActions>
                <Button onClick={handleClose}>Close</Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}
