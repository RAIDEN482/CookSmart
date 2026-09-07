import { useState, useEffect, useRef, type KeyboardEvent } from 'react'
import { X, ChevronRight } from 'lucide-react'
import { suggestIngredients } from '../lib/suggest'

interface IngredientInputProps {
  /** Called when user clicks "Find Recipes" */
  onSubmit: (ingredients: string[]) => void
  /** Pre-filled chips (e.g. from URL state on back-navigation) */
  initialChips?: string[]
}

export function IngredientInput({ onSubmit, initialChips = [] }: IngredientInputProps) {
  const [chips, setChips] = useState<string[]>(initialChips)
  const [inputValue, setInputValue] = useState('')
  const [suggestions, setSuggestions] = useState<string[]>([])
  const [activeSuggestion, setActiveSuggestion] = useState(-1)
  const inputRef = useRef<HTMLInputElement>(null)
  const dropdownRef = useRef<HTMLDivElement>(null)

  // Fetch suggestions on input change
  useEffect(() => {
    const timeout = setTimeout(async () => {
      const results = await suggestIngredients(inputValue)
      setSuggestions(results)
      setActiveSuggestion(-1)
    }, 120) // debounce 120ms
    return () => clearTimeout(timeout)
  }, [inputValue])

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleOutsideClick(e: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) setSuggestions([])
    }
    document.addEventListener('mousedown', handleOutsideClick)
    return () => document.removeEventListener('mousedown', handleOutsideClick)
  }, [])

  function addChip(value: string) {
    const trimmed = value.trim().toLowerCase()
    if (!trimmed || chips.includes(trimmed)) return
    setChips((prev) => [...prev, trimmed])
    setInputValue('')
    setSuggestions([])
    inputRef.current?.focus()
  }

  function removeChip(chip: string) {
    setChips((prev) => prev.filter((c) => c !== chip))
  }

  function handleKeyDown(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter') {
      e.preventDefault()
      if (activeSuggestion >= 0 && suggestions[activeSuggestion]) {
        addChip(suggestions[activeSuggestion])
      } else if (inputValue.trim()) {
        addChip(inputValue)
      } else if (chips.length > 0) {
        handleSubmit()
      }
    }
    if (e.key === ',') {
      e.preventDefault()
      addChip(inputValue)
    }
    if (e.key === 'Backspace' && !inputValue && chips.length > 0) {
      setChips((prev) => prev.slice(0, -1))
    }
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setActiveSuggestion((i) => Math.min(i + 1, suggestions.length - 1))
    }
    if (e.key === 'ArrowUp') {
      e.preventDefault()
      setActiveSuggestion((i) => Math.max(i - 1, -1))
    }
    if (e.key === 'Escape') {
      setSuggestions([])
    }
  }

  function handleSubmit() {
    // If there's still text in the input, treat it as a chip first
    const final = inputValue.trim()
      ? [...chips, inputValue.trim().toLowerCase()]
      : chips
    if (final.length === 0) return
    onSubmit(final)
  }

  return (
    <div className="w-full" ref={dropdownRef}>
      <form
        className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 mb-4"
        onSubmit={(e) => { e.preventDefault(); handleSubmit(); }}
      >
        <div className="relative flex-1 flex items-center bg-primary/5 rounded-lg px-4 border border-transparent focus-within:border-primary transition-colors">
          <span className="text-muted mr-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" /></svg>
          </span>
          <input
            ref={inputRef}
            id="ingredient-input"
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Add ingredients (e.g., eggs, garlic, pasta)..."
            className="w-full bg-transparent py-3 text-ink placeholder-muted focus:outline-none"
            autoComplete="off"
          />
          <button
            type="button"
            onClick={() => { if (inputValue.trim()) addChip(inputValue) }}
            className="text-primary hover:text-primary-dark p-1 text-xs font-semibold flex items-center gap-1 transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><path d="M8 12h8" /><path d="M12 8v8" /></svg>
            <span className="hidden md:inline">Add</span>
          </button>

          {/* Autocomplete dropdown */}
          {suggestions.length > 0 && (
            <div
              id="suggestion-list"
              role="listbox"
              className="absolute top-full left-0 right-0 mt-1 bg-surface rounded-lg border border-line shadow-card max-h-52 overflow-y-auto animate-fade-in z-30"
            >
              {suggestions.map((s, i) => (
                <button
                  key={s}
                  role="option"
                  aria-selected={activeSuggestion === i}
                  type="button"
                  onMouseDown={(e) => { e.preventDefault(); addChip(s) }}
                  className={[
                    'w-full text-left px-4 py-2.5 text-sm transition-colors',
                    activeSuggestion === i ? 'bg-primary/10 text-primary' : 'text-ink hover:bg-bg',
                  ].join(' ')}
                >
                  <HighlightMatch text={s} query={inputValue} />
                </button>
              ))}
            </div>
          )}
        </div>

        <button
          type="submit"
          className="h-12 px-8 rounded-lg bg-primary text-white font-semibold flex items-center justify-center gap-2 shadow-md hover:bg-primary-dark transition-all active:scale-[0.98] w-full sm:w-auto shrink-0"
        >
          <span>Find Recipes</span>
          <ChevronRight size={18} strokeWidth={2} />
        </button>
      </form>

      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between text-xs font-medium text-muted">
          <span className="flex items-center gap-1 uppercase tracking-wider">
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="14" x="2" y="7" rx="2" ry="2" /><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" /></svg>
            Current Basket ({chips.length})
          </span>
          {chips.length > 0 && (
            <button
              type="button"
              onClick={() => setChips([])}
              className="text-accent-text hover:underline transition-colors"
            >
              Clear all
            </button>
          )}
        </div>
        <div className="flex flex-wrap items-center gap-2 min-h-[36px]">
          {chips.map((chip) => (
            <span
              key={chip}
              className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-primary/10 text-ink text-sm font-medium transition-all hover:bg-primary/20 group animate-fade-in"
            >
              <span>{chip}</span>
              <button
                type="button"
                onClick={() => removeChip(chip)}
                className="text-muted hover:text-danger transition-colors flex items-center"
              >
                <X size={14} strokeWidth={2} />
              </button>
            </span>
          ))}
          {chips.length === 0 && (
            <span className="text-sm text-muted italic">No ingredients added yet.</span>
          )}
        </div>
      </div>
    </div>
  )
}

/** Bolds the matching substring in a suggestion */
function HighlightMatch({ text, query }: { text: string; query: string }) {
  if (!query) return <>{text}</>
  const idx = text.toLowerCase().indexOf(query.toLowerCase())
  if (idx === -1) return <>{text}</>
  return (
    <>
      {text.slice(0, idx)}
      <strong className="font-semibold text-primary">{text.slice(idx, idx + query.length)}</strong>
      {text.slice(idx + query.length)}
    </>
  )
}
