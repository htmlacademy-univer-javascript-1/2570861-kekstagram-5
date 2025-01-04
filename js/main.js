import './data.js';
import './util.js';
import './thumbnail-creator.js';
import './input-form.js';
import { getData } from './api.js';
import { handleImageUpload } from './input-form.js';
const loadThumbnails = async () => {
  const alertSelector = '.alert_message';

  try {
    const photos = await getData();

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
