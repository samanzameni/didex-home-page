const AJAX_DATA_DICT = {
  "7DaysVolume": 102234545,
  "24HoursVolume": 938783,
  usersVolume: 1567,
  change1: "+0.00%",
  change2: "+0.00%",
  change3: "+0.00%",
  change4: "+0.00%",
  symbol1: symbols[0],
  symbol2: symbols[1],
  symbol3: symbols[2],
  symbol4: symbols[3],
  symbol1Logo: logos[0],
  symbol2Logo: logos[1],
  symbol3Logo: logos[2],
  symbol4Logo: logos[3],
  volume1: "0.00$",
  volume2: "0.00$",
  volume3: "0.00$",
  volume4: "0.00$",
  navbar_name: "Trader",
  navbar_email: "---",
};

let accessToken;

function loadAccessToken() {
  accessToken = localStorage.getItem("didexAccessToken");
}

function decodeAccessToken() {
  if (accessToken) {
    return jwt_decode(accessToken);
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

    if (accessToken) {
      const decoded = decodeAccessToken(accessToken);
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
      el.innerHTML =
        AJAX_DATA_DICT[el.dataset.ajax].toLocaleString() + el.dataset.currency;
    } else if (el.dataset.format === "number") {
      el.innerHTML = AJAX_DATA_DICT[el.dataset.ajax].toLocaleString();
    } else if (el.dataset.format === "src") {
      el.setAttribute("src", AJAX_DATA_DICT[el.dataset.ajax]);
    } else {
      el.innerHTML = AJAX_DATA_DICT[el.dataset.ajax];
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

listenToKavianZ();
loadAccessToken();
loadTawkToScript();
updateAJAXLoaders();
