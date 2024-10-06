import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

import pathIcon from "../img/error-icon.svg";

const galleryNode = document.querySelector(".gallery");

export default function (images) {
    if (images.length === 0) {
        iziToast.show({
            class: 'toast-message',
            message: 'Sorry, there are no images matching your search query. Please try again!',
            messageColor: '#fff',
            iconUrl: pathIcon,
            iconColor: '#fff',
            backgroundColor: '#EF4040',
            border: '2px solid #FFBEBE',
            position: 'topRight',
        })
        galleryNode.innerHTML = '';
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
    
    galleryNode.innerHTML = markup;
    let gallery = new SimpleLightbox('.gallery-link', {captionsData: 'alt', overlayOpacity: 0.5});
    gallery.refresh();
}