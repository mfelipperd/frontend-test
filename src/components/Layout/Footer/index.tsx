export function Footer() {
  return (
    <footer className="w-full border-t py-4 text-center text-sm text-muted-foreground fixed bottom-0   dark:text-gray-400">
      © {new Date().getFullYear()} | Created for test purposes by
      {" M.Felippe"}
    </footer>
  );
}
