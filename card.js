// Shared code for the group card pages (c.html, t.html). Copy: docs/tarjeta-grupal/diseno/*textos-ES-EN.md.
// Text from other people is always inserted as text nodes (h() below), never as HTML.
const LOCAL = /^(localhost|127\.0\.0\.1|192\.168\.\d+\.\d+)$/.test(location.hostname);
const API = LOCAL
  ? `http://${location.hostname}:54421/functions/v1/card`
  : 'https://irayrkcdpwozfkfsqdcw.supabase.co/functions/v1/card';
const APP_STORE = 'https://apps.apple.com/app/id6821806458';
const SUPPORT = 'cumpleanos.support@gmail.com';

export const lang = (navigator.language || 'es').toLowerCase().startsWith('en') ? 'en' : 'es';
document.documentElement.lang = lang;

const T = {
  es: {
    loading: 'Cargando la tarjeta', cardLoading: 'Preparando tu tarjeta…',
    loadErrTitle: 'No pudimos cargar la tarjeta', loadErrBody: 'Revisa tu conexión e inténtalo de nuevo. El link sigue siendo válido.',
    cardErrTitle: 'No pudimos cargar tu tarjeta', cardErrBody: 'Los saludos están a salvo. Revisa tu conexión e inténtalo de nuevo.',
    retry: 'Reintentar',
    joinTitle: '{name} cumple años el {date}',
    joinBody: '{organizer} está armando una tarjeta entre todos. Deja tu saludo aquí y {name} los recibe juntos el día de su cumpleaños.',
    joinBodyNoOrg: 'Están armando una tarjeta entre todos. Deja tu saludo aquí y {name} los recibe juntos el día de su cumpleaños.',
    joinCount: { one: 'Ya participó {n}: {names}', other: 'Ya participaron {n}: {names}' },
    joinCompact: 'Tarjeta para {name}', joinCompactSub: '{date} · ya participaron {n}',
    nameLabel: 'Tu nombre', namePh: '¿Cómo te llamas?',
    msgLabel: 'Tu saludo para {name}', msgPh: 'Escribe lo que le dirías como si estuvieras frente a {name}.',
    ai: 'Ayúdame a escribirlo', aiSub: 'Te hacemos dos preguntas y armamos un borrador',
    aiExhausted: 'Se acabaron las ayudas para esta tarjeta. Tus palabras valen igual.',
    mediaLabel: 'Si quieres, suma una foto o un audio', photo: 'Foto', audio: 'Audio · 30 s',
    recording: 'Grabando… {s} s · toca para terminar', recorded: 'Audio grabado · {dur}', tapListen: 'Toca para escucharlo',
    photoAdded: 'Foto agregada', remove: 'Quitar', removeAudio: 'Quitar el audio', removePhoto: 'Quitar la foto',
    micDenied: 'No pudimos usar el micrófono. Revisa el permiso del navegador.', tooBig: 'El archivo es muy grande (máximo 10 MB).',
    send: 'Enviar mi saludo', saveChanges: 'Guardar cambios', sending: 'Enviando…',
    privacy: '{name} lo verá el {date}. Solo {organizer}, que arma la tarjeta, puede verlo antes.',
    privacyNoOrg: '{name} lo verá el {date}. Solo quien arma la tarjeta puede verlo antes.',
    errName: 'Escribe tu nombre para que {name} sepa quién le habla.',
    errMsg: 'Un poco más: al menos una frase (10 caracteres).',
    errSave: 'No pudimos guardar tu saludo. Revisa tu conexión e inténtalo de nuevo. Tu texto sigue aquí.',
    errClosed: '{name} ya abrió la tarjeta, así que no se pueden sumar saludos.',
    errBusy: 'Hay muchos envíos seguidos. Espera un minuto e inténtalo de nuevo.',
    aiTitle: 'Ayúdame a escribirlo', aiBody: 'Dos preguntas y te armamos un borrador. Después lo cambias como quieras.',
    aiQ1: '¿Qué es {name} para ti?', aiQ2: 'Cuéntanos algo de {name}', aiQ2Ph: 'Una costumbre, un recuerdo, algo que siempre dice',
    toneFun: 'Divertido', toneEmo: 'Emotivo', toneShort: 'Corto', aiCta: 'Escribir borrador', aiWorking: 'Escribiendo…',
    aiNote: 'Tú revisas el texto antes de enviarlo.', aiFail: 'No pudimos escribir el borrador. Inténtalo de nuevo.',
    close: 'Cerrar',
    doneTitle: 'Listo, {name}', doneBody: '{bday} lo verá el {date}, junto con los saludos de {everyone}.',
    yours: 'Tu saludo', edit: 'Editar mi saludo',
    doneNote: 'Puedes volver a este link desde este celular hasta que {bday} abra la tarjeta.',
    doneCount: { one: 'Ya hay {n} saludo para {bday}. {bday} lo verá el {day}.', other: 'Ya son {n} saludos para {bday}. {bday} los verá todos juntos el {day}.' },
    openedBody: '{bday} abrió la tarjeta y vio tu saludo junto con los de {everyone}.',
    openedNote: '{bday} ya abrió la tarjeta, así que el saludo ya no se puede cambiar.',
    replied: '{bday} les respondió',
    pendingTitle: 'Tu saludo quedó guardado', pendingBody: '{organizer} decide si lo suma a la tarjeta. No tienes que hacer nada más.',
    pendingNote: 'Puedes volver a este link desde este celular para cambiarlo.',
    sealTitle: 'Hecha con Remembery', sealBody: 'Te avisamos los cumpleaños a tiempo y te ayudamos a escribir el saludo.', make: 'Crea la tuya',
    closedTitle: '{bday} ya abrió su tarjeta', closedBody: 'Ya no se pueden sumar saludos. Si quieres, escríbele directo a {bday}: seguro le alegra el día igual.',
    closedSealTitle: '¿Se te pasa alguno?', closedSealBody: 'Remembery te avisa a tiempo y te ayuda a escribir.',
    goneTitle: 'Esta tarjeta ya no está disponible',
    goneBody: 'Puede que el link esté incompleto, que quien la armó la haya borrado o que haya pasado más de un año. Si te lo mandaron hace poco, pídelo de nuevo.',
    goneSealTitle: 'Arma una tarjeta para alguien', goneSealBody: 'Todos saludan desde un link, sin instalar nada.',
    made: 'Hecha con Remembery', report: 'Reportar contenido', privacyLink: 'Privacidad',
    family: 'toda la familia', everyone: 'todos',
    // birthday person
    coverTitle: { one: '{n} persona te preparó algo', other: '{n} personas te prepararon algo' },
    coverBody: { one: '{names} escribió para tu cumpleaños.', other: '{names} escribieron para tu cumpleaños.' },
    open: 'Abrir la tarjeta', openNote: 'Tómate tu tiempo. Puedes volver cuando quieras.',
    forName: 'Para {name}', progress: '{i} de {n}', wrote: 'te escribió', photoAlt: 'Foto que subió {name}',
    audioOf: 'Audio de {name}', playAudio: 'Escuchar el audio de {name}',
    next: 'Siguiente', prev: 'Anterior', hide: 'Ocultar este saludo', hidden: 'Saludo oculto', undo: 'Deshacer',
    endTitle1: 'Las fechas pasan.', endTitle2: 'El cariño se queda.',
    endBody: { one: '{names} se acordó de ti. Feliz cumpleaños, {name}.', other: '{names} se acordaron de ti. Feliz cumpleaños, {name}.' },
    replyLabel: '¿Les respondes?', replyDefault: '¡Gracias a todos!', replyCta: 'Enviar respuesta',
    replyNote: 'Le llega a {organizer}, que armó la tarjeta, y a quienes escribieron cuando vuelvan a su link.',
    replyDone: 'Listo. {organizer} lo recibirá.', replyDoneNote: 'Quienes escribieron también lo verán.', replyEdit: 'Editar',
    again: 'Ver los saludos de nuevo',
    previewBar: 'Vista previa: así la verá {name}. Abrirla aquí no cuenta como abierta.',
    previewNoAct: 'En la vista previa no se puede responder ni ocultar.',
    emptyCard: 'Todavía no hay saludos en esta tarjeta.',
  },
  en: {
    loading: 'Loading the card', cardLoading: 'Getting your card ready…',
    loadErrTitle: "We couldn't load the card", loadErrBody: 'Check your connection and try again. The link is still valid.',
    cardErrTitle: "We couldn't load your card", cardErrBody: 'The messages are safe. Check your connection and try again.',
    retry: 'Try again',
    joinTitle: "It's {name}'s birthday on {date}",
    joinBody: '{organizer} is making a card with everyone. Leave your message here and {name} gets them all together on the day.',
    joinBodyNoOrg: "Everyone's making a card together. Leave your message here and {name} gets them all together on the day.",
    joinCount: { one: '{n} has joined: {names}', other: '{n} have joined: {names}' },
    joinCompact: 'Card for {name}', joinCompactSub: '{date} · {n} have joined',
    nameLabel: 'Your name', namePh: "What's your name?",
    msgLabel: 'Your message for {name}', msgPh: "Write what you'd say as if {name} were right in front of you.",
    ai: 'Help me write it', aiSub: 'We ask two questions and draft it for you',
    aiExhausted: 'No more help left for this card. Your own words are just as good.',
    mediaLabel: 'If you like, add a photo or a voice note', photo: 'Photo', audio: 'Voice note · 30 s',
    recording: 'Recording… {s} s · tap to stop', recorded: 'Voice note recorded · {dur}', tapListen: 'Tap to listen',
    photoAdded: 'Photo added', remove: 'Remove', removeAudio: 'Remove the voice note', removePhoto: 'Remove the photo',
    micDenied: "We couldn't use the microphone. Check the browser permission.", tooBig: 'The file is too big (10 MB max).',
    send: 'Send my message', saveChanges: 'Save changes', sending: 'Sending…',
    privacy: "{name} will see it on {date}. Only {organizer}, who's making the card, can see it before then.",
    privacyNoOrg: "{name} will see it on {date}. Only the person making the card can see it before then.",
    errName: 'Write your name so {name} knows who it is from.',
    errMsg: 'A bit more: at least one sentence (10 characters).',
    errSave: "We couldn't save your message. Check your connection and try again. Your text is still here.",
    errClosed: '{name} has already opened the card, so no more messages can be added.',
    errBusy: 'Too many messages in a row. Wait a minute and try again.',
    aiTitle: 'Help me write it', aiBody: "Two questions and we'll draft it. Then change it however you like.",
    aiQ1: 'What is {name} to you?', aiQ2: 'Tell us something about {name}', aiQ2Ph: 'A habit, a memory, something {name} always says',
    toneFun: 'Funny', toneEmo: 'Heartfelt', toneShort: 'Short', aiCta: 'Write a draft', aiWorking: 'Writing…',
    aiNote: 'You review the text before sending it.', aiFail: "We couldn't write the draft. Try again.",
    close: 'Close',
    doneTitle: 'Done, {name}', doneBody: "{bday} will see it on {date}, together with {everyone}'s messages.",
    yours: 'Your message', edit: 'Edit my message',
    doneNote: 'You can come back to this link from this phone until {bday} opens the card.',
    doneCount: { one: "That's {n} message for {bday}. {bday} will see it on the {day}.", other: "That's {n} messages for {bday}. {bday} will see them all together on the {day}." },
    openedBody: "{bday} opened the card and saw your message with {everyone}'s.",
    openedNote: '{bday} has opened the card, so the message can’t be changed anymore.',
    replied: '{bday} replied to everyone',
    pendingTitle: 'Your message is saved', pendingBody: "{organizer} decides whether to add it to the card. There's nothing else you need to do.",
    pendingNote: 'You can come back to this link from this phone to change it.',
    sealTitle: 'Made with Remembery', sealBody: 'We remind you of birthdays in time and help you write the message.', make: 'Make your own',
    closedTitle: '{bday} has already opened the card', closedBody: "No more messages can be added. If you like, write to {bday} directly: it'll still make the day.",
    closedSealTitle: 'Ever miss one?', closedSealBody: 'Remembery reminds you in time and helps you write.',
    goneTitle: 'This card is no longer available',
    goneBody: 'The link may be incomplete, the person who made it may have deleted it, or more than a year may have passed. If you got it recently, ask for it again.',
    goneSealTitle: 'Make a card for someone', goneSealBody: 'Everyone joins in from a link, nothing to install.',
    made: 'Made with Remembery', report: 'Report content', privacyLink: 'Privacy',
    family: 'the whole family', everyone: 'everyone',
    coverTitle: { one: '{n} person made you something', other: '{n} people made you something' },
    coverBody: { one: '{names} wrote for your birthday.', other: '{names} wrote for your birthday.' },
    open: 'Open the card', openNote: 'Take your time. You can come back whenever you like.',
    forName: 'For {name}', progress: '{i} of {n}', wrote: 'wrote to you', photoAlt: 'Photo from {name}',
    audioOf: 'Voice note from {name}', playAudio: "Play {name}'s voice note",
    next: 'Next', prev: 'Previous', hide: 'Hide this message', hidden: 'Message hidden', undo: 'Undo',
    endTitle1: 'Dates pass.', endTitle2: 'Love stays.',
    endBody: { one: '{names} remembered you. Happy birthday, {name}.', other: '{names} remembered you. Happy birthday, {name}.' },
    replyLabel: 'Want to reply?', replyDefault: 'Thank you, everyone!', replyCta: 'Send reply',
    replyNote: 'It goes to {organizer}, who made the card, and to everyone who wrote when they reopen their link.',
    replyDone: 'Done. {organizer} will get it.', replyDoneNote: 'Everyone who wrote will see it too.', replyEdit: 'Edit',
    again: 'See the messages again',
    previewBar: "Preview: this is how {name} will see it. Opening it here doesn't count as opened.",
    previewNoAct: "You can't reply or hide messages in the preview.",
    emptyCard: 'There are no messages on this card yet.',
  },
};

/** t('key', {vars}) — plural objects pick one/other from vars.n. */
export function t(key, vars = {}) {
  let s = T[lang][key] ?? T.es[key] ?? key;
  if (typeof s === 'object') s = vars.n === 1 ? s.one : s.other;
  return s.replace(/\{(\w+)\}/g, (_, k) => (vars[k] ?? `{${k}}`));
}

export const firstName = (name) => (name || '').trim().split(/\s+/)[0];
export const fmtDate = (iso) =>
  new Intl.DateTimeFormat(lang, { day: 'numeric', month: 'long', timeZone: 'UTC' }).format(new Date(`${iso}T00:00:00Z`));
export const dayOf = (iso) => String(Number(iso.slice(8, 10)));
export const listNames = (names) => new Intl.ListFormat(lang, { style: 'long', type: 'conjunction' }).format(names);
export const fmtDur = (s) => `${Math.floor(s / 60)}:${String(Math.round(s % 60)).padStart(2, '0')}`;

/** Hyperscript: strings and numbers become text nodes. */
export function h(tag, attrs = {}, ...kids) {
  const el = document.createElement(tag);
  for (const [k, v] of Object.entries(attrs || {})) {
    if (v === false || v == null) continue;
    if (k.startsWith('on')) el.addEventListener(k.slice(2), v);
    else if (k === 'class') el.className = v;
    else if (k === 'html') el.innerHTML = v; // constant SVG icons only
    else el.setAttribute(k, v === true ? '' : v);
  }
  for (const kid of kids.flat()) if (kid != null && kid !== false) el.append(kid instanceof Node ? kid : String(kid));
  return el;
}
export const ICON = {
  gift: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="8" width="18" height="4" rx="1"/><path d="M12 8v13M19 12v7a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-7M7.5 8a2.5 2.5 0 0 1 0-5C10 3 12 8 12 8s2-5 4.5-5a2.5 2.5 0 0 1 0 5"/></svg>',
  mic: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><rect x="9" y="2" width="6" height="12" rx="3"/><path d="M19 10a7 7 0 0 1-14 0M12 19v3"/></svg>',
  image: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><rect x="3" y="3" width="18" height="18" rx="3"/><circle cx="9" cy="9" r="2"/><path d="m21 15-5-5L5 21"/></svg>',
  play: '<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>',
  pause: '<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M7 5h4v14H7zM13 5h4v14h-4z"/></svg>',
  broken: '<svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#64748B" stroke-width="2" stroke-linecap="round"><path d="M9 17H7A5 5 0 0 1 7 7M15 7h2a5 5 0 0 1 4 8M8 12h4M2 2l20 20"/></svg>',
};

export const avatar = (name, i, cls = '') => h('span', { class: `av av-${i % 6} ${cls}`, 'aria-hidden': 'true' }, (name || '?').trim()[0]?.toUpperCase() ?? '?');

/** The link token lives in the URL fragment (never sent to any server log). */
export const token = () => decodeURIComponent(location.hash.slice(1).split(/[&:]/)[0] || '');

export class ApiError extends Error {
  constructor(status, code) { super(code); this.status = status; this.code = code; }
}
export async function api(action, body = {}, auth) {
  let res;
  try {
    res = await fetch(API, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', ...(auth ? { Authorization: `Bearer ${auth}` } : {}) },
      body: JSON.stringify({ action, ...body }),
    });
  } catch {
    throw new ApiError(0, 'network');
  }
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new ApiError(res.status, data.error || 'error');
  return data;
}

export const store = {
  get(k) { try { return JSON.parse(localStorage.getItem(k) || 'null'); } catch { return null; } },
  set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch { /* private mode: edits only last this visit */ } },
};

const makeHref = () => (/android/i.test(navigator.userAgent) ? 'android.html' : APP_STORE);

export function footer(full = true) {
  const tok = token();
  const report = `mailto:${SUPPORT}?subject=${encodeURIComponent(`${t('report')} · ${tok.slice(0, 8)}`)}`;
  return h('footer', {},
    h('div', {}, t('made'), full ? [' · ', h('a', { class: 'make', href: makeHref() }, t('make'))] : null),
    h('div', {}, h('a', { href: report }, t('report')), ' · ', h('a', { href: 'privacidad.html' }, t('privacyLink'))),
  );
}

export function seal(title = t('sealTitle'), body = t('sealBody')) {
  return h('div', { class: 'card seal' },
    h('span', { class: 'logo', html: ICON.gift.replace('<svg', '<svg width="26" height="26"') }),
    h('b', {}, title), h('span', {}, body),
    h('a', { class: 'btn btn-dark', href: makeHref() }, t('make')),
  );
}

export function brand() {
  return h('div', { class: 'brand' }, h('span', { html: ICON.gift }), 'Remembery');
}

export function skeleton(label) {
  return h('div', { class: 'card', 'aria-busy': 'true', 'aria-label': label },
    h('div', { class: 'sk sk-circle' }), h('div', { class: 'sk sk-line', style: 'width:80%;height:28px' }),
    h('div', { class: 'sk sk-line', style: 'width:60%;height:28px' }), h('div', { class: 'sk sk-line', style: 'width:90%' }),
    h('div', { class: 'sk sk-line', style: 'width:70%' }));
}

export function photoEl(url, name, cls = 'photo') {
  if (url) return h('img', { class: cls, src: url, alt: '' });
  return h('div', { class: `${cls} initials`, 'aria-hidden': 'true' }, (name || '?').trim()[0]?.toUpperCase() ?? '?');
}

export function toast(text, action, onAction, ms = 6000) {
  document.querySelector('.toast')?.remove();
  const el = h('div', { class: 'toast', role: 'status' }, h('span', {}, text),
    action ? h('button', { onclick: () => { el.remove(); onAction(); } }, action) : null);
  document.body.append(el);
  setTimeout(() => el.remove(), ms);
}
