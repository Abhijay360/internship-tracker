export type ApplicationStatus = 'in_process' | 'accepted' | 'rejected'

export type ApplicationKind = 'internship' | 'transfer' | 'conference'

export type Application = {
  id: string
  company: string
  role: string
  logo: string
  status: ApplicationStatus
  appliedDate: string
  notes: string
  location?: string
  kind: ApplicationKind
  season: string
}

export type StatusFilter = 'all' | ApplicationStatus
export type KindFilter = 'all' | ApplicationKind

export const STATUS_LABELS: Record<ApplicationStatus, string> = {
  in_process: 'In Process',
  accepted: 'Accepted',
  rejected: 'Rejected',
}

export const KIND_LABELS: Record<ApplicationKind, string> = {
  internship: 'Internship',
  transfer: 'Transfer',
  conference: 'Conference',
}

export const STATUS_ORDER: ApplicationStatus[] = [
  'in_process',
  'accepted',
  'rejected',
]

export const KIND_ORDER: ApplicationKind[] = [
  'internship',
  'transfer',
  'conference',
]
