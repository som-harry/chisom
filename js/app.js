const clear = document.querySelector(".clear");
const dataElement = document.getElementById("date");
const list = document.getElementById("list");
const input = document.getElementById("input");

// classes name
const CHECK = "fa-check-circle";
const UNCHECK = "fa-circle-thin";
const LINE_THROUGH = "lineThrough";

// variables
let LIST, id ;

// get item from localstorage
const data = localStorage.getItem("TODO");

if(data) {
    LIST = JSON.parse(data);
    id = LIST.length; //set id to the last on the list
    loadList(LIST); // load the list to user interface
}else {
// if data is empty
LIST = [];
id = 0;
}
//loads items to the user interface
function loadList(array) {
    array.forEach(item => {
        addToDo(item.name, item.id, item.done, item.trash);
        
    });
}
// Clear the localStorage
clear.addEventListener("click",() => {
localStorage.clear();
location.reload();
});


// shows todays day
const options = {weekday: "long",month:"short",day:"numeric"};
const today =  new Date();
dataElement.innerHTML = today.toLocaleDateString("en-US",options);

function addToDo(toDo,id,done,trash) {
    if(trash) {return;}

    const DONE = done ?  CHECK : UNCHECK;
    const LINE = done ?  LINE_THROUGH : "";

    const items = `
                     <li class="item">
                        <i class="fa ${DONE} co"  id="${id}" job="complete"></i>
                        <p class="text ${LINE }" >${toDo}</p>
                        <i class="fa fa-trash-o de" job="delete" id="${id}"></i>
                    </li>
                    `;
    const position = "beforeend";
    list.insertAdjacentHTML(position,items);
}

// add an item to the list  the user enter key
document.addEventListener("keyup",(event) => {
    if(event.keyCode == 13) {
        const toDo = input.value;

        // if the input is not empty
        if(toDo) {
            addToDo(toDo, id, false, false);
            LIST.push({
                name : toDo,
                id :id,
                done : false,
                trash : false
            });
            // add to local storage(this code must be added where the LIST array is updated)
            localStorage.setItem("TODO", JSON.stringify(LIST));
            id++;
        }
        input.value = "";
    }
});

// complete to do
function completeToDo(element) {
    element.classList.toggle(CHECK);
    element.classList.toggle(UNCHECK);
    element.parentNode.querySelector(".text").classList.toggle(LINE_THROUGH);

    LIST[element.id].done = LIST[element.id].done ? true : false;
    
}

// remove to do
function removeToDo(element) {
    element.parentNode.parentNode.removeChild(element.parentNode);
    LIST[element.id].trash = true;
 
}


//target the item created
list.addEventListener("click",(event) => {
    let element = event.target; // return the clicked element inside list
    const  elementJob = event.target.attributes.job.value; //complete or delete

    if(elementJob == "complete") {
        completeToDo(element);
    }else if(elementJob == "delete") {
        removeToDo(element);
    }

     // add to local storage(this code must be added where the LIST array is updated)
     localStorage.setItem("TODO", JSON.stringify(LIST));
});