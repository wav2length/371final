import fs from 'fs'

const CSV_PATH = './Form_Responses_1.csv'
const DB_PATH = './users_db.json'

// Maps CSV column headers to user object interest keys
const INTEREST_COLUMN_MAP = {
    'Interest in: playing sports':           'sports',
    'Interest in: watching sports':          'tvsports',
    'Interest in: exercising':               'exercise',
    'Interest in: dining out':               'dining',
    'Interest in: going to a museum':        'museums',
    'Interest in: art':                      'art',
    'Interest in: hiking':                   'hiking',
    'Interest in: gaming':                   'gaming',
    'Interest in: going clubbing or dancing':'clubbing',
    'Interest in: reading':                  'reading',
    'Interest in: watching tv':              'tv',
    'Interest in: going to the theater':     'theater',
    'Interest in: watching movies':          'movies',
    'Interest in: going to concerts':        'concerts',
    'Interest in: music':                    'music',
    'Interest in: shopping':                 'shopping',
    'Interest in: doing yoga':               'yoga',
}

function load_db() {
    if (!fs.existsSync(DB_PATH)) return []
    return JSON.parse(fs.readFileSync(DB_PATH, 'utf-8'))
}

function save_db(users) {
    fs.writeFileSync(DB_PATH, JSON.stringify(users, null, 2))
}

function parse_csv(raw) {
    const lines = raw.trim().split('\n')
    const headers = lines[0].split(',')
    return lines.slice(1).map(line => {
        const values = line.split(',')
        const row = {}
        headers.forEach((header, i) => {
            row[header.trim()] = (values[i] || '').trim()
        })
        return row
    })
}

function row_to_user(row) {
    const firstName = row['First Name']
    const lastName = row['Last Name']

    // Build base user with all flags at 0
    const user = {
        username: firstName + lastName,
        firstName,
        lastName,
        gender: row['Gender (sorry NBs)'] || '',
        pronouns: row['Pronouns'] || 'No stated pronouns',
        isOnboarded: true,
        genderPreference: row['Gender Attraction'] || null,
        age: parseInt(row['Age'], 10) || 0,

        // Interests — ratings come in already on 1-10 scale
        sports: 0, tvsports: 0, exercise: 0, dining: 0, museums: 0,
        art: 0, hiking: 0, gaming: 0, clubbing: 0, reading: 0,
        tv: 0, theater: 0, movies: 0, concerts: 0, music: 0,
        shopping: 0, yoga: 0,

        // Join reasons
        joined_fun: 0, joined_meet: 0, joined_date: 0,
        joined_relationship: 0, joined_to_try: 0, joined_other: 0,

        // Career flags
        career_lawyer: 0, career_academia: 0, career_psychologist: 0,
        career_medicine: 0, career_engineer: 0, career_creative_arts: 0,
        career_business: 0, career_real_estate: 0, career_humanitarian_affairs: 0,
        career_undecided: 0, career_social_work: 0, career_speech_pathology: 0,
        career_politics: 0, career_pro_sports: 0, career_other: 0,
        career_journalism: 0, career_architecture: 0,
    }

    // Fill in interest ratings
    for (const [col, key] of Object.entries(INTEREST_COLUMN_MAP)) {
        if (row[col] !== undefined) {
            user[key] = parseInt(row[col], 10) || 0
        }
    }

    // Set the join reason flag — CSV already uses joined_* format
    const joinReason = row['Why did you join Wavelength?']
    if (joinReason && user.hasOwnProperty(joinReason)) {
        user[joinReason] = 1
    } else if (joinReason) {
        console.warn(`  Unknown join reason: "${joinReason}"`)
    }

    // Set the career flag — CSV already uses career_* format
    const career = row['Career field']
    if (career && user.hasOwnProperty(career)) {
        user[career] = 1
    } else if (career) {
        console.warn(`  Unknown career: "${career}"`)
    }

    return user
}

function import_csv() {
    if (!fs.existsSync(CSV_PATH)) {
        console.error(`CSV not found at ${CSV_PATH}`)
        process.exit(1)
    }

    const raw = fs.readFileSync(CSV_PATH, 'utf-8')
    const rows = parse_csv(raw)
    const db = load_db()

    let added = 0
    let updated = 0

    for (const row of rows) {
        const user = row_to_user(row)
        const existingIndex = db.findIndex(u => u.username === user.username)

        if (existingIndex !== -1) {
            db[existingIndex] = user
            updated++
            console.log(`Updated: ${user.username}`)
        } else {
            db.push(user)
            added++
            console.log(`Added:   ${user.username}`)
        }
    }

    save_db(db)
    console.log(`\nDone — ${added} added, ${updated} updated. Total users: ${db.length}`)
}

import_csv()
