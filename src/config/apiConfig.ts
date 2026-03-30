// Using import.meta.env to automatically switch between localhost and production
const SERVER_URL = import.meta.env.VITE_SERVER_URL || 'http://localhost:5000';

export const API_BASE_URL = `${SERVER_URL}/api/v1`;
export const IMAGE_BASE_URL = SERVER_URL;
