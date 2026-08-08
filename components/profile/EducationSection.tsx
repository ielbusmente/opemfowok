import {
  ProfileField,
  SelectInput,
  TextInput,
} from "@/components/profile/ProfileField";

export function EducationSection() {
  return (
    <section className="space-y-4 border-t border-border-light pt-7">
      <h3 className="text-xs font-semibold text-text-primary">Education</h3>
      <div className="grid gap-4 md:grid-cols-2">
        <ProfileField label="Highest Degree">
          <SelectInput>
            <option value="" disabled>
              Select highest degree
            </option>
            <option value="high_school">High School</option>
            <option value="associate">Associate Degree</option>
            <option value="bachelor">Bachelor&apos;s Degree</option>
            <option value="master">Master&apos;s Degree</option>
          </SelectInput>
        </ProfileField>
        <ProfileField label="Field of Study">
          <TextInput placeholder="Field of study" />
        </ProfileField>
        <ProfileField label="Institution Name">
          <TextInput placeholder="E.g. State University" />
        </ProfileField>
        <ProfileField label="Graduation Year">
          <TextInput placeholder="YYYY" />
        </ProfileField>
      </div>
    </section>
  );
}
