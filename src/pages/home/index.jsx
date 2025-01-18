import "../../css/homePage.css";
import Header from "../../components/Header/Header";
import HomeDashboard from "../../components/Dashboard";

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
