function setToken(token) {
  if (!token) return;
  console.log("Token set");
  localStorage.setItem("token", JSON.stringify(token));
}

function getToken() {
  const token = localStorage.getItem("token");
  return token ? JSON.parse(token) : null;
}

async function login(credentials) {
  if (!credentials.username || !credentials.password) {
    alert("Please enter both username and password.");
    return;
  }

  try {
    const response = await fetch("https://fakestoreapi.com/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(credentials),
    });

    if (!response.ok) {
      alert("Login failed. Please check your username or password.");
      return;
    }

    const { token } = await response.json();
    setToken(token);
    alert("Login successful!");

    window.location.href = "index.html";
  } catch (error) {
    console.error("Login error:", error);
    alert("An error occurred during login.");
  }
}
async function signup(user) {
  try{
    const response = await fetch('https://fakestoreapi.com/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(user)
    });
    console.log(response);
    const token = await response.json();
    console.log(token);
    if (!response.ok) {
      alert("An error occurred during signup. Please try again.");
      return;
    }
    setToken(token);
    alert("Signup successful!");
    window.location.href = "index.html"
  }catch (error) {
    console.error("Signup error:", error);
    alert("An error occurred during signup.");
  }

}

const loginForm = document.getElementById("loginForm");
const signupForm = document.getElementById("signupForm");

if (loginForm) {
  loginForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const username = loginForm.querySelector("#loginUsername").value.trim();
    const password = loginForm.querySelector("#loginPassword").value.trim();

    login({ username, password });
  });
}

if (signupForm) {
  signupForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const username = signupForm.querySelector("#signupUsername").value.trim();
    const email = signupForm.querySelector("#signupEmail").value.trim();
    const password = signupForm.querySelector("#signupPassword").value.trim();

    signup({ username, email, password });
  });
}
