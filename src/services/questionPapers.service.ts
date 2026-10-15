import api from "./api";

class QuestionPapersService {
  async trackView(id: string): Promise<void> {
    try {
      await api.post(`/academic/question-papers/${id}/view`);
    } catch (error) {
      console.error("Error tracking view:", error);
      throw error;
    }
  }
}

export const questionPapersService = new QuestionPapersService();
