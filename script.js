const form = document.getElementById('waitlistForm');
const formMessage = document.getElementById('formMessage');

function getWaitlistEntries() {
  try {
    return JSON.parse(localStorage.getItem('launchcraft_waitlist') || '[]');
  } catch {
    return [];
  }
}

function saveWaitlistEntries(entries) {
  localStorage.setItem('launchcraft_waitlist', JSON.stringify(entries));
}

form.addEventListener('submit', (event) => {
  event.preventDefault();

  const formData = new FormData(form);
  const entry = {
    name: formData.get('name').toString().trim(),
    email: formData.get('email').toString().trim().toLowerCase(),
    service: formData.get('service').toString().trim(),
    submittedAt: new Date().toISOString()
  };

  if (!entry.name || !entry.email || !entry.service) {
    formMessage.textContent = 'Please complete all fields.';
    return;
  }

  const entries = getWaitlistEntries();
  const alreadyExists = entries.some((item) => item.email === entry.email);

  if (alreadyExists) {
    formMessage.textContent = 'You are already on the waitlist.';
    return;
  }

  entries.push(entry);
  saveWaitlistEntries(entries);
  form.reset();
  formMessage.textContent = `You're in. Founding waitlist size: ${entries.length}.`;
});
