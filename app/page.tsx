import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Nav */}
      <nav className="flex items-center justify-between px-6 py-4 bg-white border-b border-slate-100">
        <span className="text-xl font-bold text-emerald-700">Invest&apos;Or</span>
        <Link
          href="/funnel"
          className="text-sm font-medium text-emerald-700 hover:text-emerald-800"
        >
          Démarrer mon évaluation
        </Link>
      </nav>

      {/* Hero */}
      <main className="flex flex-col items-center justify-center flex-1 px-6 py-24 text-center">
        <div className="max-w-2xl mx-auto">
          <span className="inline-block px-3 py-1 mb-6 text-xs font-semibold tracking-wide text-emerald-700 uppercase bg-emerald-50 rounded-full border border-emerald-200">
            Conseil en investissement personnalisé
          </span>
          <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl leading-tight mb-6">
            Faites fructifier votre argent avec une stratégie sur mesure
          </h1>
          <p className="text-lg text-slate-600 mb-10 leading-relaxed">
            En 2 minutes, découvrez votre profil investisseur et obtenez une
            stratégie adaptée à vos objectifs. Un conseiller dédié vous
            accompagne ensuite gratuitement.
          </p>
          <Link
            href="/funnel"
            className="inline-flex items-center gap-2 px-8 py-4 text-lg font-semibold text-white bg-emerald-600 rounded-full hover:bg-emerald-700 transition-colors shadow-lg shadow-emerald-200"
          >
            Découvrir mon profil
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
          <p className="mt-4 text-sm text-slate-400">Gratuit · Sans engagement · 2 minutes</p>
        </div>
      </main>

      {/* Social proof */}
      <section className="py-16 bg-white border-t border-slate-100">
        <div className="max-w-4xl mx-auto px-6">
          <p className="text-center text-sm text-slate-400 uppercase tracking-widest font-semibold mb-10">
            Ils nous font confiance
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            {[
              { stat: "+500", label: "Clients accompagnés" },
              { stat: "4,8/5", label: "Note moyenne" },
              { stat: "12 ans", label: "D'expérience" },
            ].map(({ stat, label }) => (
              <div key={label} className="text-center">
                <p className="text-3xl font-bold text-emerald-600">{stat}</p>
                <p className="text-slate-500 mt-1">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-2xl font-bold text-center text-slate-900 mb-12">
            Comment ça marche ?
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            {[
              {
                step: "01",
                title: "Évaluez votre profil",
                desc: "Répondez à quelques questions sur votre situation et vos objectifs.",
              },
              {
                step: "02",
                title: "Obtenez votre stratégie",
                desc: "Recevez immédiatement une recommandation personnalisée.",
              },
              {
                step: "03",
                title: "Rencontrez un conseiller",
                desc: "Planifiez un appel gratuit pour affiner votre plan d'action.",
              },
            ].map(({ step, title, desc }) => (
              <div key={step} className="flex flex-col items-center text-center p-6 bg-white rounded-2xl border border-slate-100 shadow-sm">
                <span className="text-4xl font-black text-emerald-100 mb-3">{step}</span>
                <h3 className="font-semibold text-slate-900 mb-2">{title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA bottom */}
      <section className="py-16 bg-emerald-600">
        <div className="max-w-2xl mx-auto px-6 text-center">
          <h2 className="text-2xl font-bold text-white mb-4">
            Prêt à prendre en main votre avenir financier ?
          </h2>
          <p className="text-emerald-100 mb-8">
            Rejoignez des centaines de personnes qui ont déjà optimisé leur patrimoine.
          </p>
          <Link
            href="/funnel"
            className="inline-flex items-center gap-2 px-8 py-4 text-lg font-semibold text-emerald-700 bg-white rounded-full hover:bg-emerald-50 transition-colors"
          >
            Commencer maintenant — c&apos;est gratuit
          </Link>
        </div>
      </section>

      <footer className="py-6 text-center text-sm text-slate-400 bg-white border-t border-slate-100">
        © {new Date().getFullYear()} Invest&apos;Or · Tous droits réservés
      </footer>
    </div>
  );
}
