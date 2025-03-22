import type { Express } from "express";
import { createServer, type Server } from "http";
import express from "express";
import path from "path";
import { storage } from "./storage";

export async function registerRoutes(app: Express): Promise<Server> {
  // Create HTTP server
  const httpServer = createServer(app);
  
  // Serve static files from the public directory
  app.use(express.static(path.join(process.cwd(), "public")));

  // API route prefix
  const apiPrefix = "/api";

  // Get all projects
  app.get(`${apiPrefix}/projects`, async (req, res) => {
    console.log('[DEBUG] Projects endpoint called', {
      method: req.method,
      url: req.url,
      headers: req.headers,
      timestamp: new Date().toISOString()
    });

    try {
      console.log('[DEBUG] Calling storage.getAllProjects()');
      const projects = await storage.getAllProjects();
      
      console.log('[DEBUG] Projects response:', {
        count: projects?.length ?? 0,
        projectIds: projects?.map(p => p.id) ?? [],
        timestamp: new Date().toISOString()
      });

      if (!projects || projects.length === 0) {
        console.log('[DEBUG] No projects found in response');
        return res.json([]);
      }

      res.json(projects);
    } catch (error) {
      console.error('[DEBUG] Project fetch error:', {
        name: error.name,
        message: error.message,
        stack: error.stack,
        timestamp: new Date().toISOString()
      });
      
      res.status(500).json({ 
        error: "Failed to fetch projects",
        details: process.env.NODE_ENV === 'development' ? error.message : undefined
      });
    }
  });

  // Get featured projects
  app.get(`${apiPrefix}/projects/featured`, async (req, res) => {
    try {
      const featuredProjects = await storage.getFeaturedProjects();
      res.json(featuredProjects);
    } catch (error) {
      console.error("Error fetching featured projects:", error);
      res.status(500).json({ message: "Failed to fetch featured projects" });
    }
  });

  // Get a specific project
  app.get(`${apiPrefix}/projects/:id`, async (req, res) => {
    try {
      const projectId = parseInt(req.params.id);
      const project = await storage.getProject(projectId);
      
      if (!project) {
        return res.status(404).json({ message: "Project not found" });
      }
      
      res.json(project);
    } catch (error) {
      console.error(`Error fetching project ${req.params.id}:`, error);
      res.status(500).json({ message: "Failed to fetch project" });
    }
  });

  return httpServer;
}
