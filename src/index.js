const dogTable = document.getElementById("table-body");
const form = document.getElementById("dog-form");

function fetchDogs() {
  fetch("http://localhost:3000/dogs")
    .then(resp => resp.json())
    .then(dogsData => renderDogs(dogsData));
}

function renderDogs(dogsData) {
  dogsData.forEach(dog => {
    const dogData = `<tr><td>${dog.name}</td> 
                    <td>${dog.breed}</td> 
                    <td>${dog.sex}</td> 
                    <td> <button id="edit" data-id=${dog.id} data-name=${dog.name} data-breed=${dog.breed} data-sex=${dog.sex}>Edit</button></td></tr>`;
    dogTable.innerHTML += dogData;
  });
}

function renderEditedDog(editedDog) {
    const editedRow = document.querySelector(`[data-id='${editedDog.id}']`).parentElement.parentElement
    editedRow.innerHTML = `<tr><td>${editedDog.name}</td> 
    <td>${editedDog.breed}</td> 
    <td>${editedDog.sex}</td> 
    <td> <button id="edit" data-id=${editedDog.id} data-name=${editedDog.name} data-breed=${editedDog.breed} data-sex=${editedDog.sex}>Edit</button></td></tr>`;
// dogTable.innerHTML += dogData;

}

document.addEventListener("click", (e) => {
  if (e.target.id === 'edit') {
    prePopulateForm(e);
  }
});

function prePopulateForm(e) {
  console.log(e.target.dataset);
  const name = e.target.dataset.name;
  const sex = e.target.dataset.sex;
  const breed = e.target.dataset.breed;
  const id = e.target.dataset.id 

  form.children.name.value = name;
  form.children.sex.value = sex;
  form.children.breed.value = breed;
  form.children[3].id = id 
}

function editedDogInfo(name, breed, sex) {
    return {
    method: "PATCH",
    headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
    },
    body: JSON.stringify({
        name: name,
        breed: breed,
        sex: sex
    })
}   
}

form.addEventListener("submit", (e) => {
    e.preventDefault()
    let name = e.target.name.value
    let breed = e.target.breed.value
    let sex = e.target.sex.value  
    fetch(`http://localhost:3000/dogs/${e.target.children[3].id}`, editedDogInfo(name, breed, sex))
    .then(resp => resp.json())
    .then(editedDog => renderEditedDog(editedDog))
    .catch(errors => console.log(errors))
})


fetchDogs();

// document.addEventListener('DOMContentLoaded', () => {

// })

// form.addEventListener("submit", (e) => {
//     e.preventDefault()
//     console.log(e.target.children[3].id)
// })

// var editedRow = document.querySelector(`[data-id='${editedDog.id}']`).parentElement.parentElement
// editedRow.children[0].innerText = editedDog.name