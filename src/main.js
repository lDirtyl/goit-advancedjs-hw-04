import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { fetchImages } from './js/pixabay-api';
import { renderGalleryCardTemplate } from './js/render-functions';

const formEl = document.querySelector('.search-form');
const galleryListEl = document.querySelector('.gallery');
const loaderEl = document.querySelector('.js-loader');
const loadMoreBtnEl = document.querySelector('.js-load-more');

let lightbox;
let currentPage = 1;
let searchedValue = '';
const limit = 15;

const getGalleryCardHeight = () => {
  const firstCard = galleryListEl.querySelector('.gallery-card');
  if (firstCard) {
    const { height } = firstCard.getBoundingClientRect();
    return height;
  }
  return 0;
};

const scrollToNextImages = () => {
  const cardHeight = getGalleryCardHeight();
  if (cardHeight > 0) {
    window.scrollBy({
      top: cardHeight * 2,
      behavior: 'smooth',
    });
  }
};

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

const onSearchFormSubmit = async event => {
  try {
    event.preventDefault();

    searchedValue = event.target.elements.searchQuery.value
      .toLowerCase()
      .trim();

    currentPage = 1;

    if (searchedValue === '') {
      galleryListEl.innerHTML = '';
      iziToast.error({
        message: 'The search field should not be empty!',
        position: 'topRight',
      });

      formEl.reset();

      loadMoreBtnEl.classList.add('is-hidden');
      return;
    }

    loaderEl.classList.remove('is-hidden');

    const { data } = await fetchImages(searchedValue, currentPage);

    loaderEl.classList.add('is-hidden');

    if (data.hits.length === 0) {
      galleryListEl.innerHTML = '';
      iziToast.error({
        message:
          'Sorry, there are no images matching your search query. Please try again!',
        position: 'topRight',
      });

      formEl.reset();
      loadMoreBtnEl.classList.add('is-hidden');
      return;
    }

    const galleryCardsTemplate = renderGalleryCardTemplate(data.hits);
    galleryListEl.innerHTML = galleryCardsTemplate;
    formEl.reset();

    if (data.totalHits <= limit) {
      iziToast.warning({
        message: "We're sorry, but you've reached the end of search results.",
        position: 'topRight',
      });
    } else {
      loadMoreBtnEl.classList.remove('is-hidden');
    }

    if (!lightbox) {
      initLightbox();
    } else {
      refreshLightbox();
    }
  } catch (error) {
    console.log(error);
  }
};

const onLoadMoreBtnClick = async event => {
  try {
    currentPage += 1;

    loadMoreBtnEl.classList.add('is-hidden');
    loaderEl.classList.remove('is-hidden');

    const { data } = await fetchImages(searchedValue, currentPage);

    loaderEl.classList.add('is-hidden');

    const totalPages = Math.ceil(data.totalHits / limit);

    if (currentPage >= totalPages) {
      galleryListEl.innerHTML = '';
      iziToast.warning({
        message: "We're sorry, but you've reached the end of search results.",
        position: 'topRight',
      });
    } else {
      loadMoreBtnEl.classList.remove('is-hidden');
    }

    const galleryCardsTemplate = renderGalleryCardTemplate(data.hits);
    galleryListEl.insertAdjacentHTML('beforeend', galleryCardsTemplate);

    if (!lightbox) {
      initLightbox();
    } else {
      refreshLightbox();
    }

    scrollToNextImages();
  } catch (error) {
    console.log(error);
  }
};

formEl.addEventListener('submit', onSearchFormSubmit);
loadMoreBtnEl.addEventListener('click', onLoadMoreBtnClick);
