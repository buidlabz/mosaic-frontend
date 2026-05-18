export interface UserSignupPayload {
  name: string;
  email: string;
  password: string;
}

export interface InstitutionSignupPayload extends UserSignupPayload {
  institutionName: string;
}

function readString(value: unknown, { trim = true }: { trim?: boolean } = {}) {
  if (typeof value !== "string") {
    return "";
  }

  return trim ? value.trim() : value;
}

function buildName(data: Record<string, unknown>) {
  const explicitName = readString(data.name);
  if (explicitName) {
    return explicitName;
  }

  const firstName = readString(data.firstName);
  const lastName = readString(data.lastName);

  return [firstName, lastName].filter(Boolean).join(" ").trim();
}

export function toUserSignupPayload(data: Record<string, unknown>): UserSignupPayload {
  return {
    name: buildName(data),
    email: readString(data.email),
    password: readString(data.password, { trim: false }),
  };
}

export function toInstitutionSignupPayload(data: Record<string, unknown>): InstitutionSignupPayload {
  const basePayload = toUserSignupPayload(data);

  return {
    ...basePayload,
    institutionName: readString(data.institutionName) || basePayload.name,
  };
}
