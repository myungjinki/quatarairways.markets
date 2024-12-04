export const USERNAME_EXISTS_ERROR = "This username is already taken";
export const EMAIL_EXISTS_ERROR = "This email is already taken";
export const EMAIL_MIN_ERROR = "This field has to be filled.";
export const EMAIL_REGEX = new RegExp(/^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@zod.com$/);
export const EMAIL_REGEX_ERROR = "Must be @zod";
export const PASSWORD_MIN_LENGTH = 10;
export const PASSWORD_REGEX_ERROR =
  "Passwords must contain at least one UPPERCASE, lowercase, number and special characters #?!@$%^&*-";
export const PASSWORD_REGEX = new RegExp(/\d/);
export const PASSWORD_HASH_ROUNDS = 12;
export const PASSWORD_CONFIRM_ERROR = "Passwords do not match";

export const ROUTE = {
  HOME: "/",
  LOGIN: "/log-in",
};
