// ============================================================
// GiveNet — Auth Guard
// Protects routes based on authentication state and user role.
// ============================================================

import { auth, db } from './firebase-config.js';
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";
import { doc, getDoc } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

// Redirect unauthenticated users to login.
// Call at the top of any protected page.
export function requireAuth(redirectTo = 'login.html') {
  onAuthStateChanged(auth, (user) => {
    if (!user) {
      window.location.href = redirectTo;
    }
  });
}

// Redirect already-authenticated users away from auth pages
// (login, signup, etc.) to their role-specific dashboard.
export function requireGuest() {
  onAuthStateChanged(auth, async (user) => {
    if (!user) return;
    const role = await getUserRole(user.uid);
    // Doc doesn't exist yet (e.g. mid-signup race) — don't redirect
    if (role === null) return;
    if (role === 'admin')          window.location.href = 'admin-dashboard.html';
    else if (role === 'recipient') window.location.href = 'recipient-dashboard.html';
    else                           window.location.href = 'donor-dashboard.html';
  });
}

// Fetch the current user's role from Firestore.
// Returns 'donor' | 'recipient' | 'admin' | null.
export async function getUserRole(uid) {
  try {
    const snap = await getDoc(doc(db, 'users', uid));
    return snap.exists() ? snap.data().role : null;
  } catch {
    return null;
  }
}

// Require a specific role. Redirects if user is unauthenticated
// or has a different role.
export function requireRole(expectedRole, redirectTo = '../index.html') {
  onAuthStateChanged(auth, async (user) => {
    if (!user) {
      window.location.href = 'login.html';
      return;
    }
    const role = await getUserRole(user.uid);
    if (role !== expectedRole) {
      window.location.href = redirectTo;
    }
  });
}
