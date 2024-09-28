import { currentSelectableHeroes, chosenIndex } from "./random.js";
import {
   windowList,
   windowHeroTemplate,
   lastHeroesList,
   lastHeroTemplate,
   helpBox,
   currentLastHeroes,
} from "../index.js";
import { showHeroBox } from "../index.js";
import { openPopup } from "./modal.js";

export let lastHeroesArray = Array(16).fill({ link: "" }); // Инициализация массива с 16 пустыми объектами

// Функция регистрации информации для отладки
// export function yo(displayedHeroes, currentSelectableHeroes) {
//    console.log(currentSelectableHeroes.length);
//    console.log(currentSelectableHeroes[chosenIndex]);
//    console.log(displayedHeroes);
//    console.log(`Выбранный герой в рулетке - ${displayedHeroes[25]}`);
//    console.log(`Длина начального массива - ${currentSelectableHeroes.length}`);
// }

// Функция для вычисления ширины последнего элемента
function calculateLastItemWidth(width) {
   return Math.floor(Math.random() * width);
}

// Функция для генерации случайного изображения героя
function getRandomHeroImage(currentSelectableHeroes) {
   const randomIndex = Math.floor(
      Math.random() * currentSelectableHeroes.length
   );
   return currentSelectableHeroes[randomIndex].image;
}

// Функция для создания отображаемого массива героев
let savedDisplayedHeroes = [];

function generateDisplayedHeroes(
   totalArrayNumber,
   displayedHeroIndex,
   currentSelectableHeroes,
   chosenIndex
) {
   const displayedHeroes = new Array(totalArrayNumber);

   // Генерация нового массива displayedHeroes
   for (let i = 0; i < displayedHeroes.length; i++) {
      if (i === displayedHeroIndex) {
         displayedHeroes[displayedHeroIndex] =
            currentSelectableHeroes[chosenIndex].image;
      } else {
         displayedHeroes[i] = getRandomHeroImage(currentSelectableHeroes);
      }
   }

   // Если есть сохранённые элементы, переназначаем 21-29 элементы
   if (savedDisplayedHeroes.length > 0) {
      for (let i = 2; i <= 10; i++) {
         displayedHeroes[i] = savedDisplayedHeroes[i + 19];
      }
   }

   // Сохранение текущего displayedHeroes для следующего использования
   savedDisplayedHeroes = [...displayedHeroes];

   console.log("Ниже новые массивы");
   console.log(savedDisplayedHeroes);
   console.log(displayedHeroes);

   return displayedHeroes;
}

// Функция для отображения героев в списке окон
export function renderHeroesList(displayedHeroes, windowItemsLastWidth) {
   windowList.innerHTML = "";
   // windowList.classList.remove("window__list-animated");
   windowList.classList.remove("rolling-animation");

   displayedHeroes.forEach((hero, index) => {
      const windowHeroItem = windowHeroTemplate.cloneNode(true);
      const windowHeroUl = windowHeroItem.querySelector(".window__item");
      windowHeroUl.style.backgroundImage = `url("./assets/heroes/${hero}")`;

      // const windowBox = windowHeroItem.querySelector(".window__box");
      // windowBox.classList.add(
      //    windowItemsLastWidth % 2 === 0 ? "window__box-odd" : "window__box-even"
      // );

      windowList.appendChild(windowHeroItem);
   });
}

export function renderDefaultHeroesList(arr) {
   const newArr = [...arr];
   windowList.innerHTML = "";
   windowList.classList.remove("rolling-animation");
   newArr.forEach((hero, index) => {
      const windowHeroItem = windowHeroTemplate.cloneNode(true);
      const windowHeroUl = windowHeroItem.querySelector(".window__item");
      const rand = Math.floor(Math.random() * newArr.length);
      windowHeroUl.style.backgroundImage = `url("./assets/heroes/${newArr[rand].image}")`;
      windowList.appendChild(windowHeroItem);
      windowList.classList.add("default-animation");
      // windowList.style.transform = `translatex(-72000px)`
      // windowList.style.transition = `all 700s linear`

      // savedDisplayedHeroes = [...newArr]
   });
}

// Функция для отображения последнего героя в списке lastHeroesList
function renderLastHero(displayedHero) {
   const lastHeroItem = lastHeroTemplate.cloneNode(true);
   const lastHeroUl = lastHeroItem.querySelector(".last-heroes__item");
   lastHeroUl.style.backgroundImage = `url("./assets/heroes/${displayedHero}")`;

   // Проверяем, был ли герой выбран
   const isDeleted = !currentSelectableHeroes[chosenIndex].selected;

   // Добавляем нового героя в начало массива currentLastHeroes с параметром deleted
   setTimeout(() => {
      currentLastHeroes.unshift({
         image: displayedHero,
         deleted: isDeleted,
      });

      // Если длина массива больше 16, удаляем самого старого героя
      if (currentLastHeroes.length > 16) {
         currentLastHeroes.pop();
      }
   }, 6000); // 6000 миллисекунд = 6 секунд

   // Добавляем на страницу нового героя с задержкой
   setTimeout(() => {
      lastHeroesList.prepend(lastHeroItem);

      // Если на странице больше 16 элементов, удаляем последний (старый) элемент
      if (lastHeroesList.children.length > 16) {
         lastHeroesList.removeChild(lastHeroesList.lastElementChild);
      }

      // Если герой удален (не выбран), добавляем метку "DEL"
      if (isDeleted) {
         const deletedLabel = document.createElement("div");
         deletedLabel.classList.add("deleted-label");
         deletedLabel.textContent = "DEL";
         lastHeroUl.appendChild(deletedLabel);
      }
   }, 7500); // 7500 миллисекунд = 7.5 секунд
}
/////////////////////////////////////
///Старая версия без массива, работает
////////////////////////////////////////
// Функция для отображения последнего героя в списке lastHeroesList
// function renderLastHero(displayedHero) {
//    const lastHeroItem = lastHeroTemplate.cloneNode(true);
//    const lastHeroUl = lastHeroItem.querySelector(".last-heroes__item");
//    lastHeroUl.style.backgroundImage = `url("./assets/heroes/${displayedHero}")`;
//    setTimeout(() => lastHeroesList.prepend(lastHeroItem), 7500);
//    setTimeout(() => helpBox.style.transform = `translateY(0)`, 7000);

//    const deletedLabel = document.createElement("div");
//    deletedLabel.classList.add("deleted-label");
//    deletedLabel.textContent = "DEL";
//    if (currentSelectableHeroes[chosenIndex].selected) return;
//    else {
//       lastHeroUl.appendChild(deletedLabel);
//    }
// }

let previousWindowItemsLastWidth = 0; // Initialize with a default value
let currentWindowItemsLastWidth = previousWindowItemsLastWidth; // Keep track of the current width during animation
let itemWidth;

function animateWindowList(
   totalWidth,
   currentWindowItemsLastWidth,
   extraWidth,
   previousWindowItemsLastWidth
) {
   windowList.classList.remove("default-animation");
   const wer = 4 * itemWidth + extraWidth + previousWindowItemsLastWidth;

   // Log both values for debugging
   console.log("Current windowItemsLastWidth:", currentWindowItemsLastWidth);
   console.log("Previous windowItemsLastWidth:", previousWindowItemsLastWidth);

   windowList.style.transform = `translateX(-${totalWidth}px)`;
   requestAnimationFrame(() => {
      windowList.classList.add("rolling-animation");

      const styleSheet = document.createElement("style");
      styleSheet.innerHTML = `
   @keyframes rolling {
      0% {
         transform: translateX(-${wer}px);
      }
      5% {
         transform: translateX(-${wer}px);
      }
      40% {
         transform: translateX(0);
      }
      100% {
         transform: translateX(-${totalWidth}px);
      }
   }
`;

      // Add the new stylesheet to the document
      windowList.appendChild(styleSheet);
   });
}

export function showHeroes() {
   const rootStyles = getComputedStyle(document.documentElement);
   const extraWidth = parseInt(rootStyles.getPropertyValue("--extra-width"));
   const displayedHeroIndex = 25;
   const totalArrayNumber = displayedHeroIndex * 2 + 1;
   const windowItemsWidth = document.querySelector(".window__box").offsetWidth;

   // Generate a new width only after the previous animation is complete
   currentWindowItemsLastWidth = calculateLastItemWidth(windowItemsWidth);

   const displayedHeroes = generateDisplayedHeroes(
      totalArrayNumber,
      displayedHeroIndex,
      currentSelectableHeroes,
      chosenIndex
   );

   renderHeroesList(displayedHeroes, currentWindowItemsLastWidth);
   renderLastHero(displayedHeroes[displayedHeroIndex]);

   const totalWidth =
      windowItemsWidth * (displayedHeroIndex - 2) + extraWidth + currentWindowItemsLastWidth;

   // Pass the current and previous values to the animation
   animateWindowList(
      totalWidth,
      currentWindowItemsLastWidth,
      extraWidth,
      previousWindowItemsLastWidth
   );

   // Once the animation ends, update the previous value with the current one
   previousWindowItemsLastWidth = currentWindowItemsLastWidth;
   itemWidth = windowItemsWidth;

   showHeroWindow();
   // yo(displayedHeroes, currentSelectableHeroes);
}

function showHeroWindow() {
   setTimeout(() => openPopup(showHeroBox), 5700);
   // setTimeout(() => openPopup(showHeroBox), 6500);
   // setTimeout(() => showHeroBox.classList.remove("popup_is-opened"), 15750);
}

// let showHeroTimeoutId;
// function showHeroWindow() {
//    // Если таймер уже был запущен, очищаем его
//    if (showHeroTimeoutId) {
//        clearTimeout(showHeroTimeoutId);
//    }
//    // Запускаем новый таймер и сохраняем его идентификатор
//    showHeroTimeoutId = setTimeout(() => openPopup(showHeroBox), 5750);
// }
