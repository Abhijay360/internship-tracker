import { useState } from 'react'
import type { Application, ApplicationKind, ApplicationStatus } from '../types'
import { KIND_LABELS, KIND_ORDER, STATUS_LABELS, STATUS_ORDER } from '../types'

type AddApplicationFormProps = {
  onAdd: (app: Omit<Application, 'id'>) => void
}

export function AddApplicationForm({ onAdd }: AddApplicationFormProps) {
  const [open, setOpen] = useState(false)
  const [company, setCompany] = useState('')
  const [role, setRole] = useState('')
  const [location, setLocation] = useState('')
  const [status, setStatus] = useState<ApplicationStatus>('in_process')
  const [kind, setKind] = useState<ApplicationKind>('internship')
  const [season, setSeason] = useState('Summer 2027')
  const [appliedDate, setAppliedDate] = useState(
    new Date().toISOString().slice(0, 10),
  )
  const [notes, setNotes] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!company.trim() || !role.trim()) return

    const slug = company.toLowerCase().replace(/[^a-z0-9]+/g, '')
    onAdd({
      company: company.trim(),
      role: role.trim(),
      logo: `/logos/${slug}.svg`,
      status,
      appliedDate,
      notes: notes.trim(),
      location: location.trim() || undefined,
      kind,
      season: season.trim() || 'Summer 2027',
    })

    setCompany('')
    setRole('')
    setLocation('')
    setStatus('in_process')
    setKind('internship')
    setSeason('Summer 2027')
    setAppliedDate(new Date().toISOString().slice(0, 10))
    setNotes('')
    setOpen(false)
  }

  return (
    <div className="add-form-wrap">
      <button
        type="button"
        className="add-toggle"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
      >
        {open ? 'Cancel' : '+ Add application'}
      </button>

      {open && (
        <form className="add-form" onSubmit={handleSubmit}>
          <div className="form-row">
            <label>
              Company
              <input
                type="text"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                placeholder="Google"
                required
              />
            </label>
            <label>
              Role
              <input
                type="text"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                placeholder="Software Engineering Intern"
                required
              />
            </label>
          </div>
          <div className="form-row">
            <label>
              Location
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="San Francisco, CA"
              />
            </label>
            <label>
              Applied date
              <input
                type="date"
                value={appliedDate}
                onChange={(e) => setAppliedDate(e.target.value)}
                required
              />
            </label>
          </div>
          <div className="form-row">
            <label>
              Type
              <select
                value={kind}
                onChange={(e) => {
                  const next = e.target.value as ApplicationKind
                  setKind(next)
                  if (next === 'transfer') setSeason('Spring 2027')
                  if (next === 'internship') setSeason('Summer 2027')
                  if (next === 'hackathon') setSeason('2026–2027')
                  if (next === 'campus') setSeason('2026–2027')
                }}
              >
                {KIND_ORDER.map((k) => (
                  <option key={k} value={k}>
                    {KIND_LABELS[k]}
                  </option>
                ))}
              </select>
            </label>
            <label>
              Season
              <input
                type="text"
                value={season}
                onChange={(e) => setSeason(e.target.value)}
                placeholder="Summer 2027"
              />
            </label>
          </div>
          <div className="form-row">
            <label>
              Status
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as ApplicationStatus)}
              >
                {STATUS_ORDER.map((s) => (
                  <option key={s} value={s}>
                    {STATUS_LABELS[s]}
                  </option>
                ))}
              </select>
            </label>
          </div>
          <label>
            Notes
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Optional notes..."
              rows={2}
            />
          </label>
          <button type="submit" className="btn-submit">
            Add to pipeline
          </button>
        </form>
      )}
    </div>
  )
}
