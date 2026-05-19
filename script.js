const phone = '4367761069416';
const email = 'shop.bluedolphins@gmail.com';

const toggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('nav');

if (toggle && nav) {
  toggle.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('open');
    toggle.setAttribute('aria-expanded', String(isOpen));
  });
}

function buildOrderMessage(product, price) {
  return price
    ? `Hallo! Ich möchte gerne dieses Stück bestellen: ${product} (EUR ${price}).`
    : `Hallo! Ich möchte gerne dieses Stück bestellen: ${product}.`;
}

function setProductOrderLinks(card) {
  const product = card.dataset.product;
  const price = card.dataset.price;
  const message = buildOrderMessage(product, price);
  const subject = `Bestellung Blue Dolphins - ${product}`;
  const wa = card.querySelector('[data-channel="whatsapp"]');
  const mail = card.querySelector('[data-channel="email"]');

  if (wa) wa.href = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
  if (mail) {
    mail.href = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(message)}`;
  }
}

document.querySelectorAll('.product-card[data-product]').forEach(setProductOrderLinks);

function updateOrderPageLinks() {
  const mail = document.getElementById('btn-mail');
  const wa = document.getElementById('btn-wa');
  if (!mail || !wa) return;

  const params = new URLSearchParams(window.location.search);
  const product = params.get('produkt');
  const message = product
    ? buildOrderMessage(product, '')
    : 'Hallo! Ich möchte gerne bei Blue Dolphins bestellen.';
  const subject = product ? `Bestellung Blue Dolphins - ${product}` : 'Bestellung Blue Dolphins';

  wa.href = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
  mail.href = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(message)}`;
}

updateOrderPageLinks();

function updateCustomRequestLinks() {
  const productSelect = document.getElementById('produkt');
  const wishField = document.getElementById('wunsch');
  const mail = document.getElementById('auftrag-mail');
  const wa = document.getElementById('auftrag-wa');
  if (!productSelect || !wishField || !mail || !wa) return;

  const product = productSelect.value;
  const wish = wishField.value.trim();
  let message = `Hallo! Ich möchte gerne eine Wunsch-Anfrage stellen.\n\nKategorie: ${product}`;
  if (wish) message += `\n\nMein Wunsch: ${wish}`;

  wa.href = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
  mail.href = `mailto:${email}?subject=${encodeURIComponent(`Auftrag Blue Dolphins - ${product}`)}&body=${encodeURIComponent(message)}`;
}

const productSelect = document.getElementById('produkt');
const wishField = document.getElementById('wunsch');

if (productSelect && wishField) {
  const params = new URLSearchParams(window.location.search);
  const product = params.get('produkt');
  if (product) productSelect.value = product;
  productSelect.addEventListener('change', updateCustomRequestLinks);
  wishField.addEventListener('input', updateCustomRequestLinks);
  updateCustomRequestLinks();
}
