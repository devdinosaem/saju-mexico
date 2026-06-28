import { MercadoPagoConfig, Preference, Payment } from "mercadopago";

const accessToken = process.env.MERCADOPAGO_ACCESS_TOKEN;

export function getMercadoPago() {
  if (!accessToken) return null;
  return new MercadoPagoConfig({ accessToken });
}

export function isMercadoPagoConfigured(): boolean {
  return !!accessToken;
}

export async function createPreference(sajuId: string, name: string) {
  const config = getMercadoPago();
  if (!config) return null;

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

  const preference = new Preference(config);
  const result = await preference.create({
    body: {
      items: [
        {
          id: `saju-report-${sajuId}`,
          title: `Reporte Saju Completo — ${name}`,
          description:
            "8 capítulos · +15,000 palabras · Predicciones hasta 2034",
          quantity: 1,
          unit_price: 99,
          currency_id: "MXN",
        },
      ],
      back_urls: {
        success: `${siteUrl}/reporte/${sajuId}`,
        failure: `${siteUrl}/resultado/${sajuId}`,
        pending: `${siteUrl}/resultado/${sajuId}?pending=1`,
      },
      auto_return: "approved",
      external_reference: sajuId,
      notification_url: `${siteUrl}/api/payment/webhook`,
      payment_methods: {
        installments: 1,
      },
    },
  });

  return result;
}

export async function getPayment(paymentId: string) {
  const config = getMercadoPago();
  if (!config) return null;
  const payment = new Payment(config);
  return payment.get({ id: paymentId });
}
