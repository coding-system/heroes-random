////////////////////////////////////
/////  Диалог списка героев  ///////
////////////////////////////////////
import {
   portraitsList,
   cardPortraitTemplate,
   portraitsstrengthList,
   portraitsagilityList,
   portraitsintelligenceList,
   portraitsuniversalList,
   saveMyBansToLocalStorage,
   loadMyBansFromLocalStorage,
   startHeroes,
} from "../index.js";

// document.addEventListener("DOMContentLoaded", function () {
//    heroesListButton.addEventListener("click", function () {
//       heroesList.classList.add("popup_is-opened");
//    });

//    heroesListcloseButton.addEventListener("click", function () {
//       heroesList.classList.remove("popup_is-opened");
//    });
// });

// Функция обновления отображения героя
function updateHeroDisplay(hero, cardBanned, cardLine, videoBanned) {
   if (hero.selected) {
      cardBanned.style.opacity = "0";
      cardLine.style.opacity = "0";
      videoBanned.style.opacity = "0";
   } else {
      cardBanned.style.opacity = "1";
      cardBanned.style["boxShadow"] =
         "inset 0 0 1.5em rgb(255, 0, 0), inset 0 0 0.5em rgb(0, 0, 0)";
      cardLine.style.opacity = "0";
      videoBanned.style.opacity = "1";
   }
}

// Функция массового изменения состояния героев
function updateAllHeroes(heroes, selectAll = true) {
   heroes.forEach((hero) => {
      hero.selected = selectAll;
   });

   // Обновляем отображение всех героев
   heroes.forEach((hero) => {
      let cardPortraitItem;
      switch (hero.attribute) {
         case "strength":
            cardPortraitItem = Array.from(portraitsstrengthList.children).find(
               (item) =>
                  item
                     .querySelector(".card-portrait-video-name")
                     .textContent.includes(hero.name)
            );
            break;
         case "agility":
            cardPortraitItem = Array.from(portraitsagilityList.children).find(
               (item) =>
                  item
                     .querySelector(".card-portrait-video-name")
                     .textContent.includes(hero.name)
            );
            break;
         case "intelligence":
            cardPortraitItem = Array.from(
               portraitsintelligenceList.children
            ).find((item) =>
               item
                  .querySelector(".card-portrait-video-name")
                  .textContent.includes(hero.name)
            );
            break;
         case "universal":
            cardPortraitItem = Array.from(portraitsuniversalList.children).find(
               (item) =>
                  item
                     .querySelector(".card-portrait-video-name")
                     .textContent.includes(hero.name)
            );
            break;
      }

      if (cardPortraitItem) {
         const cardBanned = cardPortraitItem.querySelector(".banned-overlay");
         const cardLine = cardPortraitItem.querySelector(".line");
         const videoBanned = cardPortraitItem.querySelector(
            ".video-banned-overlay"
         );
         updateHeroDisplay(hero, cardBanned, cardLine, videoBanned);
      }
   });
}

function updatePortraits(heroes) {
   // Проходимся по массиву героев и обновляем только отображение
   heroes.forEach((hero) => {
      // Ищем элемент карточки по уникальному идентификатору героя, например по имени
      const heroCard = document.querySelector(
         `.card-portrait-item[data-hero-name="${hero.name}"]`
      );

      if (heroCard) {
         const cardBanned = heroCard.querySelector(".banned-overlay");
         const videoBanned = heroCard.querySelector(".video-banned-overlay");
         const cardLine = heroCard.querySelector(".line");

         // Обновляем отображение стилей в зависимости от состояния hero.selected
         updateHeroDisplay(hero, cardBanned, cardLine, videoBanned);

         // Удаляем существующий обработчик и добавляем новый для обновления selected
         heroCard.removeEventListener("click", heroCard._clickHandler); // Удаление старого обработчика
         heroCard._clickHandler = () => {
            // Обработчик клика на элемент для переключения состояния selected
            hero.selected = !hero.selected;
            updateHeroDisplay(hero, cardBanned, cardLine, videoBanned);
            console.log(`${hero.name} => ${hero.selected}`);
         };
         heroCard.addEventListener("click", heroCard._clickHandler); // Назначение нового обработчика
      }
   });
}

// Функция для добавления альтернативных имен героев
function addHeroAlternativeNames(heroName) {
   let secondName = "";

   switch (heroName) {
      case "Windranger":
         secondName = "WR";
         break;
      case "Bloodseeker":
         secondName = "BS";
         break;
      case "Dawnbreaker":
         secondName = "DB Valora";
         break;
      case "Lifestealer":
         secondName = "Ghoul Gul Gulya";
         break;
      case "Spirit Breaker":
         secondName = "Bara";
         break;
      case "Tusk":
         secondName = "Tuskar";
         break;
      case "Nature's Prophet":
         secondName = "Furion";
         break;
      case "Death Prophet":
         secondName = "Bansha";
         break;
      case "Jakiro":
         secondName = "THD";
         break;
      case "Outworld Destroyer":
         secondName = "Outworld Devourer";
         break;
      case "Necrophos":
         secondName = "Necrolyte Nekrolyte Necrolite Nekrolite";
         break;
      case "Shadow Shaman":
         secondName = "Rhasta Rasta";
         break;
      case "Silencer":
         secondName = "Salo";
         break;
      case "Antimage":
         secondName = "AM Magina";
         break;
      case "Morphling":
         secondName = "Morf Morfling";
         break;
      case "Terrorblade":
         secondName = "TB";
         break;
      case "Troll Warlord":
         secondName = "TW";
         break;
      case "Beastmaster":
         secondName = "BM";
         break;
      case "Brewmaster":
         secondName = "BM";
         break;
      case "IO":
         secondName = "Wisp";
         break;
      case "Winter Wyvern":
         secondName = "Wiwern Wivern";
         break;
      case "Abaddon":
         secondName = "Abbadon Abbaddon Abadon";
         break;
      // Добавьте другие альтернативные имена по необходимости
      default:
         secondName = ""; // Если нет альтернативного имени
   }

   return secondName;
}

function runAnimation() {
   inputElementData.classList.add("portraits-list__search-data_visible");
   console.log("Класс анимации добавлен");
   setTimeout(() => {
      inputElementData.classList.add("portraits-list__search-data_animated");
      console.log("Класс анимации удален");
   }, 1000);
}

function stopAnimation() {
   inputElementData.classList.remove("portraits-list__search-data_visible");
   inputElementData.classList.remove("portraits-list__search-data_animated");
}

function renderPortraits(heroes) {
   // Очищаем списки перед добавлением новых элементов
   portraitsstrengthList.innerHTML = "";
   portraitsagilityList.innerHTML = "";
   portraitsintelligenceList.innerHTML = "";
   portraitsuniversalList.innerHTML = "";

   heroes.forEach((hero) => {
      const cardPortraitItem = cardPortraitTemplate.cloneNode(true); // Клонируем шаблон для каждого героя
      const cardPortraitImage = cardPortraitItem.querySelector(
         ".card-portrait-image-content"
      );
      const cardPortraitHoverVideo = cardPortraitItem.querySelector(
         ".card-portrait-video-content"
      );
      const cardPortraitButton = cardPortraitItem.querySelector(
         ".card-portrait-item"
      );
      const cardPortraitHoverName = cardPortraitItem.querySelector(
         ".card-portrait-video-name"
      );
      const cardBanned = cardPortraitItem.querySelector(".banned-overlay");
      const videoBanned = cardPortraitItem.querySelector(
         ".video-banned-overlay"
      );
      const cardLine = cardPortraitItem.querySelector(".line");

      const heroName = hero.image.replace(".jpg", "");
      const videoSrc = `./assets/heroes/portraits/npc_dota_hero_${heroName}.webm`;

      cardPortraitImage.src = `./assets/heroes/pictures/npc_dota_hero_${heroName}.jpg`;
      cardPortraitHoverVideo.src = videoSrc;
      cardPortraitHoverName.textContent = hero.name;

      // Установка data-hero-name
      cardPortraitButton.setAttribute("data-hero-name", hero.name);

      // Вызов функции для получения альтернативного имени и установка data-hero-second-name
      const secondName = addHeroAlternativeNames(hero.name);
      if (secondName) {
         cardPortraitButton.setAttribute("data-hero-second-name", secondName);
      }

      cardPortraitButton.addEventListener("mouseenter", () => {
         cardPortraitHoverVideo.play();
      });

      cardPortraitButton.addEventListener("mouseleave", () => {
         cardPortraitHoverVideo.pause();
      });

      // Обновляем отображение стилей в зависимости от состояния hero.selected
      updateHeroDisplay(hero, cardBanned, cardLine, videoBanned);

      // Обработчик клика на элемент видео для переключения состояния героя
      cardPortraitButton.addEventListener("click", () => {
         hero.selected = !hero.selected;
         updateHeroDisplay(hero, cardBanned, cardLine, videoBanned);
         console.log(`${hero.name} => ${hero.selected}`);
      });

      switch (hero.attribute) {
         case "strength":
            portraitsstrengthList.appendChild(cardPortraitItem);
            break;
         case "agility":
            portraitsagilityList.appendChild(cardPortraitItem);
            break;
         case "intelligence":
            portraitsintelligenceList.appendChild(cardPortraitItem);
            break;
         case "universal":
            portraitsuniversalList.appendChild(cardPortraitItem);
            break;
      }
   });

   const selectAllButton = portraitsList.querySelector(".select-all");
   const banAllButton = portraitsList.querySelector(".ban-all");
   const saveMyBansButton = portraitsList.querySelector(".save-bans");
   const loadMyBansButton = portraitsList.querySelector(".load-bans");
   const lightSpark = portraitsList.querySelector(".light-spark");

   // Выбор всех героев
   selectAllButton.addEventListener("click", () => {
      updateAllHeroes(heroes, true);
      lightSpark.classList.add("green-light-spark");
      setTimeout(() => lightSpark.classList.remove("green-light-spark"), 500);
   });

   // Бан всех героев
   banAllButton.addEventListener("click", () => {
      updateAllHeroes(heroes, false);
      lightSpark.classList.add("red-light-spark");
      setTimeout(() => lightSpark.classList.remove("red-light-spark"), 500);
   });

   saveMyBansButton.addEventListener("click", () => {
      saveMyBansToLocalStorage();
      lightSpark.classList.add("blue-light-spark");
      setTimeout(() => lightSpark.classList.remove("blue-light-spark"), 500);
   });

   loadMyBansButton.addEventListener("click", () => {
      loadMyBansFromLocalStorage();
      updatePortraits(heroes);
      lightSpark.classList.add("yellow-light-spark");
      setTimeout(() => lightSpark.classList.remove("yellow-light-spark"), 500);
   });
}

const inputElement = document.querySelector(".portraits-list__search");
const inputElementData = document.querySelector(".portraits-list__search-data");
const overlayElement = document.querySelector(".overlayz");

// Функция для поиска героев
function searchHeroes() {
   // inputElementData.classList.remove("portraits-list__search-data_animated")

   const searchTerm = inputElement.value.trim().toLowerCase();
   inputElementData.textContent = searchTerm;

   // Если введен хотя бы один символ, показываем overlay
   if (searchTerm.length > 0) {
      overlayElement.style.opacity = "1";
      overlayElement.style.display = "block";
   } else {
      overlayElement.style.opacity = "0";
      overlayElement.style.display = "none";
   }

   // Получаем все элементы .card-portrait-item
   const heroItems = document.querySelectorAll(".card-portrait-item");

   // Переменная для хранения найденных героев
   let foundHeroes = [];

   // Проходим по всем карточкам героев
   heroItems.forEach((item) => {
      // Получаем имя героя из атрибута data-hero-name
      const heroName =
         item.getAttribute("data-hero-name")?.trim().toLowerCase() || "";
      // Получаем альтернативное имя героя из атрибута data-hero-second-name
      const heroSecondName =
         item.getAttribute("data-hero-second-name")?.trim().toLowerCase() || "";

      // Проверяем на соответствие фрагменту имени или альтернативному имени
      const matchesName =
         heroName.includes(searchTerm) || heroSecondName.includes(searchTerm);

      // Проверяем на соответствие первым буквам каждого слова для основного имени
      const initialsMatch = heroName
         .split(" ")
         .map((word) => word.charAt(0).toLowerCase()) // Получаем первую букву каждого слова
         .join("") // Объединяем их в строку
         .includes(searchTerm);

      // Проверяем на соответствие первым буквам альтернативного имени
      const secondInitialsMatch = heroSecondName
         .split(" ")
         .map((word) => word.charAt(0).toLowerCase())
         .join("")
         .includes(searchTerm);

      // Если имя героя или альтернативное имя содержит введенный фрагмент или совпадает с инициалами
      if (matchesName || initialsMatch || secondInitialsMatch) {
         item.classList.add("serched");
         item.classList.remove("unserched");
         foundHeroes.push(heroName || heroSecondName); // Добавляем найденного героя в массив
      } else {
         item.classList.add("unserched");
         item.classList.remove("serched");
      }
   });

   // inputElementData.classList.add("portraits-list__search-data_animated");
   // console.log("Класс анимации добавлен");
   // setTimeout(() => {
   //    inputElementData.classList.remove("portraits-list__search-data_animated");
   //    console.log("Класс анимации удален");
   // }, 3000);

   // Выводим в консоль список найденных героев
   console.log("Найденные герои:", foundHeroes);
   console.log("SearchTerm", searchTerm);
}

// Функция для обработки нажатия клавиш
function handleKeydown(event) {
   // Проверяем, является ли нажатая клавиша буквой (a-z, A-Z) или Backspace
   if (event.key.length === 1 && event.key.match(/[a-zA-Zа-яА-Я]/)) {
      event.preventDefault(); // Останавливаем стандартное поведение ввода
      inputElement.value += event.key; // Добавляем символ в инпут
      inputElement.dispatchEvent(new Event("input")); // Принудительно вызываем событие 'input'
   } else if (event.key === "Backspace") {
      event.preventDefault(); // Останавливаем стандартное поведение
      inputElement.value = inputElement.value.slice(0, -1); // Удаляем последний символ из инпута
      inputElement.dispatchEvent(new Event("input")); // Принудительно вызываем событие 'input'
   }
}

// Функция для сброса поиска
function resetSearch() {
   // Очищаем поле ввода
   inputElement.value = "";

   // Скрываем overlay
   overlayElement.style.opacity = "0";
   overlayElement.style.display = "none";

   // Получаем все элементы .card-portrait-item
   const heroItems = document.querySelectorAll(".card-portrait-item");

   // Убираем классы serched и unserched у всех героев
   heroItems.forEach((item) => {
      item.classList.remove("serched");
      item.classList.remove("unserched");
   });
}

// Добавляем слушатель для нажатия клавиши Esc
document.addEventListener("keydown", (event) => {
   // Проверяем, если нажата клавиша Esc
   if (event.key === "Escape") {
      // Если overlay отображен, то сбрасываем поиск
      if (overlayElement.style.display === "block") {
         resetSearch();
      }
   }
});

// Навешиваем обработчик нажатия клавиш на документ
document.addEventListener("keydown", handleKeydown);

// Навешиваем событие на инпут для отслеживания изменений
inputElement.addEventListener("input", searchHeroes);

export {
   renderPortraits,
   updateHeroDisplay,
   updateAllHeroes,
   inputElement,
   searchHeroes,
};
