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

// Main component of the app
export default function App() {
  return (
    <div className="app">
      <div className="sidebar">
        {/* // Friend list and form to add a new friend */}
        <FriendsList />
        <FormAddFriend />
        <Button>Add friend</Button>
      </div>
      {/* // Split bill form */}
      <FormSplitBill />
    </div>
  );
}

// Component to display the list of friends
function FriendsList() {
  const friends = initialFriends;

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

// Component for the button used in various places
function Button({ children }) {
  return <button className="button">{children}</button>;
}

// Component to add a new friend
function FormAddFriend() {
  return (
    <form className="form-add-friend">
      <label>👭 Friend name</label>
      <input type="text" />

      <label>🖼 Image URL</label>
      <input type="text" />

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
