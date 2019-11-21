const fs = require('fs');


// var covers = new Object
// covers.joker = fs.readFileSync('./Images/Joker.jpg', 'base64')
// covers.infinity_war = fs.readFileSync('./Images/Infinity_War.jpg', 'base64')
// covers.thor_ragnarok = fs.readFileSync('./Images/Thor_Ragnarok.jpg', 'base64')
// covers.end_game = fs.readFileSync('./Images/End_Game.jpeg', 'base64')
// covers.bohemian_Rhapsody = fs.readFileSync('./Images/Bohemian_Rhapsody.jpg', 'base64')
// covers.the_maze_runner = fs.readFileSync('./Images/The_Maze_Runner.jpg', 'base64')
// covers.deadpool = fs.readFileSync('./Images/Deadpool.png', 'base64')
// covers.the_force_awaken = fs.readFileSync('./Images/The_Force_Awakens.jpg', 'base64')
// covers.doctor_strange = fs.readFileSync('./Images/Doctor_Strange.jpeg', 'base64')
// covers.dawn_of_justice = fs.readFileSync('./Images/Dawn_Of_Justice.jpg', 'base64')

// console.log(covers)



// const image2base64 = require('image-to-base64');

fs.readFile('./Images/Bohemian_Rhapsody.jpg', (err, data) => {
    if (!err) {
        console.log(data.toString('base64'));
    }
})

// fs.readdir('./Images', {withFileTypes : true}, (err, items) => {
//     if (err) throw err;
//     // console.log(new Buffer(items[0].toString('base64')))
// console.log(items)

//     for (var i = 0; i < items.length; i++) {
//         // console.log(items[i]);
//         var convert = new Object();
//         convert.covers = items[i].toString('base64')
//         convert.id = i+1
//         // console.log(convert)
//     }
// })

// fs.readFile('./images', (err,data) => {
//     if (err) throw err;
//     data.map(image => {
//         image.toString('base64')

//     })
// })