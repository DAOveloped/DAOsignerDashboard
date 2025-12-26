import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import AnimatedBackground from '../components/AnimatedBackground';
import ScrollReveal from '../components/ScrollReveal';
import ParallaxSection from '../components/ParallaxSection';
import Footer from '../components/Footer';

const values = [
  {
    icon: '🔗',
    title: 'Onchain Payments',
    description: 'Every royalty is paid onchain. Verifiable, transparent, and permanent. No trust required.'
  },
  {
    icon: '🎨',
    title: 'Creator First',
    description: 'Designers earn royalties on every sale, forever. Your creativity deserves ongoing rewards.'
  },
  {
    icon: '♻️',
    title: 'Sustainable Production',
    description: 'Print-on-demand means zero waste. We only produce what you order, when you order it.'
  },
  {
    icon: '⚡',
    title: 'Quality Obsessed',
    description: 'Premium materials, exceptional print quality, and attention to every detail.'
  }
];

const processSteps = [
  {
    step: '01',
    title: 'Connect Wallet',
    description: 'Link your wallet to your designer account. This is where your royalties will be paid.'
  },
  {
    step: '02',
    title: 'Submit Design',
    description: 'Upload your artwork. Our team reviews for quality and brand fit.'
  },
  {
    step: '03',
    title: 'Go Live',
    description: 'Once approved, your design is minted onchain and goes live in our store.'
  },
  {
    step: '04',
    title: 'Earn Forever',
    description: 'Every sale triggers automatic royalty payment after the 30-day refund window.'
  }
];

const team = [
  { name: 'The Visionary', role: 'Founder', emoji: '🧠' },
  { name: 'The Artist', role: 'Lead Designer', emoji: '🎨' },
  { name: 'The Builder', role: 'Tech Lead', emoji: '⚙️' },
  { name: 'The Community', role: 'You', emoji: '🤝' },
];

export default function About() {
  return (
    <div className="relative min-h-screen">
      <AnimatedBackground />

      {/* Hero Section */}
      <section className="pt-32 pb-20 relative overflow-hidden">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <ScrollReveal direction="left">
              <div>
                <motion.span
                  className="text-purple-400 font-semibold text-sm uppercase tracking-wider"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  Our Mission
                </motion.span>
                <h1 className="text-5xl md:text-6xl font-bold mt-4 mb-6">
                  <span className="text-white">Design.</span>
                  <span className="gradient-text"> Earn.</span>
                  <span className="text-white block">Repeat.</span>
                </h1>
                <p className="text-xl text-gray-400 leading-relaxed mb-8">
                  DAOsigner Apparel was built on one radical idea: pay designers onchain
                  for every single sale, forever. No middlemen skimming profits. No
                  "we'll pay you eventually." Just verifiable, trustless, guaranteed payments
                  recorded permanently on the blockchain.
                </p>
                <div className="flex flex-wrap gap-4">
                  <a
                    href="https://twitter.com/daosigner"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary"
                  >
                    Apply to Design
                  </a>
                  <Link to="/shop" className="btn-secondary">
                    Browse Collection
                  </Link>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal direction="right">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-cyan-500/20 blur-3xl -z-10" />
                <img
                  src="/images/logo.png"
                  alt="DAOsigner Logo"
                  className="w-full max-w-md mx-auto"
                />
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Mission Statement */}
      <section className="py-20 glass">
        <div className="container mx-auto px-6">
          <ScrollReveal>
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                The First Apparel Brand with <span className="gradient-text">Onchain Royalties</span>
              </h2>
              <p className="text-xl text-gray-400 leading-relaxed">
                Other platforms promise to pay creators. We prove it. Every royalty payment
                is recorded onchain - you can verify it yourself, anytime. Our smart contracts
                automatically calculate and distribute payments after each sale clears its
                refund window. No human intervention. No excuses. Just math.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Why Onchain Section */}
      <section className="py-24">
        <div className="container mx-auto px-6">
          <ScrollReveal>
            <div className="section-header">
              <h2 className="gradient-text">Why Onchain?</h2>
              <p>Because trust should be verified, not assumed</p>
            </div>
          </ScrollReveal>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <ScrollReveal delay={0.1}>
              <div className="card h-full">
                <h3 className="text-2xl font-bold text-white mb-4">Traditional Platforms</h3>
                <ul className="space-y-3 text-gray-400">
                  <li className="flex items-start gap-2">
                    <span className="text-red-400 mt-1">✗</span>
                    <span>Trust us to track your sales</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-400 mt-1">✗</span>
                    <span>Trust us to calculate royalties correctly</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-400 mt-1">✗</span>
                    <span>Trust us to actually pay you</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-400 mt-1">✗</span>
                    <span>No way to verify anything</span>
                  </li>
                </ul>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.2}>
              <div className="card h-full border-purple-500/50">
                <h3 className="text-2xl font-bold gradient-text mb-4">DAOsigner</h3>
                <ul className="space-y-3 text-gray-400">
                  <li className="flex items-start gap-2">
                    <span className="text-green-400 mt-1">✓</span>
                    <span>Sales tracked onchain - verify yourself</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-400 mt-1">✓</span>
                    <span>Smart contract calculates royalties</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-400 mt-1">✓</span>
                    <span>Automatic payments - no human needed</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-400 mt-1">✓</span>
                    <span>Every transaction publicly verifiable</span>
                  </li>
                </ul>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-24 glass">
        <div className="container mx-auto px-6">
          <ScrollReveal>
            <div className="section-header">
              <h2 className="gradient-text">Our Values</h2>
              <p>The principles that guide everything we do</p>
            </div>
          </ScrollReveal>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <ScrollReveal key={value.title} delay={index * 0.1}>
                <motion.div
                  className="card h-full"
                  whileHover={{ y: -8 }}
                >
                  <div className="text-4xl mb-4">{value.icon}</div>
                  <h3 className="text-xl font-bold text-white mb-3">{value.title}</h3>
                  <p className="text-gray-400">{value.description}</p>
                </motion.div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works - Designer Program */}
      <section id="design" className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-purple-900/10 to-transparent" />

        <ParallaxSection speed={0.2}>
          <div className="container mx-auto px-6 relative z-10">
            <ScrollReveal>
              <div className="section-header">
                <span className="text-purple-400 font-semibold text-sm uppercase tracking-wider">
                  Designer Program
                </span>
                <h2 className="text-white mt-2">
                  How It <span className="gradient-text">Works</span>
                </h2>
                <p>From design to onchain royalties</p>
              </div>
            </ScrollReveal>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {processSteps.map((step, index) => (
                <ScrollReveal key={step.step} delay={index * 0.15}>
                  <motion.div
                    className="relative"
                    whileHover={{ scale: 1.02 }}
                  >
                    {/* Connector line */}
                    {index < processSteps.length - 1 && (
                      <div className="hidden lg:block absolute top-12 left-full w-full h-0.5 bg-gradient-to-r from-purple-500 to-transparent -z-10" />
                    )}

                    <div className="card text-center">
                      <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-purple-500 to-cyan-500 flex items-center justify-center">
                        <span className="text-2xl font-bold text-white">{step.step}</span>
                      </div>
                      <h3 className="text-xl font-bold text-white mb-3">{step.title}</h3>
                      <p className="text-gray-400 text-sm">{step.description}</p>
                    </div>
                  </motion.div>
                </ScrollReveal>
              ))}
            </div>

            {/* CTA */}
            <ScrollReveal delay={0.5}>
              <div className="text-center mt-12">
                <p className="text-gray-400 mb-6">
                  Ready to earn verifiable royalties on your designs?
                </p>
                <a
                  href="https://twitter.com/daosigner"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary text-lg px-8 py-4"
                >
                  Apply to Design
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </a>
              </div>
            </ScrollReveal>
          </div>
        </ParallaxSection>
      </section>

      {/* 30-Day Refund Window Explanation */}
      <section className="py-24">
        <div className="container mx-auto px-6">
          <ScrollReveal>
            <div className="max-w-3xl mx-auto">
              <div className="card">
                <h3 className="text-2xl font-bold text-white mb-4">Why the 30-Day Wait?</h3>
                <p className="text-gray-400 mb-4">
                  We wait 30 days after each sale before paying royalties. Here's why:
                </p>
                <ul className="space-y-3 text-gray-400">
                  <li className="flex items-start gap-3">
                    <span className="text-purple-400 font-bold">1.</span>
                    <span><strong className="text-white">Refunds happen.</strong> If a customer returns their order, we don't want to claw back your earnings.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-purple-400 font-bold">2.</span>
                    <span><strong className="text-white">Chargebacks exist.</strong> Credit card disputes can take weeks to resolve.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-purple-400 font-bold">3.</span>
                    <span><strong className="text-white">Clean accounting.</strong> Once we pay you, it's final. We'd rather wait than create messy reconciliation.</span>
                  </li>
                </ul>
                <p className="text-gray-400 mt-4">
                  After 30 days, the smart contract automatically releases your royalty. No action needed from you.
                </p>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-24 glass">
        <div className="container mx-auto px-6">
          <ScrollReveal>
            <div className="section-header">
              <h2 className="text-white">
                The <span className="gradient-text">Team</span>
              </h2>
              <p>The humans (and community) behind DAOsigner</p>
            </div>
          </ScrollReveal>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {team.map((member, index) => (
              <ScrollReveal key={member.name} delay={index * 0.1}>
                <motion.div
                  className="card text-center"
                  whileHover={{ y: -8, rotateY: 5 }}
                >
                  <div className="text-6xl mb-4">{member.emoji}</div>
                  <h3 className="text-xl font-bold text-white mb-1">{member.name}</h3>
                  <p className="text-purple-400">{member.role}</p>
                </motion.div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Preview */}
      <section className="py-24">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto">
            <ScrollReveal>
              <div className="section-header">
                <h2 className="gradient-text">Common Questions</h2>
              </div>
            </ScrollReveal>

            <div className="space-y-4">
              {[
                {
                  q: 'What percentage royalty do designers earn?',
                  a: 'Designers earn a competitive percentage of every sale. The exact rate depends on your agreement with us, but it\'s always paid onchain and verifiable.'
                },
                {
                  q: 'What blockchain do you use for payments?',
                  a: 'We use Base (Ethereum L2) for fast, low-cost transactions. You\'ll need a wallet that supports Base to receive payments.'
                },
                {
                  q: 'Can I verify my royalty payments?',
                  a: 'Yes! That\'s the whole point. Every payment is recorded onchain. You can view your transaction history anytime using any block explorer.'
                },
                {
                  q: 'What kind of designs do you accept?',
                  a: 'We accept a wide range of designs - from lifestyle and humor to nature and adventure themes. Quality and originality are what matter most.'
                },
              ].map((faq, index) => (
                <ScrollReveal key={index} delay={index * 0.1}>
                  <motion.div
                    className="card"
                    whileHover={{ scale: 1.01 }}
                  >
                    <h4 className="text-lg font-semibold text-white mb-2">{faq.q}</h4>
                    <p className="text-gray-400">{faq.a}</p>
                  </motion.div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 glass">
        <div className="container mx-auto px-6">
          <ScrollReveal>
            <div className="text-center">
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                Ready to Earn <span className="gradient-text">Onchain?</span>
              </h2>
              <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-10">
                Join the first apparel brand that proves it pays designers.
                Every sale. Every time. Verifiable forever.
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <a
                  href="https://twitter.com/daosigner"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary text-lg px-10 py-4"
                >
                  Apply to Design
                </a>
                <Link to="/shop" className="btn-secondary text-lg px-10 py-4">
                  Shop Collection
                </Link>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <Footer />
    </div>
  );
}
