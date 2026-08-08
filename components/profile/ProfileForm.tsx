"use client";

import { FormEvent, useCallback, useEffect, useRef, useState } from "react";
import { EducationSection } from "@/components/profile/EducationSection";
import { JobPreferencesSection } from "@/components/profile/JobPreferencesSection";
import { PersonalInfoSection } from "@/components/profile/PersonalInfoSection";
import { ProfileAttentionBanner } from "@/components/profile/ProfileAttentionBanner";
import { ProfessionalInfoSection } from "@/components/profile/ProfessionalInfoSection";
import { ResumeUpload } from "@/components/profile/ResumeUpload";
import { WorkExperienceSection } from "@/components/profile/WorkExperienceSection";

type ProfileFormProps = { email: string };
type WorkExperience = {
  company: string;
  title: string;
  startDate: string;
  endDate: string;
  current: boolean;
  responsibilities: string;
};

const emptyRole: WorkExperience = {
  company: "",
  title: "",
  startDate: "",
  endDate: "",
  current: false,
  responsibilities: "",
};

function SectionHeading({
  title,
  description,
}: {
  title: string;
  description?: string;
}) {
  return (
    <div className="border-b border-border-light pb-4">
      <h2 className="text-base font-semibold text-text-primary">{title}</h2>
      {description ? (
        <p className="mt-1 text-xs text-text-secondary">{description}</p>
      ) : null}
    </div>
  );
}

function ProfileNavigation() {
  return (
    <header className="h-16 border-b border-border bg-surface">
      <div className="mx-auto flex h-full max-w-[1440px] items-center justify-between px-5 sm:px-8">
        <a
          href="/dashboard"
          className="flex items-center gap-2.5 text-base font-bold text-text-darkest"
        >
          <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-accent text-accent-foreground">
            <svg
              aria-hidden="true"
              className="h-4 w-4"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <rect x="4" y="4" width="6" height="6" rx="1" />
              <rect x="14" y="4" width="6" height="6" rx="1" />
              <rect x="4" y="14" width="6" height="6" rx="1" />
              <rect x="14" y="14" width="6" height="6" rx="1" />
            </svg>
          </span>
          JobPilot
        </a>
        <nav
          className="flex h-full items-center gap-4 sm:gap-7"
          aria-label="Main navigation"
        >
          <a
            href="/dashboard"
            className="hidden items-center gap-1.5 text-xs font-medium text-text-dark transition hover:text-accent sm:flex"
          >
            ⊞ Dashboard
          </a>
          <a
            href="/find-jobs"
            className="flex items-center gap-1.5 text-xs font-medium text-text-dark transition hover:text-accent"
          >
            ⌕ Find Jobs
          </a>
          <a
            href="/profile"
            className="relative flex h-full items-center gap-1.5 text-xs font-medium text-accent"
          >
            ♙ Profile
            <span className="absolute inset-x-0 bottom-0 h-0.5 bg-accent" />
          </a>
        </nav>
      </div>
    </header>
  );
}

export function ProfileForm({ email }: ProfileFormProps) {
  const [skills, setSkills] = useState<string[]>([]);
  const [industries, setIndustries] = useState<string[]>([]);
  const [skillInput, setSkillInput] = useState("");
  const [industryInput, setIndustryInput] = useState("");
  const [workExperience, setWorkExperience] = useState<WorkExperience[]>([
    { ...emptyRole },
  ]);
  const [saved, setSaved] = useState(false);
  const [resumeName, setResumeName] = useState<string | null>(null);
  const [completion, setCompletion] = useState(0);
  const [missingFields, setMissingFields] = useState([
    "FULL NAME",
    "PHONE",
    "LOCATION",
    "PROFESSIONAL",
    "SKILLS",
    "WORK EXPERIENCE",
    "EDUCATION",
    "JOB PREFERENCES",
  ]);
  const formRef = useRef<HTMLFormElement>(null);

  const addTag = (
    value: string,
    tags: string[],
    update: (next: string[]) => void,
    clear: () => void,
  ): void => {
    const nextTag = value.trim();
    if (nextTag && !tags.includes(nextTag)) {
      update([...tags, nextTag]);
      clear();
    }
  };
  const addSkill = (): void =>
    addTag(skillInput, skills, setSkills, () => setSkillInput(""));
  const addIndustry = (): void =>
    addTag(industryInput, industries, setIndustries, () =>
      setIndustryInput(""),
    );
  const updateRole = (
    index: number,
    key: keyof WorkExperience,
    value: string | boolean,
  ): void =>
    setWorkExperience((roles) =>
      roles.map((role, roleIndex) =>
        roleIndex === index ? { ...role, [key]: value } : role,
      ),
    );
  const addRole = (): void => {
    if (workExperience.length < 3)
      setWorkExperience((roles) => [...roles, { ...emptyRole }]);
  };
  const submit = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    setSaved(true);
    window.setTimeout(() => setSaved(false), 2800);
  };
  const updateCompletion = useCallback(
    (form: HTMLFormElement): void => {
      const value = (selector: string): string =>
        form
          .querySelector<
            HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
          >(selector)
          ?.value.trim() ?? "";
      const selectValue = (index: number): string =>
        form
          .querySelectorAll<HTMLSelectElement>("select")
          [index]?.value.trim() ?? "";
      const role = workExperience[0];
      const groups = [
        {
          label: "FULL NAME",
          complete: Boolean(value('input[placeholder="Your full name"]')),
        },
        {
          label: "PHONE",
          complete: Boolean(value('input[placeholder="+1 (555) 000-0000"]')),
        },
        {
          label: "LOCATION",
          complete: Boolean(value('input[placeholder="City, Country"]')),
        },
        {
          label: "PROFESSIONAL",
          complete: Boolean(
            value('input[placeholder="Your current or recent job title"]') &&
            selectValue(1) &&
            value('input[placeholder="0"]'),
          ),
        },
        { label: "SKILLS", complete: skills.length > 0 },
        {
          label: "WORK EXPERIENCE",
          complete: Boolean(
            role.company &&
            role.title &&
            role.startDate &&
            role.responsibilities,
          ),
        },
        {
          label: "EDUCATION",
          complete: Boolean(
            selectValue(2) &&
            value('input[placeholder="Field of study"]') &&
            value('input[placeholder="E.g. State University"]') &&
            value('input[placeholder="YYYY"]'),
          ),
        },
        {
          label: "JOB PREFERENCES",
          complete: Boolean(
            value('input[placeholder="Roles you are looking for"]') &&
            selectValue(3),
          ),
        },
      ];
      setCompletion(
        Math.round(
          (groups.filter((group) => group.complete).length / groups.length) *
            100,
        ),
      );
      setMissingFields(
        groups.filter((group) => !group.complete).map((group) => group.label),
      );
    },
    [skills, workExperience],
  );
  useEffect(() => {
    if (formRef.current) updateCompletion(formRef.current);
  }, [email, updateCompletion]);

  return (
    <div className="min-h-screen bg-background">
      <ProfileNavigation />
      <main className="mx-auto flex max-w-[960px] flex-col gap-5 px-4 py-6 sm:px-6 sm:py-8">
        <ProfileAttentionBanner
          completion={completion}
          missingFields={missingFields}
        />
        <section className="rounded-xl border border-border bg-surface p-5 shadow-sm sm:p-6">
          <h2 className="text-base font-semibold text-text-primary">Resume</h2>
          <p className="mt-1 text-xs text-text-secondary">
            Upload an existing resume to auto-fill the profile, or generate a
            new tailored one from your details below.
          </p>
          <div className="mt-4">
            <ResumeUpload onFileSelected={setResumeName} />
          </div>
          {resumeName ? (
            <p className="mt-3 text-xs text-success-dark">
              Selected: {resumeName}
            </p>
          ) : null}
        </section>
        <form
          ref={formRef}
          onSubmit={submit}
          onInput={() => {
            if (formRef.current) updateCompletion(formRef.current);
          }}
          className="rounded-xl border border-border bg-surface p-5 shadow-sm sm:p-6"
        >
          <SectionHeading
            title="Profile Information"
            description="This context is used to accurately represent you in agent interactions."
          />
          <div className="space-y-8 pt-7">
            <PersonalInfoSection email={email} />
            <ProfessionalInfoSection
              skills={skills}
              industries={industries}
              skillInput={skillInput}
              industryInput={industryInput}
              onSkillInputChange={setSkillInput}
              onIndustryInputChange={setIndustryInput}
              onAddSkill={addSkill}
              onAddIndustry={addIndustry}
              onRemoveSkill={(tag) =>
                setSkills(skills.filter((item) => item !== tag))
              }
              onRemoveIndustry={(tag) =>
                setIndustries(industries.filter((item) => item !== tag))
              }
            />
            <WorkExperienceSection
              roles={workExperience}
              onAddRole={addRole}
              onUpdateRole={updateRole}
            />
            <EducationSection />
            <JobPreferencesSection />
          </div>
          <div className="mt-8 border-t border-border-light pt-5">
            <button
              type="submit"
              className="w-full rounded-md bg-accent px-4 py-2.5 text-xs font-semibold text-accent-foreground transition hover:bg-accent-dark focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2"
            >
              {saved ? "Profile Saved" : "Save Profile"}
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}
