import React, { useState } from 'react';

const transactions = [
    {
        name: 'Arunabh',
        referrerName: 'Abhijeet',
        refereeID: 'abc123',
        enrollmentDate: '2023-07-01',
      
      },
      {
        name: 'Arunabh',
        referrerName: 'Abhijeet',
        refereeID: 'abc123',
        enrollmentDate: '2023-07-01',
      
      },
      {
        name: 'Arunabh',
        referrerName: 'Abhijeet',
        refereeID: 'abc123',
        enrollmentDate: '2023-07-01',
      
      },
      {
        name: 'Arunabh',
        referrerName: 'Abhijeet',
        refereeID: 'abc123',
        enrollmentDate: '2023-07-01',
      
      },
      {
        name: 'Arunabh',
        referrerName: 'Abhijeet',
        refereeID: 'abc123',
        enrollmentDate: '2023-07-01',
      
      },
      {
        name: 'Arunabh',
        referrerName: 'Abhijeet',
        refereeID: 'abc123',
        enrollmentDate: '2023-07-01',
      
      },
];

const ReferralTable = (props) => {
  const [currentPage, setCurrentPage] = useState(1);
  const transactionsPerPage = 10;
  const totalPages = Math.ceil(transactions.length / transactionsPerPage);
  const indexOfLastTransaction = currentPage * transactionsPerPage;
  const indexOfFirstTransaction = indexOfLastTransaction - transactionsPerPage;
  const currentTransactions = transactions.slice(indexOfFirstTransaction, indexOfLastTransaction);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="container  py-8 text-white ">
      <h1 className=" text-lg md:text-2xl font-bold mb-4">{props.title} Referrals</h1>
      <div className='overflow-x-auto'>
      <table className="min-w-full text-white border text-sm md:text-md border-gray-200 bg-gray-900">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b text-left">Name</th>
            <th className="py-2 px-4 border-b text-left">ReferrerName</th>
            <th className="py-2 px-4 border-b text-left">RefereeID</th>
            <th className="py-2 px-4 border-b text-left">EnrollmentDate</th>
        
          </tr>
        </thead>
        <tbody>
          {currentTransactions.map((transaction, index) => (
            <tr key={index}>
              <td className="py-2 px-4 border-b">{transaction.name}</td>
              <td className="py-2 px-4 border-b">{transaction.referrerName}</td>
              <td className="py-2 px-4 border-b">{transaction.refereeID}</td>
              <td className="py-2 px-4 border-b">{transaction.enrollmentDate}</td>
             
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
                  page === currentPage ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'
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