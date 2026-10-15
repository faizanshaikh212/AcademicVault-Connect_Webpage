import type {
  AxiosAdapter,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";
import { AxiosError } from "axios";
import { getDemoUser } from "./demoMode";
import { createDemoSeedData } from "./demoSeedData";

const demoReferenceDate = "2025-04-01T12:00:00.000Z";
const sampleAuthor = {
  _id: "demo-mode-admin",
  username: "john.admin",
  firstName: "Mode",
  lastName: "Admin",
  profile: { avatar: "/assets/study-community.png" },
  premium: { isPremium: false },
};

const initialSeedData = {
  blogs: [],
  projects: [],
  news: [],
  notices: [],
  users: [],
  notes: [],
  questionPapers: [],
  syllabus: [],
  timetables: [],
  courses: [],
  students: [],
  roleRequests: [],
  premiumRequests: [],
  subscribers: [],
  contacts: [
    {
      _id: "contact-1",
      name: "Sample Visitor",
      email: "visitor@example.edu",
      subject: "Resource suggestion",
      message: "Could you add more first-year study resources?",
      status: "new",
      createdAt: demoReferenceDate,
    },
  ],
  notifications: [],
};

type DemoData = {
  [Key in keyof typeof initialSeedData]: Record<string, any>[];
};

const seedData = createDemoSeedData(initialSeedData) as DemoData;
const STORAGE_KEY = "academic-vault-demo-data-v20";

function loadData(): DemoData {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) return { ...structuredClone(seedData), ...JSON.parse(saved) };
  } catch (error) {
    console.warn("Could not read saved demo data; using the sample data.", error);
  }
  return structuredClone(seedData);
}

function saveData(data: DemoData): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (error) {
    console.warn("Could not save demo changes in this browser.", error);
  }
}

const recordsFor = (data: DemoData, key: string): Record<string, unknown>[] =>
  (data[key as keyof DemoData] as Record<string, unknown>[] | undefined) ?? [];

function resourceResponse(items: Record<string, unknown>[]) {
  return {
    success: true,
    data: items,
    pagination: { page: 1, limit: items.length, total: items.length, pages: 1 },
  };
}

function getResponse(path: string, data: DemoData, config: InternalAxiosRequestConfig) {
  const route = path.replace(/^\/+/, "").replace(/\/+$/, "");
  const query = (config.params ?? {}) as Record<string, string | number | boolean>;
  if (route === "news/subscribers") return data.subscribers;
  if (route.startsWith("news/check-subscription/") || route === "news/subscription-status") {
    return { isSubscribed: true, isActive: true };
  }
  if (route === "notifications" || route === "notifications/history") {
    return data.notifications;
  }
  if (route === "admin/content/blogs") return data.blogs;
  if (route === "admin/content/projects") return data.projects;
  if (route === "users/me") {
    return getDemoUser() ?? data.users[0];
  }
  if (route === "users/all" || route === "admin/users") return data.users;
  const userPosts = route.match(/^(blogs|projects)\/user\/([^/]+)$/);
  if (userPosts) {
    const [, collection, userId] = userPosts;
    return recordsFor(data, collection).filter(
      (record) => (record.author as Record<string, unknown> | undefined)?._id === decodeURIComponent(userId),
    );
  }
  const collections: Record<string, string> = {
    blogs: "blogs",
    projects: "projects",
    news: "news",
    notices: "notices",
    courses: "courses",
    students: "students",
    "academic/notes": "notes",
    "academic/question-papers": "questionPapers",
    "academic/syllabus": "syllabus",
    "academic/timetables": "timetables",
  };

  for (const [endpoint, key] of Object.entries(collections)) {
    if (route === endpoint || route.startsWith(`${endpoint}/`)) {
      const records = recordsFor(data, key);
      const id = route.slice(endpoint.length + 1).split("/")[0];
      const item = id && id !== "active" && id !== "categories"
        ? records.find((record) => record._id === decodeURIComponent(id))
        : undefined;
      if (route.includes("/categories")) {
        const categoryParts = route.split("/categories/")[1]?.split("/");
        if (categoryParts?.[1]) return { success: true, data: { "Semester 4": records } };
        return { success: true, data: ["Computer Science", "Applied Mathematics"] };
      }
      if (item) {
        return endpoint.startsWith("academic/")
          ? { success: true, data: item }
          : item;
      }
      if (id && route.split("/").length === 2) return null;
      if (route.endsWith("/active")) return resourceResponse(records);
      if (endpoint.startsWith("academic/")) {
        const filtered = records.filter((record) => {
          const search = String(query.keyword ?? query.search ?? "").trim().toLowerCase();
          const matchesSearch =
            !search ||
            ["title", "description", "subject", "course"].some((field) =>
              String(record[field] ?? "").toLowerCase().includes(search)
            );
          const matchesFilters = [
            "course",
            "subject",
            "semester",
            "academicYear",
            "degreeType",
            "examYear",
            "examType",
            "timetableType",
            "isActive",
          ].every((field) => {
            const value = query[field];
            if (value === undefined || value === null || value === "") return true;
            if (record[field] === undefined) return true;
            return String(record[field]).toLowerCase() === String(value).toLowerCase();
          });
          return matchesSearch && matchesFilters;
        });
        return resourceResponse(filtered);
      }
      return records;
    }
  }

  if (route === "admin/stats") {
    return {
      totalUsers: data.users.length,
      totalProjects: data.projects.length,
      totalBlogs: data.blogs.length,
      totalNews: data.news.length,
      pendingRoleRequests: data.roleRequests.length,
      pendingPremiumRequests: data.premiumRequests.length,
      premiumUsers: data.users.filter(
        (user) => (user.premium as { isPremium?: boolean })?.isPremium,
      ).length,
      teacherUsers: data.users.filter((user) =>
        (user.role as string[]).includes("teacher"),
      ).length,
    };
  }
  if (route === "academic/analytics/overview") {
    return { success: true, data: { totalNotes: data.notes.length, totalQuestionPapers: data.questionPapers.length, totalSyllabus: data.syllabus.length, totalTimetables: data.timetables.length } };
  }
  if (route === "academic/pending-approvals") {
    return resourceResponse([...data.notes, ...data.questionPapers, ...data.syllabus, ...data.timetables].filter((item) => !item.isApproved));
  }
  if (route === "academic/search") {
    const term = String(query.q ?? "").toLowerCase();
    const hits = [...data.notes, ...data.questionPapers, ...data.syllabus, ...data.timetables].filter((item) => String(item.title).toLowerCase().includes(term));
    return { success: true, data: { notes: hits, questionPapers: hits, syllabus: hits, timetables: hits } };
  }
  if (route === "admin/premium-users") return data.users.filter((user) => (user.premium as { isPremium?: boolean })?.isPremium);
  if (route === "admin/rolerequests") return data.roleRequests;
  if (route === "admin/premium-requests") return data.premiumRequests;
  if (route === "news/all") return data.news;
  if (route === "notices/all") return data.notices;
  if (route === "contact/all") return data.contacts;
  if (route === "auth/sessions") return [{ _id: "session-demo", current: true, createdAt: demoReferenceDate, device: "This browser" }];
  if (route.startsWith("users/")) {
    const username = route.split("/")[1];
    return data.users.find((user) => user.username === username || user._id === username) ?? data.users[0];
  }
  if (route.startsWith("pages/")) {
    const title = route.split("/")[1]?.replace(/-/g, " ") ?? "About Academic Vault";
    return { title, content: `Welcome to the Academic Vault demo. This sample ${title} page is available entirely in your browser.` };
  }
  if (route === "admin/stats") return {};
  return {};
}

function mutate(path: string, method: string, data: DemoData, body: unknown) {
  const route = path.replace(/^\/+/, "").replace(/\/+$/, "");
  if (route === "auth/login" || route === "auth/register" || route === "auth/verify-2fa-login") {
    const user = getDemoUser() ?? getDemoUser("student");
    localStorage.setItem("academic-vault-demo-mode", "student");
    return { ...user, token: "academic-vault-demo-token" };
  }
  if (route === "upload") {
    return { filePath: "/assets/academic-books.png", url: "/assets/academic-books.png" };
  }
  const segments = route.split("/");
  const collectionNames: Record<string, keyof DemoData> = {
    blogs: "blogs",
    projects: "projects",
    news: "news",
    notices: "notices",
    "academic/notes": "notes",
    "academic/question-papers": "questionPapers",
    "academic/syllabus": "syllabus",
    "academic/timetables": "timetables",
  };
  const collectionPath = segments.slice(0, 2).join("/");
  const key = collectionNames[collectionPath] ?? collectionNames[segments[0]];
  const recordId = segments[key && collectionPath === segments[0] ? 1 : 2];
  const recordSet = key ? recordsFor(data, key) : [];
  const input = body && typeof body === "object" ? body as Record<string, unknown> : {};
  const existing = recordId ? recordSet.find((record) => record._id === recordId) : undefined;

  if (key && method === "POST" && !recordId) {
    const author = getDemoUser() ?? sampleAuthor;
    const created = {
      ...input,
      _id: `demo-${Date.now()}`,
      createdAt: new Date().toISOString(),
      author,
      uploader: author,
      uploadedBy: author,
      tags: Array.isArray(input.tags) ? input.tags : [],
    };
    recordSet.unshift(created);
    saveData(data);
    return { success: true, data: created };
  }
  if (key && existing && method === "DELETE") {
    const next = recordSet.filter((record) => record._id !== recordId);
    (data[key] as Record<string, unknown>[]) = next;
    saveData(data);
    return { success: true, data: null };
  }
  if (key && existing && (route.endsWith("/view") || route.endsWith("/download"))) {
    const countKey = route.endsWith("/view") ? "viewCount" : "downloadCount";
    existing[countKey] = Number(existing[countKey] ?? 0) + 1;
    saveData(data);
    return {
      success: true,
      downloadUrl: String(existing.downloadUrl ?? existing.publicUrl ?? existing.fileUrl ?? ""),
      data: existing,
    };
  }
  if (key && existing && ["PUT", "PATCH", "POST"].includes(method)) {
    Object.assign(existing, input);
    if (route.endsWith("/approve")) {
      existing.status = "Approved";
      existing.isApproved = true;
    }
    if (route.endsWith("/reject")) {
      existing.status = "Rejected";
      existing.isApproved = false;
    }
    saveData(data);
    return { success: true, data: existing };
  }
  if (route.includes("subscribe")) return { success: true, message: "Subscription saved for this demo." };
  return { success: true, data: input };
}

function resolvePath(config: InternalAxiosRequestConfig): string {
  const url = config.url ?? "/";
  if (/^https?:\/\//i.test(url)) return new URL(url).pathname;
  return url.split("?")[0].replace(/^\/api(?=\/)/, "") || "/";
}

export const demoApiAdapter: AxiosAdapter = async (config) => {
  const data = loadData();
  const path = resolvePath(config);
  const method = (config.method ?? "get").toUpperCase();
  let body: unknown;
  if (typeof config.data === "string") {
    try {
      body = JSON.parse(config.data);
    } catch {
      body = {};
    }
  } else {
    body = config.data;
  }

  let responseData: unknown;
  if (method === "GET" || method === "HEAD") {
    responseData = getResponse(path, data, config);
  } else {
    const route = path.replace(/^\/+/, "").replace(/\/+$/, "");
    const currentUser = getDemoUser();
    const roles = currentUser?.role ?? [];
    const isCreatingNews = method === "POST" && route === "news/create";
    const isCreatingNotice = method === "POST" && route === "notices/create";
    if (isCreatingNews && !roles.includes("admin")) {
      const message = "Only administrators can publish news.";
      const response: AxiosResponse = {
        data: { message },
        status: 403,
        statusText: "Forbidden",
        headers: {},
        config,
      };
      throw new AxiosError(message, AxiosError.ERR_BAD_REQUEST, config, undefined, response);
    } else if (isCreatingNotice && !roles.includes("teacher")) {
      const message = "Only teachers can publish notices.";
      const response: AxiosResponse = {
        data: { message },
        status: 403,
        statusText: "Forbidden",
        headers: {},
        config,
      };
      throw new AxiosError(message, AxiosError.ERR_BAD_REQUEST, config, undefined, response);
    } else {
      responseData = mutate(path, method, data, body);
    }
  }

  const response: AxiosResponse = {
    data: responseData,
    status: 200,
    statusText: "OK",
    headers: {},
    config,
  };
  return response;
};

export function resetDemoData(): void {
  localStorage.removeItem(STORAGE_KEY);
}
