import "./index.css";

import { createRoot } from "react-dom/client";
import AppEntry from "./appEntry/index.ts";
import MainPage from "./pages/main.ts";
import AppEntryComponent from "./components/AppEntry/index.tsx";
import TestPage from "./pages/test.ts";

const appEntry = new AppEntry();

appEntry.addPage(new MainPage());
appEntry.addPage(new TestPage());

createRoot(document.getElementById("root")!).render(<AppEntryComponent appEntry={appEntry} />);
