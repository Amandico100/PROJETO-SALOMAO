import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertLeadSchema } from "@shared/schema";
import { z } from "zod";
import { generateFullAudit } from "./god_mode";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  
  app.get("/api/god-mode-audit", generateFullAudit);
  
  app.post("/api/leads", async (req, res) => {
    try {
      const validatedData = insertLeadSchema.parse(req.body);
      
      const existingLead = await storage.getLeadByEmail(
        validatedData.email,
        validatedData.quizId
      );
      
      if (existingLead) {
        return res.status(200).json({
          success: true,
          message: "Lead already exists",
          lead: existingLead,
        });
      }
      
      const lead = await storage.createLead(validatedData);
      
      return res.status(201).json({
        success: true,
        message: "Lead captured successfully",
        lead,
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({
          success: false,
          message: "Validation error",
          errors: error.errors,
        });
      }
      
      console.error("Error creating lead:", error);
      return res.status(500).json({
        success: false,
        message: "Internal server error",
      });
    }
  });

  app.get("/api/leads/:quizId", async (req, res) => {
    try {
      const { quizId } = req.params;
      const leads = await storage.getLeadsByQuizId(quizId);
      
      return res.status(200).json({
        success: true,
        leads,
      });
    } catch (error) {
      console.error("Error fetching leads:", error);
      return res.status(500).json({
        success: false,
        message: "Internal server error",
      });
    }
  });

  return httpServer;
}
