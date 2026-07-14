export const siteConfig = {
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://kenji-mattos.vercel.app",
  brand: {
    logoText: "knji",
    ownerName: "Kenji Mattos Kinoshita",
  },
  profile: {
    githubUrl: "https://github.com/kenjimattos",
    linkedinUrl: "https://linkedin.com/in/kenjimattos",
    email: "kenjimattos@gmail.com",
    resumeUrl: "/resume.pdf",
  },
} as const;

