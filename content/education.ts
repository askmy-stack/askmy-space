export interface EducationEntry {
  school: string;
  degree: string;
  dates: string;
  location: string;
  details: readonly string[];
}

/** Synced to LinkedIn: https://linkedin.com/in/abhinaysai-kamineni */
export const education: readonly EducationEntry[] = [
  {
    school: "The George Washington University",
    degree: "M.S. Data Science",
    dates: "2024 to 2026",
    location: "Washington, DC",
    details: [
      "Global Leaders Award. 3.77 GPA.",
      "Deep learning and time-series modeling: LSTM, Mamba, MoE, Transformers.",
      "Ship work: 15+ architecture benchmarks on 916 hours of pediatric EEG; biomedical imaging detection pipelines.",
    ],
  },
  {
    school: "Savitribai Phule Pune University",
    degree: "B.E. Computer Engineering with Honors in Data Science",
    dates: "2019 to 2023",
    location: "Pune, India",
    details: [],
  },
] as const;
