import React, { useEffect, useState } from "react";
import axios from "axios";

function ReturnBook() {
  const [transactionData, setTransactionData] = useState([]);
  const [transactionId, setTransactionId] = useState("");
  const [memberId, setMemberId] = useState("");
  const [memberData, setMemberData] = useState({});
  const [outstaDebt, setoutstaDebt] = useState("");
  const [rentFee, setRentFee] = useState("");
  const [transactionField, setTransactionField] = useState({
    book_id: "",
    member_id: "",
    transaction_type: "",
    _date: "",
    rent_fee: "",
  });

  useEffect(() => {
    fetchTransaction();
  }, []);

  const fetchTransaction = async () => {
    try {
      const result = await axios("http://127.0.0.1:5000/transactions");
      setTransactionData(result.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchMember = async () => {
    try {
      const result = await axios("http://127.0.0.1:5000/member/" + memberId);
      setMemberData(result.data);
      setoutstaDebt(memberData.outstanding_debt);
    } catch (error) {
      console.log(error);
    }
  };

  const changeTransactionFieldHandler = (e) => {
    setTransactionField({
      ...transactionField,
      [e.target.name]: e.target.value,
    });
  };

  const debtUpdate = async () => {
    try {
      await axios.put("http://127.0.0.1:5000/debtupdate/" + memberId, {
        outstanding_debt: parseFloat(rentFee) + parseFloat(outstaDebt),
      });
    } catch (error) {
      console.log(error);
    }
  };

  const onSubmitUpdateTran = async () => {
    try {
      const response = await axios.put(
        "http://127.0.0.1:5000/transaction/" + transactionId,
        transactionField
      );
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div className="d-flex mb-4">
        <h3>Book Return</h3>
      </div>

      <table className="table table-bordered">
        <thead>
          <tr>
            <th>No.</th>
            <th>Full Name</th>
            <th>Book Title</th>
            <th>Charge Rent Fee</th>
          </tr>
        </thead>
        <tbody>
          {transactionData.map((transaction, i) => {
            return (
              <tr key={i}>
                <td>{i + 1}</td>
                <td>{transaction.full_name}</td>
                <td>{transaction.book_title}</td>
                <td>
                  <input
                    type="number"
                    className="form-control"
                    id="rent_fee"
                    placeholder="Enter Rent Fee"
                    name="rent_fee"
                    onChange={(e) => changeTransactionFieldHandler(e)}
                    required
                  />
                </td>
                <td className="d-flex">
                  <button
                    className="btn btn-primary ms-2"
                    onClick={() => {
                      setTransactionField({
                        ...transactionField,
                        book_id: transaction.book_id,
                        member_id: transaction.member_id,
                        transaction_type: "return",
                        _date: new Date().toJSON().slice(0, 10),
                      });
                      setTransactionId(transaction.id);
                      setMemberId(transaction.member_id);
                      setRentFee(transaction.rent_fee);
                      onSubmitUpdateTran();
                      fetchMember();
                      debtUpdate();
                      console.log(transactionField);
                      console.log("transaction id: " + transactionId);
                      console.log("member id: " + memberId);
                      console.log("rent fee: " + rentFee);
                      alert("Rent Fee Added");
                    }}
                  >
                    Return Book
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default ReturnBook;
