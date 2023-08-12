export interface EmailMarketingData {
  recipients: string[];
  emailBody: string;
  userGuid?: string | undefined;
  subject: string;
}
