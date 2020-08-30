const AJAX_DATA_DICT = {
  "7DaysVolume": 1208397124,
  "24HoursVolume": 9847614,
  usersVolume: 12455,
};

function updateAJAXLoaders() {
  const elements = document.querySelectorAll(".ajax-load");

  elements.forEach(function (el) {
    if (el.dataset.format === "currency") {
      el.innerHTML =
        AJAX_DATA_DICT[el.dataset.ajax].toLocaleString() + el.dataset.currency;
    } else if (el.dataset.format === "number") {
      el.innerHTML = AJAX_DATA_DICT[el.dataset.ajax].toLocaleString();
    }
  });
}

updateAJAXLoaders();
