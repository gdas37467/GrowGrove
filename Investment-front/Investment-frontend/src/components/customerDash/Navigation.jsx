import {HiOutlineUserCircle,HiOutlineWallet } from "react-icons/hi2";
import {BsCoin} from "react-icons/bs";
import {FaHandshakeSimple} from "react-icons/fa6";

import {SiAuthy} from "react-icons/si"


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
        icon : <FaHandshakeSimple/>
    },
    {
        key : '2fa',
        label : "Two-Factor Authentication",
        path : '/dash/two-fa',
        icon : <SiAuthy/>
    }
   

]

export default navigations;