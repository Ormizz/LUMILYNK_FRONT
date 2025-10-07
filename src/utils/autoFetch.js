// utils/authFetch.js

export default async function authFetch(url, options = {}) {
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("token");
    const headers = {
        ...options.headers,
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
    };
    try {
        const response = await fetch(url, {
        ...options,
        headers,
        });
        // Si token expiré ou non valide
        if (response.status === 401) {
            localStorage.removeItem("token");
            localStorage.removeItem("user");
            window.location.href = "/connexion"; // Redirige vers la connexion
            throw new Error("Session expirée, veuillez vous reconnecter.");
        }
        return response;
    } catch (error) {
        console.error("Erreur réseau :", error);
        throw error;
    }
}
