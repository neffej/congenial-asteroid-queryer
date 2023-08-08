import { download, csvMaker } from "./downloadCSV.js"


console.log('hello world')
const logoutEl = document.getElementById("logout")
const baseURL = 'https://api.nasa.gov/neo/rest/v1/'
const apiKEY = 'sFL0Yt0KzZft79bJZ8wpDcy2Wr8t27v6TggLHaIz'
const searchBtn = document.getElementById('search')
const clearBtn = document.getElementById('clear');
// clearBtn.style.display = 'none'

const downloadBtn = document.getElementById('download')
// downloadBtn.style.display = 'none'
const yearInput = document.getElementById("year");
const monthInput = document.getElementById('month');
const dayInput = document.getElementById('day');
const spanInput = document.getElementById('day-span');

const searchEl = document.getElementById('search_bar');
const resultsEl = document.getElementById('search_results');
const dateHeader = document.getElementById('date');
const distanceHeader = document.getElementById('distance');
const diameterHeader = document.getElementById('diameter');
const magnitudeHeader = document.getElementById('brightness');

let search_date = 0
let date = null


let days = [];
let neosData = [];
let csvData = [];


// Parses data into neosData array. Sends array to populateTables
function deconstruct(data){
    neosData = []
    const nasaObj = { ...data }
    const resultsObj = nasaObj.near_earth_objects
    console.log(resultsObj)
    for (let day in resultsObj){
    days.push(resultsObj[day]);
}
    days[0].forEach((element)=>{
        neosData.push(element)
    })
    populateTables(neosData);
    console.log(neosData)
    // parsePHA(days);
    // findNearest(days);
    // findLargest(days);
    // findBrightest(days);
}

function populateTables(array){
    console.log(days[0])
    array.forEach(item => {
        let sstr = item.nasa_jpl_url.split("=")[1]
    // Define item
    let result = {
        name: item.name, 
        id: item.id,
        date: item.close_approach_data[0].close_approach_date_full, 
        distance: Number(item.close_approach_data[0].miss_distance.miles).toFixed(2),
        diameter_in_feet: Number(item.estimated_diameter.feet.estimated_diameter_max).toFixed(2),
        magnitude: Number(item.absolute_magnitude_h),
        danger: item.is_potentially_hazardous_asteroid,
        link: "https://ssd.jpl.nasa.gov/tools/sbdb_lookup.html#/?sstr="+sstr
    }
    csvData.push(result)
    // Make Results row
    let row = document.createElement('tr');
    row.classList.add("table-primary");
    resultsEl.appendChild(row);

    function appendData(attr, id, b){
        let data = document.createElement('td');
        data.className = id;
        data.value = attr
        if(b===1){
            data.textContent = attr.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
        }else{
            data.textContent = attr;
        }

        row.appendChild(data);
    }
    function appendLink(attr, id){
        let data = document.createElement('td');
        data.className = id;
        let link = document.createElement("a");
        link.href = attr
        link.target = "_blank"
        link.textContent = sstr
        data.appendChild(link)
        row.appendChild(data)
    }

    // Make NEO data elements
        appendData(result.name, "name")
        appendData(result.id, "id")
        appendData(result.date, "date")
        appendData(result.distance, "distance",1 )
        appendData(result.diameter_in_feet, "diameter",1)
        appendData(result.magnitude, "brightness")
        appendData(result.danger, "pha")
        appendLink(result.link, "link")
    });
    console.log(csvData)
};



function removeChildren(element){
    while(element.firstChild){
        element.removeChild(element.firstChild)
    }
}

function clearTable(){
    days = [];
    csvData = [];
    removeChildren(resultsEl)
    console.log(days)
}

function searchNeoByDate(){
    const start = {
        year: yearInput.value,
        month: monthInput.value,
        day: dayInput.value
    };
    const end = {
        span: spanInput.value
    };
    let end_span = parseInt(end.span, 10)
    let start_day = parseInt(start.day,10)
    let end_day = end_span+start_day-1
    date = new Date(start.year, start.month, start.day)

    if(Number(search_date) === Number(date)&&resultsEl.children.length>0){
        console.log("same date")
        console.log(resultsEl.children.length)
        return
    }else{
        console.log(resultsEl.children.length)
        clearTable();
        search_date = date
        
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
}

let i = 2;
function sortTable(array){
    i++
    array.forEach(element=>{
        resultsEl.appendChild(element)
    })
}

function clickSort(num){
    console.log(i)
    let values = []

    const rows = document.querySelectorAll("tr.table-primary")

    rows.forEach((element)=>{
        element.value = Number(element.childNodes[num].value)
        values.push(element)
    })

    if(values.length>0){
        if(i%2===0){
        values.sort((a,b)=>a.value-b.value)
        }else{
            values.sort((a,b)=>b.value-a.value)
        }
    }
    removeChildren(resultsEl)
    sortTable(values)
}

searchBtn.addEventListener('click', function(event){
    event.preventDefault();
    searchNeoByDate();
    clearBtn.style.display = 'inline'
    downloadBtn.style.display = 'inline'
})

downloadBtn.addEventListener('click', function(){
    let array = csvMaker(csvData)
    download(array, downloadBtn)
})

clearBtn.addEventListener('click', function(event){
    event.preventDefault();
    clearTable();
    if(downloadBtn.children.length>0){
    downloadBtn.removeChild(downloadBtn.firstElementChild)}
    clearBtn.style.display = 'none'
    downloadBtn.style.display = 'none'
})

dateHeader.addEventListener('click', function(){
    clickSort(2)
})

distanceHeader.addEventListener('click', function(){
    clickSort(3)
})

diameterHeader.addEventListener('click', function(){
    clickSort(4)
})

magnitudeHeader.addEventListener('click', function(){
    clickSort(5)
})

// let PHA = [];
// let nearestObj = [];
// let largestObj = [];
// let absolMagnitude = [];

// function findBrightest(array){
//     array.forEach(element => {
//         element.forEach(item =>{
//         if (absolMagnitude.length === 0){
//             absolMagnitude.push(item)
//     }else if(item.absolute_magnitude_h < absolMagnitude[0]){
//         absolMagnitude.pop();
//         absolMagnitude.push(item)
//     }
// })
// })
//     console.log("brightest: ",absolMagnitude)
// }

// function findLargest(array){
//     array.forEach(element => {
//         element.forEach(item =>{
//         if (largestObj.length === 0){
//             largestObj.push(item)
//     }else if(item.estimated_diameter.miles.estimated_diameter_max > largestObj[0]){
//         largestObj.pop();
//         largestObj.push(item)
//     }
// })
// })
//     console.log("Largest: ",largestObj)
// }

// function findNearest(array){
//     array.forEach(element => {
//         element.forEach(item =>{
//         if (nearestObj.length === 0){
//             nearestObj.push(item)
//     }else if(item.close_approach_data[0].miss_distance.miles < nearestObj[0]){
//         nearestObj.pop();
//         nearestObj.push(item)
//     }
// })
// })
//     console.log("Nearest: ",nearestObj)
// }


// function parsePHA(array){
//     array.forEach(element=> {
//         element.forEach(element => {
//             if(element.is_potentially_hazardous_asteroid === true){
//                 PHA.push(element)
//             }
//         })
//     })
//     neosData.push(PHA);
// }