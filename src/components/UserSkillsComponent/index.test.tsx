import { render, screen } from '@testing-library/react'
import UserSkillsComponent from './index'

describe('UserSkillsComponent', () => {
  describe('When skills is empty', () => {
    it('Renders no skills message', () => {
      render(<UserSkillsComponent skills={[]} />)

      expect(screen.getByText(/no skills!/i)).toBeInTheDocument()
    })
  })

  describe('When skills is not empty', () => {
    it('Renders the skills', () => { })
  })
})
