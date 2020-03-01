const table = document.querySelector('table').children[1];
// document.addEventListener('DOMContentLoaded', () => {
//  
// }); 
fetchDogs();
 editButton();

////////// dogs rendering ///////
function fetchDogs() {
  const table = document.querySelector('table').children[1];
  fetch('http://localhost:3000/dogs')
    .then(resp => resp.json())
    .then(function(data) {
      //console.log(data)
      renderDogs(data);
    });
}

function renderDogs(data) {
  
  let returnString = '';
  data.forEach(dog => {
    const td = `<tr>
    <td data-id = "${dog.id}" class="name" style="text-align:center">${dog.name}</td>
    <td data-id = "${dog.id}" class= "breed" style="text-align:center">${dog.breed}</td>
    <td data-id = "${dog.id}" class= "sex" style="text-align:center">${dog.sex}</td>
    <td style="text-align:center"><button>Edit</button></td>
    </tr>`;
    returnString += td;
  })
  table.innerHTML = returnString;
}

////////////// edit button /////////////
function editButton() {
  const button = document.querySelector('#table-body');
  button.addEventListener('click', function() {
    if (event.target.innerHTML === 'Edit') {
      let tableRow = event.target.parentElement.parentElement;
      let dogName = tableRow.children[0].innerHTML;
      let dogBreed = tableRow.children[1].innerHTML;
      let dogSex = tableRow.children[2].innerHTML;
      let nameInput = document.querySelector('input');
      let breedInput = document.querySelectorAll('input')[1];
      let sexInput = document.querySelectorAll('input')[2];
      nameInput.value = dogName;
      breedInput.value = dogBreed;
      sexInput.value = dogSex;
     
       // console.log(event.target);
      editSubmit(tableRow);
   
    }
    //debugger
  });
}
function editSubmit(tableRow) {
    let form = document.querySelector('form');
  form.addEventListener('submit', function(event) {
      event.preventDefault()
 
  let dogID = tableRow.children[0].dataset.id;
  let newDogName = form.children[0].value
  let newDogBreed = form.children[1].value
  let newDogSex = form.children[2].value
  let bodyData= {
      id: `${dogID}`,
      name: `${newDogName}`,
      breed: `${newDogBreed}`,
      sex: `${newDogSex}`}
      //debugger
    fetch(`http://localhost:3000/dogs/${dogID}`, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json',
        "Accept": 'application/json'
      },
      body: JSON.stringify(bodyData)
    })//.then(resp => fetchDogs())   
    // event.target.reset()  
    .then(resp =>resp.json())
    //.then(data => console.log(data)) 
    .then(data => renderNewUpdate(data))
})
}
   
    

//   });
//   dogID = ""


function renderNewUpdate(data){
//    debugger
    // const dogRow = document.querySelectorAll(`td`)
    var rowData = document.querySelector(`[data-id='${data.id}']`).parentElement
    rowData.children[0].innerHTML = data.name
    rowData.children[1].innerHTML = data.breed
 rowData.children[2].innerHTML = data.sex
} 
   // dogRow.forEach( tableRow =>{
    //     if(tableRow.dataset.id === `${data.id}`){
    //         console.log(tableRow)
    //         console.log(data)
    //         tableRow.innerHTML = ''
    //         tableRow.innerHTML= `<td data-id = "${data.id}" style="text-align:center">${data.name}</td>`
            // tableRow.value= `${data.breed}`
            // tableRow.sex.innerHTML =`<td style="text-align:center">${data.sex}</td>`
        
            // tableRow.innerHTML = ''
            // tableRow.name.innerHTML = `<td data-id = "${data.id}" style="text-align:center">${data.name}</td>`
            // tableRow.breed.innerHTML= `<td style="text-align:center">${data.breed}</td>`
            // tableRow.sex.innerHTML =`<td style="text-align:center">${data.sex}</td>`    
       
