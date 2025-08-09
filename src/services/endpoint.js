const BASE_URL = import.meta.env.VITE_BASE_URL

 const API_URL = {
    CART:`${BASE_URL}/cart`,
    LOGIN: `${BASE_URL}/auth/login`,
    REGISTER: `${BASE_URL}/auth/register`,
}

export default API_URL

