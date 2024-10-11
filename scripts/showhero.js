import {
   showHeroBox,
   startHeroes,
   saveLastHeroesToLocalStorage,
   saveStartHeroesToLocalStorage,
   showHeroBoxButtons
} from "../index.js";
import {
   currentSelectableHeroes,
   chosenIndex,
   getRandomElement,
   randomHero,
   deleteChosenHero
} from "./random.js";

import { closePopup } from "./modal.js";

import { renderLastHero } from "./rolling.js";

import { updatePortraits } from "./portraits.js";

export function addShowHeroData() {
   console.log(currentSelectableHeroes[chosenIndex]);
   const chosenHeroImage = currentSelectableHeroes[chosenIndex].image.replace(
      ".jpg",
      ""
   );
   const showHeroTitle = showHeroBox.querySelector(".show-hero__title");
   const showHeroVideo = showHeroBox.querySelector(".show-hero__video");

   showHeroTitle.textContent = currentSelectableHeroes[chosenIndex].name;

   // Обновить атрибуты poster, src для <video> и <source> тегов
   showHeroVideo.poster = `https://cdn.akamai.steamstatic.com/apps/dota2/videos/dota_react/heroes/renders/${chosenHeroImage}.png`;

   const sources = showHeroVideo.querySelectorAll("source");
   sources[0].src = `https://cdn.akamai.steamstatic.com/apps/dota2/videos/dota_react/heroes/renders/${chosenHeroImage}.mov`;
   sources[1].src = `https://cdn.akamai.steamstatic.com/apps/dota2/videos/dota_react/heroes/renders/${chosenHeroImage}.webm`;

   // Перезагрузка видео, чтобы изменения вступили в силу
   showHeroVideo.load();
}

export function acceptChosenHero() { // Принять
   deleteChosenHero(randomHero)
   renderLastHero()
   updatePortraits(startHeroes)
   saveLastHeroesToLocalStorage()
   saveStartHeroesToLocalStorage()
   closePopup(showHeroBox);
   console.log(startHeroes)
   
}

export function retryChosenHero() { // Reroll
   // renderLastHero()
   updatePortraits(startHeroes)
   saveLastHeroesToLocalStorage()
   saveStartHeroesToLocalStorage()
   closePopup(showHeroBox);
   getRandomElement(startHeroes)
}

// export function acceptAndDelChosenHero() { // Пропустить
//    renderLastHero();
//    updatePortraits(startHeroes);
//    saveLastHeroesToLocalStorage();
//    saveStartHeroesToLocalStorage();
//    closePopup(showHeroBox);
//    console.log(startHeroes)
// }