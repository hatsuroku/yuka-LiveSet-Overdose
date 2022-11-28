const express = require('express')
const app = express()
const cors = require('cors')
const http = require('http')
const server = http.createServer(app)
const { Server } = require("socket.io")
const io = new Server(server)
const dm = require('./src/utils/dataManager')
const pickImg = require('./src/routes/pickImg')

const corsOptions = {
  origin: [
    'http://localhost:5173/'
  ],
  optionsSuccessStatus: 200,
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
  // allowedHeaders: ['Content-Type', 'Authorization'],
}

app.use(express.static('static'))
app.use(cors(corsOptions));

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/static/index.html')
})

app.get('/pickImg', pickImg.pick)
app.post('/collectImg', pickImg.collect)

io.on('connection', (socket) => {
  console.log('a user connected')
  
  socket.on('pd_ModuleReady', (msg) => {
    console.log(msg)
  });

  socket.emit('pd_Message', {
    bulletinSettingText: "ceshi"
  })
})

server.listen(3000, () => {
  console.log('listening on *:3000')
})
