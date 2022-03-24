const express = require('express')
const router = express.Router()
const faker = require('faker')
var XLSX = require('xlsx');

const LS = require('../../../models/ListenedSong');

//generate random data using faker 
router.post('/', (req, res) => {
    try {

        for (var i = 1; i <= 100; i++) {
            var LS = new listenedSong({
                user_id: faker.random.uuid(),
                song_id: faker.random.uuid(),
                listen_count: faker.random.number({ min: 1, max: 100 }),
            });
            LS.save((err, data) => {
                if (err) {
                    console.log(err)
                }
            })
        }
        res.json({ success })
    } catch (error) {
        console.log(error.message)
    }


});


module.exports = router