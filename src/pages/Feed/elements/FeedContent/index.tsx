import { useGetAtroFeedQuery } from "@/services/api";
import { useState } from "react";
import { useAppSelector } from "@/store";
import { Pagination, Stack, Typography } from "@mui/material";

import Spacing from "@/primitives/Spacing";
import { useTranslation } from "react-i18next";
import { paginate } from "@/util/pagination";
import { flexCenter, paginationContainerStyle, textAlignCenter } from "@/theme/commonStyles";
import Placeholder from "@/primitives/Placeholder";
import AstroObjectCard from "../AstroObjectCard";
import SkeletonPlaceholder from "../SkeletonPlaceholder";
import FeedFilterComponent from "../FeedFilter";
import { useFeedContext } from "@/pages/Feed/context";
import { applySort } from "@/pages/Feed/sorting";

const FeedContent = () => {
  const { t } = useTranslation();

  const { data, isLoading, isError } = useGetAtroFeedQuery({
    startDate: "2015-09-07",
    endDate: "2015-09-08",
  });

  const { sort, filter } = useFeedContext();

  const [page, setPage] = useState(1);

  const pagination = useAppSelector((state) => {
    const items = data?.nearEarthObjects || [];
    const filtered = filter.apply(state.feedFilter, items);
    const sorted = applySort(filtered, sort.activeField, sort.sortOrder);
    return paginate(sorted, page, 8);
  });

  return (
    <>
      <Typography sx={textAlignCenter} variant="h2">
        {t("astroWatch")}
      </Typography>
      <Spacing v={2} />
      <FeedFilterComponent />
      <Spacing v={2} />
      <Stack spacing={1} useFlexGap={true} sx={flexCenter}>
        {isLoading && !isError && <SkeletonPlaceholder count={5} />}
        {!isLoading && !isError && !pagination.items.length && (
          <Placeholder
            primaryText={t("search.noElements")}
            secondaryText={t("search.tryChangeSearch")}
          />
        )}
        {pagination.items.map((item) => (
          <AstroObjectCard key={item.id} item={item} />
        ))}
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

export default FeedContent;
