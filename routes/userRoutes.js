const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

//User model
var User = require('../models/Users');

router.get('/', (req, res) => {
    User.find()
        .then(users => {
            //if JSON API req
            //res.json(users);
            res.render('users', { users: users });
        })
        .catch(err => res.send(err));
});

router.get('/add',(req,res)=>{
    res.render('add');
});


router.post('/',(req,res)=>{
    const newUser = {
        name: req.body.name,
        email: req.body.email,
        age: parseInt(req.body.age),
        phone: parseInt(req.body.phone)
    }
     new User(newUser)
        .save()
        .then(users=>{
            console.log(users)
            res.redirect('/users');
        })
        .catch(err=>res.send(err));

});

router.delete('/delete/:id',(req,res)=>{
    User.remove({_id:req.params.id})
        .then(()=>{
            console.log("user removed");
            res.redirect("/users");
        })
        .catch(err => res.send(err));
})

router.get('/edit/:id',(req,res)=>{
    User.findOne({_id:req.params.id})
        .then(user=>{
            res.render('edituser',{user:user});
        })
        .catch(err => res.send(err));        
})

router.put('/edit/:id',(req,res)=>{
    console.log(req.params.id);
    User.findOne({ _id: req.params.id })
        .then(user=>{
            user.name=req.body.name;
            user.email=req.body.email;
            user.phone=req.body.phone;
            user.age=req.body.age;

            user.save()
                .then(user=>{
                    res.redirect('/users');
                })
                .catch(err => res.send(err));        
                
        })
        .catch(err => res.send(err));        
        
});

module.exports = router;
