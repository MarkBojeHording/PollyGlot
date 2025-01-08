document.addEventListener('DOMContentLoaded', () => {
  const originalText = localStorage.getItem('originalText');
  const translatedText = localStorage.getItem('translatedText');

  if (originalText) {
    document.getElementById('original-text').value = originalText;
  } else {
    document.getElementById('original-text').placeholder = 'No text available.';
  }

  if (translatedText) {
    document.getElementById('translated-text').value = translatedText;
  } else {
    document.getElementById('translated-text').placeholder = 'No translation available.';
  }

  document.querySelector('.back-btn').addEventListener('click', () => {
    window.location.href = 'index.html';
  });
});
