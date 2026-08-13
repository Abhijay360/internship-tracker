import type { KindFilter, StatusFilter } from '../types'
import { KIND_LABELS, KIND_ORDER, STATUS_LABELS, STATUS_ORDER } from '../types'

type FilterTabsProps = {
  status: StatusFilter
  kind: KindFilter
  onStatusChange: (filter: StatusFilter) => void
  onKindChange: (filter: KindFilter) => void
  statusCounts: Record<StatusFilter, number>
  kindCounts: Record<KindFilter, number>
}

const STATUS_FILTERS: StatusFilter[] = ['all', ...STATUS_ORDER]
const KIND_FILTERS: KindFilter[] = ['all', ...KIND_ORDER]

export function FilterTabs({
  status,
  kind,
  onStatusChange,
  onKindChange,
  statusCounts,
  kindCounts,
}: FilterTabsProps) {
  return (
    <div className="filter-groups">
      <div className="filter-tabs" role="tablist" aria-label="Filter by type">
        {KIND_FILTERS.map((filter) => (
          <button
            key={filter}
            type="button"
            role="tab"
            aria-selected={kind === filter}
            className={`filter-tab ${kind === filter ? 'active' : ''}`}
            onClick={() => onKindChange(filter)}
          >
            {filter === 'all' ? 'All types' : KIND_LABELS[filter]}
            <span className="filter-count">{kindCounts[filter]}</span>
          </button>
        ))}
      </div>
      <div className="filter-tabs" role="tablist" aria-label="Filter by status">
        {STATUS_FILTERS.map((filter) => (
          <button
            key={filter}
            type="button"
            role="tab"
            aria-selected={status === filter}
            className={`filter-tab ${status === filter ? 'active' : ''}`}
            onClick={() => onStatusChange(filter)}
          >
            {filter === 'all' ? 'All' : STATUS_LABELS[filter]}
            <span className="filter-count">{statusCounts[filter]}</span>
          </button>
        ))}
      </div>
    </div>
  )
}
