import { render, screen } from '@testing-library/react'

import PrintUserComponent from './index'

jest.mock('../UserSkillsComponent', () => {
  const MockedComponent = () => <div>UserSkillsComponent</div>

  return MockedComponent
})

describe('PrintUserComponent', () => {
  it('Renders greetings with username', () => {
    render(<PrintUserComponent user={{ name: 'Nolletto', skills: [] }} />)

    expect(screen.getByText(/hello nolletto!/i)).toBeInTheDocument()
  })

  it('Renders UserSkillsComponent', () => {
    const skills = [{ language: 'Javascript', experienceYears: 8 }]

    render(
      <PrintUserComponent
        user={{
          name: 'Nolletto',
          skills,
        }}
      />
    )

    expect(screen.getByText(/userskillscomponent/i)).toBeInTheDocument()
  })
})
