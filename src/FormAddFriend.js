import { useState } from "react";
import { Button } from "./App";

// Component to add a new friend
export function FormAddFriend({ onAddFriend }) {
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
