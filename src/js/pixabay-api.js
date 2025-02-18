import axios from 'axios';

const API_KEY = '48807369-8911b207443a7f439467dae3a';
const BASE_URL = 'https://pixabay.com/api/';

export const fetchImages = async query => {
  try {
    const response = await axios.get(`${BASE_URL}`, {
      params: {
        key: API_KEY,
        q: query,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
      },
    });
    return response.data.hits;
  } catch (error) {
    console.error('Error fetching images:', error);
    return [];
  }
};
