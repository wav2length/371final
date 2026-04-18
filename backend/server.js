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

// kinda just realized all my variable names back here are pythonic I'm too ML coded rn
// is backend finished? yes. is backend correct? not at all but I think that depends on frontend
// this code could probably give a Javascript web dev a heart attack
// PROGRESS_TIMEOUT * NUM_RETIRES = max amount of time spent in queue before failing
const PROGRESS_TIMEOUT = 3000 // millis
const NUM_RETRIES = 10

const users_online = new Map();
const survey_responses = new Map();
const matchmaking_queue = new Set();
const chat_links = new Map();

async function makeMatch() {
    // TODO: Not implemented
    // Take the two people that the model predicts most likely to match and pair them
    // Add those to a chat room and remove them from the queue
    let partner1 = undefined;
    let partner2 = undefined;

    chat_links.set(partner1, partner2)
    chat_links.set(partner2, partner1)
}

async function checkForUpdates(username) {
    const num_in_queue = setTimeout(() => matchmaking_queue.size, PROGRESS_TIMEOUT);
    if (!matchmaking_queue.has(username)) {
        return {
            timestamp: Date.now(),
            message: "You've been matched!"
        };
    } else if (num_in_queue >= 3) {
        makeMatch();
        return {
            timestamp: Date.now(),
            message: "Matchmaking in progress..."
        };
    } else {
        return {
            timestamp: Date.now(),
            message: "Waiting for more people to enter the queue..."
        };
    }
}

function getSocketFromUsername(username) {
    for (key in users_online.keys()) {
        if (users_online.get(key) == username) {
            return key
        }
    }
}

io.on('connection', socket => {
    console.log(`User ${socket.id} connected`);

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
        const username = users_online.get(socket.id);
        if (matchmaking_queue.has(username)) {
            if (chat_links.has(username)) {
                const partner = { // I'm writing so much spaghetti rn maybe it gets fixed maybe it won't who knows
                    username: chat_links.get(username),
                    info: survey_responses.get(chat_links.get(username))
                };
                matchmaking_queue.delete(username);
                socket.emit('enter-chat', partner);
                // might need to enter chat for other user too? nahhh
                return;
            }
        } else {
            matchmaking_queue.add(username);
        }
        // failure is not an option
        socket.emit('enter-matchmaking-success');
        for (let i = 0; i < NUM_RETRIES || matchmaking_queue.has(username); i++) {
            let progress = await checkForUpdates(username);
            socket.emit('matchmaking-progress', progress);
        }
        matchmaking_queue.delete(username);
        if (chat_links.has(username)) {
            const partner = {
                username: chat_links.get(username),
                info: survey_responses.get(chat_links.get(username))
            };
            socket.emit('enter-chat', partner);
        } else {
            socket.emit("matchmaking-failure");
        }
    });

    socket.on('send-message', message => {
        partner = chat_links.get(users_online.get(socket.id));
        io.to(getSocketFromUsername(chat_links.get(partner))).emit('receive-message', message);
    });

    socket.on('leave-chat', () => {
        const username = users_online.get(socket.id);
        const partner = chat_links.get(username);
        chat_links.delete(username);
        chat_links.delete(partner);

        io.to(getSocketFromUsername(partner)).emit('partner-leave-chat');
    });

    socket.on('disconnect', () => {
        console.log(`User ${socket.id} disconnected`);
        users_online.delete(socket.id);
    });
});