import "./styles.css";
import { useGetAtroFeedQuery } from "../../services/api";
import { ChangeEvent, useMemo } from "react";
import { FeedFilter } from "../../core/filter/feed";
import { useAppDispatch, useAppSelector } from "../../store";

import { setIsHazardous, setName } from "../../reducers/feed/feedFilter";

function Feed() {
  const { data } = useGetAtroFeedQuery({
    startDate: "2015-09-07",
    endDate: "2015-09-08",
  });

  const dispatch = useAppDispatch();
  const filterState = useAppSelector((state) => state.feedFilter);

  const filter = useMemo(() => new FeedFilter(), []);

  const items = useAppSelector((state) => {
    const items = data?.nearEarthObjects || [];
    return filter.apply(state.feedFilter, items);
  });

  return (
    <>
      <h1>Astro watch</h1>
      <div style={{ display: "flex", gap: 16, flexDirection: "column" }}>
        <div style={{ display: "flex", gap: 16, flexDirection: "row" }}>
          <div>Название астероида:</div>
          <input
            type="text"
            value={filterState.name}
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              dispatch(setName(e.target.value));
            }}
          ></input>
        </div>
        <div style={{ display: "flex", gap: 16, flexDirection: "row" }}>
          <div>Потенциально опасен:</div>
          <input
            type="checkbox"
            checked={filterState.isHazardous || false}
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              console.log("checked???", e.target.checked);
              dispatch(setIsHazardous(e.target.checked));
            }}
          ></input>
        </div>
      </div>

      <div className="card">{JSON.stringify(items)}</div>
    </>
  );
}

export default Feed;
