const BED_LABELS: Record<string, string> = {
  Single: "Односпальная кровать",
  Double: "Двуспальная кровать",
  DoubleKing: "Двуспальная кровать king size",
};
const labelledImages = new WeakMap<HTMLImageElement, string>();
const labelledButtons = new WeakMap<HTMLButtonElement, string>();

function labelUnnamedButton(button: HTMLButtonElement | null, label: string) {
  if (
    button &&
    !button.textContent?.trim() &&
    (!button.hasAttribute("aria-label") || button.getAttribute("aria-label") === labelledButtons.get(button)) &&
    !button.hasAttribute("aria-labelledby") &&
    !button.hasAttribute("title")
  ) {
    if (button.getAttribute("aria-label") !== label) button.setAttribute("aria-label", label);
    labelledButtons.set(button, label);
  }
}

/** Add missing names to the inline SDK UI, preserving names supplied by Kontur.
 * Use data markers and the calendar's two navigation slots, never hashed classes.
 * The existing widget observer calls this after SDK renders; no extra observer
 * or changes to booking events, React state, prices or availability are needed.
 */
export function labelKonturWidget(root: HTMLElement): void {
  const roomNames = new Map<Element, string>();
  root.querySelectorAll<HTMLImageElement>("img").forEach(image => {
    const current = image.getAttribute("alt");
    if (current !== null && current !== labelledImages.get(image)) return;
    const setLabel = (label: string) => {
      if (current !== label) image.alt = label;
      labelledImages.set(image, label);
    };
    if (image.closest('[data-tid="BedTypeIcon"]')) {
      setLabel(BED_LABELS[image.getAttribute("data-tid") || ""] || "Спальное место");
      return;
    }

    // Photos in the SDK room list have their room name before its parameters.
    // Keep the provider's displayed name, and use a neutral fallback if the
    // provider changes this structure. Decorative SVGs remain silent.
    if (/\.svg(?:[?#]|$)/i.test(image.getAttribute("src") || "")) {
      setLabel("");
      return;
    }
    let name = "";
    for (let card = image.parentElement; card && card !== root; card = card.parentElement) {
      if (roomNames.has(card)) {
        name = roomNames.get(card)!;
        break;
      }
      const parameters = card.querySelector('[data-tid="RoomCategoryParameters"]');
      if (parameters) {
        const range = document.createRange();
        range.selectNodeContents(card);
        range.setEndBefore(parameters);
        const title = range.toString().replace(/\s+/g, " ").trim();
        name = title.length <= 120 ? title : "";
        roomNames.set(card, name);
        break;
      }
    }
    setLabel(name ? `Фотография: ${name}` : "Фотография дома");
  });

  root.querySelectorAll('[data-tid="WindowViewIcon"]').forEach(icon => {
    labelUnnamedButton(icon.closest("button"), "Подробнее о доме");
  });

  const calendars = new Set<Element>();
  root.querySelectorAll("[data-flip-id] section").forEach(month => {
    for (let calendar = month.parentElement; calendar && root.contains(calendar); calendar = calendar.parentElement) {
      const navigation = calendar.firstElementChild;
      if (!navigation || navigation.children.length !== 2 || navigation.contains(month)) continue;
      const [previous, next] = Array.from(navigation.children);
      // The SDK calendar has two slots, including an empty previous slot at
      // the first month. Ignore other structures if the SDK changes them.
      if (
        previous.querySelectorAll("button").length > 1 ||
        next.querySelectorAll("button").length > 1 ||
        !navigation.querySelector('button svg[viewBox="0 0 32 32"]')
      ) continue;
      if (!calendars.has(calendar)) {
        calendars.add(calendar);
        labelUnnamedButton(previous.querySelector("button"), "Предыдущий месяц");
        labelUnnamedButton(next.querySelector("button"), "Следующий месяц");
      }
      break;
    }
  });
}
