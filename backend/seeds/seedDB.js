require('dotenv').config();
const mongoose = require('mongoose');
const connectDB = require('../config/db');

// Models
const Product = require('../models/Product');
const Launch = require('../models/Launch');
const Doc = require('../models/Doc');
const Pricing = require('../models/Pricing');

// ═══════════════════════════════════════════
// SEED DATA
// ═══════════════════════════════════════════

const products = [
  {
    name: 'Dharva Foundation Models',
    tagline: 'State-of-the-art LLMs for every use case',
    description:
      'State-of-the-art LLMs trained on curated multilingual datasets. Available in 7B, 32B, and 70B parameter variants with industry-leading benchmark scores across reasoning, code generation, and creative tasks.',
    icon: '🧠',
    iconBg: 'rgba(0,229,200,.1)',
    status: 'live',
    features: [
      { title: 'Multi-size Models', description: '7B, 32B, and 70B parameter variants' },
      { title: 'Multilingual', description: 'Trained on 50+ languages with native fluency' },
      { title: 'Context Window', description: 'Up to 128K tokens context length' },
      { title: 'Fine-Tuning', description: 'LoRA and full fine-tuning supported' },
    ],
    techStack: ['Transformer', 'PyTorch', 'CUDA', 'TensorRT'],
    order: 1,
  },
  {
    name: 'Dharva Vision',
    tagline: 'See the world through AI eyes',
    description:
      'Multimodal vision-language models for image understanding, document analysis, OCR, and visual question answering at production scale. Supports real-time video streams.',
    icon: '👁️',
    iconBg: 'rgba(139,92,246,.1)',
    status: 'live',
    features: [
      { title: 'Image Analysis', description: 'Object detection, segmentation, classification' },
      { title: 'Document OCR', description: 'Extract text from any document format' },
      { title: 'Visual QA', description: 'Answer questions about images naturally' },
      { title: 'Video Processing', description: 'Real-time video stream analysis' },
    ],
    techStack: ['Vision Transformer', 'CLIP', 'SAM', 'ONNX'],
    order: 2,
  },
  {
    name: 'Dharva Voice',
    tagline: 'Human-quality speech AI',
    description:
      'Real-time speech recognition & synthesis engine with support for 50+ languages, speaker diarization, and emotion-aware text-to-speech generation.',
    icon: '🎙️',
    iconBg: 'rgba(59,130,246,.1)',
    status: 'beta',
    features: [
      { title: 'Speech-to-Text', description: 'Real-time transcription in 50+ languages' },
      { title: 'Text-to-Speech', description: 'Natural, emotion-aware voice synthesis' },
      { title: 'Speaker ID', description: 'Diarization and speaker identification' },
      { title: 'Voice Cloning', description: 'Clone voices with just 10 seconds of audio' },
    ],
    techStack: ['Whisper', 'WaveNet', 'Tacotron', 'WebRTC'],
    order: 3,
  },
  {
    name: 'Dharva Agents',
    tagline: 'Autonomous AI that gets things done',
    description:
      'Autonomous AI agents that can browse, code, plan, and execute multi-step tasks. Built-in tool use, persistent memory, and enterprise-grade safety guardrails.',
    icon: '🤖',
    iconBg: 'rgba(245,158,11,.1)',
    status: 'beta',
    features: [
      { title: 'Tool Use', description: 'Web browsing, code execution, API calls' },
      { title: 'Planning', description: 'Multi-step task decomposition and execution' },
      { title: 'Memory', description: 'Long-term memory across sessions' },
      { title: 'Safety', description: 'Built-in guardrails and human-in-the-loop' },
    ],
    techStack: ['ReAct', 'LangGraph', 'Playwright', 'Redis'],
    order: 4,
  },
  {
    name: 'Dharva Edge',
    tagline: 'AI at the speed of thought, everywhere',
    description:
      'Optimized models for on-device inference. Run AI on mobile, IoT, and embedded systems with <50ms latency and minimal memory footprint.',
    icon: '⚡',
    iconBg: 'rgba(244,63,94,.1)',
    status: 'coming-soon',
    features: [
      { title: 'Mobile SDK', description: 'iOS and Android native SDKs' },
      { title: 'Quantization', description: 'INT4/INT8 quantization toolkit' },
      { title: 'Edge Runtime', description: 'Custom inference engine for ARM/x86' },
      { title: 'Offline Mode', description: 'Full functionality without internet' },
    ],
    techStack: ['ONNX', 'TensorRT', 'Core ML', 'TFLite'],
    order: 5,
  },
  {
    name: 'Dharva Guard',
    tagline: 'Responsible AI, by default',
    description:
      'AI safety & compliance toolkit. Content moderation, PII detection, bias auditing, and regulatory compliance monitoring in real-time.',
    icon: '🔐',
    iconBg: 'rgba(34,197,94,.1)',
    status: 'alpha',
    features: [
      { title: 'Content Moderation', description: 'Real-time harmful content detection' },
      { title: 'PII Detection', description: 'Identify and redact personal information' },
      { title: 'Bias Auditing', description: 'Continuous fairness monitoring' },
      { title: 'Compliance', description: 'EU AI Act, NIST framework reports' },
    ],
    techStack: ['Classifier', 'NER', 'Regex Engine', 'Report Gen'],
    order: 6,
  },
];

const launches = [
  {
    title: 'Dharva Vision 3.0',
    description:
      'Next-generation multimodal model with video understanding, 3D scene analysis, and real-time visual reasoning. 4x faster than v2 with superior accuracy on all benchmarks.',
    icon: '🚀',
    launchDate: 'April 2026',
    expectedDate: new Date('2026-04-15'),
    features: ['Video Analysis', '3D Understanding', 'Real-time Streaming', 'Medical Imaging'],
    status: 'in-development',
    order: 1,
  },
  {
    title: 'Dharva Foundation v5 — "Meridian"',
    description:
      'Our most advanced foundation model. 200B parameters with mixture-of-experts architecture, 256K context window, and native multilingual reasoning across 90+ languages.',
    icon: '🧠',
    launchDate: 'June 2026',
    expectedDate: new Date('2026-06-01'),
    features: ['200B MoE', '256K Context', '90+ Languages', 'Code Generation'],
    status: 'in-development',
    order: 2,
  },
  {
    title: 'Dharva Edge Runtime',
    description:
      'Run optimized Dharva models locally on mobile devices, Raspberry Pi, and embedded hardware. Includes model compression toolkit with INT4 quantization and ONNX export.',
    icon: '⚡',
    launchDate: 'August 2026',
    expectedDate: new Date('2026-08-01'),
    features: ['Mobile SDK', 'INT4 Quantization', 'ONNX Export', 'Offline Mode'],
    status: 'announced',
    order: 3,
  },
  {
    title: 'Dharva Agents Platform v2',
    description:
      'Multi-agent orchestration framework with persistent memory, tool creation, inter-agent communication, and enterprise workflow automation.',
    icon: '🤖',
    launchDate: 'October 2026',
    expectedDate: new Date('2026-10-01'),
    features: ['Multi-Agent', 'Persistent Memory', 'Tool Creation', 'Workflow Builder'],
    status: 'announced',
    order: 4,
  },
  {
    title: 'Dharva Guard Enterprise Suite',
    description:
      'Complete AI governance platform. Automated red-teaming, continuous bias monitoring, and regulatory report generation for EU AI Act and NIST framework.',
    icon: '🔐',
    launchDate: 'Q4 2026',
    expectedDate: new Date('2026-11-01'),
    features: ['Red-Teaming', 'EU AI Act', 'Bias Monitoring', 'NIST Framework'],
    status: 'announced',
    order: 5,
  },
  {
    title: 'Dharva Voice Studio',
    description:
      'Full-stack conversational AI platform. Real-time voice cloning, emotion-adaptive synthesis, simultaneous translation, and enterprise call center integration.',
    icon: '🎙️',
    launchDate: 'Q1 2027',
    expectedDate: new Date('2027-01-15'),
    features: ['Voice Cloning', 'Emotion AI', 'Live Translation', 'Call Center API'],
    status: 'announced',
    order: 6,
  },
];

const docs = [
  {
    title: 'Quick Start Guide',
    description: 'Get your first API call running in under 5 minutes. Covers authentication, SDK setup, and basic inference.',
    icon: '📖',
    category: 'quickstart',
    readTime: '5 min read',
    order: 1,
  },
  {
    title: 'API Reference',
    description: 'Complete REST API documentation with request/response schemas, error codes, rate limits, and code examples in 6 languages.',
    icon: '🔗',
    category: 'api-reference',
    readTime: 'Full reference',
    order: 2,
  },
  {
    title: 'Python SDK',
    description: 'Idiomatic Python client with async support, streaming, retry logic, and type hints. Available on PyPI.',
    icon: '🐍',
    category: 'sdk',
    readTime: '10 min setup',
    order: 3,
  },
  {
    title: 'Node.js SDK',
    description: 'TypeScript-first SDK with full type safety, streaming support, and built-in error handling for Node & Deno.',
    icon: '📦',
    category: 'sdk',
    readTime: '10 min setup',
    order: 4,
  },
  {
    title: 'Tutorials & Guides',
    description: 'Step-by-step tutorials for common use cases: chatbots, RAG pipelines, document processing, and more.',
    icon: '🎓',
    category: 'tutorial',
    readTime: '15+ tutorials',
    order: 5,
  },
  {
    title: 'Architecture Guide',
    description: 'Best practices for building production AI systems. Covers scaling, caching, failover, and cost optimization.',
    icon: '🏗️',
    category: 'architecture',
    readTime: '20 min read',
    order: 6,
  },
  {
    title: 'Fine-Tuning Cookbook',
    description: 'Data preparation, training strategies, evaluation frameworks, and deployment workflows for custom models.',
    icon: '🔧',
    category: 'cookbook',
    readTime: '25 min read',
    order: 7,
  },
  {
    title: 'Security & Compliance',
    description: 'Security architecture, data handling policies, compliance certifications, and enterprise deployment guides.',
    icon: '🛡️',
    category: 'security',
    readTime: '15 min read',
    order: 8,
  },
];

const pricing = [
  {
    name: 'Developer',
    description: 'For individuals & prototyping',
    price: 'Free',
    period: '',
    features: [
      '10K API calls / month',
      'All foundation models',
      'Community support',
      'Basic analytics dashboard',
      'Python & Node.js SDKs',
    ],
    isFeatured: false,
    ctaText: 'Start Free',
    order: 1,
  },
  {
    name: 'Pro',
    description: 'For teams & production apps',
    price: '$99',
    period: '/mo',
    features: [
      '500K API calls / month',
      'Fine-tuning access',
      'Priority support (4hr SLA)',
      'Advanced analytics & monitoring',
      'Custom model deployment',
      'Team management (5 seats)',
    ],
    isFeatured: true,
    ctaText: 'Get Started',
    order: 2,
  },
  {
    name: 'Enterprise',
    description: 'For large-scale deployments',
    price: 'Custom',
    period: '',
    features: [
      'Unlimited API calls',
      'Dedicated infrastructure',
      '24/7 dedicated support',
      'VPC peering & data residency',
      'Custom SLAs & contracts',
      'On-premise deployment',
    ],
    isFeatured: false,
    ctaText: 'Contact Sales',
    order: 3,
  },
];

// ═══════════════════════════════════════════
// SEED FUNCTION
// ═══════════════════════════════════════════

const seedDB = async () => {
  try {
    await connectDB();

    // Clear existing data
    console.log('🗑️  Clearing existing data...');
    await Product.deleteMany();
    await Launch.deleteMany();
    await Doc.deleteMany();
    await Pricing.deleteMany();

    // Seed
    console.log('🌱 Seeding Products...');
    const createdProducts = await Product.insertMany(products);
    console.log(`   ✅ ${createdProducts.length} products created`);

    console.log('🌱 Seeding Launches...');
    const createdLaunches = await Launch.insertMany(launches);
    console.log(`   ✅ ${createdLaunches.length} launches created`);

    console.log('🌱 Seeding Docs...');
    const createdDocs = await Doc.insertMany(docs);
    console.log(`   ✅ ${createdDocs.length} docs created`);

    console.log('🌱 Seeding Pricing...');
    const createdPricing = await Pricing.insertMany(pricing);
    console.log(`   ✅ ${createdPricing.length} pricing plans created`);

    console.log('\n\x1b[32m✨ Database seeded successfully!\x1b[0m\n');
    process.exit(0);
  } catch (error) {
    console.error(`\x1b[31m✖ Seed Error: ${error.message}\x1b[0m`);
    process.exit(1);
  }
};

seedDB();
