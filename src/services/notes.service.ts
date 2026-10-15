import api from "./api";

class NotesService {
  async trackView(id: string): Promise<void> {
    try {
      await api.post(`/academic/notes/${id}/view`);
    } catch (error) {
      console.error("Error tracking view:", error);
      throw error;
    }
  }
}

export const notesService = new NotesService();
