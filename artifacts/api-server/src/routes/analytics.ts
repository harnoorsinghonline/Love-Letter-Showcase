import { Router, type Request, type Response } from "express";
import { logger } from "../lib/logger";

const router = Router();

// Store analytics events in memory (in production, use a database)
const analyticsEvents: Array<{
  type: string;
  timestamp: string;
  userAgent: string;
  referrer: string;
  receivedAt: string;
}> = [];

// POST /api/analytics - Record analytics event
router.post("/analytics", (req: Request, res: Response): void => {
  try {
    const { type, timestamp, userAgent, referrer } = req.body;

    if (!type || !timestamp) {
      res.status(400).json({
        error: "Missing required fields: type and timestamp",
      });
      return;
    }

    const event = {
      type,
      timestamp,
      userAgent,
      referrer,
      receivedAt: new Date().toISOString(),
    };

    analyticsEvents.push(event);

    logger.info({
      message: "Analytics event recorded",
      event: {
        type,
        timestamp,
        referrer,
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

// GET /api/analytics - Get all analytics events
router.get("/analytics", (req: Request, res: Response): void => {
  res.status(200).json({
    events: analyticsEvents,
    total: analyticsEvents.length,
  });
});

// GET /api/analytics/summary - Get analytics summary
router.get("/analytics/summary", (req: Request, res: Response): void => {
  const pageViews = analyticsEvents.filter((e) => e.type === "page_view");
  const referrers: Record<string, number> = {};
  const times: string[] = [];

  pageViews.forEach((event) => {
    referrers[event.referrer] = (referrers[event.referrer] || 0) + 1;
    times.push(event.timestamp);
  });

  res.status(200).json({
    totalPageViews: pageViews.length,
    totalEvents: analyticsEvents.length,
    referrerBreakdown: referrers,
    pageViewTimes: times,
  });
});

export default router;

