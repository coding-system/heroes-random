// import { initialHeroes } from "./heroes.js";
import {
   heroАlgorithmChanger,
   windowList,
   lastHeroesList,
   songChanger,
   rouletteSong,
   startHeroes,
   getInitialHeroes,
   reloadStartHeroes
} from "../index.js";
import { renderHeroesList, showHeroes, renderDefaultHeroesList } from "./rolling.js";
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
   stopAudio();
   heroesArray.length = 0; // Очищаем массив
   
   // Загружаем данные с сервера и обновляем heroesArray
   getInitialHeroes().then((serverHeroes) => {
      heroesArray.push(...serverHeroes); // Добавляем героев из сервера
      reloadStartHeroes(serverHeroes); // Обновляем startHeroes через отдельную функцию
      console.log('heroesArray после загрузки с сервера:', heroesArray);
      
      heroАlgorithmChanger.checked = false;
      windowList.innerHTML = "";
      lastHeroesList.innerHTML = "";
      
      // Рендерим портреты после обновления массива
      renderPortraits(heroesArray);
      renderDefaultHeroesList(serverHeroes)
      console.log("Список героев сброшен и обновлён данными с сервера");
   }).catch((err) => {
      console.error('Ошибка при сбросе героев:', err);
   });
}

export { getRandomElement, resetHeroes };
