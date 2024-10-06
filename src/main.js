import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

import fetchImages from "./js/pixabay-api";
import renderImages from "./js/render-functions";

const form = document.querySelector('.form');
// const btn = document.querySelector('.search-btn');
const galleryNode = document.querySelector(".gallery");


form.addEventListener("submit", (event) => {
    event.preventDefault()
    const searchRequest = event.target.elements.searchRequest.value.trim();
    if (searchRequest === '') {
        iziToast.show({
            class: 'toast-message',
            message: `Fill search field please`,
            messageColor: '#fff',
            backgroundColor: '#59A10D',
            border: '2px solid #B5EA7C',
            position: 'topRight',
        })
        return
    }
    galleryNode.innerHTML = '<span class="loader">Loading</span>';
        
    fetchImages(searchRequest)
        .then((images) => renderImages(images.hits))
        .catch((error) => console.log(error));
});
