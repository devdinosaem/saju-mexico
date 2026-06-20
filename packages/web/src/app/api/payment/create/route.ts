import { NextRequest, NextResponse } from "next/server";
import { getSaju } from "@/lib/store";
import { createPreference, isMercadoPagoConfigured } from "@/lib/mercadopago";

export async function POST(req: NextRequest) {
  try {
    const { sajuId } = await req.json();
    if (!sajuId) {
      return NextResponse.json({ error: "sajuId requerido" }, { status: 400 });
    }

    const saju = (await getSaju(sajuId)) as Record<string, unknown> | null;
    if (!saju) {
      return NextResponse.json({ error: "No encontrado" }, { status: 404 });
    }

    // MercadoPago 미설정 시: 바로 리포트 페이지로 (MVP 모드)
    if (!isMercadoPagoConfigured()) {
      return NextResponse.json({
        mode: "free",
        redirectUrl: `/reporte/${sajuId}`,
      });
    }

    const preference = await createPreference(sajuId, saju.name as string);
    if (!preference) {
      return NextResponse.json({ error: "Error de pago" }, { status: 500 });
    }

    return NextResponse.json({
      mode: "payment",
      preferenceId: preference.id,
      initPoint: preference.init_point,
    });
  } catch (err) {
    console.error("Payment creation error:", err);
    return NextResponse.json({ error: "Error al crear el pago" }, { status: 500 });
  }
}
