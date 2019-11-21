const fs = require('fs');


fs.readFile('./covers.json', (err, data1) => {
    if (err) throw err;
    coverJson = JSON.parse(data1);

})

const coverJson1 = []


// console.log(coverJson)
fs.readFile('./movies.json', (err, data2) => {
    if (err) throw err;
    const myJson = JSON.parse(data2)
    myJson.rows.map(data => {

        Object.keys(data).map(key => {
            data[key].movies.map(mov => {
                coverJson.map(cov => {
                    // console.log(cov)                        

                    // if (String(mov.movieId) === cov.movieID) {
                    const obj = new Object
                    obj.released = key
                    obj.movieId = mov.movieId
                    obj.title = mov.title
                    obj.description = mov.description
                    obj.rating = mov.rating
                    obj.languageIDs = mov.languageIDs[0]
                    obj.genres = mov.genres[0]
                    obj.fileName = cov.fileName
                    // obj.covers = fs.readFileSync(`./Images/${cov.fileName}`, 'base64')
                    console.log(obj)
                    // }
                })
            })
        })
    })

})