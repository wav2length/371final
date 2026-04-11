import express, { json } from 'express'
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

// PROGRESS_TIMEOUT * NUM_RETIRES = max amount of time spent in queue before failing
const PROGRESS_TIMEOUT = 3000 // millis
const NUM_RETRIES = 10

const users_online = new Map();
const survey_responses = new Map();
const matchmaking_queue = new Set();
const chat_rooms = undefined; // TODO how to represent this?

async function makeMatch() {
    // TODO: Not implemented
    // Take the two people that the model predicts most likely to match and pair them
    // Add those to a chat room and remove them from the queue
}

async function checkForUpdates(username) {
    const num_in_queue = setTimeout(() => matchmaking_queue.size, PROGRESS_TIMEOUT);
    if (matchmaking_queue.has(username)) {
        return {message: "You've been matched!"}
    } else if (num_in_queue >= 3) {
        makeMatch();
        return {message: "Matchmaking in progress..."}
    } else {
        return {message: "Waiting for more people to enter the queue..."}
    }
}

io.on('connection', socket => {
    console.log(`User ${socket.id} connected`);

    socket.on('ping', () => {
        socket.emit('pong');
    });

    socket.on('login', username => {
        // We can do authentication but it might be unnecessary for a black box MVP
        users_online.set(socket.id, username);
        socket.emit('login-success');
    })

    socket.on('store-survey-results', results => {
        survey_responses.set(users_online.get(socket.id), JSON.parse(results))
        return;
    });

    socket.on('enter-matchmaking', async () => {
        if (matchmaking_queue.has(users_online.get(socket.id))) {
            // check for chat room
            // attempt to enter or fail gracefully
        }
        matchmaking_queue.add(users_online.get(socket.id));
        for (let i = 0; i < NUM_RETRIES || matchmaking_queue.has(users_online.get(socket.id)); i++) {
            progress = await checkForUpdates(users_online.get(socket.id));
            socket.emit(match)
        }
        // TODO
        // if progress = matched enter the correct chat room
        // else fail gracefully
    });

    socket.on('send-message', message => {
        // TODO: Not implemented
        // Attempt to send a message to the other person in a room
        return;
    });

    socket.on('leave-chat', () => {
        // TODO: Not implemented
        // Leave the chat room, disconnect the other person
        return;
    });

    socket.on('disconnect', () => {
        console.log(`User ${socket.id} disconnected`);
        users_online.delete(socket.id);
    });
});