let c = document.querySelector("#inputt"); 
let cont = document.querySelector(".container"); 
let h = document.querySelector("#add");
let i = document.querySelector(".tasks");
let display = (JSON.parse(localStorage.getItem('todotask'))) || []
let opt = document.getElementById('opt')
let clear = document.getElementById('clear')


val = c.value
obj = val.tsk 

task = (val) => {
let n = document.createElement("div")
n.classList.add("child")
let e = document.createElement("input")
e.type="text"
e.value = val.tsk
e.setAttribute("readonly", "readonly")
e.classList.add("list")
n.appendChild(e)
i.appendChild(n)
let d = document.createElement("button")
d.innerText="Del"
d.classList.add("del")
n.appendChild(d)
d.style.display="none"
let u = document.createElement("button")
u.classList.add("edit")
u.innerText="Edit"
u.style.display="none"
var check = document.createElement('input')
check.type = "checkbox"
check.id = "check"
check.style.display = "none"


n.appendChild(u)
c.value=""
e.addEventListener('click', () =>{
if (u.style.display=="none"){
    u.style.display="inline"
    d.style.display="inline"
    n.style.minHeight = "70px"
}
else {
    u.style.display="none"
    d.style.display="none"
    n.style.minHeight = "auto"
}
})
u.addEventListener('click', () =>{

if(u.innerText=="Edit"){
    e.removeAttribute("readonly");
    e.focus();
    u.innerText="Save";
    return;
}
if(u.innerText=="Save" && e.value!=""){
    console.log(display)
    u.innerText="Edit";
    e.style.outline = "black"
    e.style.borderColor="black"
    d.style.borderColor="black"
    e.setAttribute("readonly", "readonly");
    display = display.map((even)=> even.id == val.id ? {...even, tsk: e.value} : even)
    localStorage.setItem('todotask', JSON.stringify(display))
    console.log(display)
    return;
}
if(e.value==""){
    e.removeAttribute("readonly")
    e.focus()
    u.innerText="Save"
    e.placeholder="Please input task here"
    e.style.outline = "red"
    e.style.borderColor="red"
    d.style.borderColor="red"
    return;
}
})
d.addEventListener('click', () =>{
    n.style.display="none"
    display = display.filter((e)=> e != val)
    localStorage.setItem('todotask', JSON.stringify(display))
})

i.insertBefore(n, i.childNodes[0])


if(val.done == true){
    check.style.display = "inline"
    e.style.backgroundColor = "#e6e1d9"
    e.style.opacity = "0.7"
    e.style.borderColor = "darkblue"
    e.style.outline = "darkblue"
    n.appendChild(check)
    check.setAttribute("checked", "checked")
    e.style.width = "calc(100% - 20px)"
    e.style.float = "right"
}
if(val.done == false){
        e.style.backgroundColor = "transparent"
        e.style.opacity = 1
        e.style.borderColor = "black"
        e.style.outline = "black"
        check.style.display = "none"
        e.style.width = "calc(100%)"
        e.style.float = "left"  
}

e.addEventListener('dblclick', function toggle(){
    if(check.style.display == "none"){
        check.style.display = "inline"
        display = display.map((e)=> e.id == val.id ? {...e, done: !e.done} : e)
        e.style.backgroundColor = "#e6e1d9"
        e.style.opacity = "0.7"
        e.style.borderColor = "darkblue"
        e.style.outline = "darkblue"
        n.appendChild(check)
        check.setAttribute("checked", "checked")
        e.style.width = "calc(100% - 20px)"
        e.style.float = "right"
        localStorage.setItem('todotask', JSON.stringify(display))
        return;
    }
    if(check.style.display == "inline") {
        check.style.display = "none"
        display = display.map((e)=> e.id == val.id ? {...e, done: !e.done} : e)
        e.style.backgroundColor = "transparent"
        e.style.opacity = 1
        e.style.borderColor = "black"
        e.style.outline = "black"
        e.style.width = "calc(100%)"
        e.style.float = "left" 
        localStorage.setItem('todotask', JSON.stringify(display)) 
        return; 
    }
}
)

}

addTask = ()=>{
    if(!c.value){
        alert("Please Input Task");
        return;
    }
    obj = {
        id: display.length,
        tsk: c.value,
        done: false
    }
    val = obj
    display.push(obj)
    task(val)
    localStorage.setItem('todotask', JSON.stringify(display))
}

window.addEventListener('keydown', ()=>{
    if(event.key == "Enter"){
    addTask()
    return
}
})

display.forEach(task)

function clearr(){
    clear.style.display == "none" ? clear.style.display = "inline" :
    clear.style.display = "none"
    return
}

clear.addEventListener('click', ()=>{
    cont.removeChild(i)
    display = []
    localStorage.setItem('todotask', JSON.stringify(display))
})