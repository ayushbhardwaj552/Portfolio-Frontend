import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ArrowRight } from "lucide-react";
import useSWR from "swr";
import ShapeBlur from "@/components/ShapeBlur";
import profileImg from "@/assets/profile/profile.jpeg";
import cvPdf from "@/assets/files/cv_pdf/Ayush_Resume.pdf";

const fetcher = (url) => fetch(url).then((res) => res.json());

const About = () => {
  // 3D Tilt Effect Logic
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["7deg", "-7deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-7deg", "7deg"]);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const codingProfiles = [
    {
      logo: "https://cdn.simpleicons.org/codechef/5B4638",
      platform: "CodeChef",
      stat: "3★ Coder",
      detail: "Max Rating: 1671",
      handle: "ayush_bhardwaj",
      link: "https://www.codechef.com/users/cloud_craft_20",
      glow: "hover:shadow-[0_16px_34px_rgba(147,51,234,0.24)]",
    },
    {
      logo: "https://cdn.simpleicons.org/codeforces/1F8ACB",
      platform: "Codeforces",
      stat: "Pupil",
      detail: "Max Rating: 1370",
      handle: "ayush_bhardwaj",
      link: "https://codeforces.com/profile/ayushfak0555",
      glow: "hover:shadow-[0_16px_34px_rgba(59,130,246,0.24)]",
    },
    {
      logo: "https://cdn.simpleicons.org/geeksforgeeks/2F8D46",
      platform: "GeeksforGeeks",
      stat: "Top DSA Practice",
      detail: "Problem Solving Track",
      handle: "ayush-bhardwaj",
      link: "https://www.geeksforgeeks.org/profile/2023kue1vyy",
      glow: "hover:shadow-[0_16px_34px_rgba(34,197,94,0.24)]",
    },
  ];

  const interests = ["Web Development", "Competative Programmer", "Full-Stack developer", "DevOps", "Open Source", "Artificial Intelligence"];
  const leetcodeUsername = "ayushbhardwaj";

  const { data: leetcodeData } = useSWR(
    `https://alfa-leetcode-api.onrender.com/${leetcodeUsername}`,
    fetcher,
    { revalidateOnFocus: false, dedupingInterval: 120000 }
  );

  const leetSolved = leetcodeData?.totalSolved ?? 600;
  const leetContest = leetcodeData?.contestAttend ?? 18;
  const leetRating = Math.round(leetcodeData?.contestRating ?? 1856);

  return (
    <div className="min-h-screen pt-24 md:pt-32 px-4 sm:px-6 md:px-12 max-w-7xl mx-auto pb-20">
      {/* SECTION HEADING */}
      <motion.div
        initial={{ opacity: 0, x: -30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="mb-12 md:mb-16"
      >
        <h2 className="text-5xl md:text-7xl font-bold gradient-text tracking-tighter">
          About Me
        </h2>
        <div className="h-1 w-20 bg-[#2ECC71] mt-4 rounded-full" />
      </motion.div>

      {/* MAIN CONTENT CARD */}
      <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-center mb-24">
        
        {/* LEFT SIDE: 3D INTERACTIVE IMAGE */}
        <motion.div
          className="lg:col-span-5 relative group"
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ 
            opacity: 1, 
            scale: [1, 1.02, 1], // Breathing scale animation
          }}
          viewport={{ once: true }}
          transition={{ 
            opacity: { duration: 0.7 },
            scale: { duration: 4, repeat: Infinity, ease: "easeInOut" } // Continuous loop
          }}
        >
          <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] border border-white/10 shadow-2xl">
            <img
              src={profileImg}
              alt="Ayush Bhardwaj"
              className="w-full h-full object-cover grayscale-[20%] group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700"
            />
            {/* Overlay Gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          </div>
          
          {/* Decorative Elements */}
          <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-[#2ECC71]/20 blur-[60px] rounded-full -z-10" />
          <div className="absolute -top-6 -left-6 w-32 h-32 bg-white/10 blur-[60px] rounded-full -z-10" />
        </motion.div>

        {/* RIGHT SIDE: CONTENT & INFO */}
        <div className="lg:col-span-7 space-y-8">
          <motion.div 
            className="space-y-6"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{
              visible: { transition: { staggerChildren: 0.15 } }
            }}
          >
            <motion.p 
              variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
              className="text-2xl md:text-3xl font-medium text-white leading-tight tracking-tight"
            >
              Bridging the gap between <span className="text-[#2ECC71]">Complex Logic</span> and <span className="text-[#2ECC71]">Intuitive Design</span>.
            </motion.p>

            <motion.p 
              variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
              className="text-gray-400 text-lg leading-relaxed"
            >
              I am Ayush Bhardwaj, a Software Developer at IIIT Kota. I specialize in the MERN stack and Next.js, 
              focusing on building products that aren't just functional, but memorable. My background in 
              Electronics & Communication gives me a unique perspective on system performance and optimization.
            </motion.p>
          </motion.div>

          {/* QUICK INFO CHIPS */}
          <div className="grid sm:grid-cols-2 gap-4">
            {["Based in Kota, India", "B.Tech in ECE @ IIIT Kota", "CGPA: 8.86", "3★ CodeChef Specialist"].map((fact, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ x: 5, backgroundColor: "rgba(255,255,255,0.08)" }}
                className="p-4 rounded-2xl bg-white/5 border border-white/10 flex items-center gap-3 text-gray-300 font-medium group transition-all"
              >
                <div className="w-2 h-2 rounded-full bg-[#2ECC71] group-hover:scale-150 transition-transform" />
                {fact}
              </motion.div>
            ))}
          </div>

          {/* TAGS */}
          <div className="flex flex-wrap gap-2 pt-2">
            {interests.map((tag, i) => (
              <motion.span
                key={tag}
                whileHover={{ scale: 1.05, backgroundColor: "rgba(46, 204, 113, 0.2)" }}
                className="px-4 py-2 rounded-full border border-white/10 bg-white/5 text-sm text-gray-400 cursor-default"
              >
                {tag}
              </motion.span>
            ))}
          </div>

          {/* ACTION BUTTONS WITH FILL ANIMATION */}
          <div className="flex flex-wrap gap-5 pt-4">
            <motion.a
              href={cvPdf}
              target="_blank"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="group relative overflow-hidden px-8 py-4 bg-white text-black rounded-2xl font-bold flex items-center gap-2 transition-all"
            >
              <span className="absolute inset-0 bg-[#2ECC71] translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
              <span className="relative z-10 flex items-center gap-2 group-hover:text-white transition-colors duration-300">
                Download CV <ArrowRight className="w-5 h-5" />
              </span>
            </motion.a>

            <motion.a
              href="#skills"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="group relative overflow-hidden px-8 py-4 bg-transparent text-white border border-white/20 rounded-2xl font-bold transition-all"
            >
              <span className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
              <span className="relative z-10 group-hover:text-black transition-colors duration-300">
                View My Skills
              </span>
            </motion.a>
          </div>
        </div>
      </div>

      {/* --- CODING ACHIEVEMENTS SECTION --- */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.7, delay: 0.2 }}
        className="relative overflow-hidden rounded-3xl border border-white/10 p-4 sm:p-5 md:p-6"
      >
        <div className="absolute inset-0 opacity-90">
          <ShapeBlur
            variation={0}
            pixelRatioProp={window.devicePixelRatio || 1}
            shapeSize={1}
            roundness={0.5}
            borderSize={0.05}
            circleSize={0.25}
            circleEdge={1}
          />
        </div>
        <div className="absolute inset-0 bg-black/35 backdrop-blur-md" />
        <div className="relative z-10">
        <div className="mb-10">
          <h3 className="text-4xl md:text-6xl font-black gradient-text tracking-tighter uppercase">
            Competitive Profiles
          </h3>
          <div className="h-1.5 w-28 bg-[#2ECC71] mt-3 rounded-full" />
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          <motion.a
            href={`https://leetcode.com/Ayush_Bh55/`}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, x: -35, scale: 0.98 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ duration: 0.55, delay: 0.15 }}
            whileHover={{ y: -8, scale: 1.01 }}
            className="group relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.08] to-white/[0.02] p-6 md:p-7 backdrop-blur-xl hover:border-[#2ECC71]/45 transition-all duration-400 hover:shadow-[0_18px_38px_rgba(46,204,113,0.2)]"
          >
            <motion.div
              className="absolute -inset-y-10 -left-1/3 w-1/3 bg-gradient-to-r from-transparent via-white/10 to-transparent"
              animate={{ x: ["0%", "360%"] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            />
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <img
                    src="https://cdn.simpleicons.org/leetcode/FFA116"
                    alt="LeetCode"
                    className="w-7 h-7"
                    loading="lazy"
                  />
                  <h4 className="text-3xl font-bold">LeetCode</h4>
                </div>
                <span className="text-[#2ECC71] text-sm font-semibold">@{leetcodeUsername}</span>
              </div>
              <p className="text-gray-400 leading-relaxed mb-6">
                Solving algorithmic challenges daily to sharpen problem-solving,
                logic building, and interview readiness for top product roles.
              </p>

              <div className="grid grid-cols-3 gap-3 mb-4">
                {[
                  { label: "Solved", value: `${leetSolved}+` },
                  { label: "Contest", value: `${leetContest}+` },
                  { label: "Rating", value: `${leetRating}+` },
                ].map((item) => (
                  <motion.div
                    key={item.label}
                    whileHover={{ y: -4, scale: 1.03 }}
                    className="rounded-xl border border-white/10 bg-white/5 p-3 text-center"
                  >
                    <p className="text-xl font-bold text-white">{item.value}</p>
                    <p className="text-[11px] uppercase tracking-wider text-gray-400">{item.label}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.a>

          <div className="space-y-4">
            {codingProfiles.map((item, index) => (
              <motion.a
                key={item.platform}
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, x: 35 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.45, delay: 0.2 + index * 0.12 }}
                whileHover={{ y: -6, scale: 1.01 }}
                className={`group block rounded-2xl border border-white/10 bg-white/[0.04] p-5 backdrop-blur-md transition-all duration-300 ${item.glow}`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-white/10 border border-white/10 flex items-center justify-center text-[#2ECC71] group-hover:scale-110 transition-transform">
                      <img
                        src={item.logo}
                        alt={item.platform}
                        className="w-5 h-5"
                        loading="lazy"
                      />
                    </div>
                    <div>
                      <p className="text-lg font-semibold">{item.platform}</p>
                      <p className="text-gray-300 text-sm">{item.stat}</p>
                      <p className="text-xs text-gray-500 mt-0.5">@{item.handle}</p>
                    </div>
                  </div>
                  <p className="text-xs text-gray-400">{item.detail}</p>
                </div>
              </motion.a>
            ))}
          </div>
        </div>
        </div>
      </motion.div>
    </div>
  );
};

export default About;