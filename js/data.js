import {getRandomInt, getRandomArrElement, createID} from './util.js';
const PICTURE_COUNT = 25;
const MIN_LIKES_COUNT = 15;
const MAX_LIKES_COUNT = 252;
const AVATAR_COUNT = 6;
const COMMENT_COUNT = 30;
const COMMENTS = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];
const DESCRIPTIONS = [
  'Волшебный момент прощания солнца с днем. #Вечер #Пейзаж',
  'Секретный рецепт, который покорил мое сердце! #Кулинария #Угощение',
  'Лучезарные дни и свежий морской бриз — идеальное сочетание! #Отпуск #Море',
  'Каждый цветок — это маленькое чудо природы. #Флора #Красота',
  'На пути к захватывающим приключениям! #АктивныйОтдых #Путешествие',
  'Утренний ритуал счастья с чашечкой кофе. #Утро #Напиток',
  'Творчество как способ самовыражения. #Художество #ТворческийПроцесс',
  'Любовь от пушистого друга радует сердце! #ДомашниеЖивотные #Радость'
];
const NAMES = ['Олег', 'Семен', 'Аджелла', 'Люба', 'Глеб', 'Иван', 'Эдуард'];


// Генерация уникального ID для комментариев
const generateCommentId = createID();

// Функция для создания случайного сообщения
const createMessage = () =>
  // Генерируем массив случайных элементов из COMMENTS длиной от 1 до 2
  Array.from(
    { length: getRandomInt(1, 2) },
    () => getRandomArrElement(COMMENTS)
  ).join(''); // Объединяем все элементы массива в одну строку


// Функция для создания объекта комментария
const createComment = () => ({
  id: generateCommentId(),
  avatar: `img/avatar-${getRandomInt(1, AVATAR_COUNT)}.svg`,
  message: createMessage(),
  name: getRandomArrElement(NAMES),
});

// Функция для создания объекта "картинка"
const createPicture = (index) => ({
  id: index,
  url: `photos/${index}.jpg`,
  descriptions: getRandomArrElement(DESCRIPTIONS),
  likes: getRandomInt(MIN_LIKES_COUNT, MAX_LIKES_COUNT),
  comments: Array.from({ length: getRandomInt(0, COMMENT_COUNT) }, createComment),
});

// Функция для получения массива картинок
const getPictures = () =>
  Array.from({ length: PICTURE_COUNT }, (_, index) => createPicture(index + 1));


export {
  generateCommentId
  , createMessage
  , createComment
  , createPicture
  , getPictures};
