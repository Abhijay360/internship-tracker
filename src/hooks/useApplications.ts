import { useEffect, useState } from 'react'
import { SEED_APPLICATIONS } from '../data/applications'
import type { Application, ApplicationStatus } from '../types'

const STORAGE_KEY = 'pipeline-applications-v2'
const OBSOLETE_IDS = new Set(['akuna-capital', 'akuna-csharp'])

function loadApplications(): Application[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return SEED_APPLICATIONS
    const parsed = JSON.parse(raw) as Application[]
    if (parsed.length === 0) return SEED_APPLICATIONS

    const byId = new Map(parsed.map((app) => [app.id, app]))
    const merged = SEED_APPLICATIONS.map((seed) => {
      const saved = byId.get(seed.id)
      if (!saved) return seed
      return {
        ...seed,
        status: saved.status,
        notes:
          saved.notes === 'Volunteer application' && seed.role === 'Hacker'
            ? seed.notes
            : saved.notes,
      }
    })

    const seedIds = new Set(SEED_APPLICATIONS.map((app) => app.id))
    const extras = parsed.filter(
      (app) => !seedIds.has(app.id) && !OBSOLETE_IDS.has(app.id),
    )
    return [...merged, ...extras]
  } catch {
    return SEED_APPLICATIONS
  }
}

export function useApplications() {
  const [applications, setApplications] = useState<Application[]>(loadApplications)

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(applications))
  }, [applications])

  const updateStatus = (id: string, status: ApplicationStatus) => {
    setApplications((prev) =>
      prev.map((app) => (app.id === id ? { ...app, status } : app)),
    )
  }

  const updateNotes = (id: string, notes: string) => {
    setApplications((prev) =>
      prev.map((app) => (app.id === id ? { ...app, notes } : app)),
    )
  }

  const addApplication = (app: Omit<Application, 'id'>) => {
    const id = app.company.toLowerCase().replace(/[^a-z0-9]+/g, '-')
    setApplications((prev) => [{ ...app, id }, ...prev])
  }

  const removeApplication = (id: string) => {
    setApplications((prev) => prev.filter((app) => app.id !== id))
  }

  return {
    applications,
    updateStatus,
    updateNotes,
    addApplication,
    removeApplication,
  }
}
