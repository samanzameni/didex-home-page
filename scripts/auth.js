const DEV_ACCESS_TOKEN =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxNiIsImVtYWlsIjoibS5oYWRpLmphbXNoaWRpQGdtYWlsLmNvbSIsImp0aSI6IjIzMGU3ZjkwLWY3Y2MtNGNjYS1iMzBjLTExMTFkYmFkYmJhNCIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL25hbWVpZGVudGlmaWVyIjoiMTYiLCJyZWdpb24iOiIyIiwibmFtZWlkIjoiTWVoZGlpIE1lbWFycG91cmkiLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3JvbGUiOiJ0cmFkZXIiLCJleHAiOjE2MjkyMjY5NDgsImlzcyI6IkRpZGV4IENvcnAiLCJhdWQiOiJEaWRleCBDb3JwIn0.AEyPDPGWMrW_bn1-XmNfhSr6KGeof5FhNwH72DP4OzE";

function isAuthorized() {
  return !!localStorage.getItem("didexAccessToken");
}

function updateAuthState() {
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
  if (accessToken) {
    const decoded = decodeAccessToken(accessToken);
    AJAX_DATA_DICT.navbar_name = decoded.nameid || "Trader";
    AJAX_DATA_DICT.navbar_email = decoded.email;
  }
}

function updateKYCStatus() {
  const kycNeededElements = document.querySelectorAll(".kyc-needed");
  const noAuthElements = document.querySelectorAll(".no-kyc");

  if (isAuthorized()) {
    const url = window.location.hostname.startsWith("localhost")
      ? "https://devapi.didex.com/api/Trader"
      : "/api/Trader";
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
          noAuthElements.forEach(function (el) {
            el.classList.add("hidden-by-kyc");
          });
        } else {
          kycNeededElements.forEach(function (el) {
            el.classList.add("hidden-by-kyc");
          });
          noAuthElements.forEach(function (el) {
            el.classList.remove("hidden-by-kyc");
          });
        }
      }
    };
    xhr.open("GET", url, true);
    xhr.setRequestHeader("Authorization", `Bearer ${accessToken}`);
    xhr.setRequestHeader("Content-Type", `application/json;charset=utf-8`);
    xhr.send();
  }
}

function onLogout() {
  accessToken = null;
  localStorage.removeItem("didexAccessToken");
  updateAuthState();
}

updateAuthState();
extractNameAndEmail();
updateKYCStatus();
updateAJAXLoaders();
