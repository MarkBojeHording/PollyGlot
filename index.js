document.querySelector('.t-btn').addEventListener('click', async () => {
  const inputValue = document.querySelector('input[type="text"]').value;
  const selectedLanguage = document.querySelector('input[name="language"]:checked').value;

  if (!inputValue) {
    alert('Please enter text to translate.');
    return;
  }

  try {
    const response = await fetch('http://localhost:3000/translate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        text: inputValue,
        language: selectedLanguage,
      }),
    });

    const data = await response.json();

    if (data.translation) {
      localStorage.setItem('originalText', inputValue);
      localStorage.setItem('translatedText', data.translation);
      window.location.href = 'translation.html';
    } else {
      alert('Translation failed.');
    }
  } catch (error) {
    console.error('Error:', error);
    alert('An error occurred while translating the text.');
  }
});
