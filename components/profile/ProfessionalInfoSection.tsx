import {
  ProfileField,
  SelectInput,
  TextInput,
} from "@/components/profile/ProfileField";
import { TagList } from "@/components/profile/TagList";

type ProfessionalInfoSectionProps = {
  skills: string[];
  industries: string[];
  skillInput: string;
  industryInput: string;
  onSkillInputChange: (value: string) => void;
  onIndustryInputChange: (value: string) => void;
  onAddSkill: () => void;
  onAddIndustry: () => void;
  onRemoveSkill: (tag: string) => void;
  onRemoveIndustry: (tag: string) => void;
};

export function ProfessionalInfoSection({
  skills,
  industries,
  skillInput,
  industryInput,
  onSkillInputChange,
  onIndustryInputChange,
  onAddSkill,
  onAddIndustry,
  onRemoveSkill,
  onRemoveIndustry,
}: ProfessionalInfoSectionProps) {
  return (
    <section className="space-y-4 border-t border-border-light pt-7">
      <h3 className="text-xs font-semibold text-text-primary">
        Professional Info
      </h3>
      <div className="grid gap-4 md:grid-cols-2">
        <ProfileField
          label="Current / Recent Job Title"
          className="md:col-span-2"
        >
          <TextInput placeholder="Your current or recent job title" />
        </ProfileField>
        <ProfileField label="Experience Level">
          <SelectInput>
            <option value="" disabled>
              Select experience level
            </option>
            <option value="junior">Junior</option>
            <option value="mid">Mid-Level</option>
            <option value="senior">Senior</option>
            <option value="lead">Lead</option>
          </SelectInput>
        </ProfileField>
        <ProfileField label="Years of Experience">
          <TextInput type="number" min="0" placeholder="0" />
        </ProfileField>
        <ProfileField label="Skills" className="md:col-span-2">
          <div className="flex gap-2">
            <TextInput
              value={skillInput}
              onChange={(event) => onSkillInputChange(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === "Enter") {
                  event.preventDefault();
                  onAddSkill();
                }
              }}
              placeholder="Add a skill"
            />
            <button
              type="button"
              onClick={onAddSkill}
              className="rounded-md bg-surface-tertiary px-3 text-xs font-semibold text-text-dark transition hover:bg-border"
            >
              Add
            </button>
          </div>
          <TagList tags={skills} onRemove={onRemoveSkill} />
        </ProfileField>
        <ProfileField
          label="Industries Worked In (Optional)"
          className="md:col-span-2"
        >
          <div className="flex gap-2">
            <TextInput
              value={industryInput}
              onChange={(event) => onIndustryInputChange(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === "Enter") {
                  event.preventDefault();
                  onAddIndustry();
                }
              }}
              placeholder="E.g. FinTech, Healthcare"
            />
            <button
              type="button"
              onClick={onAddIndustry}
              className="rounded-md bg-surface-tertiary px-3 text-xs font-semibold text-text-dark transition hover:bg-border"
            >
              Add
            </button>
          </div>
          <TagList tags={industries} onRemove={onRemoveIndustry} />
        </ProfileField>
      </div>
    </section>
  );
}
