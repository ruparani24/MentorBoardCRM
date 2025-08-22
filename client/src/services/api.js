// src/services/api.js
let mentors = [{ name: "Alice", expertise: "AI" }];
let mentees = [{ name: "Bob", goal: "Get into Data Science" }];

const api = {
  get: async (url) => {
    if (url === "/stats") {
      return {
        data: {
          mentors: mentors.length,
          mentees: mentees.length,
          assignments: 0,
        },
      };
    }
    if (url === "/mentors") return { data: mentors };
    if (url === "/mentees") return { data: mentees };
    return { data: [] };
  },
  post: async (url, body) => {
    if (url === "/auth/login") {
      if (body.email === "admin@test.com" && body.password === "1234") {
        return { data: { token: "mock-token-123" } };
      }
      throw new Error("Invalid login");
    }
    if (url === "/mentors") {
      mentors.push(body);
      return { data: body };
    }
    if (url === "/mentees") {
      mentees.push(body);
      return { data: body };
    }
    return { data: {} };
  },
};

export default api;
