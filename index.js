import { getRandomElement, resetHeroes } from "./scripts/random.js";
import { initialHeroes } from "./scripts/heroes.js";
import { handleHeroClick, updateDelLabel } from "./scripts/rolling.js";
import { renderPortraits } from "./scripts/portraits.js";
import {
   showHeroes,
   renderDefaultHeroesList,
   updateOverlayVisibility,
} from "./scripts/rolling.js";
import {
   initializePopups,
   openPopup,
   closePopup,
   handleEscKey,
} from "./scripts/modal.js";

import { updateRange } from "./scripts/golast.js";
import { lastHeroes } from "./scripts/lastheroes.js";
import {
   acceptChosenHero,
   retryChosenHero,
   acceptAndDelChosenHero,
} from "./scripts/showhero.js";

// Create a deep copy of initialHeroes to work with
const startHeroes = JSON.parse(JSON.stringify(initialHeroes));
const currentLastHeroes = JSON.parse(JSON.stringify(lastHeroes));
let songChangerStatus;
let songVolumeData;
// let startHeroes;

// Help
const helpBox = document.querySelector(".help");

// Other
const songChanger = document.querySelector(".song-changer-checkbox");
const songVolume = document.querySelector(".song-changer-volume");
const rouletteSong = document.querySelector(".song");

// Roulette
const box = document.querySelector(".box");
const roulette = document.querySelector(".roulette");
const windowList = document.querySelector(".window__list");

// Last heroes
const lastHeroesList = document.querySelector(".last-heroes__list");

// Templstes
// const cardHeroTemplate = document.querySelector("#card-hero-template").content;
const cardPortraitTemplate = document.querySelector(
   "#card-portrait-template"
).content;
const lastHeroTemplate = document.querySelector(
   "#last-heroes-template"
).content;
const windowHeroTemplate = document.querySelector(
   "#window-hero-template"
).content;
const logsTemplate = document.querySelector("#logs-data");
// Popup Loading
const loadingPopup = document.querySelector(".popup__loading");
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
const showHeroBoxButtons = showHeroBox.querySelector(".buttons-bar");
const showHeroButton = document.querySelector(".show-hero-button");
const showHeroAcceptButton = showHeroBox.querySelector(".button-accept");
const showHeroRertyButton = showHeroBox.querySelector(".button-retry");
const showHeroAcceptAndDelButton = showHeroBox.querySelector(
   ".button-accept-and-del"
);

// Whats new Popup
const whatsNewPopup = document.querySelector(".popup__whats-new");
const whatsNewButton = document.querySelector(".whats-new-button");

// Update Popup
const UpdateButton = document.querySelector(".update__button");
const UpdatePopup = document.querySelector(".popup__update");


// Confirm Popup
const resetConfirm = document.querySelector(".popup__confirm");
const resetAccept = resetConfirm.querySelector(".confirm__accept");
const resetCancel = resetConfirm.querySelector(".confirm__cancel");

// Go last Popup
const goLastPopup = document.querySelector(".popup__go-last");
const goLastButton = document.querySelector(".go-last-button");

// Группы атрибутов
const strengthList = document.querySelector("#heroes-strength");
const agilityList = document.querySelector("#heroes-agility");
const intelligenceList = document.querySelector("#heroes-intelligence");
const universalList = document.querySelector("#heroes-universal");
//
const portraitsstrengthList = document.querySelector("#portraits-strength");
const portraitsagilityList = document.querySelector("#portraits-agility");
const portraitsintelligenceList = document.querySelector(
   "#portraits-intelligence"
);
const portraitsuniversalList = document.querySelector("#portraits-universal");

// Кнопки
const chooseButton = document.querySelector(".choose-button");
const btnTop = document.querySelector(".btn-top");
const btnBottom = document.querySelector(".btn-bottom");
const chooseButtonText = document.querySelector(".btn-top-text");
const resetButton = document.querySelector(".reset-button");

const heroАlgorithmChanger = document.querySelector(".changer-checkbox");
const heroAlgorithmInfo = document.querySelector(".remove-heroes__answer");

// if (heroАlgorithmChanger.checked) {
//    heroAlgorithmInfo.textContent = 'Герой будет удаляться из списка после каждого нажатия'; // Изменяем текст
// } else {
//    heroAlgorithmInfo.textContent = 'Список героев остается неизменным'; // Изменяем текст, если unchecked
// }

// Добавляем обработчик события на изменение состояния чекбокса
// heroАlgorithmChanger.addEventListener('change', () => {
//    if (heroАlgorithmChanger.checked) {
//       // Если чекбокс отмечен
//       heroAlgorithmInfo.textContent = 'Герой будет удаляться из списка после каждого нажатия';
//    } else {
//       // Если чекбокс не отмечен
//       heroAlgorithmInfo.textContent = 'Список героев остается неизменным';
//    }
// });

// Обработчики
chooseButton.addEventListener("click", () => getRandomElement(startHeroes));
// confirmAccept.addEventListener("click", () => resetHeroes(startHeroes));
// confirmCancel.addEventListener("click", () => resetHeroes(startHeroes));

showHeroAcceptButton.addEventListener("click", () => {
   acceptChosenHero();
});
showHeroRertyButton.addEventListener("click", () => {
   retryChosenHero();
});
showHeroAcceptAndDelButton.addEventListener("click", () => {
   acceptAndDelChosenHero();
});

// Обработчики открытия попапов
// heroesListButton.addEventListener("click", () => {
//    openPopup(heroesList);
// });

portraitsListButton.addEventListener("click", () => {
   openPopup(portraitsList);
});
showHeroButton.addEventListener("click", () => {
   openPopup(showHeroBox);
   showHeroBoxButtons.style.opacity = "0";
   showHeroBoxButtons.style.pointerEvents = "none";
});

whatsNewButton.addEventListener("click", () => {
   openPopup(whatsNewPopup);
});
UpdateButton.addEventListener("click", () => {
   openPopup(UpdatePopup);
});

goLastButton.addEventListener("click", () => {
   openPopup(goLastPopup);
});
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
   console.time("preloadImages"); // Начало отсчета времени выполнения
   imagesArray.forEach((imageObj) => {
      const img = new Image();
      img.src = `./assets/heroes/${imageObj.image}`;
   });
   console.log("Картинки героев загружены");
   console.timeEnd("preloadImages"); // Конец отсчета времени выполнения и вывод результата в консоль
}

function preloadVideos(heroesArray) {
   console.time("preloadVideos"); // Начало отсчета времени выполнения

   heroesArray.forEach((heroObj) => {
      const videoSrc = heroObj.image.replace(".jpg", ".webm");
      const video = document.createElement("video");
      video.src = `./assets/heroes/portraits/npc_dota_hero_${videoSrc}`;
   });
   console.log("Портреты героев загружены");
   console.timeEnd("preloadVideos"); // Конец отсчета времени выполнения и вывод результата в консоль
}

function preloadPictures(imagesArray) {
   console.time("preloadPictures"); // Начало отсчета времени выполнения
   imagesArray.forEach((imageObj) => {
      const imageSrc = imageObj.image.replace(".jpg", "");
      const img = new Image();
      img.src = `./assets/heroes/pictures/npc_dota_hero_${imageSrc}.jpg`;
   });
   console.log("Картинки героев загружены");
   console.timeEnd("preloadImages"); // Конец отсчета времени выполнения и вывод результата в консоль
}

function preloadAll() {
   preloadImages(startHeroes);
   preloadVideos(startHeroes);
   preloadPictures(startHeroes);
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
   loadChosenIndexFromLocalStorage(),
   loadStartHeroesFromLocalStorage(),
   loadLastHeroesFromLocalStorage(),
   renderLastHeroesFromLocalStorage(),
   renderPortraits(startHeroes),
];

Promise.all(promises)
   .then(() => {
      // Когда все промисы выполнены, убираем стиль загрузки
      setTimeout(() => {
         loadingPopup.classList.remove("popup_is-opened");
      }, 300);
   })
   .catch((error) => {
      console.error("Ошибка во время выполнения промисов:", error);
   });

/////////////////////////////////////////////////////////////
////////////////////  LOCAL STOREGE  ////////////////////////
/////////////////////////////////////////////////////////////
// Функция для сохранения выбранного индекса в localStorage

// Функция для сохранения громкости в локальное хранилище
function saveVolumeToLocalStorage(volume) {
   localStorage.setItem("songVolume", volume);
}

// Функция для загрузки громкости из локального хранилища
function loadVolumeFromLocalStorage() {
   const savedVolume = localStorage.getItem("songVolume");
   return savedVolume ? parseFloat(savedVolume) : 50; // Значение по умолчанию 50
}

// Set up event listener for the checkbox
songChanger.addEventListener("change", () => {
   if (songChanger.checked) {
      rouletteSong.volume = 0.5;
      songVolume.value = 50;
      updateHuy()
      // songChangerStatus = true;
      // songVolumeData = songVolume.value;
   } else {
      rouletteSong.volume = 0;
      songVolume.value = 0;
      updateHuy()
      // songChangerStatus = false;
      // songVolumeData = songVolume.value;
   }

   // Save the status
   saveSongChangerStatusToLocalStorage(songChangerStatus);
});

// Слушаем событие изменения значения ползунка
// Обработчик изменения значения ползунка
songVolume.addEventListener("input", function () {
   // Обновляем громкость песни
   rouletteSong.volume = songVolume.value / 100;

   // Обновляем статус чекбокса
   songChanger.checked = rouletteSong.volume > 0;

   // Сохраняем громкость в локальное хранилище
   saveVolumeToLocalStorage(songVolume.value);
});

// Устанавливаем громкость при загрузке страницы
const initialVolume = loadVolumeFromLocalStorage();
songVolume.value = initialVolume;
rouletteSong.volume = initialVolume / 100; // Устанавливаем громкость в диапазоне от 0 до 1

// // Load the status on page load
// document.addEventListener("DOMContentLoaded", () => {
//    songChangerStatus = loadSongChangerStatusFromLocalStorage();
// });

function saveChosenIndexToLocalStorage(hero) {
   localStorage.setItem("chosenHero", JSON.stringify(hero)); // Сохраняем весь объект героя в виде строки JSON
}

// Функция для загрузки выбранного индекса из localStorage
function loadChosenIndexFromLocalStorage() {
   const savedHero = localStorage.getItem("chosenHero");

   if (savedHero !== null) {
      const hero = JSON.parse(savedHero); // Преобразуем JSON-строку обратно в объект героя
      console.log(`Последний выбранный герой — ${hero.name}`);

      // Здесь можно использовать свойства героя, например:
      const chosenHeroImage = hero.image.replace(".jpg", "");
      const showHeroTitle = showHeroBox.querySelector(".show-hero__title");
      const showHeroVideo = showHeroBox.querySelector(".show-hero__video");

      // Обновление заголовка с именем героя
      showHeroTitle.textContent = hero.name;

      // Обновление постера и источников видео
      showHeroVideo.poster = `https://cdn.akamai.steamstatic.com/apps/dota2/videos/dota_react/heroes/renders/${chosenHeroImage}.png`;

      const sources = showHeroVideo.querySelectorAll("source");
      sources[0].src = `https://cdn.akamai.steamstatic.com/apps/dota2/videos/dota_react/heroes/renders/${chosenHeroImage}.mov`;
      sources[1].src = `https://cdn.akamai.steamstatic.com/apps/dota2/videos/dota_react/heroes/renders/${chosenHeroImage}.webm`;

      // Перезагрузка видео
      showHeroVideo.load();
   } else {
      console.log("Нет сохраненного героя.");
   }
}

function saveLastHeroesToLocalStorage() {
   // Преобразуем массив currentLastHeroes в строку
   const currentLastHeroesString = JSON.stringify(currentLastHeroes);

   // Сохраняем строку в localStorage
   localStorage.setItem("lastHeroes", currentLastHeroesString);
}

function loadLastHeroesFromLocalStorage() {
   // Получаем строку из localStorage
   const lastHeroesString = localStorage.getItem("lastHeroes");

   // Проверяем, есть ли данные в localStorage
   if (lastHeroesString) {
      // Преобразуем строку обратно в массив
      const loadedHeroes = JSON.parse(lastHeroesString);

      // Очищаем массив currentLastHeroes и добавляем элементы из загруженного массива
      currentLastHeroes.length = 0;
      currentLastHeroes.push(...loadedHeroes);

      // Выводим загруженный массив в консоль
      console.log("Это currentLastHeroes");
      console.log("Сохраненные последние герои", currentLastHeroes);
   } else {
      // Если данных нет, выводим сообщение в консоль
      console.log("Нет сохраненных последних героев");
   }
}

function renderLastHeroesFromLocalStorage() {
   // Загружаем данные из localStorage
   loadLastHeroesFromLocalStorage();

   // Очищаем список перед отображением
   lastHeroesList.innerHTML = "";

   // Перебираем каждый элемент массива currentLastHeroes
   currentLastHeroes.forEach((hero) => {
      // Проверяем, что данные героя не равны пустым строкам
      if (hero.name && hero.image) {
         // Проверяем наличие имени и изображения
         // Клонируем шаблон
         const lastHeroItem = lastHeroTemplate.cloneNode(true);
         const lastHeroUl = lastHeroItem.querySelector(".last-heroes__item");

         // Устанавливаем изображение для героя
         lastHeroUl.style.backgroundImage = `url("./assets/heroes/${hero.image}")`;

         // Добавляем атрибут data-hero-name к элементу
         lastHeroUl.dataset.heroName = hero.name;

         // Универсальная функция для добавления/удаления лейбла "DEL"
         updateDelLabel(lastHeroUl, hero.deleted);

         // Обновляем видимость оверлеев в зависимости от состояния selected
         updateOverlayVisibility(lastHeroUl, !hero.deleted); // Если deleted = false, значит selected = true

         // Добавляем обработчик клика для карточки героя
         lastHeroUl.addEventListener("click", () => {
            handleHeroClick(lastHeroUl);
         });

         // Вставляем героя в список lastHeroesList
         lastHeroesList.appendChild(lastHeroItem);
      }
   });
}

function saveStartHeroesToLocalStorage() {
   const startHeroesString = JSON.stringify(startHeroes);
   localStorage.setItem("startHeroes", startHeroesString);
   console.log("Массив startHeroes сохранен в localStorage.");
}

function loadStartHeroesFromLocalStorage() {
   // Получаем строку из localStorage
   const startHeroesString = localStorage.getItem("startHeroes");

   // Проверяем, есть ли данные в localStorage
   if (startHeroesString) {
      // Преобразуем строку обратно в массив
      const loadedStartHeroes = JSON.parse(startHeroesString);

      // Очищаем массив startHeroes и добавляем элементы из загруженного массива
      startHeroes.length = 0;
      startHeroes.push(...loadedStartHeroes);

      // Выводим загруженный массив в консоль для проверки
      console.log("Массив startHeroes загружен из localStorage.");
      console.log(startHeroes);
   } else {
      // Если данных нет, выводим сообщение в консоль
      console.log("Нет сохраненных данных для startHeroes в localStorage.");
   }
}

// Функция для сохранения массива startHeroes как "мои баны" в localStorage
function saveMyBansToLocalStorage() {
   const myBansString = JSON.stringify(startHeroes);
   localStorage.setItem("myBans", myBansString);
   console.log("Массив startHeroes сохранен как 'мои баны' в localStorage.");
}

// Функция для загрузки массива "мои баны" из localStorage
function loadMyBansFromLocalStorage() {
   const myBansString = localStorage.getItem("myBans");

   // Проверяем, есть ли сохраненные данные
   if (myBansString) {
      const loadedMyBans = JSON.parse(myBansString);

      // Очищаем массив startHeroes и добавляем данные из загруженного массива
      startHeroes.length = 0;
      startHeroes.push(...loadedMyBans);

      console.log(
         "Массив startHeroes обновлен с данными из 'моих банов' из localStorage."
      );
      console.log(startHeroes);
   } else {
      console.log("Нет сохраненных данных для 'моих банов' в localStorage.");
   }
}

////////////////////////////////////////////////////////////////////////
/////////////////Показ ЧТО НОВОГО новому пользователю///////////////////
////////////////////////////////////////////////////////////////////////
// Функция для проверки, видел ли пользователь попап
function hasSeenPopup() {
   return localStorage.getItem("popupSeen") === "true";
}

// Функция для установки флага, что пользователь видел попап
function markPopupAsSeen() {
   localStorage.setItem("popupSeen", "true");
}

// Функция для открытия попапа и проверки, нужно ли его показывать
function showPopupIfNeeded() {
   if (!hasSeenPopup()) {
      openPopup(whatsNewPopup);
      openPopup(UpdatePopup);
      markPopupAsSeen();
   }
}

// Вызов функции при загрузке страницы
showPopupIfNeeded();

const rangewww = document.querySelector("#rangeVolume");

export function updateHuy() {
   const percentage =
      ((rangewww.value - rangeInput.min) / (rangewww.max - rangewww.min)) * 100;

   // Обновляем градиент ползунка
   rangewww.style.background = `linear-gradient(to right, #fff ${percentage}%, transparent ${percentage}%)`;
}

updateHuy()

rangewww.addEventListener("input", updateHuy);


// При загрузке страницы выводим сохраненный индекс героя
// loadChosenIndexFromLocalStorage();
// loadStartHeroesFromLocalStorage();
// loadLastHeroesFromLocalStorage();
// renderLastHeroesFromLocalStorage();
// renderPortraits(startHeroes)

export {
   portraitsList,
   portraitsListBox,
   portraitsListGroup,
   chooseButton,
   btnTop,
   btnBottom,
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
   showHeroBoxButtons,
   // showHeroRertyButton,
   startHeroes,
   helpBox,
   songChanger,
   rouletteSong,
   roulette,
   box,
   loadingPopup,
   saveChosenIndexToLocalStorage,
   saveLastHeroesToLocalStorage,
   saveStartHeroesToLocalStorage,
   saveMyBansToLocalStorage,
   loadMyBansFromLocalStorage,
   currentLastHeroes,
   songChangerStatus,
   chooseButtonText,
};
