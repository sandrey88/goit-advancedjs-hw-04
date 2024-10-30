import axios from 'axios';

const API_KEY = '46726016-b290741f0a1b76ad16aa31499';
axios.defaults.baseURL = 'https://pixabay.com/api/';

async function getImg(searchValue, page = 1) {
  const searchParams = new URLSearchParams({
    key: API_KEY,
    q: searchValue,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: 'true',
    per_page: 15,
    page,
  });

  const response = await axios.get(`?${searchParams}`);
  return response.data;
}

export { getImg };
