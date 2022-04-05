const {GridFsStorage} = require("multer-gridfs-storage");
const multer = require("multer");
const configDB = require('../db.json');


const storage = new GridFsStorage({
    //url: configDB.mongo.uri,
    url: process.env.MONGODB_URL,
    file: (req, file) => {
        return new Promise((resolve, reject) => {
            let fileInfo;
            if (file.originalname.split('.')[1].length === 3 ){
                 fileInfo = {
                    filename: file.originalname.slice(0, -4),
                    bucketName: 'uploads',
                };
            }else if (file.originalname.split('.')[1].length === 4){
                 fileInfo = {
                    filename: file.originalname.slice(0, -5),
                    bucketName: 'uploads',
                };
            }
            resolve(fileInfo);
        });
    }
});
const upload = multer({storage});
module.exports = upload;
