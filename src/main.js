import { fetchImages } from './js/pixabay-api';
import { renderImages } from './js/render-functions';
import 'izitoast/dist/css/iziToast.min.css';
import iziToast from 'izitoast';
import 'simplelightbox/dist/simple-lightbox.min.css';

const searchForm = document.querySelector('#search-form');
const gallery = document.querySelector('.gallery');
const loader = document.querySelector('.loader');
const loadMoreBtn = document.querySelector('.load-more');
let query = '';
let totalHits = 0;
let loadedImages = 0;

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
  loadedImages = 0;

  try {
    const { hits, totalHits: newTotalHits } = await fetchImages(query, true);
    totalHits = newTotalHits;
    renderImages(hits, gallery);
    loadedImages += hits.length;

    if (loadedImages < totalHits) {
      loadMoreBtn.classList.remove('is-hidden');
    } else if (totalHits > 0) {
      loadMoreBtn.classList.add('is-hidden');
      iziToast.info({
        title: 'Info',
        message: "We're sorry, but you've reached the end of search results.",
      });
    }
  } catch (error) {
    console.error('Error handling search:', error);
  } finally {
    loader.classList.add('is-hidden');
  }
};

const handleLoadMore = async () => {
  loader.classList.remove('is-hidden');

  try {
    const { hits } = await fetchImages(query);
    renderImages(hits, gallery, true);
    loadedImages += hits.length;

    window.scrollBy({
      top: gallery.firstElementChild.getBoundingClientRect().height * 2,
      behavior: 'smooth',
    });

    if (loadedImages >= totalHits || hits.length < 40) {
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
