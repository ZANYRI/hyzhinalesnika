import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as {
      name?: string;
      phone?: string;
      source?: string;
      contactMethod?: string;
      contactHandle?: string;
    };

    const name = typeof body.name === "string" ? body.name.trim().slice(0,100) : "";
    const phone = typeof body.phone === "string" ? body.phone.trim().slice(0,30) : "";
    const source = typeof body.source === "string" ? body.source.trim().slice(0,200) : "Обратная связь";
    const contactMethod = body.contactMethod || "phone";
    const contactHandle = typeof body.contactHandle === "string" ? body.contactHandle.trim().slice(0,150) : "";
    if (!["phone","telegram","whatsapp","max"].includes(contactMethod) || (contactMethod!=="phone" && !contactHandle)) {
      return NextResponse.json({ok:false,error:"Укажите контакт для выбранного мессенджера"},{status:400});
    }

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
      `Способ связи: ${contactMethod}`,
      ...(contactHandle ? [`Контакт в мессенджере: ${contactHandle}`] : []),
    ].join("\n");

    const botToken = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;

    if (botToken && chatId) {
      const delivery = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: chatId,
          text: messageText,
        }),
      });
      if (!delivery.ok) return NextResponse.json({ ok: false, error: "Не удалось доставить заявку" }, { status: 502 });
    } else {
      return NextResponse.json({ ok: false, error: "Приём заявок временно недоступен. Позвоните нам." }, { status: 503 });
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json(
      { ok: false, error: "Ошибка обработки заявки" },
      { status: 500 }
    );
  }
}
