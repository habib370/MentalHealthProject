// src/hooks/useMentalHealth.js
import { useState, useEffect, useCallback } from "react";
import { useMentalHealthService } from "../services/mentalHealthService";

export const useMentalHealth = () => {
  const [records, setRecords] = useState([]);
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState({ page: 1, limit: 20, total: 0, pages: 0 });

  const { submitCheckin, getRecords, getAnalyticsSummary, getRecordById, deleteRecord } = useMentalHealthService();

  // Clear error helper
  const clearError = () => setError(null);

  // Load analytics summary
  const loadAnalytics = useCallback(async () => {
    try {
      const result = await getAnalyticsSummary();
      if (result.success) {
        setAnalytics(result.data);
        return result.data;
      } else {
        setError(result.message);
        return null;
      }
    } catch (err) {
      setError(err.message);
      return null;
    }
  }, [getAnalyticsSummary]);

  // Load records page
  const loadRecords = useCallback(async (page = 1, limit = 20) => {
    setLoading(true);
    try {
      const result = await getRecords(page, limit);
      if (result.success) {
        setRecords(result.data.records || []);
        setPagination(result.data.pagination || { page, limit, total: 0, pages: 0 });
        return result.data;
      } else {
        setError(result.message);
        return null;
      }
    } catch (err) {
      setError(err.message);
      return null;
    } finally {
      setLoading(false);
    }
  }, [getRecords]);

  // Submit a check-in and refresh dashboard state
  const submitCheckinData = useCallback(async (data) => {
    setLoading(true);
    clearError();
    try {
      const result = await submitCheckin(data);
      if (result.success) {
        // Refresh analytics & records automatically on submit
        await Promise.all([loadAnalytics(), loadRecords(1, 5)]);
        return result;
      } else {
        setError(result.message);
        return result;
      }
    } catch (err) {
      setError(err.message);
      return { success: false, message: err.message };
    } finally {
      setLoading(false);
    }
  }, [submitCheckin, loadAnalytics, loadRecords]);

  // Get single record
  const getRecord = useCallback(async (recordId) => {
    try {
      const result = await getRecordById(recordId);
      return result;
    } catch (err) {
      setError(err.message);
      return { success: false, message: err.message };
    }
  }, [getRecordById]);

  // Delete a record
  const deleteRecordById = useCallback(async (recordId) => {
    try {
      const result = await deleteRecord(recordId);
      if (result.success) {
        await Promise.all([
          loadRecords(pagination.page, pagination.limit),
          loadAnalytics()
        ]);
      }
      return result;
    } catch (err) {
      setError(err.message);
      return { success: false, message: err.message };
    }
  }, [deleteRecord, loadRecords, loadAnalytics, pagination.page, pagination.limit]);

  // Initial fetch on mount
  useEffect(() => {
    const loadInitialData = async () => {
      setLoading(true);
      await Promise.all([
        loadAnalytics(),
        loadRecords(1, 5)
      ]);
      setLoading(false);
    };
    loadInitialData();
  }, [loadAnalytics, loadRecords]);

  return {
    records,
    analytics,
    loading,
    error,
    pagination,
    clearError,
    loadRecords,
    loadAnalytics,
    submitCheckin: submitCheckinData,
    getRecord,
    deleteRecord: deleteRecordById
  };
};