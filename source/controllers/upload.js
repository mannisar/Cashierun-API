const multer = require('multer')

const multerStorage = multer.diskStorage({
  destination: function (request, file, callback) {
    callback(null, './upload')
  },
  filename: function (request, file, callback) {
    callback(null, file.originalname)
  }
})

const multerFilter = (request, file, callback) => {
  if (file.mimetype.startsWith('image')) {
    callback(null, true)
  } else {
    callback(null, false)
  }
}

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
  limits: {
    fileSize: 1024 * 1024
  }
})

const uploadFiles = upload.single('image')

const uploadImages = (request, response, next) => {
  uploadFiles(request, response, error => {
    if (error instanceof multer.MulterError) {
      if (error.code === 'LIMIT_FILE_SIZE') {
        return response.status(404).json({
          status: 404,
          message: 'File Too Large! MAX (1 MB)'
        })
      }
    } else if (error) {
      return response.status(404).json({
        status: 404,
        message: 'Please Upload Only Image!'
      })
    }
    next()
  })
}

module.exports = {
  uploadImages: uploadImages
}
