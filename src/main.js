import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import axios from 'axios';

const fetchPicturesForm = document.querySelector('.form');
const gallery = document.querySelector('.gallery');
const userInput = document.querySelector('input');
const container = document.querySelector('.container');
const loadMoreBtn = document.querySelector('.load-more');

let page = 1;
let per_page = 40;


const showLoader = () => {
  const loader = document.createElement('span');
  loader.classList.add('loader');
  container.append(loader);
};


const hideLoader = () => {
  const loader = document.querySelector('.loader');
  if (loader) {
    loader.remove();
  }
};

// відображення кнопки "Load more"
const showLoadMoreButton = () => {
  loadMoreBtn.style.display = 'block';
};

//приховання кнопки "Load more"
const hideLoadMoreButton = () => {
  loadMoreBtn.style.display = 'none';
};

function shouldHideLoadMoreButton(loadedImagesCount, totalImagesCount) {
  return loadedImagesCount >= totalImagesCount;
}

async function fetchPhotos() {
  const params = new URLSearchParams({
    page: page,
    per_page: per_page,
  });
  const apiKey = '41249104-77dc8b1e0563744cb8297ef15';
  const query = userQuery || userInput.value;
  const response = await axios.get(
    `https://pixabay.com/api/?key=${apiKey}&q=${encodeURIComponent(
      query
    )}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=${per_page}`
  );
  return response.data;
}
function renderPhotos(data) {
  const markup = data.hits
    .map(data => {
      return `<li class="gallery-item"><a href="${data.webformatURL}">
            <img class="gallery-image" src="${data.webformatURL}" alt="${data.tags}"></a>
            <p><b>Likes: </b>${data.likes}</p>
            <p><b>Views: </b>${data.views}</p>
            <p><b>Comments: </b>${data.comments}</p>
            <p><b>Downloads: </b>${data.downloads}</p>
            </li>`;
    })
    .join('');

  if (lightbox) {
    lightbox.destroy();
  }

  gallery.insertAdjacentHTML('beforeend', markup);
  lightbox = new SimpleLightbox('.gallery a', options);
  lightbox.on('show.simplelightbox');
  lightbox.refresh();
}

fetchPicturesForm.addEventListener('submit', async e => {
  showLoader();
  page = 1;
  e.preventDefault();
  gallery.innerHTML = '';
  userQuery = userInput.value;

  try {
    const photos = await fetchPhotos();
    renderPhotos(photos);
    fetchPicturesForm.reset();
    hideLoader();
    showLoadMoreButton();

    if (photos.hits.length === 0) {
      iziToast.error({
        title: '',
        backgroundColor: '#EF4040',
        message:
          'Sorry, there are no images matching your search query. Please try again!',
      });

      // Прокрутка сторінки на дві висоти 
      const { height: cardHeight } = document
        .querySelector('.gallery')
        .firstElementChild.getBoundingClientRect();
      window.scrollBy({
        top: cardHeight * 2,
        behavior: 'smooth',
      });
    }
    if (shouldHideLoadMoreButton(gallery.children.length, photos.totalHits)) {
      hideLoadMoreButton();
    } else {
      showLoadMoreButton();
    }
  } catch (error) {
    console.log(error);
    hideLoadMoreButton();
  }
});

loadMoreBtn.addEventListener('click', async () => {
  showLoader();
  try {
    page += 1;
    const photos = await fetchPhotos();
    renderPhotos(photos);
    hideLoader();

    // Прокрутка сторінки на дві висоти карточки галереї
    const { height: cardHeight } = document
      .querySelector('.gallery')
      .firstElementChild.getBoundingClientRect();
    window.scrollBy({
      top: cardHeight * 2,
      behavior: 'smooth',
    });

    if (gallery.children.length >= photos.totalHits) {
      iziToast.warning({
        title: '',
        message:
        "We're sorry, but you've reached the end of search results.",
      });
      hideLoadMoreButton();
    }
  } catch (error) {
    console.log(error);
    hideLoader();
    hideLoadMoreButton();
  }
});
let lightbox;
let userQuery = '';

const options = {
  captions: true,
  captionSelector: 'img',
  captionType: 'attr',
  captionsData: 'alt',
  captionPosition: 'bottom',
  animation: 250,
};