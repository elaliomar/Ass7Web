import { FC } from "react";

interface Props {
  title: string;
  onClick: () => void;
}

const CustomButton: FC<Props> = ({ title, onClick }) => {
  return (
    <button type="submit" onClick={onClick} className="btn btn-outline-primary">
      {title}
    </button>
  );
};

export default CustomButton;
