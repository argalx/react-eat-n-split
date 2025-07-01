import { Button } from "./App";

// Component to display each friend's information

export function Friend({ friend, onSelectFriend, selectedFriend }) {
  // Check if the current friend is selected using optional chaining
  const isSelected = selectedFriend?.id === friend.id;

  return (
    <li className={isSelected ? "selected" : ""}>
      {/* // Display friend's image */}
      <img src={friend.image} alt={friend.name} />

      {/* // Display friend's name */}
      <h3>{friend.name}</h3>

      {/* // Display balance with different styles based on the value */}
      {friend.balance < 0 && (
        <p className="red">
          You owe {friend.name} ${Math.abs(friend.balance)}
        </p>
      )}
      {friend.balance > 0 && (
        <p className="green">
          {friend.name} owes you ${friend.balance}
        </p>
      )}
      {friend.balance === 0 && <p>You and {friend.name} are even</p>}
      <Button onClick={() => onSelectFriend(friend)}>
        {isSelected ? "Close" : "Select"}
      </Button>
    </li>
  );
}
