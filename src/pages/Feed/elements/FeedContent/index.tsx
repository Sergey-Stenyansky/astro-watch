import { useGetAtroFeedQuery } from "@/services/api";
import { useMemo, useState } from "react";
import { useAppSelector } from "@/store";
import { Pagination, Stack, Typography } from "@mui/material";

import Spacing from "@/primitives/Spacing";
import { useTranslation } from "react-i18next";
import { flexCenter, paginationContainerStyle, textAlignCenter } from "@/theme/commonStyles";
import Placeholder from "@/primitives/Placeholder";
import AstroObjectCard from "../AstroObjectCard";
import SkeletonPlaceholder from "../SkeletonPlaceholder";
import FeedFilterComponent from "../FeedFilter";
import { useFeedContext } from "@/pages/Feed/context";

import { applySort } from "../../sorting";

import { paginate } from "@/util/pagination";

import useDebouncedValue from "@/hooks/useDebouncedValue";
import { windowSelector } from "@/reducers/feed/feedFilter";

const FeedContent = () => {
  const { t } = useTranslation();

  const timeWindow = useAppSelector((state) => windowSelector(state.feedFilter));

  const { data, isFetching, isError } = useGetAtroFeedQuery(useDebouncedValue(timeWindow));

  const { sort, filter } = useFeedContext();

  const [page, setPage] = useState(1);

  const filterState = useAppSelector((state) => state.feedFilter);

  const content = useMemo(() => {
    const items = data?.nearEarthObjects || [];
    const filtered = filter.apply(filterState, items);
    const sorted = applySort(filtered, sort.activeField, sort.sortOrder);
    return paginate(sorted, page, 8);
  }, [sort.activeField, sort.sortOrder, filterState, page, filter, data]);

  return (
    <>
      <Typography sx={textAlignCenter} variant="h2">
        {t("astroWatch")}
      </Typography>
      <Spacing v={2} />
      <FeedFilterComponent />
      <Spacing v={2} />
      <Stack spacing={1} useFlexGap={true} sx={flexCenter}>
        {isFetching && !isError && <SkeletonPlaceholder count={5} />}
        {!isFetching && !isError && !content.items.length && (
          <Placeholder
            primaryText={t("search.noElements")}
            secondaryText={t("search.tryChangeSearch")}
          />
        )}
        {content.items.map((item) => (
          <AstroObjectCard key={item.id} item={item} />
        ))}
      </Stack>
      <Spacing v={2} />
      {content.totalPages > 1 && (
        <Pagination
          sx={paginationContainerStyle}
          count={content.totalPages}
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
