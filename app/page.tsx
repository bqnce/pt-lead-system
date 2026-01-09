import Link from "next/link";

export default function Home() {
  return (
    <main className="p-8">
      <h1 className="text-2xl font-semibold">PT Lead System</h1>
      <p className="mt-2 opacity-80">Demo:</p>
      <Link className="mt-4 inline-block underline" href="/demo">
        /demo
      </Link>
    </main>
  );
}
