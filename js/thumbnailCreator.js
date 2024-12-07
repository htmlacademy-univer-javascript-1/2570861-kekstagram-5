const createThumbnails = () => {
  const photosData = [];
  const thumbnailTemp = document.querySelector('#picture')
    .content
    .querySelector('a');
  const picturesContainer = document.querySelector('.pictures');
  const fragment = document.createDocumentFragment();

  photosData.forEach((photo) => {
    const newPicture = thumbnailTemp.cloneNode(true);
    newPicture.querySelector('.picture__img').src = photo.url;
    newPicture.querySelector('.picture__img').alt = photo.description;
    newPicture.querySelector('.picture__likes').textContent = photo.likes;
    newPicture.querySelector('.picture__comments').textContent = photo.comments.length;

    fragment.appendChild(newPicture);
  });

  picturesContainer.appendChild(fragment);
};


export { createThumbnails};
