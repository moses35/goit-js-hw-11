//create markup
function createMarkup(data) {
  return data
    .map(
      ({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) => {
        return `<div class="photo-card">
         <a class="gallery__link" href="${largeImageURL}">
  <img src="${
    webformatURL
      ? webformatURL
      : `https://site.cndl.org.br/wp-content/uploads/404.jpg`
  }" alt="${tags}" loading="lazy" />
  </a>
  <div class="info">
    <p class="info-item">
    <b>Likes</b>
      ${likes || 'Not found'}
    </p>
    <p class="info-item">
    <b>Views</b>
      ${views || 'Not found'}
    </p>
    <p class="info-item">
    <b>Comments</b>
      ${comments || 'Not found'}
    </p>
    <p class="info-item">
    <b>Downloads</b>
      ${downloads || 'Not found'}
    </p>
  </div>
</div>`;
      }
    )
    .join('');
}

export { createMarkup };
