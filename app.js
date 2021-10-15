/**
 *  @author Magpiny
 */

let saveTODOS = document.querySelector(".saveButton");

//function to save todos...
function saveMyTODOs(form){
    //let initialNumber = form.elements[""].value;
    let task1 = form.elements["task"].value;
    let mydate = form.elements["date"].value;
    let mytime = form.elements["time"].value;
    let deadline = form.elements["deadline"].value;

    //save messages
    let successfullSave = document.querySelector(".successfulSave");
    let unsuccessfullSave = document.querySelector(".saveError");

    if (!task1 || !mydate) {
       let interval= setInterval(function(){
            unsuccessfullSave.style.color="red";
            unsuccessfullSave.innerHTML = "Error!! Your TODOS NOT Saved to Database!";
            console.log(localStorage.length);
        
        },1000);

        window.setTimeout(function(){
            clearInterval(interval);
            unsuccessfullSave.innerHTML="";
        },3000);
        
    } else {

      //save form data persistently in browser storage  
       let myTodos = {
                task:task1,
                date:mydate,
                mtime:mytime,
                dline:deadline
            };
        //Store Data
        let db = [];
        db.push(myTodos);
        localStorage.setItem('data', JSON.stringify(db));
        
        //Retrieve data 
        let myadata = localStorage.getItem('data');
        console.log(JSON.parse(myadata));

        //Display success message 
        let timeout = setInterval(()=>{
            successfullSave.style.color="green";
            successfullSave.style.backgroundColor="white";
            successfullSave.style.padding="2px";
            successfullSave.innerHTML = "Congratulations!! Your TODOs successfully saved!";
            
        }, 500);
        window.setTimeout(function(){
            clearInterval(timeout);
            successfullSave.innerHTML="";
        }, 5000);

    };


    form.reset();

};

//saveTODOS.addEventListener('load', saveMyTODOs, false);

//Make the table dynamic 
//Display records from browser storage
function createNodesAndLoadContent(){
    
    //Retrieve the todos from the localStorage
    let retrievedTODOS = JSON.parse(localStorage.data);
    console.table(retrievedTODOS);
    
    //add text nodes
    //Add some contents to the created nodes
    
    retrievedTODOS.map((item, index)=>{

        //create elements
        let tableBody = document.querySelector("tbody");
        let row   = document.createElement("tr");
        let thead = document.createElement("th");
        let tdata1 = document.createElement("td");
        let tdata2 = document.createElement("td");
        let tdata3 = document.createElement("td");
        let tdata4 = document.createElement("td");
        let deleteButton = document.createElement("button");


        let tdata1Content = document.createTextNode(item.task);
        let tdata2Content = document.createTextNode(item.date);
        let tdata3Content = document.createTextNode(item.mtime);
        let tdata4Content = document.createTextNode(item.dline);
        deleteButton.innerText = "X";
        thead.innerText = index;
        deleteButton.classList.add("deleteButton");

        //add text nodes to the newly created elements
        tdata1.appendChild(tdata1Content);
        tdata2.appendChild(tdata2Content);
        tdata3.appendChild(tdata3Content);
        tdata4.appendChild(tdata4Content);

        //Add created elements plus text nodes to the row
        row.appendChild(thead);
        row.appendChild(tdata1);
        row.appendChild(tdata2);
        row.appendChild(tdata3);
        row.appendChild(tdata4);
        row.appendChild(deleteButton);

        //Add the row containing newly created elements plus their content...
        // to the table body
        tableBody.appendChild(row);

        //Delete button functionality
        let deleteX = document.querySelector(".deleteButton");
        deleteX.addEventListener("click", deleteRecords, false);
    });
    
}

saveTODOS.addEventListener('click', createNodesAndLoadContent, false);
//document.body.addEventListener('DOMContentLoaded', createNodesAndLoadContent, false);

//delete records
function deleteRecords(){

    /**
     *  let row   = document.createElement("tr");
        let thead = document.createElement("th");
        let tdata1 = document.createElement("td");
        let tdata2 = document.createElement("td");
        let tdata3 = document.createElement("td");
        let tdata4 = document.createElement("td");
        let deleteButton = document.createElement("button");
     */

    row.removeChild(thead)
    row.removeChild(tdata1);
    row.removeChild(tdata2);
    row.removeChild(tdata3);
    row.removeChild(tdata4);
    row.removeChild(deleteButton);
    tableBody.removeChild(row)

    localStorage.removeItem(data);
}


//Make the dates and years dynamic
let this_day = document.querySelector(".time");
let today    = new Date().toLocaleDateString()
this_day.innerHTML = today;

let this_year = document.querySelector(".year");
let my_year = new Date().getFullYear();
this_year.innerHTML = my_year;

//Show url
let url = window.location.toString();
let myurl = document.querySelector(".reload");
myurl.innerHTML = url;

//Print page at will
let printpage = document.querySelector(".print");
printpage.addEventListener("click", function(){
    window.print();
}, false);
