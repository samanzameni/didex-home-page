let currentLocale;

function initLocale() {
  HandleFaLocale();
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

  window.AJAX_DATA_DICT.currentLocale = currentLocale;
  updateAJAXLoaders();
  updateTextContent();
  updateBodyClass();
  updateAssets();
}

function updateTextContent() {
  const elements = document.querySelectorAll(".ddx-locale");

  elements.forEach(function (el) {
    el.innerHTML = RESOURCE[currentLocale][el.dataset.resource_code] || "";

    
  });
  const elements2 = document.querySelectorAll(".ddx-localized-url");
    elements2.forEach(function (el) {
      if ((currentLocale == "fa") &  el.hasAttribute("href")) 
      {
        if(el.classList.contains("ddx-localized-url2"))
        {
          el.href = "/fa/help-center/faq";
        }
        else
        {
          el.href = "/fa/" + el.href.split("/").pop();
        }
      }
    });
    const facebook = document.querySelector(".ddx-localized-social-facebook");
    const instagram = document.querySelector(".ddx-localized-social-insagram");
    const twitter = document.querySelector(".ddx-localized-social-twitter");
    const telegram = document.querySelector(".ddx-localized-social-telegram");
    if(currentLocale == "fa")
    {
      twitter.href = "https://twitter.com/didex_crypto_fa"
      facebook.href = "https://www.facebook.com/crypto.didex";
      instagram.href = "https://www.instagram.com/didexcrypto_fa";
      telegram.href = "https://t.me/Didexcrypto_fa"
    }
}

function HandleFaLocale() {
  if (window.location.hostname.startsWith("localhost")) {
    return;
  }

  if (window.location.hostname.endsWith(".ir")) {
    // storedLocale = localStorage.getItem("didexLocale");
    // if (storedLocale !== "fa") {
    //   localStorage.setItem("didexLocale", "fa");
    // }
    // const localeMenu = document.getElementById("localeMenu");
    // localeMenu.parentElement.removeChild(localeMenu);
  } else {
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
