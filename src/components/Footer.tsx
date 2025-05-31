import React from 'react';
import { Facebook, Twitter, Instagram, Linkedin, Github } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-epystemy-black py-12 border-t border-epystemy-shadow">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="text-xl font-serif font-bold mb-4">Epystemy</h3>
            <p className="text-epystemy-gray mb-4">
              Elevamos sua presença digital ao nível da arte.
            </p>
            <p className="text-epystemy-gray">
              contato@epystemy.com.br
            </p>
          </div>
          
          <div>
            <h3 className="text-xl font-serif font-bold mb-4">Links</h3>
            <ul className="space-y-2">
              <li><a href="#home" className="text-epystemy-gray hover:text-epystemy-white transition-colors">Home</a></li>
              <li><a href="#about" className="text-epystemy-gray hover:text-epystemy-white transition-colors">Sobre</a></li>
              <li><a href="#services" className="text-epystemy-gray hover:text-epystemy-white transition-colors">Serviços</a></li>
              <li><a href="#portfolio" className="text-epystemy-gray hover:text-epystemy-white transition-colors">Portfólio</a></li>
              <li><a href="#contact" className="text-epystemy-gray hover:text-epystemy-white transition-colors">Contato</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-xl font-serif font-bold mb-4">Social</h3>
            <div className="flex space-x-4">
              <a href="#" className="text-epystemy-gray hover:text-epystemy-white transition-colors" aria-label="Facebook">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-epystemy-gray hover:text-epystemy-white transition-colors" aria-label="Twitter">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-epystemy-gray hover:text-epystemy-white transition-colors" aria-label="Instagram">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-epystemy-gray hover:text-epystemy-white transition-colors" aria-label="LinkedIn">
                <Linkedin size={20} />
              </a>
              <a href="#" className="text-epystemy-gray hover:text-epystemy-white transition-colors" aria-label="GitHub">
                <Github size={20} />
              </a>
            </div>
          </div>
        </div>
        
        <div className="text-center pt-8 border-t border-epystemy-shadow">
          <p className="text-epystemy-gray text-sm">
            © 2025 Epystemy. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;