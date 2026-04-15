import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Code2, Mail, Phone, Users } from 'lucide-react'
import { FaGithub, FaLinkedin } from 'react-icons/fa'
import { buildApiUrl } from '@/config/api'

const Footer = () => {
  const currentYear = new Date().getFullYear()
  const [visitorCount, setVisitorCount] = useState(null)

  const pageLinks = [
    { name: 'Home', path: '#home' },
    { name: 'About', path: '#about' },
    { name: 'Education', path: '#education' },
    { name: 'Skills', path: '#skills' },
    { name: 'Projects', path: '#projects' },
    { name: 'Contact', path: '#contact' },
  ]

  useEffect(() => {
    const ensureVisitorId = () => {
      const existing = localStorage.getItem('portfolio_visitor_id')
      if (existing) return existing
      const generated = `visitor_${Date.now()}_${Math.random().toString(36).slice(2, 10)}`
      localStorage.setItem('portfolio_visitor_id', generated)
      return generated
    }

    const registerAndFetchCount = async () => {
      try {
        const visitorId = ensureVisitorId()
        const response = await fetch(buildApiUrl('/api/visitors/hit'), {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ visitorId }),
        })

        if (response.ok) {
          const data = await response.json()
          setVisitorCount(data.count ?? null)
          return
        }
      } catch (error) {
        console.error('Visitor registration failed:', error)
      }

      try {
        const countResponse = await fetch(buildApiUrl('/api/visitors/count'))
        if (countResponse.ok) {
          const countData = await countResponse.json()
          setVisitorCount(countData.count ?? null)
        }
      } catch (error) {
        console.error('Visitor count fetch failed:', error)
      }
    }

    registerAndFetchCount()
  }, [])

  return (
    <footer className="relative mt-32 overflow-hidden border-t border-white/5 bg-[#050505]">
      {/* Background Decorative Glow */}
      <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-full max-w-4xl h-48 bg-[#2ECC71]/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-12 pt-20 pb-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-20">
          
          {/* Branding Section */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <a href="#home" className="group flex items-center space-x-3 w-fit">
              <div className="p-2.5 bg-white/5 rounded-xl border border-white/10 group-hover:border-[#2ECC71]/50 transition-all duration-500 group-hover:shadow-[0_0_20px_rgba(46,204,113,0.2)]">
                <Code2 className="w-7 h-7 text-[#2ECC71]" />
              </div>
              <span className="text-2xl font-black tracking-tighter text-white uppercase group-hover:tracking-normal transition-all duration-500">
                Ayush
              </span>
            </a>
            <p className="text-gray-400 text-lg font-light leading-relaxed">
              Crafting premium digital experiences through <span className="text-white font-medium">Full Stack Development</span> and elegant code.
            </p>
          </motion.div>

          {/* Quick Links */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="space-y-6"
          >
            <h3 className="text-xs font-black uppercase tracking-[0.2em] text-gray-500">Navigation</h3>
            <div className="grid grid-cols-2 gap-x-4 gap-y-3">
              {pageLinks.map((link) => (
                <a
                  key={link.path}
                  href={link.path}
                  className="group relative text-gray-400 hover:text-white transition-colors w-fit overflow-hidden"
                >
                  <span className="text-sm font-medium">{link.name}</span>
                  <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-[#2ECC71] group-hover:w-full transition-all duration-300" />
                </a>
              ))}
            </div>
          </motion.div>

          {/* Contact */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="space-y-6"
          >
            <h3 className="text-xs font-black uppercase tracking-[0.2em] text-gray-500">Get In Touch</h3>
            <div className="space-y-4">
              <a href="mailto:ayushbhardwajk@gmail.com" className="group flex items-center gap-4 text-gray-400 hover:text-white transition-all">
                <div className="p-3 bg-white/5 rounded-xl group-hover:text-[#2ECC71] transition-colors"><Mail className="w-4 h-4" /></div>
                <span className="text-sm truncate">ayushbhardwajk@gmail.com</span>
              </a>
              <a href="tel:+917302439124" className="group flex items-center gap-4 text-gray-400 hover:text-white transition-all">
                <div className="p-3 bg-white/5 rounded-xl group-hover:text-[#2ECC71] transition-colors"><Phone className="w-4 h-4" /></div>
                <span className="text-sm">+91 73024 39124</span>
              </a>
            </div>
          </motion.div>

          {/* Social */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="space-y-6"
          >
            <h3 className="text-xs font-black uppercase tracking-[0.2em] text-gray-500">Social Connect</h3>
            <div className="flex gap-4">
              {[
                { icon: <FaGithub />, link: 'https://github.com/ayushbhardwaj552' },
                { icon: <FaLinkedin />, link: 'https://www.linkedin.com/in/ayush-bharadwaj-8497562b5/' },
                { icon: <Mail />, link: 'mailto:ayushbhardwajk@gmail.com' },
              ].map((social, i) => (
                <a
                  key={i}
                  href={social.link}
                  target="_blank"
                  className="relative group overflow-hidden p-4 bg-white/5 text-gray-400 rounded-2xl border border-white/5 transition-all"
                >
                  <span className="absolute inset-0 bg-[#2ECC71] translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                  <span className="relative z-10 group-hover:text-black transition-colors duration-300">
                    {social.icon}
                  </span>
                </a>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Bottom */}
        <div className="pt-10 border-t border-white/5">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <p className="text-xs font-medium text-gray-500 tracking-wider">
              © {currentYear} <span className="text-white">AYUSH BHARDWAJ</span>. BUILT WITH REACT & FRAMER MOTION.
            </p>
            
            <div className="flex items-center gap-8 bg-white/5 px-6 py-3 rounded-full border border-white/5 backdrop-blur-sm shadow-inner">
               <div className="flex items-center gap-2 group cursor-default">
                  <div className="w-2 h-2 rounded-full bg-[#2ECC71] animate-pulse shadow-[0_0_10px_#2ECC71]" />
                  <span className="text-[10px] font-black uppercase tracking-widest text-gray-400 group-hover:text-white transition-colors">Live Status</span>
               </div>

               <div className="w-[1px] h-4 bg-white/10" />

               <div className="flex items-center gap-2 group">
                  <Users className="w-4 h-4 text-gray-500 group-hover:text-[#2ECC71] transition-colors" />
                  <span className="text-sm font-bold text-white tabular-nums">
                    {visitorCount ?? '000'} <span className="text-[10px] text-gray-500 uppercase ml-1">Visitors</span>
                  </span>
               </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer