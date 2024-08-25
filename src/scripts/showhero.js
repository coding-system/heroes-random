import {
   // showHeroButton,
   // showHerocloseButton,
   showHeroBox,
} from "../index.js";
import {
   updatedselectableHeroes,
   chosenIndex,
} from "./random.js";

// document.addEventListener("DOMContentLoaded", function () {
//    showHeroButton.addEventListener("click", function () {
//       showHeroBox.classList.add("popup_is-opened");
//    });

//    showHerocloseButton.addEventListener("click", function () {
//       showHeroBox.classList.remove("popup_is-opened");
//    });
// });

export function addShowHeroData() {
   console.log(updatedselectableHeroes[chosenIndex]);
   const chosenHeroImage = updatedselectableHeroes[chosenIndex].image.replace(
      ".jpg",
      ""
   );
   const showHeroTitle = showHeroBox.querySelector(".show-hero__title");
   const showHeroVideo = showHeroBox.querySelector(".show-hero__video");

   showHeroTitle.textContent = updatedselectableHeroes[chosenIndex].name;

   // Обновить атрибуты poster, src для <video> и <source> тегов
   showHeroVideo.poster = `https://cdn.akamai.steamstatic.com/apps/dota2/videos/dota_react/heroes/renders/${chosenHeroImage}.png`;

   const sources = showHeroVideo.querySelectorAll("source");
   sources[0].src = `https://cdn.akamai.steamstatic.com/apps/dota2/videos/dota_react/heroes/renders/${chosenHeroImage}.mov`;
   sources[1].src = `https://cdn.akamai.steamstatic.com/apps/dota2/videos/dota_react/heroes/renders/${chosenHeroImage}.webm`;

   // Перезагрузка видео, чтобы изменения вступили в силу
   showHeroVideo.load();
}
