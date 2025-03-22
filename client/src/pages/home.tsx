import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { ProjectWithTechnologies } from "@shared/schema";
import ProjectCard from "@/components/project/ProjectCard";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

const Home = () => {
  const { data: featuredProjects, isLoading } = useQuery<ProjectWithTechnologies[]>({
    queryKey: ["/api/projects/featured"],
  });

  return (
    <section className="animate-fade-in">
      {/* Hero section */}
      <div className="flex flex-col md:flex-row gap-8 md:gap-12 pb-12 md:pb-20 border-b border-gray-200 dark:border-gray-800">
        <motion.div 
          className="flex-1 flex flex-col justify-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
            <span className="block">Hi, I'm Bruce Maber</span>
            <span className="text-primary block mt-2">Full Stack Developer</span>
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 mb-8 leading-relaxed">
            I build modern web applications with a focus on performance, user experience, and clean code. 
            Check out my projects and find out more about my journey in software development.
          </p>
          <div className="flex flex-wrap gap-3">
            <Button asChild>
              <Link href="/projects">
                View Projects
                <i className="fas fa-arrow-right ml-2"></i>
              </Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/about">
                About Me
              </Link>
            </Button>
          </div>
        </motion.div>
        <motion.div 
          className="flex-1 max-w-xs mx-auto md:max-w-sm"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="relative w-3/4 mx-auto">
            <div className="absolute -inset-1 bg-gradient-to-r from-primary to-purple-600 rounded-lg blur opacity-30"></div>
            <div className="relative aspect-square overflow-hidden rounded-lg bg-card border border-gray-200 dark:border-gray-800 shadow-md">
              <img 
                src="./images/bruce-profile.png" 
                alt="Bruce Maber" 
                className="object-cover w-full h-full"
              />
            </div>
          </div>
        </motion.div>
      </div>

      {/* Featured projects section */}
      <motion.div 
        className="pt-12 md:pt-20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl md:text-3xl font-bold">Featured Projects</h2>
          <Link 
            href="/projects" 
            className="text-primary hover:underline flex items-center text-sm font-medium"
          >
            View all
            <i className="fas fa-chevron-right ml-1 text-xs"></i>
          </Link>
        </div>
        
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map(i => (
              <div key={i} className="rounded-lg border border-gray-200 dark:border-gray-800 bg-card h-96 animate-pulse"></div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredProjects?.map(project => (
              <ProjectCard key={project.id} project={project} featured={true} />
            ))}
          </div>
        )}
      </motion.div>
    </section>
  );
};

export default Home;
