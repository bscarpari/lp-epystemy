import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import emailjs from '@emailjs/browser';

// EmailJS configuration
const EMAILJS_CONFIG = {
  serviceId: import.meta.env.VITE_EMAILJS_SERVICE_ID || '',
  templateId: import.meta.env.VITE_EMAILJS_TEMPLATE_ID || '',
  publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY || '',
};

const WireframeSculpture = () => {
  return (
    <mesh rotation={[0, Math.PI / 4, 0]}>
      <torusKnotGeometry args={[1, 0.3, 128, 16]} />
      <meshStandardMaterial color="#ffffff" wireframe={true} />
    </mesh>
  );
};

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const lastSubmissionTime = useRef<number>(0);
  const formRef = useRef<HTMLFormElement>(null);
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate EmailJS configuration
    if (!EMAILJS_CONFIG.serviceId || !EMAILJS_CONFIG.templateId || !EMAILJS_CONFIG.publicKey) {
      setStatus('error');
      setErrorMessage('Configuração de email não encontrada. Por favor, entre em contato com o administrador.');
      return;
    }
    
    // Rate limiting check (1 submission per minute)
    const now = Date.now();
    if (now - lastSubmissionTime.current < 60000) {
      setStatus('error');
      setErrorMessage('Por favor, aguarde 1 minuto antes de enviar outra mensagem.');
      return;
    }

    setStatus('loading');
    setErrorMessage('');

    try {
      if (!formRef.current) return;

      const result = await emailjs.sendForm(
        EMAILJS_CONFIG.serviceId,
        EMAILJS_CONFIG.templateId,
        formRef.current,
        EMAILJS_CONFIG.publicKey
      );

      if (result.status === 200) {
        setStatus('success');
        setFormData({ name: '', email: '', message: '' });
        lastSubmissionTime.current = now;
      } else {
        throw new Error('Falha ao enviar email');
      }
    } catch (error) {
      console.error('EmailJS error:', error);
      setStatus('error');
      setErrorMessage('Ocorreu um erro ao enviar a mensagem. Por favor, tente novamente mais tarde.');
    }
  };

  return (
    <section id="contact" className="py-20 bg-epystemy-black">
      <div className="container mx-auto px-4">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-serif font-bold mb-6">
            Fale Conosco
          </h2>
          <p className="text-lg text-epystemy-gray max-w-2xl mx-auto">
            Estamos prontos para transformar sua visão em realidade digital.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.8 }}
          >
            <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-2">
                  Nome
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-transparent border border-epystemy-shadow rounded-none focus:outline-none focus:ring-1 focus:ring-epystemy-white transition-all"
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-2">
                  E-mail
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-transparent border border-epystemy-shadow rounded-none focus:outline-none focus:ring-1 focus:ring-epystemy-white transition-all"
                />
              </div>
              
              <div>
                <label htmlFor="message" className="block text-sm font-medium mb-2">
                  Mensagem
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="w-full px-4 py-3 bg-transparent border border-epystemy-shadow rounded-none focus:outline-none focus:ring-1 focus:ring-epystemy-white transition-all"
                ></textarea>
              </div>

              {status === 'error' && (
                <div className="text-red-500 text-sm">
                  {errorMessage}
                </div>
              )}
              
              <div>
                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className={`neon-button w-full px-8 py-3 bg-transparent border border-epystemy-white text-lg font-medium hover:border-epystemy-gray transition-all ${
                    status === 'loading' ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                >
                  {status === 'loading' ? 'Enviando...' : 'Enviar'}
                </button>
              </div>

              {status === 'success' && (
                <div className="text-green-500 text-sm">
                  Mensagem enviada com sucesso!
                </div>
              )}
            </form>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.8 }}
            className="h-[400px]"
          >
            <Canvas>
              <ambientLight intensity={0.5} />
              <pointLight position={[10, 10, 10]} />
              <WireframeSculpture />
              <OrbitControls 
                enableZoom={false} 
                autoRotate 
                autoRotateSpeed={2}
              />
            </Canvas>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;