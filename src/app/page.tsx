import Button from "@/components/ui/Button";
import { Card, CardBody, CardHeader } from "@/components/ui/Card";

export default function Home() {
  return (
    <div>
      <Button variant="primary">Primary Button</Button>
      <Button variant="secondary">Secondary Button</Button>
      <Button>Default Button</Button>

      <Card>
        <CardHeader>Card Title</CardHeader>
        <CardBody>This is a reusable card styled with styled-components and TypeScript.</CardBody>
      </Card>
    </div>
  );
}
