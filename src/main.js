import { fetchImages } from './js/pixabay-api';
import { renderImages } from './js/render-functions';
import 'izitoast/dist/css/iziToast.min.css';
import 'simplelightbox/dist/simple-lightbox.min.css';

const searchForm = document.querySelector('#search-form');
const gallery = document.querySelector('.gallery');
const loader = document.querySelector('.loader');

const handleSearch = async event => {
  event.preventDefault();
  const query = event.target.elements.searchQuery.value.trim();

  if (!query) {
    iziToast.warning({
      title: 'Warning',
      message: 'Please enter a search query!',
    });
    return;
  }

  loader.classList.remove('is-hidden');
  gallery.innerHTML = '';

  try {
    const images = await fetchImages(query);
    renderImages(images, gallery);
  } catch (error) {
    console.error('Error handling search:', error);
  } finally {
    loader.classList.add('is-hidden');
  }
};

searchForm.addEventListener('submit', handleSearch);
