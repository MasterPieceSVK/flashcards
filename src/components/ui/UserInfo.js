export default function UserInfo({ info }) {
  console.log(info);
  return (
    <div className="bg-primary">
      <div>
        <h1>User Info</h1>
        <p>{info.username}</p>
        <p>{info.email}</p>
      </div>
    </div>
  );
}
