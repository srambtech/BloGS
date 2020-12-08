const express = require('express')
const mongoose = require('mongoose')
const articleRouter = require('./routes /articles')
const Article = require('./models/article')
// for Deleting we are using method-override Library 
const methodOverride = require('method-override')

mongoose.connect('mongodb://localhost/blog',
{ useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true })

const app = express()

app.set('view engine', 'ejs')

app.use(express.urlencoded({ extended: false}))
app.use(methodOverride('_delete'))

app.get('/', async (req, res) =>{
   const articles = await Article.find().sort({
       createdAt: 'desc'})
    res.render('articles/index', { articles: articles})
})

app.use('/articles', articleRouter)

app.listen(5000)