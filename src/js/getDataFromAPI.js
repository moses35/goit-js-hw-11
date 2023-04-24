import axios from 'axios';
import Notiflix from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

import { createMarkup } from './createCards';
import { gallery, loadBtn } from './index';
import { onLoadStop } from './btnAnimated';

const url = `https://pixabay.com/api/`;

class GetData {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
    this.numberOfCards = 0;
    this.totalHits = 0;
    this.onSeachClick = 0;
  }
  //get data
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

      //if result not found
      if (response.data.hits.length === 0 || this.searchQuery === '') {
        this.onSeachClick = 0;
        throw new Error();
      } else {
        //create gallery
        const markup = createMarkup(response.data.hits);
        gallery.insertAdjacentHTML('beforeend', markup);

        //after gallery create
        lightbox.refresh();
        this.page += 1;
        this.numberOfCards += 40;
        loadBtn.classList.remove('visually-hidden');
        onLoadStop();

        //show total hits
        this.totalHits = response.data.totalHits;
        if (this.onSeachClick === 1) {
          Notiflix.Notify.info(`Hooray! We found ${this.totalHits} images.`);
          this.onSeachClick = 0;
        } else {
          //auto scroll after response
          const { height: cardHeight } = document
            .querySelector('.gallery')
            .firstElementChild.getBoundingClientRect();
          window.scrollBy({
            top: cardHeight * 2.5,
            behavior: 'smooth',
          });
        }

        //end of search results
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

  //save query
  set query(newQuery) {
    this.searchQuery = newQuery;
  }
}

//add big picture
let lightbox = new SimpleLightbox('.gallery a', {
  /* options */
  captionDelay: 250,
});
export { GetData };
