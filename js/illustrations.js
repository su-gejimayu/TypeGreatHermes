/**
 * Bespoke 1930s comic-inked cartoon SVG illustrations for Type Great Hermes.
 * Every character uses bold #181818 ink lines, cel highlights, and animated sub-groups.
 * Supports:
 * - Letters A-Z
 * - Numbers 0-9 (0 = Zero to Hero, 1-9 = Australian 12 Days of Christmas with exact countable critters!)
 * - All 33 3-letter (+ bonus 4-letter JUMP) dictionary words
 */
(function () {
  const INK = '#181818';

  function wrapSvg(label, inner, extraDefs = '') {
    return `<svg class="critter-svg" role="img" aria-label="${label}" viewBox="0 0 240 240" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <filter id="sticker-shadow" x="-15%" y="-15%" width="130%" height="130%">
          <feDropShadow dx="0" dy="5" stdDeviation="0" flood-color="#181818" flood-opacity="0.22"/>
        </filter>
        ${extraDefs}
      </defs>
      <g filter="url(#sticker-shadow)" stroke="${INK}" stroke-width="5.5" stroke-linecap="round" stroke-linejoin="round">
        ${inner}
      </g>
    </svg>`;
  }

  function cartoonEyes(cx1, cx2, cy, rx = 10, ry = 14) {
    return `
      <ellipse cx="${cx1}" cy="${cy}" rx="${rx}" ry="${ry}" fill="#ffffff"/>
      <ellipse cx="${cx2}" cy="${cy}" rx="${rx}" ry="${ry}" fill="#ffffff"/>
      <circle cx="${cx1 + 2}" cy="${cy - 1}" r="${rx * 0.56}" fill="${INK}" stroke="none"/>
      <circle cx="${cx2 - 1}" cy="${cy - 1}" r="${rx * 0.56}" fill="${INK}" stroke="none"/>
      <polygon points="${cx1 + 2},${cy - 1} ${cx1 + 9},${cy - 6} ${cx1 + 9},${cy + 1}" fill="#ffffff" stroke="none"/>
      <polygon points="${cx2 - 1},${cy - 1} ${cx2 + 6},${cy - 6} ${cx2 + 6},${cy + 1}" fill="#ffffff" stroke="none"/>
    `;
  }

  function cheeks(cx1, cx2, cy, r = 9, color = '#ff8598') {
    return `
      <ellipse cx="${cx1}" cy="${cy}" rx="${r}" ry="${r * 0.65}" fill="${color}" stroke="none" opacity="0.78"/>
      <ellipse cx="${cx2}" cy="${cy}" rx="${r}" ry="${r * 0.65}" fill="${color}" stroke="none" opacity="0.78"/>
    `;
  }

  function sparkle(x, y, s = 10, fill = '#ffe047') {
    return `<path class="anim-twinkle" d="M${x},${y - s} Q${x},${y} ${x + s},${y} Q${x},${y} ${x},${y + s} Q${x},${y} ${x - s},${y} Q${x},${y} ${x},${y - s} Z" fill="${fill}" stroke="${INK}" stroke-width="3.5"/>`;
  }

  // Reusable countable Aussie mini-critters for 2-9 (Australian 12 Days of Christmas)
  function miniGalah(x, y, sc = 1, flip = 1) {
    return `<g transform="translate(${x}, ${y}) scale(${flip * sc}, ${sc})">
      <!-- Grey wing & tail -->
      <ellipse cx="10" cy="14" rx="22" ry="28" fill="#9aa3b2"/>
      <!-- Rose-pink chest -->
      <ellipse cx="-4" cy="14" rx="18" ry="25" fill="#ff6ca8"/>
      <!-- Pale pink crest -->
      <path d="M-12,-14 C-18,-34 2,-36 8,-18 Z" fill="#ffc4dd"/>
      <circle cx="-4" cy="-10" r="15" fill="#ff7eb3"/>
      <circle cx="-8" cy="-12" r="4" fill="${INK}" stroke="none"/>
      <path d="M-18,-10 L-28,-4 L-17,0 Z" fill="#fff3d6"/>
      <line x1="-8" y1="38" x2="-8" y2="48" stroke-width="4.5"/>
      <line x1="4" y1="38" x2="4" y2="48" stroke-width="4.5"/>
    </g>`;
  }

  function miniJabiru(x, y, sc = 1) {
    return `<g transform="translate(${x}, ${y}) scale(${sc})">
      <!-- Long coral-red stork legs -->
      <line x1="-5" y1="18" x2="-8" y2="56" stroke="#ff4757" stroke-width="5"/>
      <line x1="6" y1="18" x2="9" y2="56" stroke="#ff4757" stroke-width="5"/>
      <!-- White body & glossy dark green-blue wing -->
      <ellipse cx="2" cy="8" rx="22" ry="16" fill="#ffffff"/>
      <path d="M-8,2 C6,-4 20,4 22,16 C8,20 -6,16 -8,2 Z" fill="#264653"/>
      <!-- Tall neck & glossy dark head -->
      <path d="M-12,2 L-14,-28" fill="none" stroke="#264653" stroke-width="9"/>
      <circle cx="-14" cy="-32" r="10" fill="#264653"/>
      <circle cx="-16" cy="-34" r="3" fill="#ffe03b" stroke="none"/>
      <!-- Big Jabiru bill -->
      <polygon points="-22,-34 -46,-29 -22,-26" fill="#3b3e47"/>
    </g>`;
  }

  function miniLyrebird(x, y, sc = 1) {
    return `<g transform="translate(${x}, ${y}) scale(${sc})">
      <!-- Iconic curved Lyre tail plumes! -->
      <path class="anim-wag" style="transform-origin: 8px 10px" d="M8,10 C28,-18 38,-42 22,-48 C14,-48 16,-28 6,4" fill="none" stroke="#c97a3d" stroke-width="6"/>
      <path class="anim-wag" style="transform-origin: 8px 10px" d="M12,12 C36,-6 48,-28 36,-38 C28,-40 26,-20 10,8" fill="none" stroke="#e6a15c" stroke-width="5"/>
      <line x1="10" y1="8" x2="26" y2="-32" stroke="#fff0cc" stroke-width="3"/>
      <!-- Warm brown body & head -->
      <ellipse cx="-2" cy="14" rx="18" ry="14" fill="#9c5a2b"/>
      <circle cx="-14" cy="-4" r="11" fill="#b06935"/>
      <circle cx="-17" cy="-6" r="3.2" fill="${INK}" stroke="none"/>
      <polygon points="-24,-5 -34,-1 -24,2" fill="#ffd24c"/>
      <line x1="-6" y1="27" x2="-8" y2="40" stroke-width="4"/>
      <line x1="4" y1="27" x2="6" y2="40" stroke-width="4"/>
    </g>`;
  }

  function miniRoo(x, y, sc = 1) {
    return `<g class="anim-bob" transform="translate(${x}, ${y}) scale(${sc})">
      <path d="M10,16 C28,20 36,6 32,-4 C26,-4 22,10 10,10 Z" fill="#d98943"/>
      <ellipse cx="-4" cy="28" rx="14" ry="6" fill="#c47430"/>
      <ellipse cx="2" cy="10" rx="16" ry="20" fill="#e69a54"/>
      <ellipse cx="-2" cy="12" rx="9" ry="12" fill="#fae0b8" stroke="none"/>
      <ellipse cx="-6" cy="-22" rx="5" ry="12" transform="rotate(-15 -6 -22)" fill="#e69a54"/>
      <ellipse cx="8" cy="-22" rx="5" ry="12" transform="rotate(15 8 -22)" fill="#e69a54"/>
      <circle cx="0" cy="-10" r="13" fill="#e69a54"/>
      <circle cx="-4" cy="-12" r="3" fill="${INK}" stroke="none"/>
      <circle cx="5" cy="-12" r="3" fill="${INK}" stroke="none"/>
      <circle cx="0" cy="-6" r="3.5" fill="${INK}" stroke="none"/>
    </g>`;
  }

  function miniPlatypus(x, y, sc = 1) {
    return `<g class="anim-bob" transform="translate(${x}, ${y}) scale(${sc})">
      <!-- Paddle beaver-like tail -->
      <ellipse cx="26" cy="4" rx="14" ry="9" fill="#6b442a"/>
      <!-- Sleek brown body -->
      <ellipse cx="0" cy="4" rx="22" ry="14" fill="#8f5b38"/>
      <!-- Duck bill -->
      <ellipse cx="-24" cy="6" rx="13" ry="8" fill="#ffb838"/>
      <circle cx="-12" cy="-1" r="3.2" fill="${INK}" stroke="none"/>
      <circle cx="-3" cy="-1" r="3.2" fill="${INK}" stroke="none"/>
    </g>`;
  }

  function miniKoala(x, y, sc = 1) {
    return `<g transform="translate(${x}, ${y}) scale(${sc})">
      <!-- Fluffy round ears -->
      <circle cx="-16" cy="-8" r="10" fill="#8e9aaf"/>
      <circle cx="-16" cy="-8" r="5" fill="#e8eef5" stroke="none"/>
      <circle cx="16" cy="-8" r="10" fill="#8e9aaf"/>
      <circle cx="16" cy="-8" r="5" fill="#e8eef5" stroke="none"/>
      <!-- Chubby body & head -->
      <ellipse cx="0" cy="16" rx="14" ry="13" fill="#9aa6ba"/>
      <circle cx="0" cy="0" r="15" fill="#adb8ca"/>
      <!-- Iconic oval black koala nose -->
      <ellipse cx="0" cy="2" rx="5" ry="7" fill="#2c303a"/>
      <circle cx="-7" cy="-3" r="2.6" fill="${INK}" stroke="none"/>
      <circle cx="7" cy="-3" r="2.6" fill="${INK}" stroke="none"/>
    </g>`;
  }

  function miniPossum(x, y, sc = 1) {
    return `<g class="anim-bob" transform="translate(${x}, ${y}) scale(${sc})">
      <!-- Curled ringtail -->
      <path d="M12,12 C26,14 28,-2 18,-4" fill="none" stroke="#c78d65" stroke-width="5"/>
      <ellipse cx="0" cy="10" rx="14" ry="11" fill="#9e8270"/>
      <circle cx="-11" cy="-8" r="7" fill="#ff9eb5"/>
      <circle cx="11" cy="-8" r="7" fill="#ff9eb5"/>
      <circle cx="0" cy="-2" r="13" fill="#b39684"/>
      <circle cx="-5" cy="-3" r="3.2" fill="${INK}" stroke="none"/>
      <circle cx="5" cy="-3" r="3.2" fill="${INK}" stroke="none"/>
      <circle cx="0" cy="3" r="3" fill="#ff6b8b" stroke="none"/>
    </g>`;
  }

  function miniWombat(x, y, sc = 1) {
    return `<g transform="translate(${x}, ${y}) scale(${sc})">
      <!-- Chubby wombat body -->
      <ellipse cx="0" cy="12" rx="19" ry="14" fill="#8c6243"/>
      <circle cx="-12" cy="-6" r="5.5" fill="#755035"/>
      <circle cx="12" cy="-6" r="5.5" fill="#755035"/>
      <ellipse cx="0" cy="2" rx="16" ry="13" fill="#9e7150"/>
      <!-- Yellow worker hardhat ("Nine Wombats Working"!) -->
      <path d="M-15,-5 C-15,-20 15,-20 15,-5 Z" fill="#ffe03b"/>
      <line x1="-18" y1="-5" x2="18" y2="-5" stroke="#ffa822" stroke-width="5"/>
      <ellipse cx="0" cy="4" rx="6" ry="4.5" fill="#3a281c"/>
      <circle cx="-7" cy="-1" r="2.5" fill="${INK}" stroke="none"/>
      <circle cx="7" cy="-1" r="2.5" fill="${INK}" stroke="none"/>
    </g>`;
  }

  const ART = {
    A: () => wrapSvg('Happy red apple', `
      <!-- Stem & Leaf -->
      <path d="M118,58 C116,36 128,24 138,22" fill="none" stroke-width="8"/>
      <path class="anim-flap" d="M123,46 C142,24 176,28 178,48 C162,64 136,60 123,46 Z" fill="#46c963"/>
      <path d="M132,46 C148,40 162,42 170,46" fill="none" stroke-width="3.5"/>
      <!-- Apple Body -->
      <path d="M120,62 C92,46 44,64 44,118 C44,174 84,210 112,204 C118,202 122,202 128,204 C156,210 196,174 196,118 C196,64 148,46 120,62 Z" fill="#ff3e41"/>
      <!-- Gloss highlight -->
      <path d="M68,86 C60,104 60,126 68,142" fill="none" stroke="#ffffff" stroke-width="8" opacity="0.85"/>
      <circle cx="74" cy="72" r="5" fill="#ffffff" stroke="none" opacity="0.85"/>
      ${cheeks(82, 158, 140, 12, '#ff9aa8')}
      ${cartoonEyes(98, 142, 120, 11, 15)}
      <!-- Big Smile -->
      <path d="M98,146 C106,168 134,168 142,146 Z" fill="#6b1420"/>
      <path d="M106,158 C114,151 126,151 134,158 C128,165 112,165 106,158 Z" fill="#ff7d95" stroke="none"/>
      <!-- Cute little green worm waving -->
      <g class="anim-bob">
        <path d="M178,108 C198,96 218,106 214,126 C210,142 192,144 186,136" fill="#7be356"/>
        <circle cx="204" cy="112" r="3.5" fill="${INK}" stroke="none"/>
        <path d="M198,121 Q205,127 211,120" fill="none" stroke-width="3.5"/>
      </g>
      ${sparkle(34, 62, 11)}
    `),

    B: () => wrapSvg('Smiling cartoon baby waving a rattle', `
      <!-- Cozy Polka-dot Blanket / Bib body -->
      <path d="M64,156 C56,192 76,216 120,216 C164,216 184,192 176,156 Z" fill="#6bc8ff"/>
      <path d="M82,154 C96,176 144,176 158,154 C150,144 90,144 82,154 Z" fill="#ffffff"/>
      <circle cx="92" cy="192" r="5" fill="#ffffff" stroke="none"/>
      <circle cx="120" cy="198" r="5" fill="#ffffff" stroke="none"/>
      <circle cx="148" cy="190" r="5" fill="#ffffff" stroke="none"/>
      <!-- Waving Baby Arms -->
      <path d="M68,162 C42,148 34,126 48,112 C58,104 70,116 68,132" fill="#ffd4b2"/>
      <!-- Right arm holding rattle -->
      <g class="anim-wag" style="transform-origin: 170px 155px">
        <path d="M172,162 C196,146 206,122 192,108 C182,100 170,114 172,130" fill="#ffd4b2"/>
        <line x1="192" y1="108" x2="206" y2="74" stroke="#ff6699" stroke-width="9"/>
        <line x1="192" y1="108" x2="206" y2="74" stroke="${INK}" stroke-width="5"/>
        <circle cx="210" cy="64" r="19" fill="#ffe047"/>
        <path d="M192,60 L228,68" stroke="#ff5c8a" stroke-width="5"/>
      </g>
      <!-- Baby Ears & Chubby Head -->
      <circle cx="56" cy="112" r="14" fill="#ffd4b2"/>
      <circle cx="184" cy="112" r="14" fill="#ffd4b2"/>
      <ellipse cx="120" cy="108" rx="64" ry="58" fill="#ffd4b2"/>
      <!-- Cute Curly Hair Tuft on Top -->
      <path d="M114,50 C104,26 138,18 140,38 C142,52 122,56 122,44" fill="none" stroke="#6b3e26" stroke-width="9"/>
      <path d="M114,50 C104,26 138,18 140,38 C142,52 122,56 122,44" fill="none" stroke="${INK}" stroke-width="5"/>
      ${cheeks(78, 162, 122, 14, '#ff8da1')}
      ${cartoonEyes(98, 142, 102, 11, 15)}
      <!-- Tiny button nose -->
      <path d="M115,116 Q120,122 125,116" fill="none" stroke-width="4.5"/>
      <!-- Joyful baby grin with one tiny tooth! -->
      <path d="M94,128 C102,154 138,154 146,128 Z" fill="#7a1c28"/>
      <path d="M104,143 C112,136 128,136 136,143 C128,150 112,150 104,143 Z" fill="#ff859d" stroke="none"/>
      <rect x="114" y="128" width="11" height="8" rx="2" fill="#ffffff" stroke-width="3"/>
      ${sparkle(36, 58, 11)}
    `),

    C: () => wrapSvg('Playful orange tabby cat', `
      <!-- Wagging Tail -->
      <path class="anim-wag" style="transform-origin: 168px 185px" d="M164,186 C206,184 222,138 202,108 C192,94 178,106 186,122 C194,138 184,166 158,170" fill="#ff9636"/>
      <!-- Body -->
      <ellipse cx="120" cy="176" rx="52" ry="38" fill="#ff9636"/>
      <ellipse cx="120" cy="180" rx="28" ry="24" fill="#fff1d6" stroke="none"/>
      <!-- Paws -->
      <ellipse cx="88" cy="206" rx="18" ry="11" fill="#fff1d6"/>
      <ellipse cx="152" cy="206" rx="18" ry="11" fill="#fff1d6"/>
      <!-- Ears -->
      <polygon points="62,92 50,34 102,62" fill="#ff9636"/>
      <polygon points="68,82 60,48 92,66" fill="#ff8da1" stroke="none"/>
      <polygon points="178,92 190,34 138,62" fill="#ff9636"/>
      <polygon points="172,82 180,48 148,66" fill="#ff8da1" stroke="none"/>
      <!-- Head -->
      <ellipse cx="120" cy="108" rx="64" ry="52" fill="#ff9636"/>
      <!-- Tabby Stripes -->
      <path d="M120,58 L120,76 M106,60 L110,75 M134,60 L130,75" stroke="#bf5311" stroke-width="6"/>
      ${cheeks(76, 164, 122, 11)}
      ${cartoonEyes(96, 144, 102, 11, 15)}
      <!-- Pink Triangle Nose & Cat Smile -->
      <polygon points="113,116 127,116 120,125" fill="#ff6b8b" stroke-width="4"/>
      <path d="M120,125 C114,138 98,138 94,128 M120,125 C126,138 142,138 146,128" fill="none" stroke-width="4.5"/>
      <!-- Whiskers -->
      <path d="M62,114 L34,108 M62,124 L32,126 M178,114 L206,108 M178,124 L208,126" stroke-width="4"/>
    `),

    D: () => wrapSvg('Joyful leaping brown puppy dog', `
      <!-- Wagging Tail -->
      <path class="anim-wag" style="transform-origin: 176px 146px" d="M172,148 C198,128 214,98 202,84 C192,76 182,98 166,134 Z" fill="#d99043"/>
      <!-- Hind Legs leaping back -->
      <path d="M156,166 C180,174 202,194 196,208 C188,216 168,200 144,182 Z" fill="#c47b31"/>
      <path d="M168,152 C198,154 220,170 216,186 C208,194 186,182 158,168 Z" fill="#d99043"/>
      <!-- Puppy Body -->
      <ellipse cx="136" cy="158" rx="46" ry="30" transform="rotate(-14 136 158)" fill="#d99043"/>
      <ellipse cx="130" cy="166" rx="28" ry="16" transform="rotate(-14 130 166)" fill="#f6cb8e" stroke="none"/>
      <!-- Front Paws bounding forward -->
      <path d="M88,152 C60,152 38,168 44,184 C52,194 74,180 98,168 Z" fill="#c47b31"/>
      <path d="M106,166 C84,184 72,208 86,216 C98,220 112,196 122,176 Z" fill="#d99043"/>
      <!-- Turquoise Collar & Gold Tag -->
      <path d="M90,124 C104,142 134,144 146,128 C140,118 100,114 90,124 Z" fill="#2cc4cb"/>
      <circle cx="110" cy="142" r="8" fill="#ffd43b"/>
      <!-- Floppy Dark Brown Left Ear -->
      <path class="anim-flap" style="transform-origin: 84px 72px" d="M84,68 C56,42 26,56 32,84 C38,104 66,94 82,82 Z" fill="#6e3f1d"/>
      <!-- Head -->
      <ellipse cx="108" cy="88" rx="44" ry="40" fill="#e59c4c"/>
      <!-- Floppy Dark Brown Right Ear flying up -->
      <path class="anim-flap" style="transform-origin: 140px 72px" d="M138,68 C166,44 202,58 196,86 C190,104 160,94 142,84 Z" fill="#6e3f1d"/>
      <!-- Snout & Open Happy Mouth with Pink Tongue -->
      <ellipse cx="92" cy="102" rx="28" ry="20" fill="#f9d59b"/>
      <path d="M78,108 C82,136 116,138 122,110 Z" fill="#6b1824"/>
      <path d="M86,116 C86,140 110,142 112,118 Z" fill="#ff7390"/>
      <!-- Big Shiny Black Dog Nose -->
      <ellipse cx="76" cy="94" rx="12" ry="9" fill="${INK}"/>
      <ellipse cx="73" cy="91" rx="4" ry="2.5" fill="#ffffff" stroke="none"/>
      <!-- Happy Eyes & Eyebrows -->
      ${cartoonEyes(94, 122, 74, 9.5, 13.5)}
      <path d="M84,54 Q94,46 104,54 M114,54 Q124,46 134,54" fill="none" stroke-width="4.5"/>
      ${sparkle(42, 122, 9)}
    `),

    E: () => wrapSvg('Friendly blue elephant spouting water', `
      <!-- Giant Floppy Ears -->
      <ellipse class="anim-flap" style="transform-origin: 76px 115px" cx="54" cy="118" rx="38" ry="48" fill="#7fc4fd"/>
      <ellipse cx="54" cy="122" rx="22" ry="30" fill="#ffb3c6" stroke="none"/>
      <ellipse class="anim-flap" style="transform-origin: 164px 115px" cx="186" cy="118" rx="38" ry="48" fill="#7fc4fd"/>
      <ellipse cx="186" cy="122" rx="22" ry="30" fill="#ffb3c6" stroke="none"/>
      <!-- Chubby Body & Feet -->
      <ellipse cx="120" cy="180" rx="52" ry="36" fill="#7fc4fd"/>
      <rect x="78" y="190" width="28" height="26" rx="10" fill="#7fc4fd"/>
      <rect x="134" y="190" width="28" height="26" rx="10" fill="#7fc4fd"/>
      <!-- Head -->
      <circle cx="120" cy="114" r="48" fill="#8fd0ff"/>
      ${cheeks(84, 156, 126, 10)}
      ${cartoonEyes(100, 140, 102, 10, 14)}
      <!-- Smiling Mouth -->
      <path d="M104,140 Q120,154 136,140" fill="none" stroke-width="5"/>
      <!-- Curled Up Trunk -->
      <path d="M110,120 C108,156 154,162 158,122 C160,98 140,94 142,108" fill="#8fd0ff"/>
      <!-- Water Spout Drops -->
      <g class="anim-bob">
        <path d="M154,84 C148,62 132,48 122,56" fill="none" stroke="#3ac8ff" stroke-width="6"/>
        <path d="M162,84 C172,60 190,50 198,60" fill="none" stroke="#3ac8ff" stroke-width="6"/>
        <circle cx="158" cy="44" r="6" fill="#5ce1ff" stroke-width="3.5"/>
      </g>
    `),

    F: () => wrapSvg('Yummy happy food plate with burger and fries', `
      <!-- Bright Mint Plate -->
      <ellipse cx="120" cy="192" rx="96" ry="24" fill="#6fe3c1"/>
      <ellipse cx="120" cy="190" rx="72" ry="14" fill="#ffffff"/>
      <!-- Crisp Fries Carton at Back-Right -->
      <g class="anim-bob">
        <rect x="142" y="62" width="12" height="46" rx="4" transform="rotate(-8 148 85)" fill="#ffe047"/>
        <rect x="158" y="54" width="12" height="52" rx="4" transform="rotate(4 164 80)" fill="#ffd026"/>
        <rect x="174" y="64" width="12" height="46" rx="4" transform="rotate(14 180 87)" fill="#ffe047"/>
        <polygon points="136,96 196,96 186,156 146,156" fill="#ff4747"/>
        <circle cx="166" cy="128" r="10" fill="#ffe047"/>
      </g>
      <!-- Happy Cartoon Burger Front & Center -->
      <path d="M46,166 C46,188 158,188 158,166 Z" fill="#f2a649"/>
      <rect x="40" y="146" width="124" height="22" rx="11" fill="#7a3e22"/>
      <polygon points="48,146 156,146 136,164 114,148 90,164 66,148" fill="#ffd426" stroke-width="4"/>
      <path d="M38,142 Q52,130 66,142 T94,142 T122,142 T150,142 T166,142" fill="none" stroke="#45cc5b" stroke-width="11"/>
      <path d="M38,142 Q52,130 66,142 T94,142 T122,142 T150,142 T166,142" fill="none" stroke="${INK}" stroke-width="4.5"/>
      <path d="M44,136 C44,74 160,74 160,136 Z" fill="#f7b257"/>
      <ellipse cx="78" cy="92" rx="5" ry="3" fill="#fff4d2" stroke="none"/>
      <ellipse cx="104" cy="84" rx="5" ry="3" fill="#fff4d2" stroke="none"/>
      <ellipse cx="128" cy="92" rx="5" ry="3" fill="#fff4d2" stroke="none"/>
      ${cartoonEyes(86, 118, 112, 8.5, 11.5)}
      ${cheeks(68, 136, 122, 8)}
      <path d="M92,124 Q102,136 112,124" fill="none" stroke-width="4.5"/>
      ${sparkle(42, 66, 11)}
    `),

    G: () => wrapSvg('Friendly tall yellow giraffe', `
      <path d="M96,118 L86,216 L146,216 L136,118 Z" fill="#ffd84d"/>
      <circle cx="110" cy="156" r="11" fill="#c96f28" stroke="none"/>
      <circle cx="128" cy="186" r="13" fill="#c96f28" stroke="none"/>
      <circle cx="98" cy="198" r="9" fill="#c96f28" stroke="none"/>
      <line x1="98" y1="58" x2="88" y2="28" stroke-width="7"/>
      <line x1="142" y1="58" x2="152" y2="28" stroke-width="7"/>
      <circle cx="86" cy="26" r="10" fill="#c96f28"/>
      <circle cx="154" cy="26" r="10" fill="#c96f28"/>
      <ellipse class="anim-flap" cx="62" cy="76" rx="20" ry="11" transform="rotate(-20 62 76)" fill="#ffd84d"/>
      <ellipse class="anim-flap" cx="178" cy="76" rx="20" ry="11" transform="rotate(20 178 76)" fill="#ffd84d"/>
      <ellipse cx="120" cy="86" rx="46" ry="38" fill="#ffd84d"/>
      <ellipse cx="120" cy="112" rx="48" ry="28" fill="#f7b76d"/>
      ${cartoonEyes(100, 140, 76, 9.5, 13)}
      <circle cx="102" cy="104" r="4.5" fill="${INK}" stroke="none"/>
      <circle cx="138" cy="104" r="4.5" fill="${INK}" stroke="none"/>
      <path d="M98,118 C108,136 132,136 142,118" fill="none" stroke-width="5"/>
    `),

    H: () => wrapSvg('Happy purple hippo splashing in water', `
      <path class="anim-bob" d="M24,194 Q52,174 78,194 T132,194 T186,194 T218,194 L218,218 L24,218 Z" fill="#4dd2ff"/>
      <ellipse cx="120" cy="172" rx="68" ry="42" fill="#b48cf2"/>
      <circle class="anim-flap" cx="76" cy="54" r="16" fill="#b48cf2"/>
      <circle cx="76" cy="54" r="8" fill="#ff9ebb" stroke="none"/>
      <circle class="anim-flap" cx="164" cy="54" r="16" fill="#b48cf2"/>
      <circle cx="164" cy="54" r="8" fill="#ff9ebb" stroke="none"/>
      <ellipse cx="120" cy="84" rx="50" ry="40" fill="#c39ef7"/>
      ${cartoonEyes(100, 140, 74, 10, 14)}
      <ellipse cx="120" cy="126" rx="68" ry="40" fill="#d4b8ff"/>
      ${cheeks(68, 172, 124, 11, '#ff94b8')}
      <ellipse cx="92" cy="110" rx="8" ry="11" transform="rotate(-15 92 110)" fill="#6d47a8"/>
      <ellipse cx="148" cy="110" rx="8" ry="11" transform="rotate(15 148 110)" fill="#6d47a8"/>
      <path d="M74,132 C80,168 160,168 166,132 Z" fill="#6b1835"/>
      <path d="M94,154 C108,144 132,144 146,154 C134,164 106,164 94,154 Z" fill="#ff82a9" stroke="none"/>
      <rect x="92" y="132" width="16" height="15" rx="3" fill="#ffffff" stroke-width="4"/>
      <rect x="132" y="132" width="16" height="15" rx="3" fill="#ffffff" stroke-width="4"/>
      <path class="anim-twinkle" d="M40,148 C30,132 46,122 48,140 Z" fill="#6ce0ff" stroke-width="4"/>
      <path class="anim-twinkle" d="M200,148 C210,132 194,122 192,140 Z" fill="#6ce0ff" stroke-width="4"/>
    `),

    I: () => wrapSvg('Triple scoop rainbow ice cream cone', `
      <polygon points="78,132 162,132 120,220" fill="#f0a854"/>
      <path d="M90,152 L146,152 M100,174 L138,174 M96,134 L130,196 M144,134 L110,196" stroke="#b56c22" stroke-width="3.5"/>
      <circle cx="120" cy="68" r="34" fill="#76e8b5"/>
      <circle cx="88" cy="108" r="34" fill="#ffe46b"/>
      <circle cx="152" cy="108" r="34" fill="#ff85b3"/>
      <path d="M62,126 Q76,144 92,128 Q108,144 124,128 Q140,144 156,128 Q170,142 178,126" fill="#ff85b3"/>
      <path d="M122,34 C128,16 146,14 154,18" fill="none" stroke-width="5"/>
      <circle class="anim-bob" cx="120" cy="36" r="14" fill="#ff2e4c"/>
      <circle cx="115" cy="31" r="3.5" fill="#ffffff" stroke="none"/>
      ${cartoonEyes(104, 136, 98, 8.5, 12)}
      <path d="M108,116 Q120,128 132,116" fill="none" stroke-width="4.5"/>
      ${sparkle(44, 68, 10)}
    `),

    J: () => wrapSvg('Wiggling pink jellyfish', `
      <g class="anim-wag" style="transform-origin: 120px 130px">
        <path d="M74,132 C62,156 86,174 70,204" fill="none" stroke="#ff6ec7" stroke-width="9"/>
        <path d="M74,132 C62,156 86,174 70,204" fill="none" stroke="${INK}" stroke-width="4.5"/>
        <path d="M104,136 C94,162 116,180 102,212" fill="none" stroke="#a78bfa" stroke-width="9"/>
        <path d="M104,136 C94,162 116,180 102,212" fill="none" stroke="${INK}" stroke-width="4.5"/>
        <path d="M136,136 C146,162 124,180 138,212" fill="none" stroke="#60d8ff" stroke-width="9"/>
        <path d="M136,136 C146,162 124,180 138,212" fill="none" stroke="${INK}" stroke-width="4.5"/>
        <path d="M166,132 C178,156 154,174 170,204" fill="none" stroke="#ff6ec7" stroke-width="9"/>
        <path d="M166,132 C178,156 154,174 170,204" fill="none" stroke="${INK}" stroke-width="4.5"/>
      </g>
      <path d="M48,124 C48,50 192,50 192,124 Q174,142 156,126 Q138,142 120,126 Q102,142 84,126 Q66,142 48,124 Z" fill="#ff8ad4"/>
      <path d="M72,82 C82,66 102,60 116,62" fill="none" stroke="#ffffff" stroke-width="7" opacity="0.8"/>
      ${cheeks(82, 158, 108, 10, '#ff4fa3')}
      ${cartoonEyes(100, 140, 94, 9.5, 13)}
      <path d="M106,112 Q120,124 134,112" fill="none" stroke-width="4.5"/>
      <circle class="anim-bob" cx="42" cy="76" r="10" fill="#bbf0ff" stroke-width="4"/>
      <circle class="anim-bob" cx="198" cy="64" r="13" fill="#bbf0ff" stroke-width="4"/>
    `),

    K: () => wrapSvg('Bouncy kangaroo with baby joey in pouch', `
      <path class="anim-wag" style="transform-origin: 155px 175px" d="M150,174 C194,182 216,150 208,132 C198,126 184,154 152,156 Z" fill="#d98c46"/>
      <ellipse cx="90" cy="208" rx="30" ry="11" fill="#c77832"/>
      <ellipse cx="144" cy="208" rx="30" ry="11" fill="#d98c46"/>
      <ellipse cx="122" cy="154" rx="46" ry="50" fill="#e59a54"/>
      <path d="M90,148 C90,192 154,192 154,148 Z" fill="#f9d8a7"/>
      <g class="anim-bob">
        <ellipse cx="122" cy="142" rx="18" ry="16" fill="#d98c46"/>
        <ellipse cx="110" cy="124" rx="5" ry="11" transform="rotate(-18 110 124)" fill="#d98c46"/>
        <ellipse cx="134" cy="124" rx="5" ry="11" transform="rotate(18 134 124)" fill="#d98c46"/>
        <circle cx="116" cy="140" r="3" fill="${INK}" stroke="none"/>
        <circle cx="128" cy="140" r="3" fill="${INK}" stroke="none"/>
      </g>
      <ellipse cx="94" cy="48" rx="12" ry="28" transform="rotate(-16 94 48)" fill="#e59a54"/>
      <ellipse cx="146" cy="48" rx="12" ry="28" transform="rotate(16 146 48)" fill="#e59a54"/>
      <ellipse cx="120" cy="84" rx="38" ry="32" fill="#e59a54"/>
      ${cartoonEyes(104, 136, 78, 8.5, 12)}
      <ellipse cx="120" cy="94" rx="8" ry="6" fill="${INK}"/>
      <path d="M108,104 Q120,114 132,104" fill="none" stroke-width="4.5"/>
    `),

    L: () => wrapSvg('Friendly roaring golden lion', `
      <path class="anim-wag" style="transform-origin: 168px 186px" d="M166,188 C198,186 212,158 202,138" fill="none" stroke="#f5b335" stroke-width="9"/>
      <path class="anim-wag" style="transform-origin: 168px 186px" d="M202,138 C194,124 212,116 216,132 C214,144 204,144 202,138 Z" fill="#d95f18"/>
      <ellipse cx="120" cy="186" rx="46" ry="30" fill="#f7be45"/>
      <path d="M120,28 Q144,24 156,42 Q180,44 184,68 Q204,84 196,108 Q206,132 186,148 Q182,170 158,170 Q142,186 120,178 Q98,186 82,170 Q58,170 54,148 Q34,132 44,108 Q36,84 56,68 Q60,44 84,42 Q96,24 120,28 Z" fill="#e86a1c"/>
      <circle cx="78" cy="64" r="16" fill="#f7be45"/>
      <circle cx="162" cy="64" r="16" fill="#f7be45"/>
      <circle cx="120" cy="106" r="46" fill="#ffd059"/>
      ${cartoonEyes(100, 140, 94, 9.5, 13.5)}
      <polygon points="110,112 130,112 120,123" fill="#8a3318"/>
      <path d="M96,128 C102,154 138,154 144,128 Z" fill="#6b1824"/>
      <path d="M106,144 Q120,134 134,144" fill="#ff7d95" stroke="none"/>
      <path d="M72,118 L48,114 M72,126 L48,128 M168,118 L192,114 M168,126 L192,128" stroke-width="4"/>
    `),

    M: () => wrapSvg('Playful brown monkey holding a banana', `
      <path class="anim-wag" style="transform-origin: 160px 185px" d="M158,186 C204,190 218,136 192,118 C176,110 172,132 188,136" fill="none" stroke="#8c512b" stroke-width="11"/>
      <path class="anim-wag" style="transform-origin: 160px 185px" d="M158,186 C204,190 218,136 192,118 C176,110 172,132 188,136" fill="none" stroke="${INK}" stroke-width="5"/>
      <ellipse cx="118" cy="178" rx="42" ry="34" fill="#8c512b"/>
      <ellipse cx="118" cy="180" rx="24" ry="22" fill="#f2c794" stroke="none"/>
      <circle cx="52" cy="102" r="24" fill="#8c512b"/>
      <circle cx="52" cy="102" r="14" fill="#f2c794" stroke="none"/>
      <circle cx="184" cy="102" r="24" fill="#8c512b"/>
      <circle cx="184" cy="102" r="14" fill="#f2c794" stroke="none"/>
      <circle cx="118" cy="100" r="52" fill="#8c512b"/>
      <path d="M84,88 C84,64 118,70 118,84 C118,70 152,64 152,88 C162,102 160,138 118,142 C76,138 74,102 84,88 Z" fill="#f5cea0" stroke="none"/>
      ${cartoonEyes(100, 136, 92, 9, 13)}
      <ellipse cx="118" cy="120" rx="36" ry="24" fill="#f7d6ad"/>
      <circle cx="112" cy="110" r="3.5" fill="${INK}" stroke="none"/>
      <circle cx="124" cy="110" r="3.5" fill="${INK}" stroke="none"/>
      <path d="M96,120 C104,140 132,140 140,120" fill="none" stroke-width="5"/>
      <g class="anim-bob">
        <path d="M36,144 C26,182 64,208 96,184 C70,184 52,168 52,142 Z" fill="#ffe033"/>
      </g>
    `),

    N: () => wrapSvg('Cozy bird nest with chirping baby chick', `
      <path d="M18,186 Q120,198 222,174" fill="none" stroke="#6e4123" stroke-width="12"/>
      <path d="M190,176 C206,154 228,158 224,178 C210,188 196,184 190,176 Z" fill="#4cc95e"/>
      <ellipse cx="82" cy="132" rx="22" ry="28" transform="rotate(-12 82 132)" fill="#7ce0ff"/>
      <ellipse cx="162" cy="134" rx="22" ry="28" transform="rotate(14 162 134)" fill="#7ce0ff"/>
      <g class="anim-bob">
        <circle cx="122" cy="102" r="38" fill="#ffe142"/>
        <path d="M116,64 L122,46 L130,64" fill="#ffe142"/>
        ${cartoonEyes(106, 138, 94, 8, 11)}
        <polygon points="110,108 134,108 122,126" fill="#ff7b24"/>
      </g>
      <path d="M38,136 C42,202 198,202 202,136 Z" fill="#b87638"/>
      <path d="M46,152 Q120,172 194,152 M58,170 Q120,188 182,170" fill="none" stroke="#7d4a1b" stroke-width="5"/>
      ${sparkle(48, 72, 10)}
    `),

    O: () => wrapSvg('Cheerful coral octopus with eight curly legs', `
      <g class="anim-wag" style="transform-origin: 120px 140px">
        <path d="M78,144 C46,148 22,128 32,108 C40,96 56,112 46,124" fill="none" stroke="#ff6d4a" stroke-width="14"/>
        <path d="M78,144 C46,148 22,128 32,108" fill="none" stroke="${INK}" stroke-width="5"/>
        <path d="M88,154 C54,178 34,198 52,210 C66,216 74,196 64,190" fill="none" stroke="#ff6d4a" stroke-width="14"/>
        <path d="M88,154 C54,178 34,198 52,210" fill="none" stroke="${INK}" stroke-width="5"/>
        <path d="M108,158 C96,192 92,214 108,216" fill="none" stroke="#ff6d4a" stroke-width="14"/>
        <path d="M108,158 C96,192 92,214 108,216" fill="none" stroke="${INK}" stroke-width="5"/>
        <path d="M132,158 C144,192 148,214 132,216" fill="none" stroke="#ff6d4a" stroke-width="14"/>
        <path d="M132,158 C144,192 148,214 132,216" fill="none" stroke="${INK}" stroke-width="5"/>
        <path d="M152,154 C186,178 206,198 188,210" fill="none" stroke="#ff6d4a" stroke-width="14"/>
        <path d="M152,154 C186,178 206,198 188,210" fill="none" stroke="${INK}" stroke-width="5"/>
        <path d="M162,144 C194,148 218,128 208,108" fill="none" stroke="#ff6d4a" stroke-width="14"/>
        <path d="M162,144 C194,148 218,128 208,108" fill="none" stroke="${INK}" stroke-width="5"/>
      </g>
      <ellipse cx="120" cy="98" rx="56" ry="54" fill="#ff7854"/>
      <circle cx="88" cy="68" r="9" fill="#ffa387" stroke="none"/>
      <circle cx="154" cy="74" r="7" fill="#ffa387" stroke="none"/>
      ${cheeks(82, 158, 114, 10, '#ff4069')}
      ${cartoonEyes(100, 140, 96, 10.5, 14.5)}
      <path d="M104,118 C110,134 130,134 136,118" fill="none" stroke-width="5"/>
      <circle class="anim-bob" cx="192" cy="54" r="10" fill="#b8f2ff" stroke-width="4"/>
    `),

    P: () => wrapSvg('Cute waddling penguin in a red scarf', `
      <ellipse cx="92" cy="208" rx="22" ry="11" fill="#ff9429"/>
      <ellipse cx="148" cy="208" rx="22" ry="11" fill="#ff9429"/>
      <ellipse class="anim-flap" style="transform-origin: 66px 124px" cx="48" cy="134" rx="16" ry="36" transform="rotate(28 48 134)" fill="#2d3548"/>
      <ellipse class="anim-flap" style="transform-origin: 174px 124px" cx="192" cy="134" rx="16" ry="36" transform="rotate(-28 192 134)" fill="#2d3548"/>
      <ellipse cx="120" cy="126" rx="60" ry="80" fill="#2d3548"/>
      <ellipse cx="120" cy="144" rx="42" ry="56" fill="#ffffff"/>
      <path d="M70,108 Q120,124 170,108 L166,126 Q120,140 74,126 Z" fill="#ff3e4d"/>
      <path d="M140,122 L156,162 L134,164 L126,126 Z" fill="#ff3e4d"/>
      ${cartoonEyes(98, 142, 78, 11, 14)}
      ${cheeks(78, 162, 92, 9)}
      <polygon points="104,88 136,88 120,108" fill="#ffa024"/>
    `),

    Q: () => wrapSvg('Smiling royal queen with golden crown', `
      <path d="M54,214 C60,158 180,158 186,214 Z" fill="#8b46e5"/>
      <path d="M74,166 Q120,192 166,166 L156,152 Q120,170 84,152 Z" fill="#ffffff"/>
      <circle cx="68" cy="122" r="24" fill="#6b3b24"/>
      <circle cx="172" cy="122" r="24" fill="#6b3b24"/>
      <circle cx="120" cy="96" r="54" fill="#6b3b24"/>
      <circle cx="120" cy="112" r="46" fill="#ffd4b5"/>
      <path d="M74,98 Q120,74 166,98 C162,68 78,68 74,98 Z" fill="#6b3b24"/>
      ${cheeks(86, 154, 124, 10)}
      ${cartoonEyes(100, 140, 106, 9.5, 13)}
      <path d="M104,130 Q120,144 136,130" fill="none" stroke-width="5"/>
      <polygon class="anim-bob" points="74,72 68,28 98,52 120,20 142,52 172,28 166,72" fill="#ffd429"/>
      <circle cx="120" cy="52" r="7" fill="#ff3366" stroke-width="3.5"/>
      <circle cx="92" cy="58" r="5" fill="#2cd4ff" stroke-width="3"/>
      <circle cx="148" cy="58" r="5" fill="#2cd4ff" stroke-width="3"/>
      ${sparkle(38, 48, 10)}
      ${sparkle(202, 48, 10)}
    `),

    R: () => wrapSvg('Zooming retro red and white space rocket', `
      <g transform="rotate(24 120 120)">
        <path class="anim-wag" style="transform-origin: 120px 182px" d="M92,178 C90,214 120,234 120,234 C120,234 150,214 148,178 Z" fill="#ff5526"/>
        <path class="anim-wag" style="transform-origin: 120px 182px" d="M104,178 C104,204 120,218 120,218 C120,218 136,204 136,178 Z" fill="#ffe03b" stroke="none"/>
        <path d="M82,138 L50,182 L88,174 Z" fill="#ff3b47"/>
        <path d="M158,138 L190,182 L152,174 Z" fill="#ff3b47"/>
        <path d="M120,22 C76,66 76,136 88,178 L152,178 C164,136 164,66 120,22 Z" fill="#ffffff"/>
        <path d="M120,22 C100,42 90,64 86,78 L154,78 C150,64 140,42 120,22 Z" fill="#ff3b47"/>
        <circle cx="120" cy="116" r="24" fill="#ffd438"/>
        <circle cx="120" cy="116" r="17" fill="#5cd6ff"/>
        <path d="M110,108 A12,12 0 0,1 124,104" fill="none" stroke="#ffffff" stroke-width="4"/>
      </g>
      ${sparkle(44, 62, 12)}
      ${sparkle(196, 156, 10)}
    `),

    S: () => wrapSvg('Beaming golden sun with rays', `
      <g class="anim-wag" style="transform-origin: 120px 120px">
        <polygon points="120,14 134,44 106,44" fill="#ff9e22"/>
        <polygon points="120,226 134,196 106,196" fill="#ff9e22"/>
        <polygon points="14,120 44,106 44,134" fill="#ff9e22"/>
        <polygon points="226,120 196,106 196,134" fill="#ff9e22"/>
        <polygon points="45,45 76,56 56,76" fill="#ffd93b"/>
        <polygon points="195,45 164,56 184,76" fill="#ffd93b"/>
        <polygon points="45,195 76,184 56,164" fill="#ffd93b"/>
        <polygon points="195,195 164,184 184,164" fill="#ffd93b"/>
      </g>
      <circle cx="120" cy="120" r="64" fill="#ffe03b"/>
      ${cheeks(80, 160, 134, 12, '#ff7d6b')}
      ${cartoonEyes(98, 142, 108, 10.5, 14.5)}
      <path d="M92,134 C100,164 140,164 148,134 Z" fill="#7a2418"/>
      <path d="M104,150 Q120,140 136,150" fill="#ff8598" stroke="none"/>
    `),

    T: () => wrapSvg('Chugging red and blue cartoon steam train', `
      <g class="anim-bob">
        <circle cx="72" cy="54" r="15" fill="#ffffff"/>
        <circle cx="98" cy="40" r="20" fill="#ffffff"/>
        <circle cx="132" cy="34" r="16" fill="#ffffff"/>
      </g>
      <polygon points="56,78 88,78 82,118 62,118" fill="#3a86ff"/>
      <rect x="128" y="68" width="76" height="96" rx="10" fill="#3a86ff"/>
      <rect x="142" y="82" width="48" height="36" rx="6" fill="#9ee8ff"/>
      <rect x="120" y="60" width="92" height="14" rx="6" fill="#ffd438"/>
      <rect x="48" y="112" width="96" height="58" rx="14" fill="#ff3e47"/>
      <polygon points="48,148 22,184 54,184" fill="#ffd438"/>
      <circle cx="72" cy="136" r="6" fill="${INK}" stroke="none"/>
      <path d="M64,150 Q78,160 90,148" fill="none" stroke-width="4.5"/>
      <circle cx="78" cy="184" r="22" fill="#ffd438"/>
      <circle cx="78" cy="184" r="9" fill="#ff3e47"/>
      <circle cx="134" cy="184" r="22" fill="#ffd438"/>
      <circle cx="134" cy="184" r="9" fill="#ff3e47"/>
      <circle cx="186" cy="184" r="22" fill="#ffd438"/>
      <circle cx="186" cy="184" r="9" fill="#ff3e47"/>
      <line x1="78" y1="184" x2="186" y2="184" stroke="#ffffff" stroke-width="7"/>
      <line x1="78" y1="184" x2="186" y2="184" stroke="${INK}" stroke-width="4"/>
    `),

    U: () => wrapSvg('Magical unicorn with rainbow mane and gold horn', `
      <path d="M84,74 C40,78 30,122 58,136" fill="#ff5c8a"/>
      <path d="M82,100 C36,112 32,154 62,164" fill="#ffe042"/>
      <path d="M84,128 C44,144 44,184 74,190" fill="#4dd8ff"/>
      <path d="M82,126 L72,212 L150,212 L144,142 Z" fill="#ffffff"/>
      <polygon points="88,68 76,34 108,54" fill="#ffffff"/>
      <polygon points="112,56 154,14 136,68" fill="#ffd83b"/>
      <line x1="122" y1="48" x2="140" y2="56" stroke-width="4"/>
      <line x1="132" y1="36" x2="146" y2="42" stroke-width="4"/>
      <ellipse cx="132" cy="104" rx="54" ry="42" transform="rotate(10 132 104)" fill="#ffffff"/>
      <ellipse cx="168" cy="114" rx="24" ry="26" fill="#ffd1e6" stroke="none"/>
      ${cartoonEyes(112, 144, 92, 9, 13)}
      <circle cx="174" cy="106" r="4" fill="${INK}" stroke="none"/>
      <path d="M148,124 Q164,136 178,122" fill="none" stroke-width="4.5"/>
      ${sparkle(192, 48, 12)}
      ${sparkle(42, 54, 9)}
    `),

    V: () => wrapSvg('Happy erupting cartoon volcano', `
      <g class="anim-bob">
        <circle cx="96" cy="52" r="22" fill="#ff9233"/>
        <circle cx="144" cy="52" r="22" fill="#ff5436"/>
        <circle cx="120" cy="38" r="26" fill="#ffd438"/>
        <path d="M74,76 C52,52 36,66 44,82" fill="none" stroke="#ff5436" stroke-width="8"/>
        <path d="M166,76 C188,52 204,66 196,82" fill="none" stroke="#ff9233" stroke-width="8"/>
      </g>
      <polygon points="84,88 156,88 210,208 30,208" fill="#8c5a3c"/>
      <path d="M84,88 L156,88 L168,118 Q152,134 140,114 Q124,138 110,114 Q94,134 74,116 Z" fill="#ff4d2e"/>
      ${cheeks(82, 158, 168, 11, '#ff7d6b')}
      ${cartoonEyes(100, 140, 154, 9.5, 13)}
      <path d="M104,176 C112,192 128,192 136,176" fill="none" stroke-width="5"/>
      ${sparkle(48, 42, 10)}
    `),

    W: () => wrapSvg('Big smiling blue whale spouting water', `
      <g class="anim-bob">
        <path d="M112,86 C110,48 76,34 64,54" fill="none" stroke="#52d6ff" stroke-width="9"/>
        <path d="M120,86 C122,44 158,32 170,52" fill="none" stroke="#52d6ff" stroke-width="9"/>
        <circle cx="116" cy="30" r="8" fill="#8be8ff" stroke-width="4"/>
      </g>
      <path class="anim-wag" style="transform-origin: 184px 154px" d="M174,158 C196,144 202,114 202,102 C216,102 224,118 212,134 C226,136 228,154 206,158 C196,168 184,172 174,168 Z" fill="#3a8ef6"/>
      <path d="M32,146 C32,84 156,78 184,148 C192,184 156,204 96,204 C50,204 32,180 32,146 Z" fill="#3a8ef6"/>
      <path d="M40,166 C76,162 134,168 172,182 C150,202 64,206 40,166 Z" fill="#fff5db"/>
      ${cartoonEyes(74, 106, 132, 9.5, 13)}
      ${cheeks(58, 122, 148, 9)}
      <path d="M68,154 Q92,172 118,156" fill="none" stroke-width="5"/>
    `),

    X: () => wrapSvg('Colorful rainbow xylophone with wooden mallets', `
      <line x1="32" y1="96" x2="208" y2="112" stroke="#b87333" stroke-width="12"/>
      <line x1="32" y1="168" x2="208" y2="152" stroke="#b87333" stroke-width="12"/>
      <rect x="38" y="68" width="28" height="122" rx="10" fill="#ff3e4d"/>
      <rect x="74" y="74" width="28" height="110" rx="10" fill="#ffa024"/>
      <rect x="110" y="80" width="28" height="98" rx="10" fill="#ffe03b"/>
      <rect x="146" y="86" width="28" height="86" rx="10" fill="#46d160"/>
      <rect x="182" y="92" width="26" height="74" rx="10" fill="#3da5ff"/>
      <circle cx="52" cy="88" r="4" fill="#ffffff" stroke="none"/>
      <circle cx="88" cy="92" r="4" fill="#ffffff" stroke="none"/>
      <circle cx="124" cy="96" r="4" fill="#ffffff" stroke="none"/>
      <circle cx="160" cy="100" r="4" fill="#ffffff" stroke="none"/>
      <circle cx="195" cy="104" r="4" fill="#ffffff" stroke="none"/>
      <g class="anim-flap" style="transform-origin: 60px 40px">
        <line x1="48" y1="26" x2="96" y2="66" stroke="#deb887" stroke-width="8"/>
        <line x1="48" y1="26" x2="96" y2="66" stroke="${INK}" stroke-width="4.5"/>
        <circle cx="102" cy="70" r="13" fill="#ff5ca8"/>
      </g>
      <g class="anim-bob">
        <line x1="196" y1="28" x2="148" y2="68" stroke="#deb887" stroke-width="8"/>
        <line x1="196" y1="28" x2="148" y2="68" stroke="${INK}" stroke-width="4.5"/>
        <circle cx="142" cy="72" r="13" fill="#9b5de5"/>
      </g>
    `),

    Y: () => wrapSvg('Spinning red star yo-yo on a looping string', `
      <path d="M188,24 C220,44 198,92 156,82 C122,74 128,112 124,132" fill="none" stroke="#ffffff" stroke-width="9"/>
      <path d="M188,24 C220,44 198,92 156,82 C122,74 128,112 124,132" fill="none" stroke="${INK}" stroke-width="4.5"/>
      <circle cx="186" cy="24" r="11" fill="none" stroke-width="5"/>
      <circle cx="126" cy="150" r="56" fill="#c92434"/>
      <g class="anim-wag" style="transform-origin: 112px 146px">
        <circle cx="112" cy="146" r="56" fill="#ff3b4e"/>
        <circle cx="112" cy="146" r="40" fill="#ffe042"/>
        <polygon points="112,114 121,134 142,136 126,150 131,171 112,160 93,171 98,150 82,136 103,134" fill="#3a86ff"/>
      </g>
      <path d="M40,126 A74,74 0 0,0 52,188" fill="none" stroke="#3ac8ff" stroke-width="6"/>
      ${sparkle(48, 78, 11)}
    `),

    Z: () => wrapSvg('Happy striped cartoon zebra', `
      <polygon points="88,42 62,56 84,74 58,92 82,110 62,132 88,148" fill="${INK}"/>
      <path d="M84,116 L72,212 L156,212 L146,136 Z" fill="#ffffff"/>
      <path d="M80,148 L120,154 L78,166 Z M76,182 L130,186 L74,198 Z" fill="${INK}" stroke="none"/>
      <ellipse cx="96" cy="50" rx="11" ry="22" transform="rotate(-16 96 50)" fill="#ffffff"/>
      <ellipse cx="132" cy="50" rx="11" ry="22" transform="rotate(14 132 50)" fill="#ffffff"/>
      <ellipse cx="132" cy="98" rx="54" ry="40" transform="rotate(12 132 98)" fill="#ffffff"/>
      <path d="M98,66 L116,88 L92,84 Z M124,62 L134,84 L144,64 Z M92,106 L122,110 L96,124 Z" fill="${INK}" stroke="none"/>
      <ellipse cx="172" cy="112" rx="24" ry="26" fill="#363945"/>
      ${cartoonEyes(118, 146, 88, 8.5, 12)}
      <circle cx="178" cy="102" r="4" fill="#ffffff" stroke="none"/>
      <path d="M156,120 Q170,132 184,118" fill="none" stroke="#ffffff" stroke-width="4.5"/>
      <line x1="146" y1="74" x2="152" y2="128" stroke="#24d2b5" stroke-width="7"/>
    `),

    // =========================================================================
    // NUMBERS 0-9: "Zero to Hero" (0) + Australian 12 Days of Christmas (1-9)
    // Every illustration displays the exact countable number of Aussie animals!
    // =========================================================================

    '0': () => wrapSvg('Zero to Hero flying cartoon superhero', `
      <!-- Billowing Red Superhero Cape -->
      <path class="anim-flap" style="transform-origin: 112px 116px" d="M82,106 C36,122 22,178 46,210 C72,202 88,214 114,202 C132,216 164,196 164,166 Z" fill="#ff3347"/>
      <!-- Flying Blue Hero Suit -->
      <ellipse cx="122" cy="144" rx="34" ry="42" transform="rotate(20 122 144)" fill="#2f88ff"/>
      <!-- Red Boots -->
      <rect x="78" y="176" width="22" height="32" rx="9" transform="rotate(22 89 192)" fill="#ff3347"/>
      <rect x="110" y="182" width="22" height="32" rx="9" transform="rotate(22 121 198)" fill="#ff3347"/>
      <!-- Golden Star Emblem on Chest -->
      <polygon points="124,122 130,136 145,138 134,148 137,162 124,154 111,162 114,148 103,138 118,136" fill="#ffe03b" stroke-width="3.5"/>
      <!-- Raised Hero Fist Zooming Upward! -->
      <g class="anim-bob">
        <path d="M148,122 L188,68" stroke="#2f88ff" stroke-width="20"/>
        <path d="M148,122 L188,68" stroke="${INK}" stroke-width="5.5"/>
        <circle cx="194" cy="60" r="15" fill="#ffd438"/>
      </g>
      <!-- Cheerful Hero Head with Mask & Hair Curl -->
      <circle cx="126" cy="76" r="36" fill="#ffd4b2"/>
      <rect x="92" y="62" width="68" height="22" rx="11" fill="#ff3347"/>
      ${cartoonEyes(112, 140, 73, 7.5, 9.5)}
      <path d="M112,92 Q126,104 140,92" fill="none" stroke-width="4.5"/>
      <path d="M110,42 C126,22 158,30 156,50" fill="#4a2e1b"/>
      ${sparkle(48, 66, 12)}
      ${sparkle(204, 126, 10)}
    `),

    '1': () => wrapSvg('One Kookaburra perched in an Australian gum tree', `
      <!-- Eucalyptus Gum Tree Branch & Leaves -->
      <path d="M18,188 Q116,172 222,194" fill="none" stroke="#8a5a36" stroke-width="16"/>
      <path d="M18,188 Q116,172 222,194" fill="none" stroke="${INK}" stroke-width="5.5"/>
      <path class="anim-flap" d="M44,182 C22,158 26,126 48,126 C64,142 60,168 44,182 Z" fill="#52b788"/>
      <path class="anim-flap" d="M188,186 C206,162 226,144 222,122 C200,124 184,154 188,186 Z" fill="#74c69d"/>
      <circle cx="64" cy="194" r="9" fill="#9c6644"/>
      <!-- 1 Laughing Kookaburra -->
      <polygon points="146,154 196,176 178,194 136,172" fill="#8d5524"/>
      <ellipse cx="122" cy="142" rx="42" ry="44" fill="#f6ead7"/>
      <path d="M118,112 C154,112 168,146 154,172 C132,168 118,144 118,112 Z" fill="#7f5539"/>
      <path d="M126,128 Q144,134 152,148" fill="none" stroke="#5cc8ff" stroke-width="6"/>
      <!-- Fluffy Crested Head & Big Laughing Beak -->
      <path d="M88,82 C82,42 146,34 158,72 C164,96 146,114 118,114 C94,114 86,98 88,82 Z" fill="#fff5e6"/>
      <path d="M116,68 C136,66 156,74 156,88" fill="none" stroke="#6f4518" stroke-width="10"/>
      <polygon points="94,78 34,68 92,94" fill="#4a4e59"/>
      <polygon points="92,94 42,102 96,108" fill="#e6ccb2"/>
      <circle cx="112" cy="78" r="8" fill="#ffffff"/>
      <circle cx="111" cy="78" r="4.5" fill="${INK}" stroke="none"/>
      <line x1="106" y1="180" x2="104" y2="192" stroke="#f4a261" stroke-width="6"/>
      <line x1="130" y1="180" x2="132" y2="192" stroke="#f4a261" stroke-width="6"/>
      ${sparkle(48, 44, 11)}
    `),

    '2': () => wrapSvg('Two Pink Galahs on a branch', `
      <path d="M22,190 Q120,178 218,190" fill="none" stroke="#7f5539" stroke-width="12"/>
      <path d="M22,190 Q120,178 218,190" fill="none" stroke="${INK}" stroke-width="5"/>
      ${miniGalah(76, 140, 1.08, 1)}
      ${miniGalah(164, 140, 1.08, -1)}
      ${sparkle(120, 54, 10)}
    `),

    '3': () => wrapSvg('Three Australian Jabirus wading in a billabong', `
      <path d="M18,198 Q70,186 120,198 T222,198 L222,220 L18,220 Z" fill="#5ce1ff"/>
      ${miniJabiru(60, 142, 0.88)}
      ${miniJabiru(124, 134, 0.94)}
      ${miniJabiru(188, 142, 0.88)}
    `),

    '4': () => wrapSvg('Four Australian Lyrebirds with lyre tails', `
      ${miniLyrebird(66, 74, 0.82)}
      ${miniLyrebird(170, 74, 0.82)}
      ${miniLyrebird(66, 172, 0.82)}
      ${miniLyrebird(170, 172, 0.82)}
    `),

    '5': () => wrapSvg('Five bounding Australian Kangaroos', `
      ${miniRoo(68, 72, 0.78)}
      ${miniRoo(168, 72, 0.78)}
      ${miniRoo(46, 168, 0.76)}
      ${miniRoo(118, 168, 0.78)}
      ${miniRoo(190, 168, 0.76)}
    `),

    '6': () => wrapSvg('Six Australian Platypuses swimming', `
      <ellipse cx="120" cy="126" rx="104" ry="92" fill="#bdf0ff" stroke-width="4.5"/>
      ${miniPlatypus(74, 72, 0.76)}
      ${miniPlatypus(168, 72, 0.76)}
      ${miniPlatypus(74, 126, 0.76)}
      ${miniPlatypus(168, 126, 0.76)}
      ${miniPlatypus(74, 180, 0.76)}
      ${miniPlatypus(168, 180, 0.76)}
    `),

    '7': () => wrapSvg('Seven Koalas climbing gum trees', `
      <!-- Three Eucalyptus Gum Trunks -->
      <line x1="56" y1="24" x2="56" y2="216" stroke="#c9ada7" stroke-width="18"/>
      <line x1="120" y1="20" x2="120" y2="216" stroke="#c9ada7" stroke-width="18"/>
      <line x1="184" y1="24" x2="184" y2="216" stroke="#c9ada7" stroke-width="18"/>
      ${miniKoala(56, 72, 0.78)}
      ${miniKoala(56, 162, 0.78)}
      ${miniKoala(120, 52, 0.78)}
      ${miniKoala(120, 122, 0.78)}
      ${miniKoala(120, 190, 0.78)}
      ${miniKoala(184, 72, 0.78)}
      ${miniKoala(184, 162, 0.78)}
    `),

    '8': () => wrapSvg('Eight Possums playing on branches', `
      <line x1="18" y1="92" x2="222" y2="92" stroke="#7f5539" stroke-width="8"/>
      <line x1="18" y1="184" x2="222" y2="184" stroke="#7f5539" stroke-width="8"/>
      ${miniPossum(42, 68, 0.74)}
      ${miniPossum(94, 68, 0.74)}
      ${miniPossum(146, 68, 0.74)}
      ${miniPossum(198, 68, 0.74)}
      ${miniPossum(42, 160, 0.74)}
      ${miniPossum(94, 160, 0.74)}
      ${miniPossum(146, 160, 0.74)}
      ${miniPossum(198, 160, 0.74)}
    `),

    '9': () => wrapSvg('Nine Wombats working in yellow hardhats', `
      ${miniWombat(52, 56, 0.78)}
      ${miniWombat(120, 56, 0.78)}
      ${miniWombat(188, 56, 0.78)}
      ${miniWombat(52, 122, 0.78)}
      ${miniWombat(120, 122, 0.78)}
      ${miniWombat(188, 122, 0.78)}
      ${miniWombat(52, 188, 0.78)}
      ${miniWombat(120, 188, 0.78)}
      ${miniWombat(188, 188, 0.78)}
    `)
  };

  // ===========================================================================
  // 3-LETTER WORDS (+ 4-LETTER BONUS JUMP) BESPOKE ILLUSTRATIONS
  // ===========================================================================
  const WORD_ART = {
    CAT: () => ART.C(),
    DOG: () => ART.D(),
    SUN: () => ART.S(),

    PIG: () => wrapSvg('Happy pink piglet with curly tail', `
      <path class="anim-wag" style="transform-origin: 178px 154px" d="M176,154 C204,146 212,120 196,118 C184,118 192,138 212,132" fill="none" stroke="#ff8fab" stroke-width="8"/>
      <ellipse cx="120" cy="158" rx="62" ry="46" fill="#ff9ebb"/>
      <rect x="78" y="188" width="22" height="24" rx="8" fill="#ff7aa2"/>
      <rect x="140" y="188" width="22" height="24" rx="8" fill="#ff7aa2"/>
      <polygon points="66,76 52,38 96,56" fill="#ff8fab"/>
      <polygon points="174,76 188,38 144,56" fill="#ff8fab"/>
      <circle cx="120" cy="102" r="54" fill="#ffb3c6"/>
      ${cheeks(74, 166, 116, 11, '#ff5d8f')}
      ${cartoonEyes(96, 144, 90, 10, 13.5)}
      <ellipse cx="120" cy="116" rx="26" ry="18" fill="#ff759f"/>
      <ellipse cx="111" cy="116" rx="5" ry="7" fill="#6b1835" stroke="none"/>
      <ellipse cx="129" cy="116" rx="5" ry="7" fill="#6b1835" stroke="none"/>
      <path d="M102,138 Q120,152 138,138" fill="none" stroke-width="5"/>
    `),

    FOX: () => wrapSvg('Clever orange fox with fluffy white-tipped tail', `
      <path class="anim-wag" style="transform-origin: 156px 184px" d="M150,188 C202,196 226,148 206,112 C190,118 184,132 176,136 C162,150 154,168 150,188 Z" fill="#ff6b2b"/>
      <path d="M206,112 C192,116 186,128 190,140 C206,142 216,128 206,112 Z" fill="#ffffff"/>
      <ellipse cx="116" cy="176" rx="44" ry="34" fill="#ff6b2b"/>
      <polygon points="98,150 134,150 116,196" fill="#ffffff" stroke="none"/>
      <polygon points="56,88 46,28 102,58" fill="#ff6b2b"/>
      <polygon points="176,88 186,28 130,58" fill="#ff6b2b"/>
      <polygon points="44,106 116,54 188,106 116,154" fill="#ff7a33"/>
      <polygon points="48,108 116,152 96,112" fill="#ffffff" stroke="none"/>
      <polygon points="184,108 116,152 136,112" fill="#ffffff" stroke="none"/>
      ${cartoonEyes(94, 138, 98, 9.5, 13)}
      <circle cx="116" cy="144" r="9" fill="${INK}"/>
      <path d="M102,128 Q116,138 130,128" fill="none" stroke-width="4.5"/>
    `),

    BAT: () => wrapSvg('Friendly purple cartoon bat', `
      <path class="anim-flap" style="transform-origin: 90px 124px" d="M90,114 C48,74 16,96 22,148 C40,134 56,144 66,158 C78,144 88,148 94,154 Z" fill="#7b52ab"/>
      <path class="anim-flap" style="transform-origin: 150px 124px" d="M150,114 C192,74 224,96 218,148 C200,134 184,144 174,158 C162,144 152,148 146,154 Z" fill="#7b52ab"/>
      <ellipse cx="120" cy="150" rx="38" ry="42" fill="#9063c4"/>
      <polygon points="84,78 70,26 110,60" fill="#9063c4"/>
      <polygon points="156,78 170,26 130,60" fill="#9063c4"/>
      <circle cx="120" cy="100" r="44" fill="#9d71d1"/>
      ${cartoonEyes(100, 140, 94, 10, 13.5)}
      <path d="M100,116 Q120,134 140,116" fill="none" stroke-width="5"/>
      <polygon points="104,120 110,132 115,122" fill="#ffffff" stroke-width="3"/>
      <polygon points="136,120 130,132 125,122" fill="#ffffff" stroke-width="3"/>
      ${sparkle(194, 52, 10)}
    `),

    BUG: () => wrapSvg('Cute smiling red spotted bug', `
      <path d="M98,62 C82,34 62,34 58,48 M142,62 C158,34 178,34 182,48" fill="none" stroke-width="6"/>
      <circle cx="58" cy="48" r="7" fill="#ffe03b"/>
      <circle cx="182" cy="48" r="7" fill="#ffe03b"/>
      <line x1="68" y1="122" x2="36" y2="112" stroke-width="6"/>
      <line x1="64" y1="152" x2="32" y2="154" stroke-width="6"/>
      <line x1="72" y1="180" x2="42" y2="194" stroke-width="6"/>
      <line x1="172" y1="122" x2="204" y2="112" stroke-width="6"/>
      <line x1="176" y1="152" x2="208" y2="154" stroke-width="6"/>
      <line x1="168" y1="180" x2="198" y2="194" stroke-width="6"/>
      <circle cx="120" cy="78" r="34" fill="#323643"/>
      <circle cx="120" cy="146" r="62" fill="#ff3b47"/>
      <line x1="120" y1="84" x2="120" y2="208" stroke-width="5.5"/>
      <circle cx="88" cy="122" r="11" fill="${INK}" stroke="none"/>
      <circle cx="84" cy="164" r="11" fill="${INK}" stroke="none"/>
      <circle cx="152" cy="122" r="11" fill="${INK}" stroke="none"/>
      <circle cx="156" cy="164" r="11" fill="${INK}" stroke="none"/>
      ${cartoonEyes(106, 134, 70, 7.5, 10)}
    `),

    HEN: () => wrapSvg('Plump happy red farm hen', `
      <path d="M98,56 C92,32 110,28 114,46 C118,26 138,28 136,48 C148,36 160,46 148,62 Z" fill="#ff2e44"/>
      <polygon points="166,124 208,94 204,132 216,144 176,164" fill="#d96b27"/>
      <ellipse cx="122" cy="148" rx="62" ry="52" fill="#e87a35"/>
      <path class="anim-flap" d="M98,136 C98,174 148,178 156,144 Z" fill="#c95b1c"/>
      <circle cx="86" cy="96" r="36" fill="#e87a35"/>
      <polygon points="52,96 28,106 54,116" fill="#ffd238"/>
      <ellipse cx="56" cy="124" rx="9" ry="13" fill="#ff2e44"/>
      <circle cx="76" cy="90" r="8" fill="#ffffff"/>
      <circle cx="74" cy="90" r="4.5" fill="${INK}" stroke="none"/>
      <line x1="104" y1="198" x2="100" y2="218" stroke="#ffa624" stroke-width="6"/>
      <line x1="140" y1="198" x2="144" y2="218" stroke="#ffa624" stroke-width="6"/>
    `),

    COW: () => wrapSvg('Friendly spotted dairy cow with golden bell', `
      <ellipse cx="120" cy="176" rx="56" ry="36" fill="#ffffff"/>
      <circle cx="92" cy="174" r="16" fill="${INK}" stroke="none"/>
      <circle cx="152" cy="182" r="14" fill="${INK}" stroke="none"/>
      <path d="M84,54 C72,30 94,24 102,48 M156,54 C168,30 146,24 138,48" fill="#ffe6a3"/>
      <ellipse class="anim-flap" cx="56" cy="76" rx="22" ry="12" transform="rotate(-18 56 76)" fill="#ffffff"/>
      <ellipse class="anim-flap" cx="184" cy="76" rx="22" ry="12" transform="rotate(18 184 76)" fill="#ffffff"/>
      <ellipse cx="120" cy="88" rx="48" ry="42" fill="#ffffff"/>
      <path d="M132,50 C158,56 168,82 148,94 C132,88 126,68 132,50 Z" fill="${INK}" stroke="none"/>
      ${cartoonEyes(98, 142, 82, 9.5, 13)}
      <ellipse cx="120" cy="118" rx="52" ry="28" fill="#ffb3c6"/>
      <circle cx="98" cy="112" r="5" fill="#7a2038" stroke="none"/>
      <circle cx="142" cy="112" r="5" fill="#7a2038" stroke="none"/>
      <path d="M100,126 Q120,140 140,126" fill="none" stroke-width="4.5"/>
      <circle class="anim-bob" cx="120" cy="154" r="13" fill="#ffd438"/>
    `),

    BEE: () => wrapSvg('Buzzing yellow and black honeybee', `
      <ellipse class="anim-flap" style="transform-origin: 110px 88px" cx="96" cy="58" rx="26" ry="38" transform="rotate(-24 96 58)" fill="#d6f5ff"/>
      <ellipse class="anim-flap" style="transform-origin: 138px 88px" cx="150" cy="58" rx="26" ry="38" transform="rotate(24 150 58)" fill="#d6f5ff"/>
      <polygon points="184,132 214,136 184,146" fill="${INK}"/>
      <ellipse cx="122" cy="134" rx="64" ry="46" fill="#ffe033"/>
      <path d="M106,90 L106,178 M136,90 L136,178 M164,98 L164,170" stroke="${INK}" stroke-width="15"/>
      <path d="M74,94 C62,68 48,68 46,78 M92,88 C86,62 72,60 68,70" fill="none" stroke-width="5"/>
      ${cartoonEyes(76, 98, 124, 8, 11)}
      ${cheeks(66, 108, 140, 7, '#ff7d6b')}
      <path d="M76,144 Q88,156 100,144" fill="none" stroke-width="4.5"/>
    `),

    OWL: () => wrapSvg('Wise cartoon owl perched on a branch', `
      <line x1="34" y1="204" x2="206" y2="204" stroke="#7f4f24" stroke-width="14"/>
      <ellipse cx="120" cy="134" rx="62" ry="68" fill="#9c6644"/>
      <ellipse cx="120" cy="154" rx="40" ry="42" fill="#f3d5b5"/>
      <path d="M102,144 Q110,152 118,144 M124,144 Q132,152 140,144 M108,164 Q118,172 128,164" fill="none" stroke="#9c6644" stroke-width="4"/>
      <polygon points="68,78 52,42 94,64" fill="#7f4f24"/>
      <polygon points="172,78 188,42 146,64" fill="#7f4f24"/>
      <circle cx="94" cy="96" r="26" fill="#fff8eb"/>
      <circle cx="146" cy="96" r="26" fill="#fff8eb"/>
      <circle cx="96" cy="96" r="12" fill="${INK}" stroke="none"/>
      <circle cx="144" cy="96" r="12" fill="${INK}" stroke="none"/>
      <circle cx="100" cy="91" r="4" fill="#ffffff" stroke="none"/>
      <circle cx="148" cy="91" r="4" fill="#ffffff" stroke="none"/>
      <polygon points="110,108 130,108 120,128" fill="#ffa624"/>
      ${sparkle(44, 58, 9)}
    `),

    BOX: () => wrapSvg('Open cardboard box with a popping golden star', `
      <polygon class="anim-bob" points="120,24 134,56 168,60 142,84 148,118 120,102 92,118 98,84 72,60 106,56" fill="#ffe03b"/>
      <polygon points="56,112 184,112 184,206 56,206" fill="#d99b56"/>
      <line x1="120" y1="112" x2="120" y2="206" stroke="#b07636" stroke-width="5"/>
      <polygon points="56,112 24,84 92,84 120,112" fill="#efb36c"/>
      <polygon points="184,112 216,84 148,84 120,112" fill="#efb36c"/>
      ${cartoonEyes(98, 142, 152, 8.5, 11.5)}
      <path d="M104,172 Q120,186 136,172" fill="none" stroke-width="4.5"/>
    `),

    CUP: () => wrapSvg('Cheerful blue polka-dot teacup with warm steam', `
      <g class="anim-bob">
        <path d="M94,68 C86,48 104,38 96,22" fill="none" stroke="#9be7ff" stroke-width="6"/>
        <path d="M132,68 C124,48 142,38 134,22" fill="none" stroke="#9be7ff" stroke-width="6"/>
      </g>
      <path d="M168,114 C208,112 208,168 164,168" fill="none" stroke="#3ac8ff" stroke-width="16"/>
      <path d="M168,114 C208,112 208,168 164,168" fill="none" stroke="${INK}" stroke-width="5.5"/>
      <ellipse cx="114" cy="204" rx="76" ry="16" fill="#ffe047"/>
      <path d="M52,92 L176,92 C172,174 154,198 114,198 C74,198 56,174 52,92 Z" fill="#48cae4"/>
      <ellipse cx="114" cy="92" rx="62" ry="14" fill="#7a4424"/>
      <circle cx="76" cy="134" r="6" fill="#ffffff" stroke="none"/>
      <circle cx="152" cy="134" r="6" fill="#ffffff" stroke="none"/>
      ${cartoonEyes(96, 132, 138, 8.5, 11.5)}
      <path d="M100,158 Q114,170 128,158" fill="none" stroke-width="4.5"/>
    `),

    HAT: () => wrapSvg('Fancy purple party top hat with gold band and star', `
      <ellipse cx="120" cy="182" rx="92" ry="26" fill="#8b46e5"/>
      <path d="M68,180 L58,64 C88,46 152,46 182,64 L172,180 Z" fill="#9d56f7"/>
      <path d="M66,150 Q120,166 174,150 L172,176 Q120,192 68,176 Z" fill="#ffd438"/>
      <rect x="104" y="148" width="32" height="30" rx="5" fill="#ff4d6d"/>
      ${sparkle(48, 78, 12)}
      ${sparkle(196, 92, 10)}
    `),

    JAM: () => wrapSvg('Sweet strawberry jam jar with berry label', `
      <rect x="64" y="76" width="112" height="132" rx="26" fill="#ff3b5c"/>
      <path d="M56,68 Q74,88 92,72 Q110,88 128,72 Q146,88 164,72 Q178,86 184,68 L176,46 L64,46 Z" fill="#52d6ff"/>
      <rect x="68" y="34" width="104" height="16" rx="8" fill="#ffffff"/>
      <rect x="82" y="114" width="76" height="62" rx="12" fill="#fff8e8"/>
      <circle cx="120" cy="146" r="18" fill="#ff2e4c"/>
      <path d="M110,128 L120,136 L130,128" fill="#46d160"/>
      ${sparkle(42, 104, 10)}
    `),

    POT: () => wrapSvg('Bubbling red cooking pot with steam', `
      <g class="anim-bob">
        <circle cx="92" cy="54" r="12" fill="#ffffff"/>
        <circle cx="120" cy="40" r="16" fill="#ffffff"/>
        <circle cx="148" cy="54" r="12" fill="#ffffff"/>
      </g>
      <path d="M48,118 L24,118 M192,118 L216,118" stroke-width="11"/>
      <path d="M52,98 L188,98 L180,194 C178,206 62,206 60,194 Z" fill="#ff4747"/>
      <path class="anim-flap" d="M48,96 C64,72 176,72 192,96 Z" fill="#d9e2ec"/>
      <circle cx="120" cy="70" r="11" fill="#ffd438"/>
      ${cartoonEyes(98, 142, 142, 8.5, 11.5)}
      <path d="M104,164 Q120,178 136,164" fill="none" stroke-width="4.5"/>
    `),

    PEN: () => wrapSvg('Clicky blue cartoon pen drawing a golden star', `
      <g transform="rotate(-32 120 116)">
        <rect x="102" y="28" width="36" height="132" rx="12" fill="#3a86ff"/>
        <rect x="112" y="14" width="16" height="18" rx="6" fill="#ffd438"/>
        <path d="M138,48 L152,54 L152,106" fill="none" stroke="#ffd438" stroke-width="7"/>
        <polygon points="102,160 138,160 120,204" fill="#ffe5b4"/>
        <polygon points="114,188 126,188 120,204" fill="${INK}"/>
      </g>
      <path d="M62,196 Q98,176 132,198 T202,190" fill="none" stroke="#ff3b5c" stroke-width="7"/>
      ${sparkle(188, 152, 12)}
    `),

    BED: () => wrapSvg('Cozy wooden bed with fluffy pillow and starry blanket', `
      <rect x="30" y="76" width="22" height="128" rx="8" fill="#b87638"/>
      <rect x="190" y="114" width="20" height="90" rx="8" fill="#b87638"/>
      <ellipse cx="78" cy="128" rx="28" ry="16" fill="#ffffff"/>
      <rect x="44" y="138" width="152" height="44" rx="10" fill="#ffffff"/>
      <path d="M92,134 L196,134 C202,134 202,188 192,188 L92,188 Z" fill="#5c9eff"/>
      <circle cx="132" cy="160" r="8" fill="#ffe03b" stroke="none"/>
      <circle cx="168" cy="162" r="8" fill="#ffe03b" stroke="none"/>
      ${sparkle(128, 68, 11)}
      ${sparkle(168, 52, 9)}
    `),

    BUS: () => wrapSvg('Sunny yellow cartoon school bus', `
      <rect x="26" y="74" width="188" height="106" rx="22" fill="#ffd429"/>
      <rect x="44" y="92" width="38" height="36" rx="7" fill="#9ee8ff"/>
      <rect x="94" y="92" width="38" height="36" rx="7" fill="#9ee8ff"/>
      <rect x="144" y="92" width="52" height="42" rx="8" fill="#9ee8ff"/>
      <line x1="28" y1="148" x2="212" y2="148" stroke="${INK}" stroke-width="6"/>
      <circle cx="206" cy="162" r="8" fill="#ff4747"/>
      <circle cx="72" cy="182" r="24" fill="#3a3d47"/>
      <circle cx="72" cy="182" r="10" fill="#ffffff"/>
      <circle cx="168" cy="182" r="24" fill="#3a3d47"/>
      <circle cx="168" cy="182" r="10" fill="#ffffff"/>
    `),

    VAN: () => wrapSvg('Mint-teal retro adventure van', `
      <rect x="64" y="60" width="96" height="14" rx="6" fill="#ffa624"/>
      <path d="M32,124 L54,74 L196,74 C208,74 214,84 214,96 L214,178 L32,178 Z" fill="#4ad6b8"/>
      <path d="M34,132 L212,132 L212,178 L34,178 Z" fill="#ffffff"/>
      <polygon points="62,88 118,88 118,124 46,124" fill="#9ee8ff"/>
      <rect x="132" y="88" width="58" height="36" rx="6" fill="#9ee8ff"/>
      <circle cx="76" cy="180" r="22" fill="#3a3d47"/>
      <circle cx="76" cy="180" r="9" fill="#ffe03b"/>
      <circle cx="170" cy="180" r="22" fill="#3a3d47"/>
      <circle cx="170" cy="180" r="9" fill="#ffe03b"/>
    `),

    PIE: () => wrapSvg('Warm golden lattice-crust berry pie', `
      <g class="anim-bob">
        <path d="M96,68 C88,48 106,36 98,20" fill="none" stroke="#ff9aa8" stroke-width="5.5"/>
        <path d="M144,68 C136,48 154,36 146,20" fill="none" stroke="#ff9aa8" stroke-width="5.5"/>
      </g>
      <polygon points="44,138 196,138 176,196 64,196" fill="#6bc8ff"/>
      <ellipse cx="120" cy="126" rx="78" ry="34" fill="#f2a649"/>
      <ellipse cx="120" cy="124" rx="60" ry="22" fill="#c9184a"/>
      <path d="M74,116 L156,136 M94,106 L168,126 M84,136 L166,114" stroke="#f7be6d" stroke-width="8"/>
      <path d="M38,128 Q54,112 70,128 T102,128 T134,128 T166,128 T202,128" fill="none" stroke="#f7be6d" stroke-width="10"/>
      <path d="M38,128 Q54,112 70,128 T102,128 T134,128 T166,128 T202,128" fill="none" stroke="${INK}" stroke-width="4.5"/>
    `),

    LOG: () => wrapSvg('Woodland brown log with green leaf and mushroom', `
      <path d="M48,108 L186,96 L186,178 L48,190 Z" fill="#8c5832"/>
      <ellipse cx="48" cy="149" rx="22" ry="41" fill="#e6be8a"/>
      <ellipse cx="48" cy="149" rx="11" ry="22" fill="none" stroke="#b07d48" stroke-width="3.5"/>
      <path d="M92,134 L154,128 M108,158 L168,152" stroke="#5e3719" stroke-width="5"/>
      <!-- Little red toadstool & sprout on top! -->
      <rect x="136" y="72" width="14" height="26" fill="#fff5e6"/>
      <path d="M118,76 C118,46 168,46 168,76 Z" fill="#ff3b47"/>
      <circle cx="134" cy="62" r="4" fill="#ffffff" stroke="none"/>
      <circle cx="152" cy="64" r="4" fill="#ffffff" stroke="none"/>
      <path class="anim-flap" d="M88,102 C76,74 98,60 108,82 Z" fill="#4ad664"/>
    `),

    MUD: () => wrapSvg('Splashing brown mud puddle', `
      <ellipse cx="120" cy="168" rx="94" ry="34" fill="#7f4f24"/>
      <ellipse cx="114" cy="164" rx="66" ry="18" fill="#9c6644" stroke="none"/>
      <g class="anim-bob">
        <path d="M68,142 C48,104 34,112 46,134 Z" fill="#7f4f24"/>
        <path d="M120,132 C112,84 128,84 126,132 Z" fill="#7f4f24"/>
        <path d="M172,142 C192,104 206,112 194,134 Z" fill="#7f4f24"/>
        <circle cx="84" cy="86" r="9" fill="#9c6644"/>
        <circle cx="158" cy="88" r="8" fill="#9c6644"/>
      </g>
      ${cartoonEyes(98, 142, 162, 8, 10.5)}
      <path d="M106,178 Q120,190 134,178" fill="none" stroke="#ffffff" stroke-width="4.5"/>
    `),

    SKY: () => wrapSvg('Bright blue sky with fluffy smiling cloud and rainbow', `
      <circle cx="120" cy="120" r="92" fill="#5ce1ff"/>
      <path d="M52,142 A68,68 0 0,1 188,142" fill="none" stroke="#ff4d6d" stroke-width="12"/>
      <path d="M64,142 A56,56 0 0,1 176,142" fill="none" stroke="#ffe03b" stroke-width="12"/>
      <path d="M76,142 A44,44 0 0,1 164,142" fill="none" stroke="#46d160" stroke-width="12"/>
      <g class="anim-bob">
        <path d="M58,172 C42,172 38,146 56,142 C62,120 92,118 102,134 C116,116 148,120 152,142 C170,144 168,172 150,172 Z" fill="#ffffff"/>
        ${cartoonEyes(90, 120, 148, 6.5, 9)}
        <path d="M96,160 Q105,168 114,160" fill="none" stroke-width="4"/>
      </g>
      ${sparkle(178, 72, 10)}
    `),

    SEA: () => wrapSvg('Rolling turquoise ocean waves with little sailboat', `
      <g class="anim-bob">
        <polygon points="122,36 122,108 168,100" fill="#ff4757"/>
        <polygon points="116,48 116,108 82,102" fill="#ffe03b"/>
        <path d="M74,112 L174,112 L158,140 L90,140 Z" fill="#ffffff"/>
      </g>
      <path d="M22,154 Q54,128 86,154 T150,154 T218,154 L218,208 L22,208 Z" fill="#00b4d8"/>
      <path d="M22,182 Q58,160 94,182 T166,182 T218,182 L218,214 L22,214 Z" fill="#48cae4"/>
    `),

    ICE: () => wrapSvg('Sparkling glossy blue ice cubes', `
      <g transform="rotate(-8 88 142)">
        <rect x="38" y="96" width="88" height="88" rx="18" fill="#90e0ef"/>
        <path d="M54,116 L76,108 M54,132 L66,126" stroke="#ffffff" stroke-width="6"/>
      </g>
      <g class="anim-bob" transform="rotate(10 156 116)">
        <rect x="112" y="68" width="88" height="88" rx="18" fill="#caf0f8"/>
        <circle cx="142" cy="108" r="5" fill="${INK}" stroke="none"/>
        <circle cx="170" cy="108" r="5" fill="${INK}" stroke="none"/>
        <path d="M146,124 Q156,134 166,124" fill="none" stroke-width="4.5"/>
      </g>
      ${sparkle(56, 58, 12, '#ffffff')}
      ${sparkle(196, 178, 10, '#ffffff')}
    `),

    RUN: () => wrapSvg('Speedy winged red running sneaker with zoom lines', `
      <line x1="22" y1="112" x2="68" y2="112" stroke="#3ac8ff" stroke-width="7"/>
      <line x1="16" y1="142" x2="56" y2="142" stroke="#ffe03b" stroke-width="7"/>
      <g class="anim-bob" transform="rotate(-12 132 140)">
        <!-- Golden Wing on Sneaker! -->
        <path class="anim-flap" d="M98,108 C64,78 56,52 88,62 C78,44 108,42 118,68 C126,54 144,64 132,92 Z" fill="#ffe03b"/>
        <path d="M68,106 L124,106 L156,144 L204,152 C216,156 216,182 198,184 L62,184 Z" fill="#ff3b4e"/>
        <rect x="60" y="172" width="148" height="18" rx="8" fill="#ffffff"/>
        <path d="M96,144 L132,162 L152,138" fill="none" stroke="#ffffff" stroke-width="8"/>
      </g>
    `),

    HOP: () => wrapSvg('Bouncy green frog hopping high over a lilypad', `
      <ellipse cx="120" cy="204" rx="74" ry="14" fill="#52b788"/>
      <g class="anim-bob">
        <path d="M78,144 C44,154 42,182 68,182 M162,144 C196,154 198,182 172,182" fill="none" stroke="#4ad664" stroke-width="14"/>
        <path d="M78,144 C44,154 42,182 68,182 M162,144 C196,154 198,182 172,182" fill="none" stroke="${INK}" stroke-width="5"/>
        <ellipse cx="120" cy="122" rx="54" ry="42" fill="#57cc69"/>
        <ellipse cx="120" cy="134" rx="34" ry="22" fill="#d8f3dc" stroke="none"/>
        <circle cx="92" cy="76" r="20" fill="#57cc69"/>
        <circle cx="148" cy="76" r="20" fill="#57cc69"/>
        ${cartoonEyes(92, 148, 76, 10, 12)}
        <path d="M92,116 Q120,138 148,116" fill="none" stroke-width="5"/>
      </g>
    `),

    JOG: () => wrapSvg('Happy jogger character with sporty headband', `
      <line x1="28" y1="196" x2="212" y2="196" stroke="#90be6d" stroke-width="10"/>
      <g class="anim-bob">
        <path d="M98,156 L76,192 M138,156 L162,186" stroke="#3a86ff" stroke-width="14"/>
        <path d="M98,156 L76,192 M138,156 L162,186" stroke="${INK}" stroke-width="5"/>
        <ellipse cx="72" cy="194" rx="16" ry="8" fill="#ff3b4e"/>
        <ellipse cx="168" cy="188" rx="16" ry="8" fill="#ff3b4e"/>
        <rect x="92" y="114" width="52" height="48" rx="16" fill="#ff9f1c"/>
        <circle cx="120" cy="76" r="36" fill="#ffd4b2"/>
        <rect x="84" y="54" width="72" height="14" rx="7" fill="#ff3b4e"/>
        ${cartoonEyes(108, 134, 78, 7, 9.5)}
        <path d="M108,94 Q120,104 132,94" fill="none" stroke-width="4.5"/>
      </g>
    `),

    JUMP: () => wrapSvg('Joyful star-jumping character leaping over a rainbow', `
      <path d="M36,204 A86,86 0 0,1 204,204" fill="none" stroke="#ff5ca8" stroke-width="12"/>
      <path d="M50,204 A72,72 0 0,1 190,204" fill="none" stroke="#ffe03b" stroke-width="12"/>
      <g class="anim-bob">
        <!-- Star-jump arms & legs spread wide in mid-air! -->
        <line x1="94" y1="112" x2="54" y2="76" stroke="#a65cff" stroke-width="15"/>
        <line x1="146" y1="112" x2="186" y2="76" stroke="#a65cff" stroke-width="15"/>
        <line x1="104" y1="146" x2="72" y2="184" stroke="#3a86ff" stroke-width="15"/>
        <line x1="136" y1="146" x2="168" y2="184" stroke="#3a86ff" stroke-width="15"/>
        <rect x="94" y="102" width="52" height="50" rx="18" fill="#a65cff"/>
        <circle cx="120" cy="68" r="34" fill="#ffd4b2"/>
        ${cartoonEyes(106, 134, 64, 7.5, 10)}
        <path d="M104,80 C110,96 130,96 136,80 Z" fill="#7a1c28"/>
      </g>
      ${sparkle(42, 46, 11)}
      ${sparkle(198, 46, 11)}
    `),

    SIT: () => wrapSvg('Polite golden puppy sitting on a cozy blue cushion', `
      <ellipse cx="120" cy="196" rx="84" ry="22" fill="#48cae4"/>
      <path class="anim-wag" style="transform-origin: 158px 176px" d="M156,178 C186,172 198,148 186,138" fill="none" stroke="#e59c4c" stroke-width="12"/>
      <path class="anim-wag" style="transform-origin: 158px 176px" d="M156,178 C186,172 198,148 186,138" fill="none" stroke="${INK}" stroke-width="5"/>
      <ellipse cx="120" cy="156" rx="38" ry="40" fill="#e59c4c"/>
      <ellipse cx="120" cy="162" rx="22" ry="26" fill="#fae1b8" stroke="none"/>
      <ellipse cx="98" cy="192" rx="16" ry="10" fill="#fae1b8"/>
      <ellipse cx="142" cy="192" rx="16" ry="10" fill="#fae1b8"/>
      <ellipse cx="78" cy="88" rx="14" ry="26" transform="rotate(14 78 88)" fill="#6e3f1d"/>
      <ellipse cx="162" cy="88" rx="14" ry="26" transform="rotate(-14 162 88)" fill="#6e3f1d"/>
      <circle cx="120" cy="88" r="40" fill="#e59c4c"/>
      ${cartoonEyes(104, 136, 80, 8.5, 12)}
      <circle cx="120" cy="96" r="8" fill="${INK}"/>
      <path d="M106,108 Q120,120 134,108" fill="none" stroke-width="4.5"/>
    `),

    TAP: () => wrapSvg('Cartoon gloved hand tapping a glowing colorful button', `
      <ellipse cx="120" cy="184" rx="74" ry="24" fill="#3a86ff"/>
      <ellipse cx="120" cy="172" rx="54" ry="18" fill="#ff3b5c"/>
      <path d="M42,154 A82,32 0 0,1 72,136 M198,154 A82,32 0 0,0 168,136" fill="none" stroke="#ffe03b" stroke-width="6"/>
      <g class="anim-bob">
        <rect x="98" y="34" width="44" height="58" rx="18" fill="#ffffff"/>
        <rect x="110" y="76" width="22" height="68" rx="11" fill="#ffffff"/>
      </g>
      ${sparkle(56, 108, 10)}
      ${sparkle(184, 108, 10)}
    `),

    ZAP: () => wrapSvg('Giant crackling golden comic lightning bolt', `
      <circle cx="120" cy="120" r="78" fill="#7b2cbf"/>
      <polygon class="anim-bob" points="138,18 62,126 116,126 94,222 182,106 126,106" fill="#ffe033"/>
      ${sparkle(42, 66, 12, '#5ce1ff')}
      ${sparkle(198, 166, 12, '#5ce1ff')}
      ${sparkle(192, 54, 9, '#ffe033')}
    `)
  };

  window.getHermesIllustration = function (key) {
    const k = String(key).toUpperCase();
    if (WORD_ART[k]) return WORD_ART[k]();
    if (ART[k]) return ART[k]();
    return ART.D();
  };
})();
