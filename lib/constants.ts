export const EMAIL_REGEX = new RegExp(
  /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@zod.com$/
);

export const PASSWORD_MIN_LENGTH = 10;
export const PASSWORD_REGEX_ERROR =
  "Passwords must contain at least one UPPERCASE, lowercase, number and special characters #?!@$%^&*-";

export const PASSWORD_REGEX = new RegExp(/\d/);
