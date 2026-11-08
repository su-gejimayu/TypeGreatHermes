/**
 * Bespoke 1930s comic-inked cartoon SVG illustrations for Type Great Hermes.
 * Every character uses bold #181818 ink lines, cel highlights, and animated sub-groups.
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
      <!-- Leaping Golden Puppy inspired directly by concept art! -->
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

    F: () => wrapSvg('Yummy happy food plate with burger and pizza', `
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
      <!-- Happy Cartoon Burger Front & Center! -->
      <!-- Bottom Bun -->
      <path d="M46,166 C46,188 158,188 158,166 Z" fill="#f2a649"/>
      <!-- Patty & Melted Cheese -->
      <rect x="40" y="146" width="124" height="22" rx="11" fill="#7a3e22"/>
      <polygon points="48,146 156,146 136,164 114,148 90,164 66,148" fill="#ffd426" stroke-width="4"/>
      <!-- Ruffled Green Lettuce & Red Tomato -->
      <path d="M38,142 Q52,130 66,142 T94,142 T122,142 T150,142 T166,142" fill="none" stroke="#45cc5b" stroke-width="11"/>
      <path d="M38,142 Q52,130 66,142 T94,142 T122,142 T150,142 T166,142" fill="none" stroke="${INK}" stroke-width="4.5"/>
      <!-- Top Sesame Bun with Happy Face! -->
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
      <!-- Long Spotted Neck -->
      <path d="M96,118 L86,216 L146,216 L136,118 Z" fill="#ffd84d"/>
      <circle cx="110" cy="156" r="11" fill="#c96f28" stroke="none"/>
      <circle cx="128" cy="186" r="13" fill="#c96f28" stroke="none"/>
      <circle cx="98" cy="198" r="9" fill="#c96f28" stroke="none"/>
      <!-- Cute Ossicones (Giraffe Horns) -->
      <line x1="98" y1="58" x2="88" y2="28" stroke-width="7"/>
      <line x1="142" y1="58" x2="152" y2="28" stroke-width="7"/>
      <circle cx="86" cy="26" r="10" fill="#c96f28"/>
      <circle cx="154" cy="26" r="10" fill="#c96f28"/>
      <!-- Ears -->
      <ellipse class="anim-flap" cx="62" cy="76" rx="20" ry="11" transform="rotate(-20 62 76)" fill="#ffd84d"/>
      <ellipse class="anim-flap" cx="178" cy="76" rx="20" ry="11" transform="rotate(20 178 76)" fill="#ffd84d"/>
      <!-- Head & Wide Tan Muzzle -->
      <ellipse cx="120" cy="86" rx="46" ry="38" fill="#ffd84d"/>
      <ellipse cx="120" cy="112" rx="48" ry="28" fill="#f7b76d"/>
      ${cartoonEyes(100, 140, 76, 9.5, 13)}
      <circle cx="102" cy="104" r="4.5" fill="${INK}" stroke="none"/>
      <circle cx="138" cy="104" r="4.5" fill="${INK}" stroke="none"/>
      <path d="M98,118 C108,136 132,136 142,118" fill="none" stroke-width="5"/>
    `),

    H: () => wrapSvg('Happy purple hippo splashing in water', `
      <!-- Blue Water Splash Waves at Bottom -->
      <path class="anim-bob" d="M24,194 Q52,174 78,194 T132,194 T186,194 T218,194 L218,218 L24,218 Z" fill="#4dd2ff"/>
      <!-- Chubby Hippo Body -->
      <ellipse cx="120" cy="172" rx="68" ry="42" fill="#b48cf2"/>
      <!-- Little Rounded Hippo Ears -->
      <circle class="anim-flap" cx="76" cy="54" r="16" fill="#b48cf2"/>
      <circle cx="76" cy="54" r="8" fill="#ff9ebb" stroke="none"/>
      <circle class="anim-flap" cx="164" cy="54" r="16" fill="#b48cf2"/>
      <circle cx="164" cy="54" r="8" fill="#ff9ebb" stroke="none"/>
      <!-- Upper Head -->
      <ellipse cx="120" cy="84" rx="50" ry="40" fill="#c39ef7"/>
      ${cartoonEyes(100, 140, 74, 10, 14)}
      <!-- Giant Wide Hippo Snout! -->
      <ellipse cx="120" cy="126" rx="68" ry="40" fill="#d4b8ff"/>
      ${cheeks(68, 172, 124, 11, '#ff94b8')}
      <!-- Big Hippo Nostrils -->
      <ellipse cx="92" cy="110" rx="8" ry="11" transform="rotate(-15 92 110)" fill="#6d47a8"/>
      <ellipse cx="148" cy="110" rx="8" ry="11" transform="rotate(15 148 110)" fill="#6d47a8"/>
      <!-- Huge Goofy Hippo Smile with Two Square White Teeth! -->
      <path d="M74,132 C80,168 160,168 166,132 Z" fill="#6b1835"/>
      <path d="M94,154 C108,144 132,144 146,154 C134,164 106,164 94,154 Z" fill="#ff82a9" stroke="none"/>
      <rect x="92" y="132" width="16" height="15" rx="3" fill="#ffffff" stroke-width="4"/>
      <rect x="132" y="132" width="16" height="15" rx="3" fill="#ffffff" stroke-width="4"/>
      <!-- Splash Droplets -->
      <path class="anim-twinkle" d="M40,148 C30,132 46,122 48,140 Z" fill="#6ce0ff" stroke-width="4"/>
      <path class="anim-twinkle" d="M200,148 C210,132 194,122 192,140 Z" fill="#6ce0ff" stroke-width="4"/>
    `),

    I: () => wrapSvg('Triple scoop rainbow ice cream cone', `
      <!-- Waffle Cone -->
      <polygon points="78,132 162,132 120,220" fill="#f0a854"/>
      <path d="M90,152 L146,152 M100,174 L138,174 M96,134 L130,196 M144,134 L110,196" stroke="#b56c22" stroke-width="3.5"/>
      <!-- Top Scoop (Mint) -->
      <circle cx="120" cy="68" r="34" fill="#76e8b5"/>
      <!-- Left Scoop (Vanilla Gold) -->
      <circle cx="88" cy="108" r="34" fill="#ffe46b"/>
      <!-- Right Scoop (Strawberry Pink) -->
      <circle cx="152" cy="108" r="34" fill="#ff85b3"/>
      <!-- Scalloped Frosting Drip Base -->
      <path d="M62,126 Q76,144 92,128 Q108,144 124,128 Q140,144 156,128 Q170,142 178,126" fill="#ff85b3"/>
      <!-- Cherry on Top -->
      <path d="M122,34 C128,16 146,14 154,18" fill="none" stroke-width="5"/>
      <circle class="anim-bob" cx="120" cy="36" r="14" fill="#ff2e4c"/>
      <circle cx="115" cy="31" r="3.5" fill="#ffffff" stroke="none"/>
      <!-- Happy Face on Center -->
      ${cartoonEyes(104, 136, 98, 8.5, 12)}
      <path d="M108,116 Q120,128 132,116" fill="none" stroke-width="4.5"/>
      ${sparkle(44, 68, 10)}
    `),

    J: () => wrapSvg('Wiggling pink jellyfish', `
      <!-- Wavy Tentacles -->
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
      <!-- Bell Dome -->
      <path d="M48,124 C48,50 192,50 192,124 Q174,142 156,126 Q138,142 120,126 Q102,142 84,126 Q66,142 48,124 Z" fill="#ff8ad4"/>
      <path d="M72,82 C82,66 102,60 116,62" fill="none" stroke="#ffffff" stroke-width="7" opacity="0.8"/>
      ${cheeks(82, 158, 108, 10, '#ff4fa3')}
      ${cartoonEyes(100, 140, 94, 9.5, 13)}
      <path d="M106,112 Q120,124 134,112" fill="none" stroke-width="4.5"/>
      <!-- Bubbles -->
      <circle class="anim-bob" cx="42" cy="76" r="10" fill="#bbf0ff" stroke-width="4"/>
      <circle class="anim-bob" cx="198" cy="64" r="13" fill="#bbf0ff" stroke-width="4"/>
    `),

    K: () => wrapSvg('Bouncy kangaroo with baby joey in pouch', `
      <!-- Strong Kangaroo Tail & Big Bouncy Feet -->
      <path class="anim-wag" style="transform-origin: 155px 175px" d="M150,174 C194,182 216,150 208,132 C198,126 184,154 152,156 Z" fill="#d98c46"/>
      <ellipse cx="90" cy="208" rx="30" ry="11" fill="#c77832"/>
      <ellipse cx="144" cy="208" rx="30" ry="11" fill="#d98c46"/>
      <!-- Body & Belly Pouch -->
      <ellipse cx="122" cy="154" rx="46" ry="50" fill="#e59a54"/>
      <path d="M90,148 C90,192 154,192 154,148 Z" fill="#f9d8a7"/>
      <!-- Tiny Cute Joey Peeking Out of Pouch! -->
      <g class="anim-bob">
        <ellipse cx="122" cy="142" rx="18" ry="16" fill="#d98c46"/>
        <ellipse cx="110" cy="124" rx="5" ry="11" transform="rotate(-18 110 124)" fill="#d98c46"/>
        <ellipse cx="134" cy="124" rx="5" ry="11" transform="rotate(18 134 124)" fill="#d98c46"/>
        <circle cx="116" cy="140" r="3" fill="${INK}" stroke="none"/>
        <circle cx="128" cy="140" r="3" fill="${INK}" stroke="none"/>
      </g>
      <!-- Tall Kangaroo Ears & Head -->
      <ellipse cx="94" cy="48" rx="12" ry="28" transform="rotate(-16 94 48)" fill="#e59a54"/>
      <ellipse cx="146" cy="48" rx="12" ry="28" transform="rotate(16 146 48)" fill="#e59a54"/>
      <ellipse cx="120" cy="84" rx="38" ry="32" fill="#e59a54"/>
      ${cartoonEyes(104, 136, 78, 8.5, 12)}
      <ellipse cx="120" cy="94" rx="8" ry="6" fill="${INK}"/>
      <path d="M108,104 Q120,114 132,104" fill="none" stroke-width="4.5"/>
    `),

    L: () => wrapSvg('Friendly roaring golden lion', `
      <!-- Tufted Tail -->
      <path class="anim-wag" style="transform-origin: 168px 186px" d="M166,188 C198,186 212,158 202,138" fill="none" stroke="#f5b335" stroke-width="9"/>
      <path class="anim-wag" style="transform-origin: 168px 186px" d="M202,138 C194,124 212,116 216,132 C214,144 204,144 202,138 Z" fill="#d95f18"/>
      <!-- Lion Body -->
      <ellipse cx="120" cy="186" rx="46" ry="30" fill="#f7be45"/>
      <!-- Big Fluffy Scalloped Orange Mane! -->
      <path d="M120,28 Q144,24 156,42 Q180,44 184,68 Q204,84 196,108 Q206,132 186,148 Q182,170 158,170 Q142,186 120,178 Q98,186 82,170 Q58,170 54,148 Q34,132 44,108 Q36,84 56,68 Q60,44 84,42 Q96,24 120,28 Z" fill="#e86a1c"/>
      <!-- Round Lion Ears & Face -->
      <circle cx="78" cy="64" r="16" fill="#f7be45"/>
      <circle cx="162" cy="64" r="16" fill="#f7be45"/>
      <circle cx="120" cy="106" r="46" fill="#ffd059"/>
      ${cartoonEyes(100, 140, 94, 9.5, 13.5)}
      <polygon points="110,112 130,112 120,123" fill="#8a3318"/>
      <!-- Big Happy Roar Mouth -->
      <path d="M96,128 C102,154 138,154 144,128 Z" fill="#6b1824"/>
      <path d="M106,144 Q120,134 134,144" fill="#ff7d95" stroke="none"/>
      <path d="M72,118 L48,114 M72,126 L48,128 M168,118 L192,114 M168,126 L192,128" stroke-width="4"/>
    `),

    M: () => wrapSvg('Playful brown monkey holding a banana', `
      <!-- Curly Monkey Tail -->
      <path class="anim-wag" style="transform-origin: 160px 185px" d="M158,186 C204,190 218,136 192,118 C176,110 172,132 188,136" fill="none" stroke="#8c512b" stroke-width="11"/>
      <path class="anim-wag" style="transform-origin: 160px 185px" d="M158,186 C204,190 218,136 192,118 C176,110 172,132 188,136" fill="none" stroke="${INK}" stroke-width="5"/>
      <!-- Body -->
      <ellipse cx="118" cy="178" rx="42" ry="34" fill="#8c512b"/>
      <ellipse cx="118" cy="180" rx="24" ry="22" fill="#f2c794" stroke="none"/>
      <!-- Big Round Monkey Ears -->
      <circle cx="52" cy="102" r="24" fill="#8c512b"/>
      <circle cx="52" cy="102" r="14" fill="#f2c794" stroke="none"/>
      <circle cx="184" cy="102" r="24" fill="#8c512b"/>
      <circle cx="184" cy="102" r="14" fill="#f2c794" stroke="none"/>
      <!-- Head & Tan Face Mask -->
      <circle cx="118" cy="100" r="52" fill="#8c512b"/>
      <path d="M84,88 C84,64 118,70 118,84 C118,70 152,64 152,88 C162,102 160,138 118,142 C76,138 74,102 84,88 Z" fill="#f5cea0" stroke="none"/>
      ${cartoonEyes(100, 136, 92, 9, 13)}
      <ellipse cx="118" cy="120" rx="36" ry="24" fill="#f7d6ad"/>
      <circle cx="112" cy="110" r="3.5" fill="${INK}" stroke="none"/>
      <circle cx="124" cy="110" r="3.5" fill="${INK}" stroke="none"/>
      <path d="M96,120 C104,140 132,140 140,120" fill="none" stroke-width="5"/>
      <!-- Bright Yellow Banana in Hand! -->
      <g class="anim-bob">
        <path d="M36,144 C26,182 64,208 96,184 C70,184 52,168 52,142 Z" fill="#ffe033"/>
      </g>
    `),

    N: () => wrapSvg('Cozy bird nest with chirping baby chick', `
      <!-- Leafy Green Branch -->
      <path d="M18,186 Q120,198 222,174" fill="none" stroke="#6e4123" stroke-width="12"/>
      <path d="M190,176 C206,154 228,158 224,178 C210,188 196,184 190,176 Z" fill="#4cc95e"/>
      <!-- Blue Eggs & Cute Chirping Yellow Chick inside Nest! -->
      <ellipse cx="82" cy="132" rx="22" ry="28" transform="rotate(-12 82 132)" fill="#7ce0ff"/>
      <ellipse cx="162" cy="134" rx="22" ry="28" transform="rotate(14 162 134)" fill="#7ce0ff"/>
      <!-- Baby Chick Center -->
      <g class="anim-bob">
        <circle cx="122" cy="102" r="38" fill="#ffe142"/>
        <path d="M116,64 L122,46 L130,64" fill="#ffe142"/>
        ${cartoonEyes(106, 138, 94, 8, 11)}
        <polygon points="110,108 134,108 122,126" fill="#ff7b24"/>
      </g>
      <!-- Woven Twig Nest Bowl -->
      <path d="M38,136 C42,202 198,202 202,136 Z" fill="#b87638"/>
      <path d="M46,152 Q120,172 194,152 M58,170 Q120,188 182,170" fill="none" stroke="#7d4a1b" stroke-width="5"/>
      ${sparkle(48, 72, 10)}
    `),

    O: () => wrapSvg('Cheerful coral octopus with eight curly legs', `
      <!-- 8 Curly Tentacles -->
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
      <!-- Big Round Octopus Head -->
      <ellipse cx="120" cy="98" rx="56" ry="54" fill="#ff7854"/>
      <circle cx="88" cy="68" r="9" fill="#ffa387" stroke="none"/>
      <circle cx="154" cy="74" r="7" fill="#ffa387" stroke="none"/>
      ${cheeks(82, 158, 114, 10, '#ff4069')}
      ${cartoonEyes(100, 140, 96, 10.5, 14.5)}
      <path d="M104,118 C110,134 130,134 136,118" fill="none" stroke-width="5"/>
      <circle class="anim-bob" cx="192" cy="54" r="10" fill="#b8f2ff" stroke-width="4"/>
    `),

    P: () => wrapSvg('Cute waddling penguin in a red scarf', `
      <!-- Orange Webbed Feet -->
      <ellipse cx="92" cy="208" rx="22" ry="11" fill="#ff9429"/>
      <ellipse cx="148" cy="208" rx="22" ry="11" fill="#ff9429"/>
      <!-- Flapping Flippers -->
      <ellipse class="anim-flap" style="transform-origin: 66px 124px" cx="48" cy="134" rx="16" ry="36" transform="rotate(28 48 134)" fill="#2d3548"/>
      <ellipse class="anim-flap" style="transform-origin: 174px 124px" cx="192" cy="134" rx="16" ry="36" transform="rotate(-28 192 134)" fill="#2d3548"/>
      <!-- Tuxedo Body & White Belly -->
      <ellipse cx="120" cy="126" rx="60" ry="80" fill="#2d3548"/>
      <ellipse cx="120" cy="144" rx="42" ry="56" fill="#ffffff"/>
      <!-- Cozy Red Scarf -->
      <path d="M70,108 Q120,124 170,108 L166,126 Q120,140 74,126 Z" fill="#ff3e4d"/>
      <path d="M140,122 L156,162 L134,164 L126,126 Z" fill="#ff3e4d"/>
      <!-- White Eye Mask & Beak -->
      ${cartoonEyes(98, 142, 78, 11, 14)}
      ${cheeks(78, 162, 92, 9)}
      <polygon points="104,88 136,88 120,108" fill="#ffa024"/>
    `),

    Q: () => wrapSvg('Smiling royal queen with golden crown', `
      <!-- Royal Purple Cape & Collar -->
      <path d="M54,214 C60,158 180,158 186,214 Z" fill="#8b46e5"/>
      <path d="M74,166 Q120,192 166,166 L156,152 Q120,170 84,152 Z" fill="#ffffff"/>
      <!-- Waving Hair Curls -->
      <circle cx="68" cy="122" r="24" fill="#6b3b24"/>
      <circle cx="172" cy="122" r="24" fill="#6b3b24"/>
      <circle cx="120" cy="96" r="54" fill="#6b3b24"/>
      <!-- Queen Face -->
      <circle cx="120" cy="112" r="46" fill="#ffd4b5"/>
      <path d="M74,98 Q120,74 166,98 C162,68 78,68 74,98 Z" fill="#6b3b24"/>
      ${cheeks(86, 154, 124, 10)}
      ${cartoonEyes(100, 140, 106, 9.5, 13)}
      <path d="M104,130 Q120,144 136,130" fill="none" stroke-width="5"/>
      <!-- Sparkling Golden Crown with Jewels! -->
      <polygon class="anim-bob" points="74,72 68,28 98,52 120,20 142,52 172,28 166,72" fill="#ffd429"/>
      <circle cx="120" cy="52" r="7" fill="#ff3366" stroke-width="3.5"/>
      <circle cx="92" cy="58" r="5" fill="#2cd4ff" stroke-width="3"/>
      <circle cx="148" cy="58" r="5" fill="#2cd4ff" stroke-width="3"/>
      ${sparkle(38, 48, 10)}
      ${sparkle(202, 48, 10)}
    `),

    R: () => wrapSvg('Zooming retro red and white space rocket', `
      <g transform="rotate(24 120 120)">
        <!-- Rocket Exhaust Flames -->
        <path class="anim-wag" style="transform-origin: 120px 182px" d="M92,178 C90,214 120,234 120,234 C120,234 150,214 148,178 Z" fill="#ff5526"/>
        <path class="anim-wag" style="transform-origin: 120px 182px" d="M104,178 C104,204 120,218 120,218 C120,218 136,204 136,178 Z" fill="#ffe03b" stroke="none"/>
        <!-- Side Fins -->
        <path d="M82,138 L50,182 L88,174 Z" fill="#ff3b47"/>
        <path d="M158,138 L190,182 L152,174 Z" fill="#ff3b47"/>
        <!-- Rocket Fuselage -->
        <path d="M120,22 C76,66 76,136 88,178 L152,178 C164,136 164,66 120,22 Z" fill="#ffffff"/>
        <!-- Red Nose Cone -->
        <path d="M120,22 C100,42 90,64 86,78 L154,78 C150,64 140,42 120,22 Z" fill="#ff3b47"/>
        <!-- Porthole Window -->
        <circle cx="120" cy="116" r="24" fill="#ffd438"/>
        <circle cx="120" cy="116" r="17" fill="#5cd6ff"/>
        <path d="M110,108 A12,12 0 0,1 124,104" fill="none" stroke="#ffffff" stroke-width="4"/>
      </g>
      ${sparkle(44, 62, 12)}
      ${sparkle(196, 156, 10)}
    `),

    S: () => wrapSvg('Beaming golden sun with rays', `
      <!-- Rotating Sunbeams -->
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
      <!-- Bright Golden Sun Face -->
      <circle cx="120" cy="120" r="64" fill="#ffe03b"/>
      ${cheeks(80, 160, 134, 12, '#ff7d6b')}
      ${cartoonEyes(98, 142, 108, 10.5, 14.5)}
      <path d="M92,134 C100,164 140,164 148,134 Z" fill="#7a2418"/>
      <path d="M104,150 Q120,140 136,150" fill="#ff8598" stroke="none"/>
    `),

    T: () => wrapSvg('Chugging red and blue cartoon steam train', `
      <!-- Fluffy Steam Puffs -->
      <g class="anim-bob">
        <circle cx="72" cy="54" r="15" fill="#ffffff"/>
        <circle cx="98" cy="40" r="20" fill="#ffffff"/>
        <circle cx="132" cy="34" r="16" fill="#ffffff"/>
      </g>
      <!-- Smokestack & Cab -->
      <polygon points="56,78 88,78 82,118 62,118" fill="#3a86ff"/>
      <rect x="128" y="68" width="76" height="96" rx="10" fill="#3a86ff"/>
      <rect x="142" y="82" width="48" height="36" rx="6" fill="#9ee8ff"/>
      <rect x="120" y="60" width="92" height="14" rx="6" fill="#ffd438"/>
      <!-- Red Boiler Engine -->
      <rect x="48" y="112" width="96" height="58" rx="14" fill="#ff3e47"/>
      <!-- Yellow Cowcatcher -->
      <polygon points="48,148 22,184 54,184" fill="#ffd438"/>
      <!-- Smiling Face on Boiler Front -->
      <circle cx="72" cy="136" r="6" fill="${INK}" stroke="none"/>
      <path d="M64,150 Q78,160 90,148" fill="none" stroke-width="4.5"/>
      <!-- Big Train Wheels & Connecting Rod -->
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
      <!-- Flowing Rainbow Mane -->
      <path d="M84,74 C40,78 30,122 58,136" fill="#ff5c8a"/>
      <path d="M82,100 C36,112 32,154 62,164" fill="#ffe042"/>
      <path d="M84,128 C44,144 44,184 74,190" fill="#4dd8ff"/>
      <!-- Neck & Head -->
      <path d="M82,126 L72,212 L150,212 L144,142 Z" fill="#ffffff"/>
      <!-- Ear & Golden Spiral Horn -->
      <polygon points="88,68 76,34 108,54" fill="#ffffff"/>
      <polygon points="112,56 154,14 136,68" fill="#ffd83b"/>
      <line x1="122" y1="48" x2="140" y2="56" stroke-width="4"/>
      <line x1="132" y1="36" x2="146" y2="42" stroke-width="4"/>
      <!-- Snout & Head -->
      <ellipse cx="132" cy="104" rx="54" ry="42" transform="rotate(10 132 104)" fill="#ffffff"/>
      <ellipse cx="168" cy="114" rx="24" ry="26" fill="#ffd1e6" stroke="none"/>
      ${cartoonEyes(112, 144, 92, 9, 13)}
      <circle cx="174" cy="106" r="4" fill="${INK}" stroke="none"/>
      <path d="M148,124 Q164,136 178,122" fill="none" stroke-width="4.5"/>
      ${sparkle(192, 48, 12)}
      ${sparkle(42, 54, 9)}
    `),

    V: () => wrapSvg('Happy erupting cartoon volcano', `
      <!-- Lava Burst & Smoke Plume -->
      <g class="anim-bob">
        <circle cx="96" cy="52" r="22" fill="#ff9233"/>
        <circle cx="144" cy="52" r="22" fill="#ff5436"/>
        <circle cx="120" cy="38" r="26" fill="#ffd438"/>
        <path d="M74,76 C52,52 36,66 44,82" fill="none" stroke="#ff5436" stroke-width="8"/>
        <path d="M166,76 C188,52 204,66 196,82" fill="none" stroke="#ff9233" stroke-width="8"/>
      </g>
      <!-- Mountain Cone -->
      <polygon points="84,88 156,88 210,208 30,208" fill="#8c5a3c"/>
      <!-- Melted Bright Lava Rim -->
      <path d="M84,88 L156,88 L168,118 Q152,134 140,114 Q124,138 110,114 Q94,134 74,116 Z" fill="#ff4d2e"/>
      <!-- Happy Volcano Face! -->
      ${cheeks(82, 158, 168, 11, '#ff7d6b')}
      ${cartoonEyes(100, 140, 154, 9.5, 13)}
      <path d="M104,176 C112,192 128,192 136,176" fill="none" stroke-width="5"/>
      ${sparkle(48, 42, 10)}
    `),

    W: () => wrapSvg('Big smiling blue whale spouting water', `
      <!-- Tall Blowhole Water Fountain -->
      <g class="anim-bob">
        <path d="M112,86 C110,48 76,34 64,54" fill="none" stroke="#52d6ff" stroke-width="9"/>
        <path d="M120,86 C122,44 158,32 170,52" fill="none" stroke="#52d6ff" stroke-width="9"/>
        <circle cx="116" cy="30" r="8" fill="#8be8ff" stroke-width="4"/>
      </g>
      <!-- Tail Fluke Raised -->
      <path class="anim-wag" style="transform-origin: 184px 154px" d="M174,158 C196,144 202,114 202,102 C216,102 224,118 212,134 C226,136 228,154 206,158 C196,168 184,172 174,168 Z" fill="#3a8ef6"/>
      <!-- Big Round Whale Body -->
      <path d="M32,146 C32,84 156,78 184,148 C192,184 156,204 96,204 C50,204 32,180 32,146 Z" fill="#3a8ef6"/>
      <!-- Striped Cream Belly -->
      <path d="M40,166 C76,162 134,168 172,182 C150,202 64,206 40,166 Z" fill="#fff5db"/>
      ${cartoonEyes(74, 106, 132, 9.5, 13)}
      ${cheeks(58, 122, 148, 9)}
      <path d="M68,154 Q92,172 118,156" fill="none" stroke-width="5"/>
    `),

    X: () => wrapSvg('Colorful rainbow xylophone with wooden mallets', `
      <!-- Frame Rails -->
      <line x1="32" y1="96" x2="208" y2="112" stroke="#b87333" stroke-width="12"/>
      <line x1="32" y1="168" x2="208" y2="152" stroke="#b87333" stroke-width="12"/>
      <!-- 5 Rainbow Tone Bars -->
      <rect x="38" y="68" width="28" height="122" rx="10" fill="#ff3e4d"/>
      <rect x="74" y="74" width="28" height="110" rx="10" fill="#ffa024"/>
      <rect x="110" y="80" width="28" height="98" rx="10" fill="#ffe03b"/>
      <rect x="146" y="86" width="28" height="86" rx="10" fill="#46d160"/>
      <rect x="182" y="92" width="26" height="74" rx="10" fill="#3da5ff"/>
      <!-- Rivet Dots -->
      <circle cx="52" cy="88" r="4" fill="#ffffff" stroke="none"/>
      <circle cx="88" cy="92" r="4" fill="#ffffff" stroke="none"/>
      <circle cx="124" cy="96" r="4" fill="#ffffff" stroke="none"/>
      <circle cx="160" cy="100" r="4" fill="#ffffff" stroke="none"/>
      <circle cx="195" cy="104" r="4" fill="#ffffff" stroke="none"/>
      <!-- Bouncing Mallets -->
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
      <!-- Looping White String -->
      <path d="M188,24 C220,44 198,92 156,82 C122,74 128,112 124,132" fill="none" stroke="#ffffff" stroke-width="9"/>
      <path d="M188,24 C220,44 198,92 156,82 C122,74 128,112 124,132" fill="none" stroke="${INK}" stroke-width="4.5"/>
      <circle cx="186" cy="24" r="11" fill="none" stroke-width="5"/>
      <!-- Yo-Yo Back Disc -->
      <circle cx="126" cy="150" r="56" fill="#c92434"/>
      <!-- Yo-Yo Front Disc -->
      <g class="anim-wag" style="transform-origin: 112px 146px">
        <circle cx="112" cy="146" r="56" fill="#ff3b4e"/>
        <circle cx="112" cy="146" r="40" fill="#ffe042"/>
        <!-- Classic Star Emblem -->
        <polygon points="112,114 121,134 142,136 126,150 131,171 112,160 93,171 98,150 82,136 103,134" fill="#3a86ff"/>
      </g>
      <!-- Comic Spin Swooshes -->
      <path d="M40,126 A74,74 0 0,0 52,188" fill="none" stroke="#3ac8ff" stroke-width="6"/>
      ${sparkle(48, 78, 11)}
    `),

    Z: () => wrapSvg('Happy striped cartoon zebra', `
      <!-- Spiky Striped Mane -->
      <polygon points="88,42 62,56 84,74 58,92 82,110 62,132 88,148" fill="${INK}"/>
      <!-- Neck & Body -->
      <path d="M84,116 L72,212 L156,212 L146,136 Z" fill="#ffffff"/>
      <path d="M80,148 L120,154 L78,166 Z M76,182 L130,186 L74,198 Z" fill="${INK}" stroke="none"/>
      <!-- Ears & Head -->
      <ellipse cx="96" cy="50" rx="11" ry="22" transform="rotate(-16 96 50)" fill="#ffffff"/>
      <ellipse cx="132" cy="50" rx="11" ry="22" transform="rotate(14 132 50)" fill="#ffffff"/>
      <ellipse cx="132" cy="98" rx="54" ry="40" transform="rotate(12 132 98)" fill="#ffffff"/>
      <!-- Bold Zebra Stripes -->
      <path d="M98,66 L116,88 L92,84 Z M124,62 L134,84 L144,64 Z M92,106 L122,110 L96,124 Z" fill="${INK}" stroke="none"/>
      <!-- Dark Zebra Muzzle -->
      <ellipse cx="172" cy="112" rx="24" ry="26" fill="#363945"/>
      ${cartoonEyes(118, 146, 88, 8.5, 12)}
      <circle cx="178" cy="102" r="4" fill="#ffffff" stroke="none"/>
      <path d="M156,120 Q170,132 184,118" fill="none" stroke="#ffffff" stroke-width="4.5"/>
      <!-- Turquoise Bridle Band -->
      <line x1="146" y1="74" x2="152" y2="128" stroke="#24d2b5" stroke-width="7"/>
    `),

    // Numbers 0-9 for optional 123 mode
    '1': () => wrapSvg('One giant golden smiling star', `
      <polygon class="anim-bob" points="120,22 148,82 214,90 165,136 178,202 120,170 62,202 75,136 26,90 92,82" fill="#ffe03b"/>
      ${cheeks(88, 152, 134, 10, '#ff7d6b')}
      ${cartoonEyes(102, 138, 114, 9, 13)}
      <path d="M104,136 Q120,152 136,136" fill="none" stroke-width="5"/>
    `),
    '2': () => wrapSvg('Two bright red smiling cherries', `
      <path d="M78,136 C86,74 118,46 138,34 C138,54 156,88 164,138" fill="none" stroke="#3db854" stroke-width="8"/>
      <path d="M138,34 C162,24 188,36 184,54 C166,62 146,50 138,34 Z" fill="#4ad664"/>
      <circle cx="76" cy="158" r="42" fill="#ff334b"/>
      <circle cx="164" cy="162" r="42" fill="#ff334b"/>
      ${cartoonEyes(64, 88, 152, 6.5, 9)}
      ${cartoonEyes(152, 176, 156, 6.5, 9)}
      <path d="M66,170 Q76,180 86,170 M154,174 Q164,184 174,174" fill="none" stroke-width="4"/>
    `),
    '3': () => wrapSvg('Three colorful party balloons', `
      <path d="M68,144 Q82,184 120,214 M120,132 L120,214 M172,144 Q158,184 120,214" fill="none" stroke-width="4"/>
      <ellipse class="anim-bob" cx="68" cy="96" rx="36" ry="46" fill="#ff4d6d"/>
      <ellipse class="anim-bob" cx="172" cy="96" rx="36" ry="46" fill="#3ac8ff"/>
      <ellipse class="anim-bob" cx="120" cy="80" rx="38" ry="48" fill="#ffe03b"/>
      ${cartoonEyes(108, 132, 76, 7, 10)}
      <path d="M110,94 Q120,104 130,94" fill="none" stroke-width="4"/>
    `),
    '4': () => wrapSvg('Four sweet colorful cupcakes', `
      <g transform="translate(-42,-36) scale(0.75)"><polygon points="88,136 152,136 142,190 98,190" fill="#6bd4ff"/><circle cx="120" cy="116" r="34" fill="#ff85b3"/><circle cx="120" cy="82" r="10" fill="#ff2e4c"/></g>
      <g transform="translate(76,-36) scale(0.75)"><polygon points="88,136 152,136 142,190 98,190" fill="#ffd84d"/><circle cx="120" cy="116" r="34" fill="#7be3a8"/><circle cx="120" cy="82" r="10" fill="#ff2e4c"/></g>
      <g transform="translate(-42,58) scale(0.75)"><polygon points="88,136 152,136 142,190 98,190" fill="#ff9e5e"/><circle cx="120" cy="116" r="34" fill="#fff099"/><circle cx="120" cy="82" r="10" fill="#ff2e4c"/></g>
      <g transform="translate(76,58) scale(0.75)"><polygon points="88,136 152,136 142,190 98,190" fill="#b98cf7"/><circle cx="120" cy="116" r="34" fill="#80dfff"/><circle cx="120" cy="82" r="10" fill="#ff2e4c"/></g>
    `),
    '5': () => wrapSvg('Cartoon glove giving a big high five', `
      <path class="anim-wag" style="transform-origin: 120px 190px" d="M84,196 L72,148 C48,144 38,118 58,108 L78,120 L66,64 C64,42 88,38 94,60 L104,104 L110,44 C112,22 136,24 136,46 L134,104 L152,52 C160,32 182,42 174,64 L156,112 L180,88 C196,74 210,94 194,112 L158,156 L152,196 Z" fill="#ffffff"/>
      <rect x="76" y="188" width="84" height="24" rx="12" fill="#ffd83b"/>
      ${sparkle(42, 62, 11)}
      ${sparkle(198, 48, 11)}
    `),
    '6': () => wrapSvg('Cute red ladybug with six black spots', `
      <path d="M98,62 C84,36 68,36 64,46 M142,62 C156,36 172,36 176,46" fill="none" stroke-width="6"/>
      <circle cx="120" cy="74" r="32" fill="#2d313d"/>
      <circle cx="120" cy="142" r="64" fill="#ff3b47"/>
      <line x1="120" y1="78" x2="120" y2="206" stroke-width="5.5"/>
      <circle cx="88" cy="112" r="10" fill="${INK}" stroke="none"/>
      <circle cx="78" cy="144" r="10" fill="${INK}" stroke="none"/>
      <circle cx="94" cy="176" r="10" fill="${INK}" stroke="none"/>
      <circle cx="152" cy="112" r="10" fill="${INK}" stroke="none"/>
      <circle cx="162" cy="144" r="10" fill="${INK}" stroke="none"/>
      <circle cx="146" cy="176" r="10" fill="${INK}" stroke="none"/>
      ${cartoonEyes(108, 132, 66, 6.5, 9)}
    `),
    '7': () => wrapSvg('Bright seven-color rainbow between fluffy clouds', `
      <path d="M36,164 A84,84 0 0,1 204,164" fill="none" stroke="#ff3b47" stroke-width="14"/>
      <path d="M48,164 A72,72 0 0,1 192,164" fill="none" stroke="#ff9626" stroke-width="14"/>
      <path d="M60,164 A60,60 0 0,1 180,164" fill="none" stroke="#ffe03b" stroke-width="14"/>
      <path d="M72,164 A48,48 0 0,1 168,164" fill="none" stroke="#46d160" stroke-width="14"/>
      <path d="M84,164 A36,36 0 0,1 156,164" fill="none" stroke="#3ac8ff" stroke-width="14"/>
      <path d="M96,164 A24,24 0 0,1 144,164" fill="none" stroke="#6c63ff" stroke-width="12"/>
      <circle cx="56" cy="168" r="26" fill="#ffffff"/>
      <circle cx="84" cy="174" r="22" fill="#ffffff"/>
      <circle cx="184" cy="168" r="26" fill="#ffffff"/>
      <circle cx="156" cy="174" r="22" fill="#ffffff"/>
    `),
    '8': () => ART.O(),
    '9': () => wrapSvg('Retro gumball machine with nine colorful gumballs', `
      <polygon points="82,146 158,146 172,214 68,214" fill="#ff3b4e"/>
      <rect x="108" y="168" width="24" height="26" rx="4" fill="#d4dde8"/>
      <circle cx="120" cy="96" r="60" fill="#dff6ff"/>
      <circle cx="94" cy="122" r="12" fill="#ff3b4e"/><circle cx="120" cy="126" r="12" fill="#ffe03b"/><circle cx="146" cy="122" r="12" fill="#46d160"/>
      <circle cx="88" cy="98" r="12" fill="#3ac8ff"/><circle cx="114" cy="100" r="12" fill="#b46eff"/><circle cx="140" cy="98" r="12" fill="#ff8c2e"/>
      <circle cx="98" cy="74" r="12" fill="#ff6ec7"/><circle cx="124" cy="74" r="12" fill="#5ce1b8"/><circle cx="148" cy="76" r="12" fill="#ffd438"/>
      <rect x="98" y="28" width="44" height="14" rx="6" fill="#ff3b4e"/>
    `),
    '0': () => wrapSvg('Giant pink sprinkle donut shaped like zero', `
      <circle cx="120" cy="120" r="78" fill="#f2ad5f"/>
      <path d="M52,106 C52,58 188,58 188,108 Q194,138 174,148 Q158,134 148,158 Q132,174 116,158 Q96,176 78,154 Q52,158 52,106 Z" fill="#ff70b5"/>
      <circle cx="120" cy="120" r="28" fill="#fffaf0"/>
      <line x1="82" y1="74" x2="94" y2="80" stroke="#ffe03b" stroke-width="6"/>
      <line x1="142" y1="72" x2="154" y2="82" stroke="#3ac8ff" stroke-width="6"/>
      <line x1="72" y1="128" x2="84" y2="136" stroke="#46d160" stroke-width="6"/>
      <line x1="154" y1="126" x2="166" y2="118" stroke="#ffffff" stroke-width="6"/>
    `)
  };

  window.getHermesIllustration = function (key) {
    const fn = ART[String(key).toUpperCase()];
    return fn ? fn() : ART.D();
  };
})();
