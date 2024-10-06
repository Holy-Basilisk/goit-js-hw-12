import fetchImages from "./js/pixabay-api";
import renderImages from "./js/render-functions";
import {showMessage} from "./js/render-functions";

const form = document.querySelector('.form');
const moreBtn = document.querySelector('.more-btn');
const galleryNode = document.querySelector(".gallery");
const loader = document.querySelector('.loader');
const counter = document.querySelector('.counter');
const tooltip = document.querySelector('.tooltip');

let searchRequest = '';
let page = 1;
let perPage = 15;

form.addEventListener("submit", (event) => {
    event.preventDefault()
    galleryNode.innerHTML = '';
    counter.innerHTML = '';
    moreBtn.classList.add('hidden')
    tooltip.classList.add('hidden')

    searchRequest = event.target.elements.searchRequest.value.trim();
    if (searchRequest === '') {
        showMessage('Fill search field please')
        return
    }
    loader.classList.remove('hidden')
    page = 1;
    fetchImages(searchRequest, page, perPage)
        .then((response) => countPages(response.data))
        .catch((error) => showMessage(error, "error"));
});

moreBtn.addEventListener('click', () => {
    page++;
    moreBtn.classList.add('hidden')
    loader.classList.remove('hidden')
    fetchImages(searchRequest, page, perPage)
        .then((response) => countPages(response.data))
        .catch((error) => showMessage(error));
})

function countPages (response) {
    const totalPages = Math.ceil(response.totalHits / perPage);
    if (page < totalPages) {
        moreBtn.classList.remove('hidden')
        counter.innerHTML = `Page ${page} of ${totalPages}`;        

        renderImages(response.hits)
    } else {
        if (page > 1) {
            counter.innerHTML = `Page ${page} of ${totalPages}`;
            tooltip.classList.remove('hidden')
        }
        renderImages(response.hits)      
    }

}