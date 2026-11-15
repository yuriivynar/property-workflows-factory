import { Alert, AlertDescription } from "@/components/ui/alert";
import { TextLink } from "@/components/ui/text-link";
import { LABELS } from "@/lib/runs/messages";

// Спільний екран «Run not found» для керівника і підрядника: заголовок, можливе повідомлення про помилку, посилання назад.
export function RunNotFound({ title, message }: { title: string; message?: string }) {
  return (
    <main className="mx-auto flex w-full max-w-3xl flex-1 flex-col gap-6 px-4 py-10">
      <h1 className="text-2xl font-semibold">{title}</h1>
      {message ? (
        <Alert variant="destructive">
          <AlertDescription>{message}</AlertDescription>
        </Alert>
      ) : null}
      <TextLink href="/runs" className="w-fit text-sm">
        {LABELS.backToRuns}
      </TextLink>
    </main>
  );
}
