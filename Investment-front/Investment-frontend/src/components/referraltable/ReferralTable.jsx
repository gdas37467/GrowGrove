import React, { useState } from 'react';

// const transactions = [
//     {
//         name: 'Arunabh',
//         referrerName: 'Abhijeet',
//         refereeID: 'abc123',
//         enrollmentDate: '2023-07-01',
      
//       },
//       {
//         name: 'Arunabh',
//         referrerName: 'Abhijeet',
//         refereeID: 'abc123',
//         enrollmentDate: '2023-07-01',
      
//       },
//       {
//         name: 'Arunabh',
//         referrerName: 'Abhijeet',
//         refereeID: 'abc123',
//         enrollmentDate: '2023-07-01',
      
//       },
//       {
//         name: 'Arunabh',
//         referrerName: 'Abhijeet',
//         refereeID: 'abc123',
//         enrollmentDate: '2023-07-01',
      
//       },
//       {
//         name: 'Arunabh',
//         referrerName: 'Abhijeet',
//         refereeID: 'abc123',
//         enrollmentDate: '2023-07-01',
      
//       },
//       {
//         name: 'Arunabh',
//         referrerName: 'Abhijeet',
//         refereeID: 'abc123',
//         enrollmentDate: '2023-07-01',
      
//       },
// ];

const ReferralTable = (props) => {
  const [currentPage, setCurrentPage] = useState(1);
  const transactionsPerPage = 10;
  const totalPages = Math.ceil(props.level.length / transactionsPerPage);
  const indexOfLastTransaction = currentPage * transactionsPerPage;
  const indexOfFirstTransaction = indexOfLastTransaction - transactionsPerPage;
  const currentTransactions = props.level.slice(indexOfFirstTransaction, indexOfLastTransaction);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="container  py-8 text-white ">
      <h1 className=" text-lg md:text-2xl font-georgia text-white mb-4 flex"><span className='mr-2 mt-1'>{props.icon}</span>{props.title} Referrals</h1>
      <div className='overflow-x-auto'>
      <table className="min-w-full text-white border text-sm md:text-lg border-violet-600 font-georgia  bg-gray-900">
        <thead>
          <tr>
          <th className="py-2 px-4 border-b border-b-violet-600 text-left ">Referee ID</th>
            <th className="py-2 px-4 border-b text-left border-b-violet-600 text-violet-600">Name</th>
            <th className="py-2 px-4 border-b border-b-violet-600 text-left">Sponsor ID</th>
            <th className="py-2 px-4 border-b border-b-violet-600 text-left">Total Packages</th>
            <th className="py-2 px-4 border-b border-b-violet-600 text-left">Volume</th>

            
            <th className="py-2 px-4 border-b border-b-violet-600 text-left">EnrollmentDate</th>
        
          </tr>
        </thead>
        <tbody>
          {
            currentTransactions.length === 0 && (
              <td className="" colSpan="6">
                <div className='py-2 px-4 flex justify-center'>List is Empty</div></td>
            )
          }
          {currentTransactions.map((transaction, index) => (
            <tr key={index}>
              <td className="py-2 px-4 border-b border-b-violet-600">{transaction.username}</td>
              <td className="py-2 px-4 border-b border-b-violet-600">{transaction.name}</td>
              <td className="py-2 px-4 border-b border-b-violet-600">{transaction.sponsorId}</td>
              <td className="py-2 px-4 border-b border-b-violet-600">{transaction.totalPackages}</td>
              <td className="py-2 px-4 border-b border-b-violet-600">₹{transaction.totalPackages*500}</td>
              
              <td className="py-2 px-4 border-b border-b-violet-600">{transaction.date}</td>
             
            </tr>
          ))}
        </tbody>
      </table>
      </div>
      
      <div className="flex justify-center mt-4">
        <nav>
          <ul className="pagination">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <li
                key={page}
                className={`${
                  page === currentPage ? 'bg-violet-500 text-white' : 'bg-gray-200 text-gray-700'
                } inline-block mx-1 py-1 px-3 rounded cursor-pointer`}
                onClick={() => paginate(page)}
              >
                {page}
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default ReferralTable;