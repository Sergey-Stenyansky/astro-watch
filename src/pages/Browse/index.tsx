import { useGetAstroBrowseQuery } from "@/services/api";

const Browse = () => {
  const { data } = useGetAstroBrowseQuery(0);

  return <>{JSON.stringify(data)}</>;
};

export default Browse;
