export function renderLoading(el) {
  if (el.querySelector(".button").textContent === "Сохранение...") {
    el.querySelector(".button").textContent = "Сохранить";
    return;
  }

  if (el.querySelector(".button").textContent === "Сохранить") {
    el.querySelector(".button").textContent = "Сохранение...";
  }
}
