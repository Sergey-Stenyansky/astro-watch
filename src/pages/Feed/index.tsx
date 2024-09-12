import { useGetAtroFeedQuery } from "@/services/api";
import { useMemo, memo } from "react";
import { FeedFilter } from "@/core/filter/feed";
import { useAppSelector } from "@/store";
import { Stack, Typography } from "@mui/material";
import AstroObjectCard from "./elements/AstroObjectCard";
import FeedFilterComponent from "./elements/FeedFilter";

import SkeletonPlaceholder from "./elements/SkeletonPlaceholder";
import Spacing from "@/primitives/Spacing";
import { useTranslation } from "react-i18next";

const Feed = () => {
  const { t } = useTranslation();

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
      <Typography sx={{ textAlign: "center" }} variant="h2">
        {t("astroWatch")}
      </Typography>
      <Spacing v={2} />
      <FeedFilterComponent />
      <Spacing v={2} />
      <Stack spacing={1} useFlexGap={true}>
        {isLoading && !isError && <SkeletonPlaceholder count={5} />}
        {items.map((item) => (
          <AstroObjectCard key={item.id} item={item} />
        ))}
      </Stack>
    </>
  );
};

export default memo(Feed);
