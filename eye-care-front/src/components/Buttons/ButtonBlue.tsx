import { Link } from 'react-router-dom';

interface ButtonBlueProps {
  goTo: string;
  children: React.ReactNode;
}

export default function ButtonBlue({ goTo, children }: ButtonBlueProps) {
  return (
    <Link to={goTo} className="button button-blue">
      <p>{children}</p>
    </Link>
  );
}