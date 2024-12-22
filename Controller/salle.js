const SalleModel = require('../Models/salle')
const jwt = require('jsonwebtoken');
// selecttDate Interface
exports.SelectDate = async (req, res) => {
    try {
        const decodedToken = jwt.verify(req.params.token, process.env.JWT_SECRET);
        console.log(decodedToken)
        
        res.locals.tokenData = req.params.token;
        const salle = await SalleModel.findById(req.params.id);
        res.render('SelectDate' , { salleId:req.params.id,Name:salle.Name,msg:'Please select a date.',user:decodedToken._id});
    } catch(error) {
        res.render('404');
    }
};
// Create and Save a new Salle
exports.create = async (req, res) => {
    res.locals.tokenData = req.params.token;
    if (!req.body) {
        res.status(400).send({ message: "Content can not be empty!" });
    }
    
    const salle = new SalleModel({
        Name: req.body.name,
        Capacity: req.body.capacity,
        Equipments: req.body.equipments,
        IsAvailable : true,
    Location:req.body.location,
    StartTime:req.body.starttime,
    EndTime : req.body.endtime,
    Price:req.body.price,
       // Date: Date.now().toString()
    });
    
    await salle.save().then(data => {
        console.log(data);
        res.redirect("/salle/"+req.params.token)
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating salle"
        });
    });
};
// Retrieve all salles is available from the database.
exports.findAllClient = async (req, res) => {
    res.locals.tokenData = req.params.token;
    const decodedToken = jwt.verify(req.params.token, process.env.JWT_SECRET);
    
        try {
        const salles = await SalleModel.find({IsAvailable :true});
        
        res.render('ListSalle',{salles: salles});
    } catch(error) {
        res.render("404");
    }
};
// Retrieve all salles from the database.
exports.findAll = async (req, res) => {

    try {
        const salles = await SalleModel.find();
        res.locals.tokenData = req.params.token;
                console.log(salles)
        res.render('ListSalleAdmin',{salles: salles});
    } catch(error) {
        res.render("404");
    }
};
// Find a single salle with an id
exports.findOne = async (req, res) => {
    res.locals.tokenData = req.params.token;
        try {
        const salle = await SalleModel.findById(req.params.id);
        console.log(salle)
        res.render('ChangeSalle',{salle: salle});
    } catch(error) {
        res.render('404');
    }
};
// Update a salle by the id in the request
exports.update = async (req, res) => {
    res.locals.tokenData = req.params.token;
        if(!req.body) {
        res.status(400).send({
            message: "Data to update can not be empty!"
        });
    }
    
    const id = req.params.id;
    console.log(req.body)
    
    await SalleModel.findByIdAndUpdate(id, req.body, { useFindAndModify: false }).then(data => {
        if (!data) {
            res.render('404')
        }else{
            res.redirect("/salle/"+req.params.token)
        }
    }).catch(err => {
        res.render('404')
    });
};
// Delete a salle with the specified id in the request
exports.destroy = async (req, res) => {
    res.locals.tokenData = req.params.token;
        await SalleModel.findByIdAndDelete(req.params.id).then(data => {
        if (!data) {
          res.status(404).send({
            message: `salle not found.`
          });
        } else {
            res.redirect("/salle/"+req.params.token)
        }
    }).catch(err => {
        res.status(500).send({
          message: err.message
        });
    });
};