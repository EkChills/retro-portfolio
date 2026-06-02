import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

/**
 * `cn` — merge Tailwind class strings with conflict resolution.
 *
 * Lets components compose conditional classes safely without ending up with
 * `"px-2 px-4"` (where Tailwind's last-write-wins behavior already does what
 * twMerge guarantees, but consistently across the whole codebase).
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
