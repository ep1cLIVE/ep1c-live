// ---- Live status check (Twitch Helix API) ----
// Replace with your own Client-ID + OAuth token flow, or run through a small
// serverless function so you don't expose secrets client-side.
const CHANNEL_NAME = "ep1clive";

async function checkLiveStatus(){
  const dot = document.getElementById("statusDot");
  const text = document.getElementById("statusText");
  try{
    // Placeholder: swap this URL for your own backend/proxy that calls
    // https://api.twitch.tv/helix/streams?user_login=CHANNEL_NAME
    const res = await fetch(`/api/live-status?channel=${CHANNEL_NAME}`);
    if(!res.ok) throw new Error("no backend configured");
    const data = await res.json();
    if(data.live){
      dot.className = "status-dot live";
      text.textContent = `LIVE NOW — ${data.title || "Streaming"}`;
    } else {
      dot.className = "status-dot offline";
      text.textContent = "Offline — check back soon";
    }
  }catch(err){
    dot.className = "status-dot offline";
    text.textContent = "Offline — check back soon";
  }
}
checkLiveStatus();
setInterval(checkLiveStatus, 60000);

// ---- Business form (demo submit handler) ----
const form = document.getElementById("bizForm");
form.addEventListener("submit", (e) => {
  e.preventDefault();
  // Wire this up to Formspree, EmailJS, a Cloudflare Worker, or your own API.
  alert("Thanks for reaching out! I'll get back to you within 48 hours.");
  form.reset();
});

// ---- Store buttons (demo) ----
document.querySelectorAll(".buy-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    btn.textContent = "Added ✓";
    setTimeout(() => (btn.textContent = "Add to Cart"), 1500);
  });
});

// ---- Smooth nav highlight on scroll (optional polish) ----
const sections = document.querySelectorAll(".section");
const navLinks = document.querySelectorAll("nav a");
window.addEventListener("scroll", () => {
  let current = "";
  sections.forEach(sec => {
    const rect = sec.getBoundingClientRect();
    if(rect.top <= 120 && rect.bottom >= 120) current = sec.id;
  });
  navLinks.forEach(link => {
    link.style.color = link.getAttribute("href") === `#${current}` ? "#2de2c4" : "";
  });
});
