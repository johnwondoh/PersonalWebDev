/* packages for adding uploading files (particularly images) in our projects */
var path              = require("path"),
    crypto            = require("crypto"),
    multer            = require("multer"),
    GridFsStorage     = require("multer-gridfs-storage"),
    Grid              = require("gridfs-stream");
    
// const mongoURI = 'mongodb://localhost/blogDB'; 
const mongoURI = process.env.BLOGDATATBASEURL;

//create storage engine
const  storage = new GridFsStorage({
  url: mongoURI,
  file: (req, file) => {
    return new Promise((resolve, reject) => {
      crypto.randomBytes(16, (err, buf) => {
        if (err) {
          return reject(err);
        }
        const filename = buf.toString('hex') + path.extname(file.originalname);
        const fileInfo = {
          filename: filename,
          bucketName: 'uploads'
        };
        resolve(fileInfo);
      });
    });
  }
});

// const upload = multer({ storage });
module.exports = multer({ storage });

