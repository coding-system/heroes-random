import { initialHeroes } from "./heroes.js";
import {
   heroАlgorithmChanger,
   windowList,
   lastHeroesList,
   songChanger,
   rouletteSong,
   startHeroes,
   saveChosenIndexToLocalStorage
   // getInitialHeroes,
   // reloadStartHeroes
} from "../index.js";
import { showHeroes, renderDefaultHeroesList } from "./rolling.js";
import { addShowHeroData } from "./showhero.js";
import { renderPortraits } from "./portraits.js"; // Import updateHeroDisplay

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

   saveChosenIndexToLocalStorage(randomHero.name);

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

   // renderHeroes(heroesArray);
   setTimeout(() => renderPortraits(heroesArray), 8000);
   // renderPortraits(heroesArray)
   showHeroes();
   addShowHeroData();
   playAudio();
   console.log(startHeroes)
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
   stopAudio()
   // Сбрасываем массив startHeroes, копируя заново массив initialHeroes
   heroesArray.length = 0; // Очищаем массив startHeroes
   heroesArray.push(...JSON.parse(JSON.stringify(initialHeroes))); // Заполняем его копией initialHeroes
   heroАlgorithmChanger.checked = false;
   windowList.innerHTML = "";
   lastHeroesList.innerHTML = "";
   // renderHeroes(heroesArray);
   renderDefaultHeroesList(heroesArray)
   renderPortraits(heroesArray)
   console.log(`———————————————————————————————————————`);
   console.log("Список героев сброшен");
}

export { getRandomElement, resetHeroes };
