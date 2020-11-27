const express = require('express');
const hbs = require('hbs');
const wax = require('wax-on');
const fs = require('fs'); // import in the file system
const mysql = require('mysql2/promise')

let app = express();
// set which view engine to use
app.set('view engine', 'hbs');

// set where to find the static files
app.use(express.static('public'))

// setup wax on for template inheritance
wax.on(hbs.handlebars);
wax.setLayoutPath('./views/layouts');

// setup forms
app.use(express.urlencoded({
    extended:false
}))

const helpers = require('handlebars-helpers')({
  handlebars: hbs.handlebars
});

async function main() {
    // creating the connection is an asynchronous procedure,
    // so we must use await 
    const connection = await mysql.createConnection({
        'host':'localhost',
        'user':'root',
        'database': 'sakila'
    })

    app.get('/', async (req,res)=>{
        // connection.execute is async
        let [actors, fields] = await connection.execute('select * from actor');
        res.render('actors.hbs', {
            'actors': actors
        })
    })

}

main();

app.listen(3000, ()=>{
 console.log("Server started");
});