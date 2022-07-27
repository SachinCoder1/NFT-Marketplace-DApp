import React from "react";
import MainLayout from "../components/layouts/MainLayout";
import ListItem from "../components/list-item/ListItem";
import Heading2 from "../subcomponents/headings/Heading2"; 


const Sell = () => {
  return (
    <MainLayout>
       <Heading2 title="List Your NFT" />
      <ListItem />
    </MainLayout>
  );
};

export default Sell;
