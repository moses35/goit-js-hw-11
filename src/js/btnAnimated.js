import { loadBtn } from './index';
function onLoadActive() {
  loadBtn.classList.add('animated');
  loadBtn.disabled = true;
  loadBtn.textContent = 'Load....';
}
function onLoadStop() {
  loadBtn.classList.remove('animated');
  loadBtn.disabled = false;
  loadBtn.textContent = 'Load more';
}

export { onLoadActive, onLoadStop };
