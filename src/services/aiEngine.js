/**
 * NexusATS AI Engine
 * Advanced NLP, TF-IDF Vector Similarity, ATS Rule-based Auditor & Simulated LLM Copilot
 */

// List of high-frequency tech CSE keywords for ATS matching
const TECH_DICTIONARY = {
  languages: ['javascript', 'python', 'java', 'c++', 'typescript', 'go', 'rust', 'sql', 'html5', 'css3', 'bash'],
  frameworks: ['react', 'node.js', 'express', 'next.js', 'fastapi', 'django', 'spring boot', 'vue', 'angular', 'tailwind css'],
  databases: ['postgresql', 'mongodb', 'redis', 'mysql', 'qdrant', 'pinecone', 'elasticsearch', 'dynamodb'],
  devops_cloud: ['docker', 'kubernetes', 'aws', 'gcp', 'azure', 'git', 'github actions', 'ci/cd', 'nginx', 'linux', 'terraform'],
  concepts: ['microservices', 'rest api', 'graphql', 'websockets', 'rag', 'llm', 'vector embeddings', 'system design', 'oop', 'dsa', 'unit testing', 'jwt', 'oauth2']
};

/**
 * Tokenize and normalize text into word frequencies
 */
function tokenize(text) {
  if (!text) return [];
  return text
    .toLowerCase()
    .replace(/[^a-z0-9+#\.\s-]/g, ' ')
    .split(/\s+/)
    .filter(word => word.length > 1);
}

/**
 * Calculate Term Frequency (TF)
 */
function getTF(tokens) {
  const tf = {};
  const total = tokens.length || 1;
  tokens.forEach(token => {
    tf[token] = (tf[token] || 0) + 1 / total;
  });
  return tf;
}

/**
 * Compute Cosine Similarity between two term-frequency maps
 */
function computeCosineSimilarity(tf1, tf2) {
  const allKeys = new Set([...Object.keys(tf1), ...Object.keys(tf2)]);
  let dotProduct = 0;
  let normA = 0;
  let normB = 0;

  allKeys.forEach(key => {
    const valA = tf1[key] || 0;
    const valB = tf2[key] || 0;
    dotProduct += valA * valB;
    normA += valA * valA;
    normB += valB * valB;
  });

  if (normA === 0 || normB === 0) return 0;
  return dotProduct / (Math.sqrt(normA) * Math.sqrt(normB));
}

/**
 * Extract hard skills matched against tech dictionary
 */
function extractTechSkills(tokens) {
  const text = tokens.join(' ');
  const found = new Set();
  
  Object.values(TECH_DICTIONARY).flat().forEach(skill => {
    const regex = new RegExp(`\\b${skill.replace('.', '\\.')}\\b`, 'i');
    if (regex.test(text)) {
      found.add(skill);
    }
  });

  return Array.from(found);
}

/**
 * Core ATS Analyzer
 */
export function analyzeResumeVsJD(resumeText, jdText) {
  const resumeTokens = tokenize(resumeText);
  const jdTokens = tokenize(jdText);

  // 1. Semantic Similarity via Cosine Similarity on Term Vectors
  const tfResume = getTF(resumeTokens);
  const tfJD = getTF(jdTokens);
  const rawSimilarity = computeCosineSimilarity(tfResume, tfJD);
  const vectorMatchScore = Math.min(100, Math.round(rawSimilarity * 350 + 40));

  // 2. Keyword Coverage Analysis
  const resumeSkills = extractTechSkills(resumeTokens);
  const jdSkills = extractTechSkills(jdTokens);

  const missingSkills = jdSkills.filter(skill => !resumeSkills.includes(skill));
  const matchedSkills = jdSkills.filter(skill => resumeSkills.includes(skill));
  
  const skillCoveragePercent = jdSkills.length > 0 
    ? Math.round((matchedSkills.length / jdSkills.length) * 100) 
    : 75;

  // 3. Format & Quality Auditing
  const hasEmail = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/.test(resumeText);
  const hasPhone = /(\+\d{1,3}[- ]?)?\d{10}/.test(resumeText) || /phone|mobile|tel/i.test(resumeText);
  const hasGithubOrLinkedin = /github\.com|linkedin\.com/i.test(resumeText);
  
  // Numerical metrics audit (Quantifiable achievements boost ATS dramatically)
  const metricMatches = (resumeText.match(/\d+%/g) || []).concat(
    resumeText.match(/\$\d+/g) || [],
    resumeText.match(/\b\d+\s+(users|requests|ms|seconds|ms|x|x faster|reduction|increase|percent)\b/gi) || []
  );
  const metricsScore = Math.min(100, metricMatches.length * 20);

  // Strong action verbs check
  const actionVerbs = ['developed', 'engineered', 'architected', 'optimized', 'deployed', 'implemented', 'scaled', 'integrated', 'designed', 'built', 'spearheaded'];
  const foundVerbs = actionVerbs.filter(verb => new RegExp(`\\b${verb}\\b`, 'i').test(resumeText));

  // Overall Weighted ATS Score calculation
  const overallATSScore = Math.round(
    (skillCoveragePercent * 0.45) +
    (vectorMatchScore * 0.25) +
    (metricsScore * 0.15) +
    ((hasEmail && hasPhone && hasGithubOrLinkedin ? 100 : 60) * 0.15)
  );

  // Recommendation engine
  const recommendations = [];
  if (missingSkills.length > 0) {
    recommendations.push({
      type: 'warning',
      title: 'Missing Critical Technical Keywords',
      detail: `Your target job emphasizes: ${missingSkills.slice(0, 5).join(', ')}. Include these explicitly in your project tech stack lists.`
    });
  }
  if (metricMatches.length < 3) {
    recommendations.push({
      type: 'danger',
      title: 'Insufficient Quantifiable Impact',
      detail: 'ATS screeners favor quantifiable metrics (e.g., "reduced latency by 35%", "handled 10k daily requests"). Add numbers to your bullet points.'
    });
  }
  if (!hasGithubOrLinkedin) {
    recommendations.push({
      type: 'info',
      title: 'Missing Professional Links',
      detail: 'Ensure clickable GitHub and LinkedIn links are present in the header.'
    });
  }

  // Keyword Density for charts
  const topJdKeywords = jdTokens
    .filter(t => t.length > 3)
    .reduce((acc, word) => {
      acc[word] = (acc[word] || 0) + 1;
      return acc;
    }, {});
    
  const sortedKeywords = Object.entries(topJdKeywords)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 8);

  return {
    overallATSScore,
    vectorMatchScore,
    skillCoveragePercent,
    metricsCount: metricMatches.length,
    foundVerbsCount: foundVerbs.length,
    matchedSkills,
    missingSkills,
    recommendations,
    keywordDensity: {
      labels: sortedKeywords.map(k => k[0]),
      jdCounts: sortedKeywords.map(k => k[1]),
      resumeCounts: sortedKeywords.map(k => (tfResume[k[0]] ? Math.ceil(tfResume[k[0]] * resumeTokens.length) : 0))
    },
    suggestedEnhancements: [
      {
        original: "Built a web app using Node.js and MongoDB to store user data.",
        improved: "Engineered scalable RESTful API services using Node.js & MongoDB, optimizing query indexes to handle 5,000+ daily transactions with <80ms response time."
      },
      {
        original: "Created frontend with React and integrated AI features.",
        improved: "Architected responsive React single-page application integrating RAG vector search models, improving user interaction throughput by 42%."
      }
    ]
  };
}

/**
 * Dynamic Technical Interview Copilot Generator
 */
export function generateInterviewQuestion(resumeText, jdText, questionNumber = 1) {
  const resumeTokens = tokenize(resumeText);
  const skills = extractTechSkills(resumeTokens);
  const topSkill = skills[questionNumber % skills.length] || 'Full-Stack Web Development';

  const questionsPool = [
    {
      type: 'System Design & Architecture',
      title: `Designing High-Availability Microservices for ${topSkill.toUpperCase()}`,
      prompt: `In your resume, you highlighted expertise in ${topSkill}. How would you design a distributed microservices system using ${topSkill} that handles 100,000 active concurrent WebSocket connections while maintaining low-latency state persistence with Redis?`,
      codeTemplate: `// System Architecture Blueprint
class DistributedEventBroker {
  constructor() {
    this.connections = new Map();
    // TODO: Implement redis pub-sub sync & rate limiting
  }

  handleIncomingStream(socketId, payload) {
    // Write your message handling & deduplication logic here
  }
}`
    },
    {
      type: 'Algorithms & Low-Level Design',
      title: 'Optimizing Time & Space Complexity in Event Queues',
      prompt: `Given a continuous stream of user API requests, design an in-memory Sliding Window Rate Limiter algorithm. Explain your choice between Leaky Bucket vs. Sliding Window Log in terms of memory overhead and time complexity.`,
      codeTemplate: `class SlidingWindowRateLimiter {
  constructor(limitWindowMs, maxRequests) {
    this.limitWindowMs = limitWindowMs;
    this.maxRequests = maxRequests;
    this.userLogs = new Map();
  }

  isAllowed(userId, timestamp = Date.now()) {
    // TODO: Clean expired entries & check capacity
    return true;
  }
}`
    },
    {
      type: 'Database Indexing & Query Tuning',
      title: 'Database Performance Optimization & Indexing',
      prompt: `Suppose your application experiences slow queries on a table with 5,000,000 records. Explain B-Tree vs Hash indexes, and describe how you would diagnose slow queries using EXPLAIN ANALYZE in PostgreSQL or MongoDB.`,
      codeTemplate: `-- SQL Optimization Query Exercise
EXPLAIN ANALYZE
SELECT u.id, u.email, COUNT(o.id) as total_orders
FROM users u
JOIN orders o ON u.id = o.user_id
WHERE o.created_at >= NOW() - INTERVAL '30 days'
GROUP BY u.id, u.email;`
    }
  ];

  return questionsPool[(questionNumber - 1) % questionsPool.length];
}

/**
 * Automated Evaluation Rubric for Interview Answers
 */
export function evaluateInterviewAnswer(question, answerCode) {
  const answerLength = answerCode.trim().length;
  if (answerLength < 15) {
    return {
      score: 3,
      verdict: 'Needs Expansion',
      feedback: 'Your answer is brief. In technical interviews, articulate design trade-offs, time complexity (Big-O), edge cases, and architectural safeguards.',
      rubricScores: { architecture: 3, codeQuality: 4, clarity: 3 }
    };
  }

  const hasKeywords = /redis|kafka|pub|sub|index|complexity|big-o|O\(1\)|O\(n\)|cache|concurrency|lock|mutex/i.test(answerCode);
  const score = hasKeywords ? Math.min(10, Math.floor(7 + Math.random() * 3)) : 7;

  return {
    score,
    verdict: score >= 8 ? 'Strong Senior-Level Candidate Answer' : 'Solid CSE Graduate Response',
    feedback: hasKeywords
      ? 'Excellent mention of system trade-offs, caching state, and concurrency patterns! This demonstrates strong architectural thinking for entry/mid-level roles.'
      : 'Good structure! To boost this answer, explicitly mention time/space complexity bounds (e.g. O(1) hash map lookup) and failover strategies.',
    rubricScores: {
      architecture: score,
      codeQuality: Math.min(10, score + 1),
      clarity: Math.min(10, score)
    }
  };
}
