import React, { useState } from 'react';

export const OrderTablesWithTabs = ({ orders, completeOrder, statusCafe, toggleCafe, clearHistory }) => {
  const [activeTab, setActiveTab] = useState(0);
  const [completedId, setCompletedId] = useState([]);

  const orders1 = orders?.filter(order => !order.complete && (order.type === "cafe" || order.type === 'tea'));
  const orders2 = orders?.filter(order => order.complete && (order.type === "cafe" || order.type === 'tea')).reverse();

  const handleTabClick = (index) => {
    setActiveTab(index);
  };

  const handleButtonComplete = (order) => {
    const newArray = [...completedId, order._id];
    setCompletedId(newArray);
    completeOrder(order._id);
  }

  return (
    <div className="table-container w-full">
      <h2 className="text-2xl">Order Tables</h2>
      
      <br />
      
      <div className="flex items-center justify-between mb-4">
        <div className="flex space-x-4">
          <button
            onClick={toggleCafe}
            className="px-4 py-2 rounded-lg bg-green-500 text-white font-bold hover:bg-green-600 transition-all"
          >
            {statusCafe ? 'Close Cafe' : 'Open Cafe'}
          </button>

          {activeTab === 1 && (
            <button
              onClick={clearHistory}
              className="px-4 py-2 rounded-lg bg-red-500 text-white font-bold hover:bg-red-600 transition-all"
            >
              Clear History
            </button>
          )}
        </div>

        <div className="tabs flex space-x-4">
          <button
            className={`px-4 py-2 rounded-lg font-bold ${
              activeTab === 0 ? 'bg-blue-500 text-white' : 'bg-gray-200 text-black'
            }`}
            onClick={() => handleTabClick(0)}
          >
            Orders
          </button>
          <button
            className={`px-4 py-2 rounded-lg font-bold ${
              activeTab === 1 ? 'bg-blue-500 text-white' : 'bg-gray-200 text-black'
            }`}
            onClick={() => handleTabClick(1)}
          >
            History
          </button>
        </div>
      </div>

      <div className="tab-content w-full">
        {activeTab === 0 && (
          orders1?.length > 0 ? (
            <table className="table-auto w-full bg-backgound text-colorPrimary shadow-lg">
              <thead className="uppercase text-lg">
                <tr>
                  <th className='py-3 px-1 text-center border-b border-backgroundDiff'>ID</th>
                  <th className='py-3 px-1 text-center border-b border-backgroundDiff'>Name</th>
                  <th className='py-3 px-1 text-center border-b border-backgroundDiff'>Count</th>
                  <th className='py-3 px-1 text-center border-b border-backgroundDiff'>Order ID</th>
                  <th className='py-3 px-1 text-center border-b border-backgroundDiff'>Ready</th>
                </tr>
              </thead>
              <tbody className="text-colorPrimary text-center text-md">
                {orders1.map((order, key) => (
                  <tr className="border-b border-backgroundDiff text-lg">
                    <td>{key+1}</td>
                    <td>{order.name}</td>
                    <td>{order.count}</td>
                    <td>{order.id_number}</td>
                    <td>
                      <button 
                        onClick={() => handleButtonComplete(order)} 
                        disabled={completedId.includes(order._id)}
                        className='px-4 py-2 rounded-lg bg-green-500 text-white font-bold hover:bg-green-600 transition-all'
                      >
                        Complete Order
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : <p>No pending orders</p>
        )}

        {activeTab === 1 && (
          <table className="table-auto w-full bg-backgound text-colorPrimary shadow-lg">
            <thead className="uppercase text-lg">
              <tr>
                <th className='py-3 px-1 text-center border-b border-backgroundDiff'>ID</th>
                <th className='py-3 px-1 text-center border-b border-backgroundDiff'>Name</th>
                <th className='py-3 px-1 text-center border-b border-backgroundDiff'>Count</th>
                <th className='py-3 px-1 text-center border-b border-backgroundDiff'>Order ID</th>
              </tr>
            </thead>
            <tbody className="text-colorPrimary text-center text-lg">
              {orders2?.map((order, key) => (
                <tr className="border-b border-backgroundDiff">
                  <td>{key+1}</td>
                  <td>{order.name}</td>
                  <td>{order.count}</td>
                  <td>{order.id_number}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};