import React from 'react'

export default function Rechner({ produkte, schichten, onLog }) {
  const [ausgewaehlt, setAusgewaehlt] = React.useState(null)
  const [x, setX] = React.useState('')
  const [schicht, setSchicht] = React.useState(schichten[0])
  const [charge, setCharge] = React.useState('')
  const [gespeichert, setGespeichert] = React.useState(false)

  const istSonderfall = ausgewaehlt && (ausgewaehlt.teiler === null || ausgewaehlt.teiler === 0)

  const ergebnis = React.useMemo(() => {
    if (!ausgewaehlt || x === '' || Number(x) < 0) return null
    if (istSonderfall) return 'Sonderfall'
    return Math.floor(Number(x) / ausgewaehlt.teiler)
  }, [ausgewaehlt, x, istSonderfall])

  const rest = React.useMemo(() => {
    if (!ausgewaehlt || istSonderfall || x === '') return null
    return Number(x) % ausgewaehlt.teiler
  }, [ausgewaehlt, x, istSonderfall])

  const speichern = () => {
    if (ergebnis === null || istSonderfall) return
    onLog({
      id: Date.now(),
      zeit: new Date().toISOString(),
      produktId: ausgewaehlt.id,
      produktName: ausgewaehlt.name,
      teiler: ausgewaehlt.teiler,
      pillen: Number(x),
      blister: ergebnis,
      rest,
      schicht,
      charge: charge.trim(),
    })
    setGespeichert(true)
    setTimeout(() => setGespeichert(false), 1500)
  }

  return (
    <div>
      {/* Product buttons */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {produkte.map((p) => (
          <button
            key={p.id}
            onClick={() => setAusgewaehlt(p)}
            className={`h-24 rounded-2xl text-lg font-bold shadow-xl transition-all duration-200 text-white
              bg-gradient-to-r ${p.color} hover:scale-105 hover:shadow-2xl
              ${ausgewaehlt?.id === p.id ? 'ring-4 ring-white' : ''}`}
          >
            {p.name}
            <div className="text-xs font-normal opacity-80 mt-1">
              {p.teiler ? `Teiler: ${p.teiler}` : 'Sonderfall'}
            </div>
          </button>
        ))}
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Input panel */}
        <div className="bg-zinc-900 border border-zinc-700 rounded-3xl p-6 shadow-2xl">
          <h2 className="text-2xl font-bold mb-4 text-gray-200">Eingabe</h2>

          <label className="block text-gray-400 mb-2">Gewähltes Produkt</label>
          <div className="bg-zinc-800 rounded-xl p-4 text-2xl font-bold min-h-[64px] flex items-center mb-4 text-white">
            {ausgewaehlt ? ausgewaehlt.name : 'Produkt auswählen'}
          </div>

          <label className="block text-gray-400 mb-2">Anzahl Pillen in der Wanne (X)</label>
          <input
            type="number"
            min="0"
            value={x}
            onChange={(e) => setX(e.target.value)}
            placeholder="Menge eingeben"
            className="w-full h-16 bg-zinc-800 border border-zinc-600 rounded-2xl text-3xl px-6 outline-none focus:border-cyan-400 text-white mb-4"
          />

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-400 mb-2">Schicht</label>
              <select
                value={schicht}
                onChange={(e) => setSchicht(e.target.value)}
                className="w-full h-12 bg-zinc-800 border border-zinc-600 rounded-xl px-3 text-white outline-none focus:border-cyan-400"
              >
                {schichten.map((s) => (
                  <option key={s}>{s}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-gray-400 mb-2">Charge (optional)</label>
              <input
                value={charge}
                onChange={(e) => setCharge(e.target.value)}
                placeholder="z. B. CH-2026-042"
                className="w-full h-12 bg-zinc-800 border border-zinc-600 rounded-xl px-3 text-white outline-none focus:border-cyan-400"
              />
            </div>
          </div>
        </div>

        {/* Result panel */}
        <div className="bg-zinc-900 border border-zinc-700 rounded-3xl p-6 shadow-2xl flex flex-col justify-center items-center">
          <h2 className="text-2xl font-bold text-gray-200 mb-6">Ergebnis</h2>

          <div className="w-full bg-gradient-to-br from-gray-700 to-zinc-900 rounded-3xl p-8 border border-zinc-600 text-center shadow-inner">
            <div className="text-gray-400 text-xl mb-2">Anzahl Blister</div>
            <div className="text-6xl font-extrabold text-cyan-400 tracking-wider">
              {ergebnis === null ? '–' : ergebnis}
            </div>
            {rest !== null && rest > 0 && (
              <div className="mt-3 text-amber-400 text-lg">Rest: {rest} Pillen</div>
            )}
          </div>

          {ausgewaehlt && !istSonderfall && (
            <div className="mt-4 text-gray-400">Formel: X ÷ {ausgewaehlt.teiler}</div>
          )}
          {istSonderfall && (
            <div className="mt-4 text-red-400 text-xl font-semibold">
              {ausgewaehlt.name} = Sonderfall – manuelle Prüfung erforderlich
            </div>
          )}

          <button
            onClick={speichern}
            disabled={ergebnis === null || istSonderfall}
            className="mt-6 w-full h-14 rounded-2xl font-bold text-lg transition-all
              bg-cyan-500 hover:bg-cyan-400 text-white shadow-lg
              disabled:bg-zinc-700 disabled:text-zinc-500 disabled:cursor-not-allowed"
          >
            {gespeichert ? 'Gespeichert ✓' : 'Berechnung speichern'}
          </button>
        </div>
      </div>
    </div>
  )
}
