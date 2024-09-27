const rangeInput = document.querySelector("#rangeInput");
const yesBox = document.querySelector(".chanses-box-yes");
const noBox = document.querySelector(".chanses-box-no");
const goLastSubmit = document.querySelector(".go-last__button");
const goLastResult = document.querySelector(".go-last__result_number");

// Получаем каждый span элемент для отображения цифр
const resultOne = document.querySelector(".go-last__result-one");
const resultTwo = document.querySelector(".go-last__result-two");
const resultThree = document.querySelector(".go-last__result-three");
const resultText = document.querySelector(".go-last__result-text");

export function updateRange() {
   goLastResult.style.transition = "1.2s ease";
   resultText.style.transition = "0.4s ease";
   // goLastResult.style.transform = "translateY(0)";
   // resultText.style.transform = "translateY(0)";
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
   yesBox.textContent = `${yesValue / 10}%`;
   noBox.textContent = `${noValue / 10}%`;
}

rangeInput.addEventListener("input", updateRange);

export function getGolastResult() {
   goLastSubmit.disabled = true;
   goLastResult.style.color = "black";
   const yesValue = rangeInput.getAttribute("yesValue");
   const randIndex = Math.floor(Math.random() * rangeInput.max);
   showGoLastResult(randIndex, yesValue);
   setTimeout(() => (goLastSubmit.disabled = false), 3000);
}

export function showGoLastResult(randIndex, yesValue) {
   goLastResult.style.opacity = "1";
   // goLastResult.style.transition = "3s ease";
   resultText.style.opacity = "0";
   resultText.style.scale = "2";
   // resultText.style.transition = "3s ease";
   goLastResult.style.transform = "translateY(-50%)";
   resultText.style.transform = "translateY(50%)";
   // Преобразуем randIndex в строку с тремя символами
   const randIndexStr = randIndex.toString().padStart(3, "0");

   // Функция для анимации цифр, которая будет показывать случайные числа и останавливаться на целевом числе
   function animateDigit(resultElement, targetDigit, delay) {
      let lastDigit = -1; // Переменная для хранения последней цифры
      let currentDigit = 0; // Начальная цифра
      resultElement.textContent = currentDigit; // Устанавливаем стартовую цифру

      const interval = setInterval(() => {
         // Генерируем случайную цифру от 0 до 9, проверяя, что она не совпадает с последней
         do {
            currentDigit = Math.floor(Math.random() * 10);
         } while (currentDigit === lastDigit); // Повторяем, пока цифра совпадает с предыдущей

         lastDigit = currentDigit; // Обновляем последнюю цифру
         resultElement.textContent = currentDigit; // Показываем эту цифру
      }, 10); // Интервал смены цифр (0.1 сек)

      // Остановка на целевом числе через заданную задержку
      setTimeout(() => {
         clearInterval(interval); // Останавливаем прокрутку случайных цифр
         resultElement.textContent = targetDigit; // Устанавливаем финальное значение
      }, delay);
   }

   // Запускаем анимацию для каждой цифры с разной задержкой
   animateDigit(resultThree, randIndexStr[2], 1000); // Третий элемент останавливается через 1 секунду
   animateDigit(resultTwo, randIndexStr[1], 2000); // Второй элемент останавливается через 2 секунды
   animateDigit(resultOne, randIndexStr[0], 3000); // Первый элемент останавливается через 3 секунды

   // Устанавливаем цвет результата
   if (randIndex <= yesValue) {
      resultText.textContent = "ДА";
      setTimeout(() => {
         goLastResult.style.opacity = "0";
         resultText.style.opacity = "1";
         goLastResult.style.transform = "translateY(-100%)";
         resultText.style.transform = "translateY(0)";
         resultText.style.scale = "1";
         goLastResult.style.color = "green";
         resultText.style.color = "green";
         // resultText.textContent = "YES";
      }, 3000);
         
   } else {
      resultText.textContent = "НЕТ";
      setTimeout(() => {
         goLastResult.style.opacity = "0";
         resultText.style.opacity = "1";
         goLastResult.style.transform = "translateY(-100%)";
         resultText.style.transform = "translateY(0)";
         resultText.style.scale = "1";
         goLastResult.style.color = "red";
         resultText.style.color = "red";
         // resultText.textContent = "NO";
      }, 3000);
         
   }
}

goLastSubmit.addEventListener("click", getGolastResult);
