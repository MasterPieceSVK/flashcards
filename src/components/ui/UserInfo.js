import EditAccount from "./EditAccount";

export default function UserInfo({ info }) {
  console.log(info);
  return (
    <div className="flex justify-center flex-col items-center gap-5">
      <div className="  flex  flex-col gap-4 items-center sm:w-1/2 w-full bg-gradient-to-r from-blue-600 to-purple-500 rounded-xl p-7 justify-center ">
        <h1 className="text-center mt-4 font-bold text-xl bg-gray-800 p-5 text-white rounded-xl w-1/4">
          User Info:
        </h1>
        <p className="text-center bg-white p-5  rounded-lg ">
          <strong>Username:</strong> <br></br> {info.username}
        </p>
        <p className="text-center bg-white p-5 rounded-lg ">
          <strong>Email: </strong>
          <br></br> {info.email}
        </p>
        <EditAccount />
      </div>

      <div className="w-full flex justify-center flex-col items-center">
        <h2 className="text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-500 mb-4">
          Stats
        </h2>
        <div className="flex w-full flex-wrap gap-7 bg-black justify-around rounded-xl ">
          <div className="bg-black text-white flex items-center justify-center flex-col gap-4 min-w-fit p-10 mx-3 w-full sm:w-1/4">
            <p className="text-xl">You played</p>
            <p className="text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-500">
              {info.playedSetsCount}
            </p>
            <p className="text-xl">games</p>
          </div>
          <div className="bg-black text-white flex items-center justify-center flex-col gap-4 min-w-fit p-10 mx-3 w-full sm:w-1/4">
            <p className="text-xl">You liked</p>
            <p className="text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-500">
              {info.likedSetsCount}
            </p>
            <p className="text-xl">sets</p>
          </div>
          <div className="bg-black text-white flex items-center justify-center flex-col gap-4 min-w-fit p-10 mx-3 w-full sm:w-1/4">
            <p className="text-xl">You created</p>
            <p className="text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-500">
              {info.createdQuestionsCount}
            </p>
            <p className="text-xl">questions</p>
          </div>
          <div className="bg-black text-white flex items-center justify-center flex-col gap-4 min-w-fit p-10 mx-3 w-full sm:w-1/4">
            <p className="text-xl">You got</p>
            <p className="text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-500">
              {info.gottenLikesOnSetsCount}
            </p>
            <p className="text-lg">likes on your sets</p>
          </div>
          <div className="bg-black text-white flex items-center justify-center flex-col gap-4 min-w-fit p-10 mx-3 w-full sm:w-1/4">
            <p className="text-xl">You created</p>
            <p className="text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-500">
              {info.createdSetsCount}
            </p>
            <p className="text-lg">sets</p>
          </div>
        </div>
      </div>
    </div>
  );
}
