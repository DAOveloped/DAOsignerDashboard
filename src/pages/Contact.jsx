import { useState } from 'react';
import { motion } from 'framer-motion';
import AnimatedBackground from '../components/AnimatedBackground';
import ScrollReveal from '../components/ScrollReveal';
import Footer from '../components/Footer';

const socialLinks = [
  { name: 'Twitter / X', handle: '@daosigner', url: 'https://twitter.com/daosigner', icon: 'X' },
  { name: 'Instagram', handle: '@daosignerapparel', url: 'https://instagram.com/daosignerapparel', icon: 'IG' },
  { name: 'Farcaster', handle: '@daosigner', url: 'https://warpcast.com/daosigner', icon: 'FC' },
  { name: 'TikTok', handle: '@daosigner', url: 'https://tiktok.com/@daosigner', icon: 'TT' },
  { name: 'Bluesky', handle: '@daosigner', url: 'https://bsky.app/profile/daosigner', icon: 'BS' },
  { name: 'Threads', handle: '@daosigner', url: 'https://threads.net/@daosigner', icon: 'TH' },
];

const contactReasons = [
  { value: '', label: 'Select a reason...' },
  { value: 'order', label: 'Order Inquiry' },
  { value: 'design', label: 'Design Submission' },
  { value: 'collab', label: 'Collaboration' },
  { value: 'support', label: 'Customer Support' },
  { value: 'press', label: 'Press / Media' },
  { value: 'other', label: 'Other' },
];

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    reason: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission - replace with actual API call
    await new Promise(resolve => setTimeout(resolve, 1500));

    setSubmitStatus('success');
    setIsSubmitting(false);
    setFormData({ name: '', email: '', reason: '', message: '' });

    // Reset status after 5 seconds
    setTimeout(() => setSubmitStatus(null), 5000);
  };

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <div className="relative min-h-screen">
      <AnimatedBackground />

      {/* Hero Section */}
      <section className="pt-32 pb-16">
        <div className="container mx-auto px-6">
          <ScrollReveal>
            <div className="text-center max-w-3xl mx-auto">
              <h1 className="text-5xl md:text-6xl font-bold mb-6">
                <span className="text-white">Let's </span>
                <span className="gradient-text">Connect</span>
              </h1>
              <p className="text-xl text-gray-400">
                Have a question, design submission, or just want to say gm?
                We'd love to hear from you.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* Contact Form */}
            <ScrollReveal direction="left">
              <div className="card">
                <h2 className="text-2xl font-bold text-white mb-6">Send us a message</h2>

                {submitStatus === 'success' && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-6 p-4 rounded-lg bg-green-500/20 border border-green-500/30 text-green-400"
                  >
                    Thanks for reaching out! We'll get back to you soon.
                  </motion.div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="form-group">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="form-input"
                      placeholder="Your name"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="form-input"
                      placeholder="you@example.com"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="reason" className="form-label">Reason for Contact</label>
                    <select
                      id="reason"
                      name="reason"
                      value={formData.reason}
                      onChange={handleChange}
                      required
                      className="form-input"
                    >
                      {contactReasons.map(option => (
                        <option key={option.value} value={option.value} className="bg-gray-900">
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="form-group">
                    <label htmlFor="message" className="form-label">Message</label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      className="form-textarea"
                      placeholder="Tell us what's on your mind..."
                      rows={5}
                    />
                  </div>

                  <motion.button
                    type="submit"
                    className="btn-primary w-full"
                    disabled={isSubmitting}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {isSubmitting ? (
                      <span className="flex items-center justify-center gap-2">
                        <svg className="animate-spin w-5 h-5" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                        </svg>
                        Sending...
                      </span>
                    ) : (
                      'Send Message'
                    )}
                  </motion.button>
                </form>
              </div>
            </ScrollReveal>

            {/* Contact Info & Socials */}
            <div className="space-y-8">
              <ScrollReveal direction="right">
                <div className="card">
                  <h2 className="text-2xl font-bold text-white mb-6">Connect with us</h2>
                  <p className="text-gray-400 mb-8">
                    The fastest way to reach us is through our social channels.
                    We're most active on Twitter/X and always happy to chat.
                  </p>

                  <div className="grid grid-cols-2 gap-4">
                    {socialLinks.map((social) => (
                      <motion.a
                        key={social.name}
                        href={social.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 p-4 rounded-xl bg-purple-500/10 border border-purple-500/20 hover:border-purple-500/50 transition-all"
                        whileHover={{ scale: 1.02, y: -2 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <span className="w-10 h-10 rounded-full bg-purple-500/20 flex items-center justify-center text-purple-400 font-bold">
                          {social.icon}
                        </span>
                        <div>
                          <p className="font-semibold text-white text-sm">{social.name}</p>
                          <p className="text-gray-400 text-xs">{social.handle}</p>
                        </div>
                      </motion.a>
                    ))}
                  </div>
                </div>
              </ScrollReveal>

              <ScrollReveal direction="right" delay={0.2}>
                <div className="card">
                  <h3 className="text-xl font-bold text-white mb-4">Design Submissions</h3>
                  <p className="text-gray-400 mb-4">
                    Want to become a DAOsigner designer and earn royalties on your work?
                    Submit your portfolio through our Twitter DMs or use the form.
                  </p>
                  <a
                    href="https://twitter.com/daosigner"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-secondary inline-flex"
                  >
                    DM us on Twitter
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                </div>
              </ScrollReveal>

              <ScrollReveal direction="right" delay={0.3}>
                <div className="card bg-gradient-to-br from-purple-900/30 to-cyan-900/20">
                  <div className="text-4xl mb-4">📍</div>
                  <h3 className="text-xl font-bold text-white mb-2">Based in Texas</h3>
                  <p className="text-gray-400">
                    Operating globally, rooted in the Lone Star State.
                    Shipping worldwide through our print-on-demand partners.
                  </p>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24">
        <div className="container mx-auto px-6">
          <ScrollReveal>
            <div className="section-header">
              <h2 className="gradient-text">Quick Answers</h2>
              <p>Common questions we get asked</p>
            </div>
          </ScrollReveal>

          <div className="max-w-3xl mx-auto space-y-4">
            {[
              {
                q: 'How long does shipping take?',
                a: 'Most orders ship within 2-5 business days. Delivery typically takes 5-10 business days depending on your location.'
              },
              {
                q: 'Do you ship internationally?',
                a: 'Yes! We ship worldwide through our print-on-demand partners. International shipping times vary by destination.'
              },
              {
                q: 'What is your return policy?',
                a: "If there's an issue with your order (wrong size, print defect, etc.), we'll make it right. Contact us within 30 days of delivery."
              },
              {
                q: 'Can I track my order?',
                a: "You'll receive a tracking number via email once your order ships. You can use this to track your package."
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
      </section>

      <Footer />
    </div>
  );
}
