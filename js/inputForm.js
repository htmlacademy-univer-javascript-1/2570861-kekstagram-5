
const uploadForm = document.querySelector('.img-upload__form');
const loadImgElement = uploadForm.querySelector('.img-upload__input');
const editingWindowElement = uploadForm.querySelector('.img-upload__overlay');
const closeElement = editingWindowElement.querySelector('.img-upload__cancel');


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
loadImgElement.addEventListener('change', openEditingWindow);
