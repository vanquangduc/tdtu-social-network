import {React, useState, useEffect, useContext, useTheme} from 'react'
import { Link } from 'react-router-dom'
import { AuthContext } from '../../context/AuthContext'
import Navbar from '../../components/NavBar/Navbar'
import Rightbar from '../../components/Rightbar/Rightbar'
import Sidebar from '../../components/Sidebar/Sidebar'
import axios from 'axios'
import {CheckCircleOutline} from '@mui/icons-material';
import AddIcon from '@mui/icons-material/Add';
import { Paper} from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses }  from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableFooter from '@mui/material/TableFooter';
import TablePagination from '@mui/material/TablePagination';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import './MyAnnouncement.css'
import UserAnnouncement from '../../components/Announcemnet/MyAnnouncement/MyAnnouncement'


export default function MyAnnouncement({}) {
    const [fetchOk, setFetchOk] = useState(false)
    const [haveAnnouncements, setHaveAnnouncments] = useState(false)
    const [announcements, setAnnouncements] = useState([])
    const {user} = useContext(AuthContext)
    const SV = process.env.REACT_APP_SV_HOST

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };


    const StyledTableCell = styled(TableCell)(({ theme }) => ({
        [`&.${tableCellClasses.head}`]: {
          backgroundColor: theme.palette.primary.light,
          color: theme.palette.common.black,
        },
        [`&.${tableCellClasses.body}`]: {
          fontSize: 14,
        },
      }));
      
      const StyledTableRow = styled(TableRow)(({ theme }) => ({
        '&:nth-of-type(odd)': {
          backgroundColor: theme.palette.action.hover,
        },
        // hide last border
        '&:last-child td, &:last-child th': {
          border: 0,
        },
      }));

    const fetchAnnouncements = async () => {
        await axios.get(SV + '/announcements/list/userId/'+user._id)
        .then(response => {
            if(response.status === 200){
                if(response.data.length > 0){
                    setHaveAnnouncments(true)
                    setAnnouncements(response.data)
                    console.log(response.data);
                }
                setFetchOk(true)
            }else{
                setFetchOk(false)
            }
        })
      
    }

    useEffect(() => {
        fetchAnnouncements()
    }, [user._id])

    let index = 0
    return (
        <div>
            <Navbar/>
            <div className='mainContainer'>
                <Sidebar />
                <div className="MA-container">
                    
                    <h1>My Announcements</h1>
                    <div id="add-announcement" >
                        <Button startIcon={<AddIcon/>} variant="outlined">
                            <Link to="/announcement/create">
                                Add an announcement
                            </Link>
                        </Button>
                    </div>
                    {fetchOk ?
                    // Have Announcement
                        haveAnnouncements ?
                            <TableContainer sx={{mt: 3}} component={Paper}>
                                <Table sx={{ minWidth:800 }} aria-label="simple table">
                                    <TableHead>
                                        <TableRow>
                                            <StyledTableCell align="left">#</StyledTableCell>
                                            <StyledTableCell align="left">Title</StyledTableCell>
                                            <StyledTableCell align="left">Type</StyledTableCell>
                                            <StyledTableCell align="left">Faculty</StyledTableCell>
                                            <StyledTableCell align="left">Update at</StyledTableCell>
                                            <StyledTableCell align="left">Time</StyledTableCell>
                                            <StyledTableCell align="left"></StyledTableCell>     
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {(rowsPerPage > 0
                                        ? announcements.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                        : announcements).map((announce) => (
                                            <UserAnnouncement key={announce._id} announce={announce} index={index += 1}/>
                                        ))}
                                    </TableBody>
                                   
                                </Table>
                                <Divider/>
                                <TableFooter>
                                    <TablePagination
                                        rowsPerPageOptions={[5,10, 25, 100]}
                                        component="div"
                                        count={announcements.length}
                                        rowsPerPage={rowsPerPage}
                                        page={page}
                                        onPageChange={handleChangePage}
                                        onRowsPerPageChange={handleChangeRowsPerPage}
                                    />
                                    </TableFooter>
                                
                               
                                </TableContainer> :
                    // Don't Have Announcement
                            <div className="feed-end"><CheckCircleOutline /> No more announcements </div>
                        : 
                    <div>error</div>}

                        
                    </div>
                <Rightbar/>
            </div>
        </div>
    )
}

