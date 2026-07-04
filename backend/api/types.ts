export interface AIRequest {
  conversationId: string;
  userId: string;
  message: string;
  language: SupportedLanguage;
  context?: Record<string, unknown>;
  offline?: boolean;
}

export interface AIResponse {
  id: string;
  conversationId: string;
  message: string;
  language: SupportedLanguage;
  provider: ProviderName;
  model: string;
  tokens: TokenUsage;
  timestamp: number;
  confidence?: number;
}

export type SupportedLanguage = 'en' | 'zu' | 'st' | 'tn' | 'xh' | 'af' | 'ss' | 'nd' | 'nr' | 've' | 'ts';
export type ProviderName = 'openai' | 'google' | 'anthropic' | 'local';

export interface TokenUsage {
  input: number;
  output: number;
  total: number;
}

export interface ProviderCapabilities {
  chat: boolean;
  streaming: boolean;
  embeddings: boolean;
  vision: boolean;
  speech: boolean;
  tools: boolean;
  jsonMode: boolean;
  languageSupport: SupportedLanguage[];
}

export interface HealthMetrics {
  latency: number;
  availability: number;
  crashRate: number;
  tokenCost: number;
  knowledgeFreshness: number;
  promptQuality: number;
  timestamp: number;
}

export interface RiskAssessment {
  level: 'critical' | 'high' | 'medium' | 'low';
  factors: string[];
  mitigations: string[];
  regressionRisk: boolean;
  securityRisk: boolean;
}

export interface ApprovalRequest {
  id: string;
  type: 'deployment' | 'model-switch' | 'prompt-update' | 'policy-change';
  description: string;
  risk: RiskAssessment;
  testPlan: string[];
  rollbackPlan: string;
  requiredApprovers: number;
  approvals: ApprovalSignature[];
  status: 'pending' | 'approved' | 'rejected' | 'cancelled';
  createdAt: number;
  expiresAt: number;
}

export interface ApprovalSignature {
  approver: string;
  timestamp: number;
  notes?: string;
}

export interface AuditLog {
  id: string;
  timestamp: number;
  actor: string;
  action: string;
  resource: string;
  changes: Record<string, unknown>;
  risk: RiskAssessment;
  approval?: ApprovalRequest;
  result: 'success' | 'failure';
  reason?: string;
}
