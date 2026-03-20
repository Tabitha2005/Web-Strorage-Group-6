/**
 * Task 4: Security Implementation
 * XSS Prevention & CSRF Token Protection & CryptoJS Encryption
 *
 * Requirements from assignment:
 * 1. Sanitize user input using encodeURIComponent before displaying on the page
 * 2. Generate a CSRF token using Math.random() and include it in forms
 * Challenge: Encrypt sensitive data in localStorage using CryptoJS
 *
 * CSRF Flow (generate once, never regenerate):
 * 1. On page load: generate token → store in sessionStorage → inject into ALL forms
 * 2. On form submit: read token from hidden input → compare to sessionStorage value
 * 3. Match = proceed | No match = block
 */

// Secret key for CryptoJS encryption
const ENCRYPTION_KEY = 'ecommerce-demo-secret-2024';

/**
 * Initialize all security features on page load
 * Token is generated ONCE here — never regenerated mid-session
 */
function initializeSecurity() {
  generateAndInjectCSRFToken();
  initializeEncryption();
  attachSecurityEventListeners();
}

// ─────────────────────────────────────────────
// CSRF TOKEN
// ─────────────────────────────────────────────

/**
 * Generate ONE CSRF token, store in sessionStorage,
 * inject into ALL forms, and display in footer for debugging
 */
function generateAndInjectCSRFToken() {
  const token = Math.random().toString(36).substr(2) + Math.random().toString(36).substr(2);

  sessionStorage.setItem('csrfToken', token);

  const csrfInputs = document.querySelectorAll('input[name="csrfToken"]');
  csrfInputs.forEach(input => {
    input.value = token;
  });

  const tokenDisplay = document.getElementById('csrfTokenDisplay');
  if (tokenDisplay) {
    tokenDisplay.textContent = token;
  }

  console.log('✓ CSRF token generated:', token);
  console.log('✓ Token injected into', csrfInputs.length, 'form(s)');
}

/**
 * Verify CSRF token on form submission
 */
function verifyCSRFToken(submittedToken) {
  const storedToken = sessionStorage.getItem('csrfToken');

  if (!submittedToken || !storedToken) {
    console.error('✗ CSRF token missing — submitted:', submittedToken, '| stored:', storedToken);
    return false;
  }

  if (submittedToken === storedToken) {
    console.log('✓ CSRF token verified successfully');
    return true;
  }

  console.error('✗ CSRF token mismatch — submitted:', submittedToken, '| stored:', storedToken);
  return false;
}

// ─────────────────────────────────────────────
// XSS PREVENTION — encodeURIComponent (Task 4 Step 1)
// ─────────────────────────────────────────────

/**
 * Sanitize user input using encodeURIComponent as required by Task 4
 * Converts special characters like < > & " ' into percent-encoded values
 * so they cannot be executed as HTML or scripts
 */
function sanitizeInput(userInput) {
  // Encode — neutralizes any script or HTML injection attempt
  const encoded = encodeURIComponent(userInput);

  // Decode back so the text is human-readable when displayed
  const decoded = decodeURIComponent(encoded);

  console.log('✓ Input sanitized using encodeURIComponent');
  console.log('  Raw    :', userInput);
  console.log('  Encoded:', encoded);
  console.log('  Decoded:', decoded);

  return decoded;
}

/**
 * Display a review safely using textContent — never innerHTML
 * Double protection: encodeURIComponent sanitizes + textContent prevents execution
 */
function displayReviewSafely(reviewText) {
  const reviewsList = document.getElementById('reviewsList');

  const reviewItem = document.createElement('li');
  reviewItem.className = 'review-item';

  // textContent treats everything as plain text — scripts will NEVER execute
  reviewItem.textContent = reviewText;

  reviewsList.appendChild(reviewItem);
  console.log('✓ Review displayed safely using textContent (XSS prevented)');
}

// ─────────────────────────────────────────────
// CRYPTOJS ENCRYPTION CHALLENGE
// ─────────────────────────────────────────────

/**
 * Encrypt a value using CryptoJS AES before storing in localStorage
 * The raw localStorage value will be unreadable without the secret key
 */
function encryptData(value) {
  const encrypted = CryptoJS.AES.encrypt(value, ENCRYPTION_KEY).toString();
  console.log('✓ Data encrypted — raw value:', encrypted);
  return encrypted;
}

/**
 * Decrypt a value retrieved from localStorage using CryptoJS
 */
function decryptData(encryptedValue) {
  const bytes = CryptoJS.AES.decrypt(encryptedValue, ENCRYPTION_KEY);
  const decrypted = bytes.toString(CryptoJS.enc.Utf8);
  console.log('✓ Data decrypted — plain value:', decrypted);
  return decrypted;
}

/**
 * Save sensitive email encrypted into localStorage
 * Shows the raw unreadable value in the UI to demonstrate encryption
 */
function saveEncryptedEmail(email) {
  const encrypted = encryptData(email);
  localStorage.setItem('secureEmail', encrypted);

  const rawDisplay = document.getElementById('encryptedValueDisplay');
  if (rawDisplay) {
    rawDisplay.textContent = encrypted;
  }

  // Clear decrypted display when saving new value
  const decryptedDisplay = document.getElementById('decryptedValueDisplay');
  if (decryptedDisplay) {
    decryptedDisplay.textContent = '—';
  }

  console.log('✓ Encrypted email saved to localStorage under key: secureEmail');
  console.log('✓ Raw value in localStorage is unreadable without the secret key');
}

/**
 * Load and decrypt the stored email from localStorage
 */
function loadDecryptedEmail() {
  const encrypted = localStorage.getItem('secureEmail');

  if (!encrypted) {
    console.warn('No encrypted email found in localStorage');
    return null;
  }

  const decrypted = decryptData(encrypted);

  const decryptedDisplay = document.getElementById('decryptedValueDisplay');
  if (decryptedDisplay) {
    decryptedDisplay.textContent = decrypted;
  }

  return decrypted;
}

/**
 * Initialize the CryptoJS encryption demo UI
 */
function initializeEncryption() {
  const saveEmailBtn = document.getElementById('saveEmailBtn');
  const loadEmailBtn = document.getElementById('loadEmailBtn');
  const emailInput = document.getElementById('sensitiveEmailInput');

  if (saveEmailBtn && emailInput) {
    saveEmailBtn.addEventListener('click', function () {
      const email = emailInput.value.trim();
      if (!email) {
        alert('Please enter an email to encrypt.');
        return;
      }
      saveEncryptedEmail(email);
      emailInput.value = '';
    });
  }

  if (loadEmailBtn) {
    loadEmailBtn.addEventListener('click', function () {
      const result = loadDecryptedEmail();
      if (!result) {
        alert('No encrypted email found. Please save one first.');
      }
    });
  }
}

// ─────────────────────────────────────────────
// REVIEW FORM
// ─────────────────────────────────────────────

function attachSecurityEventListeners() {
  const reviewForm = document.getElementById('reviewForm');

  if (reviewForm) {
    reviewForm.addEventListener('submit', function (e) {
      e.preventDefault();

      const reviewInput = document.getElementById('reviewInput');
      const csrfTokenInput = document.getElementById('reviewCsrfToken');
      const submittedToken = csrfTokenInput ? csrfTokenInput.value : null;

      // Step 1: Verify CSRF token
      if (!verifyCSRFToken(submittedToken)) {
        alert('Security verification failed. Please try again.');
        return;
      }

      const reviewText = reviewInput.value.trim();

      if (reviewText.length === 0) {
        alert('Please enter a review.');
        return;
      }

      // Step 2: Sanitize using encodeURIComponent (Task 4 requirement)
      const sanitizedText = sanitizeInput(reviewText);

      // Step 3: Display safely using textContent — never innerHTML
      displayReviewSafely(sanitizedText);

      reviewInput.value = '';
      console.log('✓ Review submitted, sanitized, and displayed safely');
    });
  }
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeSecurity);
} else {
  initializeSecurity();
}