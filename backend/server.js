import express from 'express'
import { Server } from 'socket.io'
import cors from 'cors'

const PORT = process.env.PORT || 8080;
const app = express();

app.use(cors({
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
}));

app.post('/authenticate', (req, res) => {
    console.log("Received authentication request");
    res.json({ success: true, message: "Authenticated successfully" });
});

// Starts the server
const expressServer = app.listen(PORT, () => {
    console.log(`Server is up and running! Listening with port ${PORT}`);
});

const io = new Server(expressServer, {
    cors: {
      origin: "http://localhost:5173",
      methods: ["GET", "POST"],
      allowedHeaders: ['Content-Type', 'Authorization'],
      credentials: true,
    },
});

io.on('connection', socket => {
    console.log(`User ${socket.id} connected`);

    socket.on('ping', () => {
        socket.emit('pong');
    });

    socket.on('store-survey-results', results => {
        return;
    });

    socket.on('enter-matchmaking', () => {
        return;
    });

    socket.on('send-message', message => {
        return;
    });

    socket.on('leave-chat', () => {
        return;
    });

    socket.on('disconnect', () => {
        console.log(`User ${socket.id} disconnected`);
    });
});