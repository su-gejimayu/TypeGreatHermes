/**
 * Curated vocabulary for Type Great Hermes:
 * - Letters A-Z (including B=Baby, D=Dog, F=Food, H=Hippo)
 * - Numbers 0-9 (Woodland countable forest theme)
 * - 3-Letter Words (50 curated words across Animals, Objects/Food, Nature, and Action Verbs)
 * - 4-Letter Words (30 curated words across Animals, Objects/Food, Nature, and Action Verbs)
 */

const WORD_BANK = {
  threeLetter: {
    animals: [
      "CAT", "DOG", "PIG", "FOX", "BAT", "BUG", "HEN", "COW", "BEE", "OWL",
      "ANT", "RAT", "RAM", "YAK", "EEL", "ELK"
    ], // 16 words
    objectsAndFood: [
      "BOX", "CUP", "HAT", "JAM", "POT", "PEN", "BED", "BUS", "VAN", "PIE",
      "MAP", "KEY", "CAR", "BAG", "JAR", "EGG"
    ], // 16 words
    natureAndWorld: [
      "SUN", "LOG", "MUD", "SKY", "SEA", "ICE",
      "WEB", "DEW", "FOG"
    ], // 9 words
    actionVerbs: [
      "RUN", "HOP", "JOG", "SIT", "TAP", "ZAP",
      "DIG", "HUG", "WIN"
    ] // 9 words
  },
  fourLetter: {
    animals: [
      "FROG", "DUCK", "FISH", "BEAR", "LION", "CRAB", "GOAT", "WOLF", "SEAL", "WORM"
    ], // 10 words
    objectsAndFood: [
      "BOOK", "BALL", "CAKE", "DRUM", "KITE", "LAMP", "BOAT", "MILK", "SHOE", "BELL"
    ], // 10 words
    natureAndWorld: [
      "TREE", "STAR", "MOON", "RAIN", "SNOW", "LEAF"
    ], // 6 words
    actionVerbs: [
      "JUMP", "SWIM", "PLAY", "CLAP"
    ] // 4 words
  }
};

// Flat convenience arrays (Exact counts: 50 three-letter words, 30 four-letter words)
const THREE_LETTER_WORDS = [
  // Animals (16)
  "CAT", "DOG", "PIG", "FOX", "BAT", "BUG", "HEN", "COW", "BEE", "OWL",
  "ANT", "RAT", "RAM", "YAK", "EEL", "ELK",
  // Everyday Objects & Food (16)
  "BOX", "CUP", "HAT", "JAM", "POT", "PEN", "BED", "BUS", "VAN", "PIE",
  "MAP", "KEY", "CAR", "BAG", "JAR", "EGG",
  // Nature & World (9)
  "SUN", "LOG", "MUD", "SKY", "SEA", "ICE", "WEB", "DEW", "FOG",
  // Action Verbs (9)
  "RUN", "HOP", "JOG", "SIT", "TAP", "ZAP", "DIG", "HUG", "WIN"
];

const FOUR_LETTER_WORDS = [
  // Animals (10)
  "FROG", "DUCK", "FISH", "BEAR", "LION", "CRAB", "GOAT", "WOLF", "SEAL", "WORM",
  // Everyday Objects & Food (10)
  "BOOK", "BALL", "CAKE", "DRUM", "KITE", "LAMP", "BOAT", "MILK", "SHOE", "BELL",
  // Nature & World (6)
  "TREE", "STAR", "MOON", "RAIN", "SNOW", "LEAF",
  // Action Verbs (4)
  "JUMP", "SWIM", "PLAY", "CLAP"
];

const HERMES_WORDS = {
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
    { key: 'U', word: 'Unicorn', phrase: 'U is for Unicorn!', callouts: ['SHIMMER!', 'SPARKLE!'], sfx: 'sparkle', accentHue: 305 },
    { key: 'V', word: 'Volcano', phrase: 'V is for Volcano!', callouts: ['BOOM!', 'RUMBLE!'], sfx: 'roar', accentHue: 14 },
    { key: 'W', word: 'Whale', phrase: 'W is for Whale!', callouts: ['SPOUT!', 'SPLASH!'], sfx: 'splash', accentHue: 208 },
    { key: 'X', word: 'Xylophone', phrase: 'X is for Xylophone!', callouts: ['TING!', 'PLINK!'], sfx: 'xylophone', accentHue: 140 },
    { key: 'Y', word: 'Yo-Yo', phrase: 'Y is for Yo-Yo!', callouts: ['ZIP!', 'SPIN!'], sfx: 'boing', accentHue: 350 },
    { key: 'Z', word: 'Zebra', phrase: 'Z is for Zebra!', callouts: ['GALLOP!', 'ZOOM!'], sfx: 'boing', accentHue: 175 }
  ],

  // 0-9 = Woodland countable creatures & treasures!,

numbers: [
    {
      key: '1',
      count: 1,
      word: 'One Wise Owl',
      phrase: '1 Wise Owl!',
      spoken: '1! One Wise Owl!',
      callouts: ['HOO-HOO!', 'ONE!'],
      sfx: 'hoot',
      accentHue: 265
    },
    {
      key: '2',
      count: 2,
      word: 'Two Red Foxes',
      phrase: '2 Red Foxes!',
      spoken: '2! Two Red Foxes!',
      callouts: ['BOING!', 'TWO!'],
      sfx: 'boing',
      accentHue: 22
    },
    {
      key: '3',
      count: 3,
      word: 'Three Spiky Hedgehogs',
      phrase: '3 Spiky Hedgehogs!',
      spoken: '3! Three Spiky Hedgehogs!',
      callouts: ['SNIFF!', 'THREE!'],
      sfx: 'crunch',
      accentHue: 35
    },
    {
      key: '4',
      count: 4,
      word: 'Four Hopping Frogs',
      phrase: '4 Hopping Frogs!',
      spoken: '4! Four Hopping Frogs!',
      callouts: ['RIBBIT!', 'FOUR!'],
      sfx: 'ribbit',
      accentHue: 138
    },
    {
      key: '5',
      count: 5,
      word: 'Five Busy Bees',
      phrase: '5 Busy Bees!',
      spoken: '5! Five Busy Bees!',
      callouts: ['BZZZ!', 'FIVE!'],
      sfx: 'bee',
      accentHue: 48
    },
    {
      key: '6',
      count: 6,
      word: 'Six Spotted Ladybugs',
      phrase: '6 Spotted Ladybugs!',
      spoken: '6! Six Spotted Ladybugs!',
      callouts: ['FLUTTER!', 'SIX!'],
      sfx: 'chirp',
      accentHue: 355
    },
    {
      key: '7',
      count: 7,
      word: 'Seven Forest Mushrooms',
      phrase: '7 Forest Mushrooms!',
      spoken: '7! Seven Forest Mushrooms!',
      callouts: ['BOING!', 'SEVEN!'],
      sfx: 'boing',
      accentHue: 14
    },
    {
      key: '8',
      count: 8,
      word: 'Eight Glowing Fireflies',
      phrase: '8 Glowing Fireflies!',
      spoken: '8! Eight Glowing Fireflies!',
      callouts: ['TWINKLE!', 'EIGHT!'],
      sfx: 'sparkle',
      accentHue: 78
    },
    {
      key: '9',
      count: 9,
      word: 'Nine Golden Acorns',
      phrase: '9 Golden Acorns!',
      spoken: '9! Nine Golden Acorns!',
      callouts: ['CRUNCH!', 'NINE!'],
      sfx: 'crunch',
      accentHue: 40
    },
    {
      key: '0',
      count: 0,
      word: 'Empty Acorn Basket',
      phrase: '0 Acorns in the Basket!',
      spoken: '0! Zero Acorns in the Basket!',
      callouts: ['ZERO!', 'EMPTY!'],
      sfx: 'sparkle',
      accentHue: 36
    }
  ],

  // Grouped Word Bank & Flat Convenience Arrays
  wordBank: WORD_BANK,
  threeLetterKeys: THREE_LETTER_WORDS,
  fourLetterKeys: FOUR_LETTER_WORDS,

  // 50 Three-Letter Word Items
  threeLetterWords: [
    { key: 'CAT', category: 'Animals & Creatures', word: 'Cat', phrase: 'C-A-T spells Cat!', spoken: 'C, A, T! Cat!', callouts: ["MEOW!", "PURR!"], sfx: 'meow', accentHue: 28, length: 3 },
    { key: 'DOG', category: 'Animals & Creatures', word: 'Dog', phrase: 'D-O-G spells Dog!', spoken: 'D, O, G! Dog!', callouts: ["WOOF!", "BARK!"], sfx: 'bark', accentHue: 36, length: 3 },
    { key: 'PIG', category: 'Animals & Creatures', word: 'Pig', phrase: 'P-I-G spells Pig!', spoken: 'P, I, G! Pig!', callouts: ["OINK!", "SNORT!"], sfx: 'oink', accentHue: 340, length: 3 },
    { key: 'FOX', category: 'Animals & Creatures', word: 'Fox', phrase: 'F-O-X spells Fox!', spoken: 'F, O, X! Fox!', callouts: ["YIP!", "CLEVER!"], sfx: 'bark', accentHue: 20, length: 3 },
    { key: 'BAT', category: 'Animals & Creatures', word: 'Bat', phrase: 'B-A-T spells Bat!', spoken: 'B, A, T! Bat!', callouts: ["FLAP!", "SWOOP!"], sfx: 'chirp', accentHue: 270, length: 3 },
    { key: 'BUG', category: 'Animals & Creatures', word: 'Bug', phrase: 'B-U-G spells Bug!', spoken: 'B, U, G! Bug!', callouts: ["SCUTTLE!", "CUTE!"], sfx: 'chirp', accentHue: 6, length: 3 },
    { key: 'HEN', category: 'Animals & Creatures', word: 'Hen', phrase: 'H-E-N spells Hen!', spoken: 'H, E, N! Hen!', callouts: ["CLUCK!", "BOK-BOK!"], sfx: 'chirp', accentHue: 14, length: 3 },
    { key: 'COW', category: 'Animals & Creatures', word: 'Cow', phrase: 'C-O-W spells Cow!', spoken: 'C, O, W! Cow!', callouts: ["MOO!", "MOO-OO!"], sfx: 'moo', accentHue: 135, length: 3 },
    { key: 'BEE', category: 'Animals & Creatures', word: 'Bee', phrase: 'B-E-E spells Bee!', spoken: 'B, E, E! Bee!', callouts: ["BZZZ!", "HONEY!"], sfx: 'bee', accentHue: 48, length: 3 },
    { key: 'OWL', category: 'Animals & Creatures', word: 'Owl', phrase: 'O-W-L spells Owl!', spoken: 'O, W, L! Owl!', callouts: ["HOOT!", "WHOO!"], sfx: 'hoot', accentHue: 32, length: 3 },
    { key: 'ANT', category: 'Animals & Creatures', word: 'Ant', phrase: 'A-N-T spells Ant!', spoken: 'A, N, T! Ant!', callouts: ["TINY!", "BUSY!"], sfx: 'chirp', accentHue: 16, length: 3 },
    { key: 'RAT', category: 'Animals & Creatures', word: 'Rat', phrase: 'R-A-T spells Rat!', spoken: 'R, A, T! Rat!', callouts: ["SQUEAK!", "QUICK!"], sfx: 'chirp', accentHue: 260, length: 3 },
    { key: 'RAM', category: 'Animals & Creatures', word: 'Ram', phrase: 'R-A-M spells Ram!', spoken: 'R, A, M! Ram!', callouts: ["HORNS!", "CLIMB!"], sfx: 'boing', accentHue: 35, length: 3 },
    { key: 'YAK', category: 'Animals & Creatures', word: 'Yak', phrase: 'Y-A-K spells Yak!', spoken: 'Y, A, K! Yak!', callouts: ["SHAGGY!", "WILD!"], sfx: 'boing', accentHue: 30, length: 3 },
    { key: 'EEL', category: 'Animals & Creatures', word: 'Eel', phrase: 'E-E-L spells Eel!', spoken: 'E, E, L! Eel!', callouts: ["SLIPPY!", "SWISH!"], sfx: 'splash', accentHue: 175, length: 3 },
    { key: 'ELK', category: 'Animals & Creatures', word: 'Elk', phrase: 'E-L-K spells Elk!', spoken: 'E, L, K! Elk!', callouts: ["ANTLERS!", "PROUD!"], sfx: 'boing', accentHue: 32, length: 3 },
    { key: 'BOX', category: 'Everyday Objects & Food', word: 'Box', phrase: 'B-O-X spells Box!', spoken: 'B, O, X! Box!', callouts: ["POP!", "OPEN!"], sfx: 'boing', accentHue: 34, length: 3 },
    { key: 'CUP', category: 'Everyday Objects & Food', word: 'Cup', phrase: 'C-U-P spells Cup!', spoken: 'C, U, P! Cup!', callouts: ["SIP!", "CHEERS!"], sfx: 'bubble', accentHue: 192, length: 3 },
    { key: 'HAT', category: 'Everyday Objects & Food', word: 'Hat', phrase: 'H-A-T spells Hat!', spoken: 'H, A, T! Hat!', callouts: ["TA-DA!", "FANCY!"], sfx: 'sparkle', accentHue: 285, length: 3 },
    { key: 'JAM', category: 'Everyday Objects & Food', word: 'Jam', phrase: 'J-A-M spells Jam!', spoken: 'J, A, M! Jam!', callouts: ["SWEET!", "BERRY!"], sfx: 'crunch', accentHue: 350, length: 3 },
    { key: 'POT', category: 'Everyday Objects & Food', word: 'Pot', phrase: 'P-O-T spells Pot!', spoken: 'P, O, T! Pot!', callouts: ["BUBBLE!", "COOK!"], sfx: 'bubble', accentHue: 18, length: 3 },
    { key: 'PEN', category: 'Everyday Objects & Food', word: 'Pen', phrase: 'P-E-N spells Pen!', spoken: 'P, E, N! Pen!', callouts: ["DRAW!", "CLICK!"], sfx: 'xylophone', accentHue: 215, length: 3 },
    { key: 'BED', category: 'Everyday Objects & Food', word: 'Bed', phrase: 'B-E-D spells Bed!', spoken: 'B, E, D! Bed!', callouts: ["COZY!", "SLEEPY!"], sfx: 'sparkle', accentHue: 230, length: 3 },
    { key: 'BUS', category: 'Everyday Objects & Food', word: 'Bus', phrase: 'B-U-S spells Bus!', spoken: 'B, U, S! Bus!', callouts: ["BEEP!", "WHEELS!"], sfx: 'train', accentHue: 46, length: 3 },
    { key: 'VAN', category: 'Everyday Objects & Food', word: 'Van', phrase: 'V-A-N spells Van!', spoken: 'V, A, N! Van!', callouts: ["VROOM!", "HONK!"], sfx: 'train', accentHue: 175, length: 3 },
    { key: 'PIE', category: 'Everyday Objects & Food', word: 'Pie', phrase: 'P-I-E spells Pie!', spoken: 'P, I, E! Pie!', callouts: ["YUMMY!", "FRESH!"], sfx: 'crunch', accentHue: 30, length: 3 },
    { key: 'MAP', category: 'Everyday Objects & Food', word: 'Map', phrase: 'M-A-P spells Map!', spoken: 'M, A, P! Map!', callouts: ["EXPLORE!", "FIND!"], sfx: 'sparkle', accentHue: 44, length: 3 },
    { key: 'KEY', category: 'Everyday Objects & Food', word: 'Key', phrase: 'K-E-Y spells Key!', spoken: 'K, E, Y! Key!', callouts: ["UNLOCK!", "CLICK!"], sfx: 'xylophone', accentHue: 48, length: 3 },
    { key: 'CAR', category: 'Everyday Objects & Food', word: 'Car', phrase: 'C-A-R spells Car!', spoken: 'C, A, R! Car!', callouts: ["BEEP-BEEP!", "ZOOM!"], sfx: 'train', accentHue: 2, length: 3 },
    { key: 'BAG', category: 'Everyday Objects & Food', word: 'Bag', phrase: 'B-A-G spells Bag!', spoken: 'B, A, G! Bag!', callouts: ["PACKED!", "HANDY!"], sfx: 'boing', accentHue: 280, length: 3 },
    { key: 'JAR', category: 'Everyday Objects & Food', word: 'Jar', phrase: 'J-A-R spells Jar!', spoken: 'J, A, R! Jar!', callouts: ["TWIST!", "TIGHT!"], sfx: 'bubble', accentHue: 195, length: 3 },
    { key: 'EGG', category: 'Everyday Objects & Food', word: 'Egg', phrase: 'E-G-G spells Egg!', spoken: 'E, G, G! Egg!', callouts: ["CRACK!", "SUNNY!"], sfx: 'crunch', accentHue: 45, length: 3 },
    { key: 'SUN', category: 'Nature & World', word: 'Sun', phrase: 'S-U-N spells Sun!', spoken: 'S, U, N! Sun!', callouts: ["SHINE!", "BRIGHT!"], sfx: 'sparkle', accentHue: 50, length: 3 },
    { key: 'LOG', category: 'Nature & World', word: 'Log', phrase: 'L-O-G spells Log!', spoken: 'L, O, G! Log!', callouts: ["WOODS!", "TIMBER!"], sfx: 'crunch', accentHue: 28, length: 3 },
    { key: 'MUD', category: 'Nature & World', word: 'Mud', phrase: 'M-U-D spells Mud!', spoken: 'M, U, D! Mud!', callouts: ["SQUELCH!", "SPLASH!"], sfx: 'splash', accentHue: 26, length: 3 },
    { key: 'SKY', category: 'Nature & World', word: 'Sky', phrase: 'S-K-Y spells Sky!', spoken: 'S, K, Y! Sky!', callouts: ["BREEZE!", "BLUE!"], sfx: 'sparkle', accentHue: 200, length: 3 },
    { key: 'SEA', category: 'Nature & World', word: 'Sea', phrase: 'S-E-A spells Sea!', spoken: 'S, E, A! Sea!', callouts: ["SPLASH!", "WAVES!"], sfx: 'splash', accentHue: 190, length: 3 },
    { key: 'ICE', category: 'Nature & World', word: 'Ice', phrase: 'I-C-E spells Ice!', spoken: 'I, C, E! Ice!', callouts: ["BRRR!", "COOL!"], sfx: 'xylophone', accentHue: 196, length: 3 },
    { key: 'WEB', category: 'Nature & World', word: 'Web', phrase: 'W-E-B spells Web!', spoken: 'W, E, B! Web!', callouts: ["SILKY!", "SPIN!"], sfx: 'sparkle', accentHue: 210, length: 3 },
    { key: 'DEW', category: 'Nature & World', word: 'Dew', phrase: 'D-E-W spells Dew!', spoken: 'D, E, W! Dew!', callouts: ["FRESH!", "DROP!"], sfx: 'bubble', accentHue: 165, length: 3 },
    { key: 'FOG', category: 'Nature & World', word: 'Fog', phrase: 'F-O-G spells Fog!', spoken: 'F, O, G! Fog!', callouts: ["MISTY!", "PUFF!"], sfx: 'sparkle', accentHue: 215, length: 3 },
    { key: 'RUN', category: 'Fun Action Verbs', word: 'Run', phrase: 'R-U-N spells Run!', spoken: 'R, U, N! Run!', callouts: ["FAST!", "ZOOM!"], sfx: 'rocket', accentHue: 10, length: 3 },
    { key: 'HOP', category: 'Fun Action Verbs', word: 'Hop', phrase: 'H-O-P spells Hop!', spoken: 'H, O, P! Hop!', callouts: ["BOING!", "RIBBIT!"], sfx: 'boing', accentHue: 130, length: 3 },
    { key: 'JOG', category: 'Fun Action Verbs', word: 'Jog', phrase: 'J-O-G spells Jog!', spoken: 'J, O, G! Jog!', callouts: ["STEADY!", "GO-GO!"], sfx: 'boing', accentHue: 168, length: 3 },
    { key: 'SIT', category: 'Fun Action Verbs', word: 'Sit', phrase: 'S-I-T spells Sit!', spoken: 'S, I, T! Sit!', callouts: ["STAY!", "GOOD!"], sfx: 'bark', accentHue: 38, length: 3 },
    { key: 'TAP', category: 'Fun Action Verbs', word: 'Tap', phrase: 'T-A-P spells Tap!', spoken: 'T, A, P! Tap!', callouts: ["TAP-TAP!", "CLICK!"], sfx: 'xylophone', accentHue: 210, length: 3 },
    { key: 'ZAP', category: 'Fun Action Verbs', word: 'Zap', phrase: 'Z-A-P spells Zap!', spoken: 'Z, A, P! Zap!', callouts: ["ZAP!", "SPARK!"], sfx: 'zap', accentHue: 54, length: 3 },
    { key: 'DIG', category: 'Fun Action Verbs', word: 'Dig', phrase: 'D-I-G spells Dig!', spoken: 'D, I, G! Dig!', callouts: ["SCOOP!", "DEEP!"], sfx: 'crunch', accentHue: 25, length: 3 },
    { key: 'HUG', category: 'Fun Action Verbs', word: 'Hug', phrase: 'H-U-G spells Hug!', spoken: 'H, U, G! Hug!', callouts: ["WARM!", "SQUEEZE!"], sfx: 'giggle', accentHue: 335, length: 3 },
    { key: 'WIN', category: 'Fun Action Verbs', word: 'Win', phrase: 'W-I-N spells Win!', spoken: 'W, I, N! Win!', callouts: ["HOORAY!", "CHAMP!"], sfx: 'sparkle', accentHue: 48, length: 3 }
  ],

  // 30 Four-Letter Word Items
  fourLetterWords: [
    { key: 'FROG', category: 'Animals & Creatures', word: 'Frog', phrase: 'F-R-O-G spells Frog!', spoken: 'F, R, O, G! Frog!', callouts: ["RIBBIT!", "LEAP!"], sfx: 'boing', accentHue: 125, length: 4 },
    { key: 'DUCK', category: 'Animals & Creatures', word: 'Duck', phrase: 'D-U-C-K spells Duck!', spoken: 'D, U, C, K! Duck!', callouts: ["QUACK!", "WADDLE!"], sfx: 'chirp', accentHue: 45, length: 4 },
    { key: 'FISH', category: 'Animals & Creatures', word: 'Fish', phrase: 'F-I-S-H spells Fish!', spoken: 'F, I, S, H! Fish!', callouts: ["SWISH!", "SPLASH!"], sfx: 'splash', accentHue: 185, length: 4 },
    { key: 'BEAR', category: 'Animals & Creatures', word: 'Bear', phrase: 'B-E-A-R spells Bear!', spoken: 'B, E, A, R! Bear!', callouts: ["GROWL!", "FUZZY!"], sfx: 'roar', accentHue: 28, length: 4 },
    { key: 'LION', category: 'Animals & Creatures', word: 'Lion', phrase: 'L-I-O-N spells Lion!', spoken: 'L, I, O, N! Lion!', callouts: ["ROAR!", "KING!"], sfx: 'roar', accentHue: 38, length: 4 },
    { key: 'CRAB', category: 'Animals & Creatures', word: 'Crab', phrase: 'C-R-A-B spells Crab!', spoken: 'C, R, A, B! Crab!', callouts: ["PINCH!", "SCUTTLE!"], sfx: 'chirp', accentHue: 8, length: 4 },
    { key: 'GOAT', category: 'Animals & Creatures', word: 'Goat', phrase: 'G-O-A-T spells Goat!', spoken: 'G, O, A, T! Goat!', callouts: ["BLEAT!", "CHOMP!"], sfx: 'moo', accentHue: 32, length: 4 },
    { key: 'WOLF', category: 'Animals & Creatures', word: 'Wolf', phrase: 'W-O-L-F spells Wolf!', spoken: 'W, O, L, F! Wolf!', callouts: ["HOWL!", "PACK!"], sfx: 'bark', accentHue: 220, length: 4 },
    { key: 'SEAL', category: 'Animals & Creatures', word: 'Seal', phrase: 'S-E-A-L spells Seal!', spoken: 'S, E, A, L! Seal!', callouts: ["BARK!", "SPLASH!"], sfx: 'splash', accentHue: 200, length: 4 },
    { key: 'WORM', category: 'Animals & Creatures', word: 'Worm', phrase: 'W-O-R-M spells Worm!', spoken: 'W, O, R, M! Worm!', callouts: ["WIGGLE!", "GARDEN!"], sfx: 'bubble', accentHue: 120, length: 4 },
    { key: 'BOOK', category: 'Everyday Objects & Food', word: 'Book', phrase: 'B-O-O-K spells Book!', spoken: 'B, O, O, K! Book!', callouts: ["STORY!", "READ!"], sfx: 'sparkle', accentHue: 215, length: 4 },
    { key: 'BALL', category: 'Everyday Objects & Food', word: 'Ball', phrase: 'B-A-L-L spells Ball!', spoken: 'B, A, L, L! Ball!', callouts: ["BOUNCE!", "ROLL!"], sfx: 'boing', accentHue: 4, length: 4 },
    { key: 'CAKE', category: 'Everyday Objects & Food', word: 'Cake', phrase: 'C-A-K-E spells Cake!', spoken: 'C, A, K, E! Cake!', callouts: ["SWEET!", "YUMMY!"], sfx: 'crunch', accentHue: 320, length: 4 },
    { key: 'DRUM', category: 'Everyday Objects & Food', word: 'Drum', phrase: 'D-R-U-M spells Drum!', spoken: 'D, R, U, M! Drum!', callouts: ["BOOM!", "BEAT!"], sfx: 'xylophone', accentHue: 12, length: 4 },
    { key: 'KITE', category: 'Everyday Objects & Food', word: 'Kite', phrase: 'K-I-T-E spells Kite!', spoken: 'K, I, T, E! Kite!', callouts: ["FLY HIGH!", "SOAR!"], sfx: 'sparkle', accentHue: 280, length: 4 },
    { key: 'LAMP', category: 'Everyday Objects & Food', word: 'Lamp', phrase: 'L-A-M-P spells Lamp!', spoken: 'L, A, M, P! Lamp!', callouts: ["GLOW!", "LIGHT!"], sfx: 'sparkle', accentHue: 48, length: 4 },
    { key: 'BOAT', category: 'Everyday Objects & Food', word: 'Boat', phrase: 'B-O-A-T spells Boat!', spoken: 'B, O, A, T! Boat!', callouts: ["SAIL!", "FLOAT!"], sfx: 'splash', accentHue: 198, length: 4 },
    { key: 'MILK', category: 'Everyday Objects & Food', word: 'Milk', phrase: 'M-I-L-K spells Milk!', spoken: 'M, I, L, K! Milk!', callouts: ["FRESH!", "COOL!"], sfx: 'bubble', accentHue: 205, length: 4 },
    { key: 'SHOE', category: 'Everyday Objects & Food', word: 'Shoe', phrase: 'S-H-O-E spells Shoe!', spoken: 'S, H, O, E! Shoe!', callouts: ["STEP!", "TIED!"], sfx: 'boing', accentHue: 235, length: 4 },
    { key: 'BELL', category: 'Everyday Objects & Food', word: 'Bell', phrase: 'B-E-L-L spells Bell!', spoken: 'B, E, L, L! Bell!', callouts: ["RING!", "DING!"], sfx: 'sparkle', accentHue: 46, length: 4 },
    { key: 'TREE', category: 'Nature & World', word: 'Tree', phrase: 'T-R-E-E spells Tree!', spoken: 'T, R, E, E! Tree!', callouts: ["LEAFY!", "TALL!"], sfx: 'chirp', accentHue: 130, length: 4 },
    { key: 'STAR', category: 'Nature & World', word: 'Star', phrase: 'S-T-A-R spells Star!', spoken: 'S, T, A, R! Star!', callouts: ["TWINKLE!", "SHINE!"], sfx: 'sparkle', accentHue: 50, length: 4 },
    { key: 'MOON', category: 'Nature & World', word: 'Moon', phrase: 'M-O-O-N spells Moon!', spoken: 'M, O, O, N! Moon!', callouts: ["NIGHT!", "GLOW!"], sfx: 'sparkle', accentHue: 225, length: 4 },
    { key: 'RAIN', category: 'Nature & World', word: 'Rain', phrase: 'R-A-I-N spells Rain!', spoken: 'R, A, I, N! Rain!', callouts: ["PITTER!", "PATTER!"], sfx: 'splash', accentHue: 202, length: 4 },
    { key: 'SNOW', category: 'Nature & World', word: 'Snow', phrase: 'S-N-O-W spells Snow!', spoken: 'S, N, O, W! Snow!', callouts: ["FLURRY!", "CHILLY!"], sfx: 'sparkle', accentHue: 196, length: 4 },
    { key: 'LEAF', category: 'Nature & World', word: 'Leaf', phrase: 'L-E-A-F spells Leaf!', spoken: 'L, E, A, F! Leaf!', callouts: ["AUTUMN!", "FLUTTER!"], sfx: 'chirp', accentHue: 90, length: 4 },
    { key: 'JUMP', category: 'Fun Action Verbs', word: 'Jump', phrase: 'J-U-M-P spells Jump!', spoken: 'J, U, M, P! Jump!', callouts: ["BOING!", "LEAP!"], sfx: 'boing', accentHue: 295, length: 4 },
    { key: 'SWIM', category: 'Fun Action Verbs', word: 'Swim', phrase: 'S-W-I-M spells Swim!', spoken: 'S, W, I, M! Swim!', callouts: ["SPLASH!", "PADDLE!"], sfx: 'splash', accentHue: 188, length: 4 },
    { key: 'PLAY', category: 'Fun Action Verbs', word: 'Play', phrase: 'P-L-A-Y spells Play!', spoken: 'P, L, A, Y! Play!', callouts: ["FUN!", "JOY!"], sfx: 'sparkle', accentHue: 310, length: 4 },
    { key: 'CLAP', category: 'Fun Action Verbs', word: 'Clap', phrase: 'C-L-A-P spells Clap!', spoken: 'C, L, A, P! Clap!', callouts: ["CLAP-CLAP!", "BRAVO!"], sfx: 'xylophone', accentHue: 40, length: 4 }
  ],

  // Full 80-Word Combined List
  words: [
    { key: 'CAT', category: 'Animals & Creatures', word: 'Cat', phrase: 'C-A-T spells Cat!', spoken: 'C, A, T! Cat!', callouts: ["MEOW!", "PURR!"], sfx: 'meow', accentHue: 28, length: 3 },
    { key: 'DOG', category: 'Animals & Creatures', word: 'Dog', phrase: 'D-O-G spells Dog!', spoken: 'D, O, G! Dog!', callouts: ["WOOF!", "BARK!"], sfx: 'bark', accentHue: 36, length: 3 },
    { key: 'PIG', category: 'Animals & Creatures', word: 'Pig', phrase: 'P-I-G spells Pig!', spoken: 'P, I, G! Pig!', callouts: ["OINK!", "SNORT!"], sfx: 'oink', accentHue: 340, length: 3 },
    { key: 'FOX', category: 'Animals & Creatures', word: 'Fox', phrase: 'F-O-X spells Fox!', spoken: 'F, O, X! Fox!', callouts: ["YIP!", "CLEVER!"], sfx: 'bark', accentHue: 20, length: 3 },
    { key: 'BAT', category: 'Animals & Creatures', word: 'Bat', phrase: 'B-A-T spells Bat!', spoken: 'B, A, T! Bat!', callouts: ["FLAP!", "SWOOP!"], sfx: 'chirp', accentHue: 270, length: 3 },
    { key: 'BUG', category: 'Animals & Creatures', word: 'Bug', phrase: 'B-U-G spells Bug!', spoken: 'B, U, G! Bug!', callouts: ["SCUTTLE!", "CUTE!"], sfx: 'chirp', accentHue: 6, length: 3 },
    { key: 'HEN', category: 'Animals & Creatures', word: 'Hen', phrase: 'H-E-N spells Hen!', spoken: 'H, E, N! Hen!', callouts: ["CLUCK!", "BOK-BOK!"], sfx: 'chirp', accentHue: 14, length: 3 },
    { key: 'COW', category: 'Animals & Creatures', word: 'Cow', phrase: 'C-O-W spells Cow!', spoken: 'C, O, W! Cow!', callouts: ["MOO!", "MOO-OO!"], sfx: 'moo', accentHue: 135, length: 3 },
    { key: 'BEE', category: 'Animals & Creatures', word: 'Bee', phrase: 'B-E-E spells Bee!', spoken: 'B, E, E! Bee!', callouts: ["BZZZ!", "HONEY!"], sfx: 'bee', accentHue: 48, length: 3 },
    { key: 'OWL', category: 'Animals & Creatures', word: 'Owl', phrase: 'O-W-L spells Owl!', spoken: 'O, W, L! Owl!', callouts: ["HOOT!", "WHOO!"], sfx: 'hoot', accentHue: 32, length: 3 },
    { key: 'ANT', category: 'Animals & Creatures', word: 'Ant', phrase: 'A-N-T spells Ant!', spoken: 'A, N, T! Ant!', callouts: ["TINY!", "BUSY!"], sfx: 'chirp', accentHue: 16, length: 3 },
    { key: 'RAT', category: 'Animals & Creatures', word: 'Rat', phrase: 'R-A-T spells Rat!', spoken: 'R, A, T! Rat!', callouts: ["SQUEAK!", "QUICK!"], sfx: 'chirp', accentHue: 260, length: 3 },
    { key: 'RAM', category: 'Animals & Creatures', word: 'Ram', phrase: 'R-A-M spells Ram!', spoken: 'R, A, M! Ram!', callouts: ["HORNS!", "CLIMB!"], sfx: 'boing', accentHue: 35, length: 3 },
    { key: 'YAK', category: 'Animals & Creatures', word: 'Yak', phrase: 'Y-A-K spells Yak!', spoken: 'Y, A, K! Yak!', callouts: ["SHAGGY!", "WILD!"], sfx: 'boing', accentHue: 30, length: 3 },
    { key: 'EEL', category: 'Animals & Creatures', word: 'Eel', phrase: 'E-E-L spells Eel!', spoken: 'E, E, L! Eel!', callouts: ["SLIPPY!", "SWISH!"], sfx: 'splash', accentHue: 175, length: 3 },
    { key: 'ELK', category: 'Animals & Creatures', word: 'Elk', phrase: 'E-L-K spells Elk!', spoken: 'E, L, K! Elk!', callouts: ["ANTLERS!", "PROUD!"], sfx: 'boing', accentHue: 32, length: 3 },
    { key: 'BOX', category: 'Everyday Objects & Food', word: 'Box', phrase: 'B-O-X spells Box!', spoken: 'B, O, X! Box!', callouts: ["POP!", "OPEN!"], sfx: 'boing', accentHue: 34, length: 3 },
    { key: 'CUP', category: 'Everyday Objects & Food', word: 'Cup', phrase: 'C-U-P spells Cup!', spoken: 'C, U, P! Cup!', callouts: ["SIP!", "CHEERS!"], sfx: 'bubble', accentHue: 192, length: 3 },
    { key: 'HAT', category: 'Everyday Objects & Food', word: 'Hat', phrase: 'H-A-T spells Hat!', spoken: 'H, A, T! Hat!', callouts: ["TA-DA!", "FANCY!"], sfx: 'sparkle', accentHue: 285, length: 3 },
    { key: 'JAM', category: 'Everyday Objects & Food', word: 'Jam', phrase: 'J-A-M spells Jam!', spoken: 'J, A, M! Jam!', callouts: ["SWEET!", "BERRY!"], sfx: 'crunch', accentHue: 350, length: 3 },
    { key: 'POT', category: 'Everyday Objects & Food', word: 'Pot', phrase: 'P-O-T spells Pot!', spoken: 'P, O, T! Pot!', callouts: ["BUBBLE!", "COOK!"], sfx: 'bubble', accentHue: 18, length: 3 },
    { key: 'PEN', category: 'Everyday Objects & Food', word: 'Pen', phrase: 'P-E-N spells Pen!', spoken: 'P, E, N! Pen!', callouts: ["DRAW!", "CLICK!"], sfx: 'xylophone', accentHue: 215, length: 3 },
    { key: 'BED', category: 'Everyday Objects & Food', word: 'Bed', phrase: 'B-E-D spells Bed!', spoken: 'B, E, D! Bed!', callouts: ["COZY!", "SLEEPY!"], sfx: 'sparkle', accentHue: 230, length: 3 },
    { key: 'BUS', category: 'Everyday Objects & Food', word: 'Bus', phrase: 'B-U-S spells Bus!', spoken: 'B, U, S! Bus!', callouts: ["BEEP!", "WHEELS!"], sfx: 'train', accentHue: 46, length: 3 },
    { key: 'VAN', category: 'Everyday Objects & Food', word: 'Van', phrase: 'V-A-N spells Van!', spoken: 'V, A, N! Van!', callouts: ["VROOM!", "HONK!"], sfx: 'train', accentHue: 175, length: 3 },
    { key: 'PIE', category: 'Everyday Objects & Food', word: 'Pie', phrase: 'P-I-E spells Pie!', spoken: 'P, I, E! Pie!', callouts: ["YUMMY!", "FRESH!"], sfx: 'crunch', accentHue: 30, length: 3 },
    { key: 'MAP', category: 'Everyday Objects & Food', word: 'Map', phrase: 'M-A-P spells Map!', spoken: 'M, A, P! Map!', callouts: ["EXPLORE!", "FIND!"], sfx: 'sparkle', accentHue: 44, length: 3 },
    { key: 'KEY', category: 'Everyday Objects & Food', word: 'Key', phrase: 'K-E-Y spells Key!', spoken: 'K, E, Y! Key!', callouts: ["UNLOCK!", "CLICK!"], sfx: 'xylophone', accentHue: 48, length: 3 },
    { key: 'CAR', category: 'Everyday Objects & Food', word: 'Car', phrase: 'C-A-R spells Car!', spoken: 'C, A, R! Car!', callouts: ["BEEP-BEEP!", "ZOOM!"], sfx: 'train', accentHue: 2, length: 3 },
    { key: 'BAG', category: 'Everyday Objects & Food', word: 'Bag', phrase: 'B-A-G spells Bag!', spoken: 'B, A, G! Bag!', callouts: ["PACKED!", "HANDY!"], sfx: 'boing', accentHue: 280, length: 3 },
    { key: 'JAR', category: 'Everyday Objects & Food', word: 'Jar', phrase: 'J-A-R spells Jar!', spoken: 'J, A, R! Jar!', callouts: ["TWIST!", "TIGHT!"], sfx: 'bubble', accentHue: 195, length: 3 },
    { key: 'EGG', category: 'Everyday Objects & Food', word: 'Egg', phrase: 'E-G-G spells Egg!', spoken: 'E, G, G! Egg!', callouts: ["CRACK!", "SUNNY!"], sfx: 'crunch', accentHue: 45, length: 3 },
    { key: 'SUN', category: 'Nature & World', word: 'Sun', phrase: 'S-U-N spells Sun!', spoken: 'S, U, N! Sun!', callouts: ["SHINE!", "BRIGHT!"], sfx: 'sparkle', accentHue: 50, length: 3 },
    { key: 'LOG', category: 'Nature & World', word: 'Log', phrase: 'L-O-G spells Log!', spoken: 'L, O, G! Log!', callouts: ["WOODS!", "TIMBER!"], sfx: 'crunch', accentHue: 28, length: 3 },
    { key: 'MUD', category: 'Nature & World', word: 'Mud', phrase: 'M-U-D spells Mud!', spoken: 'M, U, D! Mud!', callouts: ["SQUELCH!", "SPLASH!"], sfx: 'splash', accentHue: 26, length: 3 },
    { key: 'SKY', category: 'Nature & World', word: 'Sky', phrase: 'S-K-Y spells Sky!', spoken: 'S, K, Y! Sky!', callouts: ["BREEZE!", "BLUE!"], sfx: 'sparkle', accentHue: 200, length: 3 },
    { key: 'SEA', category: 'Nature & World', word: 'Sea', phrase: 'S-E-A spells Sea!', spoken: 'S, E, A! Sea!', callouts: ["SPLASH!", "WAVES!"], sfx: 'splash', accentHue: 190, length: 3 },
    { key: 'ICE', category: 'Nature & World', word: 'Ice', phrase: 'I-C-E spells Ice!', spoken: 'I, C, E! Ice!', callouts: ["BRRR!", "COOL!"], sfx: 'xylophone', accentHue: 196, length: 3 },
    { key: 'WEB', category: 'Nature & World', word: 'Web', phrase: 'W-E-B spells Web!', spoken: 'W, E, B! Web!', callouts: ["SILKY!", "SPIN!"], sfx: 'sparkle', accentHue: 210, length: 3 },
    { key: 'DEW', category: 'Nature & World', word: 'Dew', phrase: 'D-E-W spells Dew!', spoken: 'D, E, W! Dew!', callouts: ["FRESH!", "DROP!"], sfx: 'bubble', accentHue: 165, length: 3 },
    { key: 'FOG', category: 'Nature & World', word: 'Fog', phrase: 'F-O-G spells Fog!', spoken: 'F, O, G! Fog!', callouts: ["MISTY!", "PUFF!"], sfx: 'sparkle', accentHue: 215, length: 3 },
    { key: 'RUN', category: 'Fun Action Verbs', word: 'Run', phrase: 'R-U-N spells Run!', spoken: 'R, U, N! Run!', callouts: ["FAST!", "ZOOM!"], sfx: 'rocket', accentHue: 10, length: 3 },
    { key: 'HOP', category: 'Fun Action Verbs', word: 'Hop', phrase: 'H-O-P spells Hop!', spoken: 'H, O, P! Hop!', callouts: ["BOING!", "RIBBIT!"], sfx: 'boing', accentHue: 130, length: 3 },
    { key: 'JOG', category: 'Fun Action Verbs', word: 'Jog', phrase: 'J-O-G spells Jog!', spoken: 'J, O, G! Jog!', callouts: ["STEADY!", "GO-GO!"], sfx: 'boing', accentHue: 168, length: 3 },
    { key: 'SIT', category: 'Fun Action Verbs', word: 'Sit', phrase: 'S-I-T spells Sit!', spoken: 'S, I, T! Sit!', callouts: ["STAY!", "GOOD!"], sfx: 'bark', accentHue: 38, length: 3 },
    { key: 'TAP', category: 'Fun Action Verbs', word: 'Tap', phrase: 'T-A-P spells Tap!', spoken: 'T, A, P! Tap!', callouts: ["TAP-TAP!", "CLICK!"], sfx: 'xylophone', accentHue: 210, length: 3 },
    { key: 'ZAP', category: 'Fun Action Verbs', word: 'Zap', phrase: 'Z-A-P spells Zap!', spoken: 'Z, A, P! Zap!', callouts: ["ZAP!", "SPARK!"], sfx: 'zap', accentHue: 54, length: 3 },
    { key: 'DIG', category: 'Fun Action Verbs', word: 'Dig', phrase: 'D-I-G spells Dig!', spoken: 'D, I, G! Dig!', callouts: ["SCOOP!", "DEEP!"], sfx: 'crunch', accentHue: 25, length: 3 },
    { key: 'HUG', category: 'Fun Action Verbs', word: 'Hug', phrase: 'H-U-G spells Hug!', spoken: 'H, U, G! Hug!', callouts: ["WARM!", "SQUEEZE!"], sfx: 'giggle', accentHue: 335, length: 3 },
    { key: 'WIN', category: 'Fun Action Verbs', word: 'Win', phrase: 'W-I-N spells Win!', spoken: 'W, I, N! Win!', callouts: ["HOORAY!", "CHAMP!"], sfx: 'sparkle', accentHue: 48, length: 3 },
    { key: 'FROG', category: 'Animals & Creatures', word: 'Frog', phrase: 'F-R-O-G spells Frog!', spoken: 'F, R, O, G! Frog!', callouts: ["RIBBIT!", "LEAP!"], sfx: 'boing', accentHue: 125, length: 4 },
    { key: 'DUCK', category: 'Animals & Creatures', word: 'Duck', phrase: 'D-U-C-K spells Duck!', spoken: 'D, U, C, K! Duck!', callouts: ["QUACK!", "WADDLE!"], sfx: 'chirp', accentHue: 45, length: 4 },
    { key: 'FISH', category: 'Animals & Creatures', word: 'Fish', phrase: 'F-I-S-H spells Fish!', spoken: 'F, I, S, H! Fish!', callouts: ["SWISH!", "SPLASH!"], sfx: 'splash', accentHue: 185, length: 4 },
    { key: 'BEAR', category: 'Animals & Creatures', word: 'Bear', phrase: 'B-E-A-R spells Bear!', spoken: 'B, E, A, R! Bear!', callouts: ["GROWL!", "FUZZY!"], sfx: 'roar', accentHue: 28, length: 4 },
    { key: 'LION', category: 'Animals & Creatures', word: 'Lion', phrase: 'L-I-O-N spells Lion!', spoken: 'L, I, O, N! Lion!', callouts: ["ROAR!", "KING!"], sfx: 'roar', accentHue: 38, length: 4 },
    { key: 'CRAB', category: 'Animals & Creatures', word: 'Crab', phrase: 'C-R-A-B spells Crab!', spoken: 'C, R, A, B! Crab!', callouts: ["PINCH!", "SCUTTLE!"], sfx: 'chirp', accentHue: 8, length: 4 },
    { key: 'GOAT', category: 'Animals & Creatures', word: 'Goat', phrase: 'G-O-A-T spells Goat!', spoken: 'G, O, A, T! Goat!', callouts: ["BLEAT!", "CHOMP!"], sfx: 'moo', accentHue: 32, length: 4 },
    { key: 'WOLF', category: 'Animals & Creatures', word: 'Wolf', phrase: 'W-O-L-F spells Wolf!', spoken: 'W, O, L, F! Wolf!', callouts: ["HOWL!", "PACK!"], sfx: 'bark', accentHue: 220, length: 4 },
    { key: 'SEAL', category: 'Animals & Creatures', word: 'Seal', phrase: 'S-E-A-L spells Seal!', spoken: 'S, E, A, L! Seal!', callouts: ["BARK!", "SPLASH!"], sfx: 'splash', accentHue: 200, length: 4 },
    { key: 'WORM', category: 'Animals & Creatures', word: 'Worm', phrase: 'W-O-R-M spells Worm!', spoken: 'W, O, R, M! Worm!', callouts: ["WIGGLE!", "GARDEN!"], sfx: 'bubble', accentHue: 120, length: 4 },
    { key: 'BOOK', category: 'Everyday Objects & Food', word: 'Book', phrase: 'B-O-O-K spells Book!', spoken: 'B, O, O, K! Book!', callouts: ["STORY!", "READ!"], sfx: 'sparkle', accentHue: 215, length: 4 },
    { key: 'BALL', category: 'Everyday Objects & Food', word: 'Ball', phrase: 'B-A-L-L spells Ball!', spoken: 'B, A, L, L! Ball!', callouts: ["BOUNCE!", "ROLL!"], sfx: 'boing', accentHue: 4, length: 4 },
    { key: 'CAKE', category: 'Everyday Objects & Food', word: 'Cake', phrase: 'C-A-K-E spells Cake!', spoken: 'C, A, K, E! Cake!', callouts: ["SWEET!", "YUMMY!"], sfx: 'crunch', accentHue: 320, length: 4 },
    { key: 'DRUM', category: 'Everyday Objects & Food', word: 'Drum', phrase: 'D-R-U-M spells Drum!', spoken: 'D, R, U, M! Drum!', callouts: ["BOOM!", "BEAT!"], sfx: 'xylophone', accentHue: 12, length: 4 },
    { key: 'KITE', category: 'Everyday Objects & Food', word: 'Kite', phrase: 'K-I-T-E spells Kite!', spoken: 'K, I, T, E! Kite!', callouts: ["FLY HIGH!", "SOAR!"], sfx: 'sparkle', accentHue: 280, length: 4 },
    { key: 'LAMP', category: 'Everyday Objects & Food', word: 'Lamp', phrase: 'L-A-M-P spells Lamp!', spoken: 'L, A, M, P! Lamp!', callouts: ["GLOW!", "LIGHT!"], sfx: 'sparkle', accentHue: 48, length: 4 },
    { key: 'BOAT', category: 'Everyday Objects & Food', word: 'Boat', phrase: 'B-O-A-T spells Boat!', spoken: 'B, O, A, T! Boat!', callouts: ["SAIL!", "FLOAT!"], sfx: 'splash', accentHue: 198, length: 4 },
    { key: 'MILK', category: 'Everyday Objects & Food', word: 'Milk', phrase: 'M-I-L-K spells Milk!', spoken: 'M, I, L, K! Milk!', callouts: ["FRESH!", "COOL!"], sfx: 'bubble', accentHue: 205, length: 4 },
    { key: 'SHOE', category: 'Everyday Objects & Food', word: 'Shoe', phrase: 'S-H-O-E spells Shoe!', spoken: 'S, H, O, E! Shoe!', callouts: ["STEP!", "TIED!"], sfx: 'boing', accentHue: 235, length: 4 },
    { key: 'BELL', category: 'Everyday Objects & Food', word: 'Bell', phrase: 'B-E-L-L spells Bell!', spoken: 'B, E, L, L! Bell!', callouts: ["RING!", "DING!"], sfx: 'sparkle', accentHue: 46, length: 4 },
    { key: 'TREE', category: 'Nature & World', word: 'Tree', phrase: 'T-R-E-E spells Tree!', spoken: 'T, R, E, E! Tree!', callouts: ["LEAFY!", "TALL!"], sfx: 'chirp', accentHue: 130, length: 4 },
    { key: 'STAR', category: 'Nature & World', word: 'Star', phrase: 'S-T-A-R spells Star!', spoken: 'S, T, A, R! Star!', callouts: ["TWINKLE!", "SHINE!"], sfx: 'sparkle', accentHue: 50, length: 4 },
    { key: 'MOON', category: 'Nature & World', word: 'Moon', phrase: 'M-O-O-N spells Moon!', spoken: 'M, O, O, N! Moon!', callouts: ["NIGHT!", "GLOW!"], sfx: 'sparkle', accentHue: 225, length: 4 },
    { key: 'RAIN', category: 'Nature & World', word: 'Rain', phrase: 'R-A-I-N spells Rain!', spoken: 'R, A, I, N! Rain!', callouts: ["PITTER!", "PATTER!"], sfx: 'splash', accentHue: 202, length: 4 },
    { key: 'SNOW', category: 'Nature & World', word: 'Snow', phrase: 'S-N-O-W spells Snow!', spoken: 'S, N, O, W! Snow!', callouts: ["FLURRY!", "CHILLY!"], sfx: 'sparkle', accentHue: 196, length: 4 },
    { key: 'LEAF', category: 'Nature & World', word: 'Leaf', phrase: 'L-E-A-F spells Leaf!', spoken: 'L, E, A, F! Leaf!', callouts: ["AUTUMN!", "FLUTTER!"], sfx: 'chirp', accentHue: 90, length: 4 },
    { key: 'JUMP', category: 'Fun Action Verbs', word: 'Jump', phrase: 'J-U-M-P spells Jump!', spoken: 'J, U, M, P! Jump!', callouts: ["BOING!", "LEAP!"], sfx: 'boing', accentHue: 295, length: 4 },
    { key: 'SWIM', category: 'Fun Action Verbs', word: 'Swim', phrase: 'S-W-I-M spells Swim!', spoken: 'S, W, I, M! Swim!', callouts: ["SPLASH!", "PADDLE!"], sfx: 'splash', accentHue: 188, length: 4 },
    { key: 'PLAY', category: 'Fun Action Verbs', word: 'Play', phrase: 'P-L-A-Y spells Play!', spoken: 'P, L, A, Y! Play!', callouts: ["FUN!", "JOY!"], sfx: 'sparkle', accentHue: 310, length: 4 },
    { key: 'CLAP', category: 'Fun Action Verbs', word: 'Clap', phrase: 'C-L-A-P spells Clap!', spoken: 'C, L, A, P! Clap!', callouts: ["CLAP-CLAP!", "BRAVO!"], sfx: 'xylophone', accentHue: 40, length: 4 }
  ]
};

if (typeof window !== 'undefined') {
  window.WORD_BANK = WORD_BANK;
  window.THREE_LETTER_WORDS = THREE_LETTER_WORDS;
  window.FOUR_LETTER_WORDS = FOUR_LETTER_WORDS;
  window.HERMES_WORDS = HERMES_WORDS;
}

if (typeof globalThis !== 'undefined') {
  globalThis.WORD_BANK = WORD_BANK;
  globalThis.THREE_LETTER_WORDS = THREE_LETTER_WORDS;
  globalThis.FOUR_LETTER_WORDS = FOUR_LETTER_WORDS;
  globalThis.HERMES_WORDS = HERMES_WORDS;
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    WORD_BANK,
    THREE_LETTER_WORDS,
    FOUR_LETTER_WORDS,
    HERMES_WORDS
  };
}
