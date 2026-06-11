import React from 'react'

function KpiCard({ label, value, accent }) {
  return (
    <div className="bg-zinc-900 border border-zinc-700 rounded-2xl p-5 shadow-xl">
      <div className="text-gray-400 text-sm mb-1">{label}</div>
      <div className={`text-3xl font-extrabold ${accent || 'text-white'}`}>{value}</div>
    </div>
  )
}

function BarChart({ data, title, unit }) {
  const max = Math.max(...data.map((d) => d.value), 1)
  return (
    <div className="bg-zinc-900 border border-zinc-700 rounded-3xl p-6 shadow-2xl">
      <h3 className="text-xl font-bold text-gray-200 mb-4">{title}</h3>
      {data.length === 0 && <div className="text-gray-500">Keine Daten vorhanden.</div>}
      <div className="space-y-3">
        {data.map((d) => (
          <div key={d.label}>
            <div className="flex justify-between text-sm mb-1">
              <span className="text-gray-300">{d.label}</span>
              <span className="text-gray-400">
                {d.value.toLocaleString('de-DE')} {unit}
              </span>
            </div>
            <div className="h-4 bg-zinc-800 rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full bg-gradient-to-r ${d.color || 'from-cyan-700 to-cyan-400'}`}
                style={{ width: `${(d.value / max) * 100}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default function Statistik({ log, produkte }) {
  const heute = new Date().toDateString()
  const logHeute = log.filter((e) => new Date(e.zeit).toDateString() === heute)

  const summe = (arr, key) => arr.reduce((s, e) => s + (e[key] || 0), 0)

  const proProdukt = produkte
    .map((p) => ({
      label: p.name,
      color: p.color,
      value: summe(log.filter((e) => e.produktId === p.id), 'blister'),
    }))
    .filter((d) => d.value > 0)
    .sort((a, b) => b.value - a.value)

  const schichten = ['Frühschicht', 'Spätschicht', 'Nachtschicht']
  const proSchicht = schichten
    .map((s) => ({
      label: s,
      value: summe(log.filter((e) => e.schicht === s), 'blister'),
    }))
    .filter((d) => d.value > 0)

  // last 7 days trend
  const tage = [...Array(7)].map((_, i) => {
    const d = new Date()
    d.setDate(d.getDate() - (6 - i))
    const key = d.toDateString()
    return {
      label: d.toLocaleDateString('de-DE', { weekday: 'short', day: '2-digit', month: '2-digit' }),
      value: summe(log.filter((e) => new Date(e.zeit).toDateString() === key), 'blister'),
    }
  })

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <KpiCard label="Berechnungen gesamt" value={log.length} />
        <KpiCard
          label="Blister gesamt"
          value={summe(log, 'blister').toLocaleString('de-DE')}
          accent="text-cyan-400"
        />
        <KpiCard
          label="Blister heute"
          value={summe(logHeute, 'blister').toLocaleString('de-DE')}
          accent="text-green-400"
        />
        <KpiCard
          label="Rest-Pillen gesamt"
          value={summe(log, 'rest').toLocaleString('de-DE')}
          accent="text-amber-400"
        />
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <BarChart data={proProdukt} title="Blister pro Produkt" unit="Blister" />
        <BarChart data={proSchicht} title="Blister pro Schicht" unit="Blister" />
      </div>

      <BarChart data={tage} title="Produktion – letzte 7 Tage" unit="Blister" />
    </div>
  )
}
