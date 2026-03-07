document.getElementById("signInBtn").addEventListener("click", function () {
  const usernameInput = document.getElementById("usernameInput");
  const passwordInput = document.getElementById("passwordInput");

  const username = usernameInput.value;
  const password = passwordInput.value;

  if (username === "admin" && password === "admin123") {
    alert("login successfully");
    window.location.assign("./home.html");
  } else {
    alert("login failed");
    return;
  }
});
