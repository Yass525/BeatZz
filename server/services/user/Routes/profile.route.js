const express = require('express')
const User = require('../../../models/User')
const router = express.Router()
const createError = require('http-errors')
const { authSchema } = require('../helpers/validationSchema')
const mongoose = require('mongoose')

router.get('/getAll', async (req, res) => {
    await User.find()
    .then(data => {
      res.send({users : data});
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving users."
      });
    });
})

router.get('/getOne/:id', async (req, res) => {
  const user = await User.findById(req.params['id'])
  if (!user) throw createError.NotFound("User not registered")

  res.send(user)
})

router.patch('/update/:id', async (req, res, next) => {

    try {
      await authSchema.validateAsync(req.body)
     
      const user = await User.findById(req.params['id'])
          if ({ email } = req.body) {
           
             const exist = await User.findOne({email : email}) 
            
          if(exist) 
              throw createError.Conflict(`${email} is already been registered`)
          }

          if ({ username } = req.body) {
            const exist = await User.findOne({username : username})
         if(exist) 
             throw createError.Conflict(`${username} is already been registered`)
         }
             
      await user.set(req.body) 
      await user.save()

      res.send({ data: user });

    } catch (error) {
      if (error.isJoi === true) error.status = 422
            next(error)
    }
       
})


router.post('/follow/:idUser/:idToUserFollow', async (req, res, next)=>{
  try {
    const user = await User.findById(req.params['idUser'])
    if (!user) throw createError.NotFound("User not found")

    const userToFollow = await User.findById(req.params['idUser'])
    if (!userToFollow) throw createError.NotFound("User not found")

    //const ok = user.follows.pull(userToFollow._id)

    // user.follows.push(userToFollow._id)
    // userToFollow.followers.push(user._id)

    // await userToFollow.save()
    // await user.save()
    follows = user.follows.pull()

//NOT WORKING 

    // console.log(follows.find(_ObjectId(userToFollow._id)))
    // console.log(userToFollow._id)

    // const ok = User.find(
    //   { _id: user._id }, 
    //   { $in: [ userToFollow._id ] },
    // );

  //   User.find({ "city_id": { "$in": userToFollow._id } },function(err,follows) {
  //     if(err) res.send(err.message);
  //            res.send(follows);
            
  //  });

  // const x  = User.find(
  //   { follows: { $elemMatch: { $eq : userToFollow._id } } }
  // )

    // console.log(user.follows.pull().map(follows))
    
  } catch (error) {s
    next(error)
  }


})


module.exports = router