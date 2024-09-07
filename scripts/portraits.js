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
} from "../index.js";

// Универсальная функция для обновления отображения героя
function updateHeroDisplay(hero, cardBanned, cardLine, videoBanned) {
   if (hero.selected) {
      cardBanned.style.opacity = "0";
      cardLine.style.opacity = "0";
      videoBanned.style.opacity = "0";
   } else {
      cardBanned.style.opacity = "1";
      cardBanned.style["boxShadow"] = "inset 0 0 15px rgb(255, 0, 0), inset 0 0 5px rgb(0, 0, 0)";
      cardLine.style.opacity = "0";
      videoBanned.style.opacity = "1";
   }
}

// Функция для получения элемента карточки героя
function findHeroCard(hero) {
   let cardPortraitItem;
   switch (hero.attribute) {
      case "strength":
         cardPortraitItem = Array.from(portraitsstrengthList.children).find((item) =>
            item.querySelector(".card-portrait-video-name").textContent.includes(hero.name)
         );
         break;
      case "agility":
         cardPortraitItem = Array.from(portraitsagilityList.children).find((item) =>
            item.querySelector(".card-portrait-video-name").textContent.includes(hero.name)
         );
         break;
      case "intelligence":
         cardPortraitItem = Array.from(portraitsintelligenceList.children).find((item) =>
            item.querySelector(".card-portrait-video-name").textContent.includes(hero.name)
         );
         break;
      case "universal":
         cardPortraitItem = Array.from(portraitsuniversalList.children).find((item) =>
            item.querySelector(".card-portrait-video-name").textContent.includes(hero.name)
         );
         break;
   }
   return cardPortraitItem;
}

// Массовое обновление отображения всех героев
function updateAllHeroes(heroes, selectAll = true) {
   heroes.forEach((hero) => {
      hero.selected = selectAll;
   });

   heroes.forEach((hero) => {
      const cardPortraitItem = findHeroCard(hero);
      if (cardPortraitItem) {
         const cardBanned = cardPortraitItem.querySelector(".banned-overlay");
         const cardLine = cardPortraitItem.querySelector(".line");
         const videoBanned = cardPortraitItem.querySelector(".video-banned-overlay");
         updateHeroDisplay(hero, cardBanned, cardLine, videoBanned);
      }
   });
}

function renderPortraits(heroes) {
   portraitsstrengthList.innerHTML = "";
   portraitsagilityList.innerHTML = "";
   portraitsintelligenceList.innerHTML = "";
   portraitsuniversalList.innerHTML = "";

   heroes.forEach((hero) => {
      const cardPortraitItem = cardPortraitTemplate.cloneNode(true);
      const cardPortraitImage = cardPortraitItem.querySelector(".card-portrait-image-content");
      const cardPortraitHoverVideo = cardPortraitItem.querySelector(".card-portrait-video-content");
      const cardPortraitHoverName = cardPortraitItem.querySelector(".card-portrait-video-name");
      const cardBanned = cardPortraitItem.querySelector(".banned-overlay");
      const videoBanned = cardPortraitItem.querySelector(".video-banned-overlay");
      const cardLine = cardPortraitItem.querySelector(".line");

      const heroName = hero.image.replace(".jpg", "");
      const videoSrc = `./assets/heroes/portraits/npc_dota_hero_${heroName}.webm`;

      cardPortraitImage.src = `./assets/heroes/pictures/npc_dota_hero_${heroName}.jpg`;
      cardPortraitHoverVideo.src = videoSrc;
      cardPortraitHoverName.textContent = hero.name;

      cardPortraitItem.addEventListener("mouseenter", () => {
         cardPortraitHoverVideo.play();
      });

      cardPortraitItem.addEventListener("mouseleave", () => {
         cardPortraitHoverVideo.pause();
      });

      // Обновляем отображение стилей
      updateHeroDisplay(hero, cardBanned, cardLine, videoBanned);

      cardPortraitItem.addEventListener("click", () => {
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
   const greenLight = portraitsList.querySelector(".light-spark");

   selectAllButton.addEventListener("click", () => {
      updateAllHeroes(heroes, true);
      greenLight.classList.add("green-light-spark");
      setTimeout(() => greenLight.classList.remove("green-light-spark"), 500);
   });

   banAllButton.addEventListener("click", () => {
      updateAllHeroes(heroes, false);
      greenLight.classList.add("red-light-spark");
      setTimeout(() => greenLight.classList.remove("red-light-spark"), 500);
   });
}

export { renderPortraits, updateHeroDisplay, findHeroCard, updateAllHeroes };