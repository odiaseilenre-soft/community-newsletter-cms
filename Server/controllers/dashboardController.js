import asyncHandler from "../utils/asyncHandler.js";

import { getDashboardStats } from '../services/dashboard/dashboardSarvice.js'

export const dashboardStats = asyncHandler(
  async (req, res) => {
    const stats = await getDashboardStats();

    res.status(200).json({
      success: true,
      data: stats,
    });
  }
);