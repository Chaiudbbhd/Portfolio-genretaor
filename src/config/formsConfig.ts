// src/config/formsConfig.ts
export const formsConfig = {
  3: {
    name: "Minimal Elegance",
    fields: [
      { type: "text", name: "name", label: "Your Name", required: true },
      { type: "file", name: "photo", label: "Upload Your Photo", required: true, accept: "image/*" },
      { type: "textarea", name: "about", label: "About You", required: true },
    ],
    accordions: [
      {
        title: "Social Links",
        content: "links",
      },
      {
        title: "Projects (3)",
        repeat: 3,
        fields: [
          { type: "text", name: "title", label: "Project Title" },
          { type: "file", name: "image", label: "Upload Project Screenshot", accept: "image/*" },
          { type: "text", name: "live", label: "Live Project URL" },
          { type: "text", name: "code", label: "Code Repository Link" },
        ],
      },
    ],
  },

  8: {
    name: "Blog Writer",
    fields: [
      { type: "text", name: "name", label: "Your Name", required: true },
      { type: "file", name: "photo", label: "Upload Your Photo", required: true, accept: "image/*" },
      { type: "file", name: "resume", label: "Upload Resume", accept: ".pdf,.doc,.docx" },
    ],
    accordions: [
      {
        title: "Social Links",
        content: "links",
      },
      {
        title: "Skills",
        fields: [
          { type: "textarea", name: "skills", label: "Technical Skills" },
          { type: "textarea", name: "techstack", label: "Tech Stack Known" },
        ],
      },
      {
        title: "Projects (6)",
        repeat: 6,
        fields: [
          { type: "text", name: "title", label: "Project Title" },
          { type: "file", name: "image", label: "Upload Project Screenshot", accept: "image/*" },
          { type: "text", name: "live", label: "Live Project URL" },
          { type: "text", name: "code", label: "Code Repository Link" },
        ],
      },
      {
        title: "Articles (6)",
        repeat: 6,
        fields: [
          { type: "file", name: "image", label: "Upload Article Image", accept: "image/*" },
          { type: "textarea", name: "content", label: "Article Content" },
        ],
      },
    ],
  },

  24: {
    name: "Gaming Vault",
    fields: [
      { type: "text", name: "name", label: "Your Name", required: true },
      { type: "file", name: "photo", label: "Upload Your Photo", required: true, accept: "image/*" },
      { type: "textarea", name: "about", label: "About You", required: true },
    ],
    accordions: [
      {
        title: "Social Links",
        content: "links",
      },
      {
        title: "Projects (3)",
        repeat: 3,
        fields: [
          { type: "text", name: "title", label: "Project Title" },
          { type: "file", name: "image", label: "Upload Project Screenshot", accept: "image/*" },
          { type: "text", name: "live", label: "Live Project URL" },
          { type: "text", name: "code", label: "Code Repository Link" },
        ],
      },
    ],
  },
};
