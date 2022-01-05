// Gallery selected to later add cards into
const galleryDiv = document.getElementById("gallery");
// Search bar container
const searchContainerDiv =
  document.getElementsByClassName("search-container")[0];
// Modal container
const modalContainerDiv = document.createElement("div");
modalContainerDiv.className = "modal-container";
modalContainerDiv.style.display = "none";
// Insert Modal container after Gallery Div
galleryDiv.insertAdjacentElement("afterend", modalContainerDiv);

/**
 * createCard()
 * The createCard() function creates a new element that hold all elements of the user card. The createCard() also calls the createModal() function passing it the current user, the card it creates for that user and the users JSON object array. (this is needed for the modal prev & next buttons)
 * @param {object} user - JSON Object
 * @param {object[]} users - Array of JSON Objects
 */
function createCard(user, users) {
  const cardDiv = document.createElement("div");
  cardDiv.className = "card";

  const cardImageConatainerDiv = document.createElement("div");
  cardImageConatainerDiv.className = "card-img-container";
  const cardImage = document.createElement("img");
  cardImage.className = "card-img";
  cardImage.src = user.picture.medium;
  cardImageConatainerDiv.appendChild(cardImage);
  cardDiv.appendChild(cardImageConatainerDiv);

  const cardInfoContainerDiv = document.createElement("div");
  cardInfoContainerDiv.className = "card-info-container";
  const nameH3 = document.createElement("h3");
  nameH3.className = "card-name cap";
  nameH3.innerText = `${user.name.first} ${user.name.last}`;
  cardInfoContainerDiv.appendChild(nameH3);
  const emailP = document.createElement("p");
  emailP.className = "card-text";
  emailP.innerText = user.email;
  cardInfoContainerDiv.appendChild(emailP);
  const locationP = document.createElement("p");
  locationP.className = "card-text cap";
  locationP.innerText = `${user.location.city}, ${user.location.state},`;
  cardInfoContainerDiv.appendChild(locationP);
  cardDiv.appendChild(cardInfoContainerDiv);
  cardDiv.addEventListener("click", () => {
    createModal(user, cardDiv, users);
  });
  galleryDiv.appendChild(cardDiv);
}

/**
 * createModal()
 * The createModal() function is called from the createCard() function recieving a user(json object), card(current user card that was created), and users(json object array of all 12 random users). It creates a Modal for the current user it was passed.
 * Modal also has a event listener that shows and hides the users modal window.
 * The createModal() function also calls the createModalButtons() function which creates a prev and next buttons to toogle through all the users using the card and users that is passed to it as parameters.
 * @param {object} user - JSON Object
 * @param {element} card - Div Element
 * @param {object[]} users - JSON Objects Array
 */
function createModal(user, card, users) {
  const modalDiv = document.createElement("div");
  modalDiv.className = "modal";

  const closeModalButton = document.createElement("button");
  closeModalButton.type = "button";
  closeModalButton.id = "modal-close-btn";
  closeModalButton.className = "modal-close-btn";
  const strongX = document.createElement("strong");
  strongX.innerText = "X";
  closeModalButton.appendChild(strongX);
  modalDiv.appendChild(closeModalButton);

  closeModalButton.addEventListener("click", () => {
    modalContainerDiv.style.display = "none";
  });
  const modalInfoContainerDiv = document.createElement("div");

  modalInfoContainerDiv.className = "modal-info-container";
  const modalImg = document.createElement("img");
  modalImg.className = "modal-img";
  modalImg.src = user.picture.large;
  modalImg.alt = "profile picture";
  modalInfoContainerDiv.appendChild(modalImg);

  const nameH3 = document.createElement("h3");
  nameH3.id = "name";
  nameH3.className = "modal-name cap";
  nameH3.innerText = `${user.name.first} ${user.name.last}`;
  modalInfoContainerDiv.appendChild(nameH3);

  const emailP = document.createElement("p");
  emailP.className = "modal-text";
  emailP.innerText = user.email;
  modalInfoContainerDiv.appendChild(emailP);

  const cityP = document.createElement("p");
  cityP.className = "modal-text";
  cityP.innerText = user.location.city;
  modalInfoContainerDiv.appendChild(cityP);

  const hr = document.createElement("hr");
  modalInfoContainerDiv.appendChild(hr);

  const cellP = document.createElement("p");
  cellP.className = "modal-text";
  let cell = user.cell;
  cell = cell.replace(/[^0-9]/g, "");
  cell = cell.replace(/^([0-9]{3})([0-9]{3})([0-9]{4})$/, "($1) $2-$3");
  cellP.innerText = cell;
  modalInfoContainerDiv.appendChild(cellP);

  const addressP = document.createElement("p");
  addressP.className = "modal-text";
  addressP.innerText = `${user.location.street.number} ${user.location.street.name}, ${user.location.city}, ${user.location.state} ${user.location.postcode}`;
  modalInfoContainerDiv.appendChild(addressP);

  const birthdayP = document.createElement("p");
  birthdayP.className = "modal-text";
  const date = new Date(user.dob.date);
  let month = date.getMonth() + 1;
  let day = date.getDate();
  if (month <= 9) {
    month = `0${month}`;
  }
  if (day <= 9) {
    day = `0${day}`;
  }
  birthdayP.innerText = `Birthday: ${month}/${day}/${date.getFullYear()}`;
  modalInfoContainerDiv.appendChild(birthdayP);

  modalDiv.appendChild(modalInfoContainerDiv);
  modalContainerDiv.innerHTML = "";
  modalContainerDiv.appendChild(modalDiv);
  modalContainerDiv.style.display = "";

  createModalButtons(card, users);
}

/**
 * createModalButtons()
 * The createModalButtons() function creates a prev and next button at the bottom of the modal window. These buttons toogles through all 12 users. The createModalButtons takes two parameters card (div element), and users (json object array) that it uses to display the correct user bassed on user button clicks.
 * @param {element} card - Div Element
 * @param {object[]} users - JSON Object Array
 */
function createModalButtons(card, users) {
  const modalButtonContainerDiv = document.createElement("div");
  const modalPrevButton = document.createElement("button");
  modalPrevButton.type = "button";
  modalPrevButton.id = "modal-prev";
  modalPrevButton.className = "modal-prev btn";
  modalPrevButton.innerText = "Prev";
  modalButtonContainerDiv.appendChild(modalPrevButton);

  const modalNextButton = document.createElement("button");
  modalNextButton.type = "button";
  modalNextButton.id = "modal-next";
  modalNextButton.className = "modal-next btn";
  modalNextButton.innerText = "Next";
  modalButtonContainerDiv.appendChild(modalNextButton);

  modalContainerDiv.appendChild(modalButtonContainerDiv);

  modalPrevButton.addEventListener("click", (e) => {
    if (card.previousElementSibling === null) {
      modalPrevButton.style.display = "none";
    } else {
      modalPrevButton.style.display = "";
      for (let user of users) {
        if (
          card.previousElementSibling.lastChild.firstChild.innerText ===
          `${user.name.first} ${user.name.last}`
        ) {
          createModal(user, card.previousElementSibling, users);
        }
      }
    }
  });
  modalNextButton.addEventListener("click", (e) => {
    if (card.nextElementSibling === null) {
      modalNextButton.style.display = "none";
    } else {
      modalNextButton.style.display = "";
      for (let user of users) {
        if (
          card.nextElementSibling.lastChild.firstChild.innerText ===
          `${user.name.first} ${user.name.last}`
        ) {
          createModal(user, card.nextElementSibling, users);
        }
      }
    }
  });
}

/**
 * createSearchBar()
 * The createSearchBar() function creates a search form that allows the user to type in a search term that will display matches based on user name that was searched. This function also contains an event listener for a search form submition and prevents form defaults.
 */
function createSearchBar() {
  const searchForm = document.createElement("form");
  searchForm.action = "#";
  searchForm.method = "get";

  const searchInput = document.createElement("input");
  searchInput.type = "search";
  searchInput.id = "search-input";
  searchInput.className = "search-input";
  searchInput.placeholder = "Search...";
  searchForm.appendChild(searchInput);

  const searchSubmit = document.createElement("input");
  searchSubmit.type = "submit";
  searchSubmit.value = "🔍"; // &#x1F50D; did not work for me
  searchSubmit.id = "search-submit";
  searchSubmit.className = "search-submit";
  searchForm.appendChild(searchSubmit);

  searchContainerDiv.appendChild(searchForm);

  searchForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const search = searchInput.value.toLowerCase();
    const cards = document.getElementsByClassName("card");
    for (let card of cards) {
      if (!card.lastChild.firstChild.innerText.toLowerCase().includes(search)) {
        card.style.display = "none";
      } else {
        card.style.display = "";
      }
    }
  });
}

// The API URL
const api_url = "https://randomuser.me/api/?results=12&nat=us";

/**
 * This is a async await function that uses fetch to retrieve a response from the api. This funciton then calls the createCard() function passing it each user and the users (json object array) to create a card and modal window for each user.
 */
async function getRandomUser() {
  try {
    const response = await fetch(api_url);
    const data = await response.json();
    const users = data.results;

    for (let user of users) {
      createCard(user, users);
    }
  } catch (err) {
    console.error("Error fetching data. ", err);
  }
}

// Calls the function that creates the search bar
createSearchBar();
// Calls the function that calls and retrieves from the api
getRandomUser();
