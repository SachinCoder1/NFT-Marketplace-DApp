import React from 'react'
import MainLayout from '../../components/layouts/MainLayout';
import MyItems from '../../components/my-items/MyItems';
import Heading2 from '../../subcomponents/headings/Heading2';


export default function MyItemsPage() {
  return (
   <MainLayout>
    <Heading2 title="Your Purchased NFTs" />
       <MyItems />
   </MainLayout>
  )
}
