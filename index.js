// SIXkMbmAWVZtBkfRDJyqZzdWcC7IG7pPku7ai5LrlOdXAHkY0VlcIpCZ API key
const apiKey = "jQQPwrpWGdZhNT7mBhgX3uuknOuM7CXCnFVy4FUR34oxDMRyfzFe10pr";
const partialUrl = "https://api.pexels.com/v1/search?query=";
document.querySelector("#loadImages").addEventListener("click", () => getInfos(partialUrl + "gatti"));

document.querySelector("#loadSecondaryImages").addEventListener("click", () => getInfos(partialUrl + "cani"));

document.querySelector("#search").addEventListener("click", () => {
  const inputElement = document.querySelector("#myInput");
  removeAllCards();
  if (inputElement.value.length > 3) {
    getInfos(partialUrl + inputElement.value);
  }
});

function getInfos(url) {
  fetch(url, {
    method: "GET",
    headers: {
      Authorization: apiKey,
    },
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error();
      }
    })
    .then((userArray) => {
      for (const photo of userArray.photos) {
        const card = createCard(photo);
        const col = document.querySelector("#myContainer");
        col.appendChild(card);
      }
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

function createCard({
  alt,
  avg_color,
  height,
  id,
  liked,
  photographer,
  photographer_id,
  photographer_url,
  src,
  url,
  width,
}) {
  const col = document.createElement("div");
  col.id = id;
  col.classList.add("col-md-4");

  const card = document.createElement("div");
  card.classList.add("card", "mb-4", "shadow-sm");

  const img = document.createElement("img");
  img.classList.add("bd-placeholder-img", "card-img-top");
  img.src = src.original;

  card.appendChild(img);

  const body = document.createElement("div");
  body.classList.add("card-body");
  const title = document.createElement("h5");
  title.textContent = photographer;

  body.appendChild(title);

  const paragraph = document.createElement("p");
  paragraph.classList.add("card-text");
  paragraph.textContent = alt;

  body.appendChild(paragraph);

  footer = document.createElement("div");
  footer.classList.add("d-flex", "justify-content-between", "align-items-center");
  buttonGroup = document.createElement("div");
  buttonGroup.classList.add("btn-group");

  buttonView = document.createElement("button");
  buttonView.classList.add("btn", "btn-sm", "btn-outline-secondary");
  buttonView.textContent = "View";

  hideButton = document.createElement("button");
  hideButton.classList.add("btn", "btn-sm", "btn-outline-secondary");
  hideButton.textContent = "Hide";

  hideButton.addEventListener("click", () => hideCard(id));

  buttonGroup.appendChild(buttonView);
  buttonGroup.appendChild(hideButton);

  const small = document.createElement("small");
  small.textContent = photographer_id;

  footer.appendChild(buttonGroup);
  footer.appendChild(small);

  body.appendChild(footer);

  card.appendChild(body);

  col.appendChild(card);
  return col;
}

function hideCard(cardId) {
  const card = document.getElementById(cardId);
  card.remove();
}

function removeAllCards() {
  const container = document.querySelector("#myContainer");
  const cards = container.children;
  for (const card of cards) {
    card.remove();
  }
}
