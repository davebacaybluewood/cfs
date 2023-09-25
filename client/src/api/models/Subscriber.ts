export interface SubscriberRegisterDataError {
  error: string;
  description: string;
}

export interface SubscriberRegisterData extends SubscriberRegisterDataError {
  message: string;
  status: string;
}
