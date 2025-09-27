//  dashboard logic using localStorage

document.addEventListener('DOMContentLoaded', () => {
  const entries = JSON.parse(localStorage.getItem('cycleEntries') || '[]');

  // Cycle Summary
  const cycleSummary = document.getElementById('cycleSummary');
  if (entries.length > 1) {
    // Example summary code
    const cycleLengths = [];
    for (let i = 1; i < entries.length; i++) {
      const prev = new Date(entries[i - 1].date);
      const curr = new Date(entries[i].date);
      cycleLengths.push(Math.round((curr - prev) / (1000 * 60 * 60 * 24)));
    }
    const avgLength = Math.round(cycleLengths.reduce((a, b) => a + b, 0) / cycleLengths.length);
    cycleSummary.innerHTML = `<p><strong>Average Cycle Length:</strong> ${avgLength} days</p>`;
  } else {
    cycleSummary.innerHTML = `<p>No cycle summary yet. <a href="tracker.html">Log your first cycle!</a></p>`;
  }

  // Symptom Trends
  const symptomTrends = document.getElementById('symptomTrends');
  const symptomCounts = {};
  entries.forEach(entry => {
    if (entry.symptoms) {
      entry.symptoms.forEach(sym => {
        symptomCounts[sym] = (symptomCounts[sym] || 0) + 1;
      });
    }
  });
  if (Object.keys(symptomCounts).length) {
    symptomTrends.innerHTML = `<ul>` +
      Object.entries(symptomCounts).map(([sym, count]) =>
        `<li>${sym}: ${count} times</li>`
      ).join('') +
      `</ul>`;
  } else {
    symptomTrends.innerHTML = `<p>No symptoms tracked yet. <a href="tracker.html">Track symptoms now!</a></p>`;
  }

  // Mood Patterns
  const moodPatterns = document.getElementById('moodPatterns');
  const moodCounts = {};
  entries.forEach(entry => {
    if (entry.mood) {
      moodCounts[entry.mood] = (moodCounts[entry.mood] || 0) + 1;
    }
  });
  if (Object.keys(moodCounts).length) {
    moodPatterns.innerHTML = `<ul>` +
      Object.entries(moodCounts).map(([mood, count]) =>
        `<li>${mood}: ${count} days</li>`
      ).join('') +
      `</ul>`;
  } else {
    moodPatterns.innerHTML = `<p>No moods tracked yet. <a href="tracker.html">Track your mood!</a></p>`;
  }

  // Personalized Predictions
  const predictions = document.getElementById('predictions');
  if (entries.length > 1) {
    const lastDate = new Date(entries[entries.length - 1].date);
    const cycleLengths = [];
    for (let i = 1; i < entries.length; i++) {
      const prev = new Date(entries[i - 1].date);
      const curr = new Date(entries[i].date);
      cycleLengths.push(Math.round((curr - prev) / (1000 * 60 * 60 * 24)));
    }
    const avgLength = Math.round(cycleLengths.reduce((a, b) => a + b, 0) / cycleLengths.length);
    const nextPeriod = new Date(lastDate.getTime() + avgLength * 24 * 60 * 60 * 1000);
    predictions.innerHTML = `<p><strong>Next Predicted Period:</strong> ${nextPeriod.toLocaleDateString()}</p>`;
  } else {
    predictions.innerHTML = `<p>Track more cycles for personalized predictions. <a href="tracker.html">Start tracking!</a></p>`;
  }

  // Cycle History
  const historyTable = document.querySelector('#historyTable tbody');
  const noHistoryPrompt = document.getElementById('noHistoryPrompt');
  historyTable.innerHTML = '';
  if (entries.length === 0) {
    noHistoryPrompt.innerHTML = `<p>No cycle history yet. <a href="tracker.html">Log your first cycle!</a></p>`;
  } else {
    noHistoryPrompt.innerHTML = '';
    entries.slice().reverse().forEach(entry => {
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td>${new Date(entry.date).toLocaleDateString()}</td>
        <td>${entry.cycleDay || '-'}</td>
        <td>${entry.symptoms ? entry.symptoms.join(', ') : '-'}</td>
        <td>${entry.mood || '-'}</td>
      `;
      historyTable.appendChild(tr);
    });
  }
});