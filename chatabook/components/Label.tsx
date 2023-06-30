const Label = ({
  htmlFor,
  text,
  className,
}: {
  htmlFor: string;
  text: string;
  className?: string;
}) => {
  return (
    <label
      htmlFor={htmlFor}
      className={`font-light text-[#1e2024] bg-[#a6b6c1] p-1 border-2 border-[#1e2024] bg-opacity-90 rounded-xl rounded-b-none text-center mt-2 ${className}`}
    >
      {text}
    </label>
  );
};

export default Label;
