import Spinner from "library/Spinner/Spinner";
import React from "react";

interface DrawerLoadingProps {
  open: boolean;
}
const DrawerLoading: React.FC<DrawerLoadingProps> = (props) => {
  if (!props.open) return <React.Fragment />;

  return (
    <div className="drawer-loading-container">
      <Spinner variant="relative" />
    </div>
  );
};

export default DrawerLoading;
