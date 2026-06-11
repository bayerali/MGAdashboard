import React from 'react'
import { COLOR_OPTIONS } from '../lib/storage.js'

export default function Produkte({ produkte, setProdukte }) {
  const [name, setName] = React.useState('')
  const [teiler, setTeiler] = React.useState('')
  const [color, setColor] = React.useState(COLOR_OPTIONS[0])
  const [editId, setEditId] = React.useState(null)
  const [fehler, setFehler] = React.useState('')

  const reset = () => {
    setName('')
    setTeiler('')
    setColor(COLOR_OPTIONS[0])
    setEditId(null)
    setFehler('')
  }

  const speichern = () => {
    const n = name.trim()
    if (!n) return setFehler('Name darf nicht leer sein.')
    const t = teiler === '' ? null : Number(teiler)
    if (t !== null && (!Number.isInteger(t) || t <= 0)) {
      return setFehler('Teiler muss eine positive ganze Zahl sein (oder leer für Sonderfall).')
    }
    const doppelt = produkte.some(
      (p) => p.name.toLowerCase() === n.toLowerCase() && p.id !== editId,
    )
    if (doppelt) return setFehler('Produktname existiert bereits.')

    if (editId) {
      setProdukte(produkte.map((p) => (p.id === editId ? { ...p, name: n, teiler: t, color } : p)))
    } else {
      setProdukte([...produkte, { id: `${Date.now()}`, name: n, teiler: t, color }])
    }
    reset()
  }

  const bearbeiten = (p) => {
    setEditId(p.id)
    setName(p.name)
    setTeiler(p.teiler === null ? '' : String(p.teiler))
    setColor(p.color)
    setFehler('')
  }

  const loeschen = (id) => {
    setProdukte(produkte.filter((p) => p.id !== id))
    if (editId === id) reset()
  }

  return (
    <div className="grid md:grid-cols-2 gap-6">
      {/* Form */}
      <div className="bg-zinc-900 border border-zinc-700 rounded-3xl p-6 shadow-2xl">
        <h2 className="text-2xl font-bold mb-4 text-gray-200">
          {editId ? 'Produkt bearbeiten' : 'Neues Produkt'}
        </h2>

        <label className="block text-gray-400 mb-2">Name</label>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="z. B. Yasmin20"
          className="w-full h-12 bg-zinc-800 border border-zinc-600 rounded-xl px-4 text-white outline-none focus:border-cyan-400 mb-4"
        />

        <label className="block text-gray-400 mb-2">Teiler (leer = Sonderfall)</label>
        <input
          type="number"
          min="1"
          value={teiler}
          onChange={(e) => setTeiler(e.target.value)}
          placeholder="z. B. 24"
          className="w-full h-12 bg-zinc-800 border border-zinc-600 rounded-xl px-4 text-white outline-none focus:border-cyan-400 mb-4"
        />

        <label className="block text-gray-400 mb-2">Farbe</label>
        <div className="grid grid-cols-5 gap-2 mb-4">
          {COLOR_OPTIONS.map((c) => (
            <button
              key={c}
              onClick={() => setColor(c)}
              className={`h-10 rounded-lg bg-gradient-to-r ${c} ${
                color === c ? 'ring-2 ring-white' : 'opacity-70 hover:opacity-100'
              }`}
              aria-label={c}
            />
          ))}
        </div>

        {fehler && <div className="text-red-400 mb-4">{fehler}</div>}

        <div className="flex gap-3">
          <button
            onClick={speichern}
            className="flex-1 h-12 rounded-xl bg-cyan-500 hover:bg-cyan-400 font-bold text-white"
          >
            {editId ? 'Speichern' : 'Hinzufügen'}
          </button>
          {editId && (
            <button
              onClick={reset}
              className="h-12 px-5 rounded-xl bg-zinc-700 hover:bg-zinc-600 text-white"
            >
              Abbrechen
            </button>
          )}
        </div>
      </div>

      {/* List */}
      <div className="bg-zinc-900 border border-zinc-700 rounded-3xl p-6 shadow-2xl">
        <h2 className="text-2xl font-bold mb-4 text-gray-200">
          Produkte ({produkte.length})
        </h2>
        <ul className="space-y-3">
          {produkte.map((p) => (
            <li
              key={p.id}
              className="flex items-center justify-between bg-zinc-800 rounded-xl p-3"
            >
              <div className="flex items-center gap-3">
                <span className={`w-8 h-8 rounded-lg bg-gradient-to-r ${p.color}`} />
                <div>
                  <div className="font-bold text-white">{p.name}</div>
                  <div className="text-sm text-gray-400">
                    {p.teiler ? `Teiler: ${p.teiler}` : 'Sonderfall'}
                  </div>
                </div>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => bearbeiten(p)}
                  className="px-3 py-2 rounded-lg bg-zinc-700 hover:bg-zinc-600 text-sm text-white"
                >
                  Bearbeiten
                </button>
                <button
                  onClick={() => loeschen(p.id)}
                  className="px-3 py-2 rounded-lg bg-red-900 hover:bg-red-800 text-sm text-white"
                >
                  Löschen
                </button>
              </div>
            </li>
          ))}
          {produkte.length === 0 && (
            <li className="text-gray-500">Keine Produkte angelegt.</li>
          )}
        </ul>
      </div>
    </div>
  )
}
