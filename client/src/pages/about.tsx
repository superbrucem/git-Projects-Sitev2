import { motion } from "framer-motion";

const About = () => {
  return (
    <motion.section 
      className="max-w-4xl mx-auto"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <h1 className="text-3xl md:text-4xl font-bold mb-8">About Me</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
        <div className="md:col-span-1">
          <div className="sticky top-24">
            <div className="aspect-square w-2/3 mx-auto overflow-hidden rounded-lg mb-6">
              <img 
                src="/images/bruce-profile.png" 
                alt="Bruce Maber" 
                className="w-full h-full object-cover"
              />
            </div>
            
            <div className="flex flex-wrap gap-3 mb-6">
              <a href="https://github.com/brucemaber" target="_blank" rel="noopener noreferrer" className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-primary hover:text-white transition-colors">
                <i className="fab fa-github"></i>
              </a>
              <a href="https://twitter.com/brucemaber" target="_blank" rel="noopener noreferrer" className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-primary hover:text-white transition-colors">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="https://linkedin.com/in/brucemaber" target="_blank" rel="noopener noreferrer" className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-primary hover:text-white transition-colors">
                <i className="fab fa-linkedin-in"></i>
              </a>
              <a href="mailto:bruce@example.com" className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-primary hover:text-white transition-colors">
                <i className="fas fa-envelope"></i>
              </a>
            </div>
            
            <a href="/resume.pdf" className="inline-flex items-center justify-center w-full rounded-md bg-primary text-white px-4 py-2.5 text-sm font-medium shadow-sm hover:bg-primary/90 transition-colors">
              <i className="fas fa-download mr-2"></i> Download Resume
            </a>
          </div>
        </div>
        
        <div className="md:col-span-2">
          <div className="prose prose-lg dark:prose-invert max-w-none">
            <p className="text-lg mb-6">
              Hi there! I'm Bruce Maber, a full-stack developer with 5+ years of experience building web applications. I specialize in React, Next.js, Node.js, and modern JavaScript frameworks.
            </p>
            
            <p className="mb-6">
              My journey in software development began during my computer science studies at University of Technology, where I discovered my passion for creating intuitive and efficient web experiences. Since then, I've worked with startups and established companies to deliver high-quality software solutions.
            </p>
            
            <p className="mb-6">
              I'm passionate about open source and regularly contribute to various projects. When I'm not coding, you can find me hiking, reading tech blogs, or experimenting with new technologies.
            </p>
            
            <h2 className="text-2xl font-bold mt-8 mb-4">Skills</h2>
            
            <div className="mb-8">
              <h3 className="text-lg font-medium mb-3">Frontend</h3>
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1.5 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300">React</span>
                <span className="px-3 py-1.5 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300">Next.js</span>
                <span className="px-3 py-1.5 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300">TypeScript</span>
                <span className="px-3 py-1.5 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300">JavaScript</span>
                <span className="px-3 py-1.5 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300">HTML/CSS</span>
                <span className="px-3 py-1.5 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300">Tailwind CSS</span>
                <span className="px-3 py-1.5 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300">Redux</span>
              </div>
            </div>
            
            <div className="mb-8">
              <h3 className="text-lg font-medium mb-3">Backend</h3>
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1.5 rounded-full bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300">Node.js</span>
                <span className="px-3 py-1.5 rounded-full bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300">Express</span>
                <span className="px-3 py-1.5 rounded-full bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300">MongoDB</span>
                <span className="px-3 py-1.5 rounded-full bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300">PostgreSQL</span>
                <span className="px-3 py-1.5 rounded-full bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300">GraphQL</span>
                <span className="px-3 py-1.5 rounded-full bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300">REST APIs</span>
                <span className="px-3 py-1.5 rounded-full bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300">Firebase</span>
              </div>
            </div>
            
            <div className="mb-8">
              <h3 className="text-lg font-medium mb-3">Tools & Other</h3>
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1.5 rounded-full bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300">Git</span>
                <span className="px-3 py-1.5 rounded-full bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300">Docker</span>
                <span className="px-3 py-1.5 rounded-full bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300">AWS</span>
                <span className="px-3 py-1.5 rounded-full bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300">Vercel</span>
                <span className="px-3 py-1.5 rounded-full bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300">CI/CD</span>
                <span className="px-3 py-1.5 rounded-full bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300">Jest</span>
                <span className="px-3 py-1.5 rounded-full bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300">Figma</span>
              </div>
            </div>
            
            <h2 className="text-2xl font-bold mt-8 mb-4">Experience</h2>
            
            <div className="mb-8">
              <div className="flex justify-between mb-1">
                <h3 className="text-lg font-medium">Senior Frontend Developer</h3>
                <span className="text-sm text-gray-600 dark:text-gray-400">2021 - Present</span>
              </div>
              <p className="text-primary mb-2">TechCorp Inc.</p>
              <p className="text-gray-600 dark:text-gray-400">
                Leading the frontend development team in building a SaaS platform using React, Next.js, and TypeScript. Implemented CI/CD pipelines and improved performance by 40%.
              </p>
            </div>
            
            <div className="mb-8">
              <div className="flex justify-between mb-1">
                <h3 className="text-lg font-medium">Full Stack Developer</h3>
                <span className="text-sm text-gray-600 dark:text-gray-400">2018 - 2021</span>
              </div>
              <p className="text-primary mb-2">StartupX</p>
              <p className="text-gray-600 dark:text-gray-400">
                Developed and maintained multiple web applications using React, Node.js, and MongoDB. Collaborated with designers and product managers to deliver features on time.
              </p>
            </div>
            
            <div className="mb-8">
              <div className="flex justify-between mb-1">
                <h3 className="text-lg font-medium">Junior Developer</h3>
                <span className="text-sm text-gray-600 dark:text-gray-400">2016 - 2018</span>
              </div>
              <p className="text-primary mb-2">WebDev Agency</p>
              <p className="text-gray-600 dark:text-gray-400">
                Created responsive websites for clients using HTML, CSS, JavaScript, and WordPress. Worked in an agile environment with weekly sprints.
              </p>
            </div>
            
            <h2 className="text-2xl font-bold mt-8 mb-4">Education</h2>
            
            <div className="mb-8">
              <div className="flex justify-between mb-1">
                <h3 className="text-lg font-medium">BSc in Computer Science</h3>
                <span className="text-sm text-gray-600 dark:text-gray-400">2012 - 2016</span>
              </div>
              <p className="text-primary">University of Technology</p>
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default About;
