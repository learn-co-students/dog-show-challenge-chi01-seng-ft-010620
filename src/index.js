// declared variables
const tableBody = document.getElementById("table-body")
const dogForm = document.getElementById("dog-form")

// defined functions
const fetchDogData = () => {
    fetch("http://localhost:3000/dogs")
        .then( resp => resp.json() )
        .then( dogsData => renderDogData(dogsData) )
        .catch( err => console.log(err) )
}

const renderDogData = (dogsData) => {
    dogsData.forEach( dogData => {
        const dogTable = `<tr><td>${dogData.name}</td>
        <td>${dogData.breed}</td>
        <td>${dogData.sex}</td>
        <td><button data-id=${dogData.id}>Edit</button></td></tr>
        `
    tableBody.innerHTML += dogTable
    })
}

const editDog = () => {
    const rowData = event.target.parentElement.parentElement
    const dogName = rowData.children[0].innerText
    const dogBreed = rowData.children[1].innerText
    const dogSex = rowData.children[2].innerText
    const dogId = rowData.children[3].children[0].dataset.id
    dogForm.name.value = dogName
    dogForm.breed.value = dogBreed
    dogForm.sex.value = dogSex
    dogForm.dataset.dogId = dogId
}

// if dogForm.dataset.dogId then push patch through, 
 // else alert "Please select a dog to edit"

const updateDog = (event) => {
    event.preventDefault()
    const clicked = event.target
    const dogId = event.target.dataset.dogId
    fetch(`http://localhost:3000/dogs/${dogId}`, reqObj(clicked) )
        .then( resp => resp.json() )
        .then( dogData => renderUpdatedDog(dogData) )
        .catch( err => console.log(err) )
}

const reqObj = (clicked) => {
    const dogName = clicked.name.value
    const dogBreed = clicked.breed.value
    const dogSex = clicked.sex.value
    const dogId = clicked.dataset.dogId
    return {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify({
            name: dogName,
            breed: dogBreed,
            sex: dogSex,
            id: dogId
        })
    }
}

const renderUpdatedDog = (dogData) => {
    const dogRow = document.querySelector(`[data-id="${dogData.id}"]`).parentElement.parentElement
    dogRow.children[0].innerText = dogData.name
    dogRow.children[1].innerText = dogData.breed
    dogRow.children[2].innerText = dogData.sex
    dogForm.reset()
}

// eventListeners
tableBody.addEventListener("click", editDog)
dogForm.addEventListener("submit", updateDog)

// invoked functions
fetchDogData()