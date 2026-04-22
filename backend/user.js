import {save_user} from user_database.js

// Creates user based on the information retireved from Onboarding1.jsx
// This function is part of the onboarding process
function create_user(onboarding1_JSON_object) {
    const {firstName, lastName, gender, pronouns} = JSON.parse(onboarding1_JSON_object)

    return {
        // Identity
        firstName: firstName,
        lastName: lastName,
        gender: gender || '',
        pronouns: pronouns || 'No stated pronouns',

        // Onboarding status
        isOnboarded: false,

        // Preferences
        genderPreference: null,
        agePreferenceMin: -1,
        agePreferenceMax: -1,

        // Interests: scale of 1-5
        sports: 0,
        tvsports: 0,
        exercise: 0,
        dining: 0,
        museums: 0,
        art: 0,
        hiking: 0,
        gaming: 0,
        clubbing: 0,
        reading: 0,
        tv: 0,
        theater: 0,
        movies: 0,
        concerts: 0,
        music: 0,
        shopping: 0,
        yoga: 0,

        // Career flags: 1 if selected, 0 otherwise
        career_lawyer: 0,
        career_academia: 0,
        career_psychologist: 0,
        career_medicine: 0,
        career_engineer: 0,
        career_creative_arts: 0,
        career_business: 0,
        career_real_estate: 0,
        career_humanitarian_affairs: 0,
        career_undecided: 0,
        career_social_work: 0,
        career_speech_pathology: 0,
        career_politics: 0,
        career_pro_sports: 0,
        career_other: 0,
        career_journalism: 0,
        career_architecture: 0,
    }
}

// Maps the frontend display label to its user object key
const CAREER_KEY_MAP = {
    'Law':              'career_lawyer',
    'Academia':         'career_academia',
    'Psychology':       'career_psychologist',
    'Medicine':         'career_medicine',
    'Engineering':      'career_engineer',
    'Creative':         'career_creative_arts',
    'Business':         'career_business',
    'Real Estate':      'career_real_estate',
    'Humanitarian':     'career_humanitarian_affairs',
    'Social Work':      'career_social_work',
    'Speech Pathology': 'career_speech_pathology',
    'Politics':         'career_politics',
    'Athletics':        'career_pro_sports',
    'Journalism':       'career_journalism',
    'Architecture':     'career_architecture',
    'Other':            'career_other',
    'Undecided':        'career_undecided',
}

// Maps survey topic strings (from Survey.jsx) to user object keys
const SURVEY_KEY_MAP = {
    'playing sports':           'sports',
    'watching sports':          'tvsports',
    'exercising':               'exercise',
    'dining out':               'dining',
    'going to a museum':        'museums',
    'art':                      'art',
    'hiking':                   'hiking',
    'gaming':                   'gaming',
    'going clubbing or dancing':'clubbing',
    'reading':                  'reading',
    'watching tv':              'tv',
    'going to the theater':     'theater',
    'watching movies':          'movies',
    'going to concerts':        'concerts',
    'music':                    'music',
    'shopping':                 'shopping',
    'doing yoga':               'yoga',
}

// Modifies the user field gender preference based on the information retireved from Onboarding2.jsx
// This function is part of the onboarding process
function add_user_sexual_attraction(user, onboarding2_JSON_object) {
    const preference = JSON.parse(preferenceJSON)
    user.genderPreference = preference
    return user
}

// Modifies the user object to add the results of survey.jsx
// This function is part of the onboarding process
function add_user_survey_response(user, survey_JSON_object) {
    const responses = JSON.parse(surveyJSON)
    for (const [topic, rating] of Object.entries(responses)) {
        const key = SURVEY_KEY_MAP[topic]
        if (key) {
            user[key] = rating
        }
    }
    return user
}

// Modifies the user field career based on the information retireved from Career.jsx
// This function is part of the onboarding process
function add_user_career(user, career_JSON_object) {
    const career = JSON.parse(career_JSON_object)
    const key = CAREER_KEY_MAP[career]
    if (key) {
        user[key] = 1
    }
    return user
}

// Modifies the user object to add the results of Onboarding3.jsx
// This function is part of the onboarding process
function add_user_age_range_preference(user, age_preference_JSON_object){
    const agePreference = JSON.parse(age_preference_JSON_object)
    if(agePreference > 99){
        ageMin = agePreference / 100
        ageMax = agePreference % 100
    }
    user.agePreferenceMin = ageMin
    user.agePreferenceMin = ageMax
    return user
}

// Sets the user flag to true signifying that the user has finished onboarding and saves user to database
// This is the last function in onboarding chain
function complete_user_onboarding(user) {
    user.isOnboarded = true
    save_user(user)
    return user
}

export { create_user, complete_user_onboarding, add_user_sexual_attraction, 
         add_user_age_range_preference, add_user_survey_response, add_user_career}