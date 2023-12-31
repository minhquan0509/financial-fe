const ScreenHeader = ({ title }) => {
  return (
    <div className="p-6 relative grid place-items-center">
      <span className="text-2xl font-bold">{title}</span>
    </div>
  );
};

export default ScreenHeader;
