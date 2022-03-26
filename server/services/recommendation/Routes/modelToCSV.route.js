const express = require('express')
const router = express.Router()
const spawn = require('child_process').spawn;

const Ls = require('../../../models/ListenedSong')
//generate random data using faker 
router.get('/recommend/:id', async (req, res) => {

   try {
      let stringifiedData = JSON.stringify(req.params['id']);
      const py = spawn('python3', ['../helpers/recommenders.py', stringifiedData], {
         detached: true,
     });
      
      resultString = '';
      
      // As the stdout data stream is chunked,
      // we need to concat all the chunks.
      py.stdout.on('data',  (stdData) => {
         console.log(stdData)
       
         resultString += stdData.toString();
      });
      
      py.stdout.on('end',  (stdData) => {
         console.log("object")
         // Parse the string as JSON when stdout
         // data stream ends
         let resultData = JSON.parse(resultString);
         let song = resultData['song'];
      
         console.log(song)
      });
   } catch (error) {
      return res.status(500).json({ error: error.message });
   }


});



module.exports = router