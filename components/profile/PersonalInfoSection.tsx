import {
  ProfileField,
  SelectInput,
  TextInput,
} from "@/components/profile/ProfileField";

type PersonalInfoSectionProps = {
  email: string;
  values: {
    fullName: string;
    phone: string;
    location: string;
    linkedinUrl: string;
    portfolioUrl: string;
    workAuthorization: string;
  };
};

export function PersonalInfoSection({ email, values }: PersonalInfoSectionProps) {
  return (
    <section className="space-y-4">
      <h3 className="text-xs font-semibold text-text-primary">Personal Info</h3>
      <div className="grid gap-4 md:grid-cols-2">
        <ProfileField label="Full Name">
          <TextInput name="full_name" defaultValue={values.fullName} placeholder="Your full name" />
        </ProfileField>
        <ProfileField label="Email">
          <TextInput
            value={email}
            disabled
            className="bg-surface-secondary text-text-secondary disabled:cursor-not-allowed disabled:opacity-100"
          />
        </ProfileField>
        <ProfileField label="Phone Number">
          <TextInput name="phone" defaultValue={values.phone} placeholder="+1 (555) 000-0000" />
        </ProfileField>
        <ProfileField label="Location">
          <TextInput name="location" defaultValue={values.location} placeholder="City, Country" />
        </ProfileField>
        <ProfileField label="LinkedIn URL">
          <TextInput name="linkedin_url" defaultValue={values.linkedinUrl} placeholder="https://linkedin.com/in/your-name" />
        </ProfileField>
        <ProfileField label="Portfolio / GitHub">
          <TextInput name="portfolio_url" defaultValue={values.portfolioUrl} placeholder="https://github.com/your-name" />
        </ProfileField>
        <ProfileField label="Work Authorization">
          <SelectInput name="work_authorization" defaultValue={values.workAuthorization}>
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
