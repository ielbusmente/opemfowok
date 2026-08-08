"use server";

import { revalidatePath } from "next/cache";
import { createInsforgeServer, getCurrentUser } from "@/lib/insforge-server";
import {
  calculateProfileCompletion,
  isProfileRecord,
  type Education,
  type WorkExperience,
} from "@/types";

export type SaveProfileResult = {
  success: boolean;
  error?: string;
  completed?: boolean;
};

const textValue = (formData: FormData, name: string): string => {
  const value = formData.get(name);
  return typeof value === "string" ? value.trim() : "";
};

const listValue = (formData: FormData, name: string): string[] => {
  const value = textValue(formData, name);
  return value
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
};

const jsonValue = <T>(formData: FormData, name: string, fallback: T): T => {
  const value = textValue(formData, name);
  if (!value) return fallback;

  try {
    return JSON.parse(value) as T;
  } catch (error) {
    console.error(`[actions/profile] invalid ${name}`, error);
    return fallback;
  }
};

export async function saveProfile(
  _previousState: SaveProfileResult,
  formData: FormData,
): Promise<SaveProfileResult> {
  try {
    const user = await getCurrentUser();
    if (!user) return { success: false, error: "You must be signed in to save your profile." };

    const skills = jsonValue<string[]>(formData, "skills", []);
    const industries = jsonValue<string[]>(formData, "industries", []);
    const workExperience = jsonValue<WorkExperience[]>(formData, "workExperience", []);
    const education: Education = {
      degree: textValue(formData, "degree"),
      fieldOfStudy: textValue(formData, "field_of_study"),
      institution: textValue(formData, "institution"),
      graduationYear: textValue(formData, "graduation_year"),
    };
    const yearsExperienceValue = textValue(formData, "years_experience");
    const parsedYearsExperience = Number(yearsExperienceValue);
    const profileFields = {
      id: user.id,
      full_name: textValue(formData, "full_name"),
      email: user.email ?? "",
      phone: textValue(formData, "phone"),
      location: textValue(formData, "location"),
      current_title: textValue(formData, "current_title"),
      experience_level: textValue(formData, "experience_level"),
      years_experience: yearsExperienceValue && Number.isFinite(parsedYearsExperience) ? parsedYearsExperience : null,
      skills,
      industries,
      work_experience: workExperience,
      education,
      job_titles_seeking: listValue(formData, "job_titles_seeking"),
      remote_preference: textValue(formData, "remote_preference"),
      preferred_locations: listValue(formData, "preferred_locations"),
      salary_expectation: textValue(formData, "salary_expectation"),
      cover_letter_tone: textValue(formData, "cover_letter_tone"),
      linkedin_url: textValue(formData, "linkedin_url"),
      portfolio_url: textValue(formData, "portfolio_url"),
      work_authorization: textValue(formData, "work_authorization"),
    };
    const completion = calculateProfileCompletion(profileFields);
    const insforge = await createInsforgeServer();
    const { data: existingData, error: existingError } = await insforge.database
      .from("profiles")
      .select("id, is_complete")
      .eq("id", user.id)
      .maybeSingle();

    if (existingError) {
      console.error("[actions/profile] load existing profile", existingError);
      return { success: false, error: "Could not load your existing profile." };
    }

    const resume = formData.get("resume");
    let resumePdfUrl: string | undefined;
    if (resume instanceof File && resume.size > 0) {
      if (resume.type !== "application/pdf" || resume.size > 5 * 1024 * 1024) {
        return { success: false, error: "Please choose a PDF resume smaller than 5MB." };
      }

      const { data: upload, error: uploadError } = await insforge.storage
        .from("resumes")
        .upload(`${user.id}/resume.pdf`, resume);

      if (uploadError || !upload?.url) {
        console.error("[actions/profile] upload resume", uploadError);
        return { success: false, error: "Your resume could not be uploaded. Try again." };
      }
      resumePdfUrl = upload.url;
    }

    const savedFields = resumePdfUrl ? { ...profileFields, resume_pdf_url: resumePdfUrl } : profileFields;
    const database = insforge.database.from("profiles");
    const result = isProfileRecord(existingData)
      ? await database.update({ ...savedFields, is_complete: completion.percentage === 100 }).eq("id", user.id)
      : await database.insert([{ ...savedFields, is_complete: completion.percentage === 100 }]);

    if (result.error) {
      console.error("[actions/profile] save profile", result.error);
      return { success: false, error: "Your profile could not be saved. Try again." };
    }

    const wasComplete = isProfileRecord(existingData) && existingData.is_complete;
    revalidatePath("/profile");
    return {
      success: true,
      completed: completion.percentage === 100 && !wasComplete,
    };
  } catch (error) {
    console.error("[actions/profile] save profile", error);
    return { success: false, error: "Your profile could not be saved. Try again." };
  }
}
