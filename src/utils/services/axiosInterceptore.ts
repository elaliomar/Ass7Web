import axios from 'axios';
import { clearTokens,setAccessToken } from '../../redux/slices/authSlice';

const api = axios.create({
  baseURL: 'https://backend-practice.euriskomobility.me',
});

// Add the interceptors
const setupInterceptors = (store: any) => {
  api.interceptors.request.use(
    config => {
      const state = store.getState();
      const accessToken = state.auth.accessToken;
      if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
      }
      return config;
    },
    error => Promise.reject(error),
  );

  // Add interceptor response
  api.interceptors.response.use(
    response => response,
    async error => {
      const originalRequest = error.config;

      if (
        error.response &&
        error.response.status === 403 &&
        !originalRequest._retry
      ) {
        originalRequest._retry = true;

        const state = store.getState();
        const refreshToken = state.auth.refreshToken;
        if (!refreshToken) {
          // redirect to login
          store.dispatch(clearTokens());
          return Promise.reject(error);
        }

        try {
          const response = await axios.post(
            'https://backend-practice.euriskomobility.me/refresh-token',
            {
              refreshToken: refreshToken,
            },
          );
          const accessToken = response.data.accessToken;

          // Store the token
          store.dispatch(setAccessToken(response.data.accessToken));
          api.defaults.headers.common.Authorization = `Bearer ${accessToken}`;

          // Send again the original request
          return api(originalRequest);
        } catch (error) {
          store.dispatch(clearTokens());
          return Promise.reject(error);
        }
      }

      return Promise.reject(error);
    },
  );
};

export {api, setupInterceptors};
