const express = require('express')
const body = require('body-parser')
const ejs = require('ejs')
const app = express()

const port = process.env.PORT || 3000

app.engine('html', ejs.renderFile);
app.use(express.static(__dirname + '/public'))
app.use(body.json())
app.use(body.urlencoded({extended: false}))
app.set('view engine', 'html')

app.get('/', (req, res) => {
  res.render('index')
})

app.listen(port, () => {
  console.log(`listening to port ${port}`)
})  