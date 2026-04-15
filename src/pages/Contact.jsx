import { motion } from 'framer-motion'
import { Mail, Phone, MapPin, MessageCircle, Send, Sparkles } from 'lucide-react'
import { FaGithub, FaLinkedin } from 'react-icons/fa'
import { useState } from 'react'
import { buildApiUrl } from '@/config/api'

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState('idle')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    try {
      const response = await fetch(buildApiUrl('/api/contact'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })
      if (response.ok) {
        setSubmitStatus('success')
        setFormData({ name: '', email: '', subject: '', message: '' })
        setTimeout(() => setSubmitStatus('idle'), 3500)
      } else {
        setSubmitStatus('error')
      }
    } catch (error) {
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  const contactInfo = [
    { icon: <Mail className="w-5 h-5 md:w-6 md:h-6" />, label: 'Email', value: 'ayushbhardwajk@gmail.com', link: 'mailto:ayushbhardwajk@gmail.com' },
    { icon: <Phone className="w-5 h-5 md:w-6 md:h-6" />, label: 'Phone', value: '+91 7302439124', link: 'tel:+917302439124' },
    { icon: <MapPin className="w-5 h-5 md:w-6 md:h-6" />, label: 'Location', value: 'Uttar Pradesh, India' },
  ]

  const socialLinks = [
    { icon: <FaGithub size={20} />, label: 'GitHub', link: 'https://github.com/ayushbhardwaj552' },
    { icon: <FaLinkedin size={20} />, label: 'LinkedIn', link: 'https://www.linkedin.com/in/ayush-bharadwaj-8497562b5/' },
    { icon: <MessageCircle size={20} />, label: 'WhatsApp', link: 'https://wa.me/+917302439124' },
  ]

  return (
    <div className="min-h-screen pt-20 md:pt-32 px-5 md:px-8 max-w-7xl mx-auto pb-16 overflow-x-hidden">
      
      {/* --- PREMIUM HEADING --- */}
      <div className="mb-12 md:mb-24 text-left">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="flex items-center gap-3 mb-4">
            <Sparkles className="text-[#2ECC71] w-6 h-6 md:w-8 md:h-8" />
            <h2 className="text-4xl md:text-7xl font-black gradient-text tracking-tighter uppercase leading-tight">
              Contact
            </h2>
          </div>
          <motion.div 
            initial={{ width: 0 }}
            whileInView={{ width: "120px" }}
            transition={{ duration: 1.2, delay: 0.5 }}
            className="h-2 md:h-2.5 bg-[#2ECC71] rounded-full"
          />
        </motion.div>
      </div>

      <div className="grid lg:grid-cols-12 gap-8 lg:gap-20 items-start">
        
        {/* --- LEFT SIDE: INFO CARDS --- */}
        <div className="lg:col-span-5 space-y-6 md:space-y-8 order-2 lg:order-1">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="p-6 md:p-10 rounded-[2rem] md:rounded-[3rem] bg-white/[0.03] border border-white/5 backdrop-blur-2xl relative overflow-hidden group"
          >
            <div className="absolute -top-24 -left-24 w-48 h-48 bg-[#2ECC71]/10 blur-[80px] rounded-full group-hover:bg-[#2ECC71]/20 transition-all duration-700" />
            
            <h3 className="text-2xl md:text-3xl font-black text-white mb-8 tracking-tight uppercase">Reach Out</h3>
            
            <div className="space-y-6 md:space-y-8">
              {contactInfo.map((info, idx) => (
                <motion.a
                  key={idx}
                  href={info.link}
                  whileHover={{ x: 5 }}
                  className={`flex items-center gap-4 md:gap-6 group/item ${!info.link && 'pointer-events-none'}`}
                >
                  <div className="p-3 md:p-4 rounded-xl md:rounded-2xl bg-white/5 border border-white/10 text-[#2ECC71] group-hover/item:bg-[#2ECC71] group-hover/item:text-black transition-all duration-300">
                    {info.icon}
                  </div>
                  <div className="min-w-0">
                    <p className="text-[10px] md:text-xs font-black uppercase tracking-widest text-gray-500 mb-0.5 md:mb-1">
                      {info.label}
                    </p>
                    <p className="text-base md:text-xl font-bold text-white tracking-tight truncate">
                      {info.value}
                    </p>
                  </div>
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Social Island */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex gap-3 md:gap-4 p-4 rounded-3xl md:rounded-[2rem] bg-white/[0.02] border border-white/5 backdrop-blur-md justify-center"
          >
            {socialLinks.map((social, idx) => (
              <motion.a
                key={idx}
                href={social.link}
                target="_blank"
                whileHover={{ y: -5, scale: 1.1 }}
                className="p-4 md:p-5 rounded-xl md:rounded-2xl bg-white/5 border border-white/10 text-gray-400 hover:text-[#2ECC71] hover:border-[#2ECC71]/30 transition-all"
              >
                {social.icon}
              </motion.a>
            ))}
          </motion.div>
        </div>

        {/* --- RIGHT SIDE: PREMIUM FORM --- */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          className="lg:col-span-7 p-6 md:p-14 rounded-[2rem] md:rounded-[3rem] bg-white/[0.03] border border-white/5 backdrop-blur-2xl shadow-2xl relative order-1 lg:order-2"
        >
          <h3 className="text-2xl md:text-3xl font-black text-white mb-8 tracking-tight uppercase">Send a Message</h3>
          
          <form onSubmit={handleSubmit} className="space-y-6 md:space-y-8">
            <div className="grid md:grid-cols-2 gap-6 md:gap-8">
              <div className="relative group">
                <input
                  type="text"
                  required
                  placeholder="Your Name"
                  className="w-full bg-white/5 border border-white/10 rounded-xl md:rounded-2xl px-5 py-4 md:px-6 md:py-5 text-white outline-none focus:border-[#2ECC71]/50 focus:bg-white/[0.08] transition-all placeholder:text-gray-600 text-sm md:text-base"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>
              <div className="relative group">
                <input
                  type="email"
                  required
                  placeholder="Email Address"
                  className="w-full bg-white/5 border border-white/10 rounded-xl md:rounded-2xl px-5 py-4 md:px-6 md:py-5 text-white outline-none focus:border-[#2ECC71]/50 focus:bg-white/[0.08] transition-all placeholder:text-gray-600 text-sm md:text-base"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>
            </div>

            <input
              type="text"
              required
              placeholder="Subject"
              className="w-full bg-white/5 border border-white/10 rounded-xl md:rounded-2xl px-5 py-4 md:px-6 md:py-5 text-white outline-none focus:border-[#2ECC71]/50 focus:bg-white/[0.08] transition-all placeholder:text-gray-600 text-sm md:text-base"
              value={formData.subject}
              onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
            />

            <textarea
              rows={4}
              required
              placeholder="Tell me about your project..."
              className="w-full bg-white/5 border border-white/10 rounded-xl md:rounded-2xl px-5 py-4 md:px-6 md:py-5 text-white outline-none focus:border-[#2ECC71]/50 focus:bg-white/[0.08] transition-all resize-none placeholder:text-gray-600 text-sm md:text-base"
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            />

            <motion.button
              type="submit"
              disabled={isSubmitting}
              className="relative overflow-hidden w-full py-5 md:py-6 bg-white text-black rounded-xl md:rounded-2xl font-black uppercase tracking-widest group/btn disabled:opacity-50"
              whileTap={{ scale: 0.98 }}
            >
              <span className="absolute inset-0 bg-[#2ECC71] translate-y-full group-hover/btn:translate-y-0 transition-transform duration-500 ease-out" />
              <span className="relative z-10 flex items-center justify-center gap-3 group-hover/btn:text-white transition-colors duration-300 text-sm md:text-base">
                {isSubmitting ? 'Sending...' : (
                  <>Send Message <Send className="w-4 h-4 md:w-5 md:h-5" /></>
                )}
              </span>
            </motion.button>

            {submitStatus === 'success' && (
              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-[#2ECC71] font-bold text-center text-sm">
                ✅ Message sent! I'll be in touch soon.
              </motion.p>
            )}
            {submitStatus === 'error' && (
              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-red-400 font-semibold text-center text-sm">
                Error. Please try again or email me directly.
              </motion.p>
            )}
          </form>
        </motion.div>

      </div>
    </div>
  )
}

export default Contact