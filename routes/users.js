const router = require('express').Router()
const User = require('../models/user')
const bcrypt = require('bcrypt')



//get a user
router.get('/', async(req, res) => {
    const userId = req.query.userId
    const emailname = req.query.emailname
    try{
        const user = userId ? await User.findById(userId) : await User.findOne({emailname: emailname})
        const {password, ...other} = user._doc
        res.status(200).json(other)
    }
    catch (err){
        res.status(500).json(err)
    }
})

router.post('/compare/:id', async (req, res) => {
    if(req.body._id == req.params.id ){
        try{
            const user = await User.findById(req.body._id)
            const comparePassword = await bcrypt.compare(req.body.password, user.password)
            if(comparePassword){
                return res.status(200).json({code: 'success'})
            }
            return res.status(200).json({code: 'failed'})
        }
        catch(err){
            return res.status(500).json(err)
        }
    }
    else{
        return res.status(400).json("you can update only your account")
    }
})

//update user
router.put('/:id', async(req, res) => {
    if(req.body._id == req.params.id ){
        if(req.body.password){
            try{
                const salt = await bcrypt.genSalt(10)
                req.body.password = await bcrypt.hash(req.body.password, salt)
                await User.findByIdAndUpdate(req.params.id, {
                    $set: req.body
                })
                return res.status(200).json({code: 'success'})
            }
            catch (err){
                return res.status(500).json(err)
            }
        }
        try{
            const user = await User.findByIdAndUpdate(req.params.id, {
                $set: req.body
            })
            return res.status(200).json(user)
        }
        catch (err){
            return res.status(500).json(err)
        }
    }
    else{
        return res.status(400).json("you can update only your account")
    }
})

//delete user
router.delete('/:id', async(req, res) => {
    if(req.body.userId == req.params.id ){
        try{
            await User.findByIdAndDelete(req.params.id)
            res.status(200).json("deleted")
        }
        catch (err){
            res.status(500).json(err)
        }
    }
    else{
        res.status(400).json("you can delete only your account")
    }
})

//get all users
router.get('/all', async(req, res) => {
    try{
        const users = await User.find()
        let result = []
        users.map(u => {
            const {_id, username, avatar} = u._doc
            result.push({_id, username, avatar})
        })
        res.status(200).json(result)
    }
    catch (err){
        res.status(500).json(err)
    }
})

module.exports = router