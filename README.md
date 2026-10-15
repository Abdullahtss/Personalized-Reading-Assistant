# 📚 Personalized Reading Assistant: Text Similarity & Word Representations

An empirical Natural Language Processing evaluation comparing sparse vector space models (**TF-IDF**) against dense distributed representations (**Word2Vec CBOW & Skip-Gram**) for information retrieval and personalized recommendations across the 2,000-document NLTK `movie_reviews` corpus.

[![Live Interactive Benchmark](https://img.shields.io/badge/Live_Demo-Interactive_Assistant-06B6D4?style=for-the-badge&logo=googlechrome&logoColor=white)](https://abdullahtss.github.io/Personalized-Reading-Assistant/)
[![Python](https://img.shields.io/badge/Python-3.8+-3776AB?style=for-the-badge&logo=python&logoColor=white)](https://www.python.org/)
[![NLTK](https://img.shields.io/badge/NLTK-NLP_Corpus-154f30?style=for-the-badge)](https://www.nltk.org/)
[![Gensim](https://img.shields.io/badge/Gensim-Word2Vec-e65100?style=for-the-badge)](https://radimrehurek.com/gensim/)
[![Scikit-Learn](https://img.shields.io/badge/Scikit--Learn-TF--IDF-F7931E?style=for-the-badge&logo=scikitlearn&logoColor=white)](https://scikit-learn.org/)

---

## 📌 Executive Summary & Findings

When recommending documents based on user intent (e.g., alien invasion sci-fi or romantic comedy), **which method is superior?**

### 🏆 The Verdict: TF-IDF Outperformed Word2Vec
* **TF-IDF with sublinear scaling + n-grams** captured exact document *"aboutness"*. It retrieved the true thematic matches (*Independence Day*, *Aliens*) because rare high-IDF tokens like `alien`, `invasion`, and `special effect` generated strong, focused cosine weights.
* **Word2Vec Mean-Pooling Dilution:** While Word2Vec learned rich local semantics (`alien` $\to$ `ripley`, `nostromo`, `creature`), averaging vectors across 300+ word reviews washed out rare topical signals, causing generic CGI essays and unrelated comedies to outrank plot matches.
* **Skip-Gram Beat CBOW:** Skip-Gram was far superior at preserving rare words and matching tone/sentiment (**80%** consistency in leave-one-out experiments vs 60% for CBOW).

---

## 🏗️ Architecture & Model Configurations

| Parameter | TF-IDF Vectorizer | Word2Vec CBOW | Word2Vec Skip-Gram |
| :--- | :--- | :--- | :--- |
| **Vector Space** | Sparse (79,696 dimensions) | Dense (100 dimensions) | Dense (100 dimensions) |
| **N-grams** | Unigrams + Bigrams | Word-level window (size 5) | Word-level window (size 5) |
| **Aggregation** | Sublinear TF + IDF weighting | Mean document pooling (`sg=0`) | Mean document pooling (`sg=1`) |
| **Similarity Metric** | Cosine Similarity | Cosine Similarity | Cosine Similarity |

---

## 📊 Empirical Top-5 Sci-Fi Benchmark

> **User Query:** *"I loved this science fiction movie. The visual effects were stunning and the space battles felt realistic. The plot about an alien invasion and humanity fighting back kept me hooked..."*

| Rank | TF-IDF (Score) | Word2Vec CBOW (Score) | Word2Vec Skip-Gram (Score) |
| :---: | :--- | :--- | :--- |
| **#1** | **Independence Day** (0.138) | Total Recall (0.842) | Total Recall (0.921) |
| **#2** | **Aliens** (0.131) | 1990s Special Effects Essay (0.837) | 1990s Special Effects Essay (0.907) |
| **#3** | **Total Recall** (0.130) | Final Fantasy: Spirits Within (0.805) | Mission to Mars (0.904) |
| **#4** | **Dark City** (0.123) | Titan A.E. (0.775) | Titan A.E. (0.901) |
| **#5** | Sphere (0.117) | Strangers / First Contact (0.773) | Dark City (0.896) |

### Set Overlap (Jaccard Index)
* **TF-IDF vs CBOW:** 0.11 (minimal overlap)
* **TF-IDF vs Skip-Gram:** 0.25 (*Total Recall* & *Dark City*)
* **CBOW vs Skip-Gram:** 0.43 (dense embeddings cluster together)

---

## 📁 Repository Structure

```plaintext
├── Assignment_1.ipynb         # Complete pipeline: Preprocessing, TF-IDF, Word2Vec, and Visualizations
├── Assignment_1_Report.md      # Detailed academic report and comparative findings
├── Assignment_1_Report.pdf     # Formatted PDF publication
├── index.html                 # Interactive Web UI benchmark dashboard
├── style.css                  # Modern dark glassmorphic styling
├── app.js                     # Live benchmark evaluation logic
├── requirements.txt           # Python dependencies
└── README.md                  # Project documentation
```

---

## 🚀 Getting Started

```bash
# Clone the repository
git clone https://github.com/Abdullahtss/Personalized-Reading-Assistant.git
cd Personalized-Reading-Assistant-NLP

# Install dependencies
pip install -r requirements.txt

# Launch Jupyter Notebook
jupyter notebook Assignment_1.ipynb
```

---

## 👤 Author
**Abdullah Bin Ahmed** (Roll No: L227444)  
FAST National University of Computer and Emerging Sciences  
Natural Language Processing (CS4063)
