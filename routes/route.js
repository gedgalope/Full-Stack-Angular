const express = require('express');
const router = express.Router();

const Contact = require ('../models/contacts');
//ret data
router.get('/contacts',(req,res,next)=>{
    Contact.find(function(err, contacts){
        res.json(contacts);
    });
}); 
//add contact


router.post('/contacts',(req,res,next)=>{ // post(http method), router.post(path,middleware function(request argument, response argument, callback argument))
    //logic to add contact
    let newContact = new Contact({
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        phone_number: req.body.phone_number
    });
    newContact.save((err, contact)=>{ //save to db
        if(err){
            res.json({msg:'failed to add contact ' + err});
            console.log(err);
        }else{
            res.json({msg:'contact added sucessfully'});
        }
    });
});

//delete contact
router.delete('/contacts/:id',(req,res,next)=>{
    Contact.remove({_id: req.params.id}, function(err,result){
        if (err) {
            res.json(err);
        } else {
            res.json(result); 
        }
    });
});

module.exports = router;