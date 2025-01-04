const body = document.body;
const bigPicture = document.querySelector('.big-picture');
const bigPictureImg = bigPicture.querySelector('.big-picture__img img');
const pictureLikes = bigPicture.querySelector('.likes-count');
const pictureDescription = bigPicture.querySelector('.social__caption');
const pictureCommentsCount = bigPicture.querySelector('.comments-count');
const commContainer = bigPicture.querySelector('.social__comments');
const commContainerCount = bigPicture.querySelector('.social__comment-count');
const commLoader = bigPicture.querySelector('.comments-loader');
const cancelButton = document.querySelector('.big-picture__cancel');

let displayedComments = [];
let commentsShown = 0;
const COMMENTS_LIMIT = 5;

const closePicture = () => {
  bigPicture.classList.add('hidden');
  body.classList.remove('modal-open');
};

const closeFullScreen = function() {
  cancelButton.addEventListener('click', (evt) => {
    evt.preventDefault();
    closePicture();
  });
};

const escClosePicture = function() {
  document.addEventListener('keydown', (evt) => {
    if (evt.key === 'Escape') {
      closePicture();
    }
  });
};


const renderComments = (comments) => {
  const fragment = document.createDocumentFragment();
  comments.forEach((comment) => {
    const newComm = document.createElement('li');
    newComm.classList.add('social__comment');
    const imgElement = document.createElement('img');
    imgElement.classList.add('social__picture');
    imgElement.src = comment.avatar;
    imgElement.alt = comment.name;
    imgElement.width = 35;
    imgElement.height = 35;
    const newCommText = document.createElement('p');
    newCommText.classList.add('social__text');
    newCommText.textContent = comment.message;
    newComm.appendChild(imgElement);
    newComm.appendChild(newCommText);
    fragment.appendChild(newComm);
  });
  commContainer.innerHTML = '';
  commContainer.appendChild(fragment);
};


const updateCommentCount = () => {
  commContainerCount.textContent = `${commentsShown} из ${displayedComments.length}`;
};
const loadMoreComments = () => {
  const endIndex = Math.min(commentsShown + COMMENTS_LIMIT, displayedComments.length);
  const newComments = displayedComments.slice(commentsShown, endIndex);
  renderComments(newComments);
  commentsShown = endIndex;
  updateCommentCount();
  if (commentsShown >= displayedComments.length) {
    commLoader.classList.add('hidden');
  }
};

commLoader.addEventListener('click', (evt) => {
  evt.preventDefault();
  loadMoreComments();
});

const makeFullScreen = function(picture){
  bigPicture.classList.remove('hidden');
  body.classList.add('modal-open');

  bigPictureImg.src = picture.url;
  bigPictureImg.alt = picture.description;
  pictureLikes.textContent = picture.likes;
  pictureDescription.textContent = picture.description;
  pictureCommentsCount.textContent = picture.comments.length;
  displayedComments = picture.comments || [];
  commentsShown = 0;
  commContainer.innerHTML = '';
  loadMoreComments();
  commContainerCount.classList.remove('hidden');
  if (displayedComments.length > COMMENTS_LIMIT) {
    commLoader.classList.remove('hidden');
  } else {
    commLoader.classList.add('hidden');
  }

  closeFullScreen();
  escClosePicture();
};

export{makeFullScreen};
