export default function Footer() {
  const links = [
    { label: 'Shipping & Returns', href: '#' },
    { label: 'Stores', href: '#' },
    { label: 'Support', href: '#' },
    { label: 'Privacy', href: '#' },
  ]

  return (
    <footer className="border-t border-gray-100 bg-white">
      <div className="max-w-6xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <p className="text-xl font-bold">ANOMIE</p>
          <p className="mt-2 text-sm text-gray-600">STANDARD DEVIATION — Menswear</p>
        </div>
        <nav className="grid grid-cols-2 gap-3">
          {links.map((l) => (
            <a key={l.label} href={l.href} className="text-sm text-gray-700 hover:text-gray-900">
              {l.label}
            </a>
          ))}
        </nav>
        <div className="text-sm text-gray-500 flex items-end md:justify-end">© {new Date().getFullYear()} ANOMIE. All rights reserved.</div>
      </div>
    </footer>
  )
}
