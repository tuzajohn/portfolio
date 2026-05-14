export interface EmailRequest {
  from: string;
  name?: string;
  subject?: string;
  message?: string;
  to?: string[];
  html?: string;
}

export interface MessageResponse {
  isSuccess?: boolean;
  message: string;
}
