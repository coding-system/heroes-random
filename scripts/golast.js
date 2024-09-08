const rangeInput = document.querySelector('#rangeInput');
const yesBox = document.querySelector('.chanses-box-yes');
const noBox = document.querySelector('.chanses-box-no');
const goLastSubmit = document.querySelector('.go-last__button');
const goLastResult = document.querySelector('.go-last__result');

// Получаем каждый span элемент для отображения цифр
const resultOne = document.querySelector('.go-last__result-one');
const resultTwo = document.querySelector('.go-last__result-two');
const resultThree = document.querySelector('.go-last__result-three');

export function updateRange() {
    const yesValue = rangeInput.value;
    const noValue = rangeInput.max - yesValue;
    const percentage = (yesValue - rangeInput.min) / (rangeInput.max - rangeInput.min) * 100;
    
    // Обновляем градиент ползунка
    rangeInput.style.background = `linear-gradient(to right, green ${percentage}%, red ${percentage}%)`;
    
    // Обновляем значение, выводимое на ползунке
    rangeInput.setAttribute('yesValue', yesValue);
    rangeInput.setAttribute('noValue', noValue);

    // Обновляем значения в элементах
    yesBox.textContent = yesValue;
    noBox.textContent = noValue;
}

rangeInput.addEventListener('input', updateRange);

export function getGolastResult() {
   goLastResult.style.color = 'black';
    const yesValue = rangeInput.getAttribute('yesValue');
    const randIndex = Math.floor(Math.random() * rangeInput.max);
    console.log(`Generated random index: ${randIndex}`); // Для отладки
    showGoLastResult(randIndex, yesValue);
}

export function showGoLastResult(randIndex, yesValue) {
    // Преобразуем randIndex в строку с тремя символами
    const randIndexStr = randIndex.toString().padStart(3, '0');
    console.log(`randIndexStr: ${randIndexStr}`); // Лог для отладки

    // Функция для анимации цифр, которая будет показывать случайные числа и останавливаться на целевом числе
    function animateDigit(resultElement, targetDigit, delay) {
        let lastDigit = -1; // Переменная для хранения последней цифры
        let currentDigit = 0; // Начальная цифра
        resultElement.textContent = currentDigit; // Устанавливаем стартовую цифру
        console.log(`Start animating ${resultElement.className} to ${targetDigit}`); // Лог для отладки

        const interval = setInterval(() => {
            // Генерируем случайную цифру от 0 до 9, проверяя, что она не совпадает с последней
            do {
                currentDigit = Math.floor(Math.random() * 10);
            } while (currentDigit === lastDigit); // Повторяем, пока цифра совпадает с предыдущей

            lastDigit = currentDigit; // Обновляем последнюю цифру
            resultElement.textContent = currentDigit; // Показываем эту цифру
        }, 50); // Интервал смены цифр (0.1 сек)

        // Остановка на целевом числе через заданную задержку
        setTimeout(() => {
            clearInterval(interval); // Останавливаем прокрутку случайных цифр
            resultElement.textContent = targetDigit; // Устанавливаем финальное значение
            console.log(`Stopped animating ${resultElement.className}, final digit: ${targetDigit}`); // Лог для отладки
        }, delay);
    }

    // Запускаем анимацию для каждой цифры с разной задержкой
    animateDigit(resultThree, randIndexStr[2], 1500); // Третий элемент останавливается через 1 секунду
    animateDigit(resultTwo, randIndexStr[1], 2500); // Второй элемент останавливается через 2 секунды
    animateDigit(resultOne, randIndexStr[0], 3500); // Первый элемент останавливается через 3 секунды

    // Устанавливаем цвет результата
    if (randIndex <= yesValue) {
      //   goLastResult.style.color = 'green';
        setTimeout(() => {
         goLastResult.style.color = 'green'}, 3500);
    } else {
      //   goLastResult.style.color = 'red';
        setTimeout(() => {
         goLastResult.style.color = 'red'}, 3500);
    }
}

goLastSubmit.addEventListener('click', getGolastResult);
