

const documentBody = document.body;
const successMessageTemplate = document.querySelector('#success').content.querySelector('.success');
const errorMessageTemplate = document.querySelector('#error').content.querySelector('.error');

const displayFormError = () => {
  const alertElement = document.createElement('div');
  alertElement.classList.add('load-error');
  alertElement.textContent = 'Не удалось отправить форму. Пожалуйста, исправьте неверные поля и повторите попытку.';
  document.body.appendChild(alertElement);

  setTimeout(() => {
    alertElement.remove();
  }, 5000);
};

const onMessageRemove = () => {
  const activeMessage = document.querySelector('.success') || document.querySelector('.error');
  const closeButton = document.querySelector('.success__button') || document.querySelector('.error__button');
  document.removeEventListener('keydown', onCloseMessageByEscape);
  documentBody.removeEventListener('click', onCloseMessageByBodyClick);
  closeButton.removeEventListener('click', onMessageRemove);
  activeMessage.remove();
};

function onCloseMessageByEscape(evt) {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    onMessageRemove();
  }
}

function onCloseMessageByBodyClick(evt) {
  if (!(evt.target.closest('.success__inner') || evt.target.closest('.error__inner'))) {
    onMessageRemove();
  }
}

const displayMessage = (messageTemplate, closeButtonSelector) => {
  documentBody.append(messageTemplate);
  document.addEventListener('keydown', onCloseMessageByEscape);
  documentBody.addEventListener('click', onCloseMessageByBodyClick);
  documentBody.querySelector(closeButtonSelector).addEventListener('click', onMessageRemove);
};

const displaySuccessMessage = () => displayMessage(successMessageTemplate, '.success__button');

const displayErrorMessage = () => displayMessage(errorMessageTemplate, '.error__button');

export { displaySuccessMessage, displayErrorMessage, displayFormError };
