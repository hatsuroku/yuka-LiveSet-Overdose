import express from 'express'
const app = express()
import cors from 'cors'
import http from 'http'
const server = http.createServer(app)
import { Server } from "socket.io"
const io = new Server(server)
import dm from '@/utils/dataManager'
import * as pickImg from '@/routes/pickImg'
import { uploadImgInfo, uploadImg } from '@/routes/uploadImg'
import { staticPath } from '@/utils/constants'

const corsOptions = {
  origin: [
    'http://localhost:5173/'
  ],
  optionsSuccessStatus: 200,
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
  // allowedHeaders: ['Content-Type', 'Authorization'],
}

app.use(express.static(staticPath))
app.use(cors(corsOptions));

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/static/index.html')
})

app.get('/pickImg', pickImg.pick)
app.post('/collectImg', pickImg.collect)

app.post('/uploadImgInfo', uploadImgInfo)
app.post('/uploadImg', uploadImg)



// io.on('connection', (socket) => {
//   console.log('a user connected')
  
//   socket.on('pd_ModuleReady', (msg) => {
//     console.log(msg)
//   });

//   socket.emit('pd_Message', {
//     bulletinSettingText: "ceshi"
//   })
// })

server.listen(3000, () => {
  console.log('listening on *:3000')
})
