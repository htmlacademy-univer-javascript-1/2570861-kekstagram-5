const MAX_HASHTAGS_COUNT = 5;
const VALID_SYMBOLS = /^#[a-zа-яё0-9]{1,19}$/i;
const ErrorText = {
  INVALID_COUNT: `Максимум ${MAX_HASHTAGS_COUNT} хэштегов`,
  NOT_UNIQUE: 'Хэштеги должны быть уникальными',
  INVALID_PATTERN: 'Неправильный хэштег',
};

const uploadForm = document.querySelector('.img-upload__form');
const loadImgElement = uploadForm.querySelector('.img-upload__input');
const editingWindowElement = uploadForm.querySelector('.img-upload__overlay');
const closeElement = editingWindowElement.querySelector('.img-upload__cancel');
const hashtagField = uploadForm.querySelector('.text__hashtags');

const pristine = new Pristine(uploadForm, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
});

const closeInput = () => {
  editingWindowElement.classList.add('hidden');
  document.body.classList.remove('modal-open');

};

const closeInputButton = function() {
  closeElement.addEventListener('click', (evt) => {
    evt.preventDefault();
    closeInput();
    closeElement.removeEventListener('click',closeInputButton());
  });
};

const escCloseInput = function() {
  document.addEventListener('keydown', (evt) => {
    if (evt.key === 'Escape') {
      closeInput();
      document.removeEventListener('keydown', escCloseInput());
    }
  });
};


const openEditingWindow = () => {
  const file = loadImgElement.files[0]; // Получаем первый выбранный файл
  const reader = new FileReader();

  reader.onload = () => {
    const previewElement = document.querySelector('.img-upload__preview img'); // Находим элемент img внутри div с классом img-upload__preview
    previewElement.src = reader.result; // Устанавливаем путь к картинке для отображения
  };

  if (file) {
    reader.readAsDataURL(file); // Читаем файл как Data URL
  }
  editingWindowElement.classList.remove('hidden');
  document.body.classList.add('modal-open');

  closeInputButton();
  escCloseInput();
};

const normalizeTags = (tagString) => tagString
  .trim()
  .split(' ')
  .filter((tag) => Boolean(tag.length));

const hasValidTags = (value) =>
  normalizeTags(value).every((tag) =>
    VALID_SYMBOLS.test(tag));

const hasValidCount = (value) =>
  normalizeTags(value).length <=
    MAX_HASHTAGS_COUNT;

const hasUniqueTags = (value) => {
  const lowerCaseTags = normalizeTags(value).map((tag) => tag.toLowerCase());
  return lowerCaseTags.length === new Set(lowerCaseTags).size;
};

pristine.addValidator(
  hashtagField,
  hasValidCount,
  ErrorText.INVALID_COUNT,
  3,
  true
);
pristine.addValidator(
  hashtagField,
  hasUniqueTags,
  ErrorText.NOT_UNIQUE,
  1,
  true
);
pristine.addValidator(
  hashtagField,
  hasValidTags,
  ErrorText.INVALID_PATTERN,
  2,
  true
);

loadImgElement.addEventListener('change', openEditingWindow);
