import { create } from "zustand";

// Store for user data
export const useUserStore = create((set) => ({
    user: JSON.parse(localStorage.getItem("user")) || null,
    setUser: (user) => {
        localStorage.setItem("user", JSON.stringify(user));
        set({ user });
    },
    clearUser: () => {
        localStorage.removeItem("user");
        set({ user: null });
    },
}));

// Store for admin data
export const useAuthStore = create((set) => ({
    admin: JSON.parse(localStorage.getItem("admin")) || null,
    setAdmin: (admin) => {
        localStorage.setItem("admin", JSON.stringify(admin));
        set({ admin });
    },
    clearAdmin: () => {
        localStorage.removeItem("admin");
        set({ admin: null });
    },
}));
