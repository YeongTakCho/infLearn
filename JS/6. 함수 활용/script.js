const messageContainer = document.querySelector("#d-day-message");
const container = document.querySelector("#d-day-container");
let intervalId;

const dateForMaker = function () {
  const inputYear = document.querySelector("#target-year-input").value;
  const inputMonth = document.querySelector("#target-month-input").value;
  const inputDate = document.querySelector("#target-date-input").value;

  const dateFormat = `${inputYear}-${inputMonth}-${inputDate}`;

  return dateFormat;
};

const counterMake = function (targetDateInput) {
  const nowDate = new Date();
  const targetDate = new Date(targetDateInput).setHours(0, 0, 0, 0);
  const remaining = (targetDate - nowDate) / 1000;

  if (isNaN(remaining)) {
    setClearInterval();
    messageContainer.innerHTML = "<h3>적합한 시간이 아닙니다<h3>";
  } else if (remaining <= 0) {
    setClearInterval();
    messageContainer.innerHTML = "<h3>타이머가 종료되었습니다<h3>";
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

const starter = function (targetDateInput) {
  container.style.display = "flex";
  messageContainer.style.display = "none";

  clearInterval(intervalId);
  if (!targetDateInput) {
    targetDateInput = dateForMaker();
  }

  localStorage.setItem("saved-date", targetDateInput);
  counterMake(targetDateInput);
  intervalId = setInterval(() => counterMake(targetDateInput), 1000);
};

const setClearInterval = function () {
  container.style.display = "none";
  messageContainer.style.display = "flex";
  messageContainer.innerHTML = "<h3>D-Day를 입력해주세요<h3>";
  localStorage.removeItem("saved-date");
  clearInterval(intervalId);
};

savedDate = localStorage.getItem("saved-date");
if (savedDate) {
  starter(savedDate);
} else {
  messageContainer.innerHTML = "<h3>D-Day를 입력해주세요<h3>";
  container.style.display = "none";
}
