const auth = "563492ad6f917000010000019de2bef887934a00a8ffb077fe87f3fb";
const gallery = document.querySelector(".gallery");
const searchInput = document.querySelector(".search-input");
const form = document.querySelector(".search-form");
let searchValue;

// Event Listeners
searchInput.addEventListener("input", updateInput);
form.addEventListener("submit", (e) => {
    e.preventDefault();
    searchPhotos(searchValue);
});

// Functions

function updateInput(e) {
    searchValue = e.target.value;
}

async function fetchApi(url) {
    const dataFetch = await fetch(url, {
        method: "GET",
        headers: {
            Accept: "application/json",
            Authorization: auth,
        },
    });
    const data = await dataFetch.json();
    return data;
}

function generatePicture(data) {
    data.photos.forEach((photo) => {
        const galleryImg = document.createElement("div");
        galleryImg.classList.add("gallery-img");
        galleryImg.innerHTML = `
        <div class="gallery-info">
            <p>${photo.photographer}</p>
            <a href=${photo.src.original}>Download</a>
        </div>
        <img src="${photo.src.large}"></img>
        `;
        gallery.appendChild(galleryImg);
    });
}

async function curatedPhotos() {
    const data = await fetchApi(
        "https://api.pexels.com/v1/curated?per_page=15&page=1"
    );

    generatePicture(data);
}

async function searchPhotos(query) {
    clear();
    const data = await fetchApi(
        `https://api.pexels.com/v1/search?query=${query}+query&per_page=15&page=1`
    );

    generatePicture(data);
}

function clear() {
    gallery.innerHTML = "";
    searchInput.value = "";
}

curatedPhotos();
