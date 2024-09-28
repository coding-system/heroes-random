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
import { showHeroes, renderDefaultHeroesList } from "./rolling.js";
import { addShowHeroData } from "./showhero.js";
import { renderPortraits } from "./portraits.js";
import { lastHeroes } from "./lastheroes.js";

export let currentSelectableHeroes = []; // Глобальная переменная
export let chosenIndex;

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

function getRandomElement(heroesArray) {
   disableChooseButton()
   // chooseButton.disabled = true;
   // chooseButtonText.textContent = "ROLLING";
   // // Находим элемент, у которого нужно изменить псевдоэлемент ::after
   // const btnTop = document.querySelector(".btn-top");

   // // Изменяем значения переменных
   // btnTop.style.setProperty("--color1", "#919191"); // Новый первый цвет
   // btnTop.style.setProperty("--color2", "#707070"); // Новый второй цвет
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

   saveChosenIndexToLocalStorage(randomHero);

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
   setTimeout(() => addShowHeroData(), 5750);
   // addShowHeroData();
   playAudio();
   // console.log(startHeroes);
   // console.log(currentLastHeroes);
   setTimeout(() => saveLastHeroesToLocalStorage(), 7500);
   setTimeout(() => saveStartHeroesToLocalStorage(), 7500);

   setTimeout(() => enableChooseButton(), 7000);
}

function playAudio() {
   const audio = document.querySelector(".song");
   if (songChanger.checked) {
      rouletteSong.volume = 0.5;
      // songChangerStatus = true;
   } else {
      rouletteSong.volume = 0;
      // songChangerStatus = false;
   }
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
   heroАlgorithmChanger.checked = false;
   windowList.innerHTML = "";
   lastHeroesList.innerHTML = "";

   // Перерендерим героев
   renderDefaultHeroesList(heroesArray);
   renderPortraits(heroesArray);

   console.log(`———————————————————————————————————————`);
   console.log("Список героев сброшен");
}

export { getRandomElement, resetHeroes };
