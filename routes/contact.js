var express = require('express');
var router = express.Router();
var Contact = require('../model/contact');

/* GET users listing. */
router.get('/', function (req, res, next) {
    Contact.find(function (err, data) {
        if (err) throw  err;
        res.render('getAllContacts.twig', {data});
        console.log(data);
    });
});

router.get('/addContact', function (req, res, next) {
    res.render('addContact.twig');
});

router.post('/addAction', function (req, res, next) {
    console.log(req.body);
    var contact = new Contact(
        {
            FullName: req.body.fullname,
            Phone: req.body.phone
        })
    contact.save();
    res.render("getAllContacts.twig");

});
router.get('/delete/:id', function (req, res, next) {
    var id = req.params.id;
    Contact.findOneAndRemove({_id: id}, (err) => {
        if (err) throw  err;
    })
    res.redirect('/contact');
});


router.get('/modifier/:id', function (req, res, next) {
    var id = req.params.id;
    Contact.findById({_id: id}, (err, data) => {
        if (err) throw  err;
        res.render('addContact.twig', {data});
        console.log(data);
    });
});
router.post('/update/:id', function (req, res, next) {
    var id = req.params.id;
    Contact.findByIdAndUpdate({_id: id}, {
            FullName: req.body.fullname,
            Phone: req.body.phone
        },
        (err) => {
            if (err) throw err;
        });
    res.redirect('/contact');
});

module.exports = router;
