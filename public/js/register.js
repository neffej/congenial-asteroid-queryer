const fn = document.getElementById("first-name")
const ln = document.getElementById("last-name")
const em = document.getElementById("email")
const un = document.getElementById("username")
const pw = document.getElementById("password")
const submitBtn = document.getElementById("submit")

function submitForm(){
    let fn_input = fn.value
    let ln_input = ln.value
    let email_input = em.value
    let username_input = un.value
    let pw_input = pw.value

    fetch("/api/user/register",{
        method: "POST",
        body: JSON.stringify({
            first_name: fn_input,
            last_name: ln_input,
            username: username_input,
            email: email_input,
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
			createEl.innerHTML = "Registration rejected. Please check forms and try again.";
			document.getElementById("signup-form").appendChild(createEl);
        }
    });
}

submitBtn.addEventListener('click', function(event){
    event.preventDefault
    submitForm()
})