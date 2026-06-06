export interface ReviewRequest {
  transactionId: string;
  restaurantId: number;
  star: number;
  comment: string;
  menuIds: number[];
}

export interface ReviewResponse {
  success: boolean;
  message: string;
  data?: unknown;
}

export interface MyReviewParams {
  page?: number;
  limit?: number;
}

export interface ReviewData {
  id: number;
  transactionId: string;
  restaurantId: number;
  star: number;
  comment: string;
  restaurant?: {
    id: number;
    name: string;
    logo?: string;
  };
}

export interface UpdateReviewRequest {
  star: number;
  comment: string;
}
