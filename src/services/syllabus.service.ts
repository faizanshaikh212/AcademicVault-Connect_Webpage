import api from "./api";

class SyllabusService {
  async trackView(id: string): Promise<void> {
    try {
      await api.post(`/academic/syllabus/${id}/view`);
    } catch (error) {
      console.error("Error tracking view:", error);
      throw error;
    }
  }
}

export const syllabusService = new SyllabusService();
