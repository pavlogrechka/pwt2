interface ICredential {
  login: string;
  password: string;
  url: string;
}

interface ICreateReview {
  reviewName: string;
  programName: number;
  reviewType: string;
  completionMode?: number;
  instructions: string;
  evidenceRequired: boolean;
  completedBy: string;
  completedByValue: string;
  reviewer: string;
  uploadFile: string;
  createTaskFor: string;
  scheduleReview: boolean;
  scheduleDate: string;
  startTime: string;
  endTime: string;
  useZoom: boolean;
}

interface IOthers {
  learnerName: string;
  groupTitle: string;
  waitForSelectorTimeout: number;
}

interface ITestInitConfig {
  credential: ICredential;
  createReview: ICreateReview;
  others: IOthers;
}

export default ITestInitConfig