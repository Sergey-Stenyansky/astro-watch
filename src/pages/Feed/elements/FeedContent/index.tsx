import { useGetAtroFeedQuery } from "@/services/api";
import { useEffect, useMemo, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/store";
import { Pagination, Stack } from "@mui/material";

import Spacing from "@/primitives/Spacing";
import { useTranslation } from "react-i18next";
import { flexCenter, paginationContainerStyle } from "@/theme/commonStyles";
import Placeholder from "@/primitives/Placeholder";
import AstroObjectCard from "../AstroObjectCard";
import SkeletonPlaceholder from "../SkeletonPlaceholder";
import FeedFilterComponent from "../FeedFilter";
import { useFeedContext } from "@/pages/Feed/context";

import { applySort } from "@/pages/Feed/sorting";

import { calculateTotalPages, paginate } from "@/util/pagination";

import useDebouncedValue from "@/hooks/useDebouncedValue";
import { windowSelector } from "@/reducers/feed/selectors";
import { initFromFilter } from "@/reducers/feed/feedFilter";
import { AstroObjectInterface } from "@/services/api/schema/astroObject";
import CommonPageHeader from "@/components/CommonPageHeader";

const emptyContent: AstroObjectInterface[] = [];

const FeedContent = () => {
  const { t } = useTranslation();

  const dispatch = useAppDispatch();
  const timeWindow = useAppSelector((state) => windowSelector(state.feedFilter));

  const { items, isFetching, isError } = useGetAtroFeedQuery(useDebouncedValue(timeWindow), {
    selectFromResult: (result) => ({
      items: result.data?.nearEarthObjects || emptyContent,
      isFetching: result.isFetching,
      isError: result.isError,
    }),
  });

  const { sort, filter } = useFeedContext();

  const [page, setPage] = useState(1);

  const filterState = useAppSelector((state) => state.feedFilter);

  useEffect(() => {
    filter.init(items);
    dispatch(initFromFilter(filter.plainObject));
  }, [dispatch, items, filter]);

  const content = useMemo(() => {
    const filtered = filter.apply(filterState, items);
    const sorted = applySort(filtered, sort.activeField, sort.sortOrder);
    const totalPages = calculateTotalPages(sorted.length, 8);
    const clampedPage = Math.min(page, totalPages);
    return paginate(sorted, clampedPage, 8);
  }, [items, filter, filterState, sort.activeField, sort.sortOrder, page]);

  return (
    <>
      <CommonPageHeader title={t("astroWatch")} />
      <FeedFilterComponent />
      <Spacing v={2} />
      <Stack spacing={1} useFlexGap={true} sx={flexCenter} data-test-id="feed-content">
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
