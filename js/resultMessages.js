

const documentBody = document.body;
const successMessageTemplate = document.querySelector('#success').content.querySelector('.success');
const errorMessageTemplate = document.querySelector('#error').content.querySelector('.error');

const removeMessage = () => {
  const activeMessage = document.querySelector('.success') || document.querySelector('.error');
  const closeButton = document.querySelector('.success__button') || document.querySelector('.error__button');
  document.removeEventListener('keydown', closeMessageByEscape);
  documentBody.removeEventListener('click', closeMessageByBodyClick);
  closeButton.removeEventListener('click', removeMessage);
  activeMessage.remove();
};

function closeMessageByEscape(evt) {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    removeMessage();
  }
}

function closeMessageByBodyClick(evt) {
  if (!(evt.target.closest('.success__inner') || evt.target.closest('.error__inner'))) {
    removeMessage();
  }
}

const displayMessage = (messageTemplate, closeButtonSelector) => {
  documentBody.append(messageTemplate);
  document.addEventListener('keydown', closeMessageByEscape);
  documentBody.addEventListener('click', closeMessageByBodyClick);
  documentBody.querySelector(closeButtonSelector).addEventListener('click', removeMessage);
};

const displaySuccessMessage = () => displayMessage(successMessageTemplate, '.success__button');

const displayErrorMessage = () => displayMessage(errorMessageTemplate, '.error__button');

export { displaySuccessMessage, displayErrorMessage };
