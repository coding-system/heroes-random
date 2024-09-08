const rangeInput = document.querySelector("#rangeInput");
const yesBox = document.querySelector(".chanses-box-yes");
const noBox = document.querySelector(".chanses-box-no");
const goLastSubmit = document.querySelector(".go-last__button");
const goLastResult = document.querySelector(".go-last__result");

// Получаем каждый span элемент для отображения цифр
const resultOne = document.querySelector(".go-last__result-one");
const resultTwo = document.querySelector(".go-last__result-two");
const resultThree = document.querySelector(".go-last__result-three");

export function updateRange() {
   const yesValue = rangeInput.value;
   const noValue = rangeInput.max - yesValue;
   const percentage =
      ((yesValue - rangeInput.min) / (rangeInput.max - rangeInput.min)) * 100;

   // Обновляем градиент ползунка
   rangeInput.style.background = `linear-gradient(to right, green ${percentage}%, red ${percentage}%)`;

   // Обновляем значение, выводимое на ползунке
   rangeInput.setAttribute("yesValue", yesValue);
   rangeInput.setAttribute("noValue", noValue);

   // Обновляем значения в элементах
   yesBox.textContent = yesValue;
   noBox.textContent = noValue;
}

rangeInput.addEventListener("input", updateRange);

export function getGolastResult() {
   const yesValue = rangeInput.getAttribute("yesValue");
   const randIndex = Math.ceil(Math.random() * rangeInput.max);
   showGoLastResult(randIndex, yesValue);
}

export function showGoLastResult(randIndex, yesValue) {
   // Преобразуем randIndex в строку с тремя символами
   const randIndexStr = randIndex.toString().padStart(3, "0");

   // Устанавливаем первоначальные значения без анимации
   resultOne.style.transform = "translateY(100%)";
   resultTwo.style.transform = "translateY(100%)";
   resultThree.style.transform = "translateY(100%)";

   resultOne.style.opacity = "0";
   resultTwo.style.opacity = "0";
   resultThree.style.opacity = "0";

   // Устанавливаем каждую цифру
   setTimeout(() => {
      resultOne.textContent = randIndexStr[0];
   }, 500); // Немедленно
   setTimeout(() => {
      resultTwo.textContent = randIndexStr[1];
   }, 500); // Немедленно
   setTimeout(() => {
      resultThree.textContent = randIndexStr[2];
   }, 500); // Немедленно
   //  resultOne.textContent = randIndexStr[0];
   //  resultTwo.textContent = randIndexStr[1];
   //  resultThree.textContent = randIndexStr[2];

   // Устанавливаем цвет результата
   // if (randIndex <= yesValue) {
   //    goLastResult.style.color = "green";
   // } else {
   //    goLastResult.style.color = "red";
   // }

   // Запускаем анимацию с задержкой
   setTimeout(() => {
      resultThree.style.transform = "translateY(0)";
      resultThree.style.opacity = "1";
   }, 500); // Немедленно

   setTimeout(() => {
      resultTwo.style.transform = "translateY(0)";
      resultTwo.style.opacity = "1";
   }, 1700); // Через 1 секунду

   setTimeout(() => {
      resultOne.style.transform = "translateY(0)";
      resultOne.style.opacity = "1";
   }, 1000); // Через 2 секунды
}

goLastSubmit.addEventListener("click", getGolastResult);
