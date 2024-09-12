import { type PropsWithChildren } from "react";

import styles from "./styles.module.css";

const MainLayout = ({ children }: PropsWithChildren<{}>) => {
  return <div className={styles.root}>{children}</div>;
};

export default MainLayout;
