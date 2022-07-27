import {TbLayoutDashboard} from 'react-icons/tb'
import {HiTemplate} from 'react-icons/hi'
import {GiSellCard} from 'react-icons/gi'
import {BiTrendingUp} from 'react-icons/bi'
import {AiFillCrown} from 'react-icons/ai'

export const navLinks = [
    {
        title: "Dashboard",
        link: "/",
        icon: <TbLayoutDashboard />
    },
    {
        title: "Sell NFT",
        link: "/sell",
        icon: <HiTemplate />
    },
    {
        title: "My Owned NFTs",
        link: "/my-items",
        icon: <AiFillCrown />
    },
    {
        title: "Creator's Dashboard ",
        link: "/my-listed-items",
        icon: <GiSellCard />
    },
]