import axios, { AxiosResponse } from "axios";

type ResponseData<T> = AxiosResponse<T>;

interface RegistrationData {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  password: string;
}

const responseBody = <T>(response: AxiosResponse<T>) => response.data;

const requests = {
  get: <T>(url: string) => axios.get<T>(url).then(responseBody),
  post: <T>(url: string, body: {}) =>
    axios.post<T>(url, body).then(responseBody),
  put: <T>(url: string, body: {}) => axios.put<T>(url, body).then(responseBody),
  del: <T>(url: string) => axios.delete<T>(url).then(responseBody),
};

export const IsUserValid = {
  validdateuser: (userGuid: string) =>
    requests.get<boolean>(`/api/users/verifyuser/${userGuid}`),
};

export const sendEmailConfirmation = (email: string, confirmationCode: string) => {
  const apiUrl = `/api/email-subscriber/confirmation`; 

  const body = {
    email,
    confirmationCode,
  };
  return requests.post(apiUrl, body);
};

export const IsEmailValid = (email: string) => {
  const apiUrl = `/api/subscriberaccounts/validateEmail`;

  const body = {
    email,
  };

  return requests.post(apiUrl, body);
}

export const registerSubscriberAccount = (registrationData: RegistrationData) => {
  const apiUrl = `/api/subscriberaccounts/`; 

  return requests.post<void>(apiUrl, registrationData);
};