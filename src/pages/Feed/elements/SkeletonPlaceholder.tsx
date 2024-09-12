import { Skeleton } from "@mui/material";

import { memo } from "react";

const SkeletonPlaceholder = ({ count }: { count: number }) => {
  return (
    <>
      {Array.from({ length: count }).map((_, index) => (
        <Skeleton key={index} sx={{ width: "100%", height: "200px" }} />
      ))}
    </>
  );
};

export default memo(SkeletonPlaceholder);
