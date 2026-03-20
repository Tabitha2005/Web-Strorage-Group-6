/**
 * Task 1: User Authentication with Cookies
 * Implements login/logout functionality using HTTP cookies
 *
 * SECURITY LIMITATIONS (Frontend-only project running on HTTP):
 * - Secure flag: Requires HTTPS; silently fails on http://127.0.0.1 — omitted for local dev
 * - HttpOnly flag: Cannot be set from client-side JavaScript; must be set by the server
 *   In production, a server would set HttpOnly to prevent XSS access to the cookie
 */

// Helper: set a cookie
function setCookie(name, value, options = {}) {
  let cookieString = `${name}=${encodeURIComponent(value)}`;

  if (options.expires) {
    cookieString += `; expires=${options.expires.toUTCString()}`;
  }

  if (options.path) {
    cookieString += `; path=${options.path}`;
  }

  // Secure flag omitted for local HTTP development
  // Add "; Secure" here when deploying to HTTPS

  document.cookie = cookieString;
}

// Helper: read a cookie by name
function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) {
    return decodeURIComponent(parts.pop().split(';').shift());
  }
  return null;
}

// Helper: delete a cookie
function deleteCookie(name) {
  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/`;
}

/**
 * Sections that should only be visible when authenticated
 */
function getMainSections() {
  return [
    document.getElementById('settings'),
    document.getElementById('products'),
    document.getElementById('cart'),
    document.getElementById('security'),
  ];
}

/**
 * Show authenticated view:
 * - Hide login form
 * - Show welcome message + logout button
 * - Show all main content sections
 */
function showLogoutUI() {
  const loginForm = document.getElementById('loginForm');
  const logoutSection = document.getElementById('logoutSection');
  const welcomeMessage = document.getElementById('welcomeMessage');

  // Read username stored in the authToken cookie
  const storedUser = getCookie('authUser') || 'User';
  welcomeMessage.textContent = `Welcome, ${storedUser}!`;

  loginForm.style.display = 'none';
  logoutSection.style.display = 'block';

  getMainSections().forEach(section => {
    if (section) section.style.display = 'block';
  });
}

/**
 * Show unauthenticated view:
 * - Show login form
 * - Hide welcome message + logout button
 * - Hide all main content sections
 */
function showLoginUI() {
  const loginForm = document.getElementById('loginForm');
  const logoutSection = document.getElementById('logoutSection');

  loginForm.style.display = 'block';
  logoutSection.style.display = 'none';

  getMainSections().forEach(section => {
    if (section) section.style.display = 'none';
  });
}

/**
 * Initialize authentication on page load
 * Check authToken cookie and display the correct view
 */
function initializeAuth() {
  const authToken = getCookie('authToken');

  if (authToken === 'user123') {
    showLogoutUI();
  } else {
    showLoginUI();
  }

  attachAuthEventListeners();
}

/**
 * Attach login form and logout button event listeners
 */
function attachAuthEventListeners() {
  const loginForm = document.getElementById('loginForm');
  const logoutBtn = document.getElementById('logoutBtn');

  // Login — accepts any non-empty username and password (demo requirement)
  loginForm.addEventListener('submit', function (e) {
    e.preventDefault();

    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value.trim();

    if (!username || !password) return;

    // Set authToken cookie — value: user123, expiry: 7 days, path: /
    const expiry = new Date();
    expiry.setDate(expiry.getDate() + 7);

    setCookie('authToken', 'user123', { expires: expiry, path: '/' });

    // Store username separately so welcome message survives page reload
    setCookie('authUser', username, { expires: expiry, path: '/' });

    loginForm.reset();
    showLogoutUI();

    console.log('✓ Logged in | authToken=user123 | expires:', expiry.toUTCString());
  });

  // Logout — delete cookie and return to login view
  if (logoutBtn) {
    logoutBtn.addEventListener('click', function () {
      deleteCookie('authToken');
      deleteCookie('authUser');
      showLoginUI();
      console.log('✓ Logged out | authToken cookie deleted');
    });
  }
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeAuth);
} else {
  initializeAuth();
}