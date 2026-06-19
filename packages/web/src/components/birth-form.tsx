"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const MEXICAN_CITIES = [
  "Ciudad de México",
  "Guadalajara",
  "Monterrey",
  "Puebla",
  "Tijuana",
  "León",
  "Cancún",
  "Mérida",
  "Querétaro",
  "San Luis Potosí",
  "Aguascalientes",
  "Chihuahua",
  "Morelia",
  "Oaxaca",
  "Veracruz",
  "Toluca",
  "Hermosillo",
  "Acapulco",
  "Playa del Carmen",
  "Cuernavaca",
];

export function BirthForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: "",
    year: "",
    month: "",
    day: "",
    hour: "",
    minute: "",
    city: MEXICAN_CITIES[0],
    gender: "female" as "male" | "female",
  });

  const update = (field: string, value: string) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/saju/calculate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          gender: form.gender,
          year: parseInt(form.year),
          month: parseInt(form.month),
          day: parseInt(form.day),
          hour: parseInt(form.hour),
          minute: parseInt(form.minute),
          city: form.city,
        }),
      });

      const data = await res.json();
      if (data.id) {
        router.push(`/resultado/${data.id}`);
      }
    } catch {
      alert("Error al calcular tu Saju. Intenta de nuevo.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5 pt-2">
      <div className="text-center mb-6">
        <h2 className="font-serif text-xl font-bold mb-1">
          Ingresa tus datos
        </h2>
        <p className="text-text-secondary text-xs">
          Necesitamos tu hora exacta para calcular los 4 pilares
        </p>
      </div>

      {/* Nombre */}
      <div>
        <label className="text-xs text-text-secondary mb-1 block">
          Tu nombre
        </label>
        <input
          type="text"
          required
          value={form.name}
          onChange={(e) => update("name", e.target.value)}
          placeholder="María García"
          className="w-full bg-bg-card border border-white/10 rounded-xl px-4 py-3 text-sm text-text-primary placeholder:text-text-muted focus:border-gold/40 focus:outline-none transition-colors"
        />
      </div>

      {/* Fecha de nacimiento */}
      <div>
        <label className="text-xs text-text-secondary mb-1 block">
          Fecha de nacimiento
        </label>
        <div className="grid grid-cols-3 gap-2">
          <input
            type="number"
            required
            min="1940"
            max="2010"
            value={form.year}
            onChange={(e) => update("year", e.target.value)}
            placeholder="Año"
            className="bg-bg-card border border-white/10 rounded-xl px-3 py-3 text-sm text-text-primary placeholder:text-text-muted focus:border-gold/40 focus:outline-none"
          />
          <select
            required
            value={form.month}
            onChange={(e) => update("month", e.target.value)}
            className="bg-bg-card border border-white/10 rounded-xl px-3 py-3 text-sm text-text-primary focus:border-gold/40 focus:outline-none appearance-none"
          >
            <option value="">Mes</option>
            {[
              "Enero","Febrero","Marzo","Abril","Mayo","Junio",
              "Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre",
            ].map((m, i) => (
              <option key={m} value={i + 1}>{m}</option>
            ))}
          </select>
          <input
            type="number"
            required
            min="1"
            max="31"
            value={form.day}
            onChange={(e) => update("day", e.target.value)}
            placeholder="Día"
            className="bg-bg-card border border-white/10 rounded-xl px-3 py-3 text-sm text-text-primary placeholder:text-text-muted focus:border-gold/40 focus:outline-none"
          />
        </div>
      </div>

      {/* Hora de nacimiento */}
      <div>
        <label className="text-xs text-text-secondary mb-1 block">
          Hora exacta de nacimiento
        </label>
        <div className="grid grid-cols-2 gap-2">
          <div className="relative">
            <input
              type="number"
              required
              min="0"
              max="23"
              value={form.hour}
              onChange={(e) => update("hour", e.target.value)}
              placeholder="Hora (0-23)"
              className="w-full bg-bg-card border border-white/10 rounded-xl px-3 py-3 text-sm text-text-primary placeholder:text-text-muted focus:border-gold/40 focus:outline-none"
            />
          </div>
          <div className="relative">
            <input
              type="number"
              required
              min="0"
              max="59"
              value={form.minute}
              onChange={(e) => update("minute", e.target.value)}
              placeholder="Minutos"
              className="w-full bg-bg-card border border-white/10 rounded-xl px-3 py-3 text-sm text-text-primary placeholder:text-text-muted focus:border-gold/40 focus:outline-none"
            />
          </div>
        </div>
        <p className="text-text-muted text-xs mt-1">
          💡 Revisa tu acta de nacimiento o pregúntale a tu mamá
        </p>
      </div>

      {/* Ciudad */}
      <div>
        <label className="text-xs text-text-secondary mb-1 block">
          Ciudad de nacimiento
        </label>
        <select
          required
          value={form.city}
          onChange={(e) => update("city", e.target.value)}
          className="w-full bg-bg-card border border-white/10 rounded-xl px-4 py-3 text-sm text-text-primary focus:border-gold/40 focus:outline-none appearance-none"
        >
          {MEXICAN_CITIES.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
      </div>

      {/* Género */}
      <div>
        <label className="text-xs text-text-secondary mb-1 block">
          Género
        </label>
        <div className="grid grid-cols-2 gap-2">
          <button
            type="button"
            onClick={() => update("gender", "female")}
            className={`py-3 rounded-xl text-sm font-medium transition-all ${
              form.gender === "female"
                ? "bg-gold/20 border-gold/40 text-gold border"
                : "bg-bg-card border border-white/10 text-text-secondary"
            }`}
          >
            ♀ Mujer
          </button>
          <button
            type="button"
            onClick={() => update("gender", "male")}
            className={`py-3 rounded-xl text-sm font-medium transition-all ${
              form.gender === "male"
                ? "bg-gold/20 border-gold/40 text-gold border"
                : "bg-bg-card border border-white/10 text-text-secondary"
            }`}
          >
            ♂ Hombre
          </button>
        </div>
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={loading}
        className="w-full gradient-gold text-bg-primary font-bold text-base py-4 rounded-xl transition-transform active:scale-[0.98] disabled:opacity-50"
      >
        {loading ? (
          <span className="flex items-center justify-center gap-2">
            <span className="w-4 h-4 border-2 border-bg-primary/30 border-t-bg-primary rounded-full animate-spin" />
            Calculando tu Saju...
          </span>
        ) : (
          "✦ REVELAR MI SAJU ✦"
        )}
      </button>

      <p className="text-text-muted text-xs text-center">
        🔒 Tu información es privada y no se comparte con terceros
      </p>
    </form>
  );
}
