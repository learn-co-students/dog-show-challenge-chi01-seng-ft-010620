const form = document.querySelector("#dog-form")
let dog_id;
const tabody = document.querySelector("#table-body")
let DOG_DATA;

form.addEventListener("submit", event => {
    event.preventDefault();
    const name = event.target[0].value;
    const breed = event.target[1].value;
    const sex = event.target[2].value;

    fetch(`http://localhost:3000/dogs/${dog_id}`, patchFunc(dog_id, name, breed, sex))
        .then(resp => fetchEverything())
})

function patchFunc(id, name, breed, sex) {
    return {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            id,
            name,
            breed,
            sex
        })
    }
}

tabody.addEventListener("click", event => {
    const row = event.target.parentNode.parentNode.children
    if (event.target.innerText === "Edit") {
        form[0].value = row[0].innerText;
        form[1].value = row[1].innerText;
        form[2].value = row[2].innerText;
        dog_id = event.target.dataset.id
    }
})

// function
function fetchEverything() {
    fetch("http://localhost:3000/dogs")
        .then(resp => resp.json())
        .then(data => {
            DOG_DATA = data
            renderDogs();
        })
}

function renderDogs() {
    let html = "";
    DOG_DATA.forEach(dog => {
        html += `<tr><td>${dog.name}</td> <td>${dog.breed}</td> <td>${dog.sex}</td> <td><button data-id="${dog.id}">Edit</button></td></tr>`
    })
    tabody.innerHTML = html;
}

fetchEverything();