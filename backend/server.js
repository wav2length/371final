import express from 'express'
import { Server } from 'socket.io'
import cors from 'cors'
import {
    create_user,
    add_user_age_range_preference,
    add_user_career,
    add_user_sexual_attraction,
    add_user_survey_response,
    complete_user_onboarding
} from './user'
import { load_db, save_db, save_user, log_user_in } from './user_database'
import { socket } from '../webapp/src/socket'


//
//
// SERVER SETUP
//
//

// Specifying the network port the sockets listen for traffic on
const PORT = process.env.PORT || 8080;
// Web server creation
const app = express();

// Specifying Web Server functionality
app.use(cors({
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
}));

// Starts the server & starts listening on the network port specified
const expressServer = app.listen(PORT, () => {
    console.log(`Server is up and running! Listening with port ${PORT}`);
});

// Creating an Socket.IO server and attaching it ot the express server for port sharing
const io = new Server(expressServer, {
    cors: {
      origin: "http://localhost:5173",
      methods: ["GET", "POST"],
      allowedHeaders: ['Content-Type', 'Authorization'],
      credentials: true,
    },
});

//
//
// Load needed objects for server functionality
//
//

// Username = firstName+lastName
// Tracks currently connected users (socket.id -> username)
const users_online = new Map();

// Stores each user's full profile object (username -> user object)
const user_profiles = new Map();

// Stores the set of username currently waiting to be matched with someone
const matchmaking_queue = new Set();

// Stores the currently chatting pairs (username -> partner's username)
const chat_links = new Map();

//
//
// MATCH MAKING HELPERS
//
//

// PROGRESS_TIMEOUT * NUM_RETIRES = max amount of time spent in queue before failing
const PROGRESS_TIMEOUT = 3000 // millis

// Maximum number of retry's before bailing on finding a match (YOU WILL BE ALONE FOREVER :3)
const NUM_RETRIES = 10


// Finds and returns socketID for a given username of all online users
function getSocketFromUsername(username) {
    // loop through users online utilizing the socket, username pair for easier visualization
    for (const [socketID, name] of users_online.entries()){
        if (name === username){
            return socketID
        }

    }

    // Return Null if we did not find an active socket with username
    return null
}


// Cheks for updates
// Waits and checks the queue periodicly, returns a status message for the frontend
async function checkForUpdates(username) {
    console.log(`Requesting an update from the matchmaker for ${username}...`)

    // Pause for PROGRESS_Timeout ms before checking in order to give time for the queue to fill
    await new Promise(resolve => setTimeout(resolve, PROGRESS_TIMEOUT))


    // If the user is not in the queue, they have been matched
    if (!matchmaking_queue.has(username)) {
        return {
            timestamp: Date.now(),
            message: "You've been matched!"
        };
    // If there are at least two individuals in the queue try to make a match
    } else if (num_in_queue >= 2) {
        await makeMatch();
        return {
            timestamp: Date.now(),
            message: "Matchmaking in progress..."
        };

    // Tell the user that we are waiting for user to join queue to try match making (THEY WILL BE ALONE)
    } else {
        return {
            timestamp: Date.now(),
            message: "Waiting for more people to enter the queue..."
        };
    }
}

async function makeMatch() {
    // Grab the first two usernames from those in the matchmaking queue 
    // [...matchmaking_queue] stretches the set into an array (very nifty)
    const [partner1, partner2] = [...matchmaking_queue]

    // if there are not two individals we can't do anyhtin
    if (!partner1 || !partner2)
        return

    // IMPLEMENT THE MATCHMAKING HERE BASED ON THE ALGORITHM

    // Remove both users from the matchmaking queue since they've matched
    matchmaking_queue.delete(partner1)
    matchmaking_queue.delete(partner2)

    console.log(`Matched ${partner1} with ${partner2}`)

    const socket1 = getSocketFromUsername(partner1)
    const socket2 = getSocketFromUsername(partner2)

    // Send message to the client of partner1, telling them ot move into chatting stage with partner2's information
    if(socket1){
        io.to(socket1).emit('enter-chat', {
            username: partner2,
            info: user_profiles.get(partner2)
        })
    } else {
        console.warn(`Did not locate ${partner1} socket`)
    }

    // Send message to the client of partner2, telling them ot move into chatting stage with partner1's information
    if(socket2){
        io.to(socket2).emit('enter-chat', {
            username: partner1,
            info: user_profiles.get(partner1)
        })
    } else {
        console.warn(`Did not locate ${partner2} socket`)
    }
}

// If user already onboard add them to matchmaking queue
async function enterMatchMaking(socket, username) {
    // Check to see if user is already in queue
    if(matchmaking_queue.has(username)){
        return
    }

    // User is not in matchmaking_queue already, add user to queue
    matchmaking_queue.add(username)
    // Update client with status
    socket.emit('enter-matchmaking-successful')

    // Logging
    console.log(`${username} entered matchmaking queue`)
    console.log(`Matchmaking queue size: ${matchmaking_queue.size}`)

    for (let i = 0; i < NUM_RETRIES && matchmaking_queue.has(username); i++){
        console.log(`Matchmaking check ${i + 1} out of ${NUM_RETRIES} for ${username}`)

        const progress = await checkForUpdates(username)
        socket.emit('matchmaking-progress', progress)
    }

    // Remove user from matchmaking no matter how it turned out
    matchmaking_queue.delete(username)

    if (!chat_links.has(username)){
        console.log(`Matchmaking failed for ${username}`)
        socket.emit('matchmaking-failure') // ALONE FOREVER ONCE AGAIN :L
    }
}

//
//
// SOCKETING FUNTIMES (ITS NOT :'[ )
//
//


// Listen for any new socket connections from a client (frontend)
io.on('connection', socket => {
    console.log(`User ${socket.id} connected`);


    //
    // Login (RETURNING USER [THEY WERE ALONE])
    //
    socket.on('login', username => {
        const existingUser = log_user_in(JSON.stringify(username))

        if(!existingUser){
            console.warn(`Failed log in for ${username}`)
            socket.emit('login-failure')
            return
        }

        // Load user from memory
        users_online.set(socket.id, username);
        user_profiles.set(username, existingUser)

        // Let user know that they are cool with us
        socket.emit('login-success');

        // Start matchmaking
        enterMatchMaking(socket, username)
    })

    //
    // Onboarding
    //
    
    // Onboarding1.jsx socket message
    socket.on('store-onboarding1-results', data =>{
        // Create user
        const user = create_user(data)
        // Get username for mapping objects
        const username = user.username

        // Register user
        users_online.set(socket.id, username)
        // Saving user
        user_profiles.set(username, user)

        // Logging
        console.log(`User ${username} created`)
        socket.emit('onboarding1-success')
    })

    socket.on('store-onboarding2-results', data =>{
        // Get username
        const username = users_online.get(socketID)
        // Get user profile
        const user = user_profiles.get(username)

        if(!user){
            console.warn(`No user profile for ${username} | onboarding2-results`)
            return
        }
        
        // Upadate user profile with new information
        add_user_sexual_attraction(user, data)
        console.log(`Stored sexuality data for ${username}`)
    })

    socket.on('store-onboarding3-results', data =>{
        // Get username
        const username = users_online.get(socketID)
        // Get user profile
        const user = user_profiles.get(username)

        if(!user){
            console.warn(`No user profile for ${username} | onboarding3-results`)
            return
        }
        
        // Upadate user profile with new information
        add_user_age_range_preference(user, data)
        console.log(`Stored age range data for ${username}`)
    })

    socket.on('store-survey-results', data => {
        // Get username
        const username = users_online.get(socketID)
        // Get user profile
        const user = user_profiles.get(username)

        if(!user){
            console.warn(`No user profile for ${username} | survey-results`)
            return
        }
        
        // Upadate user profile with new information
        add_user_survey_response(user, data)
        console.log(`Stored age range data for ${username}`)
    })

    socket.on('store-career-results', data => {
        // Get username
        const username = users_online.get(socketID)
        // Get user profile
        const user = user_profiles.get(username)

        if(!user){
            console.warn(`No user profile for ${username} | career-results`)
            return
        }
        
        // Upadate user profile with new information
        add_user_career(user, data)
        console.log(`Stored age range data for ${username}`)
    })

    socket.on('enter-matchmaking', async () => {
        // Get username
        const username = users_online.get(socketID)
        // Get user profile
        const user = user_profiles.get(username)

        if(!user){
            console.warn(`No user profile for ${username} | enter-matchmaking from client`)
            socket.emit('matchmaking-failure')
            return
        }

        // Mark onboarding as complete
        complete_user_onboarding(user)
        save_user(user)

        // Enter Matchmaking
        enterMatchMaking(socket, username)
    })
    
    //
    // Messaging
    //

    socket.on('send-message', message => {
        // Get username
        const username = users_online.get(socketID)
        // Get partner
        const partner = chat_links.get(username)

        if(!partner){
            console.warn(`${username} tried to message but has no partner`)
            return
        }

        const partnerSocketID = getSocketFromUsername(partner)
        if(!partnerSocketID){
            console.warn(`${partner} does not have a socket`)
            return
        }

        // Forward message on to partner
        io.to(partnerSocketID).emit('receive-message', message);
    });

    socket.on('leave-chat', () => {
        const username = users_online.get(socket.id);
        const partner = chat_links.get(username); // GOT BAILED ON LMAO

        // Remove both links
        chat_links.delete(username);
        chat_links.delete(partner);

        // Notify the partner
        const partnerSocketID = getSocketFromUsername(partner)
        if(!partnerSocketID){
            console.warn(`${partner} does not have a socket`)
            return
        }
        io.to(getSocketFromUsername(partner)).emit('partner-leave-chat');
        console.log(`${username} has left the chat`) // LONER
    });

    //
    // Shutdown
    //

    socket.on('disconnect', () => {
        // Get username
        const username = users_online.get(socket.id)

        // Remove user from online users
        users_online.delete(socket.id);

        // Remove from matchmaking queue and chat
        matchmaking_queue.delete(username)
        const partner = chat_links.get(username)
        if(partner){
            // Make sure there is no active links
            chat_links.delete(username)
            chat_links.delete(partner)
            io.to(getSocketFromUsername(partner)).emit('partner-leave-chat');
        }

        console.log(`User ${socket.id} disconnected`);
    });
});



/* DECOMISSIONED ZONE OF RETAINMENT
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
        for (let i = 0; i < NUM_RETRIES && matchmaking_queue.has(username); i++) {
            console.log(`Current iteration: ${i} of ${NUM_RETRIES}`)
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


    
    socket.on('store-survey-results', results => {
        survey_responses.set(users_online.get(socket.id), JSON.parse(results))
        return;
    });
*/