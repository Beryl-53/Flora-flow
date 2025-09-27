// Theme switching
document.getElementById('themeForm').addEventListener('submit', function(e) {
  e.preventDefault();
  const theme = document.querySelector('input[name="theme"]:checked').value;
  document.body.classList.remove('theme-dark', 'theme-sunny');
  if (theme === 'dark') document.body.classList.add('theme-dark');
  if (theme === 'sunny') document.body.classList.add('theme-sunny');
  localStorage.setItem('floraTheme', theme);
});

// Apply saved theme on load
window.addEventListener('DOMContentLoaded', () => {
  const savedTheme = localStorage.getItem('floraTheme');
  if (savedTheme === 'dark') document.body.classList.add('theme-dark');
  if (savedTheme === 'sunny') document.body.classList.add('theme-sunny');
});

// Reminders
const reminderForm = document.getElementById('reminderForm');
const remindersList = document.getElementById('reminders');

function loadReminders() {
  const reminders = JSON.parse(localStorage.getItem('floraReminders') || '[]');
  remindersList.innerHTML = '';
  reminders.forEach((rem, idx) => {
    const li = document.createElement('li');
    li.innerHTML = `<strong>${rem.type}</strong> - ${new Date(rem.date).toLocaleString()}
      <button data-idx="${idx}" class="remove-reminder">Remove</button>`;
    remindersList.appendChild(li);
  });
}

reminderForm.addEventListener('submit', function(e) {
  e.preventDefault();
  const type = document.getElementById('reminderType').value;
  const date = document.getElementById('reminderDate').value;
  if (!date) return;
  const reminders = JSON.parse(localStorage.getItem('floraReminders') || '[]');
  reminders.push({ type, date });
  localStorage.setItem('floraReminders', JSON.stringify(reminders));
  loadReminders();
  reminderForm.reset();
});

remindersList.addEventListener('click', function(e) {
  if (e.target.classList.contains('remove-reminder')) {
    const idx = e.target.getAttribute('data-idx');
    const reminders = JSON.parse(localStorage.getItem('floraReminders') || '[]');
    reminders.splice(idx, 1);
    localStorage.setItem('floraReminders', JSON.stringify(reminders));
    loadReminders();
  }
});

window.addEventListener('DOMContentLoaded', loadReminders);

// Privacy & Notifications
document.getElementById('privacyForm').addEventListener('submit', function(e) {
  e.preventDefault();
  const email = document.getElementById('emailNotifications').checked;
  const push = document.getElementById('pushNotifications').checked;
  const anon = document.getElementById('anonymousMode').checked;
  localStorage.setItem('floraPrivacy', JSON.stringify({ email, push, anon }));
  alert('Privacy preferences saved!');
});

// Load privacy settings on page load
window.addEventListener('DOMContentLoaded', () => {
  const privacy = JSON.parse(localStorage.getItem('floraPrivacy') || '{}');
  document.getElementById('emailNotifications').checked = !!privacy.email;
  document.getElementById('pushNotifications').checked = !!privacy.push;
  document.getElementById('anonymousMode').checked = !!privacy.anon;
});

// Account settings
document.getElementById('accountForm').addEventListener('submit', function(e) {
  e.preventDefault();
  const name = document.getElementById('displayName').value.trim();
  const email = document.getElementById('email').value.trim();
  localStorage.setItem('floraAccount', JSON.stringify({ name, email }));
  alert('Account updated!');
});

// Load account info on page load
window.addEventListener('DOMContentLoaded', () => {
  const account = JSON.parse(localStorage.getItem('floraAccount') || '{}');
  document.getElementById('displayName').value = account.name || '';
  document.getElementById('email').value = account.email || '';
});