import sql from 'mssql';
import { SERVER, DB_NAME, DB_UAT_NAME, DB_USER_NAME, DB_USER_PASSWORD } from './authDB';

const sqlConfig = {
  user: DB_USER_NAME,
  password: DB_USER_PASSWORD,
  database: DB_UAT_NAME, // DB_NAME = test_stage, DB_UAT_NAME = uat_stage
  server: SERVER,
};

async function getAddedAdminsData(addAdminToCalendar) {
  const receivedData = [];
  for (let adminName of addAdminToCalendar) {
    try {
      await sql.connect(sqlConfig);
      let result = {};

      const getAdminId = await sql.query`select [UserId], [FullName]
        FROM [dbo].[WA_Users]
        WHERE UserName = ${adminName}`;
      const { UserId: adminId } = getAdminId.recordset[0];
      const { FullName: adminFullName } = getAdminId.recordset[0];

      const getAdminCaseLoadCapacity = await sql.query`SELECT [CaseloadCapacity]
        FROM [dbo].[MWS_ClientAdmin_AdminCaseloadPartRecord]
        WHERE Id = ${adminId}`;
      const { CaseloadCapacity: adminCaseLoadCapacity } = getAdminCaseLoadCapacity.recordset[0];

      const getAdminCurrentCaseLoad = await sql.query`SELECT [CurrentCaseLoad]
        FROM [dbo].[MWS_ClientAdmin_AdminCaseloadPartRecord]
        WHERE Id = ${adminId}`;
      const { CurrentCaseLoad: adminCurrentCaseLoad } = getAdminCurrentCaseLoad.recordset[0];

      result = { adminId, adminFullName, adminCaseLoadCapacity, adminCurrentCaseLoad };
      receivedData.push(result);
    } catch (err) {
      console.log(err);
    }
  }

  await sql.close();
  return receivedData;
}

export { getAddedAdminsData };
