import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useReveal } from '../hooks';
import DharvaLogo from '../components/ui/DharvaLogo';
import ContactModal from '../components/ui/ContactModal';

const BLOG_POSTS = [
  {
    id: 1,
    category: 'AI Governance',
    tag: 'FEATURED',
    tagColor: '#00e5c8',
    title: 'The EU AI Act Is Now Enforced. Here\'s What CTOs Need to Do This Week.',
    excerpt: 'The grace period is over. The EU AI Act enforcement began in August 2024 with prohibited practices, and full high-risk AI requirements apply from August 2026. Here\'s a practical action plan for every AI team.',
    readTime: '8 min read',
    date: 'Mar 15, 2026',
    author: 'Dharva Research Team',
  },
  {
    id: 2,
    category: 'Technical',
    tag: 'DEEP DIVE',
    tagColor: '#8b5cf6',
    title: 'How to Detect LLM Hallucinations at Production Scale: A Technical Guide',
    excerpt: 'Hallucination detection isn\'t a solved problem — but there are proven approaches. We break down factuality scoring, RAG groundedness checks, and confidence calibration for production LLM systems.',
    readTime: '12 min read',
    date: 'Mar 10, 2026',
    author: 'Dharva Engineering',
  },
  {
    id: 3,
    category: 'Compliance',
    tag: 'RBI SPECIAL',
    tagColor: '#fb923c',
    title: 'RBI\'s AI Governance Directive: What India\'s Banks Need to Document',
    excerpt: 'The Reserve Bank of India issued AI governance expectations for banks in 2023. Most banks still don\'t have the documentation. Here\'s exactly what RBI expects — and how to generate it automatically.',
    readTime: '10 min read',
    date: 'Mar 5, 2026',
    author: 'Compliance Team',
  },
  {
    id: 4,
    category: 'Case Study',
    tag: 'CASE STUDY',
    tagColor: '#4ade80',
    title: 'How NexaBank Passed EU AI Act Assessment in 6 Weeks (Not 6 Months)',
    excerpt: 'NexaBank Group had 2.4M daily lending decisions and zero EU AI Act documentation. 6 weeks later, they had a regulator-ready audit report for every system. Here\'s how.',
    readTime: '6 min read',
    date: 'Feb 28, 2026',
    author: 'Customer Stories',
  },
  {
    id: 5,
    category: 'AI Governance',
    tag: 'NEW',
    tagColor: '#00e5c8',
    title: 'Model Drift: The Silent Risk That\'s Destroying Your AI\'s Accuracy',
    excerpt: 'Your model was 94% accurate on launch day. Six months later, the world changed — but your model didn\'t. Drift is the most underdetected risk in production AI. Here\'s how to monitor it.',
    readTime: '9 min read',
    date: 'Feb 20, 2026',
    author: 'Dharva Research Team',
  },
  {
    id: 6,
    category: 'Technical',
    tag: 'GUIDE',
    tagColor: '#3b82f6',
    title: 'Building Immutable AI Audit Trails: Architecture and Implementation',
    excerpt: 'Regulators don\'t just want to see what your AI decided — they want proof that the record hasn\'t been tampered with. Here\'s how to build cryptographically-signed audit trails for AI systems.',
    readTime: '15 min read',
    date: 'Feb 15, 2026',
    author: 'Dharva Engineering',
  },
  {
    id: 7,
    category: 'Compliance',
    tag: 'HEALTHCARE',
    tagColor: '#4ade80',
    title: 'CDSCO AI Medical Device Guidelines: What Healthtech Companies Need Now',
    excerpt: 'India\'s CDSCO is formalizing AI medical device oversight. Clinical AI teams have a narrow window to build governance infrastructure before mandatory certification. Here\'s what\'s coming.',
    readTime: '11 min read',
    date: 'Feb 10, 2026',
    author: 'Healthcare Compliance',
  },
  {
    id: 8,
    category: 'AI Governance',
    tag: 'EXPLAINER',
    tagColor: '#facc15',
    title: 'Algorithmic Bias in Credit Scoring: How to Detect, Measure, and Fix It',
    excerpt: 'Your credit model is 92% accurate. But is it 92% accurate for everyone? Demographic parity analysis, equalized odds, and intersectionality monitoring explained for ML engineers.',
    readTime: '13 min read',
    date: 'Feb 5, 2026',
    author: 'Dharva Research Team',
  },
  {
    id: 9,
    category: 'Technical',
    tag: 'INTEGRATION',
    tagColor: '#8b5cf6',
    title: 'Zero-Change AI Governance: How to Add Observability Without Touching Your Model',
    excerpt: 'The biggest barrier to AI governance is implementation complexity. Here\'s how Dharva\'s SDK wraps your existing AI pipeline as a lightweight observability layer — without a single model change.',
    readTime: '7 min read',
    date: 'Jan 30, 2026',
    author: 'Dharva Engineering',
  },
  {
    id: 10,
    category: 'Strategy',
    tag: 'CTO GUIDE',
    tagColor: '#fb923c',
    title: 'The AI Governance Checklist Every CTO Needs Before Q3 2026',
    excerpt: 'From EU AI Act to RBI directives to enterprise customer requirements — here\'s the definitive checklist for CTOs who need to get AI governance right in 2026.',
    readTime: '10 min read',
    date: 'Jan 25, 2026',
    author: 'Strategy Team',
  },
];

const CATEGORIES = ['All', 'AI Governance', 'Technical', 'Compliance', 'Case Study', 'Strategy'];

function BlogCard({ post, index }) {
  const [ref, isVisible] = useReveal();
  return (
    <article
      ref={ref}
      className="blog-card"
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(24px)',
        transition: `all .55s var(--ease) ${(index % 3) * 0.1}s`,
      }}
    >
      <div className="blog-card-top">
        <span className="blog-category">{post.category}</span>
        <span className="blog-tag" style={{ color: post.tagColor, background: post.tagColor + '18' }}>
          {post.tag}
        </span>
      </div>
      <h3 className="blog-card-title">{post.title}</h3>
      <p className="blog-card-excerpt">{post.excerpt}</p>
      <div className="blog-card-footer">
        <span className="blog-meta">{post.date} · {post.readTime}</span>
        <a href="#" className="blog-read-more">
          Read article →
        </a>
      </div>
    </article>
  );
}

export default function BlogPage() {
  const [isContactOpen, setContactOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState('All');
  const [headerRef, headerVisible] = useReveal();

  const filtered = activeCategory === 'All'
    ? BLOG_POSTS
    : BLOG_POSTS.filter(p => p.category === activeCategory);

  return (
    <div style={{ background: 'var(--bg)', minHeight: '100vh', color: 'var(--text)' }}>
      <nav className="navbar navbar--scrolled" style={{ position: 'relative' }}>
        <div className="navbar-inner">
          <Link to="/" className="nav-logo">
            <DharvaLogo size={34} />
            <span className="nav-logo-text">DHARVA <span className="nav-logo-sub">AI</span></span>
          </Link>
          <div className="nav-cta">
            <Link to="/" className="btn btn-ghost nav-btn-sm">← Home</Link>
            <button className="btn btn-primary nav-btn-sm" onClick={() => setContactOpen(true)}>
              Connect in 5 minutes
            </button>
          </div>
        </div>
      </nav>

      {/* Header */}
      <section className="section" style={{ paddingTop: '5rem', paddingBottom: '3rem' }}>
        <div className="container">
          <div
            ref={headerRef}
            style={{
              opacity: headerVisible ? 1 : 0,
              transform: headerVisible ? 'translateY(0)' : 'translateY(24px)',
              transition: 'all .6s var(--ease)',
              maxWidth: 680,
            }}
          >
            <div className="section-label">Dharva Blog</div>
            <h1 className="section-title">
              AI Governance.<br />
              <span className="gradient-text">Explained for practitioners.</span>
            </h1>
            <p className="section-desc">
              Deep dives into hallucination detection, bias monitoring, compliance frameworks,
              and real-world AI governance case studies. Written by the team building Dharva.
            </p>
          </div>

          {/* Category filter */}
          <div className="blog-filters">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                className={`blog-filter-btn ${activeCategory === cat ? 'blog-filter-btn--active' : ''}`}
                onClick={() => setActiveCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Blog grid */}
      <section className="section" style={{ paddingTop: '2rem', background: 'var(--bg2)' }}>
        <div className="container">
          <div className="blog-grid">
            {filtered.map((post, i) => (
              <BlogCard key={post.id} post={post} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="section">
        <div className="container">
          <div className="blog-newsletter">
            <div>
              <h3>Stay ahead of AI regulation.</h3>
              <p>Weekly digest of AI governance news, framework updates, and technical deep dives. No fluff.</p>
            </div>
            <div className="blog-newsletter-form">
              <input
                type="email"
                placeholder="you@company.com"
                className="blog-email-input"
              />
              <button className="btn btn-primary">Subscribe</button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta-section">
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <h2>
            Ready to implement<br />
            <span className="gradient-text">what you just read?</span>
          </h2>
          <p>Connect your AI system and see Dharva in action. Takes 5 minutes.</p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap', marginTop: '2rem' }}>
            <button className="btn btn-primary" onClick={() => setContactOpen(true)} style={{ padding: '1rem 2.5rem', fontSize: '1rem' }}>
              Connect in 5 minutes
            </button>
            <Link to="/docs" className="btn btn-ghost" style={{ padding: '1rem 2.5rem', fontSize: '1rem' }}>
              Read the docs
            </Link>
          </div>
        </div>
      </section>

      <ContactModal isOpen={isContactOpen} onClose={() => setContactOpen(false)} />
    </div>
  );
}
