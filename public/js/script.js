console.log('hello world')
const baseURL = 'https://api.nasa.gov/neo/rest/v1/'
const apiKEY = 'sFL0Yt0KzZft79bJZ8wpDcy2Wr8t27v6TggLHaIz'
const searchBtn = document.getElementById('search')
const yearInput = document.getElementById("year");
const monthInput = document.getElementById('month');
const dayInput = document.getElementById('day');
const spanInput = document.getElementById('day-span');

const searchEl = document.getElementById('search_bar');
const resultsEl = document.getElementById('search_results');



// const start_date =`2023-05-15`
// const end_date = `2023-05-20`

let PHA = [];
let nearestObj = [];
let largestObj = [];
let absolMagnitude = [];
let days = [];

let neosData = [];

function populateTables(array){
    array.forEach(element => {
        element.forEach(item =>{

    // Define item
    let result = {Name: item.name, 
        JPL_ID: item.id,
        Date: item.close_approach_data[0].close_approach_date, 
        Approach: item.close_approach_data[0].miss_distance.miles,
        Diameter: item.estimated_diameter.feet.estimated_diameter_max,
        Brightness: item.absolute_magnitude_h,
        Danger: item.is_potentially_hazardous_asteroid,
        Link: item.links.self}

        console.log(result.Danger);


    // Make Results row
    let row = document.createElement('tr');
    row.classList.add("table-primary");
    resultsEl.appendChild(row);

    // Make header element
    let header = document.createElement('th');
    let scope = document.createAttribute('scope');
    // scope.value = "row";
    header.setAttribute("scope", "row");
    header.textContent = result.Name;

    row.appendChild(header);

    // Make NEO data elements
        let id = document.createElement('td');
        id.id = "JPL ID";
        id.textContent = result.JPL_ID;
        row.appendChild(id);

        let date = document.createElement('td');
        date.id = "approach_date";
        date.textContent = result.Date;
        row.appendChild(date);

        let distance = document.createElement('td');
        distance.id = "distance";
        distance.textContent = result.Approach;
        row.appendChild(distance);

        let diameter = document.createElement('td');
        diameter.id = "diameter";
        diameter.textContent = result.Diameter;
        row.appendChild(diameter);

        let magnitude = document.createElement('td');
        magnitude.id = "magnitude";
        magnitude.textContent = result.Brightness;
        row.appendChild(magnitude);

        let pha = document.createElement('td');
        pha.id = "PHA";
        pha.textContent = result.Danger
        row.appendChild(pha);

        let link = document.createElement('td');
        link.id = "link";
        link.textContent = result.Link;
        row.appendChild(link);
    });
});

}

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
    neosData.push(PHA);
}

function deconstruct(data){
    const nasaObj = { ...data }
    const resultsObj = nasaObj.near_earth_objects
    for (day in resultsObj){
    days.push(resultsObj[day]);
}
    console.log(days);
    populateTables(days);
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