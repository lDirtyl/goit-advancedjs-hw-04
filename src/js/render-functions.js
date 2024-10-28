export function renderGalleryCardTemplate(imagesObj) {
  const markup = imagesObj
    .map(image => {
      const {
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      } = image;

      return `
        <li class="gallery-card">
          <a class="img-link" href="${largeImageURL}">
            <div class="image-thumb">
              <img class = "gallery-image" src="${webformatURL}" data-source=${largeImageURL} alt="${tags}" loading="lazy" />
            </div>
            <div class="info">
              <p class="info-item">
                <b>Likes</b> ${likes}
              </p>
              <p class="info-item">
                <b>Views</b> ${views}
              </p>
              <p class="info-item">
                <b>Comments</b> ${comments}
              </p>
              <p class="info-item">
                <b>Downloads</b> ${downloads}
              </p>
          </div>
          </a>
        </li>
      `;
    })
    .join('');
  return markup;
}
