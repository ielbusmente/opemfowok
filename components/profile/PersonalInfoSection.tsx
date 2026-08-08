import {
  ProfileField,
  SelectInput,
  TextInput,
} from "@/components/profile/ProfileField";

type PersonalInfoSectionProps = { email: string };

export function PersonalInfoSection({ email }: PersonalInfoSectionProps) {
  return (
    <section className="space-y-4">
      <h3 className="text-xs font-semibold text-text-primary">Personal Info</h3>
      <div className="grid gap-4 md:grid-cols-2">
        <ProfileField label="Full Name">
          <TextInput placeholder="Your full name" />
        </ProfileField>
        <ProfileField label="Email">
          <TextInput
            value={email}
            disabled
            className="bg-surface-secondary text-text-secondary disabled:cursor-not-allowed disabled:opacity-100"
          />
        </ProfileField>
        <ProfileField label="Phone Number">
          <TextInput placeholder="+1 (555) 000-0000" />
        </ProfileField>
        <ProfileField label="Location">
          <TextInput placeholder="City, Country" />
        </ProfileField>
        <ProfileField label="LinkedIn URL">
          <TextInput placeholder="https://linkedin.com/in/your-name" />
        </ProfileField>
        <ProfileField label="Portfolio / GitHub">
          <TextInput placeholder="https://github.com/your-name" />
        </ProfileField>
        <ProfileField label="Work Authorization">
          <SelectInput>
            <option value="" disabled>
              Select authorization
            </option>
            <option value="citizen">Citizen</option>
            <option value="permanent_resident">Permanent Resident</option>
            <option value="visa_required">Visa Required</option>
          </SelectInput>
        </ProfileField>
      </div>
    </section>
  );
}
