import { getRandomArrElement, debounce } from './util.js';
import { createThumbnails } from './thumbnailCreator.js';

const MAX_THUMBNAIL_COUNT = 10;
const ACTIVE_BUTTON_CLASS = 'img-filters__button--active';

export const filterContainer = document.querySelector('.img-filters');
const defaultButton = document.querySelector('#filter-default');
const randomButton = document.querySelector('#filter-random');
const discussedButton = document.querySelector('#filter-discussed');

const fetchRandomThumbnails = (photos, count) => getRandomArrElement(photos, count);

const compareByComments = (photoA, photoB) => photoB.comments.length - photoA.comments.length;

const fetchDiscussedThumbnails = (photos) => photos.slice().sort(compareByComments);

const clearThumbnails = () => {
  document.querySelectorAll('.picture').forEach((thumbnail) => thumbnail.remove());
};

const updateThumbnails = (photos, button) => {
  clearThumbnails();
  const activeButton = document.querySelector(`.${ACTIVE_BUTTON_CLASS}`);
  if (activeButton) {
    activeButton.classList.remove(ACTIVE_BUTTON_CLASS);
  }
  createThumbnails(photos);
  button.classList.add(ACTIVE_BUTTON_CLASS);
};

export const displayFilteredPhotos = (photos) => {
  createThumbnails(photos);

  filterContainer.classList.remove('img-filters--inactive');

  defaultButton.addEventListener('click', debounce(() => {
    updateThumbnails(photos, defaultButton);
  }));

  randomButton.addEventListener('click', debounce(() => {
    updateThumbnails(fetchRandomThumbnails(photos, MAX_THUMBNAIL_COUNT), randomButton);
  }));

  discussedButton.addEventListener('click', debounce(() => {
    updateThumbnails(fetchDiscussedThumbnails(photos), discussedButton);
  }));
};

