import type { Express } from "express";
import { createServer, type Server } from "http";
import express from "express";
import path from "path";
import { readFile } from 'fs/promises';
import { storage } from "./storage";

export async function registerRoutes(app: Express): Promise<Server> {
  // Create HTTP server
  const httpServer = createServer(app);
  
  // Serve static files from the public directory
  app.use(express.static(path.join(process.cwd(), "public")));

  // API route prefix
  const apiPrefix = "/api";

  // Get home data
  app.get(`${apiPrefix}/home`, async (_req, res) => {
    try {
      const filePath = path.join(process.cwd(), 'server', 'data', 'home.json');
      console.log('Attempting to read file from:', filePath);
      
      const homeData = await readFile(filePath, 'utf-8');
      const parsedData = JSON.parse(homeData);
      console.log('Successfully loaded home data:', parsedData.featuredProjects?.length, 'featured projects found');
      
      res.json(parsedData);
    } catch (error) {
      console.error("Error fetching home data:", error);
      res.status(500).json({ message: "Failed to fetch home data" });
    }
  });

  // Get all projects
  app.get(`${apiPrefix}/projects`, async (req, res) => {
    try {
      const projects = await storage.getAllProjects();
      res.json(projects);
    } catch (error) {
      console.error("Error fetching projects:", error);
      res.status(500).json({ message: "Failed to fetch projects" });
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


