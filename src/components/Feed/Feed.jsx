import Profile from "../Profile/Profile";
import Post from "../Post/Post";
import Share from "../Share/Share";
import './Feed.css'
import { useState, useEffect, useContext } from "react";
import axios from 'axios'
import { CircularProgress } from '@mui/material'
import { PostContext } from "../../context/PostContext";
import { CheckCircleOutline } from "@mui/icons-material";
import { AuthContext } from "../../context/AuthContext";


export default function Feed({emailname}) {
    const [page, setPage] = useState(1)
    const [isEnd, setIsEnd] = useState(false)


    const {posts, isFetching, dispatch} = useContext(PostContext)
    const {user} = useContext(AuthContext)

    const SV = process.env.REACT_APP_SV_HOST
    

    const fetchPosts = async () => {
        try{
            
            const res = emailname 
            ? await axios.get(SV + '/posts/profile/emailname/' + emailname + '/page/' + page + '/limit/10')
            : await axios.get(SV + '/posts/timeline/page/' + page + '/limit/10') 
            const newPosts = posts.concat(res.data)

            if (newPosts.length === posts.length){
                setIsEnd(true)
                
            }

            if(page === 1){
                dispatch({type: "POST_SUCCESS", payload: [...res.data] })
            }
            else{
                const ps = [...posts, ...res.data]
                const payload = ps.filter((object,index) => index === ps.findIndex(obj => JSON.stringify(obj) === JSON.stringify(object)))
                dispatch({type: "POST_SUCCESS", payload: payload })
            }  
            
        }
        catch(err){
            dispatch({type: "POST_FAILURE", payload: err})
        }
        
    }

    useEffect(() => {
        fetchPosts()
        
    }, [page, emailname])


    const handleScroll = () => {
        const bottom = Math.ceil(window.innerHeight + window.scrollY) >= document.documentElement.scrollHeight
        setTimeout(() => {
            if (bottom && !isEnd) {
                setPage(page + 1)
            }
        }, 100)
        
        
    }

    useEffect(() => {
        window.addEventListener('scroll', handleScroll, {
            passive: true
        });
      
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
        
    }, [posts])
    

    const HomeFeed = () => {
        return(
            <>
                <Share/>
                {posts.map((p) => (
                    <Post key={p._id} post={p} />
                ))}
                
            </> 
        )
    }

    const ProfileFeed = () => {
        return(
            <>
                <Profile emailname={emailname}/>
                {user.emailname === emailname ? <Share/>  : null}    
                {posts.map((p) => (
                    <Post key={p._id} post={p} />
                ))}
                
            </> 
        )
    }

    return (
        isFetching
        ? <CircularProgress/>
        : <div className="feed">
            <div className="feed-items">
                {emailname ? <ProfileFeed/> : <HomeFeed/>} 
                {isEnd ? <div className="feed-end"><CheckCircleOutline /> No more posts to load </div> : null}        
            </div>
        </div>
    )
}
