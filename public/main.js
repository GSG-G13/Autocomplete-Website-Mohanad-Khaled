let countryInput = document.querySelector(".country-input");
let resultsContainer = document.querySelector(".result-container");
let xhr = new XMLHttpRequest();
countryInput.addEventListener("input", () => {
  xhr.onreadystatechange = () => {
    if (xhr.readyState === 4 && xhr.status === 200) {
      let response = JSON.parse(xhr.responseText);
      if (countryInput.value) {
        let filtered = response.filter((x) =>
          x.name.toLowerCase().includes(countryInput.value.toLowerCase())
        );
        resultsContainer.innerHTML = "";
        filtered.forEach((el) => {
          let li = document.createElement("li");
          li.textContent = el.name;
          li.setAttribute("value", el.name);
          resultsContainer.appendChild(li);
          li.addEventListener("click", () => {
            xhr.onreadystatechange = function () {
              if (xhr.readyState === 4 && xhr.status === 200) {
                let response = JSON.parse(xhr.responseText);
                console.log(response);
              }
            };
            xhr.open(
              "GET",
              `https://api.openweathermap.org/data/2.5/weather?q=${li.textContent}&appid=07975b6284106c9be0051b263f218d66`
            );
            xhr.send();
          });
        });
      } else {
        let emptySearch = [];
        resultsContainer.innerHTML = "";
        emptySearch.forEach((el) => {
          let li = document.createElement("li");
          li.textContent = el.name;
          li.setAttribute("value", `${el.name}`);
          resultsContainer.appendChild(li);
        });
      }
    }
  };
  xhr.open("GET", "../src/data/countries.json");
  xhr.send();
});
