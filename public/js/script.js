console.log('hello world')
const baseURL = 'https://api.nasa.gov/neo/rest/v1/'
const apiKEY = 'sFL0Yt0KzZft79bJZ8wpDcy2Wr8t27v6TggLHaIz'
const searchBtn = document.getElementById('search')
const start_date = `2023-05-26`;
const end_date = `2023-05-31`;

let PHA = [];
let nearestObj = [];
let largestObj = [];
let absolMagnitude = [];
let days = []

function findBrightest(array){
    array.forEach(element => {
        element.forEach(item =>{
        if (absolMagnitude.length === 0){
            absolMagnitude.push(item)
    }else if(item.absolute_magnitude_h < absolMagnitude[0]){
        absolMagnitude.pop();
        absolMagnitude.push(item)
    }
})
})
    console.log(absolMagnitude)
}


function findLargest(array){
    array.forEach(element => {
        element.forEach(item =>{
        if (largestObj.length === 0){
            largestObj.push(item)
    }else if(item.estimated_diameter.miles.estimated_diameter_max > largestObj[0]){
        largestObj.pop();
        largestObj.push(item)
    }
})
})
    console.log(largestObj)
}

function findNearest(array){
    array.forEach(element => {
        element.forEach(item =>{
        if (nearestObj.length === 0){
            nearestObj.push(item)
    }else if(item.close_approach_data[0].miss_distance.miles < nearestObj[0]){
        nearestObj.pop();
        nearestObj.push(item)
    }
})
})
    console.log(nearestObj)
}


function parsePHA(array){
    array.forEach(element=> {
        element.forEach(element => {
            if(element.is_potentially_hazardous_asteroid === true){
                PHA.push(element)
            }
        })
    })
    console.log(PHA);
}

function deconstruct(data){
    const nasaObj = { ...data }
    const resultsObj = nasaObj.near_earth_objects
    for (day in resultsObj){
    days.push(resultsObj[day]);
}
    console.log(days);
    parsePHA(days);
    findNearest(days);
    findLargest(days);
    findBrightest(days);
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

