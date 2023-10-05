const { check, validationResult } = require('express-validator');



exports.signupValidation=[
    check('name')
    .notEmpty()
    .withMessage(' name is require'),
    check('email')
    .isEmail()
    .withMessage('valid email required'),
    check('password')
    .isLength({ min: 6 })
    .withMessage('password must be at least 5 chars long')
];

exports.signinValiadtion=[
    check('email')
    .isEmail()
    .withMessage('valid email required'),
    check('password')
    .isLength({ min: 6 })
    .withMessage('password must be at least 5 chars long')
]

exports.isrequestValidated=(req,resp,next)=>{

    const errors=validationResult(req)
    if(errors.array().length>0){
        return resp.status(400).json({error:errors.array()[0].msg})
    }
    next()

}