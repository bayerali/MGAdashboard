// Simple localStorage persistence helpers
export function load(key, fallback) {
  try {
    const raw = localStorage.getItem(key)
    return raw ? JSON.parse(raw) : fallback
  } catch {
    return fallback
  }
}

export function save(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value))
  } catch {
    // storage full or unavailable – ignore
  }
}

export const DEFAULT_PRODUKTE = [
  { id: 'yasmin20', name: 'Yasmin20', teiler: 24, color: 'from-blue-700 to-blue-500' },
  { id: 'yasmin30', name: 'Yasmin30', teiler: 21, color: 'from-cyan-700 to-cyan-500' },
  { id: 'angeliq28', name: 'Angeliq28', teiler: 28, color: 'from-purple-700 to-purple-500' },
  { id: 'angeliq14', name: 'Angeliq14', teiler: 14, color: 'from-pink-700 to-pink-500' },
  { id: 'microlut28', name: 'Microlut28', teiler: 28, color: 'from-green-700 to-green-500' },
  { id: 'diane35', name: 'Diane35', teiler: 21, color: 'from-orange-700 to-orange-500' },
  { id: 'qlaira', name: 'Qlaira', teiler: null, color: 'from-red-700 to-red-500' },
]

export const COLOR_OPTIONS = [
  'from-blue-700 to-blue-500',
  'from-cyan-700 to-cyan-500',
  'from-purple-700 to-purple-500',
  'from-pink-700 to-pink-500',
  'from-green-700 to-green-500',
  'from-orange-700 to-orange-500',
  'from-red-700 to-red-500',
  'from-teal-700 to-teal-500',
  'from-amber-700 to-amber-500',
  'from-indigo-700 to-indigo-500',
]

export const SCHICHTEN = ['Frühschicht', 'Spätschicht', 'Nachtschicht']
