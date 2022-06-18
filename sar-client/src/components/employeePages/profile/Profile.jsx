import axios from 'axios';
import React, { useEffect } from 'react';
import { useState } from 'react';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const nav = useNavigate();
  const [cookies, setCookie, removeCookie] = useCookies(['user']);
  const [dataST, setDataST] = useState('');

  useEffect(() => {
    if (cookies.user && cookies.user.split('+')[1] == 'E') {
      const getProfile = async () => {
        const { data } = await axios.get(
          `/api/statistics?level=EmpStatisticPage&empId=${
            cookies.user.split('+')[0]
          }`
        );
        setDataST(data.table[0]);
      };
      getProfile();
    } else {
      nav('/emp/login', { replace: true });
    }
  }, [cookies.user]);

  return (
    <div className='container'>
      <h3 className='text-center m-5'>حسابي الشخصي</h3>

      <h6 className='text-center m-3'> إحصائياتي</h6>
      <div className='responsive-table'>
        <table className=' table table-hover table-bordered table-striped w-75 mx-auto text-center '>
          <tbody>
            <tr className='table-primary'>
              <th className='w-50'>مجموع الخصومات</th>
              <td>{dataST && dataST.discount}</td>
            </tr>

            <tr className='table-primary'>
              <th className='w-50'>مجموع العمولات من أجور التوصيل</th>
              <td>{dataST && dataST.deliveryComm}</td>
            </tr>

            <tr className='table-primary'>
              <th className='w-50'>مجموع العمولات</th>
              <td>{dataST && dataST.purchaseComm}</td>
            </tr>

            <tr className='table-primary'>
              <th className='w-50'>مجموع المكافئات</th>
              <td>{dataST && dataST.payOff}</td>
            </tr>
            <tr className='table-primary'>
              <th className='w-50'>المجموع النهائي للعمولات</th>
              <td>{dataST && dataST.finalComm}</td>
            </tr>
            <tr className='table-primary'>
              <th className='w-50'>المبلغ القبوض</th>
              <td>{dataST && dataST.totalPaid}</td>
            </tr>
            <tr className='table-primary'>
              <th className='w-50'>مجموع المتبقي</th>
              <td>{dataST && dataST.totalRemain}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Profile;
