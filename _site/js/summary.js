document.querySelectorAll('details').forEach(detail => {
    const summary = detail.querySelector('summary');
    
    summary.addEventListener('click', function(event) {
      event.stopPropagation();
    });

    detail.addEventListener('click', function() {
      if (!detail.hasAttribute('open')) {
        detail.setAttribute('open', 'true');
      }
    });
});