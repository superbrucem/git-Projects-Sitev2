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
    const isProd = process.env.NODE_ENV === 'production';
    console.log(`[${isProd ? 'PROD' : 'DEV'}] Projects endpoint called`, {
      env: process.env.NODE_ENV,
      method: req.method,
      url: req.url,
      timestamp: new Date().toISOString()
    });

    try {
      const projects = await storage.getAllProjects();
      console.log(`[${isProd ? 'PROD' : 'DEV'}] Projects retrieved:`, {
        count: projects?.length,
        success: true
      });
      res.json(projects);
    } catch (error) {
      console.error(`[${isProd ? 'PROD' : 'DEV'}] Project fetch error:`, {
        name: error.name,
        message: error.message,
        stack: error.stack,
        timestamp: new Date().toISOString()
      });
      
      // Send more detailed error in production for debugging
      res.status(500).json({ 
        error: "Failed to fetch projects",
        details: error.message, // Temporarily enable error details in prod
        timestamp: new Date().toISOString()
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
