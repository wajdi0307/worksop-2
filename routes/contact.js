var express = require('express');
var router = express.Router();
var Contact = require('../model/contact');

/* GET users listing. */
router.get('/', function (req, res, next) {
    Contact.find(function (err, data) {
        if (err) throw err;
        res.render('getAllContacts.twig', { data });
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
    Contact.findOneAndRemove({ _id: id }, (err) => {
        if (err) throw err;
    })
    res.redirect('/contact');
});


router.get('/modifier/:id', function (req, res, next) {
    var id = req.params.id;
    Contact.findById({ _id: id }, (err, data) => {
        if (err) throw err;
        res.render('addContact.twig', { data });
        console.log(data);
    });
});
router.post('/update/:id', function (req, res, next) {
    var id = req.params.id;
    Contact.findByIdAndUpdate({ _id: id }, {
        FullName: req.body.fullname,
        Phone: req.body.phone
    },
        (err) => {
            if (err) throw err;
        });
    res.redirect('/contact');
});

router.post('/search', function (req, res, next) {
    console.log("tkalem" + req.body.Search)
    Contact.find(function (err, data1) {
        if (err) throw err;
        let data = [];
        if (req.body.Search == "") {
            res.redirect('/contact');
        } else {
            data1.forEach(element => {
                if (req.body.Search == element.FullName) {

                    data.push(element)
                    console.log("dataa est : " + data)
                }

            });
        }
        if (data == null) {
            res.render('getAllContacts.twig', { data1 });
        } else {
            res.render('getAllContacts.twig', { data });
        }
       
    });
});
module.exports = router;