export default function Header({ children }) {
  return (
    <header className="flex flex-col md:flex-row justify-between items-center gap-4">
      {children}
    </header>
  );
}
