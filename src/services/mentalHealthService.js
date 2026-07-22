// src/services/mentalHealthService.js
import { useCallback } from "react";
import { useApi } from "../context/Api";

export const useMentalHealthService = () => {
  const api = useApi();

  // Submit daily activity check-in
  const submitCheckin = useCallback(
    async (checkinData) => {
      try {
        const response = await api.post("/api/mentalhealth/submit", checkinData);
        return response.data;
      } catch (error) {
        console.error("Submit check-in error:", error);
        return {
          success: false,
          message: error.response?.data?.message || error.message || "Failed to submit check-in"
        };
      }
    },
    [api]
  );

  // Get all historical records with analytics pagination
  const getRecords = useCallback(
    async (page = 1, limit = 20) => {
      try {
        const queryPage = encodeURIComponent(page);
        const queryLimit = encodeURIComponent(limit);
        const response = await api.get(`/api/mentalhealth/records?page=${queryPage}&limit=${queryLimit}`);
        return response.data;
      } catch (error) {
        console.error("Get records error:", error);
        return {
          success: false,
          message: error.response?.data?.message || error.message || "Failed to fetch records"
        };
      }
    },
    [api]
  );

  // Get analytics summary
  const getAnalyticsSummary = useCallback(
    async () => {
      try {
        const response = await api.get("/api/mentalhealth/analytics/summary");
        return response.data;
      } catch (error) {
        console.error("Get analytics error:", error);
        return {
          success: false,
          message: error.response?.data?.message || error.message || "Failed to fetch analytics"
        };
      }
    },
    [api]
  );

  // Get single record by ID
  const getRecordById = useCallback(
    async (recordId) => {
      try {
        const encodedId = encodeURIComponent(recordId);
        const response = await api.get(`/api/mentalhealth/record/${encodedId}`);
        return response.data;
      } catch (error) {
        console.error("Get record error:", error);
        return {
          success: false,
          message: error.response?.data?.message || error.message || "Failed to fetch record"
        };
      }
    },
    [api]
  );

  // Delete a record
  const deleteRecord = useCallback(
    async (recordId) => {
      try {
        const encodedId = encodeURIComponent(recordId);
        const response = await api.delete(`/api/mentalhealth/record/${encodedId}`);
        return response.data;
      } catch (error) {
        console.error("Delete record error:", error);
        return {
          success: false,
          message: error.response?.data?.message || error.message || "Failed to delete record"
        };
      }
    },
    [api]
  );

  return {
    submitCheckin,
    getRecords,
    getAnalyticsSummary,
    getRecordById,
    deleteRecord
  };
};