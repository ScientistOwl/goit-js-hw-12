import axios from 'axios';

const API_KEY = '48807369-8911b207443a7f439467dae3a';
const BASE_URL = 'https://pixabay.com/api/';
let page = 1;
let totalHits = 0;

export const fetchImages = async (query, newSearch = false) => {
  if (newSearch) {
    page = 1;
    totalHits = 0;
  }

  try {
    const response = await axios.get(`${BASE_URL}`, {
      params: {
        key: API_KEY,
        q: query,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
        page: page,
        per_page: 40,
      },
    });

    if (newSearch) {
      totalHits = response.data.totalHits;
    }

    page += 1;
    return { hits: response.data.hits, totalHits: response.data.totalHits };
  } catch (error) {
    console.error('Error fetching images:', error);
    return { hits: [], totalHits: 0 };
  }
};
