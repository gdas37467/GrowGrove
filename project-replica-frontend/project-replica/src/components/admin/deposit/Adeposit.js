import React from 'react';
import { useState } from 'react';

const DepositTable = ({ transactions, onApprove,page}) => {
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
    <div className='container py-8 text-white '>
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white">
        <thead>
          <tr>
          <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider">
              Date & Time
            </th>
            <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider">
              Username
            </th>
            <th className={`px-6 py-3 border-b-2 border-gray-300 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider ${page === 'withdraw' ? 'hidden' : 'visible'}`}>
              Quantity
            </th>
            <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider">
              Amount
            </th>
            <th className={`px-6 py-3 border-b-2 border-gray-300 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider ${page === 'withdraw' ? 'hidden' : 'visible'}`}>
              Transaction ID
            </th>
            
            <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider">
              Status
            </th>
            <th className="px-6 py-3 border-b-2 border-gray-300"></th>
          </tr>
        </thead>

        {/* {
                empty===true && (
                  <tbody className="">
                    <tr>
                      <td className="" colSpan="5">
                      <div className="text-slate-600 flex justify-center" > <div className="my-5">Your Cart is Empty</div>
                      </div>

                      </td>
                    </tr>
                    
                  </tbody>
                )
              } */}
        <tbody>
          {currentTransactions && currentTransactions.map((transaction,index) => (
            <tr key={index}>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{transaction.date}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{transaction.username}</td>
              <td className={`px-6 py-4 whitespace-nowrap text-sm text-gray-500 ${page === 'withdraw' ? 'hidden' : 'visible'}`}>{transaction.quantity}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{page === 'withdraw' ? transaction.amount : transaction.quantity*100}</td>
              <td className={`px-6 py-4 whitespace-nowrap text-sm text-gray-500 ${page === 'withdraw' ? 'hidden' : 'visible'}`}>
              {transaction.transaction_id}
            </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {transaction.status}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                {transaction.status === 'pending' && (
                  <button
                    onClick={() => onApprove(transaction.id)}
                    className="px-4 py-2 text-xs font-semibold text-white uppercase bg-green-500 rounded hover:bg-green-600 focus:outline-none"
                  >
                    Approve
                  </button>
                )}
              </td>
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

export default DepositTable;