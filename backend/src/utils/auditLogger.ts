/* eslint-disable @typescript-eslint/no-explicit-any */
import { prisma } from '../utils';

type AuditLogParams = {
  action: 'CREATE' | 'UPDATE' | 'DELETE';
  tableName: string;
  recordId: string;
  oldData?: any;
  newData?: any;
  performedBy?: string;
};

export async function createAuditLog(params: AuditLogParams) {
  await prisma.auditLog.create({
    data: {
      action: params.action,
      tableName: params.tableName,
      recordId: String(params.recordId),
      oldData: params.oldData,
      newData: params.newData,
      performedBy: params.performedBy || null,
    },
  });
}
