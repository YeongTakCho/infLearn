const messageContainer = document.querySelector("#d-day-message");
// container.textContent = "D-Day를 입력해주세요"
messageContainer.innerHTML = "<h3>D-Day를 입력해주세요<h3>";

const container = document.querySelector("#d-day-container");
container.style.display = "none";
let intervalId;

const dateForMaker = function () {
  const inputYear = document.querySelector("#target-year-input").value;
  const inputMonth = document.querySelector("#target-month-input").value;
  const inputDate = document.querySelector("#target-date-input").value;

  const dateFormat = `${inputYear}-${inputMonth}-${inputDate}`;

  return dateFormat;
};

const counterMake = function () {
  const targetDateInput = dateForMaker();
  const nowDate = new Date();
  const targetDate = new Date(targetDateInput).setHours(0, 0, 0, 0);
  const remaining = (targetDate - nowDate) / 1000;

  if (isNaN(remaining)) {
    container.style.display = "none";

    messageContainer.style.display = "flex";
    messageContainer.innerHTML = "<h3>적합한 시간이 아닙니다<h3>";

    clearInterval(intervalId);
  } else if (remaining <= 0) {
    container.style.display = "none";

    messageContainer.style.display = "flex";
    messageContainer.innerHTML = "<h3>타이머가 종료되었습니다<h3>";

    clearInterval(intervalId);
  } else {
    const remainingObj = {
      remainDate: Math.floor(remaining / 3600 / 24),
      remainHour: Math.floor(remaining / 3600) % 24,
      remainMin: Math.floor(remaining / 60) % 60,
      remainSec: Math.floor(remaining) % 60,
    };

    const containerObj = {
      days: document.querySelector("#days"),
      hours: document.querySelector("#hours"),
      min: document.querySelector("#min"),
      sec: document.querySelector("#sec"),
    };

    const remainingKey = Object.keys(remainingObj);
    const containerKey = Object.keys(containerObj);

    for (let i = 0; i < 4; i++) {
      containerObj[containerKey[i]].textContent = remainingObj[remainingKey[i]];
    }
  }
};

const starter = function () {
  container.style.display = "flex";
  messageContainer.style.display = "none";

  clearInterval(intervalId);
  counterMake();
  intervalId = setInterval(counterMake, 1000);
  console.log("start interval id:", intervalId);
};

const setClearInterval = function () {
  container.style.display = "none";
  messageContainer.style.display = "flex";
  messageContainer.innerHTML = "<h3>D-Day를 입력해주세요<h3>";

  console.log("end interval id:", intervalId);
  clearInterval(intervalId);
};
