import { ReactNode } from "react";

type ShowComponentProps = {
  title: string;
  children: ReactNode;
}

const ShowComponent = ({ children, title }: ShowComponentProps) => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        placeItems: 'center',
        border: '1px solid black',
        padding: 16
      }}>
      <h3>{title}</h3>

      <div>{children}</div>
    </div>
  )
}

export default ShowComponent
