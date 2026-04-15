import { VercelLogo } from "@/components/TechLogos";
import { motion, AnimatePresence } from "framer-motion";
import Magnet from "@/components/Magnet";
import {
  MessageCircle,
  Copy,
  Check,
  FileDown,
  User,
} from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { useState, useEffect } from "react";
import useSWR from "swr";
import cvPdf from "@/assets/files/cv_pdf/Ayush_Resume.pdf";

const fetcher = async (url) => {
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`Request failed with status ${res.status}`);
  }
  return res.json();
};

const Home = () => {
  const [copied, setCopied] = useState(false);
  const [roleIndex, setRoleIndex] = useState(0);
  const [typedText, setTypedText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [projectCount, setProjectCount] = useState(0);
  const [linkedinCount, setLinkedinCount] = useState(0);
  const roles = [
    "I am a Software Developer",
    "I am a Competitive Programmer",
    "I am a Full Stack Developer",
  ];

  const email = "ayushbhardwajk@gmail.com";
  const whatsappNumber = "+917302439124";

  useEffect(() => {
    const currentRole = roles[roleIndex];
    const pauseDuration = 1300;
    let timeoutId;

    if (!isDeleting && typedText === currentRole) {
      timeoutId = setTimeout(() => setIsDeleting(true), pauseDuration);
    } else if (isDeleting && typedText === "") {
      setIsDeleting(false);
      setRoleIndex((prev) => (prev + 1) % roles.length);
    } else {
      const speed = isDeleting ? 45 : 85;
      timeoutId = setTimeout(() => {
        setTypedText((prev) =>
          isDeleting
            ? currentRole.slice(0, prev.length - 1)
            : currentRole.slice(0, prev.length + 1)
        );
      }, speed);
    }

    return () => clearTimeout(timeoutId);
  }, [typedText, isDeleting, roleIndex]);

  const { data: githubData } = useSWR(
    "https://api.github.com/users/ayushbhardwaj552",
    fetcher,
    { revalidateOnFocus: false, dedupingInterval: 60000 }
  );

  function formatRepoCount(count) { 
    if (count < 5) return count.toString();
    return `${Math.floor(count / 5) * 5}+`;
  }

  const githubRepos = githubData?.public_repos || 0;
  const linkedInFollowers = 4000;

  useEffect(() => {
    let frameId;
    const duration = 1800;
    const start = performance.now();

    const animateCounters = (timestamp) => {
      const progress = Math.min((timestamp - start) / duration, 1);
      const easedProgress = 1 - Math.pow(1 - progress, 3);

      setProjectCount(Math.round(githubRepos * easedProgress));
      setLinkedinCount(Math.round(linkedInFollowers * easedProgress));

      if (progress < 1) {
        frameId = requestAnimationFrame(animateCounters);
      }
    };

    frameId = requestAnimationFrame(animateCounters);
    return () => cancelAnimationFrame(frameId);
  }, [githubRepos]);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  const handleEmailClick = (e) => {
    if (window.innerWidth <= 640) {
      window.location.href = `mailto:${email}`;
      e.preventDefault();
    } else {
      copyToClipboard();
    }
  };

  const splitTypedText = () => {
    const prefix = "I am a ";
    if (typedText.startsWith(prefix)) {
      return {
        white: prefix,
        green: typedText.slice(prefix.length),
      };
    }
    return { white: typedText, green: "" };
  };

  const { white: whiteText, green: greenText } = splitTypedText();

  return (
    /* Changed items-center to md:items-start and added pt-32 for laptop view */
    <div className="min-h-screen flex items-center md:items-center justify-center px-5 sm:px-6 md:px-8 pt-20 md:pt-24 lg:pt-28 pb-10">
      <div className="text-center relative z-10 max-w-[1920px] mx-auto w-full">
        
        {/* Main Name Header - Adjusted leading and margin */}
        <motion.h1
          className="text-[12vw] sm:text-6xl md:text-8xl lg:text-[140px] leading-[1.2] md:leading-[1.1] lg:leading-[0.95] font-bold text-[#495057] tracking-tight uppercase"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <span className="block lg:inline">AYUSH</span>{" "}
          <span className="block lg:inline">BHARDWAJ</span>
        </motion.h1>

        {/* Content Section */}
        <div className="flex flex-col md:flex-row justify-between items-start gap-8 md:gap-16 w-full px-1 md:px-32 lg:px-36 pt-8 mb-12 mt-8 md:mt-12">
          
          {/* Left Side: Typewriter */}
          <div className="w-full md:w-[50%] flex items-center justify-start h-[50px] md:h-[100px]">
            <motion.h2
              className="text-2xl md:text-4xl lg:text-5xl font-bold tracking-tighter flex items-center text-left leading-tight"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <span className="text-white">{whiteText}</span>
              <span className="text-[#2ECC71]">{greenText}</span>
              <motion.span
                animate={{ opacity: [1, 0, 1] }}
                transition={{ duration: 0.9, repeat: Infinity, ease: "easeInOut" }}
                className="inline-block w-[2px] md:w-[3px] h-[25px] md:h-[45px] lg:h-[55px] bg-[#2ECC71] ml-2"
                aria-hidden="true"
              />
            </motion.h2>
          </div>

          {/* Right Side: Description */}
          <motion.p
            className="w-full md:w-[50%] text-base md:text-xl lg:text-2xl text-gray-400 text-left md:text-right leading-relaxed font-light"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Software Developer specializing in Full Stack Development with
            expertise in React.js, Node.js and modern Web Technologies.
          </motion.p>
        </div>

        {/* Action Buttons */}
        <motion.div
          className="flex flex-col items-center gap-4 sm:gap-6 mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <div className="flex flex-wrap justify-center gap-3 sm:gap-4">
            <Magnet padding={90} magnetStrength={2.6}>
              <a
                href={cvPdf}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2.5 md:px-6 md:py-3 bg-white text-black rounded-full text-sm md:text-base font-medium hover:bg-gray-100 transition-all flex items-center gap-2"
              >
                <FileDown className="w-4 h-4 md:w-5 md:h-5" aria-hidden="true" />
                Download CV
              </a>
            </Magnet>
            <Magnet padding={90} magnetStrength={2.6}>
              <a
                href="#about"
                className="px-5 py-2.5 md:px-6 md:py-3 bg-white/10 text-white rounded-full text-sm md:text-base font-medium hover:bg-white/20 transition-all flex items-center gap-2"
              >
                <User className="w-4 h-4 md:w-5 md:h-5" aria-hidden="true" />
                About Me
              </a>
            </Magnet>
          </div>

          <button
            onClick={handleEmailClick}
            className="group relative flex items-center gap-2 md:gap-20 py-1 px-4 text-gray-400 hover:text-white transition-all cursor-copy overflow-hidden max-w-full"
            aria-label={`Email: ${email}`}
          >
            <div className="hidden sm:flex absolute left-0 items-center">
              <VercelLogo className="w-3 text-gray-500 group-hover:text-white transition-colors" />
              <span className="text-lg font-mono ml-3">~</span>
            </div>
            <span className="text-sm md:text-base truncate">{email}</span>
            <div className="ml-1">
              {copied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />}
            </div>
          </button>
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          className="grid grid-cols-3 gap-4 md:gap-8 max-w-4xl mx-auto border-t border-white/5 pt-6 pb-4 md:pb-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <Magnet wrapperClassName="justify-self-center" padding={50} magnetStrength={2}>
            <motion.a href="https://github.com/ayushbhardwaj552" target="_blank" className="flex flex-col items-center group" whileHover={{ y: -5 }}>
              <FaGithub className="w-5 h-5 md:w-6 md:h-6 text-gray-500 group-hover:text-white transition-colors mb-2" />
              <span className="text-lg md:text-xl font-bold text-white">{formatRepoCount(projectCount)}</span>
              <span className="text-[10px] md:text-xs uppercase tracking-widest text-gray-500">Projects</span>
            </motion.a>
          </Magnet>

          <Magnet wrapperClassName="justify-self-center" padding={50} magnetStrength={2}>
            <motion.a href="https://www.linkedin.com/in/ayush-bharadwaj-8497562b5/" target="_blank" className="flex flex-col items-center group" whileHover={{ y: -5 }}>
              <FaLinkedin className="w-5 h-5 md:w-6 md:h-6 text-gray-500 group-hover:text-white transition-colors mb-2" />
              <span className="text-lg md:text-xl font-bold text-white">{linkedinCount}+</span>
              <span className="text-[10px] md:text-xs uppercase tracking-widest text-gray-500">Network</span>
            </motion.a>
          </Magnet>

          <Magnet wrapperClassName="justify-self-center" padding={50} magnetStrength={2}>
            <motion.a href={`https://wa.me/${whatsappNumber}`} target="_blank" className="flex flex-col items-center group" whileHover={{ y: -5 }}>
              <MessageCircle className="w-5 h-5 md:w-6 md:h-6 text-gray-500 group-hover:text-white transition-colors mb-2" />
              <span className="text-lg md:text-xl font-bold text-white">24/7</span>
              <span className="text-[10px] md:text-xs uppercase tracking-widest text-gray-500">Contact</span>
            </motion.a>
          </Magnet>
        </motion.div>
      </div>
    </div>
  );
};

export default Home;