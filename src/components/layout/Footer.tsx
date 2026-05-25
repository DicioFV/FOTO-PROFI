// src/components/layout/Footer.tsx
// CINEVISION AI — FOOTER COMPONENT

import { Link } from 'react-router-dom';
import { Globe, Video, MessageCircle, Mail } from 'lucide-react';

const footerLinks = {
  product: [
    { label: 'Estilos', href: '/styles' },
    { label: 'Planos', href: '/pricing' },
    { label: 'Galeria', href: '/gallery' },
    { label: 'API', href: '/api' },
  ],
  company: [
    { label: 'Sobre', href: '/about' },
    { label: 'Blog', href: '/blog' },
    { label: 'Carreiras', href: '/careers' },
    { label: 'Contato', href: '/contact' },
  ],
  legal: [
    { label: 'Termos de Uso', href: '/terms' },
    { label: 'Privacidade', href: '/privacy' },
    { label: 'Cookies', href: '/cookies' },
    { label: 'LGPD', href: '/lgpd' },
  ],
  support: [
    { label: 'Central de Ajuda', href: '/help' },
    { label: 'FAQ', href: '/faq' },
    { label: 'Status', href: '/status' },
    { label: 'Feedback', href: '/feedback' },
  ],
};

const socialLinks = [
  { icon: Globe, href: 'https://instagram.com/cinevisionai', label: 'Instagram' },
  { icon: Video, href: 'https://youtube.com/@cinevisionai', label: 'YouTube' },
  { icon: MessageCircle, href: 'https://twitter.com/cinevisionai', label: 'Twitter' },
];

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-white/10 bg-[#050507]">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-2 md:grid-cols-6 gap-8">
          {/* Brand */}
          <div className="col-span-2">
            <Link to="/" className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-yellow-400 flex items-center justify-center text-black font-bold text-lg">
                🎬
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">CineVision AI</h3>
                <p className="text-xs text-gray-500">Transform. Elevate. Cinematic.</p>
              </div>
            </Link>
            <p className="text-sm text-gray-500 mb-6 max-w-xs">
              Transforme qualquer selfie em uma foto cinematográfica profissional com IA. 
              Qualidade Hollywood em segundos.
            </p>
            {/* Social Links */}
            <div className="flex items-center gap-3">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:border-amber-500/30 hover:bg-amber-500/10 transition-all"
                    aria-label={social.label}
                  >
                    <Icon className="w-5 h-5" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-sm font-semibold text-white mb-4">Produto</h4>
            <ul className="space-y-3">
              {footerLinks.product.map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="text-sm text-gray-500 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-white mb-4">Empresa</h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="text-sm text-gray-500 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-white mb-4">Legal</h4>
            <ul className="space-y-3">
              {footerLinks.legal.map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="text-sm text-gray-500 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-white mb-4">Suporte</h4>
            <ul className="space-y-3">
              {footerLinks.support.map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="text-sm text-gray-500 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-sm text-gray-500">
              © {currentYear} CineVision AI. Todos os direitos reservados.
            </p>
            <div className="flex items-center gap-4 text-sm text-gray-500">
              <a 
                href="mailto:hello@cinevision.ai"
                className="flex items-center gap-2 hover:text-white transition-colors"
              >
                <Mail className="w-4 h-4" />
                hello@cinevision.ai
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
