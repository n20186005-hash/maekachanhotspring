const fs = require('fs');

const dataStr = fs.readFileSync('c:/Users/Administrator/Documents/GitHub/maekachanhotspring/src/data/transport.ts', 'utf8');
let jsonStr = dataStr.replace('export const transportData: Record<string, any> = ', '').replace(/;\s*$/, '');
let data = JSON.parse(jsonStr);

const flightsZh = {
  icon: "✈️",
  title: "飞机与机场接驳",
  subtitle: "国内及国际航班到达",
  desc: "距离清莱温泉最近的机场是清迈国际机场（CNX）和清莱皇太后国际机场（CEI）。抵达后需转乘陆路交通前往温泉。",
  bullets: [
    "清迈机场（CNX）车程约 1.5 小时，适合航班选择多的旅客。",
    "清莱机场（CEI）车程约 1 小时，距离稍近。",
    "可从机场直接预订包车，或先打车前往市区的长途汽车站转乘大巴。"
  ],
  steps: ["飞抵清迈或清莱机场。", "打车前往汽车站或预订机场直达包车。", "沿 118 号公路抵达目的地。"]
};

const localZh = {
  icon: "🚐",
  title: "市内公交 / 双条车",
  subtitle: "经济实惠的本地体验",
  desc: "如果您已在清迈或清莱市区，除了长途大巴，还可以体验泰国特色的双条车（Songthaew）或当地小巴前往温泉所在的温巴包县（Wiang Pa Pao）。",
  bullets: [
    "在清迈的瓦洛洛（Warorot）市场或清莱汽车站寻找前往温巴包方向的班车。",
    "票价通常比长途大巴更便宜，但经停站较多，耗时较长。",
    "上车前务必与司机确认是否途径“清莱温泉”。"
  ],
  steps: ["前往市区的公交枢纽或双条车聚集点。", "寻找途经 118 号公路的班车并确认目的地。", "在温泉休息站下车。"]
};

const flightsEn = {
  icon: "✈️",
  title: "Flights & Airport Transfer",
  subtitle: "Domestic & International Arrivals",
  desc: "The closest airports are Chiang Mai International Airport (CNX) and Chiang Rai International Airport (CEI). Overland transfer is required after landing.",
  bullets: [
    "CNX is about 1.5 hours away and offers more flight options.",
    "CEI is about 1 hour away and slightly closer.",
    "Take an airport taxi to the downtown bus terminal, or book a direct private transfer."
  ],
  steps: ["Fly into Chiang Mai or Chiang Rai.", "Take a taxi to the bus terminal or book a direct transfer.", "Arrive via Highway 118."]
};

const localEn = {
  icon: "🚐",
  title: "Local Transit & Songthaew",
  subtitle: "Budget-Friendly Local Experience",
  desc: "If you are already in Chiang Mai or Chiang Rai city, you can take a local mini-bus or a traditional shared taxi (Songthaew) heading towards Wiang Pa Pao district.",
  bullets: [
    "Find buses heading to Wiang Pa Pao at Warorot Market (Chiang Mai) or Chiang Rai Bus Terminal.",
    "Fares are cheaper than intercity buses, but the journey takes longer due to multiple stops.",
    "Always confirm with the driver that they pass by 'Mae Kachan Hot Spring' before boarding."
  ],
  steps: ["Head to the local transit hub.", "Find a vehicle traveling along Highway 118 and confirm the route.", "Get off at the hot spring rest stop."]
};

const flightsTh = {
  icon: "✈️",
  title: "เที่ยวบิน / การเดินทางจากสนามบิน",
  subtitle: "เที่ยวบินภายในประเทศและระหว่างประเทศ",
  desc: "สนามบินที่ใกล้ที่สุดคือสนามบินนานาชาติเชียงใหม่ (CNX) และสนามบินนานาชาติแม่ฟ้าหลวง เชียงราย (CEI) หลังจากนั้นต้องเดินทางต่อด้วยรถยนต์",
  bullets: [
    "สนามบินเชียงใหม่ (CNX) ใช้เวลาเดินทางประมาณ 1.5 ชั่วโมง มีเที่ยวบินให้เลือกเยอะกว่า",
    "สนามบินเชียงราย (CEI) ใช้เวลาประมาณ 1 ชั่วโมง ใกล้กว่าเล็กน้อย",
    "สามารถนั่งแท็กซี่จากสนามบินไปสถานีขนส่ง หรือจองรถรับส่งตรงไปยังน้ำพุร้อนได้"
  ],
  steps: ["บินมาลงที่เชียงใหม่หรือเชียงราย", "นั่งแท็กซี่ไปสถานีขนส่งหรือจองรถรับส่ง", "เดินทางถึงน้ำพุร้อนผ่านทางหลวงหมายเลข 118"]
};

const localTh = {
  icon: "🚐",
  title: "รถเมล์ท้องถิ่น / รถสองแถว",
  subtitle: "สัมผัสวิถีชีวิตท้องถิ่นในราคาสบายกระเป๋า",
  desc: "หากคุณอยู่ในตัวเมืองเชียงใหม่หรือเชียงรายอยู่แล้ว สามารถนั่งรถมินิบัสหรือรถสองแถวท้องถิ่นที่มุ่งหน้าไปยังอำเภอเวียงป่าเป้าได้",
  bullets: [
    "หารถที่มุ่งหน้าไปเวียงป่าเป้าได้ที่กาดวโรรส (เชียงใหม่) หรือสถานีขนส่งเชียงราย",
    "ราคาถูกกว่ารถบัสระหว่างเมือง แต่ใช้เวลาเดินทางนานกว่าเพราะจอดหลายป้าย",
    "สอบถามคนขับก่อนขึ้นรถเสมอว่าผ่าน 'น้ำพุร้อนแม่ขะจาน' หรือไม่"
  ],
  steps: ["ไปที่จุดจอดรถสองแถวหรือคิวรถตู้", "หารถที่วิ่งผ่านเส้นทางหลวงหมายเลข 118", "ลงที่จุดแวะพักน้ำพุร้อน"]
};

data.zh.methods.splice(0, 0, flightsZh);
data.zh.methods.splice(3, 0, localZh);

data.en.methods.splice(0, 0, flightsEn);
data.en.methods.splice(3, 0, localEn);

data.th.methods.splice(0, 0, flightsTh);
data.th.methods.splice(3, 0, localTh);

const newContent = 'export const transportData: Record<string, any> = ' + JSON.stringify(data, null, 2) + ';\n';
fs.writeFileSync('c:/Users/Administrator/Documents/GitHub/maekachanhotspring/src/data/transport.ts', newContent, 'utf8');
console.log('Update complete.');
