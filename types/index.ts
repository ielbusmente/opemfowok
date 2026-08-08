export type WorkExperience = {
  company: string;
  title: string;
  startDate: string;
  endDate: string;
  current: boolean;
  responsibilities: string;
};

export type Education = {
  degree: string;
  fieldOfStudy: string;
  institution: string;
  graduationYear: string;
};

export type ProfileRecord = {
  id: string;
  full_name: string | null;
  email: string | null;
  phone: string | null;
  location: string | null;
  current_title: string | null;
  experience_level: string | null;
  years_experience: number | null;
  skills: string[] | null;
  industries: string[] | null;
  work_experience: WorkExperience[] | null;
  education: Education | null;
  job_titles_seeking: string[] | null;
  remote_preference: string | null;
  preferred_locations: string[] | null;
  salary_expectation: string | null;
  cover_letter_tone: string | null;
  linkedin_url: string | null;
  portfolio_url: string | null;
  work_authorization: string | null;
  resume_pdf_url: string | null;
  is_complete: boolean;
};

export type ProfileCompletion = {
  percentage: number;
  missingFields: string[];
};

export function isProfileRecord(value: unknown): value is ProfileRecord {
  return typeof value === "object" && value !== null && "id" in value;
}

export const EMPTY_WORK_EXPERIENCE: WorkExperience = {
  company: "",
  title: "",
  startDate: "",
  endDate: "",
  current: false,
  responsibilities: "",
};

export const EMPTY_EDUCATION: Education = {
  degree: "",
  fieldOfStudy: "",
  institution: "",
  graduationYear: "",
};

export function calculateProfileCompletion(
  profile: Pick<
    ProfileRecord,
    | "full_name"
    | "phone"
    | "location"
    | "current_title"
    | "experience_level"
    | "years_experience"
    | "skills"
    | "work_experience"
    | "education"
    | "job_titles_seeking"
    | "remote_preference"
  >,
): ProfileCompletion {
  const firstRole = profile.work_experience?.[0];
  const groups = [
    ["FULL NAME", Boolean(profile.full_name?.trim())],
    ["PHONE", Boolean(profile.phone?.trim())],
    ["LOCATION", Boolean(profile.location?.trim())],
    [
      "PROFESSIONAL",
      Boolean(
        profile.current_title?.trim() &&
          profile.experience_level?.trim() &&
          profile.years_experience !== null,
      ),
    ],
    ["SKILLS", Boolean(profile.skills?.length)],
    [
      "WORK EXPERIENCE",
      Boolean(
        firstRole?.company.trim() &&
          firstRole.title.trim() &&
          firstRole.startDate.trim() &&
          firstRole.responsibilities.trim(),
      ),
    ],
    [
      "EDUCATION",
      Boolean(
        profile.education?.degree.trim() &&
          profile.education.fieldOfStudy.trim() &&
          profile.education.institution.trim() &&
          profile.education.graduationYear.trim(),
      ),
    ],
    [
      "JOB PREFERENCES",
      Boolean(profile.job_titles_seeking?.length && profile.remote_preference),
    ],
  ] as const;

  const missingFields = groups
    .filter(([, complete]) => !complete)
    .map(([label]) => label);

  return {
    percentage: Math.round(((groups.length - missingFields.length) / groups.length) * 100),
    missingFields,
  };
}
