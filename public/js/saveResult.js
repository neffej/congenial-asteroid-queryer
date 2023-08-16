const saveResults = function(array){
    const selectedRecordIds = [];
    const checkboxes = document.querySelectorAll('.form-check:checked');
  
    checkboxes.forEach(checkbox => {
      selectedRecordIds.push(parseInt(checkbox.getAttribute('data-id')));
    });

    const filteredNeos = array.filter(record => selectedRecordIds.includes(Number(record.id)))
    console.log(filteredNeos)

    fetch("/api/neo",{
        method: "POST",
        body: JSON.stringify({
            records: filteredNeos
        }),
        headers: {
            "Content-Type": "application/json",
        },
    }).then((res)=>{
        if(res.ok){
        console.log("Object Saved")
     }else{
            console.log("DB error")
        }
    });
}

export { saveResults }