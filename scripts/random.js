import { initialHeroes } from "./heroes.js";
import {
   heroАlgorithmChanger,
   windowList,
   lastHeroesList,
   songChanger,
   rouletteSong,
   startHeroes,
   saveChosenIndexToLocalStorage,
   saveLastHeroesToLocalStorage,
   saveStartHeroesToLocalStorage,
   currentLastHeroes,
   songChangerStatus,
   chooseButton,
   chooseButtonText,
   btnTop,
   btnBottom
   // getInitialHeroes,
   // reloadStartHeroes
} from "../index.js";
import { showHeroes, showHeroWindow, renderDefaultHeroesList } from "./rolling.js";
import { addShowHeroData } from "./showhero.js";
import { renderPortraits, updatePortraits } from "./portraits.js";
import { lastHeroes } from "./lastheroes.js";

export let currentSelectableHeroes = []; // Глобальная переменная
export let chosenIndex;
export let randomHero;

function disableChooseButton() {
   chooseButton.disabled = true;
   chooseButtonText.textContent = "ROLLING";

   btnTop.style.setProperty("--color1", "#919191"); // Новый первый цвет
   btnTop.style.setProperty("--color2", "#707070"); // Новый второй цвет
   btnBottom.style.setProperty("--color3", "#3c3c3c"); // Новый второй цвет
}

function enableChooseButton() {
   chooseButton.disabled = false;
   chooseButtonText.textContent = "ROLL";

   btnTop.style.setProperty("--color1", "#cd3f64"); // Новый первый цвет
   btnTop.style.setProperty("--color2", "#9d3656"); // Новый второй цвет
   btnBottom.style.setProperty("--color3", "#803"); // Новый второй цвет
}

export function deleteChosenHero(chosenHero) {
   if (chosenHero) { // Проверяем, был ли выбран герой
      const heroIndex = startHeroes.findIndex(
         (hero) => hero.name === chosenHero.name
      );
      if (heroIndex !== -1) {
         startHeroes[heroIndex].selected = false; // Меняем selected на false
         console.log(`Герой ${chosenHero.name} удален из выборки`);
      }
   }
}

function getRandomElement(heroesArray) {
   disableChooseButton();
   stopAudio();

   const selectableHeroes = heroesArray.filter((hero) => hero.selected);

   if (selectableHeroes.length === 0) {
      console.log("Список героев для выборки пуст");
      resetHeroes(heroesArray);
      return;
   }

   const randomIndex = Math.floor(Math.random() * selectableHeroes.length);
   randomHero = selectableHeroes[randomIndex]; // Сохраняем выбранного героя

   console.log(`Номер героя — ${randomIndex}`);
   console.log(`Имя героя — ${randomHero.name}`);

   saveChosenIndexToLocalStorage(randomHero);

   currentSelectableHeroes = [...selectableHeroes];
   chosenIndex = randomIndex;

   showHeroes();
   setTimeout(() => addShowHeroData(), 5750);
   setTimeout(() => showHeroWindow(), 5750);
   playAudio();

   setTimeout(() => enableChooseButton(), 7000);
}

function playAudio() {
   // if (songChanger.checked) {
   //    rouletteSong.volume = 0.5;
   //    // songChangerStatus = true;
   // } else {
   //    rouletteSong.volume = 0;
   //    // songChangerStatus = false;
   // }
   rouletteSong.play();
}

function stopAudio() {
   rouletteSong.pause();
   rouletteSong.currentTime = 0;
}

function resetHeroes(heroesArray) {
   stopAudio();

   // Сбрасываем массив startHeroes, копируя заново массив initialHeroes
   heroesArray.length = 0;
   heroesArray.push(...JSON.parse(JSON.stringify(initialHeroes)));

   // Сбрасываем массив currentLastHeroes к начальному состоянию
   currentLastHeroes.length = 0;
   currentLastHeroes.push(...JSON.parse(JSON.stringify(lastHeroes))); // Глубокая копия lastHeroes

   // Сохраняем текущие lastHeroes
   saveLastHeroesToLocalStorage();
   saveStartHeroesToLocalStorage();

   // Сброс интерфейса
   // heroАlgorithmChanger.checked = false;
   windowList.innerHTML = "";
   lastHeroesList.innerHTML = "";

   // Перерендерим героев
   renderDefaultHeroesList(heroesArray);
   renderPortraits(heroesArray);

   console.log(`———————————————————————————————————————`);
   console.log("Список героев сброшен");
}

export { getRandomElement, resetHeroes };
