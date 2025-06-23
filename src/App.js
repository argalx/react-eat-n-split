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

  const [friends, setFriends] = useState(initialFriends);

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

  return (
    <div className="app">
      <div className="sidebar">
        {/* // Friend list and form to add a new friend */}
        <FriendsList friends={friends} />

        {/* // Display the form to add a new friend if it's open */}
        {formAddFriendIsOpen && <FormAddFriend onAddFriend={handleAddFriend} />}

        {/* // Button to toggle the form to add a new friend */}
        <Button onClick={toggleFormAddFriend}>
          {formAddFriendIsOpen ? "Close" : "Add friend"}
        </Button>
      </div>
      {/* // Split bill form */}
      <FormSplitBill />
    </div>
  );
}

// Component to display the list of friends
function FriendsList({ friends }) {
  return (
    <ul>
      {/* // Map through the friends array and render each Friend component */}
      {friends.map((friend) => (
        <Friend key={friend.id} friend={friend} />
      ))}
    </ul>
  );
}

// Component to display each friend's information
function Friend({ friend }) {
  return (
    <li>
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
      <Button>Select</Button>
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
function FormSplitBill() {
  return (
    <form className="form-split-bill">
      <h2>Split a bill with X</h2>

      <label>💰 Bill value</label>
      <input type="text" />

      <label>🧒 Your expense</label>
      <input type="text" />

      <label>👭 X's expense</label>
      <input type="text" disabled />

      <label>🤑 Who is paying the bill</label>
      <select>
        <option value="user">You</option>
        <option value="friend">X</option>
      </select>

      <Button>Split bill</Button>
    </form>
  );
}
