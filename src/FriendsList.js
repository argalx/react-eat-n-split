import { Friend } from "./Friend";

// Component to display the list of friends
export function FriendsList({ friends, onSelectFriend, selectedFriend }) {
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
