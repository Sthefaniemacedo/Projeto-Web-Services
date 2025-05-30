window.addEventListener('load', () => {
    const card = document.querySelector('.card');
    if (card) {
      card.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });