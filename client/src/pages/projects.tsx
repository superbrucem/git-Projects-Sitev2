import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { ProjectWithTechnologies } from "@shared/schema";
import ProjectCard from "@/components/project/ProjectCard";
import ProjectFilter from "@/components/project/ProjectFilter";
import { motion } from "framer-motion";

const Projects = () => {
  // Hardcoded test data
  const testProjects: ProjectWithTechnologies[] = [
    {
      id: 1,
      title: "Test Project 1",
      description: "A test project description",
      repoUrl: "https://github.com/test/project1",
      imageUrl: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97",
      stars: 10,
      forks: 5,
      views: 100,
      featured: true,
      updatedAt: new Date(),
      technologies: [
        { id: 1, projectId: 1, technology: "React", category: "frontend" },
        { id: 2, projectId: 1, technology: "Node.js", category: "backend" }
      ]
    },
    {
      id: 2,
      title: "Test Project 2",
      description: "Another test project description",
      repoUrl: "https://github.com/test/project2",
      imageUrl: "https://images.unsplash.com/photo-1575089976121-8ed7b2a54265",
      stars: 20,
      forks: 8,
      views: 150,
      featured: false,
      updatedAt: new Date(),
      technologies: [
        { id: 3, projectId: 2, technology: "TypeScript", category: "language" },
        { id: 4, projectId: 2, technology: "Express", category: "backend" }
      ]
    }
  ];

  // Simulate loading state
  const [isLoading, setIsLoading] = useState(true);
  const [projects, setProjects] = useState<ProjectWithTechnologies[]>([]);

  useEffect(() => {
    // Simulate API delay
    setTimeout(() => {
      setProjects(testProjects);
      setIsLoading(false);
    }, 1000);
  }, []);

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
      ) : (
        <div className="text-center py-8">
          <p className="text-gray-500 dark:text-gray-400">Failed to load projects.</p>
        </div>
      )}
    </motion.section>
  );
};

export default Projects;


/*

const Projects = () => {
  const { data: projects, isLoading } = useQuery<ProjectWithTechnologies[]>({
    queryKey: ["/api/projects"],
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
      ) : (
        <div className="text-center py-8">
          <p className="text-gray-500 dark:text-gray-400">Failed to load projects.</p>
        </div>
      )}
    </motion.section>
  );
};

export default Projects;
*/