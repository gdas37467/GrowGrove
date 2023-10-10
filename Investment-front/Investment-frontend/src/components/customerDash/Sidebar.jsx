import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import className from 'classnames';
import navigations from './Navigation'


const linkCLasses  = 'flex text-white  font-georgia hover:text-white py-2 px-4';

const Sidebar = () => {


  // let pathname = useLocation();
  // console.log(pathname);
  
  return (
    

    <div className="md:w-1/4 md:min-h-screen bg-gray-900 mx-2 mt-2 py-4">
      <div className=" md:h-full">
        <div className='flex flex-col justify-between'>
          {
            navigations.map((item)=> (
              <Sidebarlink key={item.key} item={item}/>
            
            ))}
          
          
          
          
        </div>
      </div>
    </div>
  );
};

const Sidebarlink = ({item}) => {
   let {pathname} = useLocation();
   
   
   return(
    
    <Link to={item.path} className={className(pathname===item.path ? 'bg-violet-600' : '',linkCLasses)}>
        <span className=' text-white  text-xl mr-2 mt-1'>{item.icon}</span>
            {item.label}
          </Link>
   )

}

export default Sidebar;