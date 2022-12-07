import type { User } from '../../types';
import UserSkillsComponent from '../UserSkillsComponent';

type PrintUserComponentProps = {
  user: User;
}

const PrintUserComponent = ({ user }: PrintUserComponentProps) => {
  return (
    <div>
      <p>Hello {user.name}!</p>

      <UserSkillsComponent skills={user.skills} />
    </div>
  )
}

export default PrintUserComponent
