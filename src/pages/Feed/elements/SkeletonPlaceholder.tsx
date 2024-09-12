import { Skeleton } from "@mui/material";

import { memo } from "react";

const SkeletonPlaceholder = ({ count }: { count: number }) => {
  return (
    <>
      {Array.from({ length: count }).map((_, index) => (
        <Skeleton key={index} animation="wave" variant="rectangular" height={250} />
      ))}
    </>
  );
};

export default memo(SkeletonPlaceholder);
