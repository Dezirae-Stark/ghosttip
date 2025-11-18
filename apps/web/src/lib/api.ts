/**
 * GhostTip Web - API Client
 */

import axios from 'axios';
import type {
  RegisterDto,
  LoginDto,
  AuthResponse,
  CreateTipProfileDto,
  UpdateTipProfileDto,
  CreatePaymentMethodDto,
  UpdatePaymentMethodDto,
  TipProfile,
  PaymentMethod,
  TipProfilePublicView,
} from '@ghosttip/shared';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

export const api = axios.create({
  baseURL: `${API_URL}/api`,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptor to include auth token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('accessToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Add response interceptor for token refresh
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const { data } = await axios.post(
          `${API_URL}/api/auth/refresh`,
          {},
          { withCredentials: true }
        );

        localStorage.setItem('accessToken', data.accessToken);
        api.defaults.headers.common['Authorization'] = `Bearer ${data.accessToken}`;
        originalRequest.headers['Authorization'] = `Bearer ${data.accessToken}`;

        return api(originalRequest);
      } catch {
        localStorage.removeItem('accessToken');
        window.location.href = '/auth/login';
        return Promise.reject(error);
      }
    }

    return Promise.reject(error);
  }
);

// Auth API
export const authApi = {
  register: async (data: RegisterDto): Promise<AuthResponse> => {
    const response = await api.post<AuthResponse>('/auth/register', data);
    localStorage.setItem('accessToken', response.data.accessToken);
    return response.data;
  },

  login: async (data: LoginDto): Promise<AuthResponse> => {
    const response = await api.post<AuthResponse>('/auth/login', data);
    localStorage.setItem('accessToken', response.data.accessToken);
    return response.data;
  },

  logout: async (): Promise<void> => {
    await api.post('/auth/logout');
    localStorage.removeItem('accessToken');
  },

  refresh: async (): Promise<AuthResponse> => {
    const response = await api.post<AuthResponse>('/auth/refresh');
    localStorage.setItem('accessToken', response.data.accessToken);
    return response.data;
  },
};

// TipProfile API
export const tipProfileApi = {
  create: async (data: CreateTipProfileDto): Promise<TipProfile> => {
    const response = await api.post<TipProfile>('/tip-profiles', data);
    return response.data;
  },

  getMyProfiles: async (): Promise<TipProfile[]> => {
    const response = await api.get<TipProfile[]>('/tip-profiles');
    return response.data;
  },

  getBySlug: async (slug: string): Promise<TipProfilePublicView> => {
    const response = await api.get<TipProfilePublicView>(`/tip-profiles/${slug}`);
    return response.data;
  },

  update: async (id: string, data: UpdateTipProfileDto): Promise<TipProfile> => {
    const response = await api.put<TipProfile>(`/tip-profiles/${id}`, data);
    return response.data;
  },

  delete: async (id: string): Promise<void> => {
    await api.delete(`/tip-profiles/${id}`);
  },
};

// PaymentMethod API
export const paymentMethodApi = {
  create: async (data: CreatePaymentMethodDto): Promise<PaymentMethod> => {
    const response = await api.post<PaymentMethod>('/payment-methods', data);
    return response.data;
  },

  getMy: async (): Promise<PaymentMethod[]> => {
    const response = await api.get<PaymentMethod[]>('/payment-methods');
    return response.data;
  },

  update: async (id: string, data: UpdatePaymentMethodDto): Promise<PaymentMethod> => {
    const response = await api.put<PaymentMethod>(`/payment-methods/${id}`, data);
    return response.data;
  },

  delete: async (id: string): Promise<void> => {
    await api.delete(`/payment-methods/${id}`);
  },
};
