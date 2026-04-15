import { motion } from 'framer-motion'
import { GraduationCap, Calendar, MapPin, Award, ExternalLink, BookOpen, CheckCircle2 } from 'lucide-react'
import { ScrollAnimation } from '@/components/ScrollAnimation'
import collegeImg from '@/assets/education/college_img.webp'
import schoolImg from '@/assets/education/school_img.png'
import bTechPdf from '@/assets/files/education_pdf/B.Tech.pdf'
import hsMarkSheetPdf from '@/assets/files/education_pdf/Ayush_Class_12.pdf'

const Education = () => {
  const educationData = [
    {
      school: 'IIIT Kota',
      location: 'Kota, Rajasthan, India',
      duration: '2023 - 2027',
      degree: 'B.Tech (ECE)',
      gradeType: 'CGPA',
      grade: '8.86',
      image: collegeImg,
      resultUrl: bTechPdf,
      side: 'left',
      coursework: ["Data Structures", "Algorithms", "MERN Stack", "DBMS", "OOPS", "Operating Systems","MicroControllers","Antenna Design" ],
      description: 'Maintaining a leadership role as Class Representative while specializing in full-stack engineering and antenna simulations.',
    },
    {
      school: 'St Marks Public School Agra UP',
      location: 'Agra, UP, India',
      duration: '2020 - 2022',
      degree: 'Higher Secondary (Science)',
      gradeType: 'Percentage',
      grade: '88.6%',
      image: schoolImg,
      resultUrl: hsMarkSheetPdf,
      side: 'right',
      coursework: ["Physics", "Chemistry", "Mathematics", "English", "Physical Education"],
      description: 'Built a core analytical foundation with a focus on logical reasoning and early software concepts.',
    },
  ]

  return (
    <div className="min-h-screen pt-24 px-4 max-w-7xl mx-auto pb-24 overflow-x-hidden">
      {/* --- ANIMATED HEADING --- */}
      <ScrollAnimation>
        <motion.div
          className="flex flex-col items-center justify-center gap-4 mb-24"
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-[#2ECC71] to-[#27ae60] rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
            <div className="relative p-4 bg-black rounded-2xl border border-white/10">
              <GraduationCap className="w-12 h-12 text-[#2ECC71]" />
            </div>
          </div>
          <h2 className="text-5xl md:text-8xl font-bold gradient-text tracking-tighter uppercase text-center">
            My Education
          </h2>
          <div className="h-1.5 w-32 bg-[#2ECC71] rounded-full mt-2" />
        </motion.div>
      </ScrollAnimation>

      <div className="relative">
        {/* Central Timeline Decorative Line */}
        <div className="absolute left-1/2 top-0 bottom-0 w-[2px] -translate-x-1/2 bg-gradient-to-b from-transparent via-[#2ECC71]/70 to-transparent hidden md:block" />

        <div className="space-y-14 md:space-y-16 relative">
          {educationData.map((edu, index) => {
            const isLeft = edu.side === 'left'

            return (
              <div key={edu.school} className="relative">
                {/* Timeline Center Dot */}
                <div className="absolute left-1/2 top-12 -translate-x-1/2 z-20 hidden md:block">
                  <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    className="w-4 h-4 rounded-full bg-[#2ECC71] border-4 border-black shadow-[0_0_20px_rgba(46,204,113,0.8)]"
                  />
                </div>

                <div className={`grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-20 items-start`}>
                  
                  {/* B.Tech Card (Always on Left side logic) */}
                  <motion.div
                    className={`${isLeft ? 'md:col-start-1' : 'md:col-start-2'} order-1`}
                    initial={{ opacity: 0, x: isLeft ? -120 : 120 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ type: "spring", stiffness: 90, damping: 16 }}
                  >
                    <motion.div
                      className="group relative rounded-[2rem] border border-white/10 bg-white/[0.03] backdrop-blur-2xl p-5 lg:p-6 hover:border-[#2ECC71]/40 transition-all duration-500 shadow-2xl overflow-hidden"
                      initial={{ scale: 0.97 }}
                      whileInView={{ scale: 1 }}
                      whileHover={{ y: -10, scale: 1.01 }}
                    >
                      <motion.div
                        className="pointer-events-none absolute inset-y-0 -left-1/2 w-1/3 bg-gradient-to-r from-transparent via-white/10 to-transparent"
                        animate={{ x: ['0%', '360%'] }}
                        transition={{ duration: 3.8, repeat: Infinity, repeatDelay: 2.5, ease: 'easeInOut' }}
                      />

                      {/* Top Header Section */}
                      <div className="flex flex-col sm:flex-row gap-4 mb-5">
                        <div className="relative">
                          <motion.img
                            src={edu.image}
                            alt={edu.school}
                            whileHover={{ rotate: -4, scale: 1.08 }}
                            className="w-16 h-16 md:w-20 md:h-20 rounded-2xl object-cover border-2 border-white/10 relative z-10"
                          />
                          <div className="absolute -inset-2 bg-[#2ECC71]/20 blur-xl rounded-full -z-0 opacity-0 group-hover:opacity-100 transition-opacity" />
                        </div>
                        <div>
                          <h3 className="text-xl md:text-2xl lg:text-3xl font-extrabold tracking-tight text-white mb-1 leading-tight uppercase">
                            {edu.degree}
                          </h3>
                          <div className="flex items-center gap-2">
                            <CheckCircle2 className="w-4 h-4 md:w-5 md:h-5 text-[#2ECC71]" />
                            <p className="text-[#2ECC71] font-bold text-sm md:text-lg">{edu.school}</p>
                          </div>
                        </div>
                      </div>

                      {/* Info Row */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-5">
                        <div className="flex items-center gap-2 bg-white/5 p-3 rounded-xl border border-white/5 group-hover:border-white/10 transition-colors">
                          <Calendar className="w-4 h-4 text-[#2ECC71]" />
                          <span className="text-gray-300 text-sm font-medium">{edu.duration}</span>
                        </div>
                        <div className="flex items-center gap-2 bg-white/5 p-3 rounded-xl border border-white/5 group-hover:border-white/10 transition-colors">
                          <MapPin className="w-4 h-4 text-[#2ECC71]" />
                          <span className="text-gray-300 text-sm font-medium">{edu.location}</span>
                        </div>
                      </div>

                      {/* --- GLOWING GRADE BADGE --- */}
                      <div className="mb-5 inline-flex items-center gap-3 bg-[#2ECC71]/10 border border-[#2ECC71]/20 px-4 py-2 rounded-xl shadow-[0_0_30px_rgba(46,204,113,0.1)]">
                        <Award className="w-5 h-5 text-[#2ECC71]" />
                        <span className="text-gray-400 text-sm font-bold uppercase tracking-wider">{edu.gradeType}:</span>
                        <span className="text-xl md:text-2xl font-black text-white">{edu.grade}</span>
                      </div>

                      {/* --- COURSEWORK CHIPS --- */}
                      <div className="mb-5">
                        <div className="flex items-center gap-2 mb-3 text-white/50 text-[11px] font-black uppercase tracking-[0.2em]">
                          <BookOpen className="w-4 h-4 text-[#2ECC71]" />
                          Core Coursework
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {edu.coursework.map((course) => (
                            <motion.span 
                              key={course}
                              whileHover={{ scale: 1.08, backgroundColor: "rgba(255,255,255,0.1)" }}
                              whileTap={{ scale: 0.97 }}
                              className="px-3 py-1.5 bg-white/5 border border-white/5 rounded-lg text-xs text-gray-300 font-medium transition-colors"
                            >
                              {course}
                            </motion.span>
                          ))}
                        </div>
                      </div>

                      <p className="text-gray-400 leading-relaxed mb-6 text-sm md:text-base font-light italic">
                        "{edu.description}"
                      </p>

                      {/* --- SIGNATURE FILL BUTTON --- */}
                      <motion.a
                        href={edu.resultUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="relative overflow-hidden inline-flex items-center gap-2.5 px-6 py-3 bg-white/5 text-white rounded-xl font-black text-sm group/btn border border-white/10"
                        whileTap={{ scale: 0.95 }}
                        whileHover={{ scale: 1.03 }}
                      >
                        <span className="absolute inset-0 bg-white translate-y-full group-hover/btn:translate-y-0 transition-transform duration-500 ease-out" />
                        <span className="relative z-10 flex items-center gap-3 group-hover/btn:text-black transition-colors duration-300">
                          View Documents
                          <ExternalLink className="w-5 h-5" />
                        </span>
                      </motion.a>
                    </motion.div>
                  </motion.div>

                  {/* Spacer for the other side */}
                  <div className="hidden md:block" />
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default Education