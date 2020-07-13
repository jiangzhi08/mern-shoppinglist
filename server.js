const express = require('express')
const mongoose = require('mongoose')
const path = require('path')
const config = require('config')

const app = express()

app.use(express.json())

const db = config.get('mongoURL')

mongoose
    .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(()=>console.log('db connected'))
    .catch(err => console.log(err))

app.use('/api/items',require('./routes/api/items'))
app.use('/api/users',require('./routes/api/users'))
app.use('/api/auth',require('./routes/api/auth'))

if(process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'))

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    })
}

// if (process.env.NODE_ENV === 'production') {
//     // Serve any static files
//     app.use(express.static(path.join(__dirname, 'client/build')));
//   // Handle React routing, return all requests to React app
//     app.get('*', function(req, res) {
//       res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
//     });
//   }

const PORT = process.env.PORT || 5000

app.listen(PORT, ()=> {
    console.log(`server is running on prot: ${PORT}`)
})

