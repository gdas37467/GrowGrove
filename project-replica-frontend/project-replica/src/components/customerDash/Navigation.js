import {HiOutlineUsers ,HiOutlineUserCircle,HiOutlineWallet } from "react-icons/hi2";
import {BsCoin} from "react-icons/bs";


const navigations = [
    {
        key : 'profile',
        label : 'Profile',
        path : '/dash/profile',
        icon : <HiOutlineUserCircle/>
    },
    {
        key : 'packages',
        label : 'My Packages',
        path : '/dash/packages',
        icon : <BsCoin/>
    },
    {
        key : 'wallet',
        label : 'Wallet',
        path : '/dash/wallet',
        icon : <HiOutlineWallet/>
    },
    {
        key : 'referral',
        label : 'Referral',
        path : '/dash/referral',
        icon : <HiOutlineUsers/>
    },
    
   

]

export default navigations;