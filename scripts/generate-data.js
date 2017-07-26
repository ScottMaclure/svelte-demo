/*eslint no-console: 0*/
// Helper file to create a data file of MAX_ROWS

const fs = require('fs')

const MAX_ROWS = 1000
const FILE_NAME = __dirname + '/../docs/data.json'

const FULL_NAMES = [
    'Evelin Ohlsen',
    'Jani Thorman',
    'Rosalia Bunde',
    'Carline Krejci',
    'Contessa Kohls',
    'Tilda Shubert',
    'Ona Rowen',
    'Eldridge Isaacson',
    'Ivan Graf',
    'Magda Devlin',
    'Sybil Tolley',
    'Marita Soluri',
    'Allan Mcmahan',
    'Frederica Nestle',
    'Laura Entrekin',
    'Linn Zenz',
    'Farah Jennings',
    'Ileen Ponder',
    'Giovanna Knauf',
    'Isaura Dahlen',
    'Marquita Mastropietro',
    'Carlita Pinter',
    'Jeremy Janz',
    'Lucila Sugarman',
    'Otha Laakso',
    'Anamaria Arras',
    'Burl Greaver',
    'Soraya Dimond',
    'Kaycee Klingbeil',
    'Velva Smallwood',
    'Felica Mollett',
    'Keven Helland',
    'Enid Reddout',
    'Ernestina Sawtelle',
    'Lucien Greeley',
    'Virgina Broxton',
    'Phebe Farris',
    'Crista Morissette',
    'Tyrell Kafka',
    'Hildegarde Sprankle',
    'Oliva Vandine',
    'Juli Wronski',
    'Pam Brunton',
    'Barbra Masek',
    'Rosanne Goode',
    'Alfredia Rhone',
    'Pattie Brawley',
    'Thi Rayburn',
    'Emile Nehring',
    'Arnold Reif'
]

const randomItem = (items) => (
    items[Math.floor(Math.random() * items.length)]
)

const log = (message, ...data) => {
    message = '[%s] ' + message
    console.log(message, new Date().toISOString(), ...data)
}

const createRow = (id) => {
    let [firstName, lastName] = randomItem(FULL_NAMES).split(' ')
    return {
        id: id,
        firstName: firstName,
        lastName: lastName + id,
        email: firstName + '.' + lastName + '.' + id + '@not.a.tld'
    }
}

log('Generating %d rows.', MAX_ROWS)

let data = {
    version: 1,
    name: 'Scott McDoot',
    items: []
}

for (let i = 1; i <= MAX_ROWS; i++) {
    data.items.push(createRow(i))
}

log('Writing to file %s', FILE_NAME)

fs.writeFileSync(FILE_NAME, JSON.stringify(data, null, 4))

log('Done')