import axios from 'axios';
import Notiflix from 'notiflix';
import { createMarkup } from './createCards';
import { gallery, loadBtn } from './index';
import { onLoadStop } from './btnAnimated';

const url = `https://pixabay.com/api/`;

class GetData {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
    this.numberOfCards = 0;
  }
  async getResponse() {
    try {
      const response = await axios.get(url, {
        params: {
          key: '35693729-7199fec9e2a2b3b9c97a93780',
          q: this.searchQuery,
          image_type: 'photo',
          orientation: 'horizontal',
          safesearch: true,
          page: this.page,
          per_page: 40,
        },
      });

      if (response.data.hits.length === 0 || this.searchQuery === '') {
        throw new Error();
      } else {
        const markup = createMarkup(response.data.hits);
        gallery.insertAdjacentHTML('beforeend', markup);
        this.page += 1;
        this.numberOfCards += 40;
        loadBtn.classList.remove('visually-hidden');
        onLoadStop();

        if (this.numberOfCards >= response.data.totalHits) {
          Notiflix.Notify.failure(
            `We're sorry, but you've reached the end of search results.`
          );
          loadBtn.classList.add('visually-hidden');
        }
      }
    } catch (error) {
      Notiflix.Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.'
      );
    }
  }

  resetPage() {
    this.page = 1;
  }

  get query() {
    return this.searchQuery;
  }

  set query(newQuery) {
    this.searchQuery = newQuery;
  }
}

export { GetData };
