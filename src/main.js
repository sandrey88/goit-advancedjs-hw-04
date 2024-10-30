import { getImg } from './js/pixabay-api';
import { createCardsMarkup } from './js/render-functions';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const fetchUsersBtn = document.querySelector('button[type=submit]');
const imgs = document.querySelector('.images-div');
const loaderClass = document.querySelector('.loaderClass');
const loadMoreBtn = document.querySelector('.load-more');

let currentPage = 1;
let currentSearchQuery = '';

fetchUsersBtn.addEventListener('click', handleSearch);
loadMoreBtn.addEventListener('click', handleLoadMore);

async function handleSearch(evt) {
  evt.preventDefault();
  const searchInput = document.querySelector('input[name="search"]');
  const notFoundTextEl = document.querySelector('.not-found-img');
  const searchValue = searchInput.value.trim();

  if (searchValue.length === 0) {
    iziToast.show({
      title: '❌',
      message: 'Please enter a search query!',
      color: 'ef4040',
    });
    return;
  }

  currentPage = 1;
  currentSearchQuery = searchValue;
  imgs.innerHTML = '';
  loadMoreBtn.style.display = 'none';
  notFoundTextEl.innerHTML = '';
  loaderClass.style.display = 'flex';

  try {
    const data = await getImg(searchValue, currentPage);

    if (data.total === 0) {
      notFoundTextEl.innerHTML = `Results for query <span>${searchValue}</span> not found!`;
      iziToast.show({
        title: '❌',
        message:
          'Sorry, there are no images matching your search query. Please try again!',
        backgroundColor: '#ef4040',
        messageColor: 'white',
      });
      return;
    }

    createCardsMarkup(data.hits);

    if (data.totalHits > currentPage * 15) {
      loadMoreBtn.style.display = 'block';
    } else {
      iziToast.show({
        message: "We're sorry, but you've reached the end of search results.",
        backgroundColor: '#4e75ff',
        messageColor: 'white',
      });
    }

    await handleImagesLoad();
  } catch (error) {
    console.error(error);
    iziToast.show({
      title: '❌',
      message: 'An error occurred while fetching images',
      backgroundColor: '#ef4040',
      messageColor: 'white',
    });
  } finally {
    loaderClass.style.display = 'none';
    searchInput.value = '';
  }
}

async function handleLoadMore() {
  currentPage += 1;
  loadMoreBtn.style.display = 'none';
  loaderClass.style.display = 'flex';

  try {
    const data = await getImg(currentSearchQuery, currentPage);
    createCardsMarkup(data.hits, true);

    // Отримання висоти карточки після рендеру
    const cardHeight = document
      .querySelector('.gallery-card')
      .getBoundingClientRect().height;

    // Плавне прокручування на 2 висоти карточки
    window.scrollBy({
      top: cardHeight * 2,
      behavior: 'smooth',
    });

    loaderClass.style.display = 'none';

    if (currentPage * 15 >= data.totalHits) {
      loadMoreBtn.style.display = 'none';
      iziToast.show({
        message: "We're sorry, but you've reached the end of search results.",
        backgroundColor: '#4e75ff',
        messageColor: 'white',
      });
    } else {
      loadMoreBtn.style.display = 'block';
    }

    await handleImagesLoad();
  } catch (error) {
    console.error(error);
    iziToast.show({
      title: '❌',
      message: 'An error occurred while loading more images',
      backgroundColor: '#ef4040',
      messageColor: 'white',
    });
    loaderClass.style.display = 'none';
  }
}

async function handleImagesLoad() {
  const imageElements = document.querySelectorAll('.gallery-img');
  const loadPromises = Array.from(imageElements).map(img => {
    return new Promise(resolve => {
      img.onload = resolve;
      img.onerror = resolve;
    });
  });

  await Promise.all(loadPromises);
}
