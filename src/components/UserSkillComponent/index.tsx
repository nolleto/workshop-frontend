import type { UserSkill } from "../../types"

type UserSkillComponentProps = {
  skill: UserSkill
}

const UserSkillComponent = ({ skill }: UserSkillComponentProps) => {
  return (
    <li>You have {skill.experienceYears} years of experience in <b>{skill.language}</b></li>
  )
}

export default UserSkillComponent
