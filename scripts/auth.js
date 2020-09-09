function isAuthorized() {
  return !!localStorage.getItem("didexAccessToken");
}

function updateAuthState() {
  window.accessToken = localStorage.getItem("didexAccessToken");
  const authNeededElements = document.querySelectorAll(".auth-needed");
  const noAuthElements = document.querySelectorAll(".no-auth");

  if (isAuthorized()) {
    authNeededElements.forEach(function (el) {
      el.classList.remove("hidden-by-auth");
    });
    noAuthElements.forEach(function (el) {
      el.classList.add("hidden-by-auth");
    });
  } else {
    authNeededElements.forEach(function (el) {
      el.classList.add("hidden-by-auth");
    });
    noAuthElements.forEach(function (el) {
      el.classList.remove("hidden-by-auth");
    });
  }
}

function extractNameAndEmail() {
  if (window.accessToken) {
    const decoded = decodeAccessToken(window.accessToken);
    window.AJAX_DATA_DICT.navbar_name = decoded.nameid || "Trader";
    window.AJAX_DATA_DICT.navbar_email = decoded.email;
  }
}

function updateKYCStatus() {
  const kycNeededElements = document.querySelectorAll(".kyc-needed");
  const noKYCElements = document.querySelectorAll(".no-kyc");

  if (isAuthorized()) {
    const url = window.location.hostname.startsWith("localhost")
      ? "https://devapi.didex.com/api/Trader"
      : "https://api.didex.com/api/Trader";
    const xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
        const res = JSON.parse(xhr.response);
        const kycNeeded =
          res.status === 0 || // Newbie
          res.status === 3 || // Banned
          res.status === 4; // Rejected
        if (kycNeeded) {
          kycNeededElements.forEach(function (el) {
            el.classList.remove("hidden-by-kyc");
          });
          noKYCElements.forEach(function (el) {
            el.classList.add("hidden-by-kyc");
          });
        } else {
          kycNeededElements.forEach(function (el) {
            el.classList.add("hidden-by-kyc");
          });
          noKYCElements.forEach(function (el) {
            el.classList.remove("hidden-by-kyc");
          });
        }
      }
    };
    xhr.open("GET", url, true);
    xhr.setRequestHeader("Authorization", `Bearer ${window.accessToken}`);
    xhr.setRequestHeader("Content-Type", `application/json;charset=utf-8`);
    xhr.send();
  }
}

function onLogout() {
  window.accessToken = null;
  localStorage.removeItem("didexAccessToken");
  updateAuthState();
}

updateAuthState();
extractNameAndEmail();
updateKYCStatus();
updateAJAXLoaders();
