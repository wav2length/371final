import fs from 'fs'

const DB_PATH = './users_db.json'

// Reads the database file
function load_db() {
    if (!fs.existsSync(DB_PATH)) {
        return []
    }
    const raw = fs.readFileSync(DB_PATH, 'utf-8')
    return JSON.parse(raw)
}

// Writes the full users array into the database
function save_db(users) {
    fs.writeFileSync(DB_PATH, JSON.stringify(users, null, 2))
}

// Saves a user to the database (Overrights if the have the same name)
function save_user(user) {
    const users = load_db()
    const existingIndex = users.findIndex(u => u.firstName === user.firstName)

    if (existingIndex !== -1) {
        // Overwrite existing entry
        users[existingIndex] = user
    } else {
        // New user, append
        users.push(user)
    }

    save_db(users)
}

// Searches the database for a user matching firstName, returns null if not found
function log_user_in(usernameJSON) {
    const username = JSON.parse(usernameJSON)
    const users = load_db()
    const user = users.find(u => u.username === username)

    if (!user) {
        console.log(`No user found with username: ${username}`)
        return null
    }

    return user
}

// Gets all usernames for mocking
function get_usernames() {
    const users = load_db()
    return users.map(user => user.username)
}

export {load_db, save_db, save_user, log_user_in, get_usernames}