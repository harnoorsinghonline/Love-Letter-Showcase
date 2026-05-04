import { Router, type Request, type Response } from "express";
import { logger } from "../lib/logger";

const router = Router();

// Store analytics events in memory (in production, use a database)
const analyticsEvents: Array<{
  type: string;
  timestamp: string;
  userAgent: string;
  referrer: string;
  deviceType: string;
  operatingSystem: string;
  browser: string;
  screenResolution: string;
  ipAddress: string;
  receivedAt: string;
}> = [];

// POST /api/analytics - Record analytics event
router.post("/analytics", (req: Request, res: Response): void => {
  try {
    const { type, timestamp, userAgent, referrer, deviceType, operatingSystem, browser, screenResolution } = req.body;

    if (!type || !timestamp) {
      res.status(400).json({
        error: "Missing required fields: type and timestamp",
      });
      return;
    }

    // Get IP address from request
    const ipAddress = 
      (req.headers['x-forwarded-for'] as string)?.split(',')[0]?.trim() ||
      (req.headers['x-real-ip'] as string) ||
      req.socket?.remoteAddress ||
      'Unknown';

    const event = {
      type,
      timestamp,
      userAgent: userAgent || 'Unknown',
      referrer: referrer || 'direct',
      deviceType: deviceType || 'Unknown',
      operatingSystem: operatingSystem || 'Unknown',
      browser: browser || 'Unknown',
      screenResolution: screenResolution || 'Unknown',
      ipAddress,
      receivedAt: new Date().toISOString(),
    };

    analyticsEvents.push(event);

    logger.info({
      message: "Analytics event recorded",
      event: {
        type,
        timestamp,
        referrer,
        deviceType,
        operatingSystem,
        ipAddress,
      },
    });

    res.status(200).json({
      success: true,
      message: "Event recorded",
      eventCount: analyticsEvents.length,
    });
  } catch (error) {
    logger.error({
      message: "Error processing analytics event",
      error: error instanceof Error ? error.message : String(error),
    });
    res.status(500).json({
      error: "Failed to record event",
    });
  }
});

// Middleware to check password for analytics endpoints
const checkAnalyticsPassword = (
  req: Request,
  res: Response,
  next: any
): void => {
  const password = req.query.password as string;
  
  // Allow requests from localhost without password for development
  const isLocalhost =
    req.hostname === "localhost" ||
    req.hostname === "127.0.0.1" ||
    req.ip === "::1" ||
    req.hostname.includes("localhost");

  if (!isLocalhost && password !== "priyalovesme") {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }

  next();
};

// GET /api/analytics - Get all analytics events
router.get("/analytics", checkAnalyticsPassword, (req: Request, res: Response): void => {
  res.status(200).json({
    events: analyticsEvents,
    total: analyticsEvents.length,
  });
});

// GET /api/analytics/summary - Get analytics summary
router.get(
  "/analytics/summary",
  checkAnalyticsPassword,
  (req: Request, res: Response): void => {
    const pageViews = analyticsEvents.filter((e) => e.type === "page_view");
    const referrers: Record<string, number> = {};
    const devices: Record<string, number> = {};
    const operatingSystems: Record<string, number> = {};
    const browsers: Record<string, number> = {};
    const times: string[] = [];

    pageViews.forEach((event) => {
      referrers[event.referrer] = (referrers[event.referrer] || 0) + 1;
      devices[event.deviceType] = (devices[event.deviceType] || 0) + 1;
      operatingSystems[event.operatingSystem] = (operatingSystems[event.operatingSystem] || 0) + 1;
      browsers[event.browser] = (browsers[event.browser] || 0) + 1;
      times.push(event.timestamp);
    });

    res.status(200).json({
      totalPageViews: pageViews.length,
      totalEvents: analyticsEvents.length,
      referrerBreakdown: referrers,
      deviceBreakdown: devices,
      osBreakdown: operatingSystems,
      browserBreakdown: browsers,
      pageViewTimes: times,
    });
  }
);

export default router;
