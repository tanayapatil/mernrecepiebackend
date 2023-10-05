const Recipies = require('../models/Recipies')


/// yat try catch block ghalun async awit ghatlay or flpcart clone sarkhe
exports.addrecepie = async (req, resp) => {



    try {

        const { name, catagory, description,youTube } = req.body




        const recepie = new Recipies({
            name: name,
            catagory: catagory,
            description: description,
            image: req.file.path,
            youTube:youTube
        })
        const saveRecipie = await recepie.save()
        console.log(req.body.name)
        console.log(req.file)
        return resp.status(200).json({ recepie: saveRecipie })




        // resp.send('hi')



    } catch (error) {
        console.error(error.message);
        //  res.status(500).send("internal server error");
        return resp.status(500).json({ error: "internal server error" });
    }

}

exports.addimg = (req, resp) => {

    // const {img}=req.file
    // resp.status(200).json({imag:img})
    // console.log(req.file)

    resp.send('file upload')


}

exports.getRecepieById = async(req, resp) => {


    // console.log(req.params)
    // return resp.send(req.params)

    // Recipies.find({ _id: req.params })
    //     .exec((error, singleRecepie => {
    //         if (error) {
    //             return resp.status(400).json({ error })
    //         }
    //         if (singleRecepie) {
    //             return resp.status(200).json({ singleRecepie: singleRecepie })
    //         }
    //     }))



    try{
        const singleRecepie=await Recipies.find({_id:req.params.recepieid})
        console.log(singleRecepie)

        if(singleRecepie){
            return resp.status(200).json({singleRecepie:singleRecepie})
        }


        // return resp.send(singleRecepie)

    }catch (error) {
        console.error(error.message);
        //  res.status(500).send("internal server error");
        return resp.status(500).json({ error: "internal server error" });
    }


       

}

exports.getAllItems=async(req,resp)=>{
    try{

        const allItems=await Recipies.find({})
        if(allItems){
            return resp.status(200).json({allItems:allItems})
        }

    }catch (error) {
        console.error(error.message);
        //  res.status(500).send("internal server error");
        return resp.status(500).json({ error: "internal server error" });
    }
}





