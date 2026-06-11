import React from 'react'
import { exportCsv } from '../lib/csv.js'
import { SCHICHTEN } from '../lib/storage.js'

export default function Verlauf({ log, setLog }) {
  const [filterSchicht, setFilterSchicht] = React.useState('Alle')
  const [suche, setSuche] = React.useState('')

  const gefiltert = log
    .filter((e) => filterSchicht === 'Alle' || e.schicht === filterSchicht)
    .filter(
      (e) =>
        !suche ||
        e.produktName.toLowerCase().includes(suche.toLowerCase()) ||
        (e.charge || '').toLowerCase().includes(suche.toLowerCase()),
    )
    .sort((a, b) => b.id - a.id)

  const exportieren = () => {
    exportCsv(
      `produktion_${new Date().toISOString().slice(0, 10)}.csv`,
      ['Datum', 'Uhrzeit', 'Produkt', 'Teiler', 'Pillen', 'Blister', 'Rest', 'Schicht', 'Charge'],
      gefiltert.map((e) => {
        const d = new Date(e.zeit)
        return [
          d.toLocaleDateString('de-DE'),
          d.toLocaleTimeString('de-DE'),
          e.produktName,
          e.teiler,
          e.pillen,
          e.blister,
          e.rest,
          e.schicht,
          e.charge || '',
        ]
      }),
    )
  }

  const loeschen = (id) => setLog(log.filter((e) => e.id !== id))
  const allesLoeschen = () => {
    if (confirm('Gesamten Verlauf wirklich löschen?')) setLog([])
  }

  return (
    <div className="bg-zinc-900 border border-zinc-700 rounded-3xl p-6 shadow-2xl">
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <h2 className="text-2xl font-bold text-gray-200">
          Verlauf ({gefiltert.length})
        </h2>
        <div className="flex flex-wrap gap-3">
          <input
            value={suche}
            onChange={(e) => setSuche(e.target.value)}
            placeholder="Produkt / Charge suchen"
            className="h-11 bg-zinc-800 border border-zinc-600 rounded-xl px-4 text-white outline-none focus:border-cyan-400"
          />
          <select
            value={filterSchicht}
            onChange={(e) => setFilterSchicht(e.target.value)}
            className="h-11 bg-zinc-800 border border-zinc-600 rounded-xl px-3 text-white outline-none focus:border-cyan-400"
          >
            <option>Alle</option>
            {SCHICHTEN.map((s) => (
              <option key={s}>{s}</option>
            ))}
          </select>
          <button
            onClick={exportieren}
            disabled={gefiltert.length === 0}
            className="h-11 px-5 rounded-xl bg-cyan-500 hover:bg-cyan-400 font-bold text-white disabled:bg-zinc-700 disabled:text-zinc-500"
          >
            CSV Export
          </button>
          <button
            onClick={allesLoeschen}
            disabled={log.length === 0}
            className="h-11 px-5 rounded-xl bg-red-900 hover:bg-red-800 text-white disabled:bg-zinc-700 disabled:text-zinc-500"
          >
            Alles löschen
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="text-gray-400 border-b border-zinc-700">
              <th className="py-3 pr-4">Zeit</th>
              <th className="py-3 pr-4">Produkt</th>
              <th className="py-3 pr-4">Pillen</th>
              <th className="py-3 pr-4">Blister</th>
              <th className="py-3 pr-4">Rest</th>
              <th className="py-3 pr-4">Schicht</th>
              <th className="py-3 pr-4">Charge</th>
              <th className="py-3" />
            </tr>
          </thead>
          <tbody>
            {gefiltert.map((e) => (
              <tr key={e.id} className="border-b border-zinc-800 text-gray-200">
                <td className="py-3 pr-4 whitespace-nowrap">
                  {new Date(e.zeit).toLocaleString('de-DE', {
                    day: '2-digit',
                    month: '2-digit',
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </td>
                <td className="py-3 pr-4 font-bold">{e.produktName}</td>
                <td className="py-3 pr-4">{e.pillen.toLocaleString('de-DE')}</td>
                <td className="py-3 pr-4 text-cyan-400 font-bold">{e.blister}</td>
                <td className="py-3 pr-4 text-amber-400">{e.rest || 0}</td>
                <td className="py-3 pr-4">{e.schicht}</td>
                <td className="py-3 pr-4">{e.charge || '–'}</td>
                <td className="py-3 text-right">
                  <button
                    onClick={() => loeschen(e.id)}
                    className="px-3 py-1 rounded-lg bg-zinc-700 hover:bg-red-900 text-xs text-white"
                  >
                    Löschen
                  </button>
                </td>
              </tr>
            ))}
            {gefiltert.length === 0 && (
              <tr>
                <td colSpan="8" className="py-8 text-center text-gray-500">
                  Keine Einträge vorhanden. Speichere Berechnungen im Rechner-Tab.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
