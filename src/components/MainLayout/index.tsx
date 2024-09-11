import { type PropsWithChildren } from "react";

import styles from "./styles.module.css";

function MainLayout({ children }: PropsWithChildren<{}>) {
  return <div className={styles.root}>{children}</div>;
}

export default MainLayout;
