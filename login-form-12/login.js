document.querySelector(".signin-form").addEventListener("submit", function (e) {
  e.preventDefault();

  const username = document.querySelector('#username').value.trim();
  const password = document.querySelector('#password').value.trim();

  if (username === "" || password === "") {
    alert("Please fill in both fields.");
  } else if (username === "admin" && password === "admin") {
    // Correct full path (with slashes!)
    window.location.href = "file:///C:/Users/dlabh/OneDrive/Downloads/stock-market-website/dashboard.html";
  } else {
    alert("Incorrect username or password.");
  }
});
