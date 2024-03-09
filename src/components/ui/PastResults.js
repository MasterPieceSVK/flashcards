import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function PastResults({ results }) {
  return (
    <div>
      <h1 className="text-center font-semibold text-xl">Recent Results</h1>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="text-center font-semibold text-black">
              Right Answers
            </TableHead>
            <TableHead className="text-center font-semibold text-black">
              Wrong Answers
            </TableHead>
            <TableHead className="text-center font-semibold text-black">
              Accuracy
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {results.map((result, i) => {
            let percentage = 0;
            if (result.right_answers > 0 || result.wrong_answers > 0) {
              percentage =
                (result.right_answers /
                  (result.right_answers + result.wrong_answers)) *
                100;
              percentage = Number.isInteger(percentage)
                ? percentage
                : percentage.toFixed(2);
            }
            return (
              <TableRow key={i}>
                <TableCell className="text-center">
                  {result.right_answers}
                </TableCell>
                <TableCell className="text-center">
                  {result.wrong_answers}
                </TableCell>
                <TableCell className="text-center">{percentage}%</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}
