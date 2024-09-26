import BrowseContextProvider from "./BrowseContextProvider";
import BrowseContent from "./elements/BrowseContent";

const Browse = () => (
  <BrowseContextProvider>
    <BrowseContent />
  </BrowseContextProvider>
);

export default Browse;
