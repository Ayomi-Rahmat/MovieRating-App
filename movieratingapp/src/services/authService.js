const API_URL = "http://localhost:8081";


// ================================
// REGISTER
// ================================

export const register = async (username, password) => {

  const response = await fetch(
    `${API_URL}/auth/register`,
    {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        username,
        password,
      }),
    }
  );


  const data = await response.json();


  if (!response.ok) {
    throw new Error(
      data.message || "Registration failed"
    );
  }


  return data;
};


// ================================
// LOGIN
// ================================

export const login = async (
  username,
  password
) => {

  const response = await fetch(
    `${API_URL}/auth/login`,
    {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        username,
        password,
      }),
    }
  );


  const data = await response.json();


  if (!response.ok) {
    throw new Error(
      data.message || "Login failed"
    );
  }


  // Your backend returns the JWT
  // inside data.data
  const token = data.data;


  if (!token) {
    throw new Error(
      "Login succeeded but no token was returned."
    );
  }


  localStorage.setItem(
    "movieRatingToken",
    token
  );


  return data;
};


// ================================
// GET TOKEN
// ================================

export const getToken = () => {

  return localStorage.getItem(
    "movieRatingToken"
  );
};


// ================================
// LOGGED IN?
// ================================

export const isLoggedIn = () => {

  return Boolean(getToken());
};


// ================================
// LOGOUT
// ================================

export const logout = () => {

  localStorage.removeItem(
    "movieRatingToken"
  );
};