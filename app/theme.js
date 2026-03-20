/**
 * Task 2: Theme Preferences with Local Storage
 * Implements theme toggle functionality using localStorage
 */

/**
 * Initialize theme system on page load
 * Reads saved theme from localStorage and applies it
 */
function initializeTheme() {
  const themeToggle = document.getElementById('themeToggle');
  const body = document.body;

  // Load settings from localStorage (Challenge task)
  const settings = loadSettings();

  // Apply the loaded theme to the body
  applyTheme(settings.theme, body);

  // Update the toggle button text
  updateToggleButtonText(themeToggle, settings.theme);

  // Update settings display
  updateSettingsDisplay(settings);

  // Apply font size
  applyFontSize(settings.fontSize);

  // Attach event listeners
  attachThemeEventListeners(themeToggle, settings);
}

/**
 * Load settings from localStorage
 * Returns settings object with theme and fontSize
 * Defaults to { theme: 'light', fontSize: 16 }
 */
function loadSettings() {
  const savedSettings = localStorage.getItem('settings');

  if (savedSettings) {
    try {
      return JSON.parse(savedSettings);
    } catch (e) {
      console.warn('Failed to parse settings from localStorage:', e);
      console.log('Using default settings instead.');
      return getDefaultSettings();
    }
  }

  console.log('No saved settings found. Using defaults.');
  return getDefaultSettings();
}

/**
 * Get default settings object
 */
function getDefaultSettings() {
  return {
    theme: 'light',
    fontSize: 16,
  };
}

/**
 * Apply theme to the document
 * Removes old theme class and adds new one
 */
function applyTheme(theme, body) {
  // Remove both theme classes
  body.classList.remove('light-theme', 'dark-theme');

  // Add the appropriate theme class
  if (theme === 'dark') {
    body.classList.add('dark-theme');
  } else {
    body.classList.add('light-theme');
  }
}

/**
 * Apply font size to the document
 */
function applyFontSize(fontSize) {
  // ✨ IMPROVED: Clamp font size to reasonable range (12px - 24px)
  const validSize = Math.max(12, Math.min(24, fontSize || 16));
  
  if (fontSize !== validSize) {
    console.warn(`⚠️ Font size out of range (${fontSize}px). Clamped to ${validSize}px`);
  }
  
  document.documentElement.style.fontSize = validSize + 'px';
}

/**
 * Update the theme toggle button text based on current theme
 */
function updateToggleButtonText(button, currentTheme) {
  if (currentTheme === 'light') {
    button.textContent = 'Switch to Dark Mode';
  } else {
    button.textContent = 'Switch to Light Mode';
  }
}

/**
 * Update the settings display to show current theme and font size
 */
function updateSettingsDisplay(settings) {
  const currentThemeSpan = document.getElementById('currentTheme');
  const currentFontSizeSpan = document.getElementById('currentFontSize');

  if (currentThemeSpan) {
    currentThemeSpan.textContent = settings.theme;
  }

  if (currentFontSizeSpan) {
    currentFontSizeSpan.textContent = settings.fontSize;
  }
}

/**
 * Save settings to localStorage as JSON
 */
function saveSettings(settings) {
  try {
    localStorage.setItem('settings', JSON.stringify(settings));
    console.log('✓ Settings saved to localStorage:', settings);
  } catch (e) {
    if (e.name === 'QuotaExceededError') {
      console.error('localStorage quota exceeded. Cannot save settings.', e);
      alert('Storage full! Please clear some data.');
    } else {
      console.error('Failed to save settings:', e);
    }
  }
}

/**
 * Toggle between light and dark theme
 */
function toggleTheme(currentSettings) {
  const body = document.body;
  const themeToggle = document.getElementById('themeToggle');

  // Toggle the theme
  const newTheme = currentSettings.theme === 'light' ? 'dark' : 'light';

  // Update settings object
  currentSettings.theme = newTheme;

  // Save updated settings to localStorage
  saveSettings(currentSettings);

  // Apply theme to DOM
  applyTheme(newTheme, body);

  // Update button text
  updateToggleButtonText(themeToggle, newTheme);

  // Update display
  updateSettingsDisplay(currentSettings);

  console.log('✓ Theme switched to: ' + newTheme);
}

/**
 * Attach event listeners for theme toggle and font size slider
 */
function attachThemeEventListeners(themeToggle, settings) {
  // Theme toggle button
  themeToggle.addEventListener('click', function () {
    toggleTheme(settings);
  });

  // Font size slider (Challenge task)
  const fontSizeSlider = document.getElementById('fontSizeSlider');
  if (fontSizeSlider) {
    // ✨ IMPROVED: Set slider bounds to match applyFontSize() validation
    fontSizeSlider.min = '12';
    fontSizeSlider.max = '24';
    fontSizeSlider.value = Math.max(12, Math.min(24, settings.fontSize || 16));

    fontSizeSlider.addEventListener('input', function () {
      const newFontSize = parseInt(this.value);

      // Update settings
      settings.fontSize = newFontSize;

      // Save to localStorage
      saveSettings(settings);

      // Apply font size
      applyFontSize(newFontSize);

      // Update display
      updateSettingsDisplay(settings);

      console.log('✓ Font size changed to: ' + newFontSize + 'px');
    });
  }
}

// Initialize theme when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeTheme);
} else {
  initializeTheme();
}