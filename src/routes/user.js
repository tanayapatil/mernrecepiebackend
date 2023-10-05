const express=require('express')
const{signupValidation,signinValiadtion,isrequestValidated}=require('../Validators/auth')
const router = express.Router();

const {signup,login}=require('../controllers/user')

router.post('/signup', signupValidation,isrequestValidated,signup)
router.post('/login', signinValiadtion,isrequestValidated,login)


module.exports = router
