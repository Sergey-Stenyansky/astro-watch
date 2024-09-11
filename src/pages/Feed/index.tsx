import { useGetAtroFeedQuery } from "@/services/api";
import { useMemo, memo } from "react";
import { FeedFilter } from "@/core/filter/feed";
import { useAppSelector } from "@/store";
import { Space, Stack, Title } from "@mantine/core";
import AstroObjectCard from "@/components/AstroObjectCard";
import FeedFilterComponent from "./elements/FeedFilter";

import SkeletonPlaceholder from "./elements/SkeletonPlaceholder";

function Feed() {
  const { data, isLoading, isError } = useGetAtroFeedQuery({
    startDate: "2015-09-07",
    endDate: "2015-09-08",
  });

  const filter = useMemo(() => new FeedFilter(), []);

  const items = useAppSelector((state) => {
    const items = data?.nearEarthObjects || [];
    return filter.apply(state.feedFilter, items);
  });

  return (
    <>
      <Title>Astro watch</Title>
      <Space h="lg" />
      <FeedFilterComponent />
      <Space h="md" />
      <Stack gap="xs" style={{ width: "100%" }}>
        {isLoading && !isError && <SkeletonPlaceholder count={5} />}
        {items.map((item) => {
          return <AstroObjectCard key={item.id} item={item} />;
        })}
      </Stack>
    </>
  );
}

export default memo(Feed);
