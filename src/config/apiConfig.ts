// Using import.meta.env to automatically switch between localhost and production
const SERVER_URL = import.meta.env.VITE_SERVER_URL || 'http://localhost:5000';

export const API_BASE_URL = `${SERVER_URL}/api/v1`;
export const IMAGE_BASE_URL = SERVER_URL;

/**
 * Best practice helper to construct final image URL
 * Handles both relative paths from DB and legacy absolute URLs if present
 */
export const getImageUrl = (path: string | undefined): string => {
    if (!path) return "/assets/home/aqu-banner.png";
    if (path.startsWith('http')) return path;
    
    // Ensure there is exactly one slash between base and path
    const cleanBase = IMAGE_BASE_URL.replace(/\/$/, "");
    const cleanPath = path.startsWith("/") ? path : `/${path}`;
    
    return `${cleanBase}${cleanPath}`;
};
