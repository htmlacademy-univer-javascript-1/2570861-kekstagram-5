const sliderValueElement = document.querySelector('.effect-level__value');
const sliderContainer = document.querySelector('.img-upload__effect-level');
const imagePreview = document.querySelector('.img-upload__preview img');
const effectsList = document.querySelector('.effects');
const slider = document.querySelector('.effect-level__slider');

const FilterTypes = {
  NONE: 'none',
  GRAYSCALE: 'chrome',
  SEPIA: 'sepia',
  INVERT: 'marvin',
  BLUR: 'phobos',
  BRIGHTNESS: 'heat',
};

const FilterSettings = {
  [FilterTypes.GRAYSCALE]: { property: 'grayscale', unit: '' },
  [FilterTypes.SEPIA]: { property: 'sepia', unit: '' },
  [FilterTypes.INVERT]: { property: 'invert', unit: '%' },
  [FilterTypes.BLUR]: { property: 'blur', unit: 'px' },
  [FilterTypes.BRIGHTNESS]: { property: 'brightness', unit: '' },
};

const SliderOptions = {
  [FilterTypes.NONE]: { min: 0, max: 100, step: 1 },
  [FilterTypes.GRAYSCALE]: { min: 0, max: 1, step: 0.1 },
  [FilterTypes.SEPIA]: { min: 0, max: 1, step: 0.1 },
  [FilterTypes.INVERT]: { min: 0, max: 100, step: 1 },
  [FilterTypes.BLUR]: { min: 0, max: 3, step: 0.1 },
  [FilterTypes.BRIGHTNESS]: { min: 1, max: 3, step: 0.1 },
};

let currentFilter = FilterTypes.NONE;

function initializeSlider({ min, max, step }) {
  noUiSlider.create(slider, {
    range: { min, max },
    start: max,
    step,
    connect: 'lower',
  });
  slider.noUiSlider.on('update', updateSliderValue);
}

function updateSliderValue() {
  sliderValueElement.value = slider.noUiSlider.get();
  applyFilter();
}

function updateSliderOptions() {
  if (slider.noUiSlider) {
    const { min, max, step } = SliderOptions[currentFilter];
    slider.noUiSlider.updateOptions({
      range: { min, max },
      start: max,
      step,
    });
  }
}

function applyFilter() {
  if (currentFilter === FilterTypes.NONE) {
    imagePreview.style.filter = '';
    return;
  }

  const { property, unit } = FilterSettings[currentFilter];
  imagePreview.style.filter = `${property}(${sliderValueElement.value}${unit})`;
}

function toggleSliderVisibility(shouldShow) {
  sliderContainer.classList.toggle('hidden', !shouldShow);
}

function setFilter(filter) {
  currentFilter = filter;

  if (filter === FilterTypes.NONE) {
    toggleSliderVisibility(false);
    return;
  }

  toggleSliderVisibility(true);

  if (!slider.noUiSlider) {
    initializeSlider(SliderOptions[filter]);
  } else {
    updateSliderOptions();
  }
}

function resetEffects() {
  setFilter(FilterTypes.NONE);
}

function onFilterChange(event) {
  setFilter(event.target.value);
}

function initializeEffects() {
  effectsList.addEventListener('change', onFilterChange);
  toggleSliderVisibility(false);
}

export { initializeEffects, resetEffects };
