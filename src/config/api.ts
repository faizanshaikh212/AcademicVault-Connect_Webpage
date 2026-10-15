/**
 * API Endpoints configuration
 */

export const API_BASE_URL = "/api";

export const API_ENDPOINTS = {
  // Academic resources
  notes: `${API_BASE_URL}/academic/notes`,
  questionPapers: `${API_BASE_URL}/academic/question-papers`,
  syllabus: `${API_BASE_URL}/academic/syllabus`,
  timetables: `${API_BASE_URL}/academic/timetables`,
  // Other endpoints can be added here as needed
} as const;
