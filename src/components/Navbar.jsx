import { useEffect, useState } from 'react'
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion'
import { Code2, Menu, Moon, Sun, X } from 'lucide-react'
import SearchDialog from './SearchDialog'

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('home')
  const [theme, setTheme] = useState('dark')
  const { scrollYProgress } = useScroll()
  const progressScaleX = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 26,
    mass: 0.25,
  })

  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'education', label: 'Education' },
    { id: 'skills', label: 'Skills' },
    { id: 'projects', label: 'Projects' },
    { id: 'contact', label: 'Contact' },
  ]

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme')
    const systemThemeDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    setTheme(savedTheme || (systemThemeDark ? 'dark' : 'light'))
  }, [])

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem('theme', theme)
  }, [theme])

  useEffect(() => {
    const sectionElements = navLinks
      .map((link) => document.getElementById(link.id))
      .filter(Boolean)

    if (!sectionElements.length) return

    const updateByScrollPosition = () => {
      const marker = window.innerHeight * 0.38
      let sectionId = sectionElements[0].id

      for (const section of sectionElements) {
        const rect = section.getBoundingClientRect()
        if (rect.top <= marker) {
          sectionId = section.id
        }
      }

      setActiveSection(sectionId)
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)

        if (visible[0]?.target?.id) {
          setActiveSection(visible[0].target.id)
        }
      },
      {
        threshold: [0.2, 0.35, 0.5, 0.65],
        rootMargin: '-25% 0px -45% 0px',
      },
    )

    sectionElements.forEach((section) => observer.observe(section))
    updateByScrollPosition()
    window.addEventListener('scroll', updateByScrollPosition, { passive: true })
    window.addEventListener('resize', updateByScrollPosition)

    return () => {
      observer.disconnect()
      window.removeEventListener('scroll', updateByScrollPosition)
      window.removeEventListener('resize', updateByScrollPosition)
    }
  }, [])

  const toggleTheme = () => {
    setTheme((currentTheme) => (currentTheme === 'dark' ? 'light' : 'dark'))
  }

  return (
    <motion.nav
      className="fixed top-0 w-full z-50"
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      <div className="relative">
        <motion.div
          className="absolute left-0 right-0 top-0 h-[2px] origin-left bg-gradient-to-r from-[#2ECC71] via-white/90 to-[#2ECC71]"
          style={{ scaleX: progressScaleX }}
        />

        <div className="absolute inset-0 bg-black/45 backdrop-blur-2xl border-b border-white/10 shadow-[0_10px_32px_rgba(0,0,0,0.32)] navbar-glass" />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-[72px] items-center justify-between">
            {/* Logo */}
            <motion.a
              href="#home"
              className="group flex items-center space-x-3"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.95 }}
              animate={{ y: [0, -2, 0] }}
              transition={{ y: { duration: 2.2, repeat: Infinity, ease: "easeInOut" } }}
            >
              <div className="rounded-xl p-2 bg-white/5 border border-white/10 group-hover:border-[#2ECC71]/50 group-hover:bg-white/10 transition-all">
                <Code2 className="w-6 h-6 text-[#2ECC71]" aria-hidden="true" />
              </div>
              <span className="text-xl font-bold text-white tracking-tight">Ayush</span>
            </motion.a>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-4">
              <SearchDialog />
              
              {/* Theme Toggle Button with Animation */}
              <motion.button
                onClick={toggleTheme}
                whileHover={{ scale: 1.08, y: -1 }}
                whileTap={{ scale: 0.9 }}
                className="relative overflow-hidden p-2.5 rounded-xl border border-white/10 bg-white/5 text-gray-300 hover:text-white transition-colors group"
                aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
              >
                {/* Bottom-to-top color fill */}
                <span className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                <span className="relative z-10">
                  {theme === 'dark' ? (
                    <Sun className="w-4 h-4" aria-hidden="true" />
                  ) : (
                    <Moon className="w-4 h-4" aria-hidden="true" />
                  )}
                </span>
              </motion.button>

              {navLinks.map((link, index) => (
                <motion.a
                  key={link.id}
                  href={`#${link.id}`}
                  className={`relative overflow-hidden px-3.5 py-2 rounded-xl text-sm font-medium transition-all group ${
                    activeSection === link.id ? 'text-white' : 'text-gray-400 hover:text-white'
                  }`}
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ 
                    opacity: 1, 
                    y: 0,
                  }}
                  whileHover={{ scale: 1.06, y: -2 }}
                  whileTap={{ scale: 0.96 }}
                  transition={{ delay: index * 0.04, duration: 0.28 }}
                >
                  {/* Fill background effect */}
                  <span className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                  
                  <span className="relative z-10">{link.label}</span>
                  
                  {activeSection === link.id && (
                    <motion.span
                      layoutId="navbar-active-pill"
                      className="absolute inset-0 rounded-xl border border-[#2ECC71]/40 bg-[#2ECC71]/20"
                      transition={{ type: 'spring', stiffness: 340, damping: 28 }}
                    />
                  )}
                </motion.a>
              ))}
            </div>

            {/* Mobile header right section */}
            <div className="flex md:hidden items-center space-x-2">
              <SearchDialog />
              <motion.button
                onClick={toggleTheme}
                whileTap={{ scale: 0.9 }}
                className="p-2.5 rounded-lg border border-white/10 bg-white/5 text-gray-400 hover:text-white transition-colors"
              >
                {theme === 'dark' ? (
                  <Sun className="w-5 h-5" aria-hidden="true" />
                ) : (
                  <Moon className="w-5 h-5" aria-hidden="true" />
                )}
              </motion.button>
              <motion.button
                whileTap={{ scale: 0.92 }}
                className="p-2.5 rounded-lg border border-white/10 bg-white/5 text-gray-400 hover:text-white transition-colors"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? (
                  <X className="w-6 h-6" aria-hidden="true" />
                ) : (
                  <Menu className="w-6 h-6" aria-hidden="true" />
                )}
              </motion.button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              className="md:hidden absolute top-full left-0 right-0 bg-black/85 backdrop-blur-2xl border-b border-white/10"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="px-4 pt-2 pb-6 space-y-2">
                {navLinks.map((link) => (
                  <motion.a
                    key={link.id}
                    href={`#${link.id}`}
                    className={`block px-4 py-3 rounded-xl transition-all relative overflow-hidden group border ${
                      activeSection === link.id
                        ? 'text-white bg-[#2ECC71]/20 border-[#2ECC71]/40'
                        : 'text-gray-400 border-white/10 bg-white/5'
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                    whileHover={{ scale: 1.01, x: 4 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <span className="relative z-10">{link.label}</span>
                  </motion.a>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  )
}

export default Navbar