// Универсальная функция для обработки ответа от сервера
function getResponse(response) {
   if (response.ok) {
     return response.json();  // Если запрос успешен, возвращаем данные в формате JSON
   }
   return Promise.reject(`Ошибка: ${response.status}`);  // Если запрос не успешен, возвращаем ошибку
 }
 
 // Функция для загрузки массива startHeroes с использованием getResponse
 export function loadStartHeroes() {
   return fetch('https://api.jsonbin.io/v3/b/66d8d31eacd3cb34a87e901e', {
     method: 'GET',
     headers: {
       'X-Master-Key': '$2a$10$ULERd0qF2V8y2h2DmhANEuCz2de4XeN9zc5Rex3EikRqpYQCeVsy6',  // Замените на ваш API-ключ, если требуется
       'Content-Type': 'application/json'
     }
   })
   .then(getResponse)  // Используем getResponse для обработки ответа
   .then(data => {
     return data.record.startHeroes;  // Возвращаем массив startHeroes
   })
   .catch(error => {
     console.error('Ошибка загрузки данных:', error);
     throw error;  // Пробрасываем ошибку дальше, если требуется обработка
   });
 }
 

 