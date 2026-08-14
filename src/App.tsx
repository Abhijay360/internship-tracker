import { useMemo, useState } from 'react'
import { ApplicationCard } from './components/ApplicationCard'
import { AddApplicationForm } from './components/AddApplicationForm'
import { FilterTabs } from './components/FilterTabs'
import { StatsBar } from './components/StatsBar'
import { useApplications } from './hooks/useApplications'
import type { KindFilter, StatusFilter } from './types'
import { KIND_ORDER, STATUS_ORDER } from './types'

function App() {
  const {
    applications,
    updateStatus,
    updateNotes,
    addApplication,
    removeApplication,
  } = useApplications()

  const [statusFilter, setStatusFilter] = useState<StatusFilter>('all')
  const [kindFilter, setKindFilter] = useState<KindFilter>('all')

  const filtered = useMemo(() => {
    return applications.filter((a) => {
      const statusOk = statusFilter === 'all' || a.status === statusFilter
      const kindOk = kindFilter === 'all' || a.kind === kindFilter
      return statusOk && kindOk
    })
  }, [applications, statusFilter, kindFilter])

  const statusCounts = useMemo(() => {
    const scoped =
      kindFilter === 'all'
        ? applications
        : applications.filter((a) => a.kind === kindFilter)
    const base = { all: scoped.length } as Record<StatusFilter, number>
    for (const status of STATUS_ORDER) {
      base[status] = scoped.filter((a) => a.status === status).length
    }
    return base
  }, [applications, kindFilter])

  const kindCounts = useMemo(() => {
    const base = { all: applications.length } as Record<KindFilter, number>
    for (const kind of KIND_ORDER) {
      base[kind] = applications.filter((a) => a.kind === kind).length
    }
    return base
  }, [applications])

  return (
    <div className="site">
      <div className="bg-grid" aria-hidden="true" />
      <div className="bg-glow bg-glow-a" aria-hidden="true" />
      <div className="bg-glow bg-glow-b" aria-hidden="true" />

      <header className="hero">
        <p className="hero-season">Summer internships · Spring transfers</p>
        <h1 className="hero-title">Pipeline</h1>
        <p className="hero-sub">
          Track internships, transfers, and conferences — in process, accepted, or rejected.
        </p>
      </header>

      <main className="main">
        <StatsBar applications={applications} />

        <section className="controls">
          <FilterTabs
            status={statusFilter}
            kind={kindFilter}
            onStatusChange={setStatusFilter}
            onKindChange={setKindFilter}
            statusCounts={statusCounts}
            kindCounts={kindCounts}
          />
          <AddApplicationForm onAdd={addApplication} />
        </section>

        <section className="app-list" aria-label="Applications">
          {filtered.length === 0 ? (
            <p className="empty-state">No applications match this filter.</p>
          ) : (
            filtered.map((app, i) => (
              <ApplicationCard
                key={app.id}
                application={app}
                index={i}
                onStatusChange={updateStatus}
                onNotesChange={updateNotes}
                onRemove={removeApplication}
              />
            ))
          )}
        </section>
      </main>

      <footer className="footer">
        <p>
          Click a role for estimated hourly pay. Changes save automatically to your browser.
        </p>
      </footer>
    </div>
  )
}

export default App
