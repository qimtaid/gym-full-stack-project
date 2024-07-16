import React, { useEffect, useState } from 'react';
import axios from 'axios';

function PaymentList() {
  const [payments, setPayments] = useState([]);
  const [members, setMembers] = useState([]);
  const [selectedMember, setSelectedMember] = useState('');
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState('');
  const [showForm, setShowForm] = useState(false); // State to manage form visibility

  useEffect(() => {
    fetchPayments();
    fetchMembers(); // Fetch members when component mounts
  }, []);

  const fetchPayments = async () => {
    try {
      const response = await axios.get('http://localhost:5000/payments');
      setPayments(response.data);
    } catch (error) {
      console.error('Error fetching payments:', error);
    }
  };

  const fetchMembers = async () => {
    try {
      const response = await axios.get('http://localhost:5000/members');
      setMembers(response.data);
    } catch (error) {
      console.error('Error fetching members:', error);
    }
  };

  const handleAddPayment = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/payments', { memberName: selectedMember, amount, date });
      setPayments([...payments, response.data]);
      setSelectedMember('');
      setAmount('');
      setDate('');
      setShowForm(false); // Hide the form after successful submission
    } catch (error) {
      console.error('Error adding payment:', error);
    }
  };

  return (
    <div className="container mt-4">
      <h2>Payment Management</h2>

      {/* Button to toggle the form */}
      <button className="btn btn-primary mb-3" onClick={() => setShowForm(!showForm)}>
        {showForm ? 'Hide Payment Form' : 'Add Payment'}
      </button>

      {/* Add Payment Form */}
      {showForm && (
        <form onSubmit={handleAddPayment} className="mb-3">
          <div className="row g-3">
            <div className="col-sm-6">
              <label htmlFor="memberName" className="form-label">Member Name</label>
              <select className="form-select" id="memberName" value={selectedMember} onChange={(e) => setSelectedMember(e.target.value)} required>
                <option value="">Select Member</option>
                {members.map(member => (
                  <option key={member.id} value={member.name}>{member.name}</option>
                ))}
              </select>
            </div>
            <div className="col-sm-3">
              <label htmlFor="amount" className="form-label">Amount</label>
              <input type="number" className="form-control" id="amount" value={amount} onChange={(e) => setAmount(e.target.value)} required />
            </div>
            <div className="col-sm-3">
              <label htmlFor="date" className="form-label">Date</label>
              <input type="date" className="form-control" id="date" value={date} onChange={(e) => setDate(e.target.value)} required />
            </div>
          </div>
          <button type="submit" className="btn btn-primary mt-3">Add Payment</button>
        </form>
      )}

      {/* Payment List */}
      <div className="table-responsive">
        <table className="table table-bordered table-hover">
          <thead className="table-dark">
            <tr>
              <th scope="col">Member Name</th>
              <th scope="col">Amount</th>
              <th scope="col">Date</th>
            </tr>
          </thead>
          <tbody>
            {payments.map(payment => (
              <tr key={payment.id}>
                <td>{payment.member.name}</td>
                <td>{payment.amount}</td>
                <td>{new Date(payment.date).toLocaleDateString()}</td> {/* Format date for display */}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default PaymentList;
