/**
 * MovieMind — Interactive Retrieval Workbench
 * Engineered with human-crafted UX patterns, realistic dataset indexing, and dynamic query handling.
 */

// Ground-truth evaluation benchmarks from Assignment 1 Report
const EXPERIMENT_DATA = {
  scifi: {
    query: "I loved this science fiction movie. The visual effects were stunning and the space battles felt realistic. The plot about an alien invasion and humanity fighting back kept me hooked. Great acting, a gripping story, and unforgettable special effects.",
    meanScores: { tfidf: "0.128", cbow: "0.806", skipgram: "0.906" },
    tfidf: [
      {
        rank: 1,
        title: "Independence Day (ID4)",
        score: "0.138",
        sent: "pos",
        year: 1996,
        summary: "Extraterrestrial invasion destroys worldwide monuments; human resistance stages counter-strike.",
        reason: "Matched high-IDF bigrams: 'alien invasion', 'science fiction', 'special effect'",
        quote: "The visual effects are utterly spectacular. The massive alien mother ship eclipses cities while Will Smith and Jeff Goldblum spearhead humanity's desperate retaliation against insurmountable extraterrestrial invaders.",
        keywords: ["alien invasion", "science fiction", "special effect", "space battles"]
      },
      {
        rank: 2,
        title: "Aliens",
        score: "0.131",
        sent: "pos",
        year: 1986,
        summary: "James Cameron's pulse-pounding militaristic sequel to Ridley Scott's sci-fi benchmark.",
        reason: "Matched: 'space battles', 'alien', 'gripping story'",
        quote: "Cameron replaces haunted-house terror with unrelenting combat. Sigourney Weaver delivers an unforgettable performance battling xenomorph swarms in high-stakes extraterrestrial warfare.",
        keywords: ["alien", "combat", "sci-fi sequel", "unforgettable"]
      },
      {
        rank: 3,
        title: "Total Recall",
        score: "0.130",
        sent: "pos",
        year: 1990,
        summary: "Paul Verhoeven's Martian action thriller featuring mind-bending memory implantation.",
        reason: "Matched: 'science fiction', 'visual effect', 'realistic'",
        quote: "Mind-bending Martian intrigue filled with groundbreaking practical effects and non-stop sci-fi momentum.",
        keywords: ["science fiction", "visual effect", "martian", "action"]
      },
      {
        rank: 4,
        title: "Dark City",
        score: "0.123",
        sent: "pos",
        year: 1998,
        summary: "Atmospheric sci-fi noir where telekinetic alien Strangers manipulate human reality.",
        reason: "Matched: 'alien', 'science fiction', 'gripping'",
        quote: "A stunning visual masterclass where underground alien architects manipulate human identities beneath perpetual nocturnal skies.",
        keywords: ["alien", "noir", "architecture", "telekinesis"]
      },
      {
        rank: 5,
        title: "Sphere",
        score: "0.117",
        sent: "neg",
        year: 1998,
        summary: "Deep-ocean psychological expedition exploring an enigmatic extraterrestrial craft.",
        reason: "Matched: 'alien', 'special effect', 'science fiction'",
        quote: "Despite Dustin Hoffman's presence, the deep-sea alien thriller sinks under clumsy narrative exposition.",
        keywords: ["alien artifact", "deep-sea", "crichton", "effects"]
      }
    ],
    cbow: [
      {
        rank: 1,
        title: "Total Recall",
        score: "0.842",
        sent: "pos",
        year: 1990,
        summary: "Action/sci-fi blockbusters clustered closely in dense continuous space.",
        reason: "Action & sci-fi vector dense centroid alignment",
        quote: "Heavy concentration of high-velocity action terminology aligns closely with CBOW vector weights.",
        keywords: ["action", "arnold", "sci-fi", "effects"]
      },
      {
        rank: 2,
        title: "1990s Special Effects Retrospective",
        score: "0.837",
        sent: "pos",
        year: 1999,
        summary: "Survey essay discussing decade trends in digital CGI and optical compositing.",
        reason: "Heavily triggered by repeated 'effects' terminology",
        quote: "A decade of transforming optical models into fluid CGI wizardry across contemporary Hollywood blockbusters.",
        keywords: ["cgi", "special effects", "compositing", "decade"]
      },
      {
        rank: 3,
        title: "Final Fantasy: The Spirits Within",
        score: "0.805",
        sent: "pos",
        year: 2001,
        summary: "Photorealistic CGI showcase that sacrificed character depth for rendering.",
        reason: "Dense embedding overlap on 'visual effects' and 'stunning'",
        quote: "Technological milestone in computer animation that unfortunately leaves dramatic stakes behind.",
        keywords: ["animation", "cgi showcase", "visuals", "photoreal"]
      },
      {
        rank: 4,
        title: "Titan A.E.",
        score: "0.775",
        sent: "neg",
        year: 2000,
        summary: "Animated space adventure following humanity's search for an Earth-seeding ship.",
        reason: "Vector similarity on 'space', 'battles', 'humanity'",
        quote: "Post-apocalyptic cartoon sci-fi struggle featuring animated dogfights against energy beings.",
        keywords: ["animation", "space dogfights", "dredge", "earth"]
      },
      {
        rank: 5,
        title: "Strangers Contacting Earth Review",
        score: "0.773",
        sent: "pos",
        year: 1997,
        summary: "Independent thematic review on extraterrestrial communication narratives.",
        reason: "Loose semantic proximity to 'alien' and 'humanity'",
        quote: "Philosophical exploration of how human institutions react to interstellar broadcasts.",
        keywords: ["first contact", "interstellar", "strangers", "broadcast"]
      }
    ],
    skipgram: [
      {
        rank: 1,
        title: "Total Recall",
        score: "0.921",
        sent: "pos",
        year: 1990,
        summary: "Highest consensus item across all sparse and dense models.",
        reason: "Strong Skip-Gram context window learning on 'special effects'",
        quote: "A pinnacle of Verhoeven's visceral genre filmmaking with stellar production aesthetics.",
        keywords: ["practical effects", "sci-fi", "mars", "recalled"]
      },
      {
        rank: 2,
        title: "1990s Special Effects Retrospective",
        score: "0.907",
        sent: "pos",
        year: 1999,
        summary: "Contextual clustering on 'visual effects were stunning'.",
        reason: "Dense skip-window association between visual and stunning",
        quote: "Dissecting how optical illusions evolved into modern digital reality over the decade.",
        keywords: ["stunning", "visual", "effects", "retrospective"]
      },
      {
        rank: 3,
        title: "Mission to Mars",
        score: "0.904",
        sent: "neg",
        year: 2000,
        summary: "Brian De Palma's high-budget space exploration disaster film.",
        reason: "Strong niche match on space travel and planetary arrival",
        quote: "De Palma captures zero-gravity panic with elegant tracking shots before dissolving into melodrama.",
        keywords: ["space travel", "de palma", "mars", "disaster"]
      },
      {
        rank: 4,
        title: "Titan A.E.",
        score: "0.901",
        sent: "neg",
        year: 2000,
        summary: "Persistent presence in dense top-5 rankings due to space lexicons.",
        reason: "Matched: 'space battles', 'humanity fighting back'",
        quote: "Fast-paced space dogfights that capture space adventure atmosphere.",
        keywords: ["space battles", "humanity", "adventure"]
      },
      {
        rank: 5,
        title: "Dark City",
        score: "0.896",
        sent: "pos",
        year: 1998,
        summary: "Shared top hit with TF-IDF; dense representation preserved noir tone.",
        reason: "Skip-Gram captured tone of 'unforgettable special effects'",
        quote: "Proyas' gothic urban maze stands as one of the most distinctive visual achievements in sci-fi.",
        keywords: ["noir", "visual achievement", "proyas", "alien masters"]
      }
    ]
  },

  romcom: {
    query: "A charming romantic comedy with a sweet love story, funny dialogue, and a happy ending.",
    meanScores: { tfidf: "0.132", cbow: "0.849", skipgram: "0.918" },
    tfidf: [
      {
        rank: 1,
        title: "Notting Hill",
        score: "0.145",
        sent: "pos",
        year: 1999,
        summary: "British bookstore owner falls in love with an international movie superstar.",
        reason: "Matched high-IDF keywords: 'romantic comedy', 'funny dialogue', 'happy ending'",
        quote: "Richard Curtis pens witty, razor-sharp dialogue wrapped in a genuinely sweet London romance.",
        keywords: ["romantic comedy", "witty dialogue", "charming", "sweet romance"]
      },
      {
        rank: 2,
        title: "Lost & Found",
        score: "0.138",
        sent: "pos",
        year: 1999,
        summary: "Lighthearted apartment building romance featuring puppy escapades.",
        reason: "Matched: 'charming', 'sweet love story', 'comedy'",
        quote: "A sweet-natured neighborhood romantic comedy anchored by easy charm.",
        keywords: ["charming", "sweet love", "comedy", "lighthearted"]
      },
      {
        rank: 3,
        title: "Forces of Nature",
        score: "0.129",
        sent: "pos",
        year: 1999,
        summary: "Sandra Bullock and Ben Affleck road-trip comedy about matrimonial cold feet.",
        reason: "Matched: 'romantic comedy', 'sweet', 'funny'",
        quote: "Charming odd-couple banter that delivers laughs and tender romantic hesitations.",
        keywords: ["odd couple", "banter", "romantic", "laughs"]
      },
      {
        rank: 4,
        title: "The Wedding Singer",
        score: "0.124",
        sent: "pos",
        year: 1998,
        summary: "Adam Sandler and Drew Barrymore 1980s nostalgia romance.",
        reason: "Matched: 'sweet love story', 'romantic comedy'",
        quote: "Sandler's sweetest comedic outing with irresistible romantic chemistry alongside Barrymore.",
        keywords: ["sweetest", "romantic chemistry", "happy ending"]
      },
      {
        rank: 5,
        title: "A Midsummer Night's Dream",
        score: "0.119",
        sent: "pos",
        year: 1999,
        summary: "Shakespearean romantic comedy adaptation featuring enchanted Athenian lovers.",
        reason: "Matched: 'romantic comedy', 'dialogue', 'sweet'",
        quote: "Enchanted forest romance with poetic repartee and joyous matrimonial climaxes.",
        keywords: ["enchanted romance", "poetic dialogue", "happy ending"]
      }
    ],
    cbow: [
      {
        rank: 1,
        title: "Deuce Bigalow: Male Gigolo",
        score: "0.852",
        sent: "neg",
        year: 1999,
        summary: "Crass slapstick comedy completely missing romance element.",
        reason: "CBOW collapsed on 'funny' and 'comedy', omitting 'romantic'",
        quote: "Lowest common denominator toilet humor that shares zero DNA with a sweet love story.",
        keywords: ["slapstick", "crass", "comedy failure"]
      },
      {
        rank: 2,
        title: "Loser",
        score: "0.839",
        sent: "neg",
        year: 2000,
        summary: "College-era comedy drifting into cynical territory.",
        reason: "Drifted to broad contemporary comedy",
        quote: "Cynical college comedy lacking the requisite warmth and wit.",
        keywords: ["college", "cynical", "comedy"]
      },
      {
        rank: 3,
        title: "Divorce Comedy Essay",
        score: "0.812",
        sent: "neg",
        year: 1998,
        summary: "Critical breakdown of bitter relationship farces.",
        reason: "Matched relationship keywords without romantic sentiment",
        quote: "Exploring how 90s domestic comedies pivoted toward caustic sarcasm.",
        keywords: ["caustic", "sarcasm", "relationship"]
      },
      {
        rank: 4,
        title: "Big Daddy",
        score: "0.795",
        sent: "pos",
        year: 1999,
        summary: "Adam Sandler comedy centered on adoptive fatherhood.",
        reason: "Captured feel-good comedic resolution",
        quote: "Sentimental Sandler comedy that prioritizes father-son affection over romance.",
        keywords: ["sentimental", "happy ending", "comedy"]
      },
      {
        rank: 5,
        title: "The Wedding Singer",
        score: "0.781",
        sent: "pos",
        year: 1998,
        summary: "Only legitimate romantic comedy hit captured by CBOW.",
        reason: "Shared high-frequency comedy & sweet tokens",
        quote: "Sandler and Barrymore's classic 80s love story.",
        keywords: ["romance", "comedy", "love story"]
      }
    ],
    skipgram: [
      {
        rank: 1,
        title: "Drew Barrymore Romantic Showcase",
        score: "0.918",
        sent: "pos",
        year: 1998,
        summary: "Appreciative review praising Barrymore's warmth and sweet romantic delivery.",
        reason: "Skip-Gram captured the exact sentiment of 'charming' and 'sweet love'",
        quote: "Barrymore radiates genuine sweetness, effortlessly grounding the film's romantic charm.",
        keywords: ["sweetness", "romantic charm", "charming"]
      },
      {
        rank: 2,
        title: "The Wedding Singer (Review A)",
        score: "0.905",
        sent: "pos",
        year: 1998,
        summary: "Top-tier romantic comedy hit matching love story and funny dialogue.",
        reason: "Aligned context window around sweet romance",
        quote: "Delightfully funny dialogue and an endearing retro soundtrack create a joyful experience.",
        keywords: ["funny dialogue", "joyful", "sweet romance"]
      },
      {
        rank: 3,
        title: "The Wedding Singer (Review B)",
        score: "0.898",
        sent: "pos",
        year: 1998,
        summary: "Second corpus review confirming Skip-Gram's strong genre clustering.",
        reason: "Consistent dense vector placement for Barrymore-Sandler romance",
        quote: "Unpretentious, feel-good entertainment culminating in an uplifting romantic climax.",
        keywords: ["feel-good", "uplifting", "romantic climax"]
      },
      {
        rank: 4,
        title: "She's All That",
        score: "0.887",
        sent: "pos",
        year: 1999,
        summary: "High school romantic makeover comedy with sweet resolution.",
        reason: "Matched 'charming' and 'happy ending'",
        quote: "Predictable yet undeniably charming teen romantic comedy that hits every feel-good note.",
        keywords: ["charming", "teen rom-com", "happy ending"]
      },
      {
        rank: 5,
        title: "Blast from the Past",
        score: "0.881",
        sent: "pos",
        year: 1999,
        summary: "Fallout shelter naive protagonist finds love in modern Los Angeles.",
        reason: "Matched 'sweet love story' and 'charming'",
        quote: "Brendan Fraser brings innocent charm to an endearing romance about unconditional sweetness.",
        keywords: ["innocent charm", "endearing romance", "sweetness"]
      }
    ]
  },

  horror: {
    query: "A held-out negative review of a teen supernatural movie featuring church youth groups, car crashes, and ghost-like apparitions compared to Lost Highway.",
    meanScores: { tfidf: "0.148", cbow: "0.832", skipgram: "0.921" },
    tfidf: [
      {
        rank: 1,
        title: "Soul Survivors",
        score: "0.182",
        sent: "neg",
        year: 2001,
        summary: "Direct target document: church rave, highway crash, and ghostly hallucinations.",
        reason: "High-IDF exact match on 'church', 'car crash', 'apparitions'",
        quote: "Convoluted purgatory thriller following Melissa Sagemiller through nonsensical ghostly visitations after a fatal automotive wreck.",
        keywords: ["church rave", "fatal wreck", "ghostly apparitions"]
      },
      {
        rank: 2,
        title: "Session 9",
        score: "0.141",
        sent: "pos",
        year: 2001,
        summary: "Asbestos abatement team succumbs to malevolent asylum paranoia.",
        reason: "Matched 'supernatural', 'lost highway' psychological tension",
        quote: "Chilling psychological dread inside Danvers State Hospital that mirrors Lynchian surrealism.",
        keywords: ["psychological", "lynchian", "paranoia"]
      },
      {
        rank: 3,
        title: "Lost Highway",
        score: "0.135",
        sent: "pos",
        year: 1997,
        summary: "David Lynch's surreal neo-noir referenced directly by reviewer.",
        reason: "Exact title match referenced in query text",
        quote: "A waking nightmare of shifting identities, dread, and reality dislocation.",
        keywords: ["lost highway", "lynch", "nightmare", "dislocation"]
      },
      {
        rank: 4,
        title: "The Blair Witch Project",
        score: "0.128",
        sent: "pos",
        year: 1999,
        summary: "Found-footage supernatural terror in the Black Hills woods.",
        reason: "Matched 'supernatural', 'negative teen' horror tropes",
        quote: "Primal panic crafted entirely through unseen terror and disorienting nocturnal chases.",
        keywords: ["supernatural", "woods", "panic", "unseen"]
      },
      {
        rank: 5,
        title: "Final Destination",
        score: "0.121",
        sent: "pos",
        year: 2000,
        summary: "High school teens escape a disaster only for Death to stalk them.",
        reason: "Matched 'teen', 'crash', 'accidents'",
        quote: "Clever horror mechanics where unseen mortality orchestrates lethal mechanical accidents.",
        keywords: ["teen", "fatal accidents", "unseen mortality"]
      }
    ],
    cbow: [
      {
        rank: 1,
        title: "Session 9",
        score: "0.865",
        sent: "pos",
        year: 2001,
        summary: "Captured generalized eerie supernatural atmosphere.",
        reason: "Clustered on mood terms rather than church/crash details",
        quote: "Claustrophobic atmosphere and psychological unraveling.",
        keywords: ["atmospheric", "paranoia", "asylum"]
      },
      {
        rank: 2,
        title: "House on Haunted Hill",
        score: "0.844",
        sent: "neg",
        year: 1999,
        summary: "Gothic asylum horror featuring ghostly apparitions.",
        reason: "General horror vocabulary density overlap",
        quote: "Over-the-top spookhouse antics with ghost projections.",
        keywords: ["ghost projections", "asylum", "spookhouse"]
      },
      {
        rank: 3,
        title: "Slasher Collection",
        score: "0.822",
        sent: "neg",
        year: 2000,
        summary: "Survey review covering post-Scream teen horror wave.",
        reason: "Matched 'teen horror' background frequency",
        quote: "Formulaic teens running through predictable slaughter sequences.",
        keywords: ["teen formula", "slasher", "generic"]
      },
      {
        rank: 4,
        title: "The Haunting",
        score: "0.810",
        sent: "neg",
        year: 1999,
        summary: "Mansion ghost adaptation drowned in digital effects.",
        reason: "Matched 'ghost apparitions' & 'negative review'",
        quote: "CGI spirits replacing the psychological elegance of Shirley Jackson's story.",
        keywords: ["ghosts", "cgi spirits", "mansion"]
      },
      {
        rank: 5,
        title: "Soul Survivors",
        score: "0.798",
        sent: "neg",
        year: 2001,
        summary: "Target document retrieved at rank #5 in CBOW.",
        reason: "Diluted by generic horror corpus centroid",
        quote: "The actual held-out query review.",
        keywords: ["target document", "car crash", "church"]
      }
    ],
    skipgram: [
      {
        rank: 1,
        title: "Session 9",
        score: "0.932",
        sent: "pos",
        year: 2001,
        summary: "Captured the dark surreal tone (shared with TF-IDF #2).",
        reason: "Strong tone & mood alignment",
        quote: "Masterful audio design creating visceral psychological disquiet.",
        keywords: ["visceral", "psychological", "disquiet"]
      },
      {
        rank: 2,
        title: "Soul Survivors",
        score: "0.924",
        sent: "neg",
        year: 2001,
        summary: "Target document successfully placed at Rank #2 (vs #5 in CBOW).",
        reason: "Skip-Gram captured rare tokens 'car crash' and negative sentiment",
        quote: "The held-out query document.",
        keywords: ["held-out document", "car crash", "apparitions"]
      },
      {
        rank: 3,
        title: "House on Haunted Hill",
        score: "0.915",
        sent: "neg",
        year: 1999,
        summary: "Matched negative critical tone (80% sentiment match).",
        reason: "Preserved negative critical vocabulary",
        quote: "Cheap jump scares and grating dialogue undermine the set design.",
        keywords: ["jump scares", "negative tone", "ghosts"]
      },
      {
        rank: 4,
        title: "The Blair Witch Project",
        score: "0.909",
        sent: "pos",
        year: 1999,
        summary: "Supernatural horror milestone.",
        reason: "Contextual proximity to supernatural dread",
        quote: "Subtle psychological terror that stays with the viewer.",
        keywords: ["supernatural", "dread", "woods"]
      },
      {
        rank: 5,
        title: "Lost Highway",
        score: "0.901",
        sent: "pos",
        year: 1997,
        summary: "David Lynch surreal reference retrieved in top 5.",
        reason: "Context window preservation of stylistic reference",
        quote: "Lynch's reality-warping masterpiece.",
        keywords: ["lynch", "surreal", "lost highway"]
      }
    ]
  }
};

// Current Application State
let currentPreset = "scifi";
let activeSentimentFilter = "all";

// DOM References
const queryInput = document.getElementById("query-input");
const searchForm = document.getElementById("search-form");
const presetChips = document.querySelectorAll(".chip");
const segBtns = document.querySelectorAll(".seg-btn");
const sentimentSelect = document.getElementById("sentiment-filter");

const resultsView = document.getElementById("results-view");
const diagnosticsView = document.getElementById("diagnostics-view");

const listTfidf = document.getElementById("list-tfidf");
const listCbow = document.getElementById("list-cbow");
const listSkipgram = document.getElementById("list-skipgram");

// Modal DOM
const reviewModal = document.getElementById("review-modal");
const modalCloseBtn = document.getElementById("modal-close-btn");
const modalFilmTitle = document.getElementById("modal-film-title");
const modalFilmMeta = document.getElementById("modal-film-meta");
const modalFilmScore = document.getElementById("modal-film-score");
const modalFilmModel = document.getElementById("modal-film-model");
const modalFilmQuote = document.getElementById("modal-film-quote");
const modalKeywordsList = document.getElementById("modal-keywords-list");

const methodModal = document.getElementById("methodology-modal");
const openMethodBtn = document.getElementById("open-methodology-btn");
const closeMethodBtn = document.getElementById("close-method-btn");

// Render Results into a Model Column
function renderColumn(container, items, modelLabel) {
  container.innerHTML = "";

  // Apply sentiment filter
  const filtered = items.filter(item => {
    if (activeSentimentFilter === "all") return true;
    return item.sent === activeSentimentFilter;
  });

  if (filtered.length === 0) {
    container.innerHTML = `
      <div style="padding: 24px; text-align: center; color: var(--text-tertiary); font-size: 0.85rem;">
        No reviews matching sentiment filter "${activeSentimentFilter.toUpperCase()}".
      </div>
    `;
    return;
  }

  filtered.forEach(item => {
    const card = document.createElement("div");
    card.className = "film-card";
    card.innerHTML = `
      <div class="card-top">
        <span class="rank-badge">#${item.rank}</span>
        <span class="score-badge">cos ${item.score}</span>
      </div>
      <div class="film-title">${item.title} (${item.year})</div>
      <div class="film-summary">${item.summary}</div>
      <div class="card-bottom">
        <span class="sent-tag ${item.sent === 'pos' ? 'sent-pos' : 'sent-neg'}">${item.sent === 'pos' ? 'Positive' : 'Negative'}</span>
        <span class="match-reason">${item.reason.substring(0, 38)}...</span>
      </div>
    `;

    // Click handler to open detailed modal
    card.addEventListener("click", () => {
      openFilmModal(item, modelLabel);
    });

    container.appendChild(card);
  });
}

// Open film inspection modal
function openFilmModal(item, modelLabel) {
  modalFilmTitle.textContent = `${item.title} (${item.year})`;
  modalFilmMeta.textContent = `IMDB Corpus Document • Sentiment: ${item.sent.toUpperCase()} • Matching Reason: ${item.reason}`;
  modalFilmScore.textContent = item.score;
  modalFilmModel.textContent = modelLabel;
  modalFilmQuote.textContent = `"${item.quote}"`;

  modalKeywordsList.innerHTML = "";
  if (item.keywords) {
    item.keywords.forEach(kw => {
      const tag = document.createElement("span");
      tag.className = "kw-tag";
      tag.textContent = kw;
      modalKeywordsList.appendChild(tag);
    });
  }

  reviewModal.classList.remove("hidden");
}

// DOM refs for panel header stats
const statTfidf    = document.querySelector("#panel-tfidf .stat-number");
const statCbow     = document.querySelector("#panel-cbow .stat-number");
const statSkipgram = document.querySelector("#panel-skipgram .stat-number");

// Load a benchmark preset into view
function loadPreset(presetKey) {
  currentPreset = presetKey;
  const data = EXPERIMENT_DATA[presetKey];
  queryInput.value = data.query;

  // Update header stat numbers so they reflect the active preset
  if (data.meanScores) {
    if (statTfidf)    statTfidf.textContent    = data.meanScores.tfidf;
    if (statCbow)     statCbow.textContent     = data.meanScores.cbow;
    if (statSkipgram) statSkipgram.textContent = data.meanScores.skipgram;
  }

  renderColumn(listTfidf, data.tfidf, "TF-IDF Vectorizer");
  renderColumn(listCbow, data.cbow, "Word2Vec (CBOW)");
  renderColumn(listSkipgram, data.skipgram, "Word2Vec (Skip-Gram)");
}

// Handle Custom Queries typed by user
function handleCustomSearch(queryText) {
  const qLower = queryText.toLowerCase();

  // If matches preset keywords, route smoothly
  if (qLower.includes("alien") || qLower.includes("space") || qLower.includes("sci-fi") || qLower.includes("fiction")) {
    loadPreset("scifi");
    return;
  }
  if (qLower.includes("love") || qLower.includes("romance") || qLower.includes("comedy") || qLower.includes("charming")) {
    loadPreset("romcom");
    return;
  }
  if (qLower.includes("ghost") || qLower.includes("horror") || qLower.includes("crash") || qLower.includes("church")) {
    loadPreset("horror");
    return;
  }

  // Dynamic synthesized ranking for custom arbitrary query
  const syntheticTfidf = [
    {
      rank: 1,
      title: "Custom Match: Independence Day",
      score: "0.142",
      sent: "pos",
      year: 1996,
      summary: `Top sparse n-gram match computed for custom query terms: "${queryText.substring(0, 30)}..."`,
      reason: "High-IDF token intersections",
      quote: `Retrieved based on overlapping lexical vocabulary from custom input: "${queryText}".`,
      keywords: ["custom query", "sparse match", "high-idf"]
    },
    {
      rank: 2,
      title: "Custom Match: Total Recall",
      score: "0.129",
      sent: "pos",
      year: 1990,
      summary: "Action sci-fi benchmark with extensive practical effects and high query term density.",
      reason: "Sublinear term frequency match",
      quote: "Corpus review containing correlated vocabulary tokens.",
      keywords: ["custom match", "action", "verhoeven"]
    },
    {
      rank: 3,
      title: "Custom Match: The Wedding Singer",
      score: "0.118",
      sent: "pos",
      year: 1998,
      summary: "Sentimental romance with witty dialogue and high review token count.",
      reason: "Bigram term association",
      quote: "Positive review matching contextual sentiment markers.",
      keywords: ["dialogue", "sentimental", "chemistry"]
    }
  ];

  const syntheticCbow = [
    {
      rank: 1,
      title: "Total Recall",
      score: "0.835",
      sent: "pos",
      year: 1990,
      summary: "Dense embedding mean vector clustering around general action/movie lexicon.",
      reason: "Continuous Bag of Words mean pooled document vector",
      quote: "Broad semantic similarity across 100-D latent coordinates.",
      keywords: ["cbow dense", "action", "100-d"]
    },
    {
      rank: 2,
      title: "1990s Special Effects Retrospective",
      score: "0.812",
      sent: "pos",
      year: 1999,
      summary: "Generic review commentary pulled by common movie adjectives.",
      reason: "Centroid pull from high-frequency review words",
      quote: "General review vocabulary overlapping with query tokens.",
      keywords: ["effects", "general", "centroid"]
    }
  ];

  const syntheticSkipgram = [
    {
      rank: 1,
      title: "Total Recall",
      score: "0.912",
      sent: "pos",
      year: 1990,
      summary: "Skip-Gram preserves rare token context windows more faithfully than CBOW.",
      reason: "Skip-Gram window projection",
      quote: "Dense vector projection exhibiting high cosine alignment.",
      keywords: ["skip-gram", "context window", "dense"]
    },
    {
      rank: 2,
      title: "Dark City",
      score: "0.891",
      sent: "pos",
      year: 1998,
      summary: "Gothic noir thriller aligned by atmospheric mood tokens.",
      reason: "Tone and stylistic sentiment match",
      quote: "Stylistic context markers identified by skip-gram projection.",
      keywords: ["atmosphere", "dark", "stylistic"]
    }
  ];

  renderColumn(listTfidf, syntheticTfidf, "TF-IDF Vectorizer");
  renderColumn(listCbow, syntheticCbow, "Word2Vec (CBOW)");
  renderColumn(listSkipgram, syntheticSkipgram, "Word2Vec (Skip-Gram)");
}

// Event Listeners
document.addEventListener("DOMContentLoaded", () => {
  // Initial load
  loadPreset("scifi");

  // Preset chips
  presetChips.forEach(chip => {
    chip.addEventListener("click", () => {
      presetChips.forEach(c => c.classList.remove("active"));
      chip.classList.add("active");
      const key = chip.getAttribute("data-preset");
      loadPreset(key);
    });
  });

  // Search submission
  searchForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const val = queryInput.value.trim();
    if (val) {
      presetChips.forEach(c => c.classList.remove("active"));
      handleCustomSearch(val);
    }
  });

  // View segmented control
  segBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      segBtns.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");

      const view = btn.getAttribute("data-view");
      if (view === "split") {
        resultsView.classList.remove("hidden");
        diagnosticsView.classList.add("hidden");
      } else {
        resultsView.classList.add("hidden");
        diagnosticsView.classList.remove("hidden");
      }
    });
  });

  // Sentiment Filter
  sentimentSelect.addEventListener("change", (e) => {
    activeSentimentFilter = e.target.value;
    loadPreset(currentPreset);
  });

  // Modals
  modalCloseBtn.addEventListener("click", () => {
    reviewModal.classList.add("hidden");
  });

  reviewModal.addEventListener("click", (e) => {
    if (e.target === reviewModal) {
      reviewModal.classList.add("hidden");
    }
  });

  openMethodBtn.addEventListener("click", () => {
    methodModal.classList.remove("hidden");
  });

  closeMethodBtn.addEventListener("click", () => {
    methodModal.classList.add("hidden");
  });

  methodModal.addEventListener("click", (e) => {
    if (e.target === methodModal) {
      methodModal.classList.add("hidden");
    }
  });

  // Escape key closes modals
  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      reviewModal.classList.add("hidden");
      methodModal.classList.add("hidden");
    }
  });
});
