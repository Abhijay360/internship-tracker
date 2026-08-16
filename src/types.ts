export type ApplicationStatus = 'in_process' | 'accepted' | 'rejected'

export type ApplicationKind = 'internship' | 'transfer' | 'conference' | 'hackathon'

export type PayInfo = {
  /** Short label shown on the card / in the pay panel */
  summary: string
  /** Extra context: housing, bonuses, program structure */
  details: string
  /** Where the estimate came from */
  source: string
  hourlyMin?: number
  hourlyMax?: number
  /** Flat stipend / program fee when not hourly */
  flatAmount?: number
  flatUnit?: string
}

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
  pay?: PayInfo
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
  hackathon: 'Hackathon',
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
  'hackathon',
]
