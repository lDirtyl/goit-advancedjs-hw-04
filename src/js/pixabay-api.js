import axios from 'axios';

const API_KEY = '46747450-fc08b8bc876855aa84ec0c871';
const URL = 'https://pixabay.com/api/?';

export function fetchImages(query, currentPage) {
  const axiosConfigs = {
    params: {
      key: API_KEY,
      q: query,
      page: currentPage,
      per_page: 15,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: true,
    },
  };
  return axios.get(`${URL}`, axiosConfigs);

  // const searchParams = new URLSearchParams({
  //   key: API_KEY,
  //   q: query,
  //   image_type: 'photo',
  //   orientation: 'horizontal',
  //   safesearch: true,
  // });

  // return fetch(`${URL}${searchParams}`).then(response => {
  //   if (!response.ok) {
  //     throw new Error(response.status);
  //   }
  //   return response.json();
  // });
}
