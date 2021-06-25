const http = require("http");
const express = require("express");
const cors = require("cors");
const socketIo = require("socket.io");
const mongoose = require('./db/mongo');
const Puntos = require('./db/puntos');
const PORT = process.env.PORT || 4000;

const app = express();



const server = http.createServer(app);

const io = socketIo(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
    credentials: true,
  },
});


app.use(cors());


io.on("connection",  async (socket) => {
    
   
    const id = socket.id;
    const { mapRoom } = socket.handshake.query;

    socket.join(mapRoom)

    console.log("Cliente Connect "+id+" se union room: "+mapRoom)
   
    const puntos = await Puntos.find();
    socket.emit('points', puntos);

   
    socket.on('position', ({ data }) => {

        console.log(data);
        socket.in(mapRoom).emit('position', data);
    })

    socket.on('add', async ({ data }) => {
        try {
            console.log("Data save ",data)
            const puntoDB = new Puntos(data);
            await puntoDB.save();
            socket.in(mapRoom).emit('add', data);
        } catch (error) {
            console.log('error',error)
        }
   
    })



});



server.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});