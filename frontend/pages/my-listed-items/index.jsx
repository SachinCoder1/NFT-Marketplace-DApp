import React from "react";
import SellerItems from "../../components/seller-items/SellerItems";
import MainLayout from "../../components/layouts/MainLayout";
import Heading2 from "../../subcomponents/headings/Heading2"; 


export default function mylisteditems() {
  return (
    <MainLayout>
       <Heading2 title="Your Listed NFTs" />
      <SellerItems />
    </MainLayout>
  );
}
