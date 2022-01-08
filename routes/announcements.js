const router = require('express').Router()
const Announcement = require('../models/announcement')
const User = require('../models/user')

//Create Announcement
router.post("/", async (req, res) => {
    const newAnnouncement = new Announcement(req.body)
    try{
        const announcement = await newAnnouncement.save()
        res.status(200).json(announcement)
        
    }
    catch(err){
        res.status(500).json(err)
    }
})

//Update Announcement
router.put("/:id", async (req, res) => {
    try{
        const announcement = await Announcement.findById(req.params.id)
        if(announcement.userId == req.body.userId){
            const updated = await Announcement.findByIdAndUpdate(req.params.id, {
                $set: req.body
            })
            res.status(200).json(updated)
        }
        else{
            res.status(400).json('You can update only your announcements')
        }
    }
    catch(err){
        res.status(500).json(err)
    }    
})

//Get all Announcements
router.get('/', async(req,res) => {
    try{
        const allAnnouncements = await Announcement.find().sort([['updatedAt', -1]])
        res.status(200).json(allAnnouncements);
    }catch(err){
        res.status(500).json(err)
    }
    
})

router.get('/:categoryId', async (req, res) => {
    try{
        const category = req.params.categoryId
        let result
        if(category == "cthssv"){
            result = await Announcement.find({faculty: "Phòng Công tác học sinh sinh viên"})
        }
        if(category == "ptc"){
            result = await Announcement.find({faculty: "Phòng tài chính"})
        }
        if(category == "tdtclc"){
            result = await Announcement.find({faculty: "TDT Creative Language Center"})
        }
        if(category == "ttth"){
            result = await Announcement.find({faculty: "Trung tâm tin học"})
        }
        if(category == "ttdtptxh"){
            result = await Announcement.find({faculty: "Trung tâm đào tạo phát triển xã hội"})
        }
        if(category == "ttptkh"){
            result = await Announcement.find({faculty: "Trung tâm phát triển Khoa học quản lý và Ứng dụng công nghệ"})
        }
        if(category == "tthtdn"){
            result = await Announcement.find({faculty: "Trung tâm hợp tác doanh nghiệp và cựu sinh viên"})
        }
        if(category == "kl"){
            result = await Announcement.find({faculty: "Khoa Luật"})
        }
        if(category == "ttnn"){
            result = await Announcement.find({faculty: "Trung tâm ngoại ngữ - tin học - bồi dưỡng văn hóa"})
        }
        if(category == "vcskt"){
            result = await Announcement.find({faculty: "Viện chính sách kinh tế và kinh doanh"})
        }
        if(category == "kmtcn"){
            result = await Announcement.find({faculty: "Khoa Mỹ thuật công nghiệp"})
        }
        if(category == "kddt"){
            result = await Announcement.find({faculty: "Khoa Điện - Điện tử"})
        }
        if(category == "kcntt"){
            result = await Announcement.find({faculty: "Khoa Công nghệ thông tin"})
        }
        if(category == "kqtkd"){
            result = await Announcement.find({faculty: "Khoa Quản trị kinh doanh"})
        }
        if(category == "kmt"){
            result = await Announcement.find({faculty: "Khoa Môi trường và bảo hộ lao động"})
        }
        if(category == "kldcd"){
            result = await Announcement.find({faculty: "Khoa Lao động công đoàn"})
        }
        if(category == "ktcnn"){
            result = await Announcement.find({faculty: "Khoa Tài chính ngân hàng"})
        }
        if(category == "kgdqt"){
            result = await Announcement.find({faculty: "Khoa giáo dục quốc tế"})
        }
        res.status(200).json(result)
    }
    catch(err){
        res.status(500).json(err)
    }
})

//Get user's announcement
router.get('/list/userId/:userId', async(req,res) => {
    try{
        let userId = req.params.userId
        const user = await User.findOne({ _id: userId})
        const userAnnouncement = await Announcement.find({userId: user._id}).sort(([['updatedAt', -1]]))
        res.status(200).json(userAnnouncement)
    }catch{
        res.status(500)
    }
})

//Delete announcement
router.post('/:id', async(req, res) => {
    try{
        const announcement = await Announcement.findById(req.params.id)
        if(announcement.userId == req.body.userId){
            await Announcement.findByIdAndDelete(req.params.id)
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

//Get one announcement for update
router.get("/list/:id", async (req, res) => {
    try{
        const announcement = await Announcement.findById({_id:req.params.id})
        res.status(200).json(announcement)
    }
    catch(err){
        res.status(500).json(err)
    }    
})

module.exports = router