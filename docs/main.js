// Kickstart the application.

// A bit of fun with localStorage.
let oldCount = parseInt(window.localStorage.count || 0, 10)

// Top-level component is the "app".
var app = new HelloWorld({
    target: document.querySelector('main'),
    data: {
        name: 'Scott',
        count: oldCount
    }
})

// Listen for semantic event and fetch data from server.
app.on('requestData', event => {
    // console.log('Fetching remote data after 1s.')
    // setTimeout(function () {
        fetch('data.json').then(function (response) {
            console.log('Data fetched, parsing.')
            response.json().then(function (json) {
                console.log('Loaded json, setting data with ' + json.items.length + ' items into component.')
                app.setData(json)
                console.log('Done.')
            })
        })
    // }, 1000);
})