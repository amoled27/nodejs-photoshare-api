const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

//User model
var Image = require('../models/Images');

router.get('/:userid', (req, res) => {
   Image.find({userId:req.params.userid})
        .then(images => {
            //if JSON API req
            //res.json(images);            
           res.render('images', { images: images, userid: req.params.userid });
        })
        .catch(err => res.send(err));
});

router.get('/add/:userid', (req, res) => {
    res.render('addImage',{userid:req.params.userid});
});

router.post('/:userid', (req, res) => {
    var uid = req.params.userid;
    const newImage = {
        userId: uid,
        url:req.body.url,
        name:req.body.name,
        createdAt: Date.now()
    }
    new Image(newImage)
        .save()
        .then(image=>{
            console.log("image added"+ image);
            res.redirect('/images/'+uid);
        })
        .catch(err=>res.send(err));
});

router.get('/delete/:userid/:id',(req,res)=>{
    var uid = req.params.userid;
    var imageid = req.params.id;
    Image.remove({_id:imageid, userId:uid})
         .then(()=>{
             res.redirect('/images/'+uid);
         })
         .catch(err => res.send(err));
         
})


module.exports = router;