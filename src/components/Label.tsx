interface LabelProps {
  text: string;
}

const Label: React.FC<LabelProps> = ({ text }) => (
  <h4 className="text-center fw-semibold mb-4" style={{ color: '#222' }}>
    {text}
  </h4>
);

export default Label;
