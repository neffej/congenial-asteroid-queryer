const download = function(data, element){
    let dl_text = document.getElementById("dwnld-txt")
    const blob = new Blob([data], { type: 'text/csv' })

    const url = window.URL.createObjectURL(blob)

    if(dl_text){
        return
    }else{
    const div = document.createElement('div')

    div.classList.add("dwnldBtn")

    const a = document.createElement('a')
    a.id = "dwnld-txt"

    a.setAttribute('href', url)
    a.setAttribute("target", "_blank")
    a.textContent= 'Download CSV'

    a.setAttribute('download', 'download.csv')
    a.click()

    div.appendChild(a)
    element.appendChild(div)
    }
}


const csvMaker = function(array){
    let csvRows = []
    const headers = Object.keys(array[0])
    csvRows.push(headers.join(', '))

    array.forEach(element=>{
        const values = Object.values(element).join(', ')
        csvRows.push(values)
    })


    return csvRows.join('\n')
}

export { download, csvMaker }