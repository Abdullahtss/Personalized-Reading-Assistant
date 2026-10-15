# Natural Language Processing (CS4063)
# Assignment 1 Report — Task 4: Comparative Analysis

**Name:** Abdullah Bin Ahmed  
**Roll Number:** L227444  
**Course:** Natural Language Processing (CS4063)  
**Date:** 12 September 2026

---

**Title:** Advanced Text Similarity and Word Representations  
**System:** Personalized Reading Assistant  
**Dataset:** NLTK `movie_reviews` corpus (2,000 IMDB-style reviews; 1,000 positive, 1,000 negative)

This report accompanies `Assignment_1.ipynb`. Tasks 1–3 (preprocessing, TF-IDF retrieval, Word2Vec CBOW/Skip-gram) are implemented and executed in the notebook. Task 4 — which method recommends better, and why, plus limitations — is answered here with the **actual outputs of that run**.

---

## 1. What was compared

A user query is converted into a vector. Every review in the corpus is converted into a vector in the **same** space. Reviews are ranked by **cosine similarity**.

| Method | Vector | How a review is represented |
|---|---|---|
| TF-IDF | Sparse, 79,696 dimensions | Weighted bag of unigrams + bigrams |
| Word2Vec CBOW | Dense, 100 dimensions | Mean of word vectors (`sg=0`) |
| Word2Vec Skip-gram | Dense, 100 dimensions | Mean of word vectors (`sg=1`) |

All three engines used the same preprocessing (URL removal, lowercasing, special-character stripping, tokenization, stopword removal, WordNet lemmatization) and the same user queries.

---

## 2. Corpus snapshot (Task 1, needed to read Task 4)

After cleaning, reviews have **331.6 tokens** on average and none are empty. Frequent unigrams are generic review words (*character, like, time, scene, story*). The interesting signal sits in **bigrams and trigrams**:

- Bigrams: *special effect*, *star war*, *science fiction*, *high school*, *bad guy*
- Trigrams: *know last summer*, *saving private ryan*, *blair witch project*, *obi wan kenobi*

That split already predicts the later result: **TF-IDF can overweight distinctive phrases**, while **averaged embeddings get pulled toward the generic review centroid** (*character, scene, story*).

![Most frequent unigrams](figures/unigrams.png)

![Most frequent bigrams](figures/bigrams.png)

![Most frequent trigrams](figures/trigrams.png)

![Word cloud of the preprocessed corpus](figures/wordcloud.png)

![Review length distribution](figures/length_distribution.png)

---

## 3. Main experiment: sci-fi user query

**Query:**  
*“I loved this science fiction movie. The visual effects were stunning and the space battles felt realistic. The plot about an alien invasion and humanity fighting back kept me hooked. Great acting, a gripping story, and unforgettable special effects.”*

### 3.1 Top-5 recommendations

**TF-IDF**

| Rank | Cosine | Sentiment | What was retrieved |
|---:|---:|---|---|
| 1 | 0.138 | pos | *Independence Day* (ID4) — alien invasion, summer blockbuster hype |
| 2 | 0.131 | pos | *Aliens* — Ridley Scott sequel / James Cameron |
| 3 | 0.130 | pos | *Total Recall* — Verhoeven, action + science fiction + effects |
| 4 | 0.123 | pos | *Dark City* — noir science fiction |
| 5 | 0.117 | neg | Michael Crichton science-fiction adaptation |

**Word2Vec CBOW**

| Rank | Cosine | Sentiment | What was retrieved |
|---:|---:|---|---|
| 1 | 0.842 | pos | *Total Recall* |
| 2 | 0.837 | pos | Essay on 1990s special effects / sci-fi action |
| 3 | 0.805 | pos | *Final Fantasy: The Spirits Within* (CGI showcase) |
| 4 | 0.775 | neg | *Titan A.E.* (animated sci-fi) |
| 5 | 0.773 | pos | “Strangers” contacting humans / *Dark City*-style film |

**Word2Vec Skip-gram**

| Rank | Cosine | Sentiment | What was retrieved |
|---:|---:|---|---|
| 1 | 0.921 | pos | *Total Recall* |
| 2 | 0.907 | pos | Same special-effects / sci-fi action essay |
| 3 | 0.904 | neg | *Mission to Mars* (De Palma; “Houston, we have a problem”) |
| 4 | 0.901 | neg | *Titan A.E.* |
| 5 | 0.896 | pos | *Dark City* |

### 3.2 Set overlap and score scale

Sci-fi top-5 Jaccard overlap:

|  | TF-IDF | CBOW | Skip-gram |
|---|---|---|---|
| TF-IDF | 1.00 | 0.11 | 0.25 |
| CBOW | 0.11 | 1.00 | 0.43 |
| Skip-gram | 0.25 | 0.43 | 1.00 |

CBOW and Skip-gram agree with **each other** more than either agrees with TF-IDF. Shared hits: *Total Recall* (all three); *Dark City* (TF-IDF + Skip-gram); *Titan A.E.* and the effects essay (both embeddings).

Mean top-5 cosine: TF-IDF **0.128**, CBOW **0.806**, Skip-gram **0.906**. These values **cannot** be compared across methods. Embedding scores are high because mean-pooled reviews sit close together in a 100-D ball. TF-IDF scores are low because a short query only lights up a handful of sparse dimensions — but the *ranking* is still the right one.

![Cosine scores by rank and Jaccard overlap of top-5 sets](figures/method_comparison.png)

---

## 4. Which method is better — and why

**TF-IDF is the better recommender for this assistant and this dataset.**

Reasons, tied to the table above:

1. **It retrieves the films the query is actually about.** *Independence Day* and *Aliens* are alien-invasion stories with heavy effects. Neither appears in the embedding top-5. TF-IDF finds them because `alien`, `invasion`, `science fiction`, and `special effect` are rare, high-IDF terms.

2. **Word2Vec is semantically nearby but thematically looser.** Neighbors of `alien` are sensible (`ripley`, `nostromo`, `lifeform`, `creature`), so the model *did* learn movie language. After **averaging every word in a 300-token review**, though, a CGI-demo film (*Final Fantasy*) and a generic “effects of the decade” essay outrank *Independence Day*. Mean pooling cannot tell “this review is *about* an invasion” from “this review *mentions* effects.”

3. **Skip-gram beats CBOW, but not TF-IDF.** Skip-gram’s extra hits (*Mission to Mars*, *Dark City*) are closer to space / reality-bending sci-fi than CBOW’s *Final Fantasy*. That matches Skip-gram’s known bias toward rarer topical words. It is the better embedding, not the better overall engine.

4. **A second query (romantic comedy) reproduces the pattern.**  
   Query: *“A charming romantic comedy with a sweet love story, funny dialogue, and a happy ending…”*  
   - TF-IDF: *Notting Hill*, a British love story, *Lost and Found*, *Forces of Nature*, *The Wedding Singer*.  
   - CBOW: *Deuce Bigalow*, *Loser*, a divorce comedy, *Big Daddy*, *The Wedding Singer* — it heard **comedy**, not **romance**.  
   - Skip-gram: Drew Barrymore comedy + *The Wedding Singer* (two separate reviews) — between the two.

5. **Leave-one-out (real corpus review as query).** The held-out document is a negative teen-supernatural review (church party, crash, ghost-like apparitions; the reviewer compares it to *Lost Highway*).  
   - TF-IDF: *Soul Survivors*, *Session 9*, *Lost Highway*, *The Blair Witch Project* — shared keywords and the comparison the review itself made.  
   - Embeddings: other horror / “weird” films (*Session 9*, *House on Haunted Hill*, slasher setups). Mood is right; plot is vaguer.  
   - Same-sentiment rate in the top 5: TF-IDF 60%, CBOW 60%, Skip-gram **80%**. Skip-gram was the best at matching *tone*; TF-IDF was the best at matching *content*.

**When would Word2Vec win?** If the user paraphrased with almost no overlapping keywords (*“a picture about extraterrestrials attacking our planet”* instead of *alien invasion*), TF-IDF would miss synonyms that embeddings might still group. That advantage did not show up on these keyword-rich queries against a 2,000-document corpus.

---

## 5. Limitations of each method

### 5.1 TF-IDF

- **No true semantics.** Synonyms occupy different coordinates. `amazing` and `excellent` never help each other.
- **Sparsity.** The fitted matrix is 2,000 × 79,696 with **99.57% zeros**. Documents must share surface terms or bigrams.
- **Weak word order.** Unigrams + bigrams capture *science fiction* and *special effect*, not “who invaded whom.”
- **Boilerplate.** High-frequency review nouns (*character*, *scene*, *story*) still consume mass; IDF only partly down-weights them.
- **Short queries.** A 25-token query has few non-zero TF-IDF weights, so even a correct match has cosine around 0.12. The rank is useful; the absolute score is not a confidence probability.

### 5.2 Word2Vec (CBOW and Skip-gram)

- **Corpus size.** 2,000 reviews and ~22k vocabulary words are small for embeddings. Rare names and plot words remain noisy.
- **Mean pooling.** Averaging drops word order, negation (*not good*), and term frequency inside the document. A one-off mention of *alien* looks like a review about aliens.
- **Centroid collapse.** Reviews share a large background lexicon, so document vectors bunch together. Leave-one-out cosines sit at 0.93–0.98, which looks “very similar” even when plots differ.
- **CBOW vs Skip-gram.** CBOW is faster and smoother on frequent words, which is why a rom-com query drifted to broad comedy. Skip-gram is slower, better on rare words, and can overfit windows on a small corpus (neighbors of `love` included character names rather than clean synonyms).
- **Wrong training objective for retrieval.** Word2Vec predicts *word context*, not *document aboutness*.
- **Incomparable scores.** A Skip-gram cosine of 0.90 is not “better” than a TF-IDF cosine of 0.13; the geometries are different.

---

## 6. Conclusion

On this movie-review collection, the Personalized Reading Assistant should **recommend with TF-IDF cosine similarity**. It followed the user’s stated topic (alien-invasion sci-fi; romantic comedy) more faithfully than either embedding model.

Word2Vec is not a failed experiment: nearest-neighbor probes show that CBOW and Skip-gram learned genre and franchise structure. The failure mode is **document composition** (mean pooling on a small corpus), not the idea of dense vectors. **Skip-gram is the stronger embedding** of the two.

A practical next step, beyond the assignment, is a **hybrid**: TF-IDF or BM25 for candidate retrieval, Skip-gram (or a later sentence embedding) only to rerank paraphrases. Using either family alone throws away information the other one has.

---

## 7. How to reproduce

Open and run `Assignment_1.ipynb` (Python 3, packages: `nltk`, `gensim`, `scikit-learn`, `pandas`, `matplotlib`, `seaborn`, `wordcloud`). Figures in this report are written to the `figures/` folder by that notebook.
