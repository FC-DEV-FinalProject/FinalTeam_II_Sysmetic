import axios from 'axios';

import { useAuthStore } from '@/stores/authStore';

export const API_BASE_URL = import.meta.env.VITE_BASE_URL;

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, // CORS with Credentials 설정
});

apiClient.interceptors.request.use(
  (config) => {
    // 요청 URL과 메서드 로깅(개발환경에서만!)
    if (import.meta.env.MODE === 'development') {
      console.log(`[API Request] ${config.method?.toUpperCase()} ${config.url}`);
    }

    // JWT 토큰이 있으면, Authorization 헤더에 추가
    const { token } = useAuthStore.getState();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    // MSW 사용 여부에 따라 useMock 헤더 추가
    if (config.headers.useMick) {
      config.baseURL = '';
      delete config.headers.useMock;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.responxe) {
      const { status } = error.response;

      switch (status) {
        case 401: {
          // 인증 에러 처리
          useAuthStore.getState().signout();
          break;
        }
        case 403: {
          console.error('접근 권한이 없습니다.');
          break;
        }
        case 404: {
          console.error('요청한 리소스를 찾을 수 없습니다.');
          break;
        }
        case 500: {
          console.error('서버 에러입니다.');
          break;
        }
      }
    }
    return Promise.reject(error);
  }
);

export default apiClient;
