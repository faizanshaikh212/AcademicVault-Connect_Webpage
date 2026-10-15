import { demoAcademicResources } from "./data/demoAcademicResources";
import { demoBlogs } from "./data/demoBlogs";
import { demoCommunityData } from "./data/demoCommunityData";
import { demoNews } from "./data/demoNews";
import { demoNotices } from "./data/demoNotices";
import { demoProjects } from "./data/demoProjects";
import { demoUsers } from "./data/demoUsers";

export function getDemoAccount(username: string) {
  return demoUsers.find((user) => user.username === username);
}

export function createDemoSeedData(
  initialSeedData: Record<string, any>,
): Record<string, any> {
  return {
    ...initialSeedData,
    ...demoCommunityData,
    ...demoAcademicResources,
    users: demoUsers,
    blogs: demoBlogs,
    projects: demoProjects,
    news: demoNews,
    notices: demoNotices,
    students: demoUsers.filter((user) => user.role.includes("student")),
  };
}
