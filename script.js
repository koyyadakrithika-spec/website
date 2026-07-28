document
.getElementById("blogForm")
.addEventListener("submit", async function(event){

event.preventDefault();

const title=document.getElementById("title").value.trim();

const author=document.getElementById("author").value.trim();

const content=document.getElementById("content").value.trim();

if(title===""||author===""||content===""){

alert("Please fill all fields");

return;

}

const response=await fetch("/add-blog",{

method:"POST",

headers:{

"Content-Type":"application/json"

},

body:JSON.stringify({

title,

author,

content

})

});

const data=await response.json();

alert(data.message);

document.getElementById("blogForm").reset();

});