// Feel free to add a unique literal value to each type for a discriminated union

type Monitor = {
  serial: SerialNumber;
  resolution: [number, number];
  manufacturer: string;
  touch: boolean;
};

type Keyboard = {
  serial: SerialNumber;
  numpad: boolean;
  manufacturer: string;
  language: string;
};

type Computer = {
  platform: string;
  serial: SerialNumber;
  year: number;
};

type SerialNumber = number | string;

type Item = Monitor | Computer | Keyboard;

// Type predicate
function isMonitor(item: Item): item is Monitor {
  return "resolution" in item;
}

function demoItem(item: Item): string {
  // Add code to narrow and describe the type here
  // Be sure to access unique variables of the type

  // Type predicate
  if (isMonitor(item)) {
    return `Monitor: ${item.manufacturer} ${item.resolution[0]}x${item.resolution[1]}`;
  }

  return "Talk about me";
}

let items: Item[] = [
  {
    platform: "Windows",
    serial: "adlkhel32134ljd",
    year: 1998,
  },
  {
    serial: 74523342,
    numpad: true,
    manufacturer: "Gibble",
    language: "EN",
  },

  {
    serial: "ewjkh234521fj",
    resolution: [1280, 720],
    manufacturer: "Milmo",
    touch: false,
  },
];

for (let item of items) {
  console.log(demoItem(item));
}
