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

updateAuthState();
