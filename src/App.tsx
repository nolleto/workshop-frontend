import AsyncComponent from './components/AsyncComponent'
import AsyncHookedComponent from './components/AsyncHookedComponent'
import FormComponent from './components/FormComponent'
import PrintUserComponent from './components/PrintUserComponent'
import ShowComponent from './components/ShowComponent'

function App() {
  return (
    <div>
      <ShowComponent title='PrintUserComponent - Felipe'>
        <PrintUserComponent user={{
          name: 'Felipe',
          skills: [
            {
              experienceYears: 8,
              language: "JavaScript"
            },
            {
              experienceYears: 4,
              language: "Ruby"
            }
          ]
        }} />
      </ShowComponent>

      <ShowComponent title='PrintUserComponent - Josep'>
        <PrintUserComponent user={{
          name: 'Josep',
          skills: []
        }} />
      </ShowComponent>

      <ShowComponent title='AsyncComponent'>
        <AsyncComponent />
      </ShowComponent>

      <ShowComponent title='AsyncHookedComponent'>
        <AsyncHookedComponent />
      </ShowComponent>

      <ShowComponent title='FormComponent'>
        <FormComponent />
      </ShowComponent>
    </div>
  );
}

export default App;
