
const express = require('express')
const User = require('../../../models/User')
const router = express.Router()
const createError = require('http-errors')
const { authSchema } = require('../helpers/validationSchema')
const mongoose = require('mongoose')

const ProfileController = require('../Controllers/profile.Controller')

router.get('/getAll',ProfileController.getAll )
router.get('/getOne/:id',ProfileController.getOne )
router.get('/getByUserName/:username',ProfileController.getOneByUserName )

router.delete("/deleteUser/:id",ProfileController.delete);
router.patch('/update/:id', ProfileController.update )

router.put('/follow/:idUser/:idUserToFollow',ProfileController.follow )
router.put('/unfollow/:idUser/:idUserToFollow',ProfileController.unfollow )

router.get("/followers/:id",ProfileController.getFollowers );
router.get("/following/:id", ProfileController.getFollowing );

router.post("/confirmPasswordUpdate/:id",ProfileController.confirmPasswordUpdate );
router.post("/resetPassword/:id",ProfileController.resetPassword );



module.exports = router
