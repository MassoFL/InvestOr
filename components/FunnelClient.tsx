'use client'

import { useState } from "react";
import Link from "next/link";

type Answers = {
  age: string;
  revenue: string;
  objective: string;
};

const STEPS = [
  {
    id: "age",
    question: "Quel est votre âge ?",
    subtitle: "Cela nous aide à adapter l'horizon d'investissement.",
    options: [
      { value: "18-30", label: "18 – 30 ans" },
      { value: "31-45", label: "31 – 45 ans" },
      { value: "46-60", label: "46 – 60 ans" },
      { value: "60+", label: "Plus de 60 ans" },
    ],
  },
  {
    id: "revenue",
    question: "Quels sont vos revenus mensuels nets ?",
    subtitle: "Vos revenus déterminent votre capacité d'épargne.",
    options: [
      { value: "<2000", label: "Moins de 2 000 €" },
      { value: "2000-4000", label: "2 000 – 4 000 €" },
      { value: "4000-8000", label: "4 000 – 8 000 €" },
      { value: "8000+", label: "Plus de 8 000 €" },
    ],
  },
  {
    id: "objective",
    question: "Quel est votre principal objectif ?",
    subtitle: "Choisissez ce qui vous correspond le mieux.",
    options: [
      { value: "retirement", label: "Préparer ma retraite" },
      { value: "passive-income", label: "Générer des revenus passifs" },
      { value: "growth", label: "Faire croître mon capital" },
      { value: "project", label: "Financer un projet (immobilier, études…)" },
      { value: "info", label: "Je souhaite juste des renseignements" },
    ],
  },
] as const;


function computeProfile(answers: Answers): {
  label: string;
  description: string;
  allocation: { label: string; pct: number; color: string }[];
  infoOnly: boolean;
} {
  if (answers.objective === "info") {
    return {
      label: "À la découverte",
      description:
        "Vous souhaitez en savoir plus sur les possibilités d'investissement. Un conseiller sera ravi de répondre à toutes vos questions sans engagement.",
      allocation: [],
      infoOnly: true,
    };
  }

  const objectiveScore: Record<string, number> = {
    retirement: 0,
    "passive-income": 1,
    growth: 2,
    project: 1,
  };
  const score = objectiveScore[answers.objective] ?? 1;

  if (score === 0) {
    return {
      infoOnly: false,
      label: "Prudent",
      description:
        "Vous privilégiez la sécurité de votre capital. Votre stratégie mise sur des placements stables avec un faible risque de perte.",
      allocation: [
        { label: "Fonds euros / Livrets", pct: 60, color: "bg-emerald-500" },
        { label: "Obligations", pct: 30, color: "bg-teal-400" },
        { label: "Actions", pct: 10, color: "bg-sky-400" },
      ],
    };
  } else if (score === 1) {
    return {
      infoOnly: false,
      label: "Équilibré",
      description:
        "Vous cherchez un équilibre entre sécurité et rendement. Votre portefeuille combine stabilité et croissance maîtrisée.",
      allocation: [
        { label: "Obligations / Fonds euros", pct: 40, color: "bg-emerald-500" },
        { label: "Actions diversifiées", pct: 40, color: "bg-sky-400" },
        { label: "Immobilier (SCPI)", pct: 20, color: "bg-violet-400" },
      ],
    };
  } else {
    return {
      infoOnly: false,
      label: "Dynamique",
      description:
        "Vous êtes à l'aise avec la volatilité et visez une croissance maximale sur le long terme.",
      allocation: [
        { label: "Actions (ETF mondiaux)", pct: 70, color: "bg-sky-400" },
        { label: "Private equity / SCPI", pct: 20, color: "bg-violet-400" },
        { label: "Crypto / Alternatifs", pct: 10, color: "bg-amber-400" },
      ],
    };
  }
}

export default function FunnelClient() {
  const [step, setStep] = useState<number>(0);
  const [answers, setAnswers] = useState<Partial<Answers>>({});
  const [selected, setSelected] = useState<string | null>(null);
  const [done, setDone] = useState(false);

  const currentStep = STEPS[step];
  const total = STEPS.length;

  function handleSelect(value: string) {
    setSelected(value);
  }

  function handleNext() {
    if (!selected) return;
    const newAnswers = { ...answers, [currentStep.id]: selected } as Partial<Answers>;
    setAnswers(newAnswers);
    setSelected(null);

    if (step < total - 1) {
      setStep(step + 1);
    } else {
      setDone(true);
    }
  }

  function handleBack() {
    if (step > 0) {
      const prevId = STEPS[step - 1].id;
      setStep(step - 1);
      setSelected(answers[prevId as keyof Answers] ?? null);
    }
  }

  if (done) {
    const profile = computeProfile(answers as Answers);
    return <ResultScreen profile={profile} />;
  }

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <nav className="flex items-center justify-between px-6 py-4 bg-white border-b border-slate-100">
        <Link href="/" className="text-xl font-bold text-emerald-700">
          Invest&apos;Or
        </Link>
        <span className="text-sm text-slate-400">
          Étape {step + 1} sur {total}
        </span>
      </nav>

      {/* Progress bar */}
      <div className="h-1.5 bg-slate-100">
        <div
          className="h-full bg-emerald-500 transition-all duration-500"
          style={{ width: `${((step + 1) / total) * 100}%` }}
        />
      </div>

      {/* Content */}
      <main className="flex flex-1 items-center justify-center px-6 py-12">
        <div className="w-full max-w-xl">
          <p className="text-sm text-emerald-600 font-semibold mb-2">
            Question {step + 1}/{total}
          </p>
          <h1 className="text-2xl font-bold text-slate-900 mb-2">
            {currentStep.question}
          </h1>
          <p className="text-slate-500 mb-8">{currentStep.subtitle}</p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
            {currentStep.options.map((opt) => (
              <button
                key={opt.value}
                onClick={() => handleSelect(opt.value)}
                className={`p-4 rounded-xl border-2 text-left font-medium transition-all ${
                  selected === opt.value
                    ? "border-emerald-500 bg-emerald-50 text-emerald-800"
                    : "border-slate-200 bg-white text-slate-700 hover:border-emerald-300 hover:bg-emerald-50/50"
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-3">
            {step > 0 && (
              <button
                onClick={handleBack}
                className="px-5 py-3 rounded-full border border-slate-200 text-slate-600 font-medium hover:bg-slate-100 transition-colors"
              >
                Retour
              </button>
            )}
            <button
              onClick={handleNext}
              disabled={!selected}
              className="flex-1 px-6 py-3 rounded-full bg-emerald-600 text-white font-semibold hover:bg-emerald-700 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
            >
              {step < total - 1 ? "Continuer" : "Voir mon profil"}
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}

function ResultScreen({
  profile,
}: {
  profile: ReturnType<typeof computeProfile>;
}) {
  return (
    <div className="min-h-screen flex flex-col">
      <nav className="flex items-center justify-between px-6 py-4 bg-white border-b border-slate-100">
        <Link href="/" className="text-xl font-bold text-emerald-700">
          Invest&apos;Or
        </Link>
      </nav>

      <main className="flex flex-1 items-center justify-center px-6 py-12">
        <div className="w-full max-w-xl">
          {/* Badge */}
          <div className="flex items-center gap-3 mb-6">
            <span className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-emerald-100 text-emerald-700 text-2xl">
              ✓
            </span>
            <div>
              <p className="text-sm text-slate-400">Votre profil investisseur</p>
              <h1 className="text-2xl font-bold text-slate-900">
                Profil {profile.label}
              </h1>
            </div>
          </div>

          {/* Description */}
          <div className="p-5 bg-emerald-50 border border-emerald-100 rounded-2xl mb-6">
            <p className="text-slate-700 leading-relaxed">{profile.description}</p>
          </div>

          {/* Allocation */}
          {!profile.infoOnly && profile.allocation.length > 0 && (
            <div className="bg-white border border-slate-100 rounded-2xl p-5 mb-8 shadow-sm">
              <h2 className="font-semibold text-slate-900 mb-4">
                Allocation recommandée
              </h2>
              <div className="space-y-3">
                {profile.allocation.map(({ label, pct, color }) => (
                  <div key={label}>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-slate-600">{label}</span>
                      <span className="font-semibold text-slate-900">{pct}%</span>
                    </div>
                    <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                      <div
                        className={`h-full ${color} rounded-full`}
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Message de clôture */}
          <div className="bg-slate-900 rounded-2xl p-6 text-center">
            <h2 className="text-white font-bold text-lg mb-2">
              Un conseiller vous recontactera très prochainement
            </h2>
            <p className="text-slate-400 text-sm">
              Merci pour vos réponses. Notre équipe analyse votre profil et
              prendra contact avec vous dans les meilleurs délais.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
