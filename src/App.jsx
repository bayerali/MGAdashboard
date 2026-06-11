import React from 'react'
import Rechner from './components/Rechner.jsx'
import Statistik from './components/Statistik.jsx'
import Verlauf from './components/Verlauf.jsx'
import Produkte from './components/Produkte.jsx'
import { load, save, DEFAULT_PRODUKTE, SCHICHTEN } from './lib/storage.js'

const TABS = [
  { id: 'rechner', label: 'Rechner' },
  { id: 'statistik', label: 'Statistik' },
  { id: 'verlauf', label: 'Verlauf' },
  { id: 'produkte', label: 'Produkte' },
]

export default function App() {
  const [tab, setTab] = React.useState('rechner')
  const [produkte, setProdukte] = React.useState(() => load('pd_produkte', DEFAULT_PRODUKTE))
  const [log, setLog] = React.useState(() => load('pd_log', []))

  React.useEffect(() => save('pd_produkte', produkte), [produkte])
  React.useEffect(() => save('pd_log', log), [log])

  return (
    <div className="min-h-screen p-4 md:p-6 bg-gradient-to-br from-zinc-900 via-gray-800 to-black text-white">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="rounded-3xl shadow-2xl p-6 mb-6 border border-zinc-700 bg-zinc-900">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold tracking-wide">
                Produktions-Dashboard
              </h1>
              <p className="text-gray-400 mt-1">
                Blister-Rechner · Statistik · Schichtverlauf
              </p>
            </div>
            <div className="text-right text-gray-400">
              <div className="text-sm">
                {new Date().toLocaleDateString('de-DE', {
                  weekday: 'long',
                  day: '2-digit',
                  month: '2-digit',
                  year: 'numeric',
                })}
              </div>
              <div className="text-cyan-400 font-bold">
                {log.length} gespeicherte Berechnungen
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex flex-wrap gap-2 mt-6">
            {TABS.map((t) => (
              <button
                key={t.id}
                onClick={() => setTab(t.id)}
                className={`px-5 py-3 rounded-xl font-bold transition-all ${
                  tab === t.id
                    ? 'bg-cyan-500 text-white shadow-lg'
                    : 'bg-zinc-800 text-gray-300 hover:bg-zinc-700'
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        {tab === 'rechner' && (
          <Rechner
            produkte={produkte}
            schichten={SCHICHTEN}
            onLog={(eintrag) => setLog((l) => [...l, eintrag])}
          />
        )}
        {tab === 'statistik' && <Statistik log={log} produkte={produkte} />}
        {tab === 'verlauf' && <Verlauf log={log} setLog={setLog} />}
        {tab === 'produkte' && <Produkte produkte={produkte} setProdukte={setProdukte} />}
      </div>
    </div>
  )
}
