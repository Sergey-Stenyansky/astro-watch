import { useGetAtroDetailQuery } from "@/services/api";

const Detail = () => {
  const { data } = useGetAtroDetailQuery(100);

  return <>{JSON.stringify(data)}</>;
};

export default Detail;
