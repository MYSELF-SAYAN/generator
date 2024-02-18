import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
const SqlModal = ({ isOpen, setIsOpen }) => {
  const [history, setHistory] = useState([]);
  const user = useSelector(state => state.auth);
  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get(`http://localhost:5000/api/prompt/${user.email}`);

      setHistory(res.data);
    }
    fetchData();
  }, [])
  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get(`http://localhost:5000/api/prompt/${user.email}`);

      setHistory(res.data);
    }
    fetchData();
  }, [isOpen])
  
  return (
    <div className={`${isOpen ? 'block' : "hidden"} fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center  `}>
      <div className='bg-gray-700  p-2 rounded-xl max-w-[50%] max-h-[50%] overflow-y-auto'>
        <h1 className='text-4xl mb-5 '>History</h1>
        <div>
          {history && history.map((item) => (
            <div key={item._id} className='flex justify-between '>
              <p className='p-2 bg-slate-900 my-2 rounded-xl min-w-full'>{item.prompts}</p>

            </div>
          ))}
        </div>
      </div>


    </div>
  );
}

export default SqlModal;
