import styles from "./styles.module.css";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
  return (
    <div className={styles.root}>
      <Outlet />
    </div>
  );
};

export default MainLayout;
