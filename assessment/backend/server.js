const fs = require('fs');
const mongoose = require('mongoose');
const bodyParser = require('body-parser')
var cors = require('cors')
const express = require('express')
const app = express()
app.use(cors())
app.use(bodyParser());


const db = 'mongodb://mcbhyd.mcbitsstech.com:27017/Test_Rahul';


mongoose.connect(db, {
  auth: {
    user: 'mcbitss',
    password: 'mcbitss100%'
  },
  useNewUrlParser: true
},
  function (err) {
    if (err) throw err;
    console.log("suceesfully connected");
  }

)

const Schema = mongoose.Schema;


// Create Schema
const ItemSchema = new Schema({
  title: {
    type: String
  },
  description: {
    type: String

  },
  rating: {
    type: String

  },
  languageIDs: {
    type: String

  },
  genres: {
    type: String

  }
});


var myCoverSchema = mongoose.Schema({
  movieID: {
    type: String
  },
  fileName: {
    type: String
  }
});

const Item = mongoose.model('mydatas', ItemSchema);
const myCoverModel = mongoose.model('mycoverjson', myCoverSchema)

const array = []


fs.readFile('./movies.json', (err, data) => {
  if (err) throw err;
  const myJson = JSON.parse(data);
  myJson.rows.map(data => {
    Object.keys(data).map(key => {
      data[key].movies.map(mov => {
        const obj = {}
        obj.released = key
        obj.movieId = mov.movieId
        obj.title = mov.title
        obj.description = mov.description
        obj.rating = mov.rating
        obj.languageIDs = mov.languageIDs[0]
        obj.genres = mov.genres[0]
        array.push(obj)
      })
    })
  })
  Item.create(array)
})
fs.readFile('./covers.json', (err, data) => {
  if (err) throw err;
  const coverJson = JSON.parse(data);
  console.log(coverJson)
  myCoverModel.create(coverJson)

})





app.get('/item1', (req, res) => {
  Item.find({}, (err, result) => {
    if (err) {
      console.log(err, 'érror')
      res.send({ error: true })
    }
    else {
      res.send(result)
    }
  })
})


app.get('/', (req, res) => {
  res.send('Hello')
})

const port = 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));






// // const router = express.Router();

// // Bodyparser Middleware




// // const db = 'mongodb://mcbitss:mcbitss100%@mcbitsstech.com:27017/Test_Rahul'
// // const db = 'mongodb://183.82.123.102:27017/Test_Rahul';


// mongoose.connect('mongodb://mcbhyd.mcbitsstech.com:27017/Test_Rahul', {
//   auth: {
//     user: 'mcbitss',
//     password: 'mcbitss100%'
//   },
//   useNewUrlParser: true
// })




// mongoose.Promise = Promise
// // mongoose
// //   .connect(db, { useNewUrlParser: true })
// //   // Adding new mongo url parser
// //   .then(() => console.log('MongoDB Connected...'))
// //   .catch(err => console.log(err));




// Create Schema


// const Item = mongoose.model('mydatas', ItemSchema);


// app.get('/item1', (req, res) => {
//   Item.find({}, (err, result) => {
//     if (err) {
//       console.log(err, 'érror')
//       res.send({ error: true })
//     }
//     else {
//       res.send(result)
//     }
//   })
// })

// app.put('/item1', (req, res) => {
//   console.log(req.params)
//   console.log(req.body.user)
//   const newItem = new Item({
//     name: req.body.user.name,
//     age: req.body.user.age,
//     status: req.body.user.status,
//     email: req.body.user.email,
//     address: req.body.user.address
//   })
//   newItem.save().then(item => res.json(item));
//   console.log(newItem)
// })

// app.get('/', (req, res) => {
//   res.send('Hello')
// })

// const port = 5000;

// app.listen(port, () => console.log(`Server started on port ${port}`));

















// // var MongoClient = require('mongodb').MongoClient;
// // var url = "mongodb://mcbhyd.mcbitsstech.com:27017/";

// // MongoClient.connect(url, function (err, db) {
// //   if (err) throw err;
// //   var dbo = db.db("Test_Rahul");
// //   console.log(dbo.getCollection('mydatas').find({'name': 'Tanner'})) 
// // });







// // var express = require("express");
// // var app = express();
// // var port = 3000;
// // var bodyParser = require('body-parser');
// // app.use(bodyParser.json());
// // app.use(bodyParser.urlencoded({ extended: true, useUnifiedTopology: true }));

// // var mongoose = require("mongoose");
// // mongoose.Promise = global.Promise;
// // mongoose.connect("mongodb://mcbhyd.mcbitsstech.com:27017/Test_Rahul");
// // var nameSchema = new mongoose.Schema({
// //     firstName: String,
// //     lastName: String
// // });
// // var User = mongoose.model("User", nameSchema);

// // app.get("/", (req, res) => {
// //     res.sendFile(__dirname + "/index.html");
// // });

// // app.post("/addname", (req, res) => {
// //     var mydata = new User(req.body);
// //     mydata.save()
// //         .then(item => {
// //             res.send("Name saved to database");
// //         })
// //         .catch(err => {
// //             res.status(400).send("Unable to save to database");
// //         });
// // });

// // app.listen(port, () => {
// //     console.log("Server listening on port " + port);
// // });










