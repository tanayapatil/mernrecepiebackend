const express=require('express')
const multer=require('multer');
const {addrecepie,addimg,getRecepieById,getAllItems}=require('../controllers/recipies')
const path=require('path');

const router = express.Router();


// const middle=app.use(express.urlencoded({ extended: false }))

// const storage = multer.diskStorage({
   

//     destination:"uploads",

    
   
//     filename: function (req, file, cb){
//         return cb(`${Date.now()}-${file.originalname}`)
//     }
// })
// const upload = multer({ storage: storage })

const upload = multer({
    storage: multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null,'uploads');
        },
        filename : function(req,file,cb){
            cb(null, `${Date.now()}-${file.originalname}`)
        }
    }),
}).single("myImg");


router.post('/additem',upload,addrecepie)
router.get('/singleItem/:recepieid',getRecepieById)
router.get('/allItem',getAllItems)






module.exports = router
