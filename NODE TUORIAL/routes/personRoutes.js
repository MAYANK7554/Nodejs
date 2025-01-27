const express = require('express');
const router = express.Router();
const Person = require('./../models/Person'); 
module.exports = router;


router.post('/' , async (req,res) => {
    try {
        const data = req.body
        const newPerson = new Person(data);

        const response = await newPerson.save();
        console.log("Data is saved");
        res.status(200).json(response);
    }

    catch(error){
        console.log(error);
        res.status(500).json(error);
    }
}
)

router.get("/", async (req, res) => {
    try {
      const data = await Person.find(); // Fetch all people
      console.log("Data fetched");
      res.status(200).json(data); // Send response
    } catch (error) {
      console.error("Error fetching people:", error.message);
      res.status(500).json({ error: 'error fetching data' });
    }
  });

router.get('/:workType' , async (req,res) => {
    const workType = req.params.workType;
    if(workType=='chef' || workType=='manager'|| workType=='officer'){
        const response = await Person.find({work:workType});
        console.log("Data Fetched");
        res.status(200).json(response);
    }else{
        res.status(404).json({error:'Invalid Work Type'});
    }
})

router.put('/:id' , async (req,res) => {
    try{
        const PersonID = req.params.id;
        const updatedPersonData = req.body;

        const response = await Person.findByIdAndUpdate(PersonID,updatedPersonData , {
            new:true,
            runValidators:true,
        })
        console.log("Data Updated");
        res.status(200).json(response);
        if(!response){
            return res.status(404).json({error:'Person not found'});
        }
        
    } catch(err){
        console.log(err);
        res.status(404).json({error:'Unable to update'});
    }
})

router.delete('/:id' , async (req,res) => {
    try {
        const PersonID = req.params.id;
        const response = await Person.findByIdAndDelete(PersonID);

        if(!response){
            return res.status(404).json({error:'Person Not Found'});
        }
        console.log("Data Deleted");
        res.status(200).json({message:"Data Deleted"});
    }catch(err){
        console.log(err);
        res.status(500).json({error: 'Internal Server Error'});
    }
} )