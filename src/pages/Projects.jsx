import { ExternalLink, Code2, Sparkles } from "lucide-react";
import { FaGithub } from "react-icons/fa";
import { motion } from "framer-motion";
import { useState } from "react";
import { ScrollAnimation } from "@/components/ScrollAnimation";
import project1 from "@/assets/projects_img/project-1.png";
import project2 from "@/assets/projects_img/project-2.png";
import project3 from "@/assets/projects_img/project-3.png";
import project4 from "@/assets/projects_img/project-4.png";

const projects = [
  {
    title: "AI Interview Agent",
    description:
      "A premium MERN platform simulating real interviews with AI. Features include voice-to-text response analysis, resume-based dynamic question generation, and real-time performance scoring.",
    image: project1,
    github: "https://github.com/ayushbhardwaj552/AI-Interview-Platform", 
    live: "https://interview-iq-ai.vercel.app",
    tags: ["Next.js", "Gemini AI", "Web Speech API", "Clerk Auth", "Drizzle ORM"],
  },
  {
    title: "Bondify Chat Application",
    description:
      "High-performance real-time chat app utilizing WebSockets for instant room-based messaging. Implements secure JWT authentication and a sleek, responsive UI for seamless communication.",
    image: project2,
    github: "https://github.com/ayushbhardwaj552/Bondify-Chat-Application",
    live: "#",
    tags: ["React", "Socket.io", "Node.js", "Express", "MongoDB"],
  },
  {
    title: "e-Services Citizen",
    description:
      "A digital governance portal empowering citizens to interact with local officials. Includes a dedicated module for booking virtual and physical meetings with MLAs and tracking service requests.",
    image: project3,
    github: "https://github.com/ayushbhardwaj552/e-Services-Citizen-",
    live: "#",
    tags: ["MERN Stack", "RBAC", "Cloudinary", "Nodemailer"],
  },
  {
    title: "Fake News Detector",
    description:
      "A machine learning tool designed to identify misinformation. It uses Natural Language Processing (NLP) to analyze linguistic patterns and classify news articles with high precision.",
    image: project4,
    github: "https://github.com/ayushbhardwaj552/Fake-News-Detector",
    live: "#",
    tags: ["Python", "Machine Learning", "NLP", "Scikit-Learn", "Flask"],
  },
  {
    title: "Secure Notes App",
    description:
      "A productivity tool featuring a clean dashboard for organizing thoughts. Built with full CRUD capabilities and persistent local/cloud storage to ensure data safety across sessions.",
    image: project1,
    github: "https://github.com/ayushbhardwaj552/Notes-App-",
    live: "#",
    tags: ["React", "Context API", "Node.js", "MongoDB", "Tailwind CSS"],
  },
  {
    title: "Modern RPS Game",
    description:
      "An interactive Rock-Paper-Scissors game featuring smooth Framer Motion animations and logic-based score tracking to showcase proficiency in frontend state management.",
    image: project2,
    github: "https://github.com/ayushbhardwaj552/Rock-paper-Scissor",
    live: "https://ayushrps.vercel.app",
    tags: ["JavaScript", "HTML5", "CSS3", "Framer Motion"],
  },

];

const Projects = () => {
  const [showMore, setShowMore] = useState(false);
  const visibleProjects = showMore ? projects : projects.slice(0, 4);

  return (
    <div className="min-h-screen pt-20 md:pt-24 px-4 max-w-6xl mx-auto pb-20 overflow-hidden">
      
      {/* --- PREMIUM HEADING --- */}
      <div className="mb-12 md:mb-14">
        <ScrollAnimation>
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center gap-3 mb-3">
              <motion.div
                whileHover={{ rotate: 12, scale: 1.08 }}
                transition={{ type: "spring", stiffness: 260, damping: 16 }}
              >
                <Sparkles className="text-[#2ECC71] w-6 h-6 md:w-7 md:h-7" />
              </motion.div>
              <h2 className="text-4xl md:text-6xl font-black gradient-text tracking-tight uppercase">
                Projects
              </h2>
            </div>
            <motion.div 
              initial={{ width: 0 }}
              whileInView={{ width: "130px" }}
              transition={{ duration: 1, delay: 0.4, ease: "circOut" }}
              className="h-1.5 bg-[#2ECC71] rounded-full"
            />
          </motion.div>
        </ScrollAnimation>
      </div>

      {/* --- PROJECTS GRID --- */}
      <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
        {visibleProjects.map((project, idx) => (
          <ScrollAnimation key={project.title}>
            <motion.div
              initial={{ opacity: 0, y: 24, scale: 0.98 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.45, delay: idx * 0.06 }}
              whileHover={{ y: -10, scale: 1.01 }}
              className="group relative flex flex-col lg:flex-row bg-white/[0.03] rounded-[1.7rem] overflow-hidden border border-white/5 backdrop-blur-xl transition-all duration-500 hover:border-[#2ECC71]/30 hover:shadow-[0_16px_40px_rgba(0,0,0,0.45)]"
            >
              {/* Image Section with Hover Zoom */}
              <div className="lg:w-2/5 relative overflow-hidden h-48 lg:h-auto">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-108"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                   <Code2 className="text-white w-10 h-10" />
                </div>
              </div>

              {/* Content Section */}
              <div className="lg:w-3/5 p-5 lg:p-6 flex flex-col">
                <h3 className="text-xl md:text-2xl font-black text-white mb-3 tracking-tight uppercase group-hover:text-[#2ECC71] transition-colors">
                  {project.title}
                </h3>
                <p className="text-gray-400 text-sm md:text-base leading-relaxed mb-5 font-light italic">
                  "{project.description}"
                </p>

                {/* Tech Tags */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tags.map((tag) => (
                    <motion.span
                      key={tag}
                      whileHover={{ scale: 1.06 }}
                      className="px-3 py-1 text-[10px] font-black uppercase tracking-wider bg-white/5 border border-white/10 rounded-full text-gray-300 group-hover:border-[#2ECC71]/20 transition-all"
                    >
                      {tag}
                    </motion.span>
                  ))}
                </div>

                {/* Interaction Buttons with Signature Fill */}
                <div className="flex gap-3 mt-auto">
                  <motion.a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="relative overflow-hidden flex-1 px-4 py-2.5 bg-white/5 text-white rounded-xl font-bold border border-white/10 flex items-center justify-center gap-2 group/btn text-sm"
                    whileTap={{ scale: 0.95 }}
                    whileHover={{ scale: 1.02 }}
                  >
                    <span className="absolute inset-0 bg-white translate-y-full group-hover/btn:translate-y-0 transition-transform duration-500" />
                    <span className="relative z-10 flex items-center gap-2 group-hover/btn:text-black transition-colors">
                      <FaGithub className="w-4 h-4" /> GitHub
                    </span>
                  </motion.a>

                  {project.live && (
                    <motion.a
                      href={project.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="relative overflow-hidden flex-1 px-4 py-2.5 bg-[#2ECC71]/10 text-[#2ECC71] rounded-xl font-bold border border-[#2ECC71]/20 flex items-center justify-center gap-2 group/btn text-sm"
                      whileTap={{ scale: 0.95 }}
                      whileHover={{ scale: 1.02 }}
                    >
                      <span className="absolute inset-0 bg-[#2ECC71] translate-y-full group-hover/btn:translate-y-0 transition-transform duration-500" />
                      <span className="relative z-10 flex items-center gap-2 group-hover/btn:text-white transition-colors">
                        <ExternalLink className="w-4 h-4" /> Demo
                      </span>
                    </motion.a>
                  )}
                </div>
              </div>
            </motion.div>
          </ScrollAnimation>
        ))}
      </div>

      <motion.div
        className="mt-10 flex justify-center"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.45 }}
      >
        {!showMore ? (
          <motion.button
            onClick={() => setShowMore(true)}
            className="relative overflow-hidden px-7 py-3 rounded-full bg-white/10 border border-white/15 text-white font-semibold tracking-wide"
            whileHover={{ y: -3, scale: 1.03, boxShadow: "0px 12px 24px rgba(46, 204, 113, 0.25)" }}
            whileTap={{ scale: 0.96 }}
          >
            <span className="absolute inset-0 bg-[#2ECC71] translate-y-full hover:translate-y-0 transition-transform duration-300" />
            <span className="relative z-10">View More Projects</span>
          </motion.button>
        ) : (
          <motion.button
            onClick={() => setShowMore(false)}
            className="relative overflow-hidden px-7 py-3 rounded-full bg-white/5 border border-white/15 text-gray-200 font-semibold tracking-wide"
            whileHover={{ y: -3, scale: 1.03, boxShadow: "0px 10px 22px rgba(255, 255, 255, 0.18)" }}
            whileTap={{ scale: 0.96 }}
          >
            <span className="absolute inset-0 bg-white/20 translate-y-full hover:translate-y-0 transition-transform duration-300" />
            <span className="relative z-10">View Less Projects</span>
          </motion.button>
        )}
      </motion.div>
    </div>
  );
};

export default Projects;