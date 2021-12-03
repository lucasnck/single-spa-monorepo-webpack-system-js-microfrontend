import { IOptions } from "./types";
import { PAGE_QUESTIONS, pageBuilder } from "./templates/page/page.builder";

export const TEMPLATE_QUESTIONS: Record<string, IOptions[]> = {
  page: PAGE_QUESTIONS,
  settings: PAGE_QUESTIONS,
};

export const TEMPLATE_BUILDER: Record<
  string,
  (projectChoice: string, answers: any) => void
> = {
  page: pageBuilder,
};
