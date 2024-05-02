"use strict";
//import
import { creatSpan } from "./commponentsOne.js";

//selections
const inputeday = document.querySelector(".input-day");
const inputemonth = document.querySelector(".input-month");
const inputeyear = document.querySelector(".input-year");

const ageYearEl = document.querySelector(".inyear");
const ageMonthEl = document.querySelector(".inmonth");
const ageDayEL = document.querySelector(".inday");

const from = document.querySelector(".form");

//functions
function checkInputeEligibil(input, type) {
  if (input.value.trim() === "") {
    renderEroor(input, "The input is empty", type);
    return false;
  }
  if (type === "year") {
    if (+input.value > new Date().getFullYear()) {
      renderEroor(input, "more year", "year");
      return false;
    }
  }
  if (type === "month") {
    if (+input.value > 12) {
      renderEroor(input, "more month", "month");
      return false;
    }
  }
  if (type === "day") {
    if (+input.value > 31) {
      renderEroor(input, "more day", "day");
      return false;
    }
  }
  input.nextElementSibling?.remove();
  return +input.value;
}

function renderEroor(input, message, type) {
  const EL = input.nextElementSibling;
  if (EL) {
    EL.textContent = message;
    return;
  }
  document
    .querySelector(`.add-${type}`)
    .insertAdjacentHTML("beforeend", creatSpan(message));
}
//renderEroor();
//event
from.addEventListener("click", function (e) {
  e.preventDefault();
  const year = checkInputeEligibil(inputeyear, "year");
  const month = checkInputeEligibil(inputemonth, "month");
  const day = checkInputeEligibil(inputeday, "day");
  if (year && month && day) {
    const { days, months, years } = calculateAge(day, month, year);
    ageYearEl.textContent = `${years}`.padStart(2, 0).slice(0, 2);
    ageMonthEl.textContent = `${months}`.padStart(2, 0).slice(0, 2);
    ageDayEL.textContent = `${days}`.padStart(2, 0).slice(0, 2);
  }
});

function calculateAge(day, month, year) {
  const birthDate = new Date(year, month - 1, day);
  const currentDate = new Date();
  const timeDifference = currentDate - birthDate;
  const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
  const years = Math.floor(days / 365);
  const remainingDays = days % 365;
  const months = Math.floor(remainingDays / 30);
  let save = {
    years,
    months,
    days,
  };
  return save;
}
