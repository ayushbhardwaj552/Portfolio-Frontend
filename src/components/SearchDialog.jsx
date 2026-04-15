import { useState, useEffect } from 'react'
import { Search, Command, ArrowRight } from 'lucide-react'

const searchData = [
  {
    title: 'Home',
    description: 'Go to the welcome page',
    sectionId: 'home',
    keywords: ['home', 'cv', 'resume', 'start', 'welcome', 'portfolio', 'Ayush', 'Ayush Bhardwaj', 'Ayush', 'software developer', 'full stack developer', 'mern stack', 'web developer'],
  },
  {
    title: 'About',
    description: 'Learn more about me and my background',
    sectionId: 'about',
    keywords: ['about', 'background', 'education', 'bio', 'profile', 'cv', 'resume', 'Ayush', 'Bhardwaj', 'full stack developer', 'software engineer', 'web developer'],
  },
  {
    title: 'Education',
    description: 'View my educational background',
    sectionId: 'education',
    keywords: ['education', 'university', 'college', 'degree', 'school', 'board', 'Electronics and Communication', 'engineering', 'b.tech', 'IIIT Kota'],
  },
  {
    title: 'Skills',
    description: 'Explore my technical skills and expertise',
    sectionId: 'skills',
    keywords: ['skills', 'technologies', 'programming', 'languages', 'frameworks', 'web', 'development', 'software', 'tools', 'react', 'node', 'javascript', 'typescript', 'next.js', 'mongodb', 'sql'],
  },
  {
    title: 'Projects',
    description: 'View my portfolio of projects',
    sectionId: 'projects',
    keywords: ['projects', 'portfolio', 'work', 'examples', 'github', 'code', 'open-source', 'web applications', 'full stack', 'mern stack', 'react', 'node'],
  },
  {
    title: 'Contact',
    description: 'Get in touch with me',
    sectionId: 'contact',
    keywords: ['contact', 'email', 'message', 'connect', 'hire', 'freelance', 'work', 'collaboration', 'job', 'opportunity'],
  },
]

const SearchDialog = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [results, setResults] = useState(searchData)
  const [selectedIndex, setSelectedIndex] = useState(0)

  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId)
    if (section) {
      section.scrollIntoView({ behavior: 'smooth', block: 'start' })
      window.history.replaceState(null, '', `#${sectionId}`)
    }
  }

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        setIsOpen((prev) => !prev)
      }

      if (!isOpen) return

      if (e.key === 'Escape') setIsOpen(false)

      if (e.key === 'ArrowDown') {
        e.preventDefault()
        setSelectedIndex((prev) => (prev + 1) % results.length)
      }
      if (e.key === 'ArrowUp') {
        e.preventDefault()
        setSelectedIndex((prev) => (prev - 1 + results.length) % results.length)
      }

      if (e.key === 'Enter' && results.length > 0) {
        e.preventDefault()
        scrollToSection(results[selectedIndex].sectionId)
        setIsOpen(false)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, results, selectedIndex])

  useEffect(() => {
    if (searchQuery) {
      const filtered = searchData.filter((item) => {
        const searchLower = searchQuery.toLowerCase()
        return (
          item.title.toLowerCase().includes(searchLower) ||
          item.description.toLowerCase().includes(searchLower) ||
          item.keywords.some((keyword) => keyword.toLowerCase().includes(searchLower))
        )
      })
      setResults(filtered)
      setSelectedIndex(0)
    } else {
      setResults(searchData)
    }
  }, [searchQuery])

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="flex items-center space-x-2 px-3 py-1.5 text-gray-400 hover:text-white transition-colors bg-white/15 rounded-lg hover:bg-white/10"
      >
        <Search className="w-4 h-4" />
        <span className="text-sm hidden sm:block">Search ...</span>
        <span className="hidden md:flex items-center space-x-1 px-1.5 py-0.5 text-xs bg-white/10 rounded">
          <Command className="w-3 h-3" />
          <span>K</span>
        </span>
      </button>
    )
  }

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="min-h-screen px-4 text-center">
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
          onClick={() => setIsOpen(false)}
        />
        <div className="inline-block w-full max-w-2xl mt-24 text-left align-middle transition-all transform">
          <div className="relative bg-gray-900 rounded-xl shadow-2xl">
            <div className="flex items-center px-4 border-b border-white/10">
              <Search className="w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search pages..."
                className="w-full px-4 py-4 text-white bg-transparent border-0 focus:outline-none focus:ring-0"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                autoFocus
              />
              <div className="flex items-center space-x-1 px-1.5 py-0.5 text-xs text-gray-400 bg-white/10 rounded">
                <span>Esc</span>
              </div>
            </div>

            <div className="max-h-[60vh] overflow-y-auto">
              {results.length === 0 ? (
                <div className="p-4 text-sm text-gray-400">No results found.</div>
              ) : (
                <div className="py-2">
                  {results.map((result, index) => (
                    <button
                      key={result.sectionId}
                      className={`w-full px-4 py-3 text-left hover:bg-white/5 flex items-center justify-between ${
                        index === selectedIndex ? 'bg-white/10' : ''
                      }`}
                      onClick={() => {
                        scrollToSection(result.sectionId)
                        setIsOpen(false)
                      }}
                    >
                      <div>
                        <div className="text-white font-medium">{result.title}</div>
                        <div className="text-sm text-gray-400">{result.description}</div>
                      </div>
                      <ArrowRight
                        className={`w-4 h-4 text-gray-400 ${
                          index === selectedIndex ? 'opacity-100' : 'opacity-0'
                        }`}
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SearchDialog
