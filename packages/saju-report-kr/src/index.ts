export type {
  ReportInput, ReportSection, SajuReport,
  Gender, BuildInputParams,
} from 'saju-report';

import {
  ReportGenerator as _ReportGenerator,
  DeepSeekReportGenerator as _DeepSeekReportGenerator,
  buildReportInput as _buildReportInput,
} from 'saju-report';
import type { ReportGeneratorOptions, BuildInputParams } from 'saju-report';

export class ReportGenerator extends _ReportGenerator {
  constructor(options: Omit<ReportGeneratorOptions, 'locale'> = {}) {
    super({ ...options, locale: 'kr' });
  }
}

export class DeepSeekReportGenerator extends _DeepSeekReportGenerator {
  constructor(options: Omit<{ apiKey?: string; model?: string }, 'locale'> = {}) {
    super({ ...options, locale: 'kr' });
  }
}

export function buildReportInput(params: Omit<BuildInputParams, 'locale'>) {
  return _buildReportInput({ ...params, locale: 'kr' });
}
