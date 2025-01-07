import Header from "../../components/Header/header";
import "../../css/homePage.css";
import HomeDashboard from "../../components/Dashboard/HomeDashboard/HomeDashboard";

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
