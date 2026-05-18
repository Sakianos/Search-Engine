const API_KEY = "YOUR_GOOGLE_API_KEY";
const CX = "YOUR_GOOGLE_CX";

async function searchGoogle(query) {
  const url = `https://www.googleapis.com/customsearch/v1?key=${API_KEY}&cx=${CX}&q=${encodeURIComponent(
    query
  )}`;

  const res = await fetch(url);
  const data = await res.json();

  return data.items || [];
}

function renderResults(list) {
  const results = document.getElementById("results");
  results.innerHTML = "";

  if (list.length === 0) {
    results.innerHTML =
      '<div class="no-results">Δεν βρέθηκαν αποτελέσματα.</div>';
    return;
  }

  list.forEach((item) => {
    results.innerHTML += `
      <div class="result">
        <a href="${item.link}" target="_blank">${item.title}</a>
        <div class="snippet">${item.snippet || ""}</div>
      </div>
    `;
  });
}

const form = document.getElementById("searchForm");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const q = document.getElementById("query").value.trim();
  if (!q) return;

  document.getElementById("results").innerHTML = "Αναζήτηση...";

  const results = await searchGoogle(q);
  renderResults(results);
});

document.getElementById("homeBtn").addEventListener("click", () => {
  document.getElementById("query").value = "";
  document.getElementById("results").innerHTML = "";
});
