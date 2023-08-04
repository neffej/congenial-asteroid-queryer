const un = document.getElementById("username")
const pw = document.getElementById("password")
const submitBtn = document.getElementById("submit")

function submitForm(){
    let username_input = un.value
    let pw_input = pw.value
    console.log("click")
    console.log(username_input)
    console.log(pw_input)
    fetch("/api/user/login",{
        method: "POST",
        body: JSON.stringify({
            username: username_input,
            password: pw_input,
        }),
        headers: {
            "Content-Type": "application/json",
        },
    }).then((res)=>{
        if(res.ok){
        document.location.replace("/") 
     }else{
            if (document.querySelector(".bad-login")) {
				document.querySelector(".bad-login").remove();
			}
			const createEl = document.createElement("p");
			createEl.classList = "bad-login";
			createEl.innerHTML = "Login rejected. Please check forms and try again.";
			document.getElementById("signin-form").appendChild(createEl);
        }
    });
}

submitBtn.addEventListener('click', function(event){
    event.preventDefault
    submitForm()
})