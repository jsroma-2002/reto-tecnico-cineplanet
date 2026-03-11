import api from "./api";
import completeApi from "./completeApi";

interface PaymentRequest {
  cardNumber: string;
  cvv: string;
  expiration: string;
  amount: number;
}

interface PaymentResponse {
  transactionId: string;
  operationDate: string;
  status: string;
}

interface CompleteRequest {
  email: string;
  name: string;
  dni: string;
  transactionId: string;
  operationDate: string;
}

interface CompleteResponse {
  code: string;
  message: string;
}

export async function processPayment(
  data: PaymentRequest,
): Promise<PaymentResponse> {
  const response = await api.post<PaymentResponse>("/payments", data);
  return response.data;
}

export async function completeTransaction(
  data: CompleteRequest,
): Promise<CompleteResponse> {
  const response = await completeApi.post<CompleteResponse>("/complete", data);
  return response.data;
}
