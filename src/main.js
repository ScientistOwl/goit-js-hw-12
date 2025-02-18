import { fetchImages } from './js/pixabay-api';
import { renderImages } from './js/render-functions';
import 'izitoast/dist/css/iziToast.min.css';
import 'simplelightbox/dist/simple-lightbox.min.css';

const searchForm = document.querySelector('#search-form');
const gallery = document.querySelector('.gallery');
const loader = document.querySelector('.loader');
const loadMoreBtn = document.querySelector('.load-more');
let query = '';

const handleSearch = async event => {
  event.preventDefault();
  query = event.target.elements.searchQuery.value.trim();

  if (!query) {
    iziToast.warning({
      title: 'Warning',
      message: 'Please enter a search query!',
    });
    return;
  }

  loadMoreBtn.classList.add('is-hidden');
  loader.classList.remove('is-hidden');
  gallery.innerHTML = '';

  try {
    const images = await fetchImages(query, true);
    renderImages(images, gallery);
    if (images.length > 0) loadMoreBtn.classList.remove('is-hidden');
  } catch (error) {
    console.error('Error handling search:', error);
  } finally {
    loader.classList.add('is-hidden');
  }
};

const handleLoadMore = async () => {
  loader.classList.remove('is-hidden');
  const firstCardHeight =
    gallery.firstElementChild.getBoundingClientRect().height;

  try {
    const images = await fetchImages(query);
    renderImages(images, gallery, true);

    const cardHeight = gallery.firstElementChild.getBoundingClientRect().height;

    window.scrollBy({
      top: cardHeight * 2,
      behavior: 'smooth',
    });

    if (images.length === 0) {
      loadMoreBtn.classList.add('is-hidden');
      iziToast.info({
        title: 'Info',
        message: "We're sorry, but you've reached the end of search results.",
      });
    }
  } catch (error) {
    console.error('Error loading more images:', error);
  } finally {
    loader.classList.add('is-hidden');
  }
};

searchForm.addEventListener('submit', handleSearch);
loadMoreBtn.addEventListener('click', handleLoadMore);
