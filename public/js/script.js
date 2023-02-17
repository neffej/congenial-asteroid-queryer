console.log('hello world')
const baseURL = 'https://api.nasa.gov/neo/rest/v1/'
const apiKEY = 'sFL0Yt0KzZft79bJZ8wpDcy2Wr8t27v6TggLHaIz'
const searchBtn = document.getElementById('search')
const start_date = `2023-02-17`;
const end_date = `2023-02-18`;

function deconstruct(data){
    let NEOs = []
    const nasaObj = { ...data }
    const resultsObj = nasaObj.near_earth_objects
    for (day in resultsObj){
    NEOs.push(resultsObj[day]);
}
    console.log(NEOs)
//    const { a, b } = resultsObj
//     console.log(resultsObj)
}

function searchNeoByDate(start_date, end_date){

    var dateQueryURL = `feed?start_date=${start_date}&end_date=${end_date}&api_key=${apiKEY}`
    fetch(baseURL+dateQueryURL)
    .then(function(response){
        return response.json();
    })
    .then(function(data){
        deconstruct(data);
    })
}

searchBtn.addEventListener('click', function(event){
    event.preventDefault();
    searchNeoByDate(start_date,end_date);
})

