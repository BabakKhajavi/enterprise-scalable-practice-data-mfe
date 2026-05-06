import { BehaviorSubject } from 'rxjs';

interface AuthState {
  user: any;
  token: string | null;
}

const AUTH_STATE_KEY = 'authState';

// Try to load the full state from localStorage
function loadAuthState(): AuthState {
  const stored = localStorage.getItem(AUTH_STATE_KEY);
  if (stored) {
    try {
      return JSON.parse(stored);
    } catch {
      // fallback if corrupted
    }
  }
  // fallback to legacy token or default
  return {
    user: {},
    token: localStorage.getItem('token') || null,
  };
}

const initialState: AuthState = loadAuthState();

export const auth$ = new BehaviorSubject<AuthState>(initialState);

// Persist state on every change
auth$.subscribe((state) => {
  localStorage.setItem(AUTH_STATE_KEY, JSON.stringify(state));
  // Optionally, keep legacy token in sync for backward compatibility
  if (state.token) {
    localStorage.setItem('token', state.token);
  } else {
    localStorage.removeItem('token');
  }
});

export const authActions = {
  login: (token: string, user: any) => {
    auth$.next({ token, user });
  },
  logout: () => {
    auth$.next({ token: null, user: {} });
  },
  updateUser: (user: any) => {
    const current = auth$.value;
    auth$.next({ ...current, user });
  },
};
