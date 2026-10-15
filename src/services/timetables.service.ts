import api from "./api";

class TimetablesService {
  async trackView(id: string): Promise<void> {
    try {
      await api.post(`/academic/timetables/${id}/view`);
    } catch (error) {
      console.error("Error tracking view:", error);
      throw error;
    }
  }
}

export const timetablesService = new TimetablesService();
