import { 
  users, 
  projects, 
  projectTechnologies, 
  type User, 
  type InsertUser, 
  type Project, 
  type InsertProject,
  type ProjectTechnology,
  type InsertProjectTechnology,
  type ProjectWithTechnologies
} from "@shared/schema";

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Project CRUD operations
  getAllProjects(): Promise<ProjectWithTechnologies[]>;
  getFeaturedProjects(): Promise<ProjectWithTechnologies[]>;
  getProject(id: number): Promise<ProjectWithTechnologies | undefined>;
  createProject(project: InsertProject): Promise<Project>;
  updateProject(id: number, project: Partial<InsertProject>): Promise<Project | undefined>;
  deleteProject(id: number): Promise<boolean>;
  
  // Project Technology operations
  addTechnologyToProject(technology: InsertProjectTechnology): Promise<ProjectTechnology>;
  getTechnologiesForProject(projectId: number): Promise<ProjectTechnology[]>;
  deleteTechnologyFromProject(id: number): Promise<boolean>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private projects: Map<number, Project>;
  private projectTechnologies: Map<number, ProjectTechnology>;
  currentUserId: number;
  currentProjectId: number;
  currentTechnologyId: number;

  constructor() {
    this.users = new Map();
    this.projects = new Map();
    this.projectTechnologies = new Map();
    this.currentUserId = 1;
    this.currentProjectId = 1;
    this.currentTechnologyId = 1;
    
    console.log('[DEBUG] MemStorage initialized');
    this.initDemoProjects();
    console.log('[DEBUG] Demo projects count:', this.projects.size);
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async getAllProjects(): Promise<ProjectWithTechnologies[]> {
    console.log('[DEBUG] Getting all projects');
    console.log('[DEBUG] Current projects in storage:', {
      size: this.projects.size,
      keys: Array.from(this.projects.keys()),
      projects: Array.from(this.projects.values())
    });
    
    try {
      const projectsArray = Array.from(this.projects.values());
      console.log('[DEBUG] Projects array length:', projectsArray.length);
      
      const projectsWithTech = await Promise.all(
        projectsArray.map(async (project) => {
          const technologies = await this.getTechnologiesForProject(project.id);
          console.log('[DEBUG] Technologies for project', project.id, ':', technologies);
          return { ...project, technologies };
        })
      );
      
      console.log('[DEBUG] Final projects with technologies:', projectsWithTech);
      return projectsWithTech;
    } catch (error) {
      console.error('[DEBUG] Error in getAllProjects:', error);
      throw error;
    }
  }

  async getFeaturedProjects(): Promise<ProjectWithTechnologies[]> {
    const projectsArray = Array.from(this.projects.values()).filter(project => project.featured);
    return Promise.all(
      projectsArray.map(async (project) => {
        const technologies = await this.getTechnologiesForProject(project.id);
        return { ...project, technologies };
      })
    );
  }

  async getProject(id: number): Promise<ProjectWithTechnologies | undefined> {
    const project = this.projects.get(id);
    if (!project) return undefined;
    
    const technologies = await this.getTechnologiesForProject(id);
    return { ...project, technologies };
  }

  async createProject(insertProject: InsertProject): Promise<Project> {
    const id = this.currentProjectId++;
    const project: Project = { 
      ...insertProject, 
      id, 
      updatedAt: new Date(),
      stars: insertProject.stars || 0,
      forks: insertProject.forks || 0,
      views: insertProject.views || 0,
      featured: insertProject.featured || false
    };
    this.projects.set(id, project);
    return project;
  }

  async updateProject(id: number, projectUpdate: Partial<InsertProject>): Promise<Project | undefined> {
    const project = this.projects.get(id);
    if (!project) return undefined;
    
    const updatedProject: Project = { 
      ...project, 
      ...projectUpdate, 
      updatedAt: new Date() 
    };
    this.projects.set(id, updatedProject);
    return updatedProject;
  }

  async deleteProject(id: number): Promise<boolean> {
    return this.projects.delete(id);
  }

  async addTechnologyToProject(insertTechnology: InsertProjectTechnology): Promise<ProjectTechnology> {
    const id = this.currentTechnologyId++;
    const technology: ProjectTechnology = { ...insertTechnology, id };
    this.projectTechnologies.set(id, technology);
    return technology;
  }

  async getTechnologiesForProject(projectId: number): Promise<ProjectTechnology[]> {
    return Array.from(this.projectTechnologies.values())
      .filter(tech => tech.projectId === projectId);
  }

  async deleteTechnologyFromProject(id: number): Promise<boolean> {
    return this.projectTechnologies.delete(id);
  }

  private initDemoProjects() {
    console.log('[DEBUG] Initializing demo projects');
    // Log your demo project initialization
    try {
      // Add a sample project
      const demoProject = {
        id: this.currentProjectId++,
        title: "Test Project",
        description: "A test project",
        featured: true,
        // Add other required fields
      };
      this.projects.set(demoProject.id, demoProject);
      console.log('[DEBUG] Added demo project:', demoProject);
    } catch (error) {
      console.error('[DEBUG] Failed to init demo projects:', error);
    }
  }
}

export const storage = new MemStorage();
