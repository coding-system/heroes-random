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
import { updateHeroDisplay, findHeroCard } from "./portraits.js";

export let currentSelectableHeroes = [];
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
   console.log(`Кол-во героев в списке — ${selectableHeroes.length}`);

   if (heroАlgorithmChanger.checked) {
      const heroIndex = heroesArray.findIndex(
         (hero) => hero.name === randomHero.name
      );
      if (heroIndex !== -1) {
         heroesArray[heroIndex].selected = false;
         console.log(`Герой ${randomHero.name} удален из выборки`);

         // Обновляем карточку героя
         const cardPortraitItem = findHeroCard(heroesArray[heroIndex]);
         if (cardPortraitItem) {
            const cardBanned =
               cardPortraitItem.querySelector(".banned-overlay");
            const cardLine = cardPortraitItem.querySelector(".line");
            const videoBanned = cardPortraitItem.querySelector(
               ".video-banned-overlay"
            );

            setTimeout(() => {
               updateHeroDisplay(
                  heroesArray[heroIndex],
                  cardBanned,
                  cardLine,
                  videoBanned
               );
            }, 5750);
         }
      }
   }

   currentSelectableHeroes = [...selectableHeroes];
   chosenIndex = randomIndex;

   showHeroes();
   addShowHeroData();
   playAudio();
}

function playAudio() {
   if (songChanger.checked) {
      console.log("Музыка выключена");
      rouletteSong.volume = 1;
   } else {
      rouletteSong.volume = 0;
      console.log("Музыка включена");
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
