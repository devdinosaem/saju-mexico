"use client";

import { useState, useRef, useEffect } from "react";
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
  "Saltillo",
  "Villahermosa",
  "Tuxtla Gutiérrez",
  "Mazatlán",
  "Durango",
  "Tampico",
  "Culiacán",
  "Pachuca",
  "Tepic",
  "Campeche",
  "Celaya",
  "Irapuato",
  "Ciudad Juárez",
  "Zacatecas",
  "Colima",
  "Tlaxcala",
  "Los Mochis",
  "La Paz",
  "Los Cabos",
  "Mexicali",
  "Ensenada",
  "Chetumal",
  "Tulum",
  "Reynosa",
  "Nuevo Laredo",
  "Matamoros",
  "Nogales",
  "Coatzacoalcos",
  "Minatitlán",
  "Tapachula",
  "Comitán",
  "San Cristóbal de las Casas",
  "Puerto Vallarta",
  "Guanajuato",
  "San Miguel de Allende",
  "Taxco",
  "Xalapa",
  "Córdoba",
  "Orizaba",
  "Uruapan",
  "Lázaro Cárdenas",
  "Zihuatanejo",
  "Tehuacán",
  "Ciudad Victoria",
  "Ciudad Obregón",
  "Navojoa",
  "Guaymas",
];

export function BirthForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [unknownTime, setUnknownTime] = useState(false);
  const [cityQuery, setCityQuery] = useState("");
  const [cityOpen, setCityOpen] = useState(false);
  const cityRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [form, setForm] = useState({
    name: "",
    year: "",
    month: "",
    day: "",
    hour: "",
    minute: "",
    ampm: "AM" as "AM" | "PM",
    city: "",
    gender: "female" as "male" | "female",
  });

  const update = (field: string, value: string) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  // 도시 검색 자동완성
  const filteredCities = cityQuery
    ? MEXICAN_CITIES.filter((c) =>
        c.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "")
          .includes(cityQuery.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, ""))
      )
    : MEXICAN_CITIES;

  // 바깥 클릭 시 드롭다운 닫기
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (cityRef.current && !cityRef.current.contains(e.target as Node)) {
        setCityOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const selectCity = (city: string) => {
    update("city", city);
    setCityQuery(city);
    setCityOpen(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.city) {
      alert("Selecciona tu ciudad de nacimiento");
      return;
    }
    setLoading(true);

    let hour24: number;
    if (unknownTime) {
      hour24 = 12;
    } else {
      let h = parseInt(form.hour);
      if (form.ampm === "PM" && h !== 12) h += 12;
      if (form.ampm === "AM" && h === 12) h = 0;
      hour24 = h;
    }

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
          hour: hour24,
          minute: unknownTime ? 0 : parseInt(form.minute || "0"),
          city: form.city,
          unknownTime,
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
          Necesitamos tu fecha y hora de nacimiento
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
              "Ene","Feb","Mar","Abr","May","Jun",
              "Jul","Ago","Sep","Oct","Nov","Dic",
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

      {/* Hora de nacimiento — 시간 입력 먼저, 모름 버튼 아래 */}
      <div>
        <label className="text-xs text-text-secondary mb-1 block">
          Hora de nacimiento
        </label>

        {!unknownTime && (
          <>
            <div className="grid grid-cols-3 gap-2 mb-2">
              <select
                required={!unknownTime}
                value={form.hour}
                onChange={(e) => update("hour", e.target.value)}
                className="bg-bg-card border border-white/10 rounded-xl px-3 py-3 text-sm text-text-primary focus:border-gold/40 focus:outline-none appearance-none"
              >
                <option value="">Hora</option>
                {Array.from({ length: 12 }, (_, i) => i + 1).map((h) => (
                  <option key={h} value={h}>{h}</option>
                ))}
              </select>
              <select
                required={!unknownTime}
                value={form.minute}
                onChange={(e) => update("minute", e.target.value)}
                className="bg-bg-card border border-white/10 rounded-xl px-3 py-3 text-sm text-text-primary focus:border-gold/40 focus:outline-none appearance-none"
              >
                <option value="">Min</option>
                {Array.from({ length: 12 }, (_, i) => i * 5).map((m) => (
                  <option key={m} value={m}>{String(m).padStart(2, "0")}</option>
                ))}
              </select>
              <div className="grid grid-cols-2 gap-1">
                <button
                  type="button"
                  onClick={() => update("ampm", "AM")}
                  className={`rounded-xl text-sm font-medium transition-all ${
                    form.ampm === "AM"
                      ? "bg-gold/20 border-gold/40 text-gold border"
                      : "bg-bg-card border border-white/10 text-text-secondary"
                  }`}
                >
                  AM
                </button>
                <button
                  type="button"
                  onClick={() => update("ampm", "PM")}
                  className={`rounded-xl text-sm font-medium transition-all ${
                    form.ampm === "PM"
                      ? "bg-gold/20 border-gold/40 text-gold border"
                      : "bg-bg-card border border-white/10 text-text-secondary"
                  }`}
                >
                  PM
                </button>
              </div>
            </div>
            <p className="text-text-muted text-xs mb-2">
              💡 Revisa tu acta de nacimiento o pregúntale a tu mamá
            </p>
          </>
        )}

        {/* 시간 모름 토글 — 항상 아래 */}
        <button
          type="button"
          onClick={() => setUnknownTime(!unknownTime)}
          className={`w-full py-2.5 rounded-xl text-sm font-medium transition-all ${
            unknownTime
              ? "bg-amber/15 border-amber/40 text-amber border"
              : "bg-bg-card border border-white/10 text-text-muted"
          }`}
        >
          {unknownTime ? "⏰ No sé mi hora — usando 3 pilares" : "🤔 No sé mi hora de nacimiento"}
        </button>

        {unknownTime && (
          <div className="bg-bg-card rounded-xl p-3 border border-amber/10 mt-2">
            <p className="text-text-secondary text-xs leading-relaxed">
              Sin la hora, el reporte usa <strong className="text-text-primary">3 pilares</strong> (año, mes, día).
              Sigue siendo muy preciso para personalidad, fortuna y relaciones.
            </p>
          </div>
        )}
      </div>

      {/* Ciudad — 검색 자동완성 */}
      <div ref={cityRef}>
        <label className="text-xs text-text-secondary mb-1 block">
          Ciudad de nacimiento
        </label>
        <div className="relative">
          <input
            ref={inputRef}
            type="text"
            value={cityQuery}
            onChange={(e) => {
              setCityQuery(e.target.value);
              setCityOpen(true);
              if (!e.target.value) update("city", "");
            }}
            onFocus={() => setCityOpen(true)}
            placeholder="Buscar ciudad..."
            className="w-full bg-bg-card border border-white/10 rounded-xl px-4 py-3 text-sm text-text-primary placeholder:text-text-muted focus:border-gold/40 focus:outline-none transition-colors"
          />
          {form.city && !cityOpen && (
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gold text-xs">✓</span>
          )}
        </div>

        {cityOpen && (
          <div className="mt-1 bg-bg-card border border-white/10 rounded-xl max-h-48 overflow-y-auto shadow-lg">
            {filteredCities.length === 0 ? (
              <div className="px-4 py-3 text-text-muted text-xs">
                No se encontró &quot;{cityQuery}&quot;
              </div>
            ) : (
              filteredCities.map((city) => (
                <button
                  key={city}
                  type="button"
                  onClick={() => selectCity(city)}
                  className={`w-full text-left px-4 py-2.5 text-sm transition-colors hover:bg-bg-surface ${
                    form.city === city ? "text-gold bg-bg-surface/50" : "text-text-primary"
                  }`}
                >
                  {cityQuery ? (
                    highlightMatch(city, cityQuery)
                  ) : (
                    city
                  )}
                </button>
              ))
            )}
          </div>
        )}
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

function highlightMatch(text: string, query: string): React.ReactNode {
  const normalize = (s: string) =>
    s.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");
  const nText = normalize(text);
  const nQuery = normalize(query);
  const idx = nText.indexOf(nQuery);
  if (idx === -1) return text;
  return (
    <>
      {text.slice(0, idx)}
      <span className="text-gold font-semibold">{text.slice(idx, idx + query.length)}</span>
      {text.slice(idx + query.length)}
    </>
  );
}
