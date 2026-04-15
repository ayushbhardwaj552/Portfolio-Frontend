import {
  Code2,
  Layout,
  Server,
  Database,
  MessageSquare,
  Brain,
  Terminal,
  Wrench,
  Users,
  Zap,
  Cpu,
  Layers,
  Globe // Added this missing import
} from "lucide-react";
import { motion } from "framer-motion";
import { ScrollAnimation } from "@/components/ScrollAnimation";

// Ensure these components exist in your TechLogos file
import {
  JavaScriptLogo,
  ReactLogo,
  TypeScriptLogo,
  NodeLogo,
  MongoDBLogo,
  VSCodeLogo,
  GitLogo,
  TailwindLogo,
  NextjsLogo,
  VercelLogo,
  PythonLogo,
  ReduxLogo,
  ExpressLogo,
  BcryptLogo,
  JWTLogo,
  AWSLogo,
  RenderLogo,
  PostmanLogo,
  BashLogo,
} from "@/components/TechLogos";

const skills = [
  {
    category: "Development Core",
    icon: <Code2 className="w-6 h-6 text-[#2ECC71]" />,
    items: [
      { name: "JavaScript", icon: <JavaScriptLogo /> },
      { name: "TypeScript", icon: <TypeScriptLogo /> },
      { name: "Python", icon: <PythonLogo /> },
      { name: "Next.js", icon: <NextjsLogo /> },
    ],
  },
  {
    category: "Fundamentals & SQL",
    icon: <Layers className="w-6 h-6 text-orange-400" />,
    items: [
      { name: "C++", icon: <Terminal className="w-4 h-4" /> },
      { name: "C Language", icon: <Code2 className="w-4 h-4" /> },
      { name: "SQL", icon: <Database className="w-4 h-4" /> },
      { name: "DSA", icon: <Brain className="w-4 h-4" /> },
    ],
  },
  {
    category: "Frontend & Design",
    icon: <Layout className="w-6 h-6 text-blue-400" />,
    items: [
      { name: "React.js", icon: <ReactLogo /> },
      { name: "Tailwind", icon: <TailwindLogo /> },
      { name: "Redux", icon: <ReduxLogo /> },
      { name: "Framer Motion", icon: <Zap className="w-4 h-4" /> },
    ],
  },
  {
    category: "Backend & Cloud",
    icon: <Server className="w-6 h-6 text-purple-400" />,
    items: [
      { name: "Node.js", icon: <NodeLogo /> },
      { name: "Express", icon: <ExpressLogo /> },
      { name: "MongoDB", icon: <MongoDBLogo /> },
      { name: "AWS", icon: <AWSLogo /> },
    ],
  },
  {
    category: "Engineering Tools",
    icon: <Cpu className="w-6 h-6 text-yellow-400" />,
    items: [
      { name: "CST Studio", icon: <Cpu className="w-4 h-4" /> },
      { name: "Git / GitHub", icon: <GitLogo /> },
      { name: "Postman", icon: <PostmanLogo /> },
      { name: "Vercel", icon: <VercelLogo /> },
    ],
  },
  {
    category: "Soft Skills",
    icon: <Brain className="w-6 h-6 text-pink-400" />,
    items: [
      { name: "Leadership", icon: <Users className="w-4 h-4" /> },
      { name: "Debugging", icon: <Wrench className="w-4 h-4" /> },
      { name: "Open Source", icon: <Globe className="w-4 h-4 text-sky-400" /> },
      { name: "Communication", icon: <MessageSquare className="w-4 h-4" /> },
    ],
  },
];

const Skills = () => {
  return (
    <div className="min-h-screen pt-24 md:pt-32 px-4 max-w-7xl mx-auto pb-20">
      
      {/* --- PREMIUM HEADING --- */}
      <div className="mb-20">
        <ScrollAnimation>
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl md:text-7xl font-black gradient-text tracking-tighter uppercase mb-4">
              Tech Stack
            </h2>
            <motion.div 
              initial={{ width: 0 }}
              whileInView={{ width: "160px" }}
              transition={{ duration: 1.2, delay: 0.5, ease: "circOut" }}
              className="h-2.5 bg-[#2ECC71] rounded-full mb-10"
            />
          </motion.div>
        </ScrollAnimation>

        <ScrollAnimation>
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="text-gray-400 text-xl md:text-2xl max-w-4xl leading-relaxed font-light italic"
          >
            Equipped with a diverse toolkit spanning 
            <span className="text-white"> software engineering</span>, 
            <span className="text-white"> competitive programming</span>, and 
            <span className="text-white"> hardware simulation</span>.
          </motion.p>
        </ScrollAnimation>
      </div>

      {/* --- SKILLS GRID --- */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {skills.map((skillGroup) => (
          <ScrollAnimation key={skillGroup.category}>
            <motion.div 
              whileHover={{ y: -12, borderColor: "rgba(255, 255, 255, 0.2)" }}
              className="group relative bg-white/[0.03] p-10 rounded-[2.5rem] backdrop-blur-xl border border-white/5 transition-all duration-500"
            >
              {/* Animated Accent Glow */}
              <div className="absolute -top-10 -right-10 w-32 h-32 bg-[#2ECC71]/10 blur-[80px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />

              <div className="flex items-center space-x-5 mb-10 relative z-10">
                <div className="p-3.5 bg-white/5 rounded-2xl border border-white/10 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500">
                  {skillGroup.icon}
                </div>
                <h3 className="text-2xl font-black tracking-tight text-white uppercase">{skillGroup.category}</h3>
              </div>

              <div className="grid grid-cols-2 gap-4 relative z-10">
                {skillGroup.items.map((skill) => (
                  <motion.div
                    key={skill.name}
                    whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.08)" }}
                    className="flex flex-col items-center justify-center p-5 rounded-3xl bg-white/[0.02] border border-white/5 transition-all group/chip"
                  >
                    <div className="mb-3 transition-transform duration-300 group-hover/chip:scale-125 group-hover/chip:-rotate-6">
                      {skill.icon || <Globe className="w-5 h-5 text-gray-500" />} {/* Fallback Icon */}
                    </div>
                    <span className="text-gray-500 group-hover/chip:text-[#2ECC71] transition-colors text-[10px] font-black uppercase tracking-[0.15em] text-center">
                      {skill.name}
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </ScrollAnimation>
        ))}
      </div>
    </div>
  );
};

export default Skills;