const form = document.getElementById('waitlist-form');
const referrerInput = document.getElementById('referrer');
const messageDiv = document.getElementById('message');
const popup = document.getElementById('referral-popup');
const refCodeDisplay = document.getElementById('ref-code');
const refLinkInput = document.getElementById('ref-link');
const copyConfirm = document.getElementById('copy-confirm');

const urlParams = new URLSearchParams(window.location.search);
const ref = urlParams.get('ref');
if (ref) referrerInput.value = ref;

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const formData = new FormData(form);
  const query = new URLSearchParams(formData).toString();

  const response = await fetch("https://script.google.com/macros/s/AKfycbxUcedJ0eoNnrpIRyfxDhAjdyvfCofSFKsFu-VSASIKa5cgWjO3ipcR1rtZirWWkBsn/exec", {
    method: 'POST',
    body: query,
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
  });

  const result = await response.text();
  if (result === 'Duplicate') {
    messageDiv.textContent = "You've already joined the waitlist.";
  } else if (result === 'Success') {
    const email = formData.get('email');
    showReferralCode(email);
  } else {
    messageDiv.textContent = "An error occurred. Please try again.";
  }
});

function showReferralCode(email) {
  const code = Math.random().toString(36).substring(2, 8).toUpperCase(); // Simulated
  refCodeDisplay.textContent = code;
  refLinkInput.value = `https://affinixia.netlify.app/?ref=${code}`;
  popup.classList.remove('hidden');
}

function copyLink() {
  refLinkInput.select();
  document.execCommand('copy');
  copyConfirm.classList.remove('hidden');
  setTimeout(() => copyConfirm.classList.add('hidden'), 2000);
}
