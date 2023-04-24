import { loadBtn } from './index';
//waiting response
function onLoadActive() {
  loadBtn.classList.add('animated');
  loadBtn.disabled = true;
  loadBtn.textContent = 'Load....';
}
//default state
function onLoadStop() {
  loadBtn.classList.remove('animated');
  loadBtn.disabled = false;
  loadBtn.textContent = 'Load more';
}

export { onLoadActive, onLoadStop };
