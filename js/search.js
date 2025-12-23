// Holds all people loaded from the CSV
let people = [];

// Load and parse the CSV once on page load
Papa.parse("/anu-zochrim/data/example.csv", {
  download: true,
  header: true,
  complete: function (results) {
    // Keep only valid rows
    people = results.data.filter(p => p.id);
  }
});

// Get DOM elements
const input = document.getElementById("searchInput");
const resultsEl = document.getElementById("results");

// Listen for typing in the search box
input.addEventListener("input", function () {
  const query = input.value.trim().toLowerCase();
  resultsEl.innerHTML = "";

  // Don't search until at least 2 characters
  if (query.length < 2) return;

  // Filter people by English OR Hebrew name
  const matches = people.filter(p =>
    (p.search_name && p.search_name.toLowerCase().includes(query)) ||
    (p.name_he && p.name_he.includes(query))
  );

  // Render results
  matches.forEach(p => {
    const li = document.createElement("li");

    li.innerHTML = `
      <a href="/anu-zochrim/person/?id=${p.id}">
        <strong>${p.name_en}</strong>
        ${p.name_he ? ` / ${p.name_he}` : ""}
        <span class="status"> – ${p.status}</span>
      </a>
    `;

    resultsEl.appendChild(li);
  });
});
