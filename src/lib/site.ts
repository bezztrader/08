export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const WHATSAPP_URL =
  "https://wa.me/5521998098869?text=Ol%C3%A1!%20Vim%20pelo%20site%20e%20quero%20agendar%20um%20hor%C3%A1rio";
export const WHATSAPP_CLUB_URL =
  "https://wa.me/5521998098869?text=Ol%C3%A1!%20Vim%20pelo%20site%20e%20quero%20saber%20mais%20do%20Clube%20Zero%20Oito";
export const PHONE_DISPLAY = "(21) 99809-8869";
export const PHONE_TEL = "+5521998098869";
export const INSTAGRAM_URL = "https://www.instagram.com/barbeariazerooito/";
export const INSTAGRAM_HANDLE = "@barbeariazerooito";
export const MAPS_EMBED_URL =
  "https://www.google.com/maps?q=Rua+Araguaia,+897+-+Freguesia,+Jacarepagu%C3%A1,+Rio+de+Janeiro&output=embed";
export const MAPS_URL =
  "https://www.google.com/maps/search/?api=1&query=Rua+Araguaia,+897+Freguesia+Jacarepagu%C3%A1+Rio+de+Janeiro";

export const ADDRESS = {
  street: "Rua Araguaia, 897 - Loja A",
  district: "Freguesia (Jacarepaguá)",
  city: "Rio de Janeiro",
  region: "RJ",
};

export const HOURS = [
  { label: "Segunda a sexta", time: "8h às 20h" },
  { label: "Sábado", time: "8h às 16h" },
  { label: "Domingo", time: "Fechado" },
];

/** The menu, barbershop-board style: name, dotted leader, one short line. */
export const SERVICES = [
  { name: "Corte", text: "Máquina, tesoura ou os dois. Degradê do jeito que você pedir." },
  { name: "Barba", text: "Desenho, aparo e acabamento na navalha." },
  { name: "Corte + barba", text: "O pacote completo pra sair renovado." },
  { name: "Acabamento / pezinho", text: "Contorno e nuca em dia entre um corte e outro." },
  { name: "Lavagem", text: "Shampoo, massagem e cabelo pronto pra rua." },
  { name: "Ritual de barba", text: "Toalha quente, vapor, navalha e balm. Sem pressa." },
];
