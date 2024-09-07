




import { currentSelectableHeroes, chosenIndex } from "./random.js";
import {
   windowList,
   windowHeroTemplate,
   lastHeroesList,
   lastHeroTemplate,
} from "../index.js";
import { showHeroBox} from "../index.js";
export function yo() {
   console.log(typeof currentSelectableHeroes);
   console.log(currentSelectableHeroes.length);
   console.log(currentSelectableHeroes[chosenIndex]);
}

const displayedHeroIndex = 15;
const totalArrayNumber = displayedHeroIndex * 2 + 1

// const windowItemsWidth = document.querySelector('.window__item').offsetWidth;
// const windowItemsLength = document.querySelectorAll('.window__item').length

export function showHeroes() {
   windowList.innerHTML = "";
   windowList.classList.remove("window__list-animated");
   const displayedHeroes = new Array(totalArrayNumber);

   // Проходим по каждому элементу массива displayedHeroes
   for (let i = 0; i < displayedHeroes.length; i++) {
      // Если текущий индекс равен 15, присваиваем значение chosenIndex
      if (i === displayedHeroIndex) {
         displayedHeroes[displayedHeroIndex] =
            currentSelectableHeroes[chosenIndex].image;
      } else {
         // Выбираем рандомный индекс из массива currentSelectableHeroes
         const randomIndex = Math.floor(
            Math.random() * currentSelectableHeroes.length
         );
         //   console.log(displayedHeroes);
         // displayedHeroes[i] = i;
         // Присваиваем значение изображения из currentSelectableHeroes[randomIndex]
         displayedHeroes[i] = currentSelectableHeroes[randomIndex].image;
      }
   }

   // Calculete the width of last window__item from random
   const windowItemsLastWidth = Math.floor(
      Math.random() * 342
   );

   displayedHeroes.forEach((hero) => {
      const windowHeroItem = windowHeroTemplate.cloneNode(true); // Клонируем шаблон для каждого героя
      const windowHeroUl = windowHeroItem.querySelector(".window__item");
      windowHeroUl.style.backgroundImage = `url("./assets/heroes/${hero}")`;

      const windowBox = windowHeroItem.querySelector('.window__box');
      // Добавляем класс в зависимости от значения rand
      if (windowItemsLastWidth % 2 === 0) {
         windowBox.classList.add('window__box-odd');
      } else {
         windowBox.classList.add('window__box-even');
      }

      windowList.appendChild(windowHeroItem);

      ///
   });

   const lastHeroItem = lastHeroTemplate.cloneNode(true); // Клонируем шаблон для каждого героя
   const lastHeroUl = lastHeroItem.querySelector(".last-heroes__item");
   lastHeroUl.style.backgroundImage = `url("./assets/heroes/${displayedHeroes[displayedHeroIndex]}")`;
   // lastHeroesList.prepend(lastHeroItem);
   setTimeout(() => {
      lastHeroesList.prepend(lastHeroItem)
   }, 4500);

   // Calculate the width and length of window__items after rendering them
   const windowItemsWidth = document.querySelector(".window__item").offsetWidth;
   const windowItemsLength = document.querySelectorAll(".window__item").length;
   console.log(`Колво итемов - ${windowItemsLength}`);
   console.log(`Ширина итема - ${windowItemsWidth}`);

   // Calculate the total width of all window items
   const totalWidth = windowItemsWidth * (displayedHeroIndex - 1) + 128 + windowItemsLastWidth;
   // 132 474

   // Reset transform before starting the animation
   windowList.style.transform = `translateX(0)`;

   // Use requestAnimationFrame to ensure smooth transitions
   requestAnimationFrame(() => {
      windowList.classList.add("window__list-animated");
      windowList.style.transform = `translateX(-${totalWidth}px)`;
   });
   
   function showHeroWindow() {
   setTimeout(() => showHeroBox.classList.add("popup_is-opened"), 4500);
}

   showHeroWindow()

   // Выводим все элементы массива displayedHeroes в консоль
   yo();
   console.log(displayedHeroes);
   console.log(
      `Выбранный герой в рулетке - ${displayedHeroes[displayedHeroIndex]}`
   );
   console.log(`Длина начального массива ${currentSelectableHeroes.length}`);
   console.log(`Колво итемов - ${windowItemsLength}`)
   console.log(`Ширина итема - ${windowItemsWidth}`)
   console.log(`Ширина последнего - ${windowItemsLastWidth}`)
}
