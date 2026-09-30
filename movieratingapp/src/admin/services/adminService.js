const API_URL = "http://localhost:8081";

async function request(endpoint, options = {}) {
    const response = await fetch(`${API_URL}${endpoint}`, {
        ...options,
        headers: {
            "Content-Type": "application/json",
            ...(options.headers || {}),
        },
    });

    let data;

    try {
        data = await response.json();
    } catch {
        data = null;
    }

    if (!response.ok) {
        throw new Error(
            data?.message || "Something went wrong. Please try again."
        );
    }

    return data;
}


// ===============================
// ADMIN AUTH
// ===============================

export async function registerAdmin(username, password, accessCode) {
    return request("/auth/admin/register", {
        method: "POST",
        body: JSON.stringify({
            username,
            password,
            accessCode,
        }),
    });
}

export async function loginAdmin(username, password) {
    return request("/auth/admin/login", {
        method: "POST",
        body: JSON.stringify({
            username,
            password,
        }),
    });
}

export async function getCurrentAdmin() {
    const token = localStorage.getItem("adminToken");

    return request("/auth/me", {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
}


// ===============================
// MOVIE MANAGEMENT
// ===============================

export async function getMovies() {
    return request("/movies");
}

export async function addMovie(movie) {
    const token = localStorage.getItem("adminToken");

    return request("/movies", {
        method: "POST",
        headers: {
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(movie),
    });
}

export async function updateMovie(id, movie) {
    const token = localStorage.getItem("adminToken");

    return request(`/movies/${id}`, {
        method: "PUT",
        headers: {
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(movie),
    });
}

export async function deleteMovie(id) {
    const token = localStorage.getItem("adminToken");

    return request(`/movies/${id}`, {
        method: "DELETE",
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
}


// ===============================
// USER MANAGEMENT
// ===============================

export async function getUsers() {
    const token = localStorage.getItem("adminToken");

    return request("/admin/users", {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
}


export async function blockUser(id) {
    const token = localStorage.getItem("adminToken");

    return request(`/admin/users/${id}/block`, {
        method: "PUT",
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
}


export async function unblockUser(id) {
    const token = localStorage.getItem("adminToken");

    return request(`/admin/users/${id}/unblock`, {
        method: "PUT",
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
}


export async function makePremium(id) {
    const token = localStorage.getItem("adminToken");

    return request(`/admin/users/${id}/premium`, {
        method: "PUT",
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
}


export async function removePremium(id) {
    const token = localStorage.getItem("adminToken");

    return request(`/admin/users/${id}/remove-premium`, {
        method: "PUT",
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
}


export async function deleteUser(id) {
    const token = localStorage.getItem("adminToken");

    return request(`/admin/users/${id}`, {
        method: "DELETE",
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
}