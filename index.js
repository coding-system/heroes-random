import { getRandomElement, resetHeroes } from "./scripts/random.js";
import { initialHeroes } from "./scripts/heroes.js";
// import { renderHeroes } from "./scripts/dialog.js";
import { renderPortraits } from "./scripts/portraits.js";
import { showHeroes, renderDefaultHeroesList } from "./scripts/rolling.js";
import {
   initializePopups,
   openPopup,
   closePopup,
   handleEscKey,
} from "./scripts/modal.js";

import {updateRange} from './scripts/golast.js'
import { lastHeroes } from "./scripts/lastheroes.js";

// Create a deep copy of initialHeroes to work with
const startHeroes = JSON.parse(JSON.stringify(initialHeroes));
// let startHeroes;

// Help
const helpBox = document.querySelector(".help");

// Other
const songChanger = document.querySelector(".song-changer-checkbox");
const rouletteSong = document.querySelector(".song");

// Roulette
const box = document.querySelector(".box");
const roulette = document.querySelector(".roulette");
const windowList = document.querySelector(".window__list");

// Last heroes
const lastHeroesList = document.querySelector(".last-heroes__list");

// Templstes
// const cardHeroTemplate = document.querySelector("#card-hero-template").content;
const cardPortraitTemplate = document.querySelector("#card-portrait-template").content;
const lastHeroTemplate = document.querySelector(
   "#last-heroes-template"
).content;
const windowHeroTemplate = document.querySelector(
   "#window-hero-template"
).content;
const logsTemplate = document.querySelector("#logs-data");
// Popup Loading
const loadingPopup = document.querySelector('.popup__loading')
// Heroes list Popup
const heroesList = document.querySelector(".popup__heroes-list");
const heroesListBox = document.querySelector(".heroes-list__box");
const heroesListGroup = document.querySelector(".heroes-list__group");
// const heroesListButton = document.querySelector(".heroes-list-button");

// Portraits list Popup
const portraitsList = document.querySelector(".popup__portraits-list");
const portraitsListBox = document.querySelector(".portraits-list__box");
const portraitsListGroup = document.querySelector(".portraits-list__group");
const portraitsListButton = document.querySelector(".portraits-list-button");

// Show hero Popup
const showHeroBox = document.querySelector(".popup__show-hero");
const showHeroButton = document.querySelector(".show-hero-button");
const showHerocloseButton = showHeroBox.querySelector(".close__button");
// const showHeroAcceptButton = showHeroBox.querySelector(".button-accept");
const showHeroRertyButton = showHeroBox.querySelector(".button-retry");

// Whats new Popup
const whatsNewPopup = document.querySelector(".popup__whats-new");
const whatsNewButton = document.querySelector(".whats-new-button");

// Confirm Popup
const resetConfirm = document.querySelector(".popup__confirm");
const resetAccept = resetConfirm.querySelector(".confirm__accept");
const resetCancel = resetConfirm.querySelector(".confirm__cancel");

// Go last Popup
const goLastPopup = document.querySelector('.popup__go-last')
const goLastButton = document.querySelector('.go-last-button')


// Группы атрибутов
const strengthList = document.querySelector("#heroes-strength");
const agilityList = document.querySelector("#heroes-agility");
const intelligenceList = document.querySelector("#heroes-intelligence");
const universalList = document.querySelector("#heroes-universal");
//
const portraitsstrengthList = document.querySelector("#portraits-strength");
const portraitsagilityList = document.querySelector("#portraits-agility");
const portraitsintelligenceList = document.querySelector("#portraits-intelligence");
const portraitsuniversalList = document.querySelector("#portraits-universal");

// Кнопки
const chooseButton = document.querySelector(".choose-button");
const resetButton = document.querySelector(".reset-button");

const heroАlgorithmChanger = document.querySelector(".changer-checkbox");

// Обработчики
chooseButton.addEventListener("click", () => getRandomElement(startHeroes));
// confirmAccept.addEventListener("click", () => resetHeroes(startHeroes));
// confirmCancel.addEventListener("click", () => resetHeroes(startHeroes));
showHeroRertyButton.addEventListener("click", function () {
   showHeroBox.classList.remove("popup_is-opened");
   getRandomElement(startHeroes);
});
// showHeroAcceptButton.addEventListener("click", () => {
//    closePopup(showHeroBox);
// });

// Обработчики открытия попапов
// heroesListButton.addEventListener("click", () => {
//    openPopup(heroesList);
// });

portraitsListButton.addEventListener('click', () => {
   openPopup(portraitsList)
})
showHeroButton.addEventListener("click", () => {
   openPopup(showHeroBox);
});

whatsNewButton.addEventListener('click', () => {
   openPopup(whatsNewPopup)
})
goLastButton.addEventListener('click', () => {
   openPopup(goLastPopup)
})
resetButton.addEventListener("click", () => {
   openPopup(resetConfirm);
});
resetAccept.addEventListener("click", () => {
   resetHeroes(startHeroes);
   closePopup(resetConfirm);
});
resetCancel.addEventListener("click", () => {
   closePopup(resetConfirm);
});

// Render the heroes using startHeroes
// renderHeroes(startHeroes);
// Инициализация попапов
initializePopups(closePopup);
function preloadImages(imagesArray) {
   console.time('preloadImages'); // Начало отсчета времени выполнения
   imagesArray.forEach((imageObj) => {
      const img = new Image();
      img.src = `./assets/heroes/${imageObj.image}`;
   });
   console.log('Картинки героев загружены');
   console.timeEnd('preloadImages'); // Конец отсчета времени выполнения и вывод результата в консоль
}

function preloadVideos(heroesArray) {
   console.time('preloadVideos'); // Начало отсчета времени выполнения

   heroesArray.forEach((heroObj) => {
      const videoSrc = heroObj.image.replace('.jpg', '.webm');
      const video = document.createElement('video');
      video.src = `./assets/heroes/portraits/npc_dota_hero_${videoSrc}`;
   });
   console.log('Портреты героев загружены');
   console.timeEnd('preloadVideos'); // Конец отсчета времени выполнения и вывод результата в консоль
}

function preloadPictures(imagesArray) {
   console.time('preloadPictures'); // Начало отсчета времени выполнения
   imagesArray.forEach((imageObj) => {
      const imageSrc = imageObj.image.replace('.jpg', '');
      const img = new Image();
      img.src = `./assets/heroes/pictures/npc_dota_hero_${imageSrc}.jpg`;
   });
   console.log('Картинки героев загружены');
   console.timeEnd('preloadImages'); // Конец отсчета времени выполнения и вывод результата в консоль
}


function preloadAll() {
   preloadImages(startHeroes);
   preloadVideos(startHeroes);
   preloadPictures(startHeroes)
}

// preloadAll()
// renderDefaultHeroesList(startHeroes);
// renderPortraits(startHeroes);
updateRange();

/////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////

const promises = [
   preloadAll(), // Асинхронная функция загрузки
   renderDefaultHeroesList(startHeroes), // Рендер списка героев
   renderPortraits(startHeroes) // Рендер портретов героев
 ];
 
 Promise.all(promises)
   .then(() => {
     // Когда все промисы выполнены, убираем стиль загрузки
     setTimeout(() => {
       loadingPopup.classList.remove('popup_is-opened');
     }, 300);
   })
   .catch((error) => {
     console.error('Ошибка во время выполнения промисов:', error);
   });


/////////////////////////////////////////////////////////////
////////////////////  LOCAL STOREGE  ////////////////////////
/////////////////////////////////////////////////////////////
// Функция для сохранения выбранного индекса в localStorage
function saveChosenIndexToLocalStorage(heroName) {
   localStorage.setItem('chosenHeroName', heroName);
}

// Функция для загрузки выбранного индекса из localStorage
function loadChosenIndexFromLocalStorage() {
   const savedHeroName = localStorage.getItem('chosenHeroName');
   if (savedHeroName !== null) {
      console.log(`Последний выбранный герой — ${savedHeroName}`);
   } else {
      console.log("Нет сохраненного имени героя.");
   }
}

function saveLastHeroesToLocalStorage() {
   // Преобразуем массив lastHeroes в строку
   const lastHeroesString = JSON.stringify(lastHeroes);
   
   // Сохраняем строку в localStorage
   localStorage.setItem('lastHeroes', lastHeroesString);
}

function loadLastHeroesFromLocalStorage() {
   // Получаем строку из localStorage
   const lastHeroesString = localStorage.getItem('lastHeroes');
   
   // Проверяем, есть ли данные в localStorage
   if (lastHeroesString) {
      // Преобразуем строку обратно в массив
      const loadedHeroes = JSON.parse(lastHeroesString);
      
      // Очищаем массив и добавляем элементы из загруженного массива
      lastHeroes.length = 0; // Очищаем массив
      lastHeroes.push(...loadedHeroes); // Добавляем новые данные
      
      // Выводим загруженный массив в консоль
      console.log("Сохраненные последние герои", lastHeroes);
   } else {
      // Если данных нет, выводим сообщение в консоль
      console.log("Нет сохраненных последних героев");
   }
}


// При загрузке страницы выводим сохраненный индекс героя
loadChosenIndexFromLocalStorage();
loadLastHeroesFromLocalStorage()

export {
   portraitsList,
   portraitsListBox,
   portraitsListGroup,
   chooseButton,
   resetButton,
   heroАlgorithmChanger,
   heroesList,
   heroesListBox,
   heroesListGroup,
   cardPortraitTemplate,
   strengthList,
   agilityList,
   intelligenceList,
   universalList,
   portraitsstrengthList,
   portraitsagilityList,
   portraitsintelligenceList,
   portraitsuniversalList,
   resetConfirm,
   resetAccept,
   resetCancel,
   windowList,
   windowHeroTemplate,
   lastHeroesList,
   lastHeroTemplate,
   showHeroBox,
   showHeroRertyButton,
   startHeroes,
   helpBox,
   songChanger,
   rouletteSong,
   roulette,
   box,
   loadingPopup,
   saveChosenIndexToLocalStorage,
   saveLastHeroesToLocalStorage
};
