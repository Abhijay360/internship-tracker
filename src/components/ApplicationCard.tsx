import { useState } from 'react'
import type { Application, ApplicationStatus } from '../types'
import { KIND_LABELS, STATUS_LABELS, STATUS_ORDER } from '../types'

type ApplicationCardProps = {
  application: Application
  index: number
  onStatusChange: (id: string, status: ApplicationStatus) => void
  onNotesChange: (id: string, notes: string) => void
  onRemove: (id: string) => void
}

function formatDate(iso: string) {
  return new Date(iso + 'T12:00:00').toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
}

export function ApplicationCard({
  application,
  index,
  onStatusChange,
  onNotesChange,
  onRemove,
}: ApplicationCardProps) {
  const [expanded, setExpanded] = useState(false)
  const [notes, setNotes] = useState(application.notes)

  const saveNotes = () => {
    onNotesChange(application.id, notes)
    setExpanded(false)
  }

  return (
    <article
      className={`app-card status-${application.status}`}
      style={{ animationDelay: `${index * 60}ms` }}
    >
      <div className="app-card-header">
        <div className="app-logo-wrap">
          <img
            src={application.logo}
            alt=""
            className="app-logo"
            loading="lazy"
          />
        </div>
        <div className="app-meta">
          <h3 className="app-company">{application.company}</h3>
          <p className="app-role">{application.role}</p>
          <p className="app-location">
            <span className={`kind-chip kind-${application.kind}`}>
              {KIND_LABELS[application.kind]}
            </span>
            {application.season}
            {application.location ? ` · ${application.location}` : ''}
          </p>
        </div>
        <span className={`status-badge status-${application.status}`}>
          {STATUS_LABELS[application.status]}
        </span>
      </div>

      <div className="app-card-body">
        <p className="app-date">Applied {formatDate(application.appliedDate)}</p>

        <div className="status-actions" role="group" aria-label="Update status">
          {STATUS_ORDER.map((status) => (
            <button
              key={status}
              type="button"
              className={`status-btn status-btn-${status} ${
                application.status === status ? 'selected' : ''
              }`}
              onClick={() => onStatusChange(application.id, status)}
              aria-pressed={application.status === status}
            >
              {STATUS_LABELS[status]}
            </button>
          ))}
        </div>

        <button
          type="button"
          className="notes-toggle"
          onClick={() => setExpanded((v) => !v)}
          aria-expanded={expanded}
        >
          {expanded ? 'Hide notes' : application.notes ? 'Edit notes' : 'Add notes'}
        </button>

        {expanded && (
          <div className="notes-panel">
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Interview dates, recruiter contacts, follow-ups..."
              rows={3}
            />
            <div className="notes-actions">
              <button type="button" className="btn-save" onClick={saveNotes}>
                Save
              </button>
              <button
                type="button"
                className="btn-remove"
                onClick={() => onRemove(application.id)}
              >
                Remove
              </button>
            </div>
          </div>
        )}

        {!expanded && application.notes && (
          <p className="app-notes-preview">{application.notes}</p>
        )}
      </div>
    </article>
  )
}
