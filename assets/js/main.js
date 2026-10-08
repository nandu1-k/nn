

    'use strict';

    (() => {
      const companyNames = {
        innovations: 'Alphanumeric Innovations Pvt Ltd',
        engineering: 'Alphanumeric Engineering & Technologies LLP'
      };
      const dialog = document.getElementById('company-dialog');
      const dialogTitle = document.getElementById('dialog-title');
      let activeButton = null;

      function websiteAddress(company) {
        const value = window.ALPHANUMERIC_COMPANY_LINKS?.[company];
        if (typeof value !== 'string' || !value.trim()) return null;
        try {
          const url = new URL(value.trim());
          return url.protocol === 'https:' && !url.username && !url.password ? url.href : null;
        } catch {
          return null;
        }
      }

      document.querySelectorAll('[data-company]').forEach((button) => {
        const company = button.dataset.company;
        if (websiteAddress(company)) button.removeAttribute('aria-haspopup');
        button.addEventListener('click', () => {
          const address = websiteAddress(company);
          if (address) {
            window.open(address, '_blank', 'noopener,noreferrer');
            return;
          }
          activeButton = button;
          if (dialog && dialogTitle) {
            dialogTitle.textContent = companyNames[company];
            if (!dialog.open) dialog.showModal();
          }
        });
      });

      dialog?.addEventListener('click', (event) => {
        if (event.target !== dialog) return;
        const bounds = dialog.getBoundingClientRect();
        if (event.clientX < bounds.left || event.clientX > bounds.right ||
          event.clientY < bounds.top || event.clientY > bounds.bottom) dialog.close();
      });
      dialog?.addEventListener('close', () => activeButton?.focus());
      const yearElement = document.getElementById('year');
      if (yearElement) yearElement.textContent = String(new Date().getFullYear());
    })();

  