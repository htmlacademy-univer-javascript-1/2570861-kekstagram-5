import {getPictures} from './data.js';
import {makeFullScreen} from './fullscreenPicture.js';

const thumbnailTemp = document.querySelector('#picture')
  .content
  .querySelector('a');
const picturesContainer = document.querySelector('.pictures');


const fragment = document.createDocumentFragment();
const createThumbnails = (photosData) => {

  photosData.forEach((photo) => {
    const newPicture = thumbnailTemp.cloneNode(true);
    newPicture.querySelector('.picture__img').src = photo.url;
    newPicture.querySelector('.picture__img').alt = photo.descriptions;
    newPicture.querySelector('.picture__likes').textContent = photo.likes;
    newPicture.querySelector('.picture__comments').textContent = photo.comments.length;

    fragment.appendChild(newPicture);
    const newPictureClick = (evt) => {
      evt.preventDefault();
      makeFullScreen(photo);
    };
    newPicture.addEventListener('click', newPictureClick);
  });

  picturesContainer.appendChild(fragment);
};

createThumbnails(getPictures());
