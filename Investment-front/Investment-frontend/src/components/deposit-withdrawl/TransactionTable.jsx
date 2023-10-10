import { useState } from 'react';

// const transactions = [
//     {
//         time: '2023-07-01 09:30:00',
//         walletAddress: '0x123456789abcdef',
//         transactionId: 'abc123',
//         amount: 10.0,
//         status: 'Completed',
//       },
//       {
//         time: '2023-07-01 10:15:00',
//         walletAddress: '0x987654321fedcba',
//         transactionId: 'def456',
//         amount: 5.0,
//         status: 'Pending',
//       },
//       {
//         time: '2023-07-01 09:30:00',
//         walletAddress: '0x123456789abcdef',
//         transactionId: 'abc123',
//         amount: 10.0,
//         status: 'Completed',
//       },
//       {
//         time: '2023-07-01 10:15:00',
//         walletAddress: '0x987654321fedcba',
//         transactionId: 'def456',
//         amount: 5.0,
//         status: 'Pending',
//       },
//       {
//         time: '2023-07-01 09:30:00',
//         walletAddress: '0x123456789abcdef',
//         transactionId: 'abc123',
//         amount: 10.0,
//         status: 'Completed',
//       },
//       {
//         time: '2023-07-01 10:15:00',
//         walletAddress: '0x987654321fedcba',
//         transactionId: 'def456',
//         amount: 5.0,
//         status: 'Pending',
//       },
// ];

const TransactionTable = (props) => {
  const [currentPage, setCurrentPage] = useState(1);
  const transactionsPerPage = 10;
  const totalPages = Math.ceil(props.transactions.length / transactionsPerPage);
  const indexOfLastTransaction = currentPage * transactionsPerPage;
  const indexOfFirstTransaction = indexOfLastTransaction - transactionsPerPage;
  const currentTransactions = props.transactions.slice(indexOfFirstTransaction, indexOfLastTransaction);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };


  const class_ = (status) => 
  {
    if(status === 'Expired')
      return 'text-red-500';
    else if(status === 'Pending')
      return 'text-orange-500'
    else
      return 'text-green-500'
  }

  return (
    <div className="container font-georgia py-8 text-white ">
      <h1 className=" text-lg md:text-2xl font-bold mb-4">{props.title} History</h1>
      <div className='overflow-x-auto'>
      <table className="min-w-full text-white border text-sm md:text-md border-violet-600 bg-gray-900">
        <thead>
          <tr>
          <th className="py-2 px-4 border-b border-b-violet-600 text-left ">Sl. </th>
            <th className="py-2 px-4 border-b border-b-violet-600 text-left">Date</th>
           
            <th className="py-2 px-4 border-b border-b-violet-600 text-violet-600 text-left">Amount</th>
            <th className="py-2 px-4 border-b border-b-violet-600 text-left">Status</th>
          </tr>
        </thead>
        <tbody>
          {
            currentTransactions.length === 0 && (
              <td className="" colSpan="5">
                <div className='py-2 px-4 flex justify-center'>List is Empty</div></td>
            )
          }
          {currentTransactions && currentTransactions.map((transaction, index) => (
            <tr key={index}>
              <td className="py-2 px-4 border-b border-b-violet-600">{index+1}</td>
              <td className="py-2 px-4 border-b border-b-violet-600">{transaction.date}</td>
              <td className="py-2 px-4 border-b border-b-violet-600 text-violet-600">₹{transaction.amount}</td>
              <td className={`py-2 px-4 border-b border-b-violet-600 ${class_(transaction.status)}`}>{transaction.status}</td>
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

export default TransactionTable;