let pageBody = document.querySelector('.page-body');
let sliderTogglesButtons = document.querySelectorAll('.slider-toggles-button');

sliderTogglesButtons.forEach(function(elem, i) {
  elem.addEventListener('click', function(evt) {
    evt.preventDefault();
    let sliderScreenName = this.dataset.slider;
    let sliderScreen = document.querySelector('.' + sliderScreenName);
    document.querySelector('.slide-visible').classList.remove('slide-visible');
    sliderScreen.classList.add('slide-visible');

    document.querySelector('.slider-toggles-active').classList.remove('slider-toggles-active');
    this.classList.add('slider-toggles-active');

    pageBody.classList.remove('green-theme');
    pageBody.classList.remove('blue-theme');
    pageBody.classList.remove('brown-theme');

    let listThemes = {
      first: 'green-theme',
      second: 'blue-theme',
      third: 'brown-theme'
    };
    pageBody.classList.add(listThemes[sliderScreenName]);
  });
});

const feedbackButton = document.querySelector('.contacts-button');
const feedbackPopup = document.querySelector('.modal');
const feedbackClose = feedbackPopup.querySelector('.modal-close');
const feedbackForm = feedbackPopup.querySelector('.modal-form');
const feedbackName = feedbackPopup.querySelector('.modal-input-name');
const feedbackEmail = feedbackPopup.querySelector('.modal-input-email');
const feedbackText = feedbackPopup.querySelector('.modal-feedback-textarea');
const feedbackOverlay = document.querySelector('.modal-wrapper');

let isStorageSupport = true;
let storageName = '';
let storageEmail = '';

try {
  storageName = localStorage.getItem('name');
  storageEmail = localStorage.getItem('email');
} catch (err) {
  isStorageSupport = false;
}

feedbackButton.addEventListener('click', function (evt) {
  evt.preventDefault();
  feedbackPopup.classList.add('modal-show');
  feedbackOverlay.classList.add('modal-overlay');

  if (storageName && storageEmail) {
    feedbackName.value = storageName;
    feedbackEmail.value = storageEmail;
    feedbackText.focus();
  } else {
    feedbackName.focus();
  }
});

feedbackClose.addEventListener('click', function (evt) {
  evt.preventDefault();
  feedbackPopup.classList.remove('modal-show');
  feedbackPopup.classList.remove('modal-error');
  feedbackOverlay.classList.remove('modal-overlay');
});

feedbackForm.addEventListener('submit', function (evt) {
  if (!feedbackName.value || !feedbackEmail.value || !feedbackText.value) {
    evt.preventDefault();
    feedbackPopup.classList.remove('modal-error');
    feedbackPopup.offsetWidth = feedbackPopup.offsetWidth;
    feedbackPopup.classList.add('modal-error');
  } else {
    if (isStorageSupport) {
      localStorage.setItem('name', feedbackName.value);
      localStorage.setItem('email', feedbackEmail.value);
    }
  }
});

window.addEventListener('keydown', function (evt) {
  if (evt.keyCode === 27) {
    if (feedbackPopup.classList.contains('modal-show')) {
      evt.preventDefault();
      feedbackPopup.classList.remove('modal-show');
      feedbackOverlay.classList.remove('modal-overlay');
      feedbackPopup.classList.remove('modal-error');
    }
  }
});
