import './styles.css'

import { useForm } from 'react-hook-form'

type FormValues = {
  firstName: string;
  lastName: string;
}

type FormComponentProps = {}

const FormComponent = (props: FormComponentProps) => {
  const { register, handleSubmit, formState: { errors } } = useForm<FormValues>();
  const onSubmit = (data: FormValues) => {
    const json = JSON.stringify(data)

    alert(json)
  }

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-group">
          <input {...register("firstName", { required: true })} />
          {errors.firstName && <span className='error'>FirstName field is required</span>}
        </div>

        <div className="form-group">
          <input {...register("lastName", { required: true })} />
          {errors.lastName && <span className='error'>LastName field is required</span>}
        </div>

        <input type="submit" />
      </form>
    </div>
  );
}

export default FormComponent
