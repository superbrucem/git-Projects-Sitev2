import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { ProjectWithTechnologies } from "@shared/schema";
import ProjectCard from "@/components/project/ProjectCard";
import ProjectFilter from "@/components/project/ProjectFilter";
import { motion } from "framer-motion";

const Projects = () => {
  const { data: projects, isLoading, error } = useQuery<ProjectWithTechnologies[]>({
    queryKey: ["/api/projects"],
    onError: (error) => {
      console.error("[DEBUG] Projects fetch error:", error);
    }
  });

  const [filteredProjects, setFilteredProjects] = useState<ProjectWithTechnologies[]>([]);

  useEffect(() => {
    if (projects) {
      setFilteredProjects(projects);
    }
  }, [projects]);

  const handleFilteredProjectsChange = (filtered: ProjectWithTechnologies[]) => {
    setFilteredProjects(filtered);
  };

  return (
    <motion.section 
      className="max-w-4xl mx-auto"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <h1 className="text-3xl md:text-4xl font-bold mb-8">My Projects</h1>
      
      {isLoading ? (
        <div className="grid gap-6">
          <div className="h-16 bg-gray-100 dark:bg-gray-800 rounded-md animate-pulse"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="rounded-lg border border-gray-200 dark:border-gray-800 bg-card h-64 animate-pulse"></div>
            ))}
          </div>
        </div>
      ) : error ? (
        <div className="text-center py-8">
          <p className="text-gray-500 dark:text-gray-400">
            Failed to load projects: {(error as Error).message}
          </p>
        </div>
      ) : projects ? (
        <>
          <ProjectFilter 
            projects={projects} 
            onFilteredProjectsChange={handleFilteredProjectsChange} 
          />
          
          {filteredProjects.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-500 dark:text-gray-400">No projects match your criteria.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredProjects.map(project => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          )}
        </>
      ) : null}
    </motion.section>
  );
};

export default Projects;
