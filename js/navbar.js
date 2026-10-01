

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
    hours: 'Mon – Sat · 9:30 AM – 7:00 PM IST'
  };

  var NAV = [
    {
      label: 'Home',
      href: 'index.html',
      match: ['index.html', 'home-2.html', '/', ''],
      children: [
        { label: 'Home 1', href: 'index.html' },
        { label: 'Home 2', href: 'home-2.html' }
      ]
    },
    { label: 'About', href: 'about.html' },
    { label: 'Services', href: 'services.html' },
    { label: 'Festive Packages', href: 'packages.html' },
    { label: 'Gallery', href: 'gallery.html' },
    { label: 'Contact', href: 'contact.html' }
  ];

  var MOUNT_SELECTOR = '#app-navbar, #navbar, #site-navbar, [data-navbar]';

  /* Arbitrary Tailwind variant matching JS navMode() below: the inline nav is
     used only from 1280px up AND with a fine pointer. A touch device — e.g.
     iPad Pro 13" at 1376x1032, or a tablet/2-in-1 — keeps the hamburger at any
     width, because a 1376px tablet is not a desktop and hover dropdowns are
     useless on touch. It has to be ONE media query (the `_and_` join), not two
     separate variants: two variants that both set `display` are an OR, which
     would show the nav on the iPad. Keep in sync with NAV_MODE_QUERY. */
  var NAV_MODE = '[@media(min-width:1280px)_and_(pointer:fine)]';

  /* The opposite of navMode(), expressed as two variants — for `display` an OR
     is exactly what we want here: show the hamburger if the viewport is under
     1280px OR the pointer is coarse. */
  var DRAWER_MODE_A = '[@media(max-width:1279px)]';
  var DRAWER_MODE_B = '[@media(pointer:coarse)]';

  /* ------------------------------------------------------------------
     2. ICONS (inline, currentColor driven)
     ------------------------------------------------------------------ */

  var ICON = {
    chevron: '<svg viewBox="0 0 20 20" fill="currentColor" class="h-3.5 w-3.5 transition-transform duration-200" aria-hidden="true"><path fill-rule="evenodd" d="M5.22 7.22a.75.75 0 0 1 1.06 0L10 10.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 8.28a.75.75 0 0 1 0-1.06Z" clip-rule="evenodd"/></svg>',
    sun: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" class="h-5 w-5 dark:hidden" aria-hidden="true"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></svg>',
    moon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" class="hidden h-5 w-5 dark:block" aria-hidden="true"><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8Z"/></svg>',
    globe: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" class="h-4 w-4" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c2.5 2.7 2.5 15.3 0 18M12 3c-2.5 2.7-2.5 15.3 0 18"/></svg>',
    menu: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" class="h-6 w-6" aria-hidden="true"><path d="M4 7h16M4 12h16M4 17h16"/></svg>',
    close: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" class="h-6 w-6" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18"/></svg>',
    arrow: '<svg viewBox="0 0 20 20" fill="currentColor" class="h-4 w-4" aria-hidden="true"><path fill-rule="evenodd" d="M3 10a.75.75 0 0 1 .75-.75h10.638L10.23 5.29a.75.75 0 1 1 1.06-1.06l5.5 5.5a.75.75 0 0 1 0 1.06l-5.5 5.5a.75.75 0 1 1-1.06-1.06l4.138-3.86H3.75A.75.75 0 0 1 3 10Z" clip-rule="evenodd"/></svg>',
    phone: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" class="h-4 w-4" aria-hidden="true"><path d="M3.5 5.5c0-.8.7-1.5 1.5-1.5h2.2c.7 0 1.3.5 1.5 1.2l.6 2.3c.2.7 0 1.4-.5 1.8l-1.2 1.2a12 12 0 0 0 5.4 5.4l1.2-1.2c.4-.5 1.1-.7 1.8-.5l2.3.6c.7.2 1.2.8 1.2 1.5v2.2c0 .8-.7 1.5-1.5 1.5h-1A15.5 15.5 0 0 1 3.5 6.5v-1Z"/></svg>',
    pin: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" class="h-4 w-4" aria-hidden="true"><path d="M12 21s7-5.3 7-10.4A7 7 0 0 0 5 10.6C5 15.7 12 21 12 21Z"/><circle cx="12" cy="10.5" r="2.6"/></svg>',
    mark: '<svg viewBox="0 0 40 40" class="h-10 w-10 shrink-0" aria-hidden="true">' +
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

  function currentPage() {
    var path = window.location.pathname.split('/').pop();
    return (path || 'index.html').toLowerCase();
  }

  function isActive(item) {
    var here = currentPage();
    if (item.match) return item.match.indexOf(here) > -1;
    var href = item.href.split('#')[0].toLowerCase();
    return href === here;
  }

  function esc(str) {
    if (str === null || str === undefined) return '';
    return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }

  var BASE_LINK =
    'group relative inline-flex items-center gap-1.5 rounded-full px-3.5 py-2 text-sm font-medium ' +
    'text-neutral-700 transition-colors duration-200 hover:bg-neutral-100 hover:text-neutral-900 ' +
    'dark:text-neutral-300 dark:hover:bg-white/5 dark:hover:text-white ' +
    'focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 ' +
    'focus-visible:ring-offset-white dark:focus-visible:ring-offset-neutral-950 motion-reduce:transition-none';

  var ACTIVE_LINK =
    ' bg-primary-50 text-primary-600 hover:bg-primary-100 hover:text-primary-700 ' +
    'dark:bg-primary-500/10 dark:text-primary-300 dark:hover:bg-primary-500/15 ' +
    'dark:hover:text-primary-200';

  var INACTIVE_LINK =
    ' after:absolute after:inset-x-3 after:bottom-0.5 after:h-0.5 after:origin-center after:scale-x-0 ' +
    'after:rounded-full after:bg-primary after:transition-transform after:duration-200 ' +
    'hover:after:scale-x-100 dark:after:bg-primary-400 motion-reduce:after:transition-none';

  /* Drawer rows. The active pair is what marks the current page on phones and
     tablets, and it is applied to a dropdown parent as well as a plain link —
     a parent uses item.match, so "Home" lights up on index.html AND home-2.html
     instead of going blank the way a plain href comparison would. */
  var DRAWER_ROW =
    'flex w-full items-center justify-between gap-3 rounded-xl px-4 py-3 text-start text-base font-semibold ' +
    'transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary';

  var DRAWER_ROW_ACTIVE =
    ' bg-primary-50 text-primary-700 dark:bg-primary-500/10 dark:text-primary-300';

  var DRAWER_ROW_INACTIVE =
    ' text-neutral-800 hover:bg-neutral-100 dark:text-neutral-100 dark:hover:bg-white/5';

  var DRAWER_CHILD_ACTIVE =
    ' bg-primary-50 font-semibold text-primary-700 dark:bg-primary-500/10 dark:text-primary-300';

  var DRAWER_CHILD_INACTIVE =
    ' text-neutral-600 dark:text-neutral-300';

  /* ------------------------------------------------------------------
     4. NAV LINKS
     ------------------------------------------------------------------ */

  function buildDesktopNav() {
    return NAV.map(function (item) {
      var active = isActive(item);

      if (item.children) {
        return '' +
          '<li class="relative" data-dropdown>' +
            '<button type="button" data-dropdown-trigger aria-expanded="false" aria-haspopup="true"' +
              ' aria-controls="menu-' + esc(item.label.toLowerCase()) + '"' +
              ' class="' + BASE_LINK + (active ? ACTIVE_LINK : INACTIVE_LINK) + '">' +
              esc(item.label) +
              '<span data-chevron class="transition-transform duration-200 motion-reduce:transition-none">' + ICON.chevron + '</span>' +
            '</button>' +
            '<div id="menu-' + esc(item.label.toLowerCase()) + '" data-dropdown-panel' +
              ' class="pointer-events-none invisible absolute start-0 top-full z-50 mt-2 w-60 origin-top scale-95 opacity-0' +
              ' rounded-2xl border border-neutral-200 bg-white p-2 shadow-xl shadow-neutral-900/10' +
              ' transition-all duration-200 motion-reduce:transition-none' +
              ' before:absolute before:-top-2 before:inset-x-0 before:h-2 before:content-[\'\']' +
              ' dark:border-white/10 dark:bg-neutral-900 dark:shadow-black/40">' +
              item.children.map(function (child) {
                var childActive = currentPage() === child.href.split('#')[0].toLowerCase();
                return '' +
                  '<a href="' + child.href + '" data-nav-link' +
                    ' class="flex items-center gap-3 rounded-xl px-3 py-2.5 transition-colors duration-200' +
                    ' hover:bg-primary-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary' +
                    ' dark:hover:bg-white/5">' +
                    '<span class="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg' +
                      ' bg-primary-50 text-primary-600 dark:bg-primary-500/10 dark:text-primary-300">' + ICON.arrow + '</span>' +
                    '<span class="min-w-0">' +
                      '<span class="block text-sm font-semibold text-neutral-900 dark:text-white' +
                        (childActive ? ' text-primary-600 dark:text-primary-300' : '') + '">' + esc(child.label) + '</span>' +
                      (child.hint
                        ? '<span class="block text-xs text-neutral-500 dark:text-neutral-400">' + esc(child.hint) + '</span>'
                        : '') +
                    '</span>' +
                  '</a>';
              }).join('') +
            '</div>' +
          '</li>';
      }

      return '' +
        '<li>' +
          '<a href="' + item.href + '" data-nav-link aria-current="' + (active ? 'page' : 'false') + '"' +
            ' class="' + BASE_LINK + (active ? ACTIVE_LINK : INACTIVE_LINK) + '">' + esc(item.label) +
          '</a>' +
        '</li>';
    }).join('');
  }

  function buildMobileNav() {
    return NAV.map(function (item) {
      var active = isActive(item);

      if (item.children) {
        return '' +
          /* data-active lets the wiring open this accordion on load, so the
             highlight is not hidden behind a collapsed panel. */
          '<li data-mobile-dropdown data-active="' + (active ? 'true' : 'false') + '">' +
            '<button type="button" data-mobile-trigger aria-expanded="' + (active ? 'true' : 'false') + '"' +
              ' aria-controls="m-' + esc(item.label.toLowerCase()) + '"' +
              ' class="' + DRAWER_ROW + (active ? DRAWER_ROW_ACTIVE : DRAWER_ROW_INACTIVE) + '">' +
              '<span>' + esc(item.label) + '</span>' +
              '<span data-chevron class="transition-transform duration-200' +
                (active ? ' rotate-180' : '') + '">' + ICON.chevron + '</span>' +
            '</button>' +
            '<div id="m-' + esc(item.label.toLowerCase()) + '" data-mobile-panel' +
              ' class="grid transition-all duration-300 motion-reduce:transition-none' +
              (active ? ' grid-rows-[1fr]' : ' grid-rows-[0fr]') + '">' +
              '<div class="overflow-hidden">' +
                '<ul class="mt-1 space-y-1 ps-3">' +
                  item.children.map(function (child) {
                    var childActive = currentPage() === child.href.split('#')[0].toLowerCase();
                    return '' +
                      '<li><a href="' + child.href + '" data-nav-link aria-current="' + (childActive ? 'page' : 'false') + '"' +
                        ' class="flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm transition-colors duration-200' +
                        ' focus:outline-none focus-visible:ring-2 focus-visible:ring-primary' +
                        (childActive
                          ? ' ' + DRAWER_CHILD_ACTIVE
                          : ' font-medium ' + DRAWER_CHILD_INACTIVE +
                            ' hover:bg-primary-50 hover:text-primary-700' +
                            ' dark:hover:bg-white/5 dark:hover:text-primary-300') + '">' +
                        '<span class="h-1.5 w-1.5 shrink-0 rounded-full ' +
                          (childActive ? 'bg-primary' : 'bg-neutral-300 dark:bg-neutral-600') + '"></span>' +
                        esc(child.label) +
                        (child.hint ? '<span class="text-xs text-neutral-400">' + esc(child.hint) + '</span>' : '') +
                      '</a></li>';
                  }).join('') +
                '</ul>' +
              '</div>' +
            '</div>' +
          '</li>';
      }

      return '' +
        '<li><a href="' + item.href + '" data-nav-link aria-current="' + (active ? 'page' : 'false') + '"' +
          ' class="block rounded-xl px-4 py-3 text-base font-semibold transition-colors duration-200' +
          ' focus:outline-none focus-visible:ring-2 focus-visible:ring-primary ' +
          (active ? DRAWER_ROW_ACTIVE : DRAWER_ROW_INACTIVE) +
          '">' + esc(item.label) + '</a></li>';
    }).join('');
  }

  /* ------------------------------------------------------------------
     5. NAVBAR MARKUP
     ------------------------------------------------------------------ */

  function navbarTemplate() {
    return '' +
    '<a href="#main-content" class="sr-only focus:not-sr-only focus:fixed focus:start-4 focus:top-4 focus:z-[100]' +
      ' focus:rounded-lg focus:bg-primary focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-white">' +
      'Skip to content</a>' +



    /* ---- header ---- */
    /* Positioning (sticky/top-0/z-50) lives on the mount wrapper, not here —
       see mount(). A sticky box can never leave its parent's box, and the
       wrapper is exactly as tall as this header, so sticky on the header
       itself would be a no-op. */
    '<header id="site-header" data-header class="border-b border-neutral-200/80 bg-white/85' +
      ' backdrop-blur-md transition-shadow duration-300 dark:border-white/10 dark:bg-neutral-950/85">' +
      '<nav class="mx-auto max-w-7xl px-4 sm:px-6 xl:px-8" aria-label="Primary">' +
        /* relative + two flex-1 sides so the nav list can be pinned dead
           centre with absolute centring, independent of how wide the brand
           and the actions happen to be */
        '<div class="relative flex h-16 items-center justify-between gap-2 sm:h-20 sm:gap-4">' +

          /* brand — identical lockup at every breakpoint: the mark is
             shrink-0 and the name + tagline keep their intrinsic width
             (flex-1 with basis-0 so they never get ellipsised), which is why
             the action cluster below does not grow until xl. */
          '<a href="index.html" class="group flex min-w-0 flex-1 items-center gap-1.5 rounded-xl py-1 focus:outline-none' +
            ' focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2' +
            ' focus-visible:ring-offset-white dark:focus-visible:ring-offset-neutral-950">' +
            '<span class="shrink-0 transition-transform duration-300 group-hover:rotate-12 motion-reduce:transition-none">' +
              ICON.mark +
            '</span>' +
            '<span class="min-w-0 leading-tight">' +
              '<span class="block truncate font-display text-base font-bold tracking-tight text-neutral-900 sm:text-lg' +
                ' dark:text-white">' + esc(BRAND.name) + '</span>' +
              /* the tagline shows at every breakpoint; its size/tracking step
                 down on the narrowest bars so the whole lockup still fits
                 without ever being clipped */
              '<span class="block whitespace-nowrap text-[0.5rem] font-medium uppercase tracking-[0.1em] text-primary-600' +
                ' dark:text-primary-400 min-[360px]:text-[0.5625rem] min-[360px]:tracking-[0.14em]' +
                ' min-[480px]:text-[0.625rem] min-[480px]:tracking-[0.16em]">' + esc(BRAND.mark) + '</span>' +
            '</span>' +
          '</a>' +

          /* desktop nav — only when NAV_MODE (see above): 1280px+ AND a fine
             pointer. Hidden at the base, shown by the single combined media
             query, so a touch iPad at 1376px falls back to the drawer. */
          '<ul class="pointer-events-none absolute start-1/2 top-1/2 hidden -translate-x-1/2 -translate-y-1/2' +
            ' items-center gap-0.5 ' + NAV_MODE + ':pointer-events-auto ' + NAV_MODE + ':flex' +
            ' rtl:translate-x-1/2">' + buildDesktopNav() + '</ul>' +

          /* actions — the two preference toggles and the primary CTA only
             appear here in nav mode; otherwise they live in the drawer, so a
             bar stays logo + hamburger. They only start growing at xl (paired
             with the equally growing brand) so the nav list stays optically
             centred; below that they take only their own width, which leaves
             the brand the full slack it needs. */
          '<div class="flex shrink-0 items-center justify-end gap-1.5 sm:gap-2 xl:flex-1">' +

            '<button type="button" data-theme-toggle aria-label="Switch to dark mode" title="Toggle dark mode"' +
              ' class="hidden h-10 w-10 items-center justify-center rounded-full border border-neutral-200' +
              ' bg-white text-neutral-700 transition-colors duration-200 hover:border-primary hover:text-primary' +
              ' focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2' +
              ' focus-visible:ring-offset-white ' + NAV_MODE + ':inline-flex' +
              ' dark:border-white/10 dark:bg-white/5 dark:text-neutral-200' +
              ' dark:hover:border-primary-400 dark:hover:text-primary-300 dark:focus-visible:ring-offset-neutral-950">' +
              ICON.sun + ICON.moon +
            '</button>' +

            '<button type="button" data-dir-toggle aria-label="Switch layout direction to right-to-left"' +
              ' title="Toggle LTR / RTL layout"' +
              ' class="hidden h-10 min-w-[3.5rem] items-center justify-center rounded-full border border-neutral-200' +
              ' bg-white px-3 text-xs font-bold uppercase tracking-wider text-neutral-700 transition-colors duration-200' +
              ' hover:border-secondary hover:text-secondary focus:outline-none focus-visible:ring-2' +
              ' ' + NAV_MODE + ':inline-flex' +
              ' focus-visible:ring-secondary focus-visible:ring-offset-2 focus-visible:ring-offset-white' +
              ' dark:border-white/10 dark:bg-white/5 dark:text-neutral-200 dark:hover:border-secondary-400' +
              ' dark:hover:text-secondary-300 dark:focus-visible:ring-offset-neutral-950">' +
              '<span class="ltr:hidden" aria-hidden="true">RTL</span>' +
              '<span class="hidden ltr:inline" aria-hidden="true">LTR</span>' +
            '</button>' +

            /* primary CTA - desktop / laptop only, on the same NAV_MODE gate as
               the two toggles above, and sitting directly after them. Phones
               and tablets never show it in the bar: they reach "Contact"
               through the drawer nav list instead. h-10 keeps it the same
               height as the toggles it follows. */
            '<a href="contact.html" data-nav-link' +
              ' class="hidden h-10 items-center justify-center gap-1.5 rounded-xl' +
              ' bg-primary-500 px-4 text-sm font-semibold text-white shadow-sm shadow-primary/25' +
              ' transition-colors duration-200 hover:bg-primary-600 focus:outline-none focus-visible:ring-2' +
              ' ' + NAV_MODE + ':inline-flex' +
              ' focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-white' +
              ' motion-reduce:transition-none dark:focus-visible:ring-offset-neutral-950">' +
              'Book an Enquiry' + ICON.arrow + '</a>' +

            /* hamburger: shown whenever the inline nav is not in use — under
               1280px, or on any coarse/touch pointer (iPad Pro 13" at
               1376x1032, tablets, touch 2-in-1s). */
            '<button type="button" data-menu-toggle aria-expanded="false" aria-controls="mobile-menu"' +
              ' aria-label="Open navigation menu"' +
              ' class="hidden h-10 w-10 shrink-0 items-center justify-center rounded-full border border-neutral-200' +
              ' bg-white text-neutral-800 transition-colors duration-200 hover:border-primary hover:text-primary' +
              ' focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2' +
              ' focus-visible:ring-offset-white ' + DRAWER_MODE_A + ':inline-flex ' + DRAWER_MODE_B + ':inline-flex' +
              ' dark:border-white/10 dark:bg-white/5 dark:text-neutral-100' +
              ' dark:hover:border-primary-400 dark:hover:text-primary-300 dark:focus-visible:ring-offset-neutral-950">' +
              '<span data-icon-open>' + ICON.menu + '</span>' +
              '<span data-icon-close class="hidden">' + ICON.close + '</span>' +
            '</button>' +

          '</div>' +
        '</div>' +

        /* mobile / touch drawer — mounted unless nav mode is active */
        '<div id="mobile-menu" data-mobile-menu' +
          ' class="max-h-0 overflow-hidden transition-[max-height] duration-300' +
          ' motion-reduce:transition-none ' + NAV_MODE + ':hidden">' +
          '<div class="max-h-[75vh] overflow-y-auto overscroll-contain py-4">' +
            '<ul class="space-y-1">' + buildMobileNav() + '</ul>' +

            /* the dark / direction toggles are duplicated here so phones and
               tablets — and any touch device in drawer mode, however wide —
               get the same controls. data-theme-toggle / data-dir-toggle are
               delegated globally, and applyTheme / applyDir re-sync every
               instance, so both copies always agree. */
            '<div class="mt-3 grid grid-cols-2 gap-2 ' + NAV_MODE + ':hidden">' +
              '<button type="button" data-theme-toggle aria-label="Switch to dark mode" title="Toggle dark mode"' +
                ' class="inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-neutral-200' +
                ' bg-white px-3 text-xs font-semibold text-neutral-700 transition-colors duration-200' +
                ' hover:border-primary hover:text-primary focus:outline-none focus-visible:ring-2' +
                ' focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-white' +
                ' dark:border-white/10 dark:bg-white/5 dark:text-neutral-200 dark:hover:border-primary-400' +
                ' dark:hover:text-primary-300 dark:focus-visible:ring-offset-neutral-950">' +
                ICON.sun + ICON.moon +
                '<span class="dark:hidden">Dark Mode</span><span class="hidden dark:inline">Light Mode</span>' +
              '</button>' +

              '<button type="button" data-dir-toggle aria-label="Switch layout direction to right-to-left"' +
                ' title="Toggle LTR / RTL layout"' +
                ' class="inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-neutral-200' +
                ' bg-white px-3 text-xs font-semibold text-neutral-700 transition-colors duration-200' +
                ' hover:border-secondary hover:text-secondary focus:outline-none focus-visible:ring-2' +
                ' focus-visible:ring-secondary focus-visible:ring-offset-2 focus-visible:ring-offset-white' +
                ' dark:border-white/10 dark:bg-white/5 dark:text-neutral-200 dark:hover:border-secondary-400' +
                ' dark:hover:text-secondary-300 dark:focus-visible:ring-offset-neutral-950">' +
                ICON.globe +
                '<span class="ltr:hidden">RTL</span><span class="hidden ltr:inline">LTR</span>' +
              '</button>' +
            '</div>' +

            '<div class="mt-4 flex items-center justify-between gap-3 rounded-xl bg-neutral-50 px-4 py-3' +
              ' text-xs text-neutral-600 dark:bg-white/5 dark:text-neutral-300">' +
             '<span class="hidden sm:inline">' + esc(BRAND.hours) + '</span>' +
            '</div>' +
          '</div>' +
        '</div>' +
      '</nav>' +
    '</header>';
  }

  /* ------------------------------------------------------------------
     6. THEME + DIRECTION
     ------------------------------------------------------------------ */

  var THEME_KEY = 'rr-theme';
  var DIR_KEY = 'rr-dir';

  function readStore(key) {
    try { return window.localStorage.getItem(key); } catch (e) { return null; }
  }
  function writeStore(key, value) {
    try { window.localStorage.setItem(key, value); } catch (e) { /* private mode */ }
  }

  function prefersDark() {
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  }

  function currentTheme() {
    return document.documentElement.classList.contains('dark') ? 'dark' : 'light';
  }

  function applyTheme(theme) {
    var root = document.documentElement;
    if (theme === 'dark') root.classList.add('dark');
    else root.classList.remove('dark');
    root.style.colorScheme = theme;
    writeStore(THEME_KEY, theme);
    syncThemeButtons(theme);
  }

  function syncThemeButtons(theme) {
    var buttons = document.querySelectorAll('[data-theme-toggle]');
    for (var i = 0; i < buttons.length; i++) {
      buttons[i].setAttribute('aria-label',
        theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode');
      buttons[i].setAttribute('aria-pressed', theme === 'dark' ? 'true' : 'false');
    }
  }

  function applyDir(dir) {
    var root = document.documentElement;
    root.setAttribute('dir', dir);
    writeStore(DIR_KEY, dir);
    var buttons = document.querySelectorAll('[data-dir-toggle]');
    for (var i = 0; i < buttons.length; i++) {
      buttons[i].setAttribute('aria-label',
        dir === 'rtl' ? 'Switch layout direction to left-to-right' : 'Switch layout direction to right-to-left');
      buttons[i].setAttribute('aria-pressed', dir === 'rtl' ? 'true' : 'false');
    }
  }

  /* Runs before first paint when placed in <head>; safe to call twice. */
  function bootstrapPrefs() {
    var root = document.documentElement;
    var theme = readStore(THEME_KEY);
    if (theme !== 'dark' && theme !== 'light') theme = prefersDark() ? 'dark' : 'light';
    if (theme === 'dark') root.classList.add('dark'); else root.classList.remove('dark');
    root.style.colorScheme = theme;

    var dir = readStore(DIR_KEY) === 'rtl' ? 'rtl' : 'ltr';
    root.setAttribute('dir', dir);
  }

  /* ------------------------------------------------------------------
     7. BEHAVIOUR WIRING
     ------------------------------------------------------------------ */

  /* The inline nav is used only on wide screens driven by a fine pointer;
     a touch device (iPad Pro 13" at 1376x1032, tablets, touch laptops) gets
     the drawer instead, so hover-open must be gated on the same condition the
     CSS uses. Keep these three in sync with the arbitrary media variants in
     navbarTemplate(). */
  var NAV_MODE_QUERY = '(min-width: 1280px) and (pointer: fine)';

  function navMode() {
    return !window.matchMedia || window.matchMedia(NAV_MODE_QUERY).matches;
  }

  function wireNavbar(root) {
    var header = root.querySelector('[data-header]');
    var menuBtn = root.querySelector('[data-menu-toggle]');
    var mobileMenu = root.querySelector('[data-mobile-menu]');

    /* scroll shadow */
    if (header) {
      var onScroll = function () {
        if (window.scrollY > 8) {
          header.classList.add('shadow-lg', 'shadow-neutral-900/5', 'dark:shadow-black/30');
        } else {
          header.classList.remove('shadow-lg', 'shadow-neutral-900/5', 'dark:shadow-black/30');
        }
      };
      onScroll();
      window.addEventListener('scroll', onScroll, { passive: true });
    }

    /* mobile drawer */
    function setMenu(open) {
      if (!menuBtn || !mobileMenu) return;
      menuBtn.setAttribute('aria-expanded', open ? 'true' : 'false');
      menuBtn.setAttribute('aria-label', open ? 'Close navigation menu' : 'Open navigation menu');
      var openIcon = menuBtn.querySelector('[data-icon-open]');
      var closeIcon = menuBtn.querySelector('[data-icon-close]');
      if (openIcon) openIcon.classList.toggle('hidden', open);
      if (closeIcon) closeIcon.classList.toggle('hidden', !open);
      mobileMenu.classList.toggle('max-h-0', !open);
      mobileMenu.classList.toggle('max-h-[75vh]', open);
      mobileMenu.classList.toggle('border-t', open);
      mobileMenu.classList.toggle('border-neutral-200', open);
      mobileMenu.classList.toggle('dark:border-white/10', open);
    }
    if (menuBtn && mobileMenu) {
      menuBtn.addEventListener('click', function () {
        setMenu(menuBtn.getAttribute('aria-expanded') !== 'true');
      });
    }

    /* desktop dropdowns */
    var dropdowns = root.querySelectorAll('[data-dropdown]');
    function closeDropdowns(except) {
      for (var i = 0; i < dropdowns.length; i++) {
        if (dropdowns[i] === except) continue;
        var t = dropdowns[i].querySelector('[data-dropdown-trigger]');
        var p = dropdowns[i].querySelector('[data-dropdown-panel]');
        var c = dropdowns[i].querySelector('[data-chevron]');
        if (t) t.setAttribute('aria-expanded', 'false');
        if (p) {
          p.classList.add('pointer-events-none', 'invisible', 'opacity-0', 'scale-95');
        }
        if (c) c.classList.remove('rotate-180');
      }
    }
    function openDropdown(dd) {
      var t = dd.querySelector('[data-dropdown-trigger]');
      var p = dd.querySelector('[data-dropdown-panel]');
      var c = dd.querySelector('[data-chevron]');
      if (t) t.setAttribute('aria-expanded', 'true');
      if (p) p.classList.remove('pointer-events-none', 'invisible', 'opacity-0', 'scale-95');
      if (c) c.classList.add('rotate-180');
    }
    function closeDropdown(dd) {
      var t = dd.querySelector('[data-dropdown-trigger]');
      var p = dd.querySelector('[data-dropdown-panel]');
      var c = dd.querySelector('[data-chevron]');
      if (t) t.setAttribute('aria-expanded', 'false');
      if (p) p.classList.add('pointer-events-none', 'invisible', 'opacity-0', 'scale-95');
      if (c) c.classList.remove('rotate-180');
    }

    for (var i = 0; i < dropdowns.length; i++) {
      (function (dd) {
        var trigger = dd.querySelector('[data-dropdown-trigger]');
        var panel = dd.querySelector('[data-dropdown-panel]');
        if (trigger) {
          trigger.addEventListener('click', function (e) {
            e.stopPropagation();
            if (trigger.getAttribute('aria-expanded') === 'true') { closeDropdown(dd); closeDropdowns(); }
            else { closeDropdowns(dd); openDropdown(dd); }
          });
        }
        dd.addEventListener('mouseenter', function () {
          if (navMode()) { closeDropdowns(dd); openDropdown(dd); }
        });
        dd.addEventListener('mouseleave', function () {
          if (navMode()) closeDropdown(dd);
        });
        dd.addEventListener('focusout', function (e) {
          if (!dd.contains(e.relatedTarget)) closeDropdown(dd);
        });
        if (panel) {
          panel.addEventListener('click', function (e) { e.stopPropagation(); });
        }
      })(dropdowns[i]);
    }

    /* mobile accordions */
    var mDropdowns = root.querySelectorAll('[data-mobile-dropdown]');
    for (var m = 0; m < mDropdowns.length; m++) {
      (function (dd) {
        var trigger = dd.querySelector('[data-mobile-trigger]');
        var panel = dd.querySelector('[data-mobile-panel]');
        var chev = dd.querySelector('[data-chevron]');
        if (!trigger || !panel) return;
        trigger.addEventListener('click', function () {
          var isOpen = trigger.getAttribute('aria-expanded') === 'true';
          for (var j = 0; j < mDropdowns.length; j++) {
            var t2 = mDropdowns[j].querySelector('[data-mobile-trigger]');
            var p2 = mDropdowns[j].querySelector('[data-mobile-panel]');
            var c2 = mDropdowns[j].querySelector('[data-chevron]');
            if (!t2 || !p2 || mDropdowns[j] === dd) continue;
            t2.setAttribute('aria-expanded', 'false');
            p2.classList.add('grid-rows-[0fr]');
            p2.classList.remove('grid-rows-[1fr]');
            if (c2) c2.classList.remove('rotate-180');
          }
          trigger.setAttribute('aria-expanded', isOpen ? 'false' : 'true');
          panel.classList.toggle('grid-rows-[0fr]', isOpen);
          panel.classList.toggle('grid-rows-[1fr]', !isOpen);
          if (chev) chev.classList.toggle('rotate-180', !isOpen);
        });
      })(mDropdowns[m]);
    }

    /* close drawer when a link is used */
    var navLinks = root.querySelectorAll('a[data-nav-link]');
    for (var n = 0; n < navLinks.length; n++) {
      navLinks[n].addEventListener('click', function () { setMenu(false); closeDropdowns(); });
    }

    /* document / window level listeners are bound once, not per mount */
    if (document.body.getAttribute('data-rr-nav-bound')) return;
    document.body.setAttribute('data-rr-nav-bound', 'true');

    document.addEventListener('click', function () { closeDropdowns(); });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') { closeDropdowns(); setMenu(false); }
    });
    window.addEventListener('resize', function () {
      if (navMode()) setMenu(false);
    });
  }

  /* ------------------------------------------------------------------
     8. MOUNT
     ------------------------------------------------------------------ */

  /* The empty mount element is the sticky slot. The injected <header> fills
     it exactly, so the wrapper is what pins to the viewport. */
  var STICKY_SLOT = 'sticky top-0 z-50';

  function mount(selector, html, wire) {
    var nodes = document.querySelectorAll(selector);
    for (var i = 0; i < nodes.length; i++) {
      nodes[i].className = (nodes[i].className + ' ' + STICKY_SLOT).replace(/\s+/g, ' ').trim();
      nodes[i].innerHTML = html;
      if (typeof wire === 'function') wire(nodes[i]);
    }
    return nodes.length;
  }

  function mountAll() {
    bootstrapPrefs();
    syncThemeButtons(currentTheme());
    applyDir(document.documentElement.getAttribute('dir') || 'ltr');

    mount(MOUNT_SELECTOR, navbarTemplate(), wireNavbar);

    /* global toggles (single instance each) */
    if (document.body.getAttribute('data-rr-prefs-bound')) return;
    document.body.setAttribute('data-rr-prefs-bound', 'true');

    document.addEventListener('click', function (e) {
      var themeBtn = e.target.closest && e.target.closest('[data-theme-toggle]');
      if (themeBtn) {
        applyTheme(currentTheme() === 'dark' ? 'light' : 'dark');
        return;
      }
      var dirBtn = e.target.closest && e.target.closest('[data-dir-toggle]');
      if (dirBtn) {
        applyDir(document.documentElement.getAttribute('dir') === 'rtl' ? 'ltr' : 'rtl');
      }
    });

    if (window.matchMedia) {
      var mq = window.matchMedia('(prefers-color-scheme: dark)');
      var onScheme = function (e) {
        if (!readStore(THEME_KEY)) applyTheme(e.matches ? 'dark' : 'light');
      };
      if (mq.addEventListener) mq.addEventListener('change', onScheme);
      else if (mq.addListener) mq.addListener(onScheme);
    }
  }

  /* ------------------------------------------------------------------
     9. PUBLIC API
     ------------------------------------------------------------------ */

  window.RangoliNav = {
    brand: BRAND,
    nav: NAV,
    template: navbarTemplate,
    mount: function (target) {
      return mount(target || MOUNT_SELECTOR, navbarTemplate(), wireNavbar);
    },
    setTheme: applyTheme,
    toggleTheme: function () { applyTheme(currentTheme() === 'dark' ? 'light' : 'dark'); },
    setDir: applyDir,
    toggleDir: function () {
      applyDir(document.documentElement.getAttribute('dir') === 'rtl' ? 'ltr' : 'rtl');
    },
    bootstrapPrefs: bootstrapPrefs
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', mountAll);
  } else {
    mountAll();
  }
})();
