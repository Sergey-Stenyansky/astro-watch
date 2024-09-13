import { Skeleton } from "@mui/material";

import { memo } from "react";

const skeletonStyles = { width: "100%", borderRadius: 2 };

const SkeletonPlaceholder = ({ count }: { count: number }) => {
  return (
    <>
      {Array.from({ length: count }).map((_, index) => (
        <Skeleton
          sx={skeletonStyles}
          key={index}
          animation="wave"
          variant="rectangular"
          height={250}
        />
      ))}
    </>
  );
};

export default memo(SkeletonPlaceholder);
