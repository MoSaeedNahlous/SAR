import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Box, CircularProgress } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';

const Statics = () => {
  const nav = useNavigate();
  const [cookies, setCookie, removeCookie] = useCookies(['user']);
  useEffect(() => {
    if (!cookies.user) {
      nav('/manager/login', { replace: true });
    }
    if (cookies.user.split('+')[1] !== 'A') {
      nav('/', { replace: true });
    }
  }, [cookies.user]);
  const [allStats, setAllStats] = useState(null);
  const [allEmpStats, setAllEmpStats] = useState(null);
  useEffect(() => {
    const getAllStats = async () => {
      const { data } = await axios.get('/api/statistics?level=EmpStatisticAll');
      setAllStats(data.table[0]);
    };
    getAllStats();
    const getAllEmpStats = async () => {
      const { data } = await axios.get(
        '/api/statistics?level=EmpStatisticbyEmp'
      );
      setAllEmpStats(data.table);
    };
    getAllEmpStats();
  }, []);

  return (
    <div className='container mt-5'>
      {allStats === null ? (
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <CircularProgress size={80} color='grey' />
        </Box>
      ) : (
        <div className='table-responsive'>
          <table
            className='table table-bordered table-striped w-75 mx-auto'
            dir='rtl'
          >
            <thead>
              <tr className='bg-danger text-white'>
                <th>مجموع العمولات لكل المندوبين</th>
                <th> مجموع المبلغ المدفوع لكل المندوبين</th>
                <th>مجموع المبلغ المتبقي لكل المندوبين</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{allStats.allFinalComm}</td>
                <td>{allStats.allPaid}</td>
                <td>{allStats.allRemain}</td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
      {allEmpStats === null ? (
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <CircularProgress size={90} color='grey' />
        </Box>
      ) : (
        <div className='table-responsive'>
          <table
            className='table table-bordered table-striped w-75 mx-auto'
            dir='rtl'
          >
            <thead>
              <tr className='bg-primary text-white'>
                <th>ID</th>
                <th>اسم المندوب</th>
                <th>مجموع العمولات الكلي</th>
                <th>المبلغ المدفوع</th>
                <th>المبلغ المتبقي</th>
              </tr>
            </thead>
            <tbody>
              {allEmpStats.map((stat) => (
                <tr key={stat.empId}>
                  <td>{stat.empId}</td>
                  <td>{stat.empName}</td>
                  <td>{stat.finalComm}</td>
                  <td>{stat.totalpaid}</td>
                  <td>{stat.totalRemain}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Statics;
