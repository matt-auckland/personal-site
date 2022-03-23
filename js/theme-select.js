function toggleDarkMode() {
  const theme = window.localStorage.getItem('theme');

  if (theme === 'dark') {
    chooseMode('light');
  } else {
    chooseMode('dark');
  }
}

function chooseMode(mode) {
  const button = document.querySelector('#theme-toggle')

  if (mode === 'dark') {
    document.querySelector('body').classList.add('dark-theme');
    button.setAttribute('title', 'Turn darkmode off')
    button.setAttribute('aria-label', 'Turn darkmode off')
    button.setAttribute('aria-pressed', false)
    window.localStorage.setItem('theme', 'dark');
  } else if (mode === 'light') {
    window.localStorage.setItem('theme', 'light');
    document.querySelector('body').classList.add('light-theme');
    button.setAttribute('title', 'Turn darkmode on')
    button.setAttribute('aria-label', 'Turn darkmode on')
    button.setAttribute('aria-pressed', true)
  }
}

// If we have a theme set in local storage use that, otherwise check what the user prefers
const theme = window.localStorage.getItem('theme');
if (theme === 'dark') {
  chooseMode('dark')
} else if (theme === 'light') {
  chooseMode('light');
} else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
  chooseMode('dark');
} else {
  chooseMode('light');
}
