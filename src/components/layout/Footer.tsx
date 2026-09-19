import { Link } from 'react-router-dom';

export function Footer() {
  return (
    <footer className="mt-24 border-t border-ink-900/5 bg-brand-50/40">
      <div className="container mx-auto grid gap-12 px-6 py-16 md:grid-cols-4">
        <div className="md:col-span-2">
          <Link to="/" className="font-display text-2xl font-semibold tracking-tight">
            MAISON<span className="text-brand-500">.</span>
          </Link>
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-ink-900/60">
            أزياء تُروى بالأناقة. قطع مختارة بعناية، حرفية عالية، وتفاصيل صادقة.
          </p>
        </div>

        <div>
          <h3 className="mb-4 text-xs font-semibold uppercase tracking-wider text-ink-900/50">
            تسوّق
          </h3>
          <ul className="space-y-2 text-sm">
            <li><Link to="/shop" className="text-ink-900/70 hover:text-ink-900">كل المنتجات</Link></li>
            <li><Link to="/shop?sort=newest" className="text-ink-900/70 hover:text-ink-900">الأحدث</Link></li>
            <li><Link to="/shop?featured=1" className="text-ink-900/70 hover:text-ink-900">المميزة</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="mb-4 text-xs font-semibold uppercase tracking-wider text-ink-900/50">
            الشركة
          </h3>
          <ul className="space-y-2 text-sm">
            <li><Link to="/about" className="text-ink-900/70 hover:text-ink-900">من نحن</Link></li>
            <li><a href="mailto:info@maison.iq" className="text-ink-900/70 hover:text-ink-900">اتصل بنا</a></li>
          </ul>
        </div>
      </div>

      <div className="border-t border-ink-900/5">
        <div className="container mx-auto flex flex-col items-center justify-between gap-3 px-6 py-6 text-xs text-ink-900/50 md:flex-row">
          <p>© {new Date().getFullYear()} MAISON. جميع الحقوق محفوظة.</p>
          <p>صُنع بعناية في العراق</p>
        </div>
      </div>
    </footer>
  );
}
