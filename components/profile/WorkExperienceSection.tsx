import {
  ProfileField,
  TextArea,
  TextInput,
} from "@/components/profile/ProfileField";

type WorkExperience = {
  company: string;
  title: string;
  startDate: string;
  endDate: string;
  current: boolean;
  responsibilities: string;
};
type WorkExperienceSectionProps = {
  roles: WorkExperience[];
  onAddRole: () => void;
  onUpdateRole: (
    index: number,
    key: keyof WorkExperience,
    value: string | boolean,
  ) => void;
};

export function WorkExperienceSection({
  roles,
  onAddRole,
  onUpdateRole,
}: WorkExperienceSectionProps) {
  return (
    <section className="space-y-4 border-t border-border-light pt-7">
      <div className="flex items-center justify-between">
        <h3 className="text-xs font-semibold text-text-primary">
          Work Experience
        </h3>
        <button
          type="button"
          onClick={onAddRole}
          disabled={roles.length >= 3}
          className="text-xs font-semibold text-accent transition hover:text-accent-dark disabled:cursor-not-allowed disabled:text-text-muted"
        >
          + Add role
        </button>
      </div>
      <div className="space-y-4">
        {roles.map((role, index) => (
          <div
            key={index}
            className="rounded-lg border border-border-light bg-surface-secondary p-3"
          >
            <div className="grid gap-4 md:grid-cols-2">
              <ProfileField label="Company Name">
                <TextInput
                  name={`work_${index}_company`}
                  value={role.company}
                  onChange={(event) =>
                    onUpdateRole(index, "company", event.target.value)
                  }
                  placeholder="Company name"
                />
              </ProfileField>
              <ProfileField label="Job Title">
                <TextInput
                  name={`work_${index}_title`}
                  value={role.title}
                  onChange={(event) =>
                    onUpdateRole(index, "title", event.target.value)
                  }
                  placeholder="Job title"
                />
              </ProfileField>
              <ProfileField label="Start Date">
                <TextInput
                  name={`work_${index}_startDate`}
                  value={role.startDate}
                  onChange={(event) =>
                    onUpdateRole(index, "startDate", event.target.value)
                  }
                  placeholder="January 2022"
                />
              </ProfileField>
              <ProfileField label="End Date">
                <div className="flex items-center gap-3">
                  <TextInput
                    name={`work_${index}_endDate`}
                    value={role.endDate}
                    onChange={(event) =>
                      onUpdateRole(index, "endDate", event.target.value)
                    }
                    disabled={role.current}
                    placeholder="End date"
                  />
                  <label className="flex shrink-0 items-center gap-1.5 text-[10px] text-text-secondary">
                    <input
                      name={`work_${index}_current`}
                      type="checkbox"
                      checked={role.current}
                      onChange={(event) =>
                        onUpdateRole(index, "current", event.target.checked)
                      }
                      className="h-3 w-3 accent-accent"
                    />
                    Currently working here
                  </label>
                </div>
              </ProfileField>
              <ProfileField
                label="Key Responsibilities"
                className="md:col-span-2"
              >
                <TextArea
                  value={role.responsibilities}
                  onChange={(event) =>
                    onUpdateRole(index, "responsibilities", event.target.value)
                  }
                  placeholder="Describe your responsibilities"
                />
              </ProfileField>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
