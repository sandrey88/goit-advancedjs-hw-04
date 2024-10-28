import { getImg } from './js/pixabay-api';
import { createCardsMarkup } from './js/render-functions';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const fetchUsersBtn = document.querySelector('button[type=submit]');
const imgs = document.querySelector('.images-div');
const loaderClass = document.querySelector('.loaderClass');

fetchUsersBtn.addEventListener('click', handleSearch);

function handleSearch(evt) {
  evt.preventDefault();
  let searchInput = document.querySelector('input[name="search"]');
  let notFoundTextEl = document.querySelector('.not-found-img');
  let searchValue = searchInput.value.trim();

  if (searchValue <= 0) {
    iziToast.show({
      title: '❌',
      message:
        'Sorry, there are no images matching your search query. Please try again!',
      color: 'ef4040',
    });
    return;
  }

  loaderClass.style.display = 'flex';

  getImg(searchValue)
    .then(data => {
      if (data.total === 0) {
        imgs.innerHTML = '';
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

      // Очищення тексту "not found" перед відображенням нових результатів
      notFoundTextEl.innerHTML = '';

      createCardsMarkup(data.hits);

      const imageElements = document.querySelectorAll('.gallery-img');
      const loadPromises = Array.from(imageElements).map(img => {
        return new Promise(resolve => {
          img.onload = resolve;
          img.onerror = resolve;
        });
      });

      Promise.all(loadPromises)
        .then(() => {
          console.log(loadPromises);
        })
        .catch(err => {
          loaderClass.innerHTML = '';
          console.error(err);
        });
    })
    .catch(console.error)
    .finally(() => {
      console.log('completed');
      loaderClass.style.display = 'none';
    });
  searchInput.value = '';
}
