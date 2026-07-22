const searchBtn = document.getElementById('searchBtn');
searchBtn.addEventListener('click', () => {
  window.location.href = 'search.html';
});

// Dark / Light Mode Toggle
const modeBtn = document.getElementById('modeBtn');

function applyMode(){
  const saved = localStorage.getItem('theme');
  if(saved === 'dark'){
    document.body.classList.add('dark-mode');
    if(modeBtn) modeBtn.textContent = '☀️ Light';
  } else {
    document.body.classList.remove('dark-mode');
    if(modeBtn) modeBtn.textContent = '🌙 Dark';
  }
}
applyMode();

if(modeBtn){
  modeBtn.addEventListener('click', () => {
    const isDark = document.body.classList.contains('dark-mode');
    localStorage.setItem('theme', isDark ? 'light' : 'dark');
    applyMode();
  });
}