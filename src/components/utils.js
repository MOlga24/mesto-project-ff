export function renderLoading(el) {
  if (
    !el.classList.contains("popup_type_image") &&
    !el.classList.contains("popup_delete_image")
  ) {
    if (el.querySelector(".button").textContent === "Сохранение...") {
      el.querySelector(".button").textContent = "Сохранить";
      return;
    }

    if (el.querySelector(".button").textContent === "Сохранить") {
      el.querySelector(".button").textContent = "Сохранение...";
    }
  }
}
