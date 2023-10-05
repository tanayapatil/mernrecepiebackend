const express = require('express')
const env = require('dotenv').config()
const multer=require('multer');
const cors =require('cors')
const bodyParser = require("body-parser");
const PORT=process.env.PORT || 2000









var app = express();

// const forms = multer();
// app.use(forms.array()); 
app.use(express.json()) // for json

app.use(express.urlencoded({ extended: true  })) // for form data




app.use(cors())

const mongoose = require('mongoose');

// app.use('/uploads',express.static('uploads'))

//front end la uploads folder madhle images access karnyasathi

app.use('/uploads',express.static('uploads'))



const recepieRoute = require('./src/routes/recipies')
const userRoute=require('./src/routes/user')



mongoose.connect(`mongodb+srv://${process.env.MONGO_DB_USER}:${process.env.MONGO_DB_PASSWORD}@cluster0.wplcm5j.mongodb.net/${process.env.MONGO_DB_DATABASE}?retryWrites=true&w=majority`)
    .then(() => console.log("Connected to MongoDB..."))
    .catch((err) => console.error("Could not connect to MongoDB...", err));

    

    


app.use('/api', recepieRoute)
app.use('/api', userRoute)

app.listen(PORT, () => {
    console.log(`server is running on port no ${PORT}`)
}) 

// app.listen(process.env.PORT, async () => {
//     try {
//       await connection;
//       console.log(`DB has been connected`);
//     } catch (error) {
//       console.log(`DB has not been connected`);
//     }
//     console.log(`Server is running at port ${process.env.PORT}`);
//   });