"use client";

import { useActionState, useCallback, useEffect, useRef, useState } from "react";
import posthog from "posthog-js";
import { saveProfile, type SaveProfileResult } from "@/actions/profile";
import { EducationSection } from "@/components/profile/EducationSection";
import { JobPreferencesSection } from "@/components/profile/JobPreferencesSection";
import { PersonalInfoSection } from "@/components/profile/PersonalInfoSection";
import { ProfileAttentionBanner } from "@/components/profile/ProfileAttentionBanner";
import { ProfessionalInfoSection } from "@/components/profile/ProfessionalInfoSection";
import { ResumeUpload } from "@/components/profile/ResumeUpload";
import { WorkExperienceSection } from "@/components/profile/WorkExperienceSection";
import { EMPTY_WORK_EXPERIENCE, type ProfileRecord, type WorkExperience } from "@/types";

type ProfileFormProps = {
  email: string;
  userId: string;
  profile: ProfileRecord | null;
};

const initialState: SaveProfileResult = { success: false };

function SectionHeading({ title, description }: { title: string; description?: string }) {
  return (
    <div className="border-b border-border-light pb-4">
      <h2 className="text-base font-semibold text-text-primary">{title}</h2>
      {description ? <p className="mt-1 text-xs text-text-secondary">{description}</p> : null}
    </div>
  );
}

function ProfileNavigation() {
  return (
    <header className="h-16 border-b border-border bg-surface">
      <div className="mx-auto flex h-full max-w-[1440px] items-center justify-between px-5 sm:px-8">
        <a href="/dashboard" className="flex items-center gap-2.5 text-base font-bold text-text-darkest">
          <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-accent text-accent-foreground">▦</span>
          JobPilot
        </a>
        <nav className="flex h-full items-center gap-4 sm:gap-7" aria-label="Main navigation">
          <a href="/dashboard" className="hidden text-xs font-medium text-text-dark transition hover:text-accent sm:block">Dashboard</a>
          <a href="/find-jobs" className="text-xs font-medium text-text-dark transition hover:text-accent">Find Jobs</a>
          <a href="/profile" className="relative flex h-full items-center text-xs font-medium text-accent">Profile<span className="absolute inset-x-0 bottom-0 h-0.5 bg-accent" /></a>
        </nav>
      </div>
    </header>
  );
}

export function ProfileForm({ email, userId, profile }: ProfileFormProps) {
  const [state, formAction, pending] = useActionState(saveProfile, initialState);
  const [skills, setSkills] = useState<string[]>(profile?.skills ?? []);
  const [industries, setIndustries] = useState<string[]>(profile?.industries ?? []);
  const [skillInput, setSkillInput] = useState("");
  const [industryInput, setIndustryInput] = useState("");
  const [workExperience, setWorkExperience] = useState<WorkExperience[]>(profile?.work_experience?.length ? profile.work_experience : [{ ...EMPTY_WORK_EXPERIENCE }]);
  const [resumeName, setResumeName] = useState<string | null>(profile?.resume_pdf_url?.split("/").pop() ?? null);
  const [completion, setCompletion] = useState(0);
  const [missingFields, setMissingFields] = useState<string[]>([]);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state.completed) posthog.capture("profile_completed", { userId });
  }, [state.completed, userId]);

  const addTag = (value: string, tags: string[], update: (next: string[]) => void, clear: () => void): void => {
    const nextTag = value.trim();
    if (nextTag && !tags.includes(nextTag)) {
      update([...tags, nextTag]);
      clear();
    }
  };
  const updateRole = (index: number, key: keyof WorkExperience, value: string | boolean): void =>
    setWorkExperience((roles) => roles.map((role, roleIndex) => roleIndex === index ? { ...role, [key]: value } : role));
  const updateCompletion = useCallback((form: HTMLFormElement): void => {
    const value = (name: string): string => form.elements.namedItem(name) instanceof HTMLInputElement || form.elements.namedItem(name) instanceof HTMLSelectElement ? String((form.elements.namedItem(name) as HTMLInputElement | HTMLSelectElement).value).trim() : "";
    const role = workExperience[0];
    const groups: [string, boolean][] = [
      ["FULL NAME", Boolean(value("full_name"))],
      ["PHONE", Boolean(value("phone"))],
      ["LOCATION", Boolean(value("location"))],
      ["PROFESSIONAL", Boolean(value("current_title") && value("experience_level") && value("years_experience"))],
      ["SKILLS", skills.length > 0],
      ["WORK EXPERIENCE", Boolean(role.company && role.title && role.startDate && role.responsibilities)],
      ["EDUCATION", Boolean(value("degree") && value("field_of_study") && value("institution") && value("graduation_year"))],
      ["JOB PREFERENCES", Boolean(value("job_titles_seeking") && value("remote_preference"))],
    ];
    const nextMissing = groups.filter(([, complete]) => !complete).map(([label]) => label);
    setCompletion(Math.round(((groups.length - nextMissing.length) / groups.length) * 100));
    setMissingFields(nextMissing);
  }, [skills, workExperience]);

  useEffect(() => {
    if (formRef.current) updateCompletion(formRef.current);
  }, [updateCompletion]);

  return (
    <div className="min-h-screen bg-background">
      <ProfileNavigation />
      <main className="mx-auto flex max-w-[960px] flex-col gap-5 px-4 py-6 sm:px-6 sm:py-8">
        <ProfileAttentionBanner completion={completion} missingFields={missingFields} />
        <form ref={formRef} action={formAction} onInput={() => formRef.current && updateCompletion(formRef.current)} className="rounded-xl border border-border bg-surface p-5 shadow-sm sm:p-6">
          <section className="border-b border-border-light pb-6">
            <h2 className="text-base font-semibold text-text-primary">Resume</h2>
            <p className="mt-1 text-xs text-text-secondary">Upload an existing resume to auto-fill the profile, or generate a new tailored one from your details below.</p>
            <div className="mt-4"><ResumeUpload onFileSelected={setResumeName} initialFileName={resumeName} currentResumeUrl={profile?.resume_pdf_url} userId={userId} /></div>
            {resumeName ? <p className="mt-3 text-xs text-success-dark">Selected: {resumeName}</p> : null}
          </section>
          <div className="pt-7"><SectionHeading title="Profile Information" description="This context is used to accurately represent you in agent interactions." /></div>
          <div className="space-y-8 pt-7">
            <PersonalInfoSection email={email} values={{ fullName: profile?.full_name ?? "", phone: profile?.phone ?? "", location: profile?.location ?? "", linkedinUrl: profile?.linkedin_url ?? "", portfolioUrl: profile?.portfolio_url ?? "", workAuthorization: profile?.work_authorization ?? "" }} />
            <ProfessionalInfoSection values={{ currentTitle: profile?.current_title ?? "", experienceLevel: profile?.experience_level ?? "", yearsExperience: profile?.years_experience?.toString() ?? "" }} skills={skills} industries={industries} skillInput={skillInput} industryInput={industryInput} onSkillInputChange={setSkillInput} onIndustryInputChange={setIndustryInput} onAddSkill={() => addTag(skillInput, skills, setSkills, () => setSkillInput(""))} onAddIndustry={() => addTag(industryInput, industries, setIndustries, () => setIndustryInput(""))} onRemoveSkill={(tag) => setSkills(skills.filter((item) => item !== tag))} onRemoveIndustry={(tag) => setIndustries(industries.filter((item) => item !== tag))} />
            <input type="hidden" name="skills" value={JSON.stringify(skills)} readOnly />
            <input type="hidden" name="industries" value={JSON.stringify(industries)} readOnly />
            <input type="hidden" name="workExperience" value={JSON.stringify(workExperience)} readOnly />
            <WorkExperienceSection roles={workExperience} onAddRole={() => workExperience.length < 3 && setWorkExperience((roles) => [...roles, { ...EMPTY_WORK_EXPERIENCE }])} onUpdateRole={updateRole} />
            <EducationSection values={{ degree: profile?.education?.degree ?? "", fieldOfStudy: profile?.education?.fieldOfStudy ?? "", institution: profile?.education?.institution ?? "", graduationYear: profile?.education?.graduationYear ?? "" }} />
            <JobPreferencesSection values={{ jobTitlesSeeking: profile?.job_titles_seeking?.join(", ") ?? "", remotePreference: profile?.remote_preference ?? "", salaryExpectation: profile?.salary_expectation ?? "", preferredLocations: profile?.preferred_locations?.join(", ") ?? "", coverLetterTone: profile?.cover_letter_tone ?? "" }} />
          </div>
          {state.error ? <p className="mt-5 text-xs font-medium text-error" role="alert">{state.error}</p> : null}
          {state.success ? <p className="mt-5 text-xs font-medium text-success-dark" role="status">Profile saved successfully.</p> : null}
          <div className="mt-8 border-t border-border-light pt-5">
            <button disabled={pending} type="submit" className="w-full rounded-md bg-accent px-4 py-2.5 text-xs font-semibold text-accent-foreground transition hover:bg-accent-dark focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60">
              {pending ? "Saving Profile..." : state.success ? "Profile Saved" : "Save Profile"}
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}
