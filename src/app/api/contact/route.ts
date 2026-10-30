import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as {
      name?: string;
      phone?: string;
      source?: string;
    };

    const name = body.name?.trim();
    const phone = body.phone?.trim();
    const source = body.source?.trim() || "Обратная связь";

    if (!name || !phone) {
      return NextResponse.json(
        { ok: false, error: "Укажите имя и телефон" },
        { status: 400 }
      );
    }

    const messageText = [
      "🌲 Новая заявка с сайта hyzhinalesnika.ru",
      `Форма: ${source}`,
      `Имя: ${name}`,
      `Телефон: ${phone}`,
    ].join("\n");

    const botToken = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;

    if (botToken && chatId) {
      await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: chatId,
          text: messageText,
        }),
      });
    } else {
      console.info("[Lead Callback]", {
        source,
        name,
        phone,
        at: new Date().toISOString(),
      });
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json(
      { ok: false, error: "Ошибка обработки заявки" },
      { status: 500 }
    );
  }
}
