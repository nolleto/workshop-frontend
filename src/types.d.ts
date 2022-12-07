export type UserSkill = {
  language: string;
  experienceYears: number;
}

export type User = {
  name: string;
  skills: UserSkill[];
}
