import { GetData } from './getDataFromAPI';
import { onLoadActive } from './btnAnimated';
const form = document.querySelector('.search-form');
const gallery = document.querySelector('.gallery');
const loadBtn = document.querySelector('.load-more');

form.addEventListener('submit', onFormSubmit);
loadBtn.addEventListener('click', onLoadMore);

const searchData = new GetData();

function onFormSubmit(evt) {
  evt.preventDefault();
  searchData.numberOfCards = 0;
  loadBtn.classList.add('visually-hidden');
  clearGallery();
  searchData.query = evt.currentTarget.elements.searchQuery.value;
  searchData.resetPage();
  searchData.getResponse();
}

function onLoadMore() {
  onLoadActive();
  searchData.getResponse();
}

function clearGallery() {
  gallery.innerHTML = '';
}

export { gallery, loadBtn };
