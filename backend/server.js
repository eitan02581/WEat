const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const session = require('express-session')
const app = express()
const addUserRoutes = require('./routes/user-routes')
const addGroupRoutes = require('./routes/group-routes')
const addRecipeRoutes = require('./routes/recipe-routes')

app.use(express.static('public'))
app.use(cors({
  origin: ['http://localhost:8080'],
  credentials: true // enable set cookie
}));
app.use(bodyParser.json())
app.use(cookieParser());
app.use(session({
  secret: 'puki muki',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}))

app.get('/', (req, res) => {
  res.send('Hello World!')
})

addUserRoutes(app)
addGroupRoutes(app)
addRecipeRoutes(app)


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Example app listening on port ${PORT}`))