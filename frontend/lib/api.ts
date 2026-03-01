const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || '/api';

export interface ApiResponse<T> {
  data?: T;
  error?: string;
}

async function fetchApi<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<ApiResponse<T>> {
  const url = `${API_BASE_URL}${endpoint}`;
  
  const defaultHeaders: Record<string, string> = {
    'Content-Type': 'application/json',
  };

  // Get token from localStorage if available (only on client)
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('access_token');
    if (token) {
      defaultHeaders['Authorization'] = `Bearer ${token}`;
    }
  }

  try {
    const response = await fetch(url, {
      ...options,
      headers: {
        ...defaultHeaders,
        ...options.headers,
      },
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      return {
        error: errorData.detail || `HTTP error ${response.status}`,
      };
    }

    const data = await response.json();
    return { data };
  } catch (error) {
    console.error('API fetch error:', error);
    return {
      error: error instanceof Error ? error.message : 'Network error',
    };
  }
}

// Auth API
export const authApi = {
  login: (credentials: { email: string; password: string; role: string }) =>
    fetchApi<{ access_token: string; token_type: string }>('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    }),

  register: (userData: {
    email: string;
    password: string;
    name: string;
    role: string;
  }) =>
    fetchApi<{ message: string }>('/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    }),
};

// Seller API
export const sellerApi = {
  getTrustScore: (sellerId: string) =>
    fetchApi<{
      seller_id: string;
      trust_score: number;
      risk_level: string;
      factors: Record<string, unknown>;
    }>(`/seller/${sellerId}/trust-score`),

  getTopRated: (limit = 20) =>
    fetchApi<{
      sellers: Array<{
        seller_id: string;
        trust_score: number;
        avg_rating: number;
        total_reviews: number;
        verified_rate: number;
      }>;
    }>(`/sellers/top-rated?limit=${limit}`),
};

// Review API
export const reviewApi = {
  analyzeReview: (review: {
    seller_id: string;
    rating: number;
    review_text: string;
    sentiment_score: number;
    verified_purchase: boolean;
    delivery_days: number;
    ip_review_frequency: number;
    device_reuse_count: number;
    platform: string;
  }) =>
    fetchApi<{
      review_id: string;
      fraud_probability: number;
      sentiment_analysis: Record<string, unknown>;
      risk_factors: string[];
    }>('/analyze-review', {
      method: 'POST',
      body: JSON.stringify(review),
    }),
};

// Analytics API
export const analyticsApi = {
  getPlatformStats: () =>
    fetchApi<{
      total_reviews: number;
      total_sellers: number;
      avg_rating: number;
      fraud_rate: number;
      platform_distribution: Record<string, number>;
      verified_purchase_rate: number;
    }>('/analytics/platform-stats'),
};

export default fetchApi;
