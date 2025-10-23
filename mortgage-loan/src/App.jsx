import { useState } from "react";

export default function App() {
  const [formData, setFormData] = useState({
    amount: 0, // loan amount
    term: 0, // loan term in years
    interest: 0, // annual interest rate
  });
  const [calc, setCalc] = useState({
    mpa: 0, // monthly payment amount
    tpa: 0, // total payment amount
    tip: 0, // total interest paid
  });

  const handleChange = (evt) => {
    setFormData({
      ...formData,
      [evt.target.name]: evt.target.value,
    });
  };
  const handleSubmit = (evt) => {
    evt.preventDefault();

    const p = formData.amount; // loan amount
    const i = formData.interest / 12 / 100; // monthly interest rate
    const n = formData.term * 12; // loan term in years x 12
    const mpa = p * (i * ((1 + i) ** n)) / (((1 + i) ** n) - 1); // monthly payment amount
    const tpa = mpa * n; // total payment amount
    const tip = tpa - p; // total interest paid
    

    setCalc({
      mpa: formatCurrency(mpa),
      tpa: formatCurrency(tpa),
      tip: formatCurrency(tip),
    });
  };

  function formatCurrency(amount) {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-field">
        <label for="amount">Loan Amount: </label>
        <input
          value={formData["amount"]}
          onChange={handleChange}
          type="number"
          name="amount"
          id="amount"
        />
      </div>
      <div className="form-field">
        <label for="term">Loan Term: </label>
        <input
          value={formData["term"]}
          onChange={handleChange}
          type="number"
          name="term"
          id="term"
        />
      </div>
      <div className="form-field">
        <label for="interest">Interest Rate (%): </label>
        <input
          value={formData["interest"]}
          onChange={handleChange}
          type="number"
          name="interest"
          id="interest"
        />
      </div>
      <button type="submit">Calculate</button>

      <div style={{ marginTop: "40px" }}>
        <p>Monthly Payment Amount: {calc.mpa}</p>
        <p>Total Payment Amount: {calc.tpa}</p>
        <p>Total Interest Paid: {calc.tip}</p>
      </div>
    </form>
  );
}
