import { GetData, guard } from './getDataFromAPI';
import { onLoadActive } from './btnAnimated';

const form = document.querySelector('.search-form');
const gallery = document.querySelector('.gallery');
const loadBtn = document.querySelector('.load-more');

form.addEventListener('submit', onFormSubmit);
loadBtn.addEventListener('click', onLoadMore);

//observer options
const options = {
  root: null,
  rootMargin: '900px',
  threshold: 0,
};
const observer = new IntersectionObserver(onPagination, options);

const searchData = new GetData();

//on form submit
function onFormSubmit(evt) {
  evt.preventDefault();
  observer.unobserve(guard);
  searchData.onSeachClick += 1;
  searchData.numberOfCards = 0;
  loadBtn.classList.add('visually-hidden');
  clearGallery();
  searchData.query = evt.currentTarget.elements.searchQuery.value;
  searchData.resetPage();
  searchData.getResponse();
}

//infinite scroll
function onPagination(entries, observer) {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      searchData.getResponse();
    }
  });
}

//om load more btn click
function onLoadMore() {
  onLoadActive();
  searchData.getResponse();
}

//clear gallery
function clearGallery() {
  gallery.innerHTML = '';
}

export { gallery, loadBtn, observer };
