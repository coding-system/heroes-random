import { initialHeroes } from "./heroes.js";
import {
   heroАlgorithmChanger,
   windowList,
   lastHeroesList,
   songChanger,
   rouletteSong,
   roulette,
   box
} from "../index.js";
import { showHeroes } from "./rolling.js";
import { addShowHeroData } from "./showhero.js";
import { renderHeroes } from "./dialog.js";

export let updatedselectableHeroes = []; // Глобальная переменная
export let chosenIndex;

function getRandomElement(heroesArray) {
   // box.style.transform = `scale(1.3)`
   stopAudio();
   // Filter heroes with selected: true
   const selectableHeroes = heroesArray.filter((hero) => hero.selected);

   if (selectableHeroes.length === 0) {
      console.log(`———————————————————————————————————————`);
      console.log("Список героев для выборки пуст");
      resetHeroes(heroesArray);
      return;
   }

   // Randomly select a hero
   const randomIndex = Math.floor(Math.random() * selectableHeroes.length);
   const randomHero = selectableHeroes[randomIndex];

   // Log details about the selected hero
   console.log(`———————————————————————————————————————`);
   console.log(`Номер героя — ${randomIndex}`);
   console.log(`Имя героя — ${randomHero.name}`);
   console.log(`Кол-во героев в списке — ${selectableHeroes.length}`);

   // If heroАlgorithmChanger is checked, set the selected property of the chosen hero to false
   if (heroАlgorithmChanger.checked) {
      const heroIndex = heroesArray.findIndex(
         (hero) => hero.name === randomHero.name
      );
      if (heroIndex !== -1) {
         heroesArray[heroIndex].selected = false;
         console.log(`Герой ${randomHero.name} удален из выборки`);
         console.log(`Кол-во героев в списке — ${selectableHeroes.length}`);
      }
   }

   updatedselectableHeroes = [...selectableHeroes];
   // console.log("asdasdasd " + updatedselectableHeroes.length);
   // console.log(updatedselectableHeroes[randomIndex].name);
   // console.log(updatedselectableHeroes[randomIndex].selected);

   chosenIndex = randomIndex;

   renderHeroes(heroesArray);

   showHeroes();
   addShowHeroData();
   playAudio();
   
}

function playAudio() {
   // const audio = document.querySelector(".song");
   // Вкл/Выкл музыку при рулетке
   if (songChanger.checked) {
      console.log("Выключено");
      rouletteSong.volume = 1;
   } else {
      rouletteSong.volume = 0;
      console.log("Включено");
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
   renderHeroes(heroesArray);
   console.log(`———————————————————————————————————————`);
   console.log("Список героев сброшен");
}

export { getRandomElement, resetHeroes };
