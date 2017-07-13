// Helper file to create a data file of 5,000 rows

const fs = require('fs')

const maxRows = 1000
const fileName = __dirname + '/../docs/data.json'

const log = (message, ...data) => {
    message = '[%s] ' + message
    console.log(message, new Date().toISOString(), ...data)
}

const createRow = (id) => {
    return {
        id: id,
        firstName: 'Test' + id,
        lastName: 'O\'Cles' + id,
        email: 'test' + id + '@blah.com'
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