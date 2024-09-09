import FeedPage from "../pages/feed";
import TestPage from "../pages/test";

import AppEntry from "./AppEntry";

import deployment from "../deployment/deployment.json";

const appEntry = new AppEntry();

appEntry.addPage(new FeedPage());
appEntry.addPage(new TestPage());

appEntry.setBaseUrl(deployment.envConfigs[deployment.env as "development"].baseUrl);

export default appEntry;
