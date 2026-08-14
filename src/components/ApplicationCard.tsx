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
  const [notesOpen, setNotesOpen] = useState(false)
  const [payOpen, setPayOpen] = useState(false)
  const [notes, setNotes] = useState(application.notes)

  const saveNotes = () => {
    onNotesChange(application.id, notes)
    setNotesOpen(false)
  }

  const pay = application.pay

  return (
    <article
      className={`app-card status-${application.status} ${payOpen ? 'pay-open' : ''}`}
      style={{ animationDelay: `${index * 60}ms` }}
    >
      <button
        type="button"
        className="app-card-hit"
        onClick={() => setPayOpen((v) => !v)}
        aria-expanded={payOpen}
        aria-controls={`pay-${application.id}`}
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
          <div className="app-header-right">
            <span className={`status-badge status-${application.status}`}>
              {STATUS_LABELS[application.status]}
            </span>
            {pay && (
              <span className="pay-chip" title="Click for pay details">
                {pay.summary}
              </span>
            )}
          </div>
        </div>
      </button>

      {payOpen && pay && (
        <div className="pay-panel" id={`pay-${application.id}`}>
          <div className="pay-panel-top">
            <p className="pay-panel-label">Estimated pay</p>
            <p className="pay-panel-summary">{pay.summary}</p>
          </div>
          <p className="pay-panel-details">{pay.details}</p>
          <p className="pay-panel-source">Source: {pay.source}</p>
          <p className="pay-panel-disclaimer">
            Community / public estimates — not an official offer. Actual pay varies by
            location, year, and team.
          </p>
        </div>
      )}

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
          onClick={() => setNotesOpen((v) => !v)}
          aria-expanded={notesOpen}
        >
          {notesOpen ? 'Hide notes' : application.notes ? 'Edit notes' : 'Add notes'}
        </button>

        {notesOpen && (
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

        {!notesOpen && application.notes && (
          <p className="app-notes-preview">{application.notes}</p>
        )}
      </div>
    </article>
  )
}
