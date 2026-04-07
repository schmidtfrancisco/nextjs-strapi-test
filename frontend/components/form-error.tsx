export function FormError({ error }: { error?: string[] }) {
  if (!error || error.length === 0) return null;
  return error.map((err, index) => (
    <p key={index} className="text-sm text-red-500">
      {err}
    </p>
  ));
} 