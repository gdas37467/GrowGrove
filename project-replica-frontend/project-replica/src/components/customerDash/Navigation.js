import {HiOutlineUsers ,HiOutlineUserCircle,HiOutlineWallet } from "react-icons/hi2";


const navigations = [
    {
        key : 'profile',
        label : 'Profile',
        path : '/dash/profile',
        icon : <HiOutlineUserCircle/>
    },{
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