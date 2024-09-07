const rangeInput = document.querySelector('#rangeInput');
const yesBox = document.querySelector('.chanses-box-yes');
const noBox = document.querySelector('.chanses-box-no');
const goLastSubmit = document.querySelector('.go-last__button');
const goLastResult = document.querySelector('.go-last__result');

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
   const yesValue = rangeInput.getAttribute('yesValue');
   const randIndex = Math.ceil(Math.random() * rangeInput.max);
   showGoLastResult(randIndex, yesValue);
}

export function showGoLastResult(randIndex, yesValue) {
   goLastResult.textContent = randIndex
   if (randIndex <= yesValue) {
       goLastResult.style.color = 'green';
   } else {
      goLastResult.style.color = 'red';
   }
}

goLastSubmit.addEventListener('click', getGolastResult);
