import { currentSelectableHeroes, chosenIndex } from "./random.js";
import {
   windowList,
   windowHeroTemplate,
   lastHeroesList,
   lastHeroTemplate,
   helpBox,
   currentLastHeroes,
   showHeroBoxButtons,
   startHeroes,
   saveLastHeroesToLocalStorage,
   saveStartHeroesToLocalStorage,
} from "../index.js";
import { showHeroBox } from "../index.js";
import { openPopup, closePopup } from "./modal.js";
import { updatePortraits } from "./portraits.js";

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

   // Генерация нового массива displayedHeroes для вывода их в рулетке
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

export function updateDelLabel(heroElement, isDeleted) {
   // Проверяем, есть ли уже лейблы "deleted-label" и "undeleted-label"
   const existingDelLabel = heroElement.querySelector(".deleted-label");
   const existingUndelLabel = heroElement.querySelector(".undeleted-label");

   if (isDeleted) {
      // Если герой удален, добавляем лейбл "deleted-label" и удаляем "undeleted-label"
      if (!existingDelLabel) {
         const deletedLabel = document.createElement("div");
         deletedLabel.classList.add("deleted-label");
         heroElement.appendChild(deletedLabel);
      }
      if (existingUndelLabel) {
         heroElement.removeChild(existingUndelLabel);
      }
   } else {
      // Если герой не удален, добавляем лейбл "undeleted-label" и удаляем "deleted-label"
      if (!existingUndelLabel) {
         const undeletedLabel = document.createElement("div");
         undeletedLabel.classList.add("undeleted-label");
         heroElement.appendChild(undeletedLabel);
      }
      if (existingDelLabel) {
         heroElement.removeChild(existingDelLabel);
      }
   }
}


// export function updateDelLabel(heroElement, isDeleted) {
//    // Проверяем, есть ли уже лейбл "DEL"
//    const existingDelLabel = heroElement.querySelector(".deleted-label");

//    if (isDeleted) {
//       // Если герой удален и лейбла "DEL" нет, добавляем его
//       if (!existingDelLabel) {
//          const deletedLabel = document.createElement("div");
//          deletedLabel.classList.add("deleted-label");
//          // deletedLabel.textContent = "DEL";
//          heroElement.appendChild(deletedLabel);
//       }
//    } else {
//       // Если герой не удален и лейбл существует, удаляем его
//       if (existingDelLabel) {
//          heroElement.removeChild(existingDelLabel);
//       }
//    }
// }

// Функция, которая обрабатывает клик по карточке
export function handleHeroClick(lastHeroUl) {
   const heroName = lastHeroUl.dataset.heroName;

   // Находим героя в массиве startHeroes по имени
   const hero = startHeroes.find((h) => h.name === heroName);

   // Находим героя в массиве currentLastHeroes по имени
   const currentLastHero = currentLastHeroes.find((h) => h.name === heroName);

   if (hero && currentLastHero) {
      // Теперь переключаем состояние в массиве currentLastHeroes
      // Если герой помечен как deleted, значит он не выбран, поэтому переключаем состояние
      currentLastHero.deleted = !currentLastHero.deleted;

      // Синхронизируем состояние selected в startHeroes с состоянием deleted
      // Если герой не удален (deleted: false), то он выбран (selected: true)
      hero.selected = !currentLastHero.deleted;

      // Выводим новое значение selected в консоль для проверки
      console.log("Selected в startHeroes:", hero.selected);
      console.log("Deleted в currentLastHeroes:", currentLastHero.deleted);

      // Обновляем видимость оверлеев в зависимости от состояния selected
      updateOverlayVisibility(lastHeroUl, hero.selected);

      // Универсальная функция для добавления/удаления лейбла "DEL"
         updateDelLabel(lastHeroUl, currentLastHero.deleted);
         updatePortraits(startHeroes);

      // Сохраняем обновленный currentLastHeroes в localStorage
      saveLastHeroesToLocalStorage();
      saveStartHeroesToLocalStorage();
   }
}

export function updateOverlayVisibility(lastHeroUl, selected) {
   const deleteOverlay = lastHeroUl.querySelector('.last-heroes__delete-hero');
   const returnOverlay = lastHeroUl.querySelector('.last-heroes__return-hero');

   if (selected) {
       deleteOverlay.style.opacity = 1; // Показываем "Удалить?"
       returnOverlay.style.opacity = 0;  // Скрываем "Вернуть?"
   } else {
       deleteOverlay.style.opacity = 0;  // Скрываем "Удалить?"
       returnOverlay.style.opacity = 1;   // Показываем "Вернуть?"
   }
}

export function renderLastHero() {
   const lastHeroItem = lastHeroTemplate.cloneNode(true);
   const lastHeroUl = lastHeroItem.querySelector(".last-heroes__item");
   lastHeroUl.style.backgroundImage = `url("./assets/heroes/${currentSelectableHeroes[chosenIndex].image}")`;

   // Добавляем атрибут data-hero-name к элементу
   lastHeroUl.dataset.heroName = currentSelectableHeroes[chosenIndex].name;

   // Проверяем, был ли герой выбран
   const isDeleted = !currentSelectableHeroes[chosenIndex].selected;

   // Добавляем нового героя в начало массива currentLastHeroes с параметром deleted
   currentLastHeroes.unshift({
      name: currentSelectableHeroes[chosenIndex].name,
      image: currentSelectableHeroes[chosenIndex].image,
      deleted: isDeleted,
   });

   // Если длина массива больше 16, удаляем самого старого героя
   if (currentLastHeroes.length > 16) {
      currentLastHeroes.pop();
   }

   // Добавляем на страницу нового героя с задержкой
   lastHeroesList.prepend(lastHeroItem);

   // Если на странице больше 16 элементов, удаляем последний (старый) элемент
   if (lastHeroesList.children.length > 16) {
      lastHeroesList.removeChild(lastHeroesList.lastElementChild);
   }

   // Устанавливаем opacity оверлеев в зависимости от значения selected
   updateOverlayVisibility(lastHeroUl, !isDeleted); // Передаем true, если selected

   // Универсальная функция для добавления/удаления лейбла "DEL"
   updateDelLabel(lastHeroUl, isDeleted);

   // Добавляем обработчик клика для карточки героя
   lastHeroUl.addEventListener("click", () => {
      handleHeroClick(lastHeroUl);
   });
}

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
   // renderLastHero();

   const totalWidth =
      windowItemsWidth * (displayedHeroIndex - 2) +
      extraWidth +
      currentWindowItemsLastWidth;

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
   // yo(displayedHeroes, currentSelectableHeroes);
}

export function showHeroWindow() {
   showHeroBoxButtons.style.opacity = "1";
   showHeroBoxButtons.style.pointerEvents = "all";
   openPopup(showHeroBox);
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
