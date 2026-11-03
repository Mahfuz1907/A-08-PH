import { toast } from "sonner"

export type SessionUser = {
  name: string
  email?: string
  image?: string | null
}

/**
 * The single seam between the UI and authentication.
 *
 * There is no auth system in the client or the API yet, so this always
 * reports a logged-out session and the Navbar renders its signed-out state
 * (Login / Register). When auth lands, swap the hardcoded `null` for real
 * session state (a provider/context backed by your API or JWT) and clear
 * the session inside `logout` — the Navbar, its avatar dropdown and the
 * mobile sheet will switch to their authenticated state automatically.
 */
export function useAuth(): { user: SessionUser | null; logout: () => void } {
  const user: SessionUser | null = null

  function logout() {
    // TODO(auth): clear the session/token here before announcing it.
    toast.success("You have been logged out.")
  }

  return { user, logout }
}
