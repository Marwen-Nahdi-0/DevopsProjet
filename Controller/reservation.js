const reservationModel = require('../Models/reservation')
const salle = require('../Models/salle')
const nodemailer = require('nodemailer'); 
const jwt = require('jsonwebtoken');
const User = require('../Models/user');

const transporter = nodemailer.createTransport({ 
    service: 'gmail', 
    auth: { 
        user: "kacemfazeni@gmail.com", 
        pass: "drmp omam gvzq pnwb" 
    } 
}); 
  
exports.createMailAdd = async (req, res) => {
    if (!req.body) {
        res.status(400).send({ message: "Content can not be empty!" });
    }
      
    res.locals.tokenData = req.params.token;
    const reservationCheck = await reservationModel.find({Date: req.body.date, salle : req.params.salleId});
    if(reservationCheck.length > 0){
        
        res.render('SelectDate' , { salleId: req.params.salleId ,msg:"There is already a reservation on " + req.body.date,Name:req.body.salle,user:req.params.clientId});
    }else{
        console.log("email")
transporter.sendMail({
    to: "nahdimarwen0@gmail.com",
    subject: 'Verify Reservation',
    html: `Click  to confirm your Reservation the salle : `+req.body.salle+`.
    <form method="POST" action="http://localhost:9000/reservation/`+req.params.salleId+`/`+req.params.clientId+`">
      <input name="date" id="date" value="`+req.body.date+`" readonly >
   <button class="btn btn-success" type="submit" >Confirme</button>
   </form> `
  })
}
res.render('CheckMail');
}

// Create and Save a new reservation
exports.create = async (req, res) => {
    if (!req.body) {
        res.status(400).send({ message: "Content can not be empty!" });
    }
    console.log(req.body)

        const reservation = new reservationModel({
            Date: req.body.date,
            client :req.params.clientId,
            salle : req.params.salleId
           // Date: Date.now().toString()
        });
    
    await reservation.save().then(data => {
        console.log(data)
        res.send({
            message:"reservation created successfully!!",
            reservation:data
        });
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating reservation"
        });
    });} ;
// Retrieve all reservations from the database.
exports.findAll = async (req, res) => {
    res.locals.tokenData = req.params.token;
    try {
        const reservations = await reservationModel.find().populate('salle').populate('client')
        console.log(reservations)
        res.render('ListReservationAdmin',{reservations:reservations});
    } catch(error) {
        res.status(404).json({message: error.message});
    }
};

// Retrieve all reservations from the database by clientId.
exports.findAllbyUser = async (req, res) => {
    try {
        const decodedToken = jwt.verify(req.params.token, process.env.JWT_SECRET);
        console.log(decodedToken)
        res.locals.tokenData = req.params.token;
        const reservations = await reservationModel.find({client : decodedToken._id}).populate('salle');
        res.render('ListReservation',{reservations:reservations});
    } catch(error) {
        res.status(404).json({message: error.message});
    }
};



// Find a single reservation 
exports.findOne = async (req, res) => {
    try {
        res.locals.tokenData = req.params.token;
        const reservation = await reservationModel.findById(req.params.id);
        res.status(200).json(reservation);
    } catch(error) {
        res.status(404).json({ message: error.message});
    }
};




// Update a reservation by the id in the request
exports.update = async (req, res) => {
    res.locals.tokenData = req.params.token;
    if(!req.body) {
        res.status(400).send({
            message: "Data to update can not be empty!"
        });
    }
    
    const id = req.params.id;
    
    await reservationModel.findByIdAndUpdate(id, req.body, { useFindAndModify: true }).then(data => {
        if (!data) {
            res.status(404).send({
                message: `reservation not found.`
            });
        }else{
            res.send({ message: "reservation updated successfully." })
        }
    }).catch(err => {
        res.status(500).send({
            message: err.message
        });
    });
};
// Delete a reservation with the specified id in the request
exports.destroy = async (req, res) => {
    res.locals.tokenData = req.params.token;
    await reservationModel.findByIdAndDelete(req.params.id).then(data => {
        if (!data) {
          res.status(404).send({
            message: `reservation not found.`
          });
        } else {
         console.log(data)
        }
    }).catch(err => {
        res.status(500).send({
          message: err.message
        });
    });
};