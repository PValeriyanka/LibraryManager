import axios from 'axios';


export const loginPost = async (params) => {
    try {
      const response = await axios.post("/api/authentication/login", params);
      const data = response.data;
      return {
        accessToken: data.accessToken,
        refreshToken: data.refreshToken,
      };
    } catch (error) {
      console.error("Error login:", error);
      return { accessToken: null, refreshToken: null };
    }
  };

export const registerPost = async (params) => {
    const response = await axios.post("/api/authentication", params);
    return response;
};

export const refreshToken = async () => {
    try {
        const refreshTokenValue = localStorage.getItem('refreshToken');
        if (!refreshTokenValue) {
            console.error('Refresh token is missing');
            return { accessToken: null, refreshToken: null };
        }

        const response = await axios.post("/api/token/refresh-token", { refreshToken: refreshTokenValue });
        const data = response.data;

        if (data.accessToken && data.refreshToken) {
            localStorage.setItem('accessToken', data.accessToken);
            localStorage.setItem('refreshToken', data.refreshToken);

            return {
                accessToken: data.accessToken,
                refreshToken: data.refreshToken,
            };
        } else {
            console.error('No tokens returned from the server');
            return { accessToken: null, refreshToken: null };
        }
    } catch (error) {
        console.error("Error refreshing token:", error);
        return { accessToken: null, refreshToken: null };
    }
};


