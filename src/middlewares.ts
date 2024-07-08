import multer, { Multer } from "multer";
import config from './config'


class Middlewares {
  storageVideo(): Multer {
    const { video } = config;
    const storage = multer.diskStorage({
      destination: function (req, file, cb) {
        console.log(file)
        cb(null, video.inputRelativePath)
      },
      filename: function (req, file, cb) {
        const uniqueName = `${Date.now()}-${Math.round(Math.random() * 1E9)}-${file.originalname}`
        cb(null, uniqueName)
      }
    })
    
    return multer({ storage })
    
  }
}


// storageVideo(): Multer {
//   const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//       console.log(file)
//       cb(null, config.video.inputPath)
//     },
//     filename: function (req, file, cb) {
//       const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
//       cb(null, `${uniqueSuffix}-${file.originalname}`)
//     }
//   })
  
//   return multer({ storage })
  
// }

export default new Middlewares();

