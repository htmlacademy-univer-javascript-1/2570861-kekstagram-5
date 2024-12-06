/* eslint-disable no-unused-vars */
import {getPictures} from './data.js';
import {getRandomInt, getRandomArrElement, createID} from './util.js';
import { createThumbnails } from './thumbnailCreator.js';

createThumbnails(getPictures());
