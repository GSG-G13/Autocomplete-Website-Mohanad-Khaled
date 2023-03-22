let countryInput = document.querySelector(".country-input");
let resultsContainer = document.querySelector(".result-container");
let formOutputs = document.querySelector(".form-outputs");
let weatherResults = document.querySelector(".weather-results");
let countryBtn = document.querySelector(".country-btn");
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
            countryInput.value = li.textContent;
            formOutputs.style.height = "45px";
            countryBtn.addEventListener("click", () => {
              let countryInputValue = countryInput.value;
              xhr.onreadystatechange = function () {
                if (xhr.readyState === 4 && xhr.status === 200) {
                  let response = [JSON.parse(xhr.responseText)];
                  response.forEach((el) => {
                    let weatherDiv = createElement("div", "weather");
                    let countryDiv = createElement("div", "country");
                    let countryName = createElement("p", "country-name");
                    countryName.textContent = "Country:";
                    let countryValue = createElement("p", "country-value");
                    countryValue.textContent = el.name;
                    weatherDiv.appendChild(countryDiv);
                    countryDiv.appendChild(countryName);
                    countryDiv.appendChild(countryValue);
                    weatherResults.append(weatherDiv);
                    let tempDiv = createElement("div", "temp");
                    let countryTemp = createElement("p", "country-temp");
                    countryTemp.textContent = "Temperature:";
                    let countryDegree = createElement("p", "country-degree");
                    countryDegree.innerHTML = `${(
                      Number(el.main.temp) - 273.15
                    ).toFixed(2)}&deg;C`;
                    tempDiv.appendChild(countryTemp);
                    tempDiv.appendChild(countryDegree);
                    weatherDiv.appendChild(tempDiv);
                    let descriptionDiv = createElement("div", "description");
                    let countryDescription = createElement(
                      "p",
                      "country-description"
                    );
                    countryDescription.textContent = "Description:";
                    let descriptionValue = createElement(
                      "p",
                      "description-value"
                    );
                    descriptionValue.textContent = el.weather[0].description;
                    descriptionDiv.appendChild(countryDescription);
                    descriptionDiv.appendChild(descriptionValue);
                    weatherDiv.appendChild(descriptionDiv);
                  });
                }
              };
              xhr.open(
                "GET",
                `https://api.openweathermap.org/data/2.5/weather?q=${countryInputValue}&appid=07975b6284106c9be0051b263f218d66`
              );
              xhr.send();
              countryInput.value = "";
            });
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
        weatherResults.innerHTML = "";
      }
    }
  };
  xhr.open("GET", "../src/data/countries.json");
  xhr.send();
});

function createElement(el, className) {
  const ele = document.createElement(el);
  if (className) {
    ele.className = className;
  }
  return ele;
}
