import type { UserSkill } from "../../types"
import UserSkillComponent from "../UserSkillComponent"

type UserSkillsComponentProps = {
  skills: UserSkill[]
}

const UserSkillsComponent = ({ skills }: UserSkillsComponentProps) => {
  if (skills.length === 0) {
    return <div>No skills!</div>
  }
  return (
    <div>
      Skills:
      <ul>
        {skills.map(skill => (
          <UserSkillComponent key={skill.language} skill={skill} />
        ))}
      </ul>
    </div>
  )
}

export default UserSkillsComponent
