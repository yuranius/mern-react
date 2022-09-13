const multer = require('multer')
const fs = require('fs-extra')
const uuid =  require('uuid')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        console.log( '📌:',cb,'🌴 🏁')
        
        // cb( null, '/ReactJs')
        let path = './static' // дирректория
        fs.mkdirsSync(path);
        cb(null, path);
    },
    filename: function (req, file, cb) {
        let extensionFile = file.mimetype.match(/^(.*)\/([^/]*)$/)[2] // расширение файла
        //const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9) // имя файла
        const uniqueSuffix = uuid.v4()
        cb(null, uniqueSuffix + '.' + extensionFile)
    }
})

const upload = multer({ storage: storage  })


module.exports = upload;