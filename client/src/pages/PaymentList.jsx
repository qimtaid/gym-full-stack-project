import React, { useEffect, useState } from 'react';
import axios from 'axios';

function PaymentList() {
  const [payments, setPayments] = useState([]);

  useEffect(() => {
    fetchPayments();
  }, []);

  const fetchPayments = async () => {
    try {
      const response = await axios.get('/payments');
      setPayments(response.data);
    } catch (error) {
      console.error('Error fetching payments:', error);
    }
  };

  return (
    <div>
      <h2>Payment Management</h2>
      <ul>
        {payments.map(payment => (
          <li key={payment.id}>{payment.memberName} - {payment.amount}</li>
        ))}
      </ul>
    </div>
  );
}

export default PaymentList;
