import AllNFTs from "../components/dashboard/AllNFTs";
import MainLayout from "../components/layouts/MainLayout";
import Heading2 from "../subcomponents/headings/Heading2"; 

export default function Home() {
  return (
    <MainLayout>
      
            <Heading2 title="Dashboard" />

      <AllNFTs />
    </MainLayout>
  );
}
