import {
  ProfileField,
  SelectInput,
  TextInput,
} from "@/components/profile/ProfileField";

type JobPreferencesSectionProps = {
  values: {
    jobTitlesSeeking: string;
    remotePreference: string;
    salaryExpectation: string;
    preferredLocations: string;
    coverLetterTone: string;
  };
};

export function JobPreferencesSection({ values }: JobPreferencesSectionProps) {
  return (
    <section className="space-y-4 border-t border-border-light pt-7">
      <h3 className="text-xs font-semibold text-text-primary">
        Job Preferences
      </h3>
      <div className="grid gap-4 md:grid-cols-2">
        <ProfileField label="Job Titles Seeking" className="md:col-span-2">
          <TextInput name="job_titles_seeking" defaultValue={values.jobTitlesSeeking} placeholder="Roles you are looking for" />
        </ProfileField>
        <ProfileField label="Remote Preference">
          <SelectInput name="remote_preference" defaultValue={values.remotePreference}>
            <option value="" disabled>
              Select remote preference
            </option>
            <option value="any">Any</option>
            <option value="remote">Remote</option>
            <option value="hybrid">Hybrid</option>
            <option value="onsite">On-site</option>
          </SelectInput>
        </ProfileField>
        <ProfileField label="Salary Expectation (Optional)">
          <TextInput name="salary_expectation" defaultValue={values.salaryExpectation} placeholder="E.g. $120k+" />
        </ProfileField>
        <ProfileField
          label="Preferred Locations (Optional)"
          className="md:col-span-2"
        >
          <TextInput name="preferred_locations" defaultValue={values.preferredLocations} placeholder="E.g. New York, London" />
        </ProfileField>
        <ProfileField label="Cover Letter Tone">
          <SelectInput name="cover_letter_tone" defaultValue={values.coverLetterTone}>
            <option value="" disabled>
              Select cover letter tone
            </option>
            <option value="formal">Formal</option>
            <option value="casual">Casual</option>
            <option value="enthusiastic">Enthusiastic</option>
          </SelectInput>
        </ProfileField>
      </div>
    </section>
  );
}
