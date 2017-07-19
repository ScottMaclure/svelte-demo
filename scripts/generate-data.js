// Helper file to create a data file of 5,000 rows

const fs = require('fs')

const maxRows = 1000
const fileName = __dirname + '/../docs/data.json'

const fullNames = [
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
    let [firstName, lastName] = randomItem(fullNames).split(' ')
    return {
        id: id,
        firstName: firstName,
        lastName: lastName + id,
        email: firstName + '.' + lastName + '.' + id + '@not.a.tld'
    }
}

log('Generating %d rows.', maxRows)

let data = {
    version: 1,
    name: 'Scott McDoot',
    items: []
}

for (let i = 1; i <= maxRows; i++) {
    data.items.push(createRow(i))
}

log('Writing to file %s', fileName)

fs.writeFileSync(fileName, JSON.stringify(data, null, 4))

log('Done')