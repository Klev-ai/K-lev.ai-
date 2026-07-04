import { HealthMetrics } from '../../backend/api/types';
import { logger } from '../../backend/api/logger';

export interface HealthAlert {
  metricName: string;
  severity: 'critical' | 'high' | 'medium' | 'low';
  value: number;
  threshold: number;
  timestamp: number;
}

export class HealthMonitor {
  private metrics: HealthMetrics[] = [];
  private alerts: HealthAlert[] = [];
  private thresholds = {latency: 2000, availability: 0.95, crashRate: 0.01, knowledgeFreshness: 7};

  recordMetrics(metrics: HealthMetrics): void {
    this.metrics.push(metrics);
    this.checkThresholds(metrics);
  }

  private checkThresholds(metrics: HealthMetrics): void {
    if (metrics.latency > this.thresholds.latency) {
      this.createAlert('latency', 'high', metrics.latency, this.thresholds.latency);
    }
    if (metrics.availability < this.thresholds.availability) {
      this.createAlert('availability', 'high', metrics.availability, this.thresholds.availability);
    }
    if (metrics.crashRate > this.thresholds.crashRate) {
      this.createAlert('crashRate', 'critical', metrics.crashRate, this.thresholds.crashRate);
    }
  }

  private createAlert(metricName: string, severity: 'critical' | 'high' | 'medium' | 'low', value: number, threshold: number): void {
    const alert: HealthAlert = {metricName, severity, value, threshold, timestamp: Date.now()};
    this.alerts.push(alert);
    logger.warn(`Health alert: ${severity} - ${metricName} is ${value} (threshold: ${threshold})`);
  }

  getAlerts(): HealthAlert[] {
    return this.alerts;
  }

  getRecentMetrics(minutes: number = 60): HealthMetrics[] {
    const cutoff = Date.now() - minutes * 60 * 1000;
    return this.metrics.filter((m) => m.timestamp > cutoff);
  }
}
