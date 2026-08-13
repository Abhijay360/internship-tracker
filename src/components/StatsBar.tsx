import type { Application } from '../types'
import { STATUS_LABELS, STATUS_ORDER } from '../types'

type StatsBarProps = {
  applications: Application[]
}

export function StatsBar({ applications }: StatsBarProps) {
  const total = applications.length
  const counts = STATUS_ORDER.reduce(
    (acc, status) => {
      acc[status] = applications.filter((a) => a.status === status).length
      return acc
    },
    {} as Record<string, number>,
  )

  return (
    <div className="stats-bar" aria-label="Application statistics">
      <div className="stat stat-total">
        <span className="stat-value">{total}</span>
        <span className="stat-label">Applied</span>
      </div>
      {STATUS_ORDER.map((status) => (
        <div key={status} className={`stat stat-${status}`}>
          <span className="stat-value">{counts[status]}</span>
          <span className="stat-label">{STATUS_LABELS[status]}</span>
        </div>
      ))}
    </div>
  )
}
