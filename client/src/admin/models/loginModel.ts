export interface LoginErrorData {
  error?: string;
  description?: string;
}

export interface LoginUsingEmailData extends LoginErrorData {
  message: string;
  status: string;
  agent: {
    agentCode: string;
  };
}

export interface LoginUsingCodeData extends LoginErrorData {
  message: string;
  status: string;
  user: {
    _id: string;
    name: string;
    userGuid: string;
    email: string;
    token: string;
    role: string;
  };
}
