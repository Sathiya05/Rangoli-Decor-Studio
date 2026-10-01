

(function () {
  'use strict';

  /* ------------------------------------------------------------------
     1. CONFIG
     ------------------------------------------------------------------ */

  var BRAND = {
    name: 'Rangoli Rang',
    mark: 'Festive Decor Studio',
    phone: '+91 98450 22107',
    phoneHref: '+919845022107',
    whatsapp: '919845022107',
    email: 'hello@rangolirang.in',
    address: 'No. 24, 3rd Cross, Domlur Layout, Indiranagar, Bengaluru 560038',
    hours: 'Mon – Sat · 9:30 AM – 7:00 PM IST'
  };

  var COLUMNS = [
    {
      title: 'Services',
      links: [
        { label: 'Home Rangoli Art', href: 'services.html#home' },
        { label: 'Event & Wedding Decor', href: 'services.html#events' },
        { label: 'Corporate Kolam Art', href: 'services.html#corporate' },
        { label: 'Live Kolam Workshops', href: 'services.html#workshops' },
        { label: 'Festive Set Dressing', href: 'services.html#festive' }
      ]
    },
    {
      title: 'Packages',
      links: [
        { label: 'Home Starter', href: 'packages.html#starter' },
        { label: 'Festive Signature', href: 'packages.html#signature' },
        { label: 'Corporate Annual', href: 'packages.html#corporate' },
        { label: 'Wedding Grand', href: 'packages.html#wedding' },
        { label: 'Compare All Plans', href: 'packages.html#compare' }
      ]
    },
    {
      title: 'Studio',
      links: [
        { label: 'About the Artist', href: 'about.html' },
        { label: 'Our Story', href: 'about.html#story' },
        { label: 'Process', href: 'about.html#process' },
        { label: 'Gallery', href: 'gallery.html' },
        { label: 'Contact', href: 'contact.html' }
      ]
    }
  ];

  var MOUNT_SELECTOR = '#app-footer, #footer, [data-footer]';

  /* ------------------------------------------------------------------
     2. ICONS (inline, currentColor driven)
     ------------------------------------------------------------------ */

  var ICON = {
    phone: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" class="h-4 w-4" aria-hidden="true"><path d="M3.5 5.5c0-.8.7-1.5 1.5-1.5h2.2c.7 0 1.3.5 1.5 1.2l.6 2.3c.2.7 0 1.4-.5 1.8l-1.2 1.2a12 12 0 0 0 5.4 5.4l1.2-1.2c.4-.5 1.1-.7 1.8-.5l2.3.6c.7.2 1.2.8 1.2 1.5v2.2c0 .8-.7 1.5-1.5 1.5h-1A15.5 15.5 0 0 1 3.5 6.5v-1Z"/></svg>',
    mail: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" class="h-4 w-4" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="2.5"/><path d="m4 8 8 5 8-5"/></svg>',
    pin: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" class="h-4 w-4" aria-hidden="true"><path d="M12 21s7-5.3 7-10.4A7 7 0 0 0 5 10.6C5 15.7 12 21 12 21Z"/><circle cx="12" cy="10.5" r="2.6"/></svg>',
    clock: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" class="h-4 w-4" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M12 7.5V12l3 2"/></svg>',
    wa: '<svg viewBox="0 0 24 24" fill="currentColor" class="h-4 w-4" aria-hidden="true"><path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2Zm0 1.8a8.2 8.2 0 1 1-4.2 15.1l-.3-.2-2.6.7.7-2.5-.2-.3A8.2 8.2 0 0 1 12 3.8Zm-3.3 4c-.2 0-.4 0-.6.3-.2.2-.8.8-.8 1.9s.8 2.2.9 2.4c.1.2 1.6 2.6 4 3.5 2 .7 2.4.6 2.8.5.5 0 1.4-.6 1.6-1.1.2-.6.2-1 .1-1.1l-.6-.3-1.4-.7c-.2 0-.4-.1-.5.1l-.7.9c-.1.2-.3.2-.5.1-.6-.3-1.3-.6-1.8-1.1-.6-.6-1-1.3-1.1-1.8-.1-.2 0-.4.1-.5l.4-.5.3-.5v-.5l-.7-1.6c-.2-.4-.4-.4-.5-.4Z"/></svg>',
    ig: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" class="h-4 w-4" aria-hidden="true"><rect x="3.5" y="3.5" width="17" height="17" rx="5"/><circle cx="12" cy="12" r="3.8"/><circle cx="17" cy="7" r="1.1" fill="currentColor" stroke="none"/></svg>',
    fb: '<svg viewBox="0 0 24 24" fill="currentColor" class="h-4 w-4" aria-hidden="true"><path d="M13.5 21v-8h2.7l.4-3.1h-3.1V7.9c0-.9.25-1.5 1.55-1.5H16.7V3.6A21 21 0 0 0 14.3 3.5c-2.4 0-4 1.45-4 4.1V9.9H7.6V13h2.7v8Z"/></svg>',
    yt: '<svg viewBox="0 0 24 24" fill="currentColor" class="h-4 w-4" aria-hidden="true"><path d="M21.6 7.2a2.5 2.5 0 0 0-1.75-1.77C18.3 5 12 5 12 5s-6.3 0-7.85.43A2.5 2.5 0 0 0 2.4 7.2 26 26 0 0 0 2 12a26 26 0 0 0 .4 4.8 2.5 2.5 0 0 0 1.75 1.77C5.7 19 12 19 12 19s6.3 0 7.85-.43a2.5 2.5 0 0 0 1.75-1.77A26 26 0 0 0 22 12a26 26 0 0 0-.4-4.8ZM10 15V9l5.2 3Z"/></svg>',
    mark: '<svg viewBox="0 0 40 40" class="h-9 w-9 shrink-0 sm:h-10 sm:w-10" aria-hidden="true">' +
      '<circle cx="20" cy="20" r="19" fill="none" stroke="#B4532A" stroke-width="1.5"/>' +
      '<g fill="#B4532A">' +
      '<ellipse cx="20" cy="9.5" rx="3.1" ry="6.4"/><ellipse cx="20" cy="9.5" rx="3.1" ry="6.4" transform="rotate(60 20 20)"/>' +
      '<ellipse cx="20" cy="9.5" rx="3.1" ry="6.4" transform="rotate(120 20 20)"/><ellipse cx="20" cy="9.5" rx="3.1" ry="6.4" transform="rotate(180 20 20)"/>' +
      '<ellipse cx="20" cy="9.5" rx="3.1" ry="6.4" transform="rotate(240 20 20)"/><ellipse cx="20" cy="9.5" rx="3.1" ry="6.4" transform="rotate(300 20 20)"/>' +
      '</g>' +
      '<circle cx="20" cy="20" r="6.4" fill="#0F766E"/><circle cx="20" cy="20" r="2.4" fill="#FFF7ED"/></svg>'
  };

  /* ------------------------------------------------------------------
     3. HELPERS
     ------------------------------------------------------------------ */

  function esc(str) {
    return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }

  /* ------------------------------------------------------------------
     4. FOOTER MARKUP
     ------------------------------------------------------------------ */

  function footerTemplate() {
    var year = new Date().getFullYear();

    return '' +
    '<footer class="border-t border-white/10 bg-[#0B2E2B] text-neutral-300 dark:border-white/10 dark:bg-black">' +
      '<div class="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 xl:px-8">' +

        /* Left aligned from the smallest breakpoint up (text-start is logical, so it
           mirrors to the right in RTL); only the column count changes as the
           viewport grows. */
        '<div class="grid gap-10 text-start md:grid-cols-2 xl:grid-cols-12 xl:gap-8">' +

          /* brand + newsletter */
          '<div class="md:col-span-2 xl:col-span-4">' +
            '<a href="index.html" class="inline-flex items-center gap-2.5 focus:outline-none focus-visible:ring-2' +
              ' focus-visible:ring-primary-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0B2E2B]">' +
              ICON.mark +
              '<span class="leading-tight">' +
                '<span class="block font-display text-lg font-bold text-white">' + esc(BRAND.name) + '</span>' +
                '<span class="block text-[0.65rem] font-medium uppercase tracking-[0.16em] text-primary-400">' +
                  esc(BRAND.mark) + '</span>' +
              '</span>' +
            '</a>' +
            '<p class="mt-4 max-w-sm text-sm leading-relaxed text-neutral-400">' +
              'Hand-drawn kolam and rangoli art by a single artisan team — powder, petals and rice, laid by hand ' +
              'for homes, weddings, festivals and corporate lobbies across South India since 2014.' +
            '</p>' +

            '<div class="mt-5 flex items-center gap-2">' +
              '<a href="#" aria-label="Instagram" class="inline-flex h-10 w-10 items-center justify-center rounded-full' +
                ' border border-white/15 text-neutral-300 transition-colors duration-200 hover:border-primary-400' +
                ' hover:text-primary-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-400">' + ICON.ig + '</a>' +
              '<a href="#" aria-label="Facebook" class="inline-flex h-10 w-10 items-center justify-center rounded-full' +
                ' border border-white/15 text-neutral-300 transition-colors duration-200 hover:border-primary-400' +
                ' hover:text-primary-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-400">' + ICON.fb + '</a>' +
              '<a href="#" aria-label="YouTube" class="inline-flex h-10 w-10 items-center justify-center rounded-full' +
                ' border border-white/15 text-neutral-300 transition-colors duration-200 hover:border-primary-400' +
                ' hover:text-primary-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-400">' + ICON.yt + '</a>' +
              '<a href="https://wa.me/' + BRAND.whatsapp + '" aria-label="WhatsApp" class="inline-flex h-10 w-10' +
                ' items-center justify-center rounded-full border border-white/15 text-neutral-300 transition-colors' +
                ' duration-200 hover:border-primary-400 hover:text-primary-400 focus:outline-none focus-visible:ring-2' +
                ' focus-visible:ring-primary-400">' + ICON.wa + '</a>' +
            '</div>' +

            '<form class="mt-6 flex max-w-sm flex-col gap-2 sm:flex-row" data-newsletter novalidate>' +
              '<label for="footer-email" class="sr-only">Email address</label>' +
              '<input id="footer-email" name="email" type="email" required placeholder="you@example.com"' +
                ' class="h-11 w-full rounded-xl border border-white/15 bg-white/5 px-4 text-sm text-white placeholder:text-neutral-500' +
                ' focus:border-primary-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-400">' +
              '<button type="submit" class="h-11 shrink-0 rounded-xl bg-primary-500 px-5 text-sm font-semibold text-white' +
                ' transition-colors duration-200 hover:bg-primary-600 focus:outline-none focus-visible:ring-2' +
                ' focus-visible:ring-primary-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0B2E2B]">' +
                'Subscribe</button>' +
            '</form>' +
            '<p data-newsletter-msg class="mt-2 hidden text-xs text-primary-400" role="status"></p>' +
          '</div>' +

          /* link columns */
          COLUMNS.map(function (col) {
            return '' +
              '<div class="xl:col-span-2">' +
                '<h3 class="text-xs font-semibold uppercase tracking-[0.18em] text-white">' + esc(col.title) + '</h3>' +
                '<ul class="mt-4 space-y-2.5">' +
                  col.links.map(function (link) {
                    return '<li><a href="' + link.href + '" data-nav-link class="text-sm text-neutral-400' +
                      ' transition-colors duration-200 hover:text-primary-400 focus:outline-none focus-visible:ring-2' +
                      ' focus-visible:ring-primary-400">' + esc(link.label) + '</a></li>';
                  }).join('') +
                '</ul>' +
              '</div>';
          }).join('') +

          /* contact + auth */
          '<div class="md:col-span-2 xl:col-span-2">' +
            '<h3 class="text-xs font-semibold uppercase tracking-[0.18em] text-white">Studio</h3>' +
            '<ul class="mt-4 space-y-3 text-sm">' +
              '<li class="flex items-start gap-2.5 text-neutral-400">' +
                '<span class="mt-0.5 text-primary-400">' + ICON.pin + '</span>' +
                '<span>' + esc(BRAND.address) + '</span>' +
              '</li>' +
              '<li><a href="tel:' + BRAND.phoneHref + '" class="inline-flex items-center gap-2.5 text-neutral-400' +
                ' transition-colors duration-200 hover:text-primary-400 focus:outline-none focus-visible:ring-2' +
                ' focus-visible:ring-primary-400"><span class="text-primary-400">' + ICON.phone + '</span>' +
                esc(BRAND.phone) + '</a></li>' +
              '<li><a href="mailto:' + BRAND.email + '" class="inline-flex items-center gap-2.5 text-neutral-400' +
                ' transition-colors duration-200 hover:text-primary-400 focus:outline-none focus-visible:ring-2' +
                ' focus-visible:ring-primary-400"><span class="text-primary-400">' + ICON.mail + '</span>' +
                esc(BRAND.email) + '</a></li>' +
              '<li class="flex items-start gap-2.5 text-neutral-400">' +
                '<span class="mt-0.5 text-primary-400">' + ICON.clock + '</span>' +
                '<span>' + esc(BRAND.hours) + '</span>' +
              '</li>' +
            '</ul>' +
            '<div class="mt-5 flex flex-wrap items-center gap-2">' +
            '</div>' +
          '</div>' +

        '</div>' +

        /* bottom bar */
        '<div class="mt-12 flex flex-col items-start justify-between gap-4 border-t border-white/10 pt-6' +
          ' text-xs text-neutral-500 sm:flex-row">' +
          '<p>&copy; ' + year + ' ' + esc(BRAND.name) + '. All rights reserved.</p>' +
          '<p class="flex flex-wrap items-center gap-x-4 gap-y-1">' +
            '<span>Handmade in Bengaluru</span>' +
            '<span aria-hidden="true" class="hidden h-1 w-1 rounded-full bg-neutral-600 sm:inline-block"></span>' +
            '<a href="#" class="transition-colors duration-200 hover:text-primary-400">Privacy</a>' +
            '<a href="#" class="transition-colors duration-200 hover:text-primary-400">Terms</a>' +
            '<a href="#" class="transition-colors duration-200 hover:text-primary-400">Careers</a>' +
          '</p>' +
        '</div>' +
      '</div>' +
    '</footer>';
  }

  /* ------------------------------------------------------------------
     5. BEHAVIOUR WIRING
     ------------------------------------------------------------------ */

  function wireFooter(root) {
    var form = root.querySelector('[data-newsletter]');
    if (!form) return;
    var msg = root.querySelector('[data-newsletter-msg]');
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var input = form.querySelector('input[name="email"]');
      var value = (input && input.value || '').trim();
      var ok = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value);
      if (!msg) return;
      msg.textContent = ok
        ? 'Thank you — festive design updates are on their way.'
        : 'Please enter a valid email address.';
      msg.classList.remove('hidden', 'text-primary-400', 'text-rose-300');
      msg.classList.add(ok ? 'text-primary-400' : 'text-rose-300');
      if (ok && input) input.value = '';
    });
  }

  /* ------------------------------------------------------------------
     6. MOUNT
     ------------------------------------------------------------------ */

  function mount(selector, html, wire) {
    var nodes = document.querySelectorAll(selector);
    for (var i = 0; i < nodes.length; i++) {
      nodes[i].innerHTML = html;
      if (typeof wire === 'function') wire(nodes[i]);
    }
    return nodes.length;
  }

  function mountAll() {
    mount(MOUNT_SELECTOR, footerTemplate(), wireFooter);
  }

  /* ------------------------------------------------------------------
     7. PUBLIC API
     ------------------------------------------------------------------ */

  window.RangoliFooter = {
    brand: BRAND,
    columns: COLUMNS,
    template: footerTemplate,
    mount: function (target) {
      return mount(target || MOUNT_SELECTOR, footerTemplate(), wireFooter);
    }
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', mountAll);
  } else {
    mountAll();
  }
})();
