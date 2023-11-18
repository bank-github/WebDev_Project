const multer = require('multer');

const storageOption = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/img/',)
    },
    filename: function (req, file, cb) {
        //rename file with timestamp as prefix
        cb(null, file.originalname);
        // to get only file extension -> path.extname(file.originalname)
        // to get only filename -> path.basename(fileName, path.extname(
        // file.originalname))
    }
});

// set upload option and input fieldname
const upload = multer({ storage: storageOption }).single("filetoupload");

module.exports = upload;