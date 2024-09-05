import "./styles.css";
import { useGetAtroFeedQuery } from "../../services/api";

function App() {
  const { data } = useGetAtroFeedQuery({ startDate: "2015-09-07", endDate: "2015-09-08" });
  return (
    <>
      <h1>Astro watch</h1>
      <div className="card">{JSON.stringify(data)}</div>
    </>
  );
}

export default App;
