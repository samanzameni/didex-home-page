window.AJAX_DATA_DICT = {
  "7DaysVolume": 102234545,
  "24HoursVolume": 938783,
  usersVolume: 1567,
  navbar_name: "Trader",
  navbar_email: "---",
};

function loadAccessToken() {
  window.accessToken = localStorage.getItem("didexwindow.accessToken");
}

function decodeAccessToken() {
  if (window.accessToken) {
    return jwt_decode(window.accessToken);
  }
}

function loadTawkToScript() {
  var scriptElement = document.createElement("script");
  scriptElement.async = true;
  scriptElement.src = "https://embed.tawk.to/5ed63cb79e5f6944228fb763/default";
  scriptElement.charset = "UTF-8";
  scriptElement.setAttribute("crossorigin", "*");
  document.getElementsByTagName("body")[0].appendChild(scriptElement);

  scriptElement.onload = function () {
    Tawk_API = Tawk_API || {};
    var Tawk_LoadStart = new Date();
    console.log("===TAWK.TO SCRIPT Loaded");

    if (window.accessToken) {
      const decoded = decodewindow.accessToken(window.accessToken);
      Tawk_API.setAttributes(
        {
          name: decoded.nameid || "Trader",
          email: decoded.email,
        },
        function (error) {}
      );
    }
  };
}

function updateAJAXLoaders() {
  const elements = document.querySelectorAll(".ajax-load");

  elements.forEach(function (el) {
    if (el.dataset.format === "currency") {
      el.innerHTML = window.AJAX_DATA_DICT[el.dataset.ajax]
        ? window.AJAX_DATA_DICT[el.dataset.ajax].toLocaleString() +
          el.dataset.currency
        : "";
    } else if (el.dataset.format === "number") {
      el.innerHTML = window.AJAX_DATA_DICT[el.dataset.ajax]
        ? window.AJAX_DATA_DICT[el.dataset.ajax].toLocaleString()
        : "";
    } else if (el.dataset.format === "src") {
      if (window.AJAX_DATA_DICT[el.dataset.ajax]) {
        el.setAttribute("src", window.AJAX_DATA_DICT[el.dataset.ajax]);
      }
    } else {
      el.innerHTML = window.AJAX_DATA_DICT[el.dataset.ajax];
    }
  });
}

function updateAssets() {
  const elements = document.querySelectorAll(".dynamic-asset");

  elements.forEach(function (el) {
    const src = currentLocale === "fa" ? el.dataset.src_fa : el.dataset.src_en;

    el.setAttribute("src", src);
  });
}

function scrollToElementID(elID) {
  const element = document.getElementById(elID);
  element.scrollIntoView({ behavior: "smooth", block: "center" });
}

function listenToKavianZ() {
  const sections = document.querySelectorAll(".body-section");
  const links = document.querySelectorAll(
    ".ddx-navigation-secondary .mdl-navigation__link"
  );
  sections.forEach(function (section) {
    section.addEventListener("mouseenter", function ($event) {
      const id = section.getAttribute("id");

      links.forEach(function (link) {
        link.classList.remove("active");
      });

      document.getElementById("for-" + id).classList.add("active");
    });
  });
}

function listenToSnackbarCloseEvent() {
  const closeButton = document.getElementById("snackbarCloseButton");
  const snackbar = document.getElementById("snackbarContainer");
  closeButton.addEventListener("click", function ($event) {
    snackbar.classList.add("animate__bounceOutDown");
  });
}

listenToKavianZ();
loadAccessToken();
loadTawkToScript();
updateAJAXLoaders();
listenToSnackbarCloseEvent();
