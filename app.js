/**
 * Personalized Reading Assistant - Empirical Benchmark Engine
 * Full evaluation dataset comparing TF-IDF vs Word2Vec CBOW & Skip-Gram
 */

const BENCHMARK_DATA = {
  scifi: {
    query: "I loved this science fiction movie. The visual effects were stunning and the space battles felt realistic. The plot about an alien invasion and humanity fighting back kept me hooked. Great acting, a gripping story, and unforgettable special effects.",
    tokens: "38 tokens • High-IDF keywords: alien, invasion, science fiction, special effects",
    tfidf: [
      { rank: 1, title: "Independence Day (ID4)", score: "0.138", sent: "pos", desc: "Alien invasion blockbuster hype; mankind fights back against extraterrestrials" },
      { rank: 2, title: "Aliens", score: "0.131", sent: "pos", desc: "James Cameron / Ridley Scott sci-fi sequel; intense extraterrestrial combat" },
      { rank: 3, title: "Total Recall", score: "0.130", sent: "pos", desc: "Paul Verhoeven action sci-fi with groundbreaking practical visual effects" },
      { rank: 4, title: "Dark City", score: "0.123", sent: "pos", desc: "Noir science-fiction reality-bending thriller about extraterrestrial masters" },
      { rank: 5, title: "Sphere", score: "0.117", sent: "neg", desc: "Michael Crichton deep-sea alien artifact adaptation" }
    ],
    cbow: [
      { rank: 1, title: "Total Recall", score: "0.842", sent: "pos", desc: "Top action/sci-fi film matched by high-density action vectors" },
      { rank: 2, title: "1990s Special Effects Essay", score: "0.837", sent: "pos", desc: "Generic retro essay discussing CGI and visual effects of the decade" },
      { rank: 3, title: "Final Fantasy: The Spirits Within", score: "0.805", sent: "pos", desc: "CGI showcase; picked due to effects frequency rather than invasion plot" },
      { rank: 4, title: "Titan A.E.", score: "0.775", sent: "neg", desc: "Animated sci-fi space adventure" },
      { rank: 5, title: "Strangers Contacting Earth", score: "0.773", sent: "pos", desc: "First-contact thematic review" }
    ],
    skipgram: [
      { rank: 1, title: "Total Recall", score: "0.921", sent: "pos", desc: "Shared across all 3 models; strong space action signature" },
      { rank: 2, title: "1990s Special Effects Essay", score: "0.907", sent: "pos", desc: "Dense representation of 'visual effects' & 'stunning'" },
      { rank: 3, title: "Mission to Mars", score: "0.904", sent: "neg", desc: "Brian De Palma space exploration drama" },
      { rank: 4, title: "Titan A.E.", score: "0.901", sent: "neg", desc: "Sci-fi animated feature" },
      { rank: 5, title: "Dark City", score: "0.896", sent: "pos", desc: "Noir alien master thriller; shared with TF-IDF" }
    ]
  },

  romcom: {
    query: "A charming romantic comedy with a sweet love story, funny dialogue, and a happy ending.",
    tokens: "16 tokens • High-IDF keywords: charming, romantic comedy, funny dialogue",
    tfidf: [
      { rank: 1, title: "Notting Hill", score: "0.145", sent: "pos", desc: "Classic British love story with witty dialogue & happy ending" },
      { rank: 2, title: "Lost & Found", score: "0.138", sent: "pos", desc: "Charming romantic comedy involving neighborhood romance" },
      { rank: 3, title: "Forces of Nature", score: "0.129", sent: "pos", desc: "Road-trip romantic comedy starring Sandra Bullock" },
      { rank: 4, title: "The Wedding Singer", score: "0.124", sent: "pos", desc: "Adam Sandler 80s rom-com with sweet love storyline" },
      { rank: 5, title: "A Midsummer Night's Dream", score: "0.119", sent: "pos", desc: "Romantic comedy adaptation with ensemble cast" }
    ],
    cbow: [
      { rank: 1, title: "Deuce Bigalow: Male Gigolo", score: "0.852", sent: "neg", desc: "Crass slapstick; heard broad 'comedy', completely missed 'romance'" },
      { rank: 2, title: "Loser", score: "0.839", sent: "neg", desc: "College comedy drifting far from romantic charm" },
      { rank: 3, title: "Divorce Comedy Review", score: "0.812", sent: "neg", desc: "General comedy essay without sweet romantic elements" },
      { rank: 4, title: "Big Daddy", score: "0.795", sent: "pos", desc: "Adam Sandler comedy focusing on parenthood" },
      { rank: 5, title: "The Wedding Singer", score: "0.781", sent: "pos", desc: "Only true rom-com in CBOW top 5" }
    ],
    skipgram: [
      { rank: 1, title: "Drew Barrymore Rom-Com Review", score: "0.918", sent: "pos", desc: "Sweet tone matching; captured charming comedy vibe" },
      { rank: 2, title: "The Wedding Singer (Review A)", score: "0.905", sent: "pos", desc: "Romantic tone alignment and comedic dialogue" },
      { rank: 3, title: "The Wedding Singer (Review B)", score: "0.898", sent: "pos", desc: "Second review in corpus for the same sweet romance" },
      { rank: 4, title: "She's All That", score: "0.887", sent: "pos", desc: "High school romantic comedy with happy resolution" },
      { rank: 5, title: "Blast from the Past", score: "0.881", sent: "pos", desc: "Charming comedy with sweet romantic leads" }
    ]
  },

  horror: {
    query: "A held-out negative review of a teen supernatural movie featuring church youth groups, car crashes, and ghost-like apparitions compared to Lost Highway.",
    tokens: "Leave-One-Out Corpus Document • 312 tokens",
    tfidf: [
      { rank: 1, title: "Soul Survivors", score: "0.182", sent: "neg", desc: "Teen horror featuring church rave, car wreck, & apparitions" },
      { rank: 2, title: "Session 9", score: "0.141", sent: "pos", desc: "Psychological horror in an abandoned asylum" },
      { rank: 3, title: "Lost Highway", score: "0.135", sent: "pos", desc: "David Lynch film directly referenced in the query review" },
      { rank: 4, title: "The Blair Witch Project", score: "0.128", sent: "pos", desc: "Supernatural horror benchmark" },
      { rank: 5, title: "Final Destination", score: "0.121", sent: "pos", desc: "Teen accident and eerie premonitions" }
    ],
    cbow: [
      { rank: 1, title: "Session 9", score: "0.865", sent: "pos", desc: "Captured eerie atmosphere but missed church/accident elements" },
      { rank: 2, title: "House on Haunted Hill", score: "0.844", sent: "neg", desc: "Supernatural setting with ghost imagery" },
      { rank: 3, title: "Slasher Collection", score: "0.822", sent: "neg", desc: "General horror vocabulary overlap" },
      { rank: 4, title: "The Haunting", score: "0.810", sent: "neg", desc: "Ghost thriller with mansion setting" },
      { rank: 5, title: "Soul Survivors", score: "0.798", sent: "neg", desc: "Actual target document retrieved at rank 5" }
    ],
    skipgram: [
      { rank: 1, title: "Session 9", score: "0.932", sent: "pos", desc: "Psychological supernatural horror" },
      { rank: 2, title: "Soul Survivors", score: "0.924", sent: "neg", desc: "Target document retrieved at rank 2 (vs rank 5 in CBOW)" },
      { rank: 3, title: "House on Haunted Hill", score: "0.915", sent: "neg", desc: "Supernatural tone match (80% sentiment match)" },
      { rank: 4, title: "The Blair Witch Project", score: "0.909", sent: "pos", desc: "Supernatural mystery" },
      { rank: 5, title: "Lost Highway", score: "0.901", sent: "pos", desc: "David Lynch surreal horror reference" }
    ]
  }
};

function renderResults(containerId, items) {
  const container = document.getElementById(containerId);
  container.innerHTML = "";

  items.forEach(item => {
    const card = document.createElement("div");
    card.className = "result-card";
    card.innerHTML = `
      <div class="res-header">
        <span class="res-rank">#${item.rank}</span>
        <span class="res-score">cos: ${item.score}</span>
      </div>
      <div class="res-title">${item.title}</div>
      <div class="res-detail">${item.desc}</div>
      <span class="res-sentiment ${item.sent === 'pos' ? 'sent-pos' : 'sent-neg'}">${item.sent.toUpperCase()}</span>
    `;
    container.appendChild(card);
  });
}

function loadQuery(queryKey) {
  const data = BENCHMARK_DATA[queryKey];
  document.getElementById("display-query-text").textContent = `"${data.query}"`;
  document.getElementById("query-tokens-badge").textContent = data.tokens;

  renderResults("tfidf-results", data.tfidf);
  renderResults("cbow-results", data.cbow);
  renderResults("skipgram-results", data.skipgram);
}

document.addEventListener("DOMContentLoaded", () => {
  // Initial load
  loadQuery("scifi");

  // Query buttons
  const presetBtns = document.querySelectorAll(".preset-btn");
  presetBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      presetBtns.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      const key = btn.getAttribute("data-query");
      loadQuery(key);
    });
  });

  // Insights toggle
  const toggleBtn = document.getElementById("toggle-insights-btn");
  const drawer = document.getElementById("insights-panel");
  const closeBtn = document.getElementById("close-insights-btn");

  toggleBtn.addEventListener("click", () => {
    drawer.classList.toggle("hidden");
  });

  closeBtn.addEventListener("click", () => {
    drawer.classList.add("hidden");
  });
});
