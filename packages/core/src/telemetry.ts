export type TelemetryMetricKind = 'counter' | 'histogram' | 'gauge';

export interface TelemetryMetric {
  name: string;
  kind: TelemetryMetricKind;
  value: number;
  recordedAt: string;
  attributes?: Record<string, string | number | boolean>;
}

export interface TelemetryRecorder {
  recordMetric(metric: TelemetryMetric): Promise<void> | void;
}

export class InMemoryTelemetryRecorder implements TelemetryRecorder {
  private readonly metrics: TelemetryMetric[] = [];

  recordMetric(metric: TelemetryMetric): void {
    this.metrics.push({
      ...metric,
      attributes: metric.attributes ? { ...metric.attributes } : undefined,
    });
  }

  list(name?: string): TelemetryMetric[] {
    return this.metrics
      .filter((metric) => !name || metric.name === name)
      .map((metric) => ({
        ...metric,
        attributes: metric.attributes ? { ...metric.attributes } : undefined,
      }));
  }

  sum(name: string): number {
    return this.metrics
      .filter((metric) => metric.name === name)
      .reduce((total, metric) => total + metric.value, 0);
  }
}
