// declared variables
DOGS_URL = "http://localhost:3000/dogs"
const body = document.querySelector('body')
const table = document.querySelector('table')
const dogForm = document.querySelector('#dog-form')
const nameFormField = dogForm.children[0]
const breedFormField = dogForm.children[1]
const sexFormField = dogForm.children[2]
const submitButton = dogForm.children[3]

//  defined functions
const fetchDogs = () => {
    fetch(DOGS_URL)
    .then(resp => resp.json())
    .then(data => {
      console.log(data)
      renderAllDogs(data)
    })
    .catch(err => errorMessage(err))
}

const renderAllDogs = (data) => {
  const rowContents = table.children[1]
  data.forEach(dog => {
    console.log(dog['id'])
    rowContents.innerHTML += `<tr><td>${dog.name}</td> <td>${dog.breed}</td> <td>${dog.sex}</td> <td><button data-id=${dog.id}>Edit</button></td></tr>`
  })
}

const errorMessage = (err) => {
  body.innerHTML = `<h1>The following prevented dogs from being rendered: ${err}</h1>`
  console.log("is the server running?")
}

const populateDogForm = (event) => {
  if (event.target.tagName === 'BUTTON') {
    console.log(dogForm)
    const wholeRow = event.target.parentElement.parentElement
    console.log(wholeRow)
    const dogName = wholeRow.children[0].innerText
    const dogBreed = wholeRow.children[1].innerText
    const dogSex = wholeRow.children[2].innerText
    const dogId = event.target.dataset.id
    nameFormField.value = dogName
    breedFormField.value = dogBreed
    sexFormField.value = dogSex
    submitButton.dataset.id = dogId
  }
}

const editDogObj = (dogName, dogBreed, dogSex, dogId) => {
  return {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify({
      id: dogId,
      name: dogName,
      breed: dogBreed,
      sex: dogSex
    })
  }
}

const editExistingDog = (event) => {
  event.preventDefault()

  const dogName = event.target.children[0].value
  const dogBreed = event.target.children[1].value
  const dogSex = event.target.children[2].value
  const dogId = event.target.children[3].dataset.id
  validateForm(dogName, dogBreed, dogSex, dogId)

  fetch(`${DOGS_URL}/${dogId}`, editDogObj(dogName, dogBreed, dogSex, dogId))
  .then(resp => resp.json())
  .then(dogData => renderEditedDog(dogData))
}

const renderEditedDog = (dogData) => {
  console.log(event)
  dogName = dogData.name
  dogBreed = dogData.breed
  dogSex = dogData.sex
  dogId = dogData.id
  const dogRow = table.querySelector(`[data-id="${dogId}"]`).parentElement.parentElement
  dogRow.children[0].innerText = dogName
  dogRow.children[1].innerText = dogBreed
  dogRow.children[2].innerText = dogSex
  dogForm.reset()
}

const validateForm = (dogName, dogBreed, dogSex, dogId) => {
  if (dogName === "") {
    console.log("FALSE BITCH")
  } else if (dogBreed === "") {
    console.log("FALSE BITCH")
  } else if (dogSex === "") {
    console.log("FALSE BITCH")
  } else if (dogId === "") {
    console.log("FALSE BITCH")
  }
}


// event listeners
table.addEventListener('click', populateDogForm)
dogForm.addEventListener("submit", editExistingDog)


//  invoked functions
fetchDogs()
