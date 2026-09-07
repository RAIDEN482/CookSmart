import { useState, useEffect, useRef, KeyboardEvent } from 'react'
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
      {/* ── Input row ─────────────────────────────────────────── */}
      <div className="flex flex-col sm:flex-row gap-3">

        {/* Chip container + text input */}
        <div
          className="flex-1 min-h-[56px] bg-surface rounded-card border border-line
                     px-3 py-2 flex flex-wrap gap-2 items-center cursor-text
                     focus-within:border-primary focus-within:ring-2
                     focus-within:ring-primary/20 transition-all"
          onClick={() => inputRef.current?.focus()}
          role="group"
          aria-label="Ingredient chips"
        >
          {/* Chips */}
          {chips.map((chip) => (
            <span key={chip} className="chip" aria-label={chip}>
              {chip}
              <button
                type="button"
                className="chip-remove"
                aria-label={`Remove ${chip}`}
                onClick={(e) => { e.stopPropagation(); removeChip(chip) }}
              >
                <X size={11} strokeWidth={2.5} />
              </button>
            </span>
          ))}

          {/* Text input */}
          <input
            ref={inputRef}
            id="ingredient-input"
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={chips.length === 0 ? 'Type an ingredient and press Enter…' : ''}
            className="flex-1 min-w-[160px] bg-transparent outline-none text-ink
                       placeholder-muted text-sm py-1"
            aria-label="Add ingredient"
            aria-autocomplete="list"
            aria-controls="suggestion-list"
            aria-activedescendant={
              activeSuggestion >= 0 ? `suggestion-${activeSuggestion}` : undefined
            }
            autoComplete="off"
          />
        </div>

        {/* Find Recipes button — full-width on mobile, fixed right on desktop */}
        <button
          id="find-recipes-btn"
          type="button"
          className="btn-accent w-full sm:w-auto sm:shrink-0 gap-2"
          onClick={handleSubmit}
          aria-label="Find recipes"
        >
          Find Recipes
          <ChevronRight size={16} strokeWidth={2} aria-hidden="true" />
        </button>
      </div>

      {/* ── Autocomplete dropdown ──────────────────────────────── */}
      {suggestions.length > 0 && (
        <div
          id="suggestion-list"
          role="listbox"
          aria-label="Ingredient suggestions"
          className="mt-1.5 bg-surface rounded-card border border-line shadow-card
                     max-h-52 overflow-y-auto animate-fade-in z-30 relative"
        >
          {suggestions.map((s, i) => (
            <button
              key={s}
              id={`suggestion-${i}`}
              role="option"
              aria-selected={activeSuggestion === i}
              type="button"
              onMouseDown={(e) => { e.preventDefault(); addChip(s) }}
              className={[
                'w-full text-left px-4 py-2.5 text-sm transition-colors',
                activeSuggestion === i
                  ? 'bg-primary/10 text-primary'
                  : 'text-ink hover:bg-bg',
              ].join(' ')}
            >
              {/* Highlight matching part */}
              <HighlightMatch text={s} query={inputValue} />
            </button>
          ))}
        </div>
      )}

      {/* ── Helper text ────────────────────────────────────────── */}
      {chips.length === 0 && (
        <p className="mt-2 text-xs text-muted">
          Press <kbd className="bg-line rounded px-1 py-0.5 font-mono text-[11px]">Enter</kbd> or{' '}
          <kbd className="bg-line rounded px-1 py-0.5 font-mono text-[11px]">,</kbd> after each ingredient
        </p>
      )}
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
