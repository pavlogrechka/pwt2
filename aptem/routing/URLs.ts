const TENANT_NAME = 'pavlogrechka';
const BASE_CLASSIC_URL = `https://${TENANT_NAME}.test.aptem.co.uk`;
const BASE_CONSOLE_URL = `https://${TENANT_NAME}.test.aptem.co.uk/pwa`;

const URLs = {
  classic: {
    loginPage: `${BASE_CLASSIC_URL}/Users/Account/LogOn`,
    usersGridPage: `${BASE_CLASSIC_URL}/MWS.ClientAdmin/Users`,
    clientProgram: `${BASE_CLASSIC_URL}/MWS.PerformanceManager/ClientProgram`,
  },
  console: {
    loginPage: `${BASE_CONSOLE_URL}`,
    tutorDashboard: `${BASE_CONSOLE_URL}/caseload-dashboard`,
    learnersGrid: `${BASE_CONSOLE_URL}/learners`,
    signaturesCompliance: `${BASE_CONSOLE_URL}/signatures/compliance`,
    signaturesReviews: `${BASE_CONSOLE_URL}/signatures/reviews`,
    tutorTasks: `${BASE_CONSOLE_URL}/tasks`,
    tutorMessages: `${BASE_CONSOLE_URL}/messages`,
    adviceCentre: `${BASE_CONSOLE_URL}/advice-centre`,
    powerBIReports: `${BASE_CONSOLE_URL}/report/view`,
    resourceCentre: `${BASE_CONSOLE_URL}/resource-centre`,
    regCertQualifications: `${BASE_CONSOLE_URL}/registration-certification/qualifications`,
    regCertAssessments: `${BASE_CONSOLE_URL}/registration-certification/assessments`,
  },
};

module.exports = {
  URLs,
};
