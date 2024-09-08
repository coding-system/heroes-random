import { initialHeroes } from "./heroes.js";
import {
   heroАlgorithmChanger,
   windowList,
   lastHeroesList,
   songChanger,
   rouletteSong,
} from "../index.js";
import { showHeroes } from "./rolling.js";
import { addShowHeroData } from "./showhero.js";
import { renderPortraits, updateHeroDisplay } from "./portraits.js"; // Import updateHeroDisplay

export let currentSelectableHeroes = []; // Глобальная переменная
export let chosenIndex;

function getRandomElement(heroesArray) {
   stopAudio();
   const selectableHeroes = heroesArray.filter((hero) => hero.selected);

   if (selectableHeroes.length === 0) {
      console.log("Список героев для выборки пуст");
      resetHeroes(heroesArray);
      return;
   }

   const randomIndex = Math.floor(Math.random() * selectableHeroes.length);
   const randomHero = selectableHeroes[randomIndex];

   console.log(`Номер героя — ${randomIndex}`);
   console.log(`Имя героя — ${randomHero.name}`);

   // If heroАlgorithmChanger is checked, set the selected property of the chosen hero to false
   if (heroАlgorithmChanger.checked) {
      const heroIndex = heroesArray.findIndex(
         (hero) => hero.name === randomHero.name
      );
      if (heroIndex !== -1) {
         heroesArray[heroIndex].selected = false;
         console.log(`Герой ${randomHero.name} удален из выборки`);
      }
   }

   currentSelectableHeroes = [...selectableHeroes];
   chosenIndex = randomIndex;

   // Instead of re-rendering everything, just update the specific hero's display
   const cardPortraitItem = document.querySelector(
      `[data-hero-name="${randomHero.name}"]`
   );

   if (cardPortraitItem) {
      const cardBanned = cardPortraitItem.querySelector(".banned-overlay");
      const cardLine = cardPortraitItem.querySelector(".line");
      const videoBanned = cardPortraitItem.querySelector(".video-banned-overlay");

      updateHeroDisplay(randomHero, cardBanned, cardLine, videoBanned);
   }

   showHeroes();
   addShowHeroData();
   playAudio();
}

function playAudio() {
   const audio = document.querySelector(".song");
   if (songChanger.checked) {
      rouletteSong.volume = 1;
   } else {
      rouletteSong.volume = 0;
   }
   rouletteSong.play();
}

function stopAudio() {
   rouletteSong.pause();
   rouletteSong.currentTime = 0;
}

function resetHeroes(heroesArray) {
   stopAudio();
   heroesArray.length = 0;
   heroesArray.push(...JSON.parse(JSON.stringify(initialHeroes)));
   heroАlgorithmChanger.checked = false;
   windowList.innerHTML = "";
   lastHeroesList.innerHTML = "";
   renderPortraits(heroesArray);
   console.log("Список героев сброшен");
}

export { getRandomElement, resetHeroes };
