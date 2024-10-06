import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

import pathIcon from "../img/error-icon.svg";

const galleryNode = document.querySelector(".gallery");
const loader = document.querySelector('.loader');
// const moreBtn = document.querySelector('.more-btn');

export default function (images) {
    loader.classList.add('hidden')
    if (images.length === 0) {
        showMessage('Sorry, there are no images matching your search query. Please try again!', 'error')
        return
    }

    const markup = images.reduce((string, image) =>  {
        return `${string}
        <li class="gallery-item">
            <a class="gallery-link" href="${image.largeImageURL}">
                <img 
                class="gallery-image"
                src="${image.webformatURL}"
                alt="${image.tags}"
                />
            </a>
            <div class="gallery-descr">
                <div class="gallery-descr-itm">
                    <p class="gallery-descr-header">Likes</p>
                    <p class="gallery-descr-text">${image.likes}</p>
                </div>
                <div class="gallery-descr-itm">
                    <p class="gallery-descr-header">Views</p>
                    <p class="gallery-descr-text">${image.views}</p>
                </div>
                <div class="gallery-descr-itm">
                    <p class="gallery-descr-header">Comments</p>
                    <p class="gallery-descr-text">${image.comments}</p>
                </div>
                <div class="gallery-descr-itm">
                    <p class="gallery-descr-header">Downloads</p>
                    <p class="gallery-descr-text">${image.downloads}</p>
                </div>
            </div>
        </li>`
    }, '');
    
    galleryNode.insertAdjacentHTML('beforeend', markup);
    let gallery = new SimpleLightbox('.gallery-link', {captionsData: 'alt', overlayOpacity: 0.5});

    gallery.refresh();
}

export function showMessage(message, type) {
    let backgroundColor = '#59A10D';
    let borderColor = '#B5EA7C';
    let iconUrl = '';
    let iconColor = backgroundColor;
    if (type === 'error') {
        backgroundColor = '#EF4040';
        borderColor = '#FFBEBE';
        iconUrl = pathIcon;
        iconColor = '#fff';
        loader.classList.add('hidden')
    } 

    iziToast.show({
        class: 'toast-message',
        message,
        messageColor: '#fff',
        iconUrl,
        iconColor,
        backgroundColor,
        border: `2px solid ${borderColor}`,
        position: 'topRight',
    })
}