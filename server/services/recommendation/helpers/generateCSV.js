const express = require('express')
const router = express.Router()
var XLSX = require('xlsx');
const download = require('download');
const fs = require('fs');
const https = require('https');

const LS = require('../../../models/ListenedSong');

module.exports = {
    generate: async () => {
        var wb = XLSX.utils.book_new();
    
        try {
            const data = await LS.find({}).select({ _id: 0, user_id: 1, song_id: 1, listen_count: 1 })
    
            var temp = JSON.stringify(data);
            temp = JSON.parse(temp);
            var ws = XLSX.utils.json_to_sheet(temp);
            var down = 'public/triplets_file.csv'
            XLSX.utils.book_append_sheet(wb, ws, "sheet1");
            XLSX.writeFile(wb, down);
     
            
        } catch (error) {
            console.log(error.message)
        }
    
    }
}