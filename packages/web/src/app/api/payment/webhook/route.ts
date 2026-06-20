import { NextRequest, NextResponse } from "next/server";
import { updateSaju } from "@/lib/store";
import { getPayment } from "@/lib/mercadopago";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    if (body.type !== "payment" || !body.data?.id) {
      return NextResponse.json({ received: true });
    }

    const payment = await getPayment(body.data.id);
    if (!payment || payment.status !== "approved") {
      return NextResponse.json({ received: true });
    }

    const sajuId = payment.external_reference;
    if (!sajuId) {
      return NextResponse.json({ received: true });
    }

    await updateSaju(sajuId, {
      paid: true,
      payment_id: String(payment.id),
      payment_method: payment.payment_method_id || "unknown",
      payment_amount: payment.transaction_amount,
    });

    // 리포트 자동 생성
    const reportRes = await fetch(
      `${process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"}/api/saju/report`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: sajuId }),
      }
    );
    if (!reportRes.ok) {
      console.error("Report generation failed after payment:", await reportRes.text());
    }

    return NextResponse.json({ received: true, processed: true });
  } catch (err) {
    console.error("Webhook error:", err);
    return NextResponse.json({ error: "Webhook error" }, { status: 500 });
  }
}
