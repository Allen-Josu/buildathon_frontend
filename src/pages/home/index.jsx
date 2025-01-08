import "../../css/homePage.css";
import HomeDashboard from "../../components/Dashboard/HomeDashboard/HomeDashboard";
import Header from "../../components/Header/Header";

export default function Home() {
  return (
    <>
      <Header />
      <div className="bg-[#27272a] h-screen w-full">
        <HomeDashboard />
      </div>
    </>
  );
}
