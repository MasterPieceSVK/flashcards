export default function QuestionCard({ q, a }) {
  return (
    <div className="bg-primary rounded-2xl p-8 flex flex-col gap-5 w-1/2">
      <div>
        <h1 className="font-bold text-xl">Question:</h1>
        <h1>{q}</h1>
      </div>
      <div>
        <h1 className="font-bold text-xl">Answer:</h1>
        <h1>{a}</h1>
      </div>
    </div>
  );
}
