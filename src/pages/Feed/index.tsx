import FeedContextProvider from "./FeedContextProvider";
import FeedContent from "./elements/FeedContent";

const Feed = () => (
  <FeedContextProvider>
    <FeedContent />
  </FeedContextProvider>
);

export default Feed;
