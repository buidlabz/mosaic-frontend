export interface SignupVerificationSession {
  userId: string;
  email: string;
  message?: string;
}

const SIGNUP_VERIFICATION_STORAGE_KEY = "mosaic.signup.verification";

export function storeSignupVerificationSession(session: SignupVerificationSession) {
  if (typeof window === "undefined") {
    return;
  }

  window.sessionStorage.setItem(SIGNUP_VERIFICATION_STORAGE_KEY, JSON.stringify(session));
}

export function readSignupVerificationSession(): SignupVerificationSession | null {
  if (typeof window === "undefined") {
    return null;
  }

  const rawValue = window.sessionStorage.getItem(SIGNUP_VERIFICATION_STORAGE_KEY);
  if (!rawValue) {
    return null;
  }

  try {
    const parsed = JSON.parse(rawValue) as Partial<SignupVerificationSession>;
    if (!parsed.userId || !parsed.email) {
      return null;
    }

    return {
      userId: parsed.userId,
      email: parsed.email,
      message: parsed.message,
    };
  } catch {
    return null;
  }
}

export function clearSignupVerificationSession() {
  if (typeof window === "undefined") {
    return;
  }

  window.sessionStorage.removeItem(SIGNUP_VERIFICATION_STORAGE_KEY);
}
