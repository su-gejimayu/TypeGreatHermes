/**
 * Curated vocabulary for Type Great Hermes:
 * - Letters A-Z (including B=Baby, D=Dog, F=Food, H=Hippo)
 * - Numbers 0-9 ("Zero to Hero" for 0 + Australian 12 Days of Christmas for 1-9)
 * - 3-Letter Words (+ 4-letter bonus JUMP) across Animals, Everyday Objects & Food,
 *   Nature & World, and Fun Action Verbs.
 */
window.HERMES_WORDS = {
  letters: [
    { key: 'A', word: 'Apple', phrase: 'A is for Apple!', callouts: ['CRUNCH!', 'YUM!'], sfx: 'crunch', accentHue: 8 },
    { key: 'B', word: 'Baby', phrase: 'B is for Baby!', callouts: ['GIGGLE!', 'GA-GA!'], sfx: 'giggle', accentHue: 200 },
    { key: 'C', word: 'Cat', phrase: 'C is for Cat!', callouts: ['MEOW!', 'PURR!'], sfx: 'meow', accentHue: 28 },
    { key: 'D', word: 'Dog', phrase: 'D is for Dog!', callouts: ['WOOF!', 'BARK!'], sfx: 'bark', accentHue: 36 },
    { key: 'E', word: 'Elephant', phrase: 'E is for Elephant!', callouts: ['TOOT!', 'STOMP!'], sfx: 'trumpet', accentHue: 210 },
    { key: 'F', word: 'Food', phrase: 'F is for Food!', callouts: ['YUMMY!', 'MUNCH!'], sfx: 'crunch', accentHue: 42 },
    { key: 'G', word: 'Giraffe', phrase: 'G is for Giraffe!', callouts: ['STRETCH!', 'CHOMP!'], sfx: 'boing', accentHue: 46 },
    { key: 'H', word: 'Hippo', phrase: 'H is for Hippo!', callouts: ['SPLASH!', 'CHOMP!'], sfx: 'splash', accentHue: 275 },
    { key: 'I', word: 'Ice Cream', phrase: 'I is for Ice Cream!', callouts: ['SWEET!', 'COOL!'], sfx: 'sparkle', accentHue: 330 },
    { key: 'J', word: 'Jellyfish', phrase: 'J is for Jellyfish!', callouts: ['WIGGLE!', 'BLOOP!'], sfx: 'bubble', accentHue: 315 },
    { key: 'K', word: 'Kangaroo', phrase: 'K is for Kangaroo!', callouts: ['BOING!', 'HOP!'], sfx: 'boing', accentHue: 30 },
    { key: 'L', word: 'Lion', phrase: 'L is for Lion!', callouts: ['ROAR!', 'GRRR!'], sfx: 'roar', accentHue: 38 },
    { key: 'M', word: 'Monkey', phrase: 'M is for Monkey!', callouts: ['OO-OO!', 'AH-AH!'], sfx: 'monkey', accentHue: 25 },
    { key: 'N', word: 'Nest', phrase: 'N is for Nest!', callouts: ['CHIRP!', 'TWEET!'], sfx: 'chirp', accentHue: 195 },
    { key: 'O', word: 'Octopus', phrase: 'O is for Octopus!', callouts: ['SPLASH!', 'WIGGLE!'], sfx: 'bubble', accentHue: 16 },
    { key: 'P', word: 'Penguin', phrase: 'P is for Penguin!', callouts: ['WADDLE!', 'PEEP!'], sfx: 'chirp', accentHue: 205 },
    { key: 'Q', word: 'Queen', phrase: 'Q is for Queen!', callouts: ['HOORAY!', 'CROWN!'], sfx: 'sparkle', accentHue: 290 },
    { key: 'R', word: 'Rocket', phrase: 'R is for Rocket!', callouts: ['ZOOM!', 'BLAST!'], sfx: 'rocket', accentHue: 12 },
    { key: 'S', word: 'Sun', phrase: 'S is for Sun!', callouts: ['SHINE!', 'BRIGHT!'], sfx: 'sparkle', accentHue: 50 },
    { key: 'T', word: 'Train', phrase: 'T is for Train!', callouts: ['CHOO!', 'CHUGGA!'], sfx: 'train', accentHue: 4 },
    { key: 'U', word: 'Unicorn', phrase: 'U is for Unicorn!', callouts: ['MAGIC!', 'SPARKLE!'], sfx: 'sparkle', accentHue: 305 },
    { key: 'V', word: 'Volcano', phrase: 'V is for Volcano!', callouts: ['BOOM!', 'RUMBLE!'], sfx: 'roar', accentHue: 14 },
    { key: 'W', word: 'Whale', phrase: 'W is for Whale!', callouts: ['SPOUT!', 'SPLASH!'], sfx: 'splash', accentHue: 208 },
    { key: 'X', word: 'Xylophone', phrase: 'X is for Xylophone!', callouts: ['TING!', 'PLINK!'], sfx: 'xylophone', accentHue: 140 },
    { key: 'Y', word: 'Yo-Yo', phrase: 'Y is for Yo-Yo!', callouts: ['ZIP!', 'SPIN!'], sfx: 'boing', accentHue: 350 },
    { key: 'Z', word: 'Zebra', phrase: 'Z is for Zebra!', callouts: ['GALLOP!', 'ZOOM!'], sfx: 'boing', accentHue: 175 }
  ],

  // 0 = Zero to Hero, 1-9 = Australian 12 Days of Christmas!
  numbers: [
    {
      key: '1',
      count: 1,
      word: 'Kookaburra in a Gum Tree',
      phrase: '1 Kookaburra in a Gum Tree!',
      spoken: '1! A Kookaburra in a Gum Tree!',
      callouts: ['KOO-KOO!', 'ONE!'],
      sfx: 'kookaburra',
      accentHue: 145
    },
    {
      key: '2',
      count: 2,
      word: 'Two Pink Galahs',
      phrase: '2 Pink Galahs!',
      spoken: '2! Two Pink Galahs!',
      callouts: ['SQUAWK!', 'TWO!'],
      sfx: 'chirp',
      accentHue: 335
    },
    {
      key: '3',
      count: 3,
      word: 'Three Jabirus',
      phrase: '3 Jabirus!',
      spoken: '3! Three Jabirus!',
      callouts: ['FLAP!', 'THREE!'],
      sfx: 'splash',
      accentHue: 195
    },
    {
      key: '4',
      count: 4,
      word: 'Four Lyrebirds',
      phrase: '4 Lyrebirds!',
      spoken: '4! Four Lyrebirds!',
      callouts: ['SING!', 'FOUR!'],
      sfx: 'chirp',
      accentHue: 34
    },
    {
      key: '5',
      count: 5,
      word: 'Five Kangaroos',
      phrase: '5 Kangaroos!',
      spoken: '5! Five Kangaroos!',
      callouts: ['BOING!', 'FIVE!'],
      sfx: 'boing',
      accentHue: 28
    },
    {
      key: '6',
      count: 6,
      word: 'Six Platypuses',
      phrase: '6 Platypuses!',
      spoken: '6! Six Platypuses!',
      callouts: ['SPLISH!', 'SIX!'],
      sfx: 'splash',
      accentHue: 202
    },
    {
      key: '7',
      count: 7,
      word: 'Seven Koalas Climbing',
      phrase: '7 Koalas Climbing!',
      spoken: '7! Seven Koalas Climbing!',
      callouts: ['CLIMB!', 'SEVEN!'],
      sfx: 'giggle',
      accentHue: 155
    },
    {
      key: '8',
      count: 8,
      word: 'Eight Possums Playing',
      phrase: '8 Possums Playing!',
      spoken: '8! Eight Possums Playing!',
      callouts: ['PLAY!', 'EIGHT!'],
      sfx: 'boing',
      accentHue: 280
    },
    {
      key: '9',
      count: 9,
      word: 'Nine Wombats Working',
      phrase: '9 Wombats Working!',
      spoken: '9! Nine Wombats Working!',
      callouts: ['DIG-DIG!', 'NINE!'],
      sfx: 'crunch',
      accentHue: 42
    },
    {
      key: '0',
      count: 0,
      word: 'Zero to Hero',
      phrase: 'Zero to Hero!',
      spoken: '0! Zero to Hero!',
      callouts: ['HERO!', 'POW!'],
      sfx: 'rocket',
      accentHue: 4
    }
  ],

  // 3-Letter Words (+ 4-letter bonus JUMP)
  words: [
    // Animals & Creatures
    { key: 'CAT', category: 'Animals & Creatures', word: 'Cat', phrase: 'C-A-T spells Cat!', spoken: 'C, A, T! Cat!', callouts: ['MEOW!', 'PURR!'], sfx: 'meow', accentHue: 28 },
    { key: 'DOG', category: 'Animals & Creatures', word: 'Dog', phrase: 'D-O-G spells Dog!', spoken: 'D, O, G! Dog!', callouts: ['WOOF!', 'BARK!'], sfx: 'bark', accentHue: 36 },
    { key: 'PIG', category: 'Animals & Creatures', word: 'Pig', phrase: 'P-I-G spells Pig!', spoken: 'P, I, G! Pig!', callouts: ['OINK!', 'SNORT!'], sfx: 'oink', accentHue: 340 },
    { key: 'FOX', category: 'Animals & Creatures', word: 'Fox', phrase: 'F-O-X spells Fox!', spoken: 'F, O, X! Fox!', callouts: ['YIP!', 'CLEVER!'], sfx: 'bark', accentHue: 20 },
    { key: 'BAT', category: 'Animals & Creatures', word: 'Bat', phrase: 'B-A-T spells Bat!', spoken: 'B, A, T! Bat!', callouts: ['FLAP!', 'SWOOP!'], sfx: 'chirp', accentHue: 270 },
    { key: 'BUG', category: 'Animals & Creatures', word: 'Bug', phrase: 'B-U-G spells Bug!', spoken: 'B, U, G! Bug!', callouts: ['SCUTTLE!', 'CUTE!'], sfx: 'chirp', accentHue: 6 },
    { key: 'HEN', category: 'Animals & Creatures', word: 'Hen', phrase: 'H-E-N spells Hen!', spoken: 'H, E, N! Hen!', callouts: ['CLUCK!', 'BOK-BOK!'], sfx: 'chirp', accentHue: 14 },
    { key: 'COW', category: 'Animals & Creatures', word: 'Cow', phrase: 'C-O-W spells Cow!', spoken: 'C, O, W! Cow!', callouts: ['MOO!', 'MOO-OO!'], sfx: 'moo', accentHue: 135 },
    { key: 'BEE', category: 'Animals & Creatures', word: 'Bee', phrase: 'B-E-E spells Bee!', spoken: 'B, E, E! Bee!', callouts: ['BZZZ!', 'HONEY!'], sfx: 'bee', accentHue: 48 },
    { key: 'OWL', category: 'Animals & Creatures', word: 'Owl', phrase: 'O-W-L spells Owl!', spoken: 'O, W, L! Owl!', callouts: ['HOOT!', 'WHOO!'], sfx: 'hoot', accentHue: 32 },

    // Everyday Objects & Food
    { key: 'BOX', category: 'Everyday Objects & Food', word: 'Box', phrase: 'B-O-X spells Box!', spoken: 'B, O, X! Box!', callouts: ['POP!', 'OPEN!'], sfx: 'boing', accentHue: 34 },
    { key: 'CUP', category: 'Everyday Objects & Food', word: 'Cup', phrase: 'C-U-P spells Cup!', spoken: 'C, U, P! Cup!', callouts: ['SIP!', 'CHEERS!'], sfx: 'bubble', accentHue: 192 },
    { key: 'HAT', category: 'Everyday Objects & Food', word: 'Hat', phrase: 'H-A-T spells Hat!', spoken: 'H, A, T! Hat!', callouts: ['TA-DA!', 'FANCY!'], sfx: 'sparkle', accentHue: 285 },
    { key: 'JAM', category: 'Everyday Objects & Food', word: 'Jam', phrase: 'J-A-M spells Jam!', spoken: 'J, A, M! Jam!', callouts: ['SWEET!', 'BERRY!'], sfx: 'crunch', accentHue: 350 },
    { key: 'POT', category: 'Everyday Objects & Food', word: 'Pot', phrase: 'P-O-T spells Pot!', spoken: 'P, O, T! Pot!', callouts: ['BUBBLE!', 'COOK!'], sfx: 'bubble', accentHue: 18 },
    { key: 'PEN', category: 'Everyday Objects & Food', word: 'Pen', phrase: 'P-E-N spells Pen!', spoken: 'P, E, N! Pen!', callouts: ['DRAW!', 'CLICK!'], sfx: 'xylophone', accentHue: 215 },
    { key: 'BED', category: 'Everyday Objects & Food', word: 'Bed', phrase: 'B-E-D spells Bed!', spoken: 'B, E, D! Bed!', callouts: ['COZY!', 'SLEEPY!'], sfx: 'sparkle', accentHue: 230 },
    { key: 'BUS', category: 'Everyday Objects & Food', word: 'Bus', phrase: 'B-U-S spells Bus!', spoken: 'B, U, S! Bus!', callouts: ['BEEP!', 'WHEELS!'], sfx: 'train', accentHue: 46 },
    { key: 'VAN', category: 'Everyday Objects & Food', word: 'Van', phrase: 'V-A-N spells Van!', spoken: 'V, A, N! Van!', callouts: ['VROOM!', 'HONK!'], sfx: 'train', accentHue: 175 },
    { key: 'PIE', category: 'Everyday Objects & Food', word: 'Pie', phrase: 'P-I-E spells Pie!', spoken: 'P, I, E! Pie!', callouts: ['YUMMY!', 'FRESH!'], sfx: 'crunch', accentHue: 30 },

    // Nature & World
    { key: 'SUN', category: 'Nature & World', word: 'Sun', phrase: 'S-U-N spells Sun!', spoken: 'S, U, N! Sun!', callouts: ['SHINE!', 'BRIGHT!'], sfx: 'sparkle', accentHue: 50 },
    { key: 'LOG', category: 'Nature & World', word: 'Log', phrase: 'L-O-G spells Log!', spoken: 'L, O, G! Log!', callouts: ['WOODS!', 'TIMBER!'], sfx: 'crunch', accentHue: 28 },
    { key: 'MUD', category: 'Nature & World', word: 'Mud', phrase: 'M-U-D spells Mud!', spoken: 'M, U, D! Mud!', callouts: ['SQUELCH!', 'SPLASH!'], sfx: 'splash', accentHue: 26 },
    { key: 'SKY', category: 'Nature & World', word: 'Sky', phrase: 'S-K-Y spells Sky!', spoken: 'S, K, Y! Sky!', callouts: ['BREEZE!', 'BLUE!'], sfx: 'sparkle', accentHue: 200 },
    { key: 'SEA', category: 'Nature & World', word: 'Sea', phrase: 'S-E-A spells Sea!', spoken: 'S, E, A! Sea!', callouts: ['SPLASH!', 'WAVES!'], sfx: 'splash', accentHue: 190 },
    { key: 'ICE', category: 'Nature & World', word: 'Ice', phrase: 'I-C-E spells Ice!', spoken: 'I, C, E! Ice!', callouts: ['BRRR!', 'COOL!'], sfx: 'xylophone', accentHue: 196 },

    // Fun Action Verbs (including 4-letter bonus JUMP!)
    { key: 'RUN', category: 'Fun Action Verbs', word: 'Run', phrase: 'R-U-N spells Run!', spoken: 'R, U, N! Run!', callouts: ['FAST!', 'ZOOM!'], sfx: 'rocket', accentHue: 10 },
    { key: 'HOP', category: 'Fun Action Verbs', word: 'Hop', phrase: 'H-O-P spells Hop!', spoken: 'H, O, P! Hop!', callouts: ['BOING!', 'RIBBIT!'], sfx: 'boing', accentHue: 130 },
    { key: 'JOG', category: 'Fun Action Verbs', word: 'Jog', phrase: 'J-O-G spells Jog!', spoken: 'J, O, G! Jog!', callouts: ['STEADY!', 'GO-GO!'], sfx: 'boing', accentHue: 168 },
    { key: 'JUMP', category: 'Fun Action Verbs', word: 'Jump', isBonus: true, phrase: 'BONUS! J-U-M-P spells Jump!', spoken: 'Bonus Word! J, U, M, P! Jump!', callouts: ['BONUS!', 'LEAP!'], sfx: 'boing', accentHue: 295 },
    { key: 'SIT', category: 'Fun Action Verbs', word: 'Sit', phrase: 'S-I-T spells Sit!', spoken: 'S, I, T! Sit!', callouts: ['STAY!', 'GOOD!'], sfx: 'bark', accentHue: 38 },
    { key: 'TAP', category: 'Fun Action Verbs', word: 'Tap', phrase: 'T-A-P spells Tap!', spoken: 'T, A, P! Tap!', callouts: ['TAP-TAP!', 'CLICK!'], sfx: 'xylophone', accentHue: 210 },
    { key: 'ZAP', category: 'Fun Action Verbs', word: 'Zap', phrase: 'Z-A-P spells Zap!', spoken: 'Z, A, P! Zap!', callouts: ['ZAP!', 'SPARK!'], sfx: 'zap', accentHue: 54 }
  ]
};
