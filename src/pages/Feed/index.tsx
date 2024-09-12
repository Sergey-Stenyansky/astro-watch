import { useGetAtroFeedQuery } from "@/services/api";
import { useMemo, memo, useState } from "react";
import { FeedFilter } from "@/core/filter/feed";
import { useAppSelector } from "@/store";
import { Pagination, Stack, Typography } from "@mui/material";
import AstroObjectCard from "./elements/AstroObjectCard";
import FeedFilterComponent from "./elements/FeedFilter";

import SkeletonPlaceholder from "./elements/SkeletonPlaceholder";
import Spacing from "@/primitives/Spacing";
import { useTranslation } from "react-i18next";
import { paginate } from "@/util/pagination";
import { flexCenter, paginationContainerStyle } from "@/theme/commonStyles";
import Placeholder from "@/primitives/Placeholder";

const Feed = () => {
  const { t } = useTranslation();

  const { data, isLoading, isError } = useGetAtroFeedQuery({
    startDate: "2015-09-07",
    endDate: "2015-09-08",
  });

  const filter = useMemo(() => new FeedFilter(), []);

  const [page, setPage] = useState(1);

  const pagination = useAppSelector((state) => {
    const items = data?.nearEarthObjects || [];
    const filteredItems = filter.apply(state.feedFilter, items);
    return paginate(filteredItems, page, 8);
  });

  return (
    <>
      <Typography sx={{ textAlign: "center" }} variant="h2">
        {t("astroWatch")}
      </Typography>
      <Spacing v={2} />
      <FeedFilterComponent />
      <Spacing v={2} />
      <Stack spacing={1} useFlexGap={true} sx={flexCenter}>
        {isLoading && !isError && <SkeletonPlaceholder count={5} />}
        {pagination.items.map((item) => (
          <AstroObjectCard key={item.id} item={item} />
        ))}
        {!pagination.items.length && (
          <Placeholder
            primaryText={t("search.noElements")}
            secondaryText={t("search.tryChangeSearch")}
          />
        )}
      </Stack>
      <Spacing v={2} />
      {pagination.totalPages > 1 && (
        <Pagination
          sx={paginationContainerStyle}
          count={pagination.totalPages}
          page={page}
          onChange={(_, page) => {
            setPage(page);
          }}
          size="large"
          boundaryCount={2}
        />
      )}
    </>
  );
};

export default memo(Feed);
