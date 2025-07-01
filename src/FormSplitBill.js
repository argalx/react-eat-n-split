import { useState } from "react";
import { Button } from "./App";

// Component to split a bill with a friend
export function FormSplitBill({ friend, onSplitBill }) {
  // State to manage the bill amount, what the user has paid, and who is paying
  const [bill, setBill] = useState("");
  const [paidByUser, setPaidByUser] = useState("");
  const [whoIsPaying, setWhoIsPaying] = useState("user");

  // Calculate the amount paid by the friend based on the bill and what the user has paid
  // If the bill is not set, paidByFriend will be an empty string
  const paidByFriend = bill ? bill - paidByUser : "";

  function handleSubmit(e) {
    // Prevent the default form submission behavior
    e.preventDefault();

    // Check if the bill and paidByUser values are valid numbers
    if (!bill || !paidByUser) return;

    onSplitBill(
      // Call the onSplitBill function passed as a prop with the calculated values
      // Pass the values based on who is paying
      // If the user is paying, pass the paidByFriend value, otherwise pass the negative of paidByUser
      whoIsPaying === "user" ? paidByFriend : -paidByUser
    );
  }

  return (
    <form className="form-split-bill" onSubmit={handleSubmit}>
      <h2>Split a bill with {friend.name}</h2>

      <label>💰 Bill value</label>
      <input
        type="text"
        value={bill}
        onChange={(e) => setBill(Number(e.target.value))}
      />

      <label>🧒 Your expense</label>
      <input
        type="text"
        value={paidByUser}
        onChange={(e) =>
          setPaidByUser(
            // Ensure the paid amount does not exceed the bill
            Number(e.target.value) > bill ? paidByUser : Number(e.target.value)
          )
        }
      />

      <label>👭 {friend.name}'s expense</label>
      <input type="text" value={paidByFriend} disabled />

      <label>🤑 Who is paying the bill</label>
      <select
        value={whoIsPaying}
        onChange={(e) => setWhoIsPaying(e.target.value)}
      >
        <option value="user">You</option>
        <option value="friend">{friend.name}</option>
      </select>

      <Button>Split bill</Button>
    </form>
  );
}
