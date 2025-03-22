import Style from "./LoadingSpinner.module.css";

const LoadingSpinner: React.FC = () => {
  return (
    <div className={Style.spinnerContainer}>
      <div className={Style.spinner}></div>
      <p>טוען...</p>
    </div>
  );
};

export default LoadingSpinner;
