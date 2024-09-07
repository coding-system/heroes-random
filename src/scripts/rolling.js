import { currentSelectableHeroes, chosenIndex } from "./random.js";
import {
   windowList,
   windowHeroTemplate,
   lastHeroesList,
   lastHeroTemplate,
   helpBox
} from "../index.js";
import { showHeroBox } from "../index.js";
import { openPopup } from "./modal.js";

// export function defaultList() {
//       const totalArrayNumber = 31;

//       const displayedHeroes = new Array(totalArrayNumber);
//       for (let i = 0; i < displayedHeroes.length; i++) {
//          const randomIndex = Math.floor(
//             Math.random() * showHeroes.length
//          );
//             displayedHeroes[i] = startHeroes[randomIndex].image;
//       }
//       console.log(displayedHeroes)
//       return displayedHeroes;

// }

// Функция регистрации информации для отладки
export function yo(displayedHeroes, currentSelectableHeroes) {
   console.log(currentSelectableHeroes.length);
   console.log(currentSelectableHeroes[chosenIndex]);
   console.log(displayedHeroes);
   console.log(`Выбранный герой в рулетке - ${displayedHeroes[15]}`);
   console.log(`Длина начального массива - ${currentSelectableHeroes.length}`);
}

// Функция для вычисления ширины последнего элемента
function calculateLastItemWidth() {
   return Math.floor(Math.random() * 344);
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
function renderHeroesList(displayedHeroes, windowItemsLastWidth) {
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
   const newArr = [...arr]
   windowList.innerHTML = "";
   windowList.classList.remove("rolling-animation");
   newArr.forEach((hero, index) => {
      const windowHeroItem = windowHeroTemplate.cloneNode(true);
      const windowHeroUl = windowHeroItem.querySelector(".window__item");
      const rand = Math.floor(Math.random() * newArr.length)
      windowHeroUl.style.backgroundImage = `url("./assets/heroes/${newArr[rand].image}")`;
      windowList.appendChild(windowHeroItem);
      windowList.classList.add('default-animation')
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
   setTimeout(() => lastHeroesList.prepend(lastHeroItem), 7000);
   setTimeout(() => helpBox.style.transform = `translateY(0)`, 7000);

   const deletedLabel = document.createElement("div");
   deletedLabel.classList.add("deleted-label");
   deletedLabel.textContent = "DEL";
   if (currentSelectableHeroes[chosenIndex].selected) return;
   else {
      lastHeroUl.appendChild(deletedLabel);
   }
}

let previousWindowItemsLastWidth = 0; // Initialize with a default value
let currentWindowItemsLastWidth = previousWindowItemsLastWidth; // Keep track of the current width during animation
let itemWidth;

function animateWindowList(
   totalWidth,
   currentWindowItemsLastWidth,
   previousWindowItemsLastWidth
) {
   windowList.classList.remove('default-animation')
   const wer = 4 * itemWidth + 43 + previousWindowItemsLastWidth;

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
      35% {
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
   const displayedHeroIndex = 25;
   const totalArrayNumber = displayedHeroIndex * 2 + 1;

   // Generate a new width only after the previous animation is complete
   currentWindowItemsLastWidth = calculateLastItemWidth();

   const displayedHeroes = generateDisplayedHeroes(
      totalArrayNumber,
      displayedHeroIndex,
      currentSelectableHeroes,
      chosenIndex
   );

   renderHeroesList(displayedHeroes, currentWindowItemsLastWidth);
   renderLastHero(displayedHeroes[displayedHeroIndex]);

   const windowItemsWidth = document.querySelector(".window__box").offsetWidth;
   const totalWidth =
      windowItemsWidth * (displayedHeroIndex - 2) +
      43 +
      currentWindowItemsLastWidth;

   // Pass the current and previous values to the animation
   animateWindowList(
      totalWidth,
      currentWindowItemsLastWidth,
      previousWindowItemsLastWidth
   );

   // Once the animation ends, update the previous value with the current one
   previousWindowItemsLastWidth = currentWindowItemsLastWidth;
   itemWidth = windowItemsWidth;

   showHeroWindow();
   yo(displayedHeroes, currentSelectableHeroes);
}

function showHeroWindow() {
   setTimeout(() => openPopup(showHeroBox), 5750);
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

