import { useState } from "react";
import { FriendsList } from "./FriendsList";
import { FormAddFriend } from "./FormAddFriend";
import { FormSplitBill } from "./FormSplitBill";

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
export function Button({ children, onClick }) {
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
