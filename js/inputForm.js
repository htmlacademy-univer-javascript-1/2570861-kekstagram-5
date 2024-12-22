const HASHTAGS_LIMIT = 5;
const CORRECT_SYMBOLS = /^#[a-zа-яё0-9]{1,19}$/i;

const ErrorText = {
  INVALID_COUNT: `Максимум ${HASHTAGS_LIMIT} хэштегов`,
  NOT_UNIQUE: 'Хэштеги должны быть уникальными',
  INVALID_PATTERN: 'Неправильный хэштег',
};

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

// Функция для изменения масштаба
const changeScale = (increment) => {
  const currentScaleValue = parseInt(scaleValue.value, 10);
  const newScaleValue = currentScaleValue + (increment ? 25 : -25);

  if (newScaleValue >= 25 && newScaleValue <= 100) {
    scaleValue.value = `${newScaleValue}%`;
    previewImage.style.transform = `scale(${newScaleValue / 100})`;
  }
};

// Добавление событий на кнопки изменения масштаба
const addEventToScale = () => {
  // Увеличение масштаба при клике на кнопку увеличения
  plusScaleButton.addEventListener('click', () => changeScale(true));

  // Уменьшение масштаба при клике на кнопку уменьшения
  minusScaleButton.addEventListener('click', () => changeScale(false));
};

// Удаление событий с кнопок изменения масштаба
const removeEventToScale = () => {
  plusScaleButton.removeEventListener('click', () => changeScale(true));
  minusScaleButton.removeEventListener('click', () => changeScale(false));
};


const pristine = new Pristine(uploadForm, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
});

// Нормализация строк хэштегов
const normalizeTags = (tagString) =>
  tagString.trim().split(' ').filter(Boolean);

// Проверка на правильность хэштегов
const hasValidTags = (value) =>
  normalizeTags(value).every((tag) => CORRECT_SYMBOLS.test(tag));

const hasValidCount = (value) =>
  normalizeTags(value).length <= HASHTAGS_LIMIT;

// Проверка на уникальность хэштегов
const hasUniqueTags = (value) => {
  const lowerCaseTags = normalizeTags(value).map((tag) => tag.toLowerCase());
  return lowerCaseTags.length === new Set(lowerCaseTags).size;
};

// Инициализация валидаторов с использованием pristine
pristine.addValidator(hashtagField, hasValidCount, ErrorText.INVALID_COUNT, 3, true);
pristine.addValidator(hashtagField, hasUniqueTags, ErrorText.NOT_UNIQUE, 1, true);
pristine.addValidator(hashtagField, hasValidTags, ErrorText.INVALID_PATTERN, 2, true);

const closeInput = () => {
  editingWindowElement.classList.add('hidden');
  document.body.classList.remove('modal-open');

  removeEventToScale();
};

const closeInputButton = () => {
  closeButton.addEventListener('click', (evt) => {
    evt.preventDefault();
    closeInput();
  });
};

const escCloseInput = () => {
  const onEscPress = (evt) => {
    if (evt.key === 'Escape') {
      closeInput();
      document.removeEventListener('keydown', onEscPress);
    }
  };
  document.addEventListener('keydown', onEscPress);
};

const openEditingWindow = () => {

  editingWindowElement.classList.remove('hidden');
  document.body.classList.add('modal-open');


  const file = inputPicture.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = () => {
      const previewElement = document.querySelector('.img-upload__preview img');
      previewElement.src = reader.result;
    };
    reader.readAsDataURL(file);
  }

  addEventToScale();

  closeInputButton();
  escCloseInput();
};


inputPicture.addEventListener('change', openEditingWindow);
