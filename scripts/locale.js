let currentLocale;

function initLocale() {
  RemoveFaLocale();
  let tempLocale;
  if (localStorage.getItem("didexLocale")) {
    tempLocale = localStorage.getItem("didexLocale");
  } else {
    tempLocale = window.location.hostname.endsWith(".ir") ? "fa" : "en";
  }
  changeLocale(tempLocale);
}

function changeLocale(newLocale, shouldStore = false) {
  currentLocale = newLocale;
  if (shouldStore) {
    localStorage.setItem("didexLocale", currentLocale);
  }

  AJAX_DATA_DICT.currentLocale = currentLocale;
  updateAJAXLoaders();
  updateTextContent();
  updateBodyClass();
  updateAssets();
}

function updateTextContent() {
  const elements = document.querySelectorAll(".ddx-locale");

  elements.forEach(function (el) {
    el.innerHTML = RESOURCE[currentLocale][el.dataset.resource_code] || "";
    if (
      (currentLocale == "fa") &
      el.classList.contains("ddx-localized-url") &
      el.hasAttribute("href")
    ) {
      el.href = "/fa/" + el.href.split("/").pop();
    }
  });
}

function RemoveFaLocale() {
  if (window.location.hostname.startsWith("localhost")) {
    return;
  }

  if (!window.location.hostname.endsWith(".ir")) {
    storedLocale = localStorage.getItem("didexLocale");
    if (storedLocale === "fa") {
      localStorage.setItem("didexLocale", "en");
    }
    const fa = document.getElementById("farsiLocale");
    fa.parentElement.removeChild(fa);
  }
}

function updateBodyClass() {
  const html = document.getElementsByTagName("html").item(0);
  html.setAttribute("lang", currentLocale);

  const body = document.getElementsByTagName("body").item(0);

  ["fa", "en"].forEach(function (l) {
    body.classList.remove(l);
  });

  body.classList.add(currentLocale);
}

initLocale();
