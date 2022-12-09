const express = require('express')
//express App
const App = express()
// Connect To Mongodb
const mongoose = require('mongoose')

const blogsRoutes = require('./routes/blogsRoutes');

//register view engine
App.set('view engine', 'ejs')


//middleware & Static files (style.css)
App.use(express.static('public'))
App.use(express.urlencoded({extended : true}))

App.get('/All-blog' , (req ,res)=>{
    blogs.find().then((result)=>{
        res.send(result);
    })

    .catch((err)=>{
        console.log(err)
    })
})

App.get('/', (req, res) => {

    res.redirect('/blogs');
})


App.get('/about', (req, res) => {
    res.render('about', { title: 'About' })
})
//blogs Routes
App.use('/blogs' ,blogsRoutes);

App.use((req, res) => {
    res.status(404).render('404', { title: '404' })
})

const dbURI ='mongodb+srv://aamir:12345@node-tut.lgbnxvi.mongodb.net/node-tut'
mongoose.connect(dbURI ,{ useNewUrlParser : true , useUnifiedTopology : true})
.then((result)=>App.listen(3000))
.catch((err)=>console.log(err))