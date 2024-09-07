fetch("https://api.jsonbin.io/v3/b/66d8d31eacd3cb34a87e901e", {
   method: "GET",
   headers: {
      "X-Master-Key":
         "$2a$10$ULERd0qF2V8y2h2DmhANEuCz2de4XeN9zc5Rex3EikRqpYQCeVsy6",
      "Content-Type": "application/json",
   },
})
   .then((response) => response.json())
   .then((data) => {
      console.log("Данные из JSONBin:", data);
   })
   .catch((error) => console.error("Ошибка:", error));

