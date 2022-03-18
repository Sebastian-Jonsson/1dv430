const express = require('express')
const fileUpload = require('express-fileupload')
const mongoose = require('mongoose')
const path = require('path')
// const helmet = require('helmet')
const config = require('config')
const devDb = config.get('mongoURI')

const app = express()

//Middleware
app.use(express.json())
app.use(fileUpload())
app.use(express.urlencoded({extended: true}))

 

mongoose.connect(process.env.ATLAS_URI || devDb, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: false
})
  .then(() => console.log('MongoDB Connected...'))
  // .then(() => )
  .catch(error => {
    console.log(error)
    process.exit(1)
  })

  // Routes
  app.use('/api/items', require('./routes/api/items'))
  app.use('/api/users', require('./routes/api/users'))
  app.use('/api/auth', require('./routes/api/auth'))
  app.use('/api/images', require('./routes/api/images'))

  // Serve static assets if production
  if(process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'))

    app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html' ))
    })
  }

  const port = process.env.PORT || 5000

  app.listen(port, () =>  console.log(`Server started on ${port}`))


