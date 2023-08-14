import { download, csvMaker } from "./downloadCSV.js"

console.log('hello world')
const baseURL = 'https://api.nasa.gov/neo/rest/v1/'
const apiKEY = 'sFL0Yt0KzZft79bJZ8wpDcy2Wr8t27v6TggLHaIz'
const searchBtn = document.getElementById('search')
const clearBtn = document.getElementById('clear');
const downloadBtn = document.getElementById('download')
const saveBtn = document.getElementById('save')

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

//-----------------------FUNCTIONS-------------------------------//
//-----------------------HTML UTILITIES--------------------------//
//These utilities add and remove elements from the DOM. They are used by the other functions to display API data and to sort and manage the table display.

function appendData(attr, id, a, b){
    let row = document.getElementById(a)

    let data = document.createElement('td');
    data.className = id;
    data.value = attr
    if(b===1){
        data.textContent = attr.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    }else if(b===2){
        data.textContent = attr
        data.display = "none"
    }else{
        data.textContent = attr;
    }

    row.appendChild(data);
}

function appendLink(attr, id, a){
    let row = document.getElementById(a)

    let data = document.createElement('td');
    data.className = id;
    let link = document.createElement("a");
    link.href = attr
    link.target = "_blank"
    link.textContent = attr.split("=")[1]
    data.appendChild(link)
    row.appendChild(data)
}

function removeChildren(element){
    while(element.firstChild){
        element.removeChild(element.firstChild)
    }
}

function clearTable(){
    days = [];
    csvData = [];
    removeChildren(resultsEl)
}

//--------------------DATA UTILITIES------------------------------//
// Parses data into neosData array. Sends array to populateTables
function deconstruct(data){
    neosData = []
    const nasaObj = { ...data }
    const resultsObj = nasaObj.near_earth_objects
    console.log(resultsObj)
    for (let day in resultsObj){
    days.push(resultsObj[day]);
}
    days.forEach((day)=>{
        day.forEach((element)=>{
            neosData.push(element)
        })
    })
    // console.log(days)
    console.log(neosData)
    populateTables(neosData);
}

//Populates DOM with array data, typically from deconstructed API response JSON.
function populateTables(array){
    array.forEach(item => {
        let sstr = item.nasa_jpl_url.split("=")[1]
    // Define item
    let result = {
        name: item.name, 
        id: item.id,
        date: item.close_approach_data[0].close_approach_date_full, 
        epoch_date: item.close_approach_data[0].epoch_date_close_approach,
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
    row.id = result.id

    row.insertCell(0).innerHTML=`<input type="checkbox" class="form-check" data-id="${result.id}">`;
    
    resultsEl.appendChild(row);

    // Create checkbox


    appendData(result.name, "name",result.id)
    appendData(result.id, "id",result.id)
    appendData(result.date, "date", result.id)
    appendData(result.distance, "distance", result.id, 1)
    appendData(result.diameter_in_feet, "diameter", result.id, 1)
    appendData(result.magnitude, "brightness", result.id)
    appendData(result.danger, "pha", result.id)
    appendLink(result.link, "link", result.id)
    });
};


//--------------------------API Call to NASA----------------------------//
function searchNeoByDate(){
    const start = {
        year: yearInput.value,
        month: monthInput.value,
        day: dayInput.value
    };
    const span = spanInput.value
    if(span>7){
        window.alert("Please limit your search to 7 days or fewer")
        return
    }

    let end_span = parseInt(span, 10)
    let start_day = parseInt(start.day,10)
    let end_day = end_span+start_day-1
    date = new Date(start.year, start.month, start.day)

    if(Number(search_date) === Number(date)&&resultsEl.children.length>0){
        console.log("same date")
        return
    }else{
        clearTable();
        search_date = date
        
        const start_date = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`

        date.setDate(end_day)
    
        const end_date = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`
        
        var dateQueryURL = `feed?start_date=${start_date}&end_date=${end_date}&api_key=${apiKEY}`
        fetch(baseURL + dateQueryURL)
        .then(function(response){
            return response.json()
        })
        .then(function(data){
            deconstruct(data)
        })
    }
}

//----------------------SORT FUNCTIONS-------------------------------//
let i = 2;
function sortTable(array){
    i++
    array.forEach(element=>{
        resultsEl.appendChild(element)
    })
}

function clickSort(num){
    let values = []

    const rows = document.querySelectorAll("tr.table-primary")
    console.log(rows)
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

function csvSort(){
    if(csvData.length>0){
        if(i%2===0){
        csvData.sort((a,b)=>a.epoch_date-b.epoch_date)
        }else{
            csvData.sort((a,b)=>b.epoch_date-a.epoch_date)
        }
    }
    i++

    removeChildren(resultsEl)
    csvData.forEach((element)=>{
        let row = document.createElement('tr');
        row.classList.add("table-primary");
        row.id = element.id
        row.insertCell(0).innerHTML=`<input type="checkbox" class="form-check" data-id="${element.id}">`;
        resultsEl.appendChild(row);
    
        appendData(element.name, "name",element.id)
        appendData(element.id, "id",element.id)
        appendData(element.date, "date", element.id)
        appendData(element.distance, "distance", element.id, 1)
        appendData(element.diameter_in_feet, "diameter", element.id, 1)
        appendData(element.magnitude, "brightness", element.id)
        appendData(element.danger, "pha", element.id)
        appendLink(element.link, "link", element.id)
    })
}


function getChecked(){

        console.log(resultsEl.children)

}

//----------------------Event Listeners---------------------------//
searchBtn.addEventListener('click', function(event){
    event.preventDefault();
    searchNeoByDate();
    clearBtn.style.display = 'inline'
    downloadBtn.style.display = 'inline'
    if(saveBtn){
    saveBtn.style.display = 'inline'}
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
    saveBtn.style.display = 'none'
})

if(saveBtn){
saveBtn.addEventListener('click', function(event){
    event.preventDefault();
    // console.log('save')

    const selectedRecordIds = [];
    const checkboxes = document.querySelectorAll('.form-check:checked');
  
    checkboxes.forEach(checkbox => {
      selectedRecordIds.push(parseInt(checkbox.getAttribute('data-id')));
    });
    console.log(selectedRecordIds)

    const filteredNeos = neosData.filter(record => selectedRecordIds.includes(Number(record.id)))

    console.log(filteredNeos)
})}

dateHeader.addEventListener('click', function(){
    getChecked()
    csvSort()
})

distanceHeader.addEventListener('click', function(){
    clickSort(4)
})

diameterHeader.addEventListener('click', function(){
    clickSort(5)
})

magnitudeHeader.addEventListener('click', function(){
    clickSort(6)
})