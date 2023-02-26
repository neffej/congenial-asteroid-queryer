console.log('hello world')
const baseURL = 'https://api.nasa.gov/neo/rest/v1/'
const apiKEY = 'sFL0Yt0KzZft79bJZ8wpDcy2Wr8t27v6TggLHaIz'
const searchBtn = document.getElementById('search')
const yearInput = document.getElementById("year");
const monthInput = document.getElementById('month');
const dayInput = document.getElementById('day');
const spanInput = document.getElementById('day-span');

const year = yearInput.value



// const start_date =`2023-05-15`
// const end_date = `2023-05-20`

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
    console.log("brightest: ",absolMagnitude)
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

function searchNeoByDate(){
    const start = {
        year: yearInput.value,
        month: monthInput.value,
        day: dayInput.value
    };
    const end = {
        year: yearInput.value,
        month: monthInput.value,
        span: spanInput.value
    };
    let end_span = parseInt(end.span, 10)
    let start_day = parseInt(start.day,10)
    let end_day = end_span+start_day-1

    let date = new Date(start.year, start.month, start.day)

    const start_date = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`

    date.setDate(end_day)
    
    const end_date = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`
    
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
    searchNeoByDate();
})



// new Date(end.year, end.month, end_day).toLocaleDateString('en-us', {year:"numeric", month: "numeric", day: "numeric"})