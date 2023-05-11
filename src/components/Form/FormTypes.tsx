export const TemplateFields = {
  CATEGORY: "category",
  Name: "name",
  EMAIL: "email",
  FILE: "file",
  QUESTION: "question",
} as const;

export type TemplateFields = typeof TemplateFields[keyof typeof TemplateFields];

export interface FormTemplate {
  category: string;
  name: string;
  email: string;
  file?: string;
  question?: string;
}
