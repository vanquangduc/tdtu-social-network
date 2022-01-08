const router = require('express').Router()
const Post = require('../models/post')
const User = require('../models/user')

//create post
router.post('/', async(req, res) => {
    const newPost = new Post(req.body.newPost)
    try{
        const post = await newPost.save()
        res.status(200).json(post)
    }
    catch(err){
        res.status(500).json(err)
    }
})

//update post
router.put('/:id', async(req, res) => {
    try{
        const post = await Post.findById(req.params.id)
        if(post.userId == req.body.userId){
            const updated = await Post.findByIdAndUpdate(req.params.id, {
                $set: req.body
            })
            res.status(200).json(updated)
        }
        else{
            res.status(400).json('you can update only your posts')
        }
    }
    catch(err){
        res.status(500).json(err)
    }
})

//delete post
router.post('/:id', async(req, res) => {
    try{
        const post = await Post.findById(req.params.id)
        if(post.userId == req.body.userId){
            await Post.findByIdAndDelete(req.params.id)
            res.status(200).json("deleted")
        }
        else{
            res.status(400).json('you can delete only your posts')
        }
    }
    catch(err){
        res.status(500).json(err)
    }
})

//like a post
router.put('/:id/like', async(req, res) => {
    try{
        const post = await Post.findById(req.params.id)
        if(!post.likes.includes(req.body.userId)){
            await post.updateOne({ $push: { likes: req.body.userId}})
            res.status(200).json('liked')
        }
        else{
            await post.updateOne({ $pull: { likes: req.body.userId}})
            res.status(200).json('disliked')
        }
    }
    catch(err){
        res.status(500).json(err)
    }
})

//get a post
router.get('/:id', async(req, res) => {
    try{
        const post = await Post.findById(req.params.id)
        res.status(200).json(post)
    }
    catch(err){
        res.status(500).json(err)
    }
})

//get all post
router.get('/timeline/page/:page/limit/:limit', async(req, res) => {
    try{
        let page = parseInt(req.params.page)
        let limit = parseInt(req.params.limit)
        let skip = (page-1)*limit
        const allPost = await Post.find().sort([['createdAt', -1]]).skip(skip).limit(limit)
        res.status(200).json(allPost)
    }
    catch(err){
        res.status(500).json([])
    }
})

//get user's post
router.get('/profile/emailname/:emailname/page/:page/limit/:limit', async(req, res) => {
    try{
        let emailname = req.params.emailname
        let page = parseInt(req.params.page)
        let limit = parseInt(req.params.limit)
        let skip = (page-1)*limit
        const user = await User.findOne({emailname})
        const allPost = await Post.find({userId: user._id}).sort([['createdAt', -1]]).skip(skip).limit(limit)
        res.status(200).json(allPost)
    }
    catch(err){
        res.status(500).json([])
    }
})

module.exports = router