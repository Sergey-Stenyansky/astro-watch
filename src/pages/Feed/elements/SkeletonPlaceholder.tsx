import { Skeleton } from "@mantine/core";

function SkeletonPlaceholder({ count }: { count: number }) {
  return (
    <>
      {Array.from({ length: count }).map((_, index) => {
        return <Skeleton key={index} style={{ width: "100%", height: 200 }} visible={true} />;
      })}
    </>
  );
}

export default SkeletonPlaceholder;
