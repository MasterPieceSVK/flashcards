import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Custom404() {
  return (
    <div className="bg-primary flex justify-center items-center flex-col p-6 gap-7">
      <h1 className="text-2xl font-bold">Page not found :(</h1>
      <Button className="bg-black text-white hover:bg-gray-600" asChild>
        <Link href={"/dashboard"}>Go Back</Link>
      </Button>
    </div>
  );
}
