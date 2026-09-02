import express from "express";
import path from "path";
import fs from "fs";
import { createServer as createViteServer } from "vite";

interface Enquiry {
  id: string;
  timestamp: string;
  name: string;
  phone: string;
  email: string;
  service: string;
  preferredDate?: string;
  message?: string;
  concern?: string;
  goal?: string;
  preference?: string;
}

const enquiriesStore: Enquiry[] = [];

// Initialize with a realistic sample entry if empty so owner/test user can see spreadsheet integration right away
enquiriesStore.push({
  id: "enq-001",
  timestamp: new Date().toISOString(),
  name: "Sarah Jenkins",
  phone: "+44 7700 900123",
  email: "sarah.j@example.co.uk",
  service: "Dermatologist Consultation",
  preferredDate: "2026-09-10",
  message: "Interested in acne skin consultation with Dr. Homsi.",
  concern: "Acne",
  goal: "Treat",
  preference: "Comprehensive"
});

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Routes
  app.post("/api/enquiry", (req, res) => {
    try {
      const { name, phone, email, service, preferredDate, message, concern, goal, preference } = req.body;
      
      if (!name || !phone) {
        return res.status(400).json({ error: "Name and phone number are required." });
      }

      const newEnquiry: Enquiry = {
        id: `enq-${Date.now()}`,
        timestamp: new Date().toISOString(),
        name: String(name).trim(),
        phone: String(phone).trim(),
        email: String(email || "").trim(),
        service: String(service || "General Consultation").trim(),
        preferredDate: preferredDate ? String(preferredDate) : undefined,
        message: message ? String(message).trim() : undefined,
        concern: concern ? String(concern) : undefined,
        goal: goal ? String(goal) : undefined,
        preference: preference ? String(preference) : undefined,
      };

      enquiriesStore.unshift(newEnquiry);

      console.log("New booking enquiry received and appended to spreadsheet log:", newEnquiry);

      return res.status(200).json({
        success: true,
        message: "Enquiry submitted successfully! Dr. Homsi's team will contact you shortly.",
        enquiry: newEnquiry,
        totalEnquiries: enquiriesStore.length
      });
    } catch (err) {
      console.error("Error processing enquiry:", err);
      return res.status(500).json({ error: "Failed to submit enquiry." });
    }
  });

  // Endpoint to get all spreadsheet rows / enquiries
  app.get("/api/enquiries", (_req, res) => {
    res.json({
      success: true,
      columns: ["Timestamp", "Name", "Phone", "Email", "Service / Subject", "Preferred Date", "Concern", "Goal", "Preference", "Notes"],
      rows: enquiriesStore
    });
  });

  // Endpoint to download CSV spreadsheet for Google Sheets import
  app.get("/api/enquiries/csv", (_req, res) => {
    const headers = ["Timestamp", "Name", "Phone", "Email", "Service", "Preferred Date", "Concern", "Goal", "Preference", "Message"];
    const csvRows = [headers.join(",")];

    for (const enq of enquiriesStore) {
      const row = [
        `"${enq.timestamp}"`,
        `"${enq.name.replace(/"/g, '""')}"`,
        `"${enq.phone.replace(/"/g, '""')}"`,
        `"${enq.email.replace(/"/g, '""')}"`,
        `"${enq.service.replace(/"/g, '""')}"`,
        `"${(enq.preferredDate || '').replace(/"/g, '""')}"`,
        `"${(enq.concern || '').replace(/"/g, '""')}"`,
        `"${(enq.goal || '').replace(/"/g, '""')}"`,
        `"${(enq.preference || '').replace(/"/g, '""')}"`,
        `"${(enq.message || '').replace(/"/g, '""')}"`,
      ];
      csvRows.push(row.join(","));
    }

    res.setHeader("Content-Type", "text/csv");
    res.setHeader("Content-Disposition", 'attachment; filename="homsi_clinic_enquiries.csv"');
    res.send(csvRows.join("\n"));
  });

  // Serve Vite in development or static dist in production
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (_req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Homsi Clinic server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
