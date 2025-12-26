import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { name: 'Twitter', url: 'https://twitter.com/daosigner', icon: 'X' },
    { name: 'Instagram', url: 'https://instagram.com/daosignerapparel', icon: 'IG' },
    { name: 'TikTok', url: 'https://tiktok.com/@daosigner', icon: 'TT' },
    { name: 'Farcaster', url: 'https://warpcast.com/daosigner', icon: 'FC' },
  ];

  const footerLinks = {
    Shop: [
      { name: 'All Products', path: '/shop' },
      { name: 'T-Shirts', path: '/shop?category=tshirts' },
      { name: 'Hats', path: '/shop?category=hats' },
      { name: 'Crypto Collection', path: '/shop?category=crypto' },
    ],
    Company: [
      { name: 'About Us', path: '/about' },
      { name: 'Contact', path: '/contact' },
      { name: 'Design & Earn', path: '/about#design' },
    ],
    Support: [
      { name: 'FAQ', path: '/faq' },
      { name: 'Shipping', path: '/shipping' },
      { name: 'Returns', path: '/returns' },
    ],
  };

  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-grid">
          {/* Brand Section */}
          <div>
            <Link to="/" className="flex items-center gap-3 mb-6">
              <img
                src="/images/logo.png"
                alt="DAOsigner"
                className="h-12 w-auto"
              />
              <span className="text-2xl font-bold gradient-text">
                DAOsigner
              </span>
            </Link>
            <p className="text-gray-400 mb-6 max-w-sm">
              Design. Earn. Repeat. The first apparel brand that pays designers
              onchain for every single sale, forever.
            </p>
            <div className="social-icons">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-icon"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  title={social.name}
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
          </div>

          {/* Link Sections */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="text-lg font-semibold mb-4 text-white">{title}</h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.path}
                      className="text-gray-400 hover:text-purple-400 transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Newsletter */}
        <div className="mb-8 p-6 rounded-2xl glass-light text-center">
          <h4 className="text-xl font-semibold mb-2">Join the DAO</h4>
          <p className="text-gray-400 mb-4">
            Get early access to drops, exclusive designs, and community perks.
          </p>
          <form className="flex gap-3 max-w-md mx-auto" onSubmit={(e) => e.preventDefault()}>
            <input
              type="email"
              placeholder="Enter your email"
              className="form-input flex-1"
            />
            <button type="submit" className="btn-primary whitespace-nowrap">
              Subscribe
            </button>
          </form>
        </div>

        {/* Bottom Bar */}
        <div className="footer-bottom">
          <p>&copy; {currentYear} DAOsigner Apparel. All rights reserved.</p>
          <p className="mt-2 text-sm">
            Powered by the community, for the community.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
