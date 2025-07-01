import { useState } from "react";

// Initial friends data
const initialFriends = [
  {
    id: 118836,
    name: "Clark",
    image: "https://i.pravatar.cc/48?u=118836",
    balance: -7,
  },
  {
    id: 933372,
    name: "Sarah",
    image: "https://i.pravatar.cc/48?u=933372",
    balance: 20,
  },
  {
    id: 499476,
    name: "Anthony",
    image: "https://i.pravatar.cc/48?u=499476",
    balance: 0,
  },
];

// Reusable components

// Component for the button used in various places
function Button({ children, onClick }) {
  return (
    <button className="button" onClick={onClick}>
      {children}
    </button>
  );
}

// Main component of the app
export default function App() {
  // State to manage the visibility of the form to add a new friend
  const [formAddFriendIsOpen, setFormAddFriendIsOpen] = useState(false);

  // State to manage the list of friends
  const [friends, setFriends] = useState(initialFriends);

  // State to manage the selected friend (not used in this example, but can be extended)
  const [selectedFriend, setSelectedFriend] = useState(null);

  // Function to toggle the visibility of the form to add a new friend
  function toggleFormAddFriend() {
    setFormAddFriendIsOpen((isOpen) => !isOpen);
  }

  // Function to handle adding a new friend
  function handleAddFriend(newFriend) {
    // Add the new friend to the friends state
    setFriends((prevFriends) => [...prevFriends, newFriend]);

    // Close the form after adding the friend
    setFormAddFriendIsOpen((isOpen) => !isOpen);
  }

  // Function to handle selecting a friend (not fully implemented in this example)
  function handleSelectFriend(friend) {
    // Set the selected friend or toggle selection if the same friend is clicked using optional chaining
    setSelectedFriend((prevSelected) =>
      prevSelected?.id === friend.id ? null : friend
    );
    // Close the form to add a new friend when a friend is selected
    setFormAddFriendIsOpen(false);
  }

  // Function to handle splitting a bill with the selected friend
  function handleSplitBill(value) {
    // Check if a friend is selected
    setFriends((friends) =>
      friends.map((friend) =>
        // Update the balance of the selected friend by adding the value
        friend.id === selectedFriend.id
          ? { ...friend, balance: friend.balance + value }
          : friend
      )
    );

    // Reset the selected friend to null
    setSelectedFriend(null);
    // Close the form to add a new friend
    setFormAddFriendIsOpen(false);
  }

  return (
    <div className="app">
      <div className="sidebar">
        {/* // Friend list and form to add a new friend */}
        <FriendsList
          friends={friends}
          onSelectFriend={handleSelectFriend}
          selectedFriend={selectedFriend}
        />

        {/* // Display the form to add a new friend if it's open */}
        {formAddFriendIsOpen && <FormAddFriend onAddFriend={handleAddFriend} />}

        {/* // Button to toggle the form to add a new friend */}
        <Button onClick={toggleFormAddFriend}>
          {formAddFriendIsOpen ? "Close" : "Add friend"}
        </Button>
      </div>
      {/* // Split bill form */}
      {/* // Display the form to split a bill with a selected friend */}
      {selectedFriend && (
        <FormSplitBill friend={selectedFriend} onSplitBill={handleSplitBill} />
      )}
    </div>
  );
}

// Component to display the list of friends
function FriendsList({ friends, onSelectFriend, selectedFriend }) {
  return (
    <ul>
      {/* // Map through the friends array and render each Friend component */}
      {friends.map((friend) => (
        <Friend
          key={friend.id}
          friend={friend}
          onSelectFriend={onSelectFriend}
          selectedFriend={selectedFriend}
        />
      ))}
    </ul>
  );
}

// Component to display each friend's information
function Friend({ friend, onSelectFriend, selectedFriend }) {
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

// Component to add a new friend
function FormAddFriend({ onAddFriend }) {
  // State to manage the friend's name and image URL
  const [friendName, setFriendName] = useState("");
  const [imageUrl, setImageUrl] = useState("https://i.pravatar.cc/48");

  // Function to handle form submission
  function handleSubmit(e) {
    // Prevent the default form submission behavior
    e.preventDefault();

    // Check if the friend name is empty
    if (!friendName || !imageUrl) return;

    // Check if the image URL is empty, if so, set a default image URL
    const id = crypto.randomUUID(); // Generate a unique ID for the new friend
    // create a new friend object with the current state values
    const newFriend = {
      id: id, // Generate a unique ID for the new friend
      name: friendName,
      image: `${imageUrl}?=${id}`, // Use the image URL with the unique ID
      balance: 0,
    };

    // Call the onAddFriend function passed as a prop with the new friend object
    onAddFriend(newFriend);

    // Reset the form fields
    setFriendName("");
    setImageUrl("https://i.pravatar.cc/48");
  }

  return (
    <form className="form-add-friend" onSubmit={handleSubmit}>
      <label>👭 Friend name</label>
      <input
        type="text"
        value={friendName}
        onChange={(e) => setFriendName(e.target.value)}
      />

      <label>🖼 Image URL</label>
      <input
        type="text"
        value={imageUrl}
        onChange={(e) => setImageUrl(e.target.value)}
      />

      <Button>Add</Button>
    </form>
  );
}

// Component to split a bill with a friend
function FormSplitBill({ friend, onSplitBill }) {
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
