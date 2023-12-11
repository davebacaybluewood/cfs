export interface EmailMarketingData {
  recipients: string[];
  emailBody: string;
  userGuid?: string | undefined;
  subject: string;
}

export interface EmailTemplateData {
  _id?: string;
  userGuid: string;
  templateBody: string;
  templateName: string;
  status: string;
  isAddedByMarketing?: boolean;
  createdAt?: string;
  updatedAt?: string;
  authorThumbnail?: string;
  authorFirstname?: string;
  authorLastname?: string;
  authorName?: string;
  subject: string;
  design: string;
  settings: string[];
  categories: string[];
}

export interface EmailTemplateTableData {
  id: string;
  createdBy: string;
  createdAt?: string;
  templateName: string;
  body: string;
  status: string;
  actions: JSX.Element | React.ReactNode;
  isAddedByMarketing?: boolean;
  subject: string;
}

export type CategoryType = {
  label: string;
  value: string;
  keyword: string;
};
export interface EmailTemplateParameter {
  templateName: string;
  templateBody: string;
  templateStatus: string;
  isAddedByMarketing: boolean;
  subject: string;
  design: string;
  settings: string[];
  categories?: string[] | CategoryType[] | undefined[];
}

export interface EmailTemplateDataSubscriber {
  templates: EmailTemplateData[];
}
