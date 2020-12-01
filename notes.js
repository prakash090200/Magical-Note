doct = document.getElementById('adbu');
console.log(1);
doct.addEventListener('click', perform);
update();

function perform() {
    console.log(2);
     doc = document.getElementById('ta').value; 
    if (localStorage.getItem('note') == null) {
        notearray = [];
        if(validate(doc)){
        notearray.push([doc]);
        show("success","You book is added to our library succesfully");
        }
        else {
        show("danger","Please Enter the details before adding");
        }
        
        localStorage.setItem('note', JSON.stringify(notearray));
    }
    else {
         items = localStorage.getItem('note');
         
        notearray = JSON.parse([items]);
        if(validate(doc)){
            notearray.push([doc]);
            show("success","You book is added to our library succesfully");
            }
            else {
                show("danger","Please Enter the details before adding");
            }
        localStorage.setItem('note', JSON.stringify(notearray));
    }
    document.getElementById('ta').value='';//// to reset the value of text area
    update();
}
function update() {
    console.log(3);
     d = document.getElementById('notes');
    if (localStorage.getItem('note') == null) {
        notearray = [];
        localStorage.setItem('note', JSON.stringify(notearray));
    }
    else {
         ite = localStorage.getItem('note');
        notearray = JSON.parse(ite);
    }
    var str="";
    notearray.forEach((element, index) => {
         str+=`<div class=" notecard card my-3 mx-3" style="width: 18rem;">
                    <div class="card-body ">
                    <h5 class="card-title">Note ${index+1}</h5>
                    <p class="card-text">${element}</p>
                    <a href="#" id="${index}"class="btn btn-primary" onclick="deleted(this.id)">Delete</a>
                    </div>
                 </div>`;
        
    });
    d.innerHTML = str;
}
function deleted(value){
item=localStorage.getItem('note');
notearray=JSON.parse(item);
notearray.splice(value,1);
localStorage.setItem('note',JSON.stringify(notearray));

update();
}

//// search in seach bar
let searchtxt=document.getElementById('searchtxt');
searchtxt.addEventListener("input",searchnow);

function searchnow(){
let inputtxt=searchtxt.value.toLowerCase();
let card=document.getElementsByClassName('notecard');
Array.from(card).forEach(element=>{
let cardtxt=element.getElementsByTagName('p')[0].innerHTML;
if(cardtxt.includes(inputtxt)){
element.style.display="block";
}
else
element.style.display="none";
});
}

function show(alert,message){
    let mess=document.getElementById('messaged');
    let boldtext;
    if(alert==='success'){
    boldtext='Success';
    }
    else{
    boldtext='!Error';
    }
    mess.innerHTML= ` <div class="alert alert-${alert} alert-dismissible fade show" role="alert">
                            <strong>${boldtext} : </strong>${message}.
                            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                            </button>
                      </div> `;
    setTimeout(()=>{
       mess.innerHTML='';
    },3000);
}

function validate(doc){
   // let txt=document.getElementById('ta').value;
    if(doc.length<2)
    return false;
    else
    return true;
}
