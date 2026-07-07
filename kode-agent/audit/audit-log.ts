import { AuditLog } from '../../backend/api/types';
import { logger } from '../../backend/api/logger';

export class AuditLogger {
  private logs: AuditLog[] = [];

  log(entry: Omit<AuditLog, 'id' | 'timestamp'>): string {
    const auditLog: AuditLog = {
      ...entry,
      id: `audit-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      timestamp: Date.now(),
    };
    this.logs.push(auditLog);
    logger.info(`Audit log: ${auditLog.action} on ${auditLog.resource}`, auditLog);
    return auditLog.id;
  }

  getLogs(filter?: { actor?: string; action?: string; resource?: string }): AuditLog[] {
    return this.logs.filter((log) => {
      if (filter?.actor && log.actor !== filter.actor) return false;
      if (filter?.action && log.action !== filter.action) return false;
      if (filter?.resource && log.resource !== filter.resource) return false;
      return true;
    });
  }

  export(): string {
    return JSON.stringify(this.logs, null, 2);
  }
}
