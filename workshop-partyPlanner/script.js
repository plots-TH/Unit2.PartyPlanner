const partyList = document.querySelector("#party-list");

function renderPartyList(partyListDataFromAPI) {
    const partyListHTML = partyListDataFromAPI.map((item) => {
        const newItem = document.createElement("li");

        const nameElement = document.createElement("p");
        nameElement.innerHTML = `<strong>Name:</strong> ${item.name}`;

        const descriptionElement = document.createElement("p");
        descriptionElement.innerHTML = `<strong>Description:</strong> ${item.description}`;

        const dateElement = document.createElement("p");
        dateElement.innerHTML = `<strong>Date:</strong> ${item.date}`;

        const locationElement = document.createElement("p");
        locationElement.innerHTML = `<strong>Location:</strong> ${item.location}`;

        const buttonElement = document.createElement("button");
        buttonElement.innerHTML = `Delete`;
        buttonElement.classList.add("delete-button");
        // add an event listener to the button for functionality
        buttonElement.addEventListener("click", () => {
            newItem.remove();
        });
        
        newItem.appendChild(nameElement);
        newItem.appendChild(descriptionElement);
        newItem.appendChild(dateElement);
        newItem.appendChild(locationElement);
        newItem.appendChild(buttonElement);
        return newItem;
        
    });
    partyList.replaceChildren(...partyListHTML);
}
// Handle form submission to add a new event
const addEventForm = document.querySelector("#add-event-form");
addEventForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = document.querySelector("#event-name").value;
    const description = document.querySelector("#event-description").value;
    const date = document.querySelector("#event-date").value;
    const location = document.querySelector("#event-location").value;

const inputNewItem = document.createElement("li");

const inputNameElement = document.createElement("p");
inputNameElement.innerHTML = `<strong>Name:</strong> ${name}`;

const inputDescriptionElement = document.createElement("p");
inputDescriptionElement.innerHTML = `<strong>Description:</strong> ${description}`;

const inputDateElement = document.createElement("p");
inputDateElement.innerHTML = `<strong>Date:</strong> ${date}`;

const inputLocationElement = document.createElement("p");
inputLocationElement.innerHTML = `<strong>Location:</strong> ${location}`;

const deleteButton = document.createElement("button");
deleteButton.innerHTML = `Delete`;
deleteButton.classList.add("delete-button");

deleteButton.addEventListener("click", () => {
    inputNewItem.remove();
});

inputNewItem.appendChild(inputNameElement);
inputNewItem.appendChild(inputDescriptionElement);
inputNewItem.appendChild(inputDateElement);
inputNewItem.appendChild(inputLocationElement);
inputNewItem.appendChild(deleteButton);

partyList.appendChild(inputNewItem);
addEventForm.reset();
});

async function getPartyList() {
    try{
        const response = await fetch("https://fsa-crud-2aa9294fe819.herokuapp.com/api/2109-CPU-RM-WEB-PT/events");
        const json = await response.json();
        //return variable so it can be used outside the function
        return json;
    } 
    catch (err) {
        console.error(err);
    }
}

async function init() {
    try{
        const parties = await getPartyList();
        console.log(parties);
        const party1 = parties.data[0];
        console.log(party1);
        const party1ID = parties.data[0].id;
        console.log(party1ID)

        if (!parties.data){
            console.error("No party data available");
        } else {
            renderPartyList(parties.data);
        }
    }
    catch (err) {
        console.error(err);
      }
}

init();