function toggleDarkMode() {
  const theme = window.localStorage.getItem('theme');

  if (theme === 'dark') {
    window.localStorage.setItem('theme', 'light');
    document.querySelector('body').classList.remove('dark-theme');
  } else {
    window.localStorage.setItem('theme', 'dark');
    document.querySelector('body').classList.add('dark-theme');
  }
}

const theme = window.localStorage.getItem('theme');
if (theme === 'dark') {
  document.querySelector('body').classList.add('dark-theme');
}

const pageProgress = {
  timeout: null,
  ticking: false,
  currentTime: null,
  lastUpdate: null,
  element: document.querySelector('.page-progess'),
};

if (pageProgress.element) {
  function updateProgress() {
    const progress =
      window.scrollY / (document.body.clientHeight - window.innerHeight);
    pageProgress.element.value = progress * 100;
    clearTimeout(pageProgress.timeout)
    pageProgress.timeout = null
  }

  document.addEventListener('scroll', function(){
    if(pageProgress.timeout) return
    pageProgress.timeout = setTimeout(updateProgress, 10);
  });

  updateProgress();
} 
