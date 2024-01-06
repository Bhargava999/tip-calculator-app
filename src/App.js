import { useState } from "react";
import DollerIcon from "./images/icon-dollar.svg";
import ProfileIcon from "./images/icon-person.svg";
import Logo from "./images/logo.svg";

export default function App() {
  const [bill, setBill] = useState();
  const [noOfPeople, setNoOfPeople] = useState();
  const [isSelectedTip, setSelectedTip] = useState(0.05);
  const [customtip, setCTip] = useState();

  let tip;
  let total;
  if (bill > 0 && noOfPeople > 0) {
    tip = Math.round(bill * (isSelectedTip / 100 / noOfPeople));
    total = Math.round((bill + tip) / noOfPeople);
  } else {
    tip = 0;
    total = 0;
  }

  function handleClick() {
    setBill(0);
    setNoOfPeople(0);
    setSelectedTip(0);
    setCTip();
  }
  return (
    <main className="app">
      <h1>
        <img src={Logo} alt="logo" />
      </h1>
      <div className="container">
        <Bill
          bill={bill}
          onBill={setBill}
          noOfPeople={noOfPeople}
          onPeople={setNoOfPeople}
          customtip={customtip}
          onCustomTip={setCTip}
          isSelectedTip={isSelectedTip}
          onSelectedTip={setSelectedTip}
        />
        <Amount tip={tip} total={total} handleClick={handleClick} />
      </div>
    </main>
  );
}

function Bill({
  bill,
  onBill,
  noOfPeople,
  onPeople,
  customtip,
  onCustomTip,
  isSelectedTip,
  onSelectedTip,
}) {
  return (
    <form className="bill">
      <div className="input-container">
        <label>Bill</label>
        <p className="error-msg">{bill > 0 ? "" : "Can't be Zero"}</p>
        <img className="icon" src={DollerIcon} alt="dollericon" />
        <input
          type="number"
          placeholder="0"
          value={bill}
          onChange={(e) => onBill(Number(e.target.value))}
        />
      </div>

      <div className="tip-section">
        <label>Select Tip %</label>
        <div
          className="tip-amount-wrapper"
          value={isSelectedTip}
          onChange={(e) => onSelectedTip(e.target.value)}
        >
          <div className="tip-amount">
            <input name="tip" value="5" type="radio" />
            <div className="tip-btn">5%</div>
          </div>
          <div className="tip-amount">
            <input name="tip" value="10" type="radio" />
            <div className="tip-btn">10%</div>
          </div>
          <div className="tip-amount">
            <input name="tip" value="15" type="radio" />
            <div className="tip-btn">15%</div>
          </div>
          <div className="tip-amount">
            <input name="tip" value="25" type="radio" />
            <div className="tip-btn">25%</div>
          </div>
          <div className="tip-amount">
            <input name="tip" value="50" type="radio" />
            <div className="tip-btn">50%</div>
          </div>
          <input
            className="tip-custom"
            type="number"
            value={customtip}
            onChange={(e) => onCustomTip(Number(e.target.value))}
            placeholder="Custom"
          />
        </div>
      </div>
      <div className="input-container">
        <label>Number of People</label>
        <p className="error-msg">{noOfPeople > 0 ? "" : "Can't be zero"}</p>
        <img className="icon" src={ProfileIcon} alt="dollericon" />
        <input
          type="number"
          placeholder="0"
          value={noOfPeople}
          onChange={(e) => onPeople(Number(e.target.value))}
        />
      </div>
    </form>
  );
}

function Amount({ tip, total, handleClick }) {
  return (
    <div className="display-amount">
      <div>
        <AmountValue value={tip > 0 ? tip : "0.00 "}>Tip amount</AmountValue>
        <AmountValue value={total > 0 ? total : "0.00"}>Total</AmountValue>
      </div>
      <button className="btn" disabled={!total > 0} onClick={handleClick}>
        Reset
      </button>
    </div>
  );
}

function AmountValue({ value, children }) {
  return (
    <div className="amount-value">
      <h4>
        {children}
        <small>/Person</small>
      </h4>
      <p className="amount">${value}</p>
    </div>
  );
}
