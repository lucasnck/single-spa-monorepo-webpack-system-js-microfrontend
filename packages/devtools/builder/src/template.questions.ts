import { pageBuilder, PAGE_QUESTIONS } from "./templates/page/page.builder";
import {
  settingsBuilder,
  SETTINGS_QUESTIONS,
} from "./templates/settings/settings.builder";
import { IOptions } from "./types";

export const TEMPLATE_QUESTIONS: Record<string, IOptions[]> = {
  page: PAGE_QUESTIONS,
  settings: SETTINGS_QUESTIONS,
};

export const TEMPLATE_BUILDER: Record<
  string,
  (projectChoice: string, answers: any) => void
> = {
  page: pageBuilder,
  settings: settingsBuilder,
};
