import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { fetchImages } from './js/pixabay-api';
import { renderGalleryCardTemplate } from './js/render-functions';

const formEl = document.querySelector('.search-form');
const galleryListEl = document.querySelector('.gallery');
const loaderEl = document.querySelector('.js-loader');

let lightbox;

const initLightbox = () => {
  lightbox = new SimpleLightbox('.gallery a', {
    captionsData: 'alt',
    captionDelay: 250,
  });
};

const refreshLightbox = () => {
  if (lightbox) {
    lightbox.refresh();
  }
};

const onSearchFormSubmit = event => {
  event.preventDefault();

  const searchedValue = event.target.elements.searchQuery.value
    .toLowerCase()
    .trim();

  if (searchedValue === '') {
    iziToast.error({
      message: 'The search field should not be empty!',
      position: 'topRight',
    });

    formEl.reset();
    galleryListEl.innerHTML = '';
    return;
  }

  loaderEl.classList.remove('is-hidden');

  fetchImages(searchedValue)
    .finally(() => {
      loaderEl.classList.add('is-hidden');
    })
    .then(({ hits }) => {
      if (hits.length === 0) {
        iziToast.error({
          message:
            'Sorry, there are no images matching your search query. Please try again!',
          position: 'topRight',
        });

        formEl.reset();
        return;
      }

      const galleryCardsTemplate = renderGalleryCardTemplate(hits);
      galleryListEl.innerHTML = galleryCardsTemplate;
      formEl.reset();

      if (!lightbox) {
        initLightbox();
      } else {
        refreshLightbox();
      }
    })
    .catch(error => console.log(error));
};

formEl.addEventListener('submit', onSearchFormSubmit);
