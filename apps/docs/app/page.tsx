import { Button } from "@repo/ui/components/ui/button";
import Test from "@/components/test";
import { Alert } from '@repo/ui/components/ui/alert'

export default function Page() {
  return (
    <main>
      <Test />
      <Button>Click me!!</Button>
      <Alert>My alert here</Alert>
    </main>
  );
}
