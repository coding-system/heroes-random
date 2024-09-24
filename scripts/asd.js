function updatePortraits(heroes) {
   // Очищаем списки перед добавлением новых элементов
   portraitsstrengthList.innerHTML = "";
   portraitsagilityList.innerHTML = "";
   portraitsintelligenceList.innerHTML = "";
   portraitsuniversalList.innerHTML = "";

   heroes.forEach((hero) => {
      const cardPortraitItem = cardPortraitTemplate.cloneNode(true); // Клонируем шаблон для каждого героя
      const cardPortraitImage = cardPortraitItem.querySelector(
         ".card-portrait-image-content"
      );
      const cardPortraitHoverVideo = cardPortraitItem.querySelector(
         ".card-portrait-video-content"
      );
      const cardPortraitButton = cardPortraitItem.querySelector(
         ".card-portrait-item"
      );
      const cardPortraitHoverName = cardPortraitItem.querySelector(
         ".card-portrait-video-name"
      );
      const cardBanned = cardPortraitItem.querySelector(".banned-overlay");
      const videoBanned = cardPortraitItem.querySelector(
         ".video-banned-overlay"
      );
      const cardLine = cardPortraitItem.querySelector(".line");

      const heroName = hero.image.replace(".jpg", "");

      const videoSrc = `./assets/heroes/portraits/npc_dota_hero_${heroName}.webm`;

      cardPortraitImage.src = `./assets/heroes/pictures/npc_dota_hero_${heroName}.jpg`;
      cardPortraitHoverVideo.src = videoSrc;
      cardPortraitHoverName.textContent = hero.name;

      cardPortraitButton.addEventListener("mouseenter", () => {
         cardPortraitHoverVideo.play();
      });

      cardPortraitButton.addEventListener("mouseleave", () => {
         cardPortraitHoverVideo.pause();
      });

      // Обновляем отображение стилей в зависимости от состояния hero.selected
      updateHeroDisplay(hero, cardBanned, cardLine, videoBanned);

      // Обработчик клика на элемент видео для переключения состояния героя
      cardPortraitButton.addEventListener("click", () => {
         hero.selected = !hero.selected;
         updateHeroDisplay(hero, cardBanned, cardLine, videoBanned);
         console.log(`${hero.name} => ${hero.selected}`);
      });

      switch (hero.attribute) {
         case "strength":
            portraitsstrengthList.appendChild(cardPortraitItem);
            break;
         case "agility":
            portraitsagilityList.appendChild(cardPortraitItem);
            break;
         case "intelligence":
            portraitsintelligenceList.appendChild(cardPortraitItem);
            break;
         case "universal":
            portraitsuniversalList.appendChild(cardPortraitItem);
            break;
      }
   });

   const selectAllButton = portraitsList.querySelector(".select-all");
   const banAllButton = portraitsList.querySelector(".ban-all");
   const saveMyBansButton = portraitsList.querySelector(".save-bans");
   const loadMyBansButton = portraitsList.querySelector(".load-bans");
   const lightSpark = portraitsList.querySelector(".light-spark");

   // Выбор всех героев
   selectAllButton.addEventListener("click", () => {
      updateAllHeroes(heroes, true);
      lightSpark.classList.add("green-light-spark");
      setTimeout(() => lightSpark.classList.remove("green-light-spark"), 500);
   });

   // Бан всех героев
   banAllButton.addEventListener("click", () => {
      updateAllHeroes(heroes, false);
      lightSpark.classList.add("red-light-spark");
      setTimeout(() => lightSpark.classList.remove("red-light-spark"), 500);
   });

   saveMyBansButton.addEventListener('click', () => {
      saveMyBansToLocalStorage()
      lightSpark.classList.add("blue-light-spark");
      setTimeout(() => lightSpark.classList.remove("blue-light-spark"), 500);
   })

   loadMyBansButton.addEventListener('click', () => {
      loadMyBansFromLocalStorage()
      renderPortraits(startHeroes)
      lightSpark.classList.add("yellow-light-spark");
      setTimeout(() => lightSpark.classList.remove("yellow-light-spark"), 500);
   })
}