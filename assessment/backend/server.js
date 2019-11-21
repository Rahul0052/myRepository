const fs = require('fs');
const mongoose = require('mongoose');
const bodyParser = require('body-parser')
var cors = require('cors')
const express = require('express')
const app = express()
app.use(bodyParser.json({ limit: '10mb', extended: true }))
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
  movieId: {
    type: Number
  },
  released: {
    type: Number
  },
  title: {
    type: String
  },
  description: {
    type: String

  },
  rating: {
    type: Number

  },
  languageIDs: {
    type: String

  },
  genres: {
    type: String

  },
  fileName: {
    type: String

  },
  covers: {
    type: String
  }

});



const Item = mongoose.model('mydatas', ItemSchema);

const arrayOne = []





fs.readFile('./covers.json', (err, data1) => {
  if (err) throw err;
  const coverJson = JSON.parse(data1);


  fs.readFile('./movies.json', (err, data2) => {
    if (err) throw err;
    const myJson = JSON.parse(data2)
    myJson.rows.map(data => {
      Object.keys(data).map(key => {
        data[key].movies.map(mov => {
          coverJson.map(cov => {
            const obj = {}
            if (cov.movieID === String(mov.movieId)) {
              obj.movieId = mov.movieId
              obj.released = key
              obj.title = mov.title
              obj.description = mov.description
              obj.rating = mov.rating
              obj.languageIDs = mov.languageIDs[0]
              obj.genres = mov.genres[0]
              obj.fileName = cov.fileName
              obj.covers = `${'data:image/gif;base64'},${fs.readFileSync(`./Images/${cov.fileName}`).toString('base64')}`
              arrayOne.push(obj)
            }
          })
        })
      })
    })
    // console.log(arrayOne)
    // Item.create(arrayOne)
  })
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
app.get('/item1/:id', (req, res) => {
  Item.find({}, (err, result) => {
    if (err) {
      res.send({ error: true })
    }
    else {
      res.send(result)
    }
  })

})
app.post('/insert', (req, res) => {
  Item.create(req.body.myObj, (err, result) => {
    if (err) {
      res.send(err)
    }
    else {
      res.send({ result: result })
    }

  })
})
app.get('/:id', ({ params }, res, next) => {
  Item.findOne({ '_id': params.id }, (err, result) => {
    if (err) {
      res.send(err);
    } else {
      res.send(result);
    }
  });
});
app.put('/:id', (req, res) => {
  // console.log(req.body.myObj)

  Item.findByIdAndUpdate({ _id: req.params.id },{ $set: { status: req.body.myObj } }, (err, result) => {
    if (err) {
      res.send(err)
    }
    else {
      res.send({ result: result })
    }

  })
})

app.get('/', (req, res) => {
  res.send('Hello')
})

const port = 5000;
app.listen(port, () => console.log(`Server started on port ${port}`));








