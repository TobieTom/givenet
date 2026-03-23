// ============================================================
// GiveNet — Shared Utility Functions
// ============================================================

// Format a Firestore Timestamp or JS Date to a readable string.
export function formatDate(timestamp) {
  if (!timestamp) return '';
  const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
  return date.toLocaleDateString('en-NG', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
}

// Return the number of whole days until an expiry timestamp.
// Returns 0 if already expired.
export function daysRemaining(expiryTimestamp) {
  if (!expiryTimestamp) return null;
  const expiry = expiryTimestamp.toDate ? expiryTimestamp.toDate() : new Date(expiryTimestamp);
  const diff = Math.ceil((expiry - Date.now()) / (1000 * 60 * 60 * 24));
  return diff > 0 ? diff : 0;
}

// Show a temporary toast notification.
// type: 'success' | 'error' | 'warning'
export function showToast(message, type = 'success') {
  const existing = document.querySelector('.toast-gn');
  if (existing) existing.remove();

  const toast = document.createElement('div');
  toast.className = `toast-gn toast-${type}`;
  toast.textContent = message;
  document.body.appendChild(toast);
  setTimeout(() => toast.remove(), 3500);
}

// Truncate a string to maxLength characters, appending '…'.
export function truncate(text, maxLength = 100) {
  if (!text) return '';
  return text.length > maxLength ? text.slice(0, maxLength) + '…' : text;
}

// Debounce — delays fn until delay ms after the last call.
// Used for live search inputs.
export function debounce(fn, delay = 300) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
}

// Replace container contents with skeleton placeholder rows.
export function showSkeleton(containerId, count = 3, height = '80px') {
  const el = document.getElementById(containerId);
  if (!el) return;
  el.innerHTML = Array(count)
    .fill(`<div class="skeleton" style="height:${height}; margin-bottom:12px;"></div>`)
    .join('');
}

// Clear skeleton placeholders.
export function hideSkeleton(containerId) {
  const el = document.getElementById(containerId);
  if (el) el.innerHTML = '';
}

// Sanitise a user-supplied string to prevent XSS.
// Use when injecting user content into innerHTML.
export function escapeHtml(str) {
  if (!str) return '';
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

// Return a CSS class string for a given item/request status.
export function statusBadgeClass(status) {
  const map = {
    available:  'badge-available',
    pending:    'badge-pending',
    requested:  'badge-requested',
    'on hold':  'badge-on-hold',
    collected:  'badge-collected',
    cancelled:  'badge-cancelled',
    approved:   'badge-approved',
    declined:   'badge-declined',
    expired:    'badge-expired',
  };
  return map[(status || '').toLowerCase()] || 'badge-pending';
}
