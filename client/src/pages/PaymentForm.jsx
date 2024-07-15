import React, { useEffect, useState } from 'react';
import axios from 'axios';

function PaymentList() {
  const [payments, setPayments] = useState([]);
  const [memberName, setMemberName] = useState('');
  const [amount, setAmount] = useState('');

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

  const handleAddPayment = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/payments', { memberName, amount });
      setPayments([...payments, response.data]);
      setMemberName('');
      setAmount('');
    } catch (error) {
      console.error('Error adding payment:', error);
    }
  };

  return (
    <div className="container mt-4">
      <h2>Payment Management</h2>

      {/* Add Payment Form */}
      <form onSubmit={handleAddPayment} className="mb-3">
        <div className="row g-3">
          <div className="col-sm-6">
            <label htmlFor="memberName" className="form-label">Member Name</label>
            <input type="text" className="form-control" id="memberName" value={memberName} onChange={(e) => setMemberName(e.target.value)} required />
          </div>
          <div className="col-sm-6">
            <label htmlFor="amount" className="form-label">Amount</label>
            <input type="number" className="form-control" id="amount" value={amount} onChange={(e) => setAmount(e.target.value)} required />
          </div>
        </div>
        <button type="submit" className="btn btn-primary mt-3">Add Payment</button>
      </form>

      {/* Payment List */}
      <div className="table-responsive">
        <table className="table table-bordered table-hover">
          <thead className="table-dark">
            <tr>
              <th scope="col">Member Name</th>
              <th scope="col">Amount</th>
            </tr>
          </thead>
          <tbody>
            {payments.map(payment => (
              <tr key={payment.id}>
                <td>{payment.memberName}</td>
                <td>{payment.amount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default PaymentList;
