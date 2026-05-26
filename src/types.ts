export type VerticalType = 'Care' | 'Education' | 'Business';

export type ConsultantLevel = 'Junior' | 'Premium' | 'Master';

export interface Product {
  id: string;
  name: string;
  vertical: VerticalType;
  price: number;
  commissionRate: number; // rate that goes to the salesman vs Hub (e.g. 0.8 for 80%)
  hubSplitRate: number; // e.g. 0.2 for 20%
  description: string;
  recurrent: boolean;
  marketingHook: string;
  features: string[];
  suggestedSteps: string[];
  targetAudience: string;
  // Dynamic links can be customized per counselor
  detailsUrl: string;
}

export interface ConsultantState {
  id: string;
  name: string;
  whatsapp: string;
  email: string;
  level: ConsultantLevel;
  balance: number;
  points: number; // 1 point per sales simulation
  salesCount: number;
  assessmentResult: string | null; // Profile name e.g., "Executor Comunicador"
  completedTrainings: string[]; // List of training module IDs
  isRegistered: boolean;
  status: 'active' | 'suspended';
}

export interface SimulatedSale {
  id: string;
  date: string;
  productName: string;
  vertical: VerticalType;
  price: number;
  commissionPaid: number;
  hubSplit: number;
  buyerName: string;
  franchiseeId?: string; // linked to franchisee who did it
  franchiseeName?: string;
}

export interface ResponsibilityItem {
  id: string;
  role: string;
  hubDelivers: string;
  consultantDoes: string;
  category: 'Comercial' | 'Marketing' | 'Cobrança' | 'Sucesso';
}

export interface LeadInfo {
  id: string;
  name: string;
  whatsapp: string;
  interest: string;
  source: string;
  date: string;
  assignedTo: string | null; // ID of the franchisee assigned to
  status: 'novo' | 'abordado' | 'convertido' | 'perdido';
}
