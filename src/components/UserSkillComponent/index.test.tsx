import { render, screen } from '@testing-library/react'
import UserSkillComponent from '.'

describe('UserSkillComponent', () => {
  it('', () => {
    const { debug } = render(<UserSkillComponent skill={{ experienceYears: 1, language: 'C++' }} />)

    debug()
  })
})
