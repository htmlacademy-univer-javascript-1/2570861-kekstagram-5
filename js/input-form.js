import { sendData } from './api.js';
import { initializeEffects, resetEffects } from './picture-effects.js';
import { displaySuccessMessage, displayErrorMessage } from './result-messages.js';
import { displayFilteredPhotos } from './thubnails-filter.js';


const HASHTAGS_LIMIT = 5;
const CORRECT_SYMBOLS = /^#[a-zа-яё0-9]{1,19}$/i;
const ErrorText = {
  INVALID_COUNT: `Максимум ${HASHTAGS_LIMIT} хэштегов`,
  NOT_UNIQUE: 'Хэштеги должны быть уникальными',
  INVALID_PATTERN: 'Неправильный хэштег',
};

const body = document.querySelector('body');
const uploadForm = document.querySelector('.img-upload__form');
const previewImage = document.querySelector('.img-upload__preview img');
const inputPicture = uploadForm.querySelector('.img-upload__input');
const editingWindowElement = uploadForm.querySelector('.img-upload__overlay');
const closeButton = editingWindowElement.querySelector('.img-upload__cancel');
const hashtagField = uploadForm.querySelector('.text__hashtags');
const inputScale = document.querySelector('.img-upload__scale');
const scaleValue = inputScale.querySelector('.scale__control--value');
const minusScaleButton = document.querySelector('.scale__control--smaller');
const plusScaleButton = document.querySelector('.scale__control--bigger');
const submit = uploadForm.querySelector('.img-upload__submit');
const effectsPrev = uploadForm.querySelectorAll('.effects__preview');

const changeScale = (increment) => {
  const currentScaleValue = parseInt(scaleValue.value, 10);
  const newScaleValue = currentScaleValue + (increment ? 25 : -25);

  if (newScaleValue >= 25 && newScaleValue <= 100) {
    scaleValue.value = `${newScaleValue}%`;
    previewImage.style.transform = `scale(${newScaleValue / 100})`;
  }
};

const addEventToScale = () => {
  plusScaleButton.addEventListener('click', () => changeScale(true));
  minusScaleButton.addEventListener('click', () => changeScale(false));
};

const removeEventToScale = () => {
  plusScaleButton.removeEventListener('click', () => changeScale(true));
  minusScaleButton.removeEventListener('click', () => changeScale(false));
};

const resetImageScale = () => changeScale(100);

const pristine = new Pristine(uploadForm, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__field-wrapper--error',
});

const normalizeTags = (tagString) =>
  tagString.trim().split(' ').filter(Boolean);

const hasValidTags = (value) =>
  normalizeTags(value).every((tag) => CORRECT_SYMBOLS.test(tag));

const hasValidCount = (value) =>
  normalizeTags(value).length <= HASHTAGS_LIMIT;

const hasUniqueTags = (value) => {
  const lowerCaseTags = normalizeTags(value).map((tag) => tag.toLowerCase());
  return lowerCaseTags.length === new Set(lowerCaseTags).size;
};

pristine.addValidator(hashtagField, hasValidCount, ErrorText.INVALID_COUNT, 3, true);
pristine.addValidator(hashtagField, hasUniqueTags, ErrorText.NOT_UNIQUE, 1, true);
pristine.addValidator(hashtagField, hasValidTags, ErrorText.INVALID_PATTERN, 2, true);

const closeInput = () => {
  uploadForm.reset();
  resetImageScale();
  resetEffects();
  pristine.reset();
  editingWindowElement.classList.add('hidden');
  document.body.classList.remove('modal-open');
  // eslint-disable-next-line no-use-before-define
  document.removeEventListener('keydown', escCloseInput);
  // eslint-disable-next-line no-use-before-define
  document.removeEventListener('click', closeInputButton);
  removeEventToScale();
};

const closeInputButton = () => {
  closeButton.addEventListener('click', (evt) => {
    evt.preventDefault();
    closeInput();
    uploadForm.removeEventListener('submit', onFormSubmit); // eslint-disable-line

  });
};

const escCloseInput = () => {
  const onEscPress = (evt) => {
    if (evt.key === 'Escape') {
      closeInput();
      document.removeEventListener('keydown', onEscPress);
      uploadForm.removeEventListener('submit', onFormSubmit); // eslint-disable-line
    }
  };
  document.addEventListener('keydown', onEscPress);
};

const onOpenEditingWindow = (evt) => {
  // eslint-disable-next-line no-use-before-define
  uploadForm.addEventListener('submit', onFormSubmit);
  const file = evt.target.files[0];
  if (file) {
    const imageURL = URL.createObjectURL(file);
    previewImage.src = imageURL;
    effectsPrev.forEach((element) => {
      element.style.backgroundImage = `url('${imageURL}')`;
    });
    editingWindowElement.classList.remove('hidden');
    body.classList.add('modal-open');
    closeInputButton();
    escCloseInput();
    addEventToScale();
  }
};

const onFormSubmit = async (evt) => {
  evt.preventDefault();

  if (!pristine.validate()) {
    displayErrorMessage();
    return;
  }

  submit.disabled = true;

  try {
    await sendData(new FormData(uploadForm));
    displaySuccessMessage();
    closeInput();
  } catch (error) {
    displayErrorMessage();
  } finally {
    submit.disabled = false;
  }
};


inputPicture.addEventListener('change', onOpenEditingWindow);
initializeEffects();

export const handleImageUpload = (photos) => {

  uploadForm.addEventListener('submit', async (evt) => {
    evt.preventDefault();

    await sendData(new FormData(uploadForm));
    displayFilteredPhotos(photos);

  });
};

