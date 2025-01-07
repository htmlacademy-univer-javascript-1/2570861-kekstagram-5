import './data.js';
import './util.js';
import './thumbnail-creator.js';
import './input-form.js';
import { getData } from './api.js';
import { handleImageUpload } from './input-form.js';
import { displayFilteredPhotos } from './thubnails-filter.js';

const loadThumbnails = async () => {
  const alertSelector = '.alert_message';

  try {
    // Загружаем фотографии
    const photos = await getData();

    // Отображаем фотографии сразу
    displayFilteredPhotos(photos);

    // Инициализируем обработчик загрузки изображений
    handleImageUpload(photos);
  } catch (err) {
    let alertMessage = document.querySelector(alertSelector);

    if (!alertMessage) {
      const alertTemplate = document.querySelector('#alert').content.cloneNode(true);
      alertMessage = alertTemplate.querySelector('.alert_message');
      document.body.append(alertTemplate);
    }

    alertMessage.textContent = `Error loading thumbnails: ${err.message}`;
  }
};

loadThumbnails();
