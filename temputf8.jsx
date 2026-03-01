/* ================================================================
   ICON SYSTEM â€” Pure SVG, Lucide-style, zero emojis
================================================================ */
const ICON_PATHS = {
  home:     ["M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"],
  grid:     ["M3 3h7v7H3zM14 3h7v7h-7zM14 14h7v7h-7zM3 14h7v7H3z"],
  package:  ["M16.5 9.4l-9-5.2M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z","M3.27 6.96L12 12.01l8.73-5.05","M12 22.08V12"],
  tag:      ["M20.59 13.41l-7.17 7.17a2 2 0 01-2.83 0L2 12V2h10l8.59 8.59a2 2 0 010 2.82z","M7 7h.01"],
  barChart: ["M18 20V10","M12 20V4","M6 20v-6"],
  star:     ["M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"],
  dollar:   ["M12 1v22","M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"],
  settings: ["M12 15a3 3 0 100-6 3 3 0 000 6z","M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z"],
  search:   ["M11 19a8 8 0 100-16 8 8 0 000 16z","M21 21l-4.35-4.35"],
  bell:     ["M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9","M13.73 21a2 2 0 01-3.46 0"],
  user:     ["M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2","M12 11a4 4 0 100-8 4 4 0 000 8z"],
  logOut:   ["M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4","M16 17l5-5-5-5","M21 12H9"],
  shield:   ["M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"],
  trending: ["M23 6L13.5 15.5 8.5 10.5 1 18","M17 6h6v6"],
  menu:     ["M3 12h18","M3 6h18","M3 18h18"],
  sun:      ["M12 17a5 5 0 100-10 5 5 0 000 10z","M12 1v2","M12 21v2","M4.22 4.22l1.42 1.42","M18.36 18.36l1.42 1.42","M1 12h2","M21 12h2","M4.22 19.78l1.42-1.42","M18.36 5.64l1.42-1.42"],
  moon:     ["M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"],
  check:    ["M20 6L9 17l-5-5"],
  checkCircle: ["M22 11.08V12a10 10 0 11-5.93-9.14","M22 4L12 14.01l-3-3"],
  plus:     ["M12 5v14","M5 12h14"],
  edit:     ["M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7","M18.5 2.5a2.12 2.12 0 013 3L12 15l-4 1 1-4 9.5-9.5z"],
  trash:    ["M3 6h18","M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a1 1 0 011-1h4a1 1 0 011 1v2"],
  mail:     ["M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z","M22 6l-10 7L2 6"],
  phone:    ["M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 014.69 12 19.79 19.79 0 011.62 3.38 2 2 0 013.56 1h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L7.91 8.91a16 16 0 006 6l.91-.91a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"],
  key:      ["M21 2l-2 2m-7.61 7.61a5.5 5.5 0 11-7.778 7.778 5.5 5.5 0 017.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4"],
  eye:      ["M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z","M12 15a3 3 0 100-6 3 3 0 000 6z"],
  eyeOff:   ["M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24","M1 1l22 22"],
  alertTri: ["M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z","M12 9v4","M12 17h.01"],
  cpu:      ["M9 3H5a2 2 0 00-2 2v4m6-6h10a2 2 0 012 2v4M9 3v18m0 0h10a2 2 0 002-2V9M9 21H5a2 2 0 01-2-2V9m0 0h18"],
  store:    ["M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z","M3 6h18","M16 10a4 4 0 01-8 0"],
  arrowR:   ["M5 12h14","M12 5l7 7-7 7"],
  zap:      ["M13 2L3 14h9l-1 8 10-12h-9l1-8z"],
  activity: ["M22 12h-4l-3 9L9 3l-3 9H2"],
  layers:   ["M12 2L2 7l10 5 10-5-10-5z","M2 17l10 5 10-5","M2 12l10 5 10-5"],
  award:    ["M12 15a7 7 0 100-14 7 7 0 000 14z","M8.21 13.89L7 23l5-3 5 3-1.21-9.12"],
  filter:   ["M22 3H2l8 9.46V19l4 2v-8.54L22 3z"],
};

function Icon({ name, size = 18, color = "currentColor", strokeWidth = 1.75, fill = "none" }) {
  const paths = ICON_PATHS[name] || ICON_PATHS.grid;
  return (
    <svg
      width={size} height={size} viewBox="0 0 24 24"
      fill={fill} stroke={color}
      strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round"
      style={{ display:"inline-block", flexShrink:0, verticalAlign:"middle" }}
    >
      {paths.map((d, i) => <path key={i} d={d}/>)}
    </svg>
  );
}

/* ================================================================
   DATA
================================================================ */
const PSTATS = [
  {p:"Facebook",genuine:679,complaint:809,fake:39,fr:2.6},
  {p:"Instagram",genuine:628,complaint:756,fake:47,fr:3.3},
  {p:"Meesho",genuine:674,complaint:771,fake:36,fr:2.4},
  {p:"OLX",genuine:639,complaint:822,fake:44,fr:2.9},
  {p:"Quikr",genuine:637,complaint:782,fake:41,fr:2.8},
  {p:"Telegram",genuine:715,complaint:785,fake:34,fr:2.2},
  {p:"WhatsApp",genuine:704,complaint:819,fake:27,fr:1.7},
  {p:"YouTube",genuine:653,complaint:812,fake:47,fr:3.1},
];
const SELLERS = [
  {id:"S1211",sc:100,rt:5.0,rv:2,pl:"YouTube Live",ct:"Lighting",fk:0,co:0,gn:2,dl:8.5},
  {id:"S494",sc:100,rt:5.0,rv:1,pl:"Quikr",ct:"Storage",fk:0,co:0,gn:1,dl:19.0},
  {id:"S1229",sc:96,rt:4.5,rv:4,pl:"Facebook",ct:"Lighting",fk:0,co:0,gn:4,dl:7.8},
  {id:"S1242",sc:94,rt:4.75,rv:4,pl:"Quikr",ct:"Furniture",fk:0,co:0,gn:4,dl:10.5},
  {id:"S1057",sc:92,rt:4.4,rv:5,pl:"Meesho",ct:"Kitchen",fk:0,co:0,gn:5,dl:14.2},
  {id:"S73",sc:92,rt:4.33,rv:6,pl:"Telegram",ct:"Kitchen",fk:0,co:0,gn:6,dl:14.2},
  {id:"S317",sc:91,rt:4.17,rv:6,pl:"Quikr",ct:"Home Decor",fk:0,co:0,gn:6,dl:11.7},
  {id:"S79",sc:90,rt:4.25,rv:8,pl:"WhatsApp",ct:"Home Decor",fk:0,co:1,gn:7,dl:8.8},
  {id:"S1",sc:58,rt:2.4,rv:5,pl:"Facebook",ct:"Kitchen",fk:0,co:3,gn:2,dl:12.0},
  {id:"S10",sc:57,rt:2.86,rv:7,pl:"WhatsApp",ct:"Lighting",fk:0,co:5,gn:2,dl:15.4},
  {id:"S200",sc:42,rt:1.8,rv:18,pl:"Instagram",ct:"Furniture",fk:3,co:12,gn:3,dl:18.0},
  {id:"S305",sc:33,rt:1.2,rv:9,pl:"OLX",ct:"Bedding",fk:2,co:7,gn:0,dl:21.0},
];
const MO=[{m:"Mar",v:520},{m:"Apr",v:680},{m:"May",v:910},{m:"Jun",v:1020},{m:"Jul",v:1150},{m:"Aug",v:1380},{m:"Sep",v:1210},{m:"Oct",v:1440},{m:"Nov",v:1290},{m:"Dec",v:1600},{m:"Jan",v:880},{m:"Feb",v:920}];
const FRAUD=[{name:"Complaint",value:6356,color:"#f59e0b"},{name:"Genuine",value:5329,color:"#10b981"},{name:"Fake",value:315,color:"#f43f5e"}];
const ORDERS=[
  {id:"ORD-001",product:"Wooden Shoe Rack",buyer:"Rahul M.",amount:1299,status:"Delivered",date:"Feb 20",rt:5},
  {id:"ORD-002",product:"LED Strip Lights",buyer:"Priya S.",amount:549,status:"Shipped",date:"Feb 24",rt:null},
  {id:"ORD-003",product:"Kitchen Organiser",buyer:"Amit K.",amount:899,status:"Processing",date:"Feb 26",rt:null},
  {id:"ORD-004",product:"Wall Clock Decor",buyer:"Sneha R.",amount:649,status:"Delivered",date:"Feb 15",rt:4},
  {id:"ORD-005",product:"Bamboo Shelf",buyer:"Vikram P.",amount:1899,status:"Cancelled",date:"Feb 10",rt:null},
  {id:"ORD-006",product:"Cotton Bedsheet",buyer:"Divya L.",amount:749,status:"Delivered",date:"Feb 8",rt:5},
];
const PRODS=[
  {id:"P001",name:"Wooden Shoe Rack",cat:"Storage",price:1299,stock:45,sales:128,rt:4.7,on:true},
  {id:"P002",name:"LED Strip Lights",cat:"Lighting",price:549,stock:12,sales:89,rt:4.3,on:true},
  {id:"P003",name:"Kitchen Organiser",cat:"Kitchen",price:899,stock:0,sales:67,rt:4.1,on:false},
  {id:"P004",name:"Wall Clock",cat:"Home Decor",price:649,stock:33,sales:54,rt:4.5,on:true},
  {id:"P005",name:"Cotton Bedsheet",cat:"Bedding",price:749,stock:8,sales:42,rt:4.8,on:true},
];
const COMP=[{n:"Fake Product",v:817},{n:"Wrong Item",v:816},{n:"Missing Parts",v:811},{n:"Late Delivery",v:802},{n:"Color Mismatch",v:797},{n:"Battery Issue",v:785},{n:"Poor Quality",v:769},{n:"Damaged",v:759}];

/* ================================================================
   HELPERS
================================================================ */
const trustColor = s => s>=80?"#10b981":s>=60?"#f59e0b":s>=40?"#f97316":"#f43f5e";
const trustLabel = s => s>=80?"TRUSTED":s>=60?"MODERATE":s>=40?"RISKY":"DANGER";
const statusColor = {Delivered:"#10b981",Shipped:"#3b82f6",Processing:"#f59e0b",Cancelled:"#f43f5e"};

function Counter({ to }) {
  const [v, setV] = useState(0);
  useEffect(() => {
    const step = to / 60; let n = 0;
    const t = setInterval(() => { n += step; if (n >= to) { setV(to); clearInterval(t); } else setV(Math.floor(n)); }, 16);
    return () => clearInterval(t);
  }, [to]);
  return <>{v.toLocaleString()}</>;
}

function Gauge({ score, size = 130 }) {
  const C = trustColor(score);
  const r = size * 0.38, cx = size / 2, cy = size * 0.6;
  const sw = Math.PI * (score / 100);
  const x2 = cx + r * Math.cos(Math.PI - sw), y2 = cy - r * Math.sin(Math.PI - sw);
  const na = Math.PI * (1 - score / 100);
  const nx = cx + r * 0.74 * Math.cos(na), ny = cy - r * 0.74 * Math.sin(na);
  const gid = `g${score}${size}`;
  return (
    <div style={{ position:"relative", width:size, height:size*0.65, margin:"0 auto" }}>
      <svg width={size} height={size*0.65} viewBox={`0 0 ${size} ${size*0.65}`}>
        <defs>
          <linearGradient id={gid} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor={C} stopOpacity="0.4"/>
            <stop offset="100%" stopColor={C} stopOpacity="1"/>
          </linearGradient>
          <filter id={`gf${score}`}>
            <feGaussianBlur stdDeviation="2" result="blur"/>
            <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
          </filter>
        </defs>
        <path d={`M ${cx-r} ${cy} A ${r} ${r} 0 0 1 ${cx+r} ${cy}`}
          fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth={size*0.07} strokeLinecap="round"/>
        <path d={`M ${cx-r} ${cy} A ${r} ${r} 0 0 1 ${x2} ${y2}`}
          fill="none" stroke={`url(#${gid})`} strokeWidth={size*0.07} strokeLinecap="round"
          filter={`url(#gf${score})`}/>
        <circle cx={cx} cy={cy} r={size*0.042} fill={C}/>
        <line x1={cx} y1={cy} x2={nx} y2={ny} stroke={C} strokeWidth={size*0.025} strokeLinecap="round"/>
      </svg>
      <div style={{ position:"absolute", bottom:2, left:0, right:0, textAlign:"center",
        fontSize:size*0.19, fontWeight:900, color:C, fontFamily:"monospace", letterSpacing:-1 }}>{score}</div>
    </div>
  );
}

/* ================================================================
   GLOBAL STYLES
================================================================ */
function GlobalStyles({ T }) {
  return (
    <style>{`
      @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800;900&family=JetBrains+Mono:wght@400;500;700&display=swap');
      * { box-sizing:border-box; margin:0; padding:0; }
      body { font-family:'Outfit',sans-serif; }
      ::-webkit-scrollbar { width:4px; }
      ::-webkit-scrollbar-track { background:transparent; }
      ::-webkit-scrollbar-thumb { background:${T.border}; border-radius:4px; }
      input, select { font-family:'Outfit',sans-serif; }
      input::placeholder { color:${T.muted}; opacity:0.7; }
      button { font-family:'Outfit',sans-serif; }
      button:active { transform:scale(0.97); }
      @keyframes fadeUp { from{opacity:0;transform:translateY(24px)} to{opacity:1;transform:translateY(0)} }
      @keyframes fadeIn { from{opacity:0} to{opacity:1} }
      @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.35} }
      @keyframes spin { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
      @keyframes float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-18px)} }
      @keyframes floatB { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-12px)} }
      @keyframes orbit { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
      @keyframes orbitR { from{transform:rotate(0deg)} to{transform:rotate(-360deg)} }
      @keyframes shimmer { 0%{opacity:0.5} 50%{opacity:1} 100%{opacity:0.5} }
      @keyframes ripple { 0%{transform:scale(0.8);opacity:0.8} 100%{transform:scale(2.5);opacity:0} }
      @keyframes slideIn { from{opacity:0;transform:translateX(-16px)} to{opacity:1;transform:translateX(0)} }
      @keyframes gradShift { 0%{background-position:0% 50%} 50%{background-position:100% 50%} 100%{background-position:0% 50%} }
      .fu0 { animation:fadeUp 0.55s 0.00s both; }
      .fu1 { animation:fadeUp 0.55s 0.10s both; }
      .fu2 { animation:fadeUp 0.55s 0.20s both; }
      .fu3 { animation:fadeUp 0.55s 0.30s both; }
      .fu4 { animation:fadeUp 0.55s 0.40s both; }
      .fu5 { animation:fadeUp 0.55s 0.50s both; }
      .card { transition:transform 0.22s ease, box-shadow 0.22s ease, border-color 0.22s ease; }
      .card:hover { transform:translateY(-4px); }
      .navbtn { transition:all 0.18s ease; }
      .navbtn:hover { opacity:1 !important; }
      select option { background:${T.surface}; color:${T.text}; }
    `}</style>
  );
}

/* ================================================================
   THEMES
================================================================ */
const DARK = {
  bg:"#080b18", surface:"#0d1124", card:"#111830", border:"#1a2244",
  text:"#e8ecff", muted:"#4a5580", sub:"#7880a8",
  blue:"#4f8eff", purple:"#a855f7", green:"#10b981", red:"#f43f5e", amber:"#f59e0b",
  grad:"linear-gradient(135deg,#4f8eff,#a855f7)",
  gradG:"linear-gradient(135deg,#10b981,#06b6d4)",
  gradR:"linear-gradient(135deg,#f43f5e,#f97316)",
};
const LIGHT = {
  bg:"#f1f4ff", surface:"#ffffff", card:"#eaedff", border:"#d4daff",
  text:"#111535", muted:"#7882b0", sub:"#3d4870",
  blue:"#3b6ff5", purple:"#8b3cf7", green:"#059669", red:"#e11d48", amber:"#d97706",
  grad:"linear-gradient(135deg,#3b6ff5,#8b3cf7)",
  gradG:"linear-gradient(135deg,#059669,#0891b2)",
  gradR:"linear-gradient(135deg,#e11d48,#ea580c)",
};

/* ================================================================
   LOGIN PAGE â€” Big logo, centered, premium animated
================================================================ */
function LoginPage({ onLogin, theme, toggleTheme }) {
  const T = theme==="dark" ? DARK : LIGHT;
  const [mode, setMode] = useState("login");
  const [role, setRole] = useState("customer");
  const [form, setForm] = useState({ name:"", email:"", pass:"", phone:"", shop:"" });
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");
  const [showPass, setShowPass] = useState(false);

  const update = e => { setForm(f => ({...f, [e.target.name]:e.target.value})); setErr(""); };

  const submit = () => {
    if (!form.email || !form.pass) return setErr("Email and password are required.");
    if (mode==="signup" && !form.name) return setErr("Full name is required.");
    if (mode==="signup" && role==="seller" && !form.shop) return setErr("Shop name is required.");
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      onLogin(role, { name: form.name||"Demo User", email: form.email, shopName: form.shop||"My Shop", phone: form.phone });
    }, 1400);
  };

  const googleLogin = () => {
    setLoading(true);
    setTimeout(() => { setLoading(false); onLogin(role, { name:"Demo User", email:"demo@gmail.com", shopName:"Demo Shop" }); }, 1000);
  };

  const isDark = theme === "dark";

  const inputStyle = {
    width:"100%", padding:"12px 16px 12px 46px",
    background: isDark ? "rgba(255,255,255,0.04)" : "rgba(59,111,245,0.05)",
    border: `1.5px solid ${T.border}`,
    borderRadius:12, color:T.text, fontSize:14,
    outline:"none", transition:"border-color 0.2s, box-shadow 0.2s",
    fontFamily:"Outfit,sans-serif",
  };

  return (
    <div style={{ minHeight:"100vh", background:T.bg, display:"flex", fontFamily:"Outfit,sans-serif", overflow:"hidden", position:"relative" }}>
      <GlobalStyles T={T}/>

      {/* Animated mesh background */}
      <div style={{ position:"fixed", inset:0, pointerEvents:"none", zIndex:0, overflow:"hidden" }}>
        {/* Big glowing orbs */}
        <div style={{ position:"absolute", width:700, height:700, borderRadius:"50%", top:"-20%", left:"-15%",
          background: isDark ? "radial-gradient(circle,rgba(79,142,255,0.12) 0%,transparent 65%)" : "radial-gradient(circle,rgba(59,111,245,0.10) 0%,transparent 65%)",
          animation:"float 10s ease-in-out infinite" }}/>
        <div style={{ position:"absolute", width:600, height:600, borderRadius:"50%", bottom:"-15%", right:"-10%",
          background: isDark ? "radial-gradient(circle,rgba(168,85,247,0.12) 0%,transparent 65%)" : "radial-gradient(circle,rgba(139,60,247,0.10) 0%,transparent 65%)",
          animation:"floatB 12s 2s ease-in-out infinite" }}/>
        <div style={{ position:"absolute", width:400, height:400, borderRadius:"50%", top:"40%", right:"30%",
          background: isDark ? "radial-gradient(circle,rgba(16,185,129,0.07) 0%,transparent 65%)" : "radial-gradient(circle,rgba(5,150,105,0.07) 0%,transparent 65%)",
          animation:"float 15s 1s ease-in-out infinite" }}/>
        {/* Dot grid */}
        <svg style={{ position:"absolute", inset:0, width:"100%", height:"100%", opacity:isDark?0.04:0.08 }}>
          <defs>
            <pattern id="dots" width="28" height="28" patternUnits="userSpaceOnUse">
              <circle cx="1" cy="1" r="1" fill={isDark?"#fff":"#4f8eff"}/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#dots)"/>
        </svg>
      </div>

      {/* â”€â”€ LEFT: LOGO + BRANDING â”€â”€ */}
      <div style={{
        flex:"0 0 46%", display:"flex", flexDirection:"column",
        alignItems:"center", justifyContent:"center",
        padding:"48px 52px", position:"relative", zIndex:1
      }}>
        {/* Spinning orbit rings behind logo */}
        <div style={{ position:"relative", display:"flex", flexDirection:"column", alignItems:"center", marginBottom:32 }} className="fu0">
          {/* Orbit rings */}
          <div style={{ position:"absolute", width:260, height:260, borderRadius:"50%", border:`1px solid ${T.blue}20`, animation:"orbit 18s linear infinite", pointerEvents:"none" }}/>
          <div style={{ position:"absolute", width:320, height:320, borderRadius:"50%", border:`1px dashed ${T.purple}15`, animation:"orbitR 25s linear infinite", pointerEvents:"none" }}/>
          <div style={{ position:"absolute", width:200, height:200, borderRadius:"50%", border:`1px solid ${T.green}18`, animation:"orbit 30s 2s linear infinite", pointerEvents:"none" }}/>

          {/* Ripple effect */}
          <div style={{ position:"absolute", width:180, height:180, borderRadius:"50%", background:`${T.blue}08`, animation:"ripple 3s 0s ease-out infinite", pointerEvents:"none" }}/>
          <div style={{ position:"absolute", width:180, height:180, borderRadius:"50%", background:`${T.blue}06`, animation:"ripple 3s 1s ease-out infinite", pointerEvents:"none" }}/>

          {/* THE BIG LOGO */}
          <div style={{
            width:185, height:185, borderRadius:"50%", position:"relative",
            display:"flex", alignItems:"center", justifyContent:"center",
            background: isDark
              ? "radial-gradient(circle at 40% 35%, #1a2560, #0d1124)"
              : "radial-gradient(circle at 40% 35%, #e8ecff, #ffffff)",
            boxShadow: isDark
              ? `0 0 0 2px ${T.blue}30, 0 0 60px ${T.blue}30, 0 0 120px ${T.purple}18, 0 30px 80px rgba(0,0,0,0.5)`
              : `0 0 0 2px ${T.blue}20, 0 0 40px ${T.blue}20, 0 0 80px ${T.purple}10, 0 20px 50px rgba(0,0,0,0.1)`,
            zIndex:1,
          }}>
            <img
              src={LOGO_SRC} alt="ScoreShield"
              style={{ width:138, height:138, objectFit:"contain",
                filter: isDark ? "drop-shadow(0 0 20px rgba(79,142,255,0.55)) brightness(1.05)" : "drop-shadow(0 4px 12px rgba(59,111,245,0.3))",
                animation:"shimmer 4s ease-in-out infinite" }}
            />
            {/* Live dot */}
            <div style={{ position:"absolute", top:12, right:12, width:18, height:18, borderRadius:"50%",
              background:T.green, boxShadow:`0 0 0 3px ${isDark?"#0d1124":"#fff"}, 0 0 14px ${T.green}`,
              animation:"pulse 2s ease-in-out infinite" }}/>
          </div>

          {/* Floating mini icons around logo */}
          {[
            { icon:"shield", angle:0,   dist:115, color:T.blue   },
            { icon:"zap",    angle:72,  dist:115, color:T.amber  },
            { icon:"check",  angle:144, dist:115, color:T.green  },
            { icon:"layers", angle:216, dist:115, color:T.purple },
            { icon:"activity",angle:288,dist:115, color:T.red    },
          ].map(({icon,angle,dist,color},i) => {
            const rad = (angle * Math.PI) / 180;
            const x = Math.cos(rad) * dist;
            const y = Math.sin(rad) * dist;
            return (
              <div key={i} style={{
                position:"absolute",
                left:"50%", top:"50%",
                transform:`translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`,
                width:36, height:36, borderRadius:10,
                background: isDark ? `${color}18` : `${color}12`,
                border:`1px solid ${color}30`,
                display:"flex", alignItems:"center", justifyContent:"center",
                animation:`float ${8+i}s ${i*0.7}s ease-in-out infinite`,
                backdropFilter:"blur(8px)",
              }}>
                <Icon name={icon} size={16} color={color} strokeWidth={2}/>
              </div>
            );
          })}
        </div>

        {/* Brand name */}
        <div className="fu1" style={{ textAlign:"center", marginBottom:28 }}>
          <h1 style={{ fontSize:50, fontWeight:900, letterSpacing:-2.5, lineHeight:1, marginBottom:10 }}>
            <span style={{ color:T.text }}>Score</span>
            <span style={{ background:T.grad, WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent",
              backgroundSize:"200% 200%", animation:"gradShift 4s ease infinite" }}>Shield</span>
          </h1>
          <p style={{ fontSize:14, color:T.sub, lineHeight:1.75, maxWidth:300, margin:"0 auto" }}>
            AI-powered seller trust verification across social commerce platforms in India
          </p>
        </div>

        {/* Feature cards */}
        <div className="fu2" style={{ display:"flex", flexDirection:"column", gap:10, width:"100%", maxWidth:330 }}>
          {[
            { icon:"shield",   label:"Real-time fraud detection",    col:T.blue,   bg:"#4f8eff" },
            { icon:"activity", label:"XGBoost + NLP trust scoring",  col:T.purple, bg:"#a855f7" },
            { icon:"award",    label:"12K+ reviews Â· 8 platforms",   col:T.green,  bg:"#10b981" },
          ].map((f,i) => (
            <div key={i} style={{
              display:"flex", alignItems:"center", gap:13, padding:"12px 16px",
              background: isDark ? "rgba(255,255,255,0.03)" : "rgba(59,111,245,0.04)",
              border:`1px solid ${f.bg}20`, borderRadius:14,
              backdropFilter:"blur(12px)", animation:`slideIn 0.4s ${0.1+i*0.1}s both`,
            }}>
              <div style={{ width:36, height:36, borderRadius:10, background:`${f.bg}20`, border:`1px solid ${f.bg}30`,
                display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
                <Icon name={f.icon} size={17} color={f.col} strokeWidth={2}/>
              </div>
              <span style={{ fontSize:13, color:T.sub, fontWeight:500 }}>{f.label}</span>
            </div>
          ))}
        </div>

        {/* Theme toggle */}
        <button className="fu3" onClick={toggleTheme} style={{
          marginTop:28, background:"transparent", border:`1.5px solid ${T.border}`,
          borderRadius:10, padding:"8px 16px", cursor:"pointer", color:T.sub, fontSize:13,
          display:"flex", alignItems:"center", gap:8, transition:"all 0.2s",
        }}
          onMouseEnter={e=>{e.currentTarget.style.borderColor=T.blue;e.currentTarget.style.color=T.blue;}}
          onMouseLeave={e=>{e.currentTarget.style.borderColor=T.border;e.currentTarget.style.color=T.sub;}}>
          <Icon name={theme==="dark"?"sun":"moon"} size={15} color="currentColor" strokeWidth={1.8}/>
          {theme==="dark" ? "Light Mode" : "Dark Mode"}
        </button>
      </div>

      {/* â”€â”€ RIGHT: FORM â”€â”€ */}
      <div style={{ flex:1, display:"flex", alignItems:"center", justifyContent:"center",
        padding:"32px 48px", overflowY:"auto", position:"relative", zIndex:1 }}>
        <div style={{ width:"100%", maxWidth:430 }}>

          <div className="fu0" style={{ marginBottom:28 }}>
            <h2 style={{ fontSize:28, fontWeight:800, color:T.text, letterSpacing:-0.8, marginBottom:6 }}>
              {mode==="login" ? "Welcome back" : "Create your account"}
            </h2>
            <p style={{ fontSize:14, color:T.muted }}>
              {mode==="login" ? "Sign in to your ScoreShield dashboard" : `Register as a ${role} â€” it's free`}
            </p>
          </div>

          {/* Role tabs */}
          <div className="fu1" style={{ display:"flex", background:T.card, borderRadius:14, padding:5, marginBottom:22, border:`1px solid ${T.border}` }}>
            {[{r:"customer",icon:"store",label:"Customer"},{r:"seller",icon:"tag",label:"Seller"}].map(({r,icon,label})=>(
              <button key={r} onClick={()=>setRole(r)} style={{
                flex:1, display:"flex", alignItems:"center", justifyContent:"center", gap:8,
                padding:"10px 8px", borderRadius:10, border:"none", cursor:"pointer", fontFamily:"inherit",
                fontWeight:700, fontSize:13, transition:"all 0.25s",
                background: role===r ? T.grad : "transparent",
                color: role===r ? "#fff" : T.muted,
                boxShadow: role===r ? `0 4px 18px ${T.blue}40` : "none",
              }}>
                <Icon name={icon} size={15} color={role===r?"#fff":T.muted} strokeWidth={2}/>
                {label}
              </button>
            ))}
          </div>

          {/* Sign in / up tabs */}
          <div className="fu1" style={{ display:"flex", borderBottom:`2px solid ${T.border}`, marginBottom:22 }}>
            {["login","signup"].map(m=>(
              <button key={m} onClick={()=>setMode(m)} style={{
                flex:1, padding:"10px", border:"none", background:"transparent", fontFamily:"inherit",
                fontWeight:600, fontSize:14, cursor:"pointer", transition:"all 0.2s",
                color: mode===m ? T.blue : T.muted,
                borderBottom: mode===m ? `2px solid ${T.blue}` : "2px solid transparent",
                marginBottom:-2,
              }}>
                {m==="login" ? "Sign In" : "Sign Up"}
              </button>
            ))}
          </div>

          {/* Google button */}
          <button className="fu2" onClick={googleLogin} style={{
            width:"100%", background:T.surface, border:`1.5px solid ${T.border}`,
            borderRadius:13, padding:"13px 16px", fontFamily:"inherit",
            fontWeight:600, fontSize:14, cursor:"pointer", color:T.text,
            display:"flex", alignItems:"center", justifyContent:"center", gap:10,
            marginBottom:18, transition:"all 0.2s",
          }}
            onMouseEnter={e=>{e.currentTarget.style.borderColor=T.blue;e.currentTarget.style.boxShadow=`0 4px 20px ${T.blue}22`;}}
            onMouseLeave={e=>{e.currentTarget.style.borderColor=T.border;e.currentTarget.style.boxShadow="none";}}>
            <svg width="18" height="18" viewBox="0 0 48 48">
              <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
              <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
              <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
              <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.18 1.48-4.97 2.36-8.16 2.36-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
            </svg>
            Continue with Google
          </button>

          <div style={{ display:"flex", alignItems:"center", gap:12, marginBottom:18 }}>
            <div style={{ flex:1, height:1, background:T.border }}/>
            <span style={{ fontSize:12, color:T.muted, fontWeight:500 }}>or continue with email</span>
            <div style={{ flex:1, height:1, background:T.border }}/>
          </div>

          {/* Form inputs */}
          <div className="fu3" style={{ display:"flex", flexDirection:"column", gap:13 }}>
            {mode==="signup" && (
              <div style={{ position:"relative" }}>
                <div style={{ position:"absolute", left:14, top:"50%", transform:"translateY(-50%)", pointerEvents:"none", zIndex:1 }}>
                  <Icon name="user" size={17} color={T.muted} strokeWidth={1.8}/>
                </div>
                <input name="name" value={form.name} onChange={update} placeholder="Full Name *" style={inputStyle}
                  onFocus={e=>{e.target.style.borderColor=T.blue;e.target.style.boxShadow=`0 0 0 3px ${T.blue}22`;}}
                  onBlur={e=>{e.target.style.borderColor=T.border;e.target.style.boxShadow="none";}}/>
              </div>
            )}
            {mode==="signup" && role==="seller" && (
              <div style={{ position:"relative" }}>
                <div style={{ position:"absolute", left:14, top:"50%", transform:"translateY(-50%)", pointerEvents:"none", zIndex:1 }}>
                  <Icon name="store" size={17} color={T.muted} strokeWidth={1.8}/>
                </div>
                <input name="shop" value={form.shop} onChange={update} placeholder="Shop / Business Name *" style={inputStyle}
                  onFocus={e=>{e.target.style.borderColor=T.blue;e.target.style.boxShadow=`0 0 0 3px ${T.blue}22`;}}
                  onBlur={e=>{e.target.style.borderColor=T.border;e.target.style.boxShadow="none";}}/>
              </div>
            )}
            <div style={{ position:"relative" }}>
              <div style={{ position:"absolute", left:14, top:"50%", transform:"translateY(-50%)", pointerEvents:"none", zIndex:1 }}>
                <Icon name="mail" size={17} color={T.muted} strokeWidth={1.8}/>
              </div>
              <input name="email" type="email" value={form.email} onChange={update} placeholder="Email address *" style={inputStyle}
                onFocus={e=>{e.target.style.borderColor=T.blue;e.target.style.boxShadow=`0 0 0 3px ${T.blue}22`;}}
                onBlur={e=>{e.target.style.borderColor=T.border;e.target.style.boxShadow="none";}}/>
            </div>
            <div style={{ position:"relative" }}>
              <div style={{ position:"absolute", left:14, top:"50%", transform:"translateY(-50%)", pointerEvents:"none", zIndex:1 }}>
                <Icon name="key" size={17} color={T.muted} strokeWidth={1.8}/>
              </div>
              <input name="pass" type={showPass?"text":"password"} value={form.pass} onChange={update}
                placeholder="Password *" style={{...inputStyle, paddingRight:48}}
                onFocus={e=>{e.target.style.borderColor=T.blue;e.target.style.boxShadow=`0 0 0 3px ${T.blue}22`;}}
                onBlur={e=>{e.target.style.borderColor=T.border;e.target.style.boxShadow="none";}}/>
              <button onClick={()=>setShowPass(!showPass)} style={{
                position:"absolute", right:14, top:"50%", transform:"translateY(-50%)",
                background:"none", border:"none", cursor:"pointer", color:T.muted, padding:0, zIndex:1,
              }}>
                <Icon name={showPass?"eyeOff":"eye"} size={17} color={T.muted} strokeWidth={1.8}/>
              </button>
            </div>
            {mode==="signup" && (
              <div style={{ position:"relative" }}>
                <div style={{ position:"absolute", left:14, top:"50%", transform:"translateY(-50%)", pointerEvents:"none", zIndex:1 }}>
                  <Icon name="phone" size={17} color={T.muted} strokeWidth={1.8}/>
                </div>
                <input name="phone" type="tel" value={form.phone} onChange={update} placeholder="Phone number (optional)" style={inputStyle}
                  onFocus={e=>{e.target.style.borderColor=T.blue;e.target.style.boxShadow=`0 0 0 3px ${T.blue}22`;}}
                  onBlur={e=>{e.target.style.borderColor=T.border;e.target.style.boxShadow="none";}}/>
              </div>
            )}
          </div>

          {mode==="login" && (
            <div style={{ textAlign:"right", marginTop:8, marginBottom:4 }}>
              <span style={{ fontSize:13, color:T.blue, cursor:"pointer", fontWeight:600 }}>Forgot password?</span>
            </div>
          )}

          {err && (
            <div style={{ display:"flex", alignItems:"center", gap:8, marginTop:12,
              background:`${T.red}12`, border:`1px solid ${T.red}30`, borderRadius:10,
              padding:"10px 14px", fontSize:13, color:T.red }}>
              <Icon name="alertTri" size={15} color={T.red} strokeWidth={2}/>
              {err}
            </div>
          )}

          <button className="fu4" onClick={submit} style={{
            width:"100%", marginTop:18, background:T.grad,
            color:"#fff", border:"none", borderRadius:13, padding:"14px 20px",
            fontFamily:"inherit", fontWeight:800, fontSize:15, cursor:loading?"wait":"pointer",
            display:"flex", alignItems:"center", justifyContent:"center", gap:10,
            boxShadow:`0 8px 28px ${T.blue}40`, transition:"all 0.2s",
            opacity:loading?0.85:1, backgroundSize:"200% 200%", animation:"gradShift 4s ease infinite",
          }}>
            {loading ? (
              <><div style={{ width:18, height:18, border:"2px solid rgba(255,255,255,0.3)", borderTopColor:"#fff",
                borderRadius:"50%", animation:"spin 0.7s linear infinite" }}/> Signing in...</>
            ) : (
              <>
                {mode==="login" ? `Sign In as ${role==="customer"?"Customer":"Seller"}` : `Create ${role==="customer"?"Customer":"Seller"} Account`}
                <Icon name="arrowR" size={17} color="#fff" strokeWidth={2.5}/>
              </>
            )}
          </button>

          <p style={{ textAlign:"center", fontSize:13, color:T.muted, marginTop:18 }}>
            {mode==="login" ? "No account yet? " : "Already registered? "}
            <span onClick={()=>setMode(mode==="login"?"signup":"login")}
              style={{ color:T.blue, fontWeight:700, cursor:"pointer" }}>
              {mode==="login" ? "Sign up free â†’" : "Sign in â†’"}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

/* ================================================================
   SIDEBAR + SHELL
================================================================ */
function Shell({ T, theme, toggleTheme, onLogout, nav, active, setActive, topName, topSub, sideExtra, children }) {
  const [open, setOpen] = useState(true);
  return (
    <div style={{ minHeight:"100vh", background:T.bg, display:"flex", fontFamily:"Outfit,sans-serif" }}>
      <GlobalStyles T={T}/>
      {/* Sidebar */}
      <aside style={{ width:open?238:62, flexShrink:0, background:T.surface, borderRight:`1px solid ${T.border}`,
        transition:"width 0.28s cubic-bezier(.4,0,.2,1)", overflow:"hidden", display:"flex", flexDirection:"column",
        position:"relative", zIndex:20 }}>

        {/* Logo row */}
        <div style={{ padding:open?"18px 16px":"16px 12px", borderBottom:`1px solid ${T.border}`,
          display:"flex", alignItems:"center", gap:10, minHeight:65 }}>
          <div style={{ flexShrink:0, width:36, height:36, borderRadius:10, overflow:"hidden",
            background:T.grad, display:"flex", alignItems:"center", justifyContent:"center",
            boxShadow:`0 4px 12px ${T.blue}40` }}>
            <img src={LOGO_SRC} alt="SS" style={{ width:28, height:28, objectFit:"contain" }}/>
          </div>
          {open && (
            <span style={{ fontSize:17, fontWeight:900, letterSpacing:-0.8, whiteSpace:"nowrap",
              background:T.grad, WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent" }}>
              ScoreShield
            </span>
          )}
        </div>

        {/* User info */}
        {open && (
          <div style={{ padding:"14px 16px", borderBottom:`1px solid ${T.border}` }}>
            <div style={{ width:42, height:42, borderRadius:"50%", background:T.grad, marginBottom:9,
              display:"flex", alignItems:"center", justifyContent:"center",
              color:"#fff", fontSize:17, fontWeight:800, boxShadow:`0 4px 14px ${T.blue}40` }}>
              {(topName||"U")[0].toUpperCase()}
            </div>
            <div style={{ fontSize:13, fontWeight:700, color:T.text, marginBottom:1 }}>{topName}</div>
            {sideExtra}
          </div>
        )}

        {/* Nav */}
        <nav style={{ flex:1, padding:"10px 8px", overflowY:"auto" }}>
          {nav.map(n => (
            <button key={n.id} onClick={()=>setActive(n.id)} className="navbtn" style={{
              width:"100%", display:"flex", alignItems:"center", gap:11,
              padding:open?"10px 12px":"11px", borderRadius:11, border:"none",
              cursor:"pointer", fontFamily:"inherit", marginBottom:3,
              background: active===n.id ? `${n.c}18` : "transparent",
              color: active===n.id ? n.c : T.muted,
              fontWeight: active===n.id ? 700 : 500, fontSize:13,
              justifyContent:open?"flex-start":"center",
              borderLeft: active===n.id ? `3px solid ${n.c}` : "3px solid transparent",
              transition:"all 0.18s",
            }}
              onMouseEnter={e=>{ if(active!==n.id){e.currentTarget.style.background=`${n.c}10`;e.currentTarget.style.color=n.c;} }}
              onMouseLeave={e=>{ if(active!==n.id){e.currentTarget.style.background="transparent";e.currentTarget.style.color=T.muted;} }}>
              <Icon name={n.ic} size={18} color={active===n.id?n.c:T.muted} strokeWidth={active===n.id?2.2:1.8}/>
              {open && n.label}
              {open && active===n.id && (
                <div style={{ marginLeft:"auto", width:6, height:6, borderRadius:"50%", background:n.c, boxShadow:`0 0 8px ${n.c}` }}/>
              )}
            </button>
          ))}
        </nav>

        <div style={{ padding:"8px", borderTop:`1px solid ${T.border}` }}>
          <button onClick={onLogout} style={{
            width:"100%", background:`${T.red}12`, color:T.red,
            border:`1px solid ${T.red}25`, borderRadius:10,
            padding:open?"9px 13px":"10px", cursor:"pointer", fontFamily:"inherit",
            fontSize:12, fontWeight:600, display:"flex", alignItems:"center",
            justifyContent:open?"flex-start":"center", gap:8, transition:"all 0.2s",
          }}
            onMouseEnter={e=>e.currentTarget.style.background=`${T.red}22`}
            onMouseLeave={e=>e.currentTarget.style.background=`${T.red}12`}>
            <Icon name="logOut" size={16} color={T.red} strokeWidth={2}/>
            {open && "Logout"}
          </button>
        </div>
      </aside>

      {/* Main area */}
      <div style={{ flex:1, display:"flex", flexDirection:"column", minWidth:0, overflow:"hidden" }}>
        {/* Topbar */}
        <div style={{ background:T.surface, borderBottom:`1px solid ${T.border}`, height:60,
          display:"flex", alignItems:"center", justifyContent:"space-between",
          padding:"0 24px", position:"sticky", top:0, zIndex:10, flexShrink:0 }}>
          <div style={{ display:"flex", alignItems:"center", gap:12 }}>
            <button onClick={()=>setOpen(!open)} style={{
              background:T.card, border:`1px solid ${T.border}`, borderRadius:9,
              width:34, height:34, display:"flex", alignItems:"center", justifyContent:"center",
              cursor:"pointer", transition:"all 0.18s",
            }}
              onMouseEnter={e=>{e.currentTarget.style.borderColor=T.blue;}}
              onMouseLeave={e=>{e.currentTarget.style.borderColor=T.border;}}>
              <Icon name="menu" size={16} color={T.muted} strokeWidth={1.8}/>
            </button>
            <div>
              <div style={{ fontSize:15, fontWeight:700, color:T.text }}>
                {nav.find(n=>n.id===active)?.label}
              </div>
              <div style={{ fontSize:11, color:T.muted }}>{topSub}</div>
            </div>
          </div>
          <div style={{ display:"flex", alignItems:"center", gap:10 }}>
            <button onClick={toggleTheme} style={{
              background:T.card, border:`1px solid ${T.border}`, borderRadius:9,
              padding:"7px 13px", cursor:"pointer", color:T.sub, fontSize:13,
              fontFamily:"inherit", display:"flex", alignItems:"center", gap:7, transition:"all 0.2s",
            }}
              onMouseEnter={e=>{e.currentTarget.style.borderColor=T.blue;e.currentTarget.style.color=T.blue;}}
              onMouseLeave={e=>{e.currentTarget.style.borderColor=T.border;e.currentTarget.style.color=T.sub;}}>
              <Icon name={theme==="dark"?"sun":"moon"} size={15} color="currentColor" strokeWidth={1.8}/>
              {theme==="dark"?"Light":"Dark"}
            </button>
            <div style={{ width:34, height:34, borderRadius:"50%", background:T.grad,
              display:"flex", alignItems:"center", justifyContent:"center",
              color:"#fff", fontSize:14, fontWeight:800, boxShadow:`0 4px 12px ${T.blue}40`, cursor:"pointer" }}>
              {(topName||"U")[0].toUpperCase()}
            </div>
          </div>
        </div>

        <div style={{ flex:1, overflowY:"auto", padding:24 }} key={active}>
          <div className="fu0">{children}</div>
        </div>
      </div>
    </div>
  );
}

/* â”€â”€ Reusable components â”€â”€ */
function KCard({ label, value, icon, color, sub, T }) {
  return (
    <div className="card" style={{ background:T.surface, border:`1px solid ${T.border}`, borderRadius:16,
      padding:"18px 16px", position:"relative", overflow:"hidden", cursor:"default" }}>
      <div style={{ position:"absolute", top:0, left:0, right:0, height:3,
        background:`linear-gradient(90deg,${color},${color}55)` }}/>
      <div style={{ position:"absolute", right:-15, top:-15, width:75, height:75,
        borderRadius:"50%", background:`${color}08` }}/>
      <div style={{ width:40, height:40, borderRadius:11, background:`${color}18`,
        border:`1px solid ${color}28`, display:"flex", alignItems:"center",
        justifyContent:"center", marginBottom:13 }}>
        <Icon name={icon} size={19} color={color} strokeWidth={2}/>
      </div>
      <div style={{ fontSize:22, fontWeight:900, color:T.text,
        fontFamily:"JetBrains Mono,monospace", marginBottom:3 }}>{value}</div>
      <div style={{ fontSize:11, color:T.muted }}>{label}</div>
      {sub && <div style={{ fontSize:11, color:T.green, fontWeight:600, marginTop:3 }}>{sub}</div>}
    </div>
  );
}

function Box({ title, icon, color, T, children }) {
  return (
    <div style={{ background:T.surface, border:`1px solid ${T.border}`, borderRadius:16, padding:20 }}>
      <div style={{ fontSize:14, fontWeight:700, color:T.text, marginBottom:14,
        display:"flex", alignItems:"center", gap:9 }}>
        <div style={{ width:30, height:30, borderRadius:9, background:`${color}18`,
          display:"flex", alignItems:"center", justifyContent:"center" }}>
          <Icon name={icon} size={15} color={color} strokeWidth={2}/>
        </div>
        {title}
      </div>
      {children}
    </div>
  );
}

const ttStyle = T => ({ contentStyle:{ background:T.surface, border:`1px solid ${T.border}`,
  borderRadius:10, fontSize:11, color:T.text, fontFamily:"Outfit,sans-serif" } });

/* ================================================================
   SELLER DASHBOARD
================================================================ */
function SellerDash({ user, onLogout, theme, toggleTheme }) {
  const T = theme==="dark" ? DARK : LIGHT;
  const [tab, setTab] = useState("overview");
  const trust = 87;
  const rev = ORDERS.filter(o=>o.status==="Delivered").reduce((s,o)=>s+o.amount,0);

  const nav = [
    {id:"overview", ic:"grid",    label:"Overview",        c:T.blue},
    {id:"orders",   ic:"package", label:"Orders",          c:T.purple},
    {id:"products", ic:"tag",     label:"Products",        c:T.amber},
    {id:"analytics",ic:"barChart",label:"Analytics",       c:T.green},
    {id:"reviews",  ic:"star",    label:"Reviews & Trust", c:T.red},
    {id:"payments", ic:"dollar",  label:"Payments",        c:"#10b981"},
    {id:"settings", ic:"settings",label:"Settings",        c:T.muted},
  ];

  return (
    <Shell T={T} theme={theme} toggleTheme={toggleTheme} onLogout={onLogout}
      nav={nav} active={tab} setActive={setTab}
      topName={user?.shopName||"My Shop"} topSub="Seller Dashboard"
      sideExtra={
        <div style={{ display:"flex", alignItems:"center", gap:6, padding:"5px 9px",
          background:`${T.green}12`, border:`1px solid ${T.green}22`, borderRadius:7, marginTop:6 }}>
          <div style={{ width:7,height:7,borderRadius:"50%",background:T.green,animation:"pulse 2s infinite" }}/>
          <span style={{ fontSize:11, color:T.green, fontWeight:700 }}>Trust: {trust}/100</span>
        </div>
      }>

      {/* OVERVIEW */}
      {tab==="overview" && (
        <div>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(155px,1fr))", gap:14, marginBottom:22 }}>
            <KCard T={T} label="Total Revenue" value={`â‚¹${rev.toLocaleString()}`} icon="dollar" color={T.green} sub="â†‘ +12% this month"/>
            <KCard T={T} label="Orders" value={ORDERS.length} icon="package" color={T.blue} sub="2 pending"/>
            <KCard T={T} label="Products" value={PRODS.length} icon="tag" color={T.amber} sub="1 out of stock"/>
            <KCard T={T} label="Trust Score" value={`${trust}/100`} icon="shield" color={T.purple} sub="TRUSTED"/>
            <KCard T={T} label="Avg Rating" value="4.6/5" icon="star" color={T.red} sub="23 reviews"/>
          </div>
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:16 }}>
            <Box T={T} title="Review Volume Trend" icon="trending" color={T.blue}>
              <ResponsiveContainer width="100%" height={180}>
                <AreaChart data={MO}>
                  <defs><linearGradient id="ag1" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor={T.blue} stopOpacity={0.35}/><stop offset="95%" stopColor={T.blue} stopOpacity={0}/></linearGradient></defs>
                  <CartesianGrid strokeDasharray="3 3" stroke={T.border}/>
                  <XAxis dataKey="m" tick={{fill:T.muted,fontSize:9}}/><YAxis tick={{fill:T.muted,fontSize:9}}/>
                  <Tooltip {...ttStyle(T)}/><Area type="monotone" dataKey="v" stroke={T.blue} fill="url(#ag1)" strokeWidth={2.5} name="Reviews"/>
                </AreaChart>
              </ResponsiveContainer>
            </Box>
            <Box T={T} title="Recent Orders" icon="package" color={T.purple}>
              {ORDERS.slice(0,5).map(o=>(
                <div key={o.id} style={{ display:"flex", justifyContent:"space-between", alignItems:"center", padding:"9px 0", borderBottom:`1px solid ${T.border}` }}>
                  <div>
                    <div style={{ fontSize:12, fontWeight:600, color:T.text }}>{o.product}</div>
                    <div style={{ fontSize:10, color:T.muted, fontFamily:"JetBrains Mono,monospace" }}>{o.id}</div>
                  </div>
                  <div style={{ textAlign:"right" }}>
                    <div style={{ fontSize:13, fontWeight:700, color:T.text }}>â‚¹{o.amount}</div>
                    <span style={{ fontSize:9, padding:"2px 7px", borderRadius:5,
                      background:`${statusColor[o.status]}18`, color:statusColor[o.status],
                      fontWeight:700, border:`1px solid ${statusColor[o.status]}28` }}>{o.status}</span>
                  </div>
                </div>
              ))}
            </Box>
          </div>
        </div>
      )}

      {/* ORDERS */}
      {tab==="orders" && (
        <div style={{ background:T.surface, border:`1px solid ${T.border}`, borderRadius:16, overflow:"hidden" }}>
          <div style={{ padding:"16px 20px", borderBottom:`1px solid ${T.border}`, display:"flex", justifyContent:"space-between", alignItems:"center" }}>
            <div style={{ display:"flex", alignItems:"center", gap:10 }}>
              <div style={{ width:36,height:36,borderRadius:10,background:`${T.purple}18`,display:"flex",alignItems:"center",justifyContent:"center" }}>
                <Icon name="package" size={18} color={T.purple} strokeWidth={2}/>
              </div>
              <span style={{ fontSize:15, fontWeight:700, color:T.text }}>All Orders <span style={{ fontSize:12, color:T.muted, fontWeight:400 }}>({ORDERS.length})</span></span>
            </div>
            <select style={{ background:T.card, border:`1px solid ${T.border}`, borderRadius:9, padding:"7px 12px", color:T.text, fontSize:12, fontFamily:"inherit", cursor:"pointer", outline:"none" }}>
              <option>All Status</option><option>Delivered</option><option>Shipped</option><option>Processing</option>
            </select>
          </div>
          <div style={{ overflowX:"auto" }}>
            <table style={{ width:"100%", borderCollapse:"collapse" }}>
              <thead><tr style={{ background:T.card }}>
                {["Order ID","Product","Buyer","Amount","Date","Status","Rating"].map(h=>(
                  <th key={h} style={{ padding:"10px 16px", textAlign:"left", fontSize:10, fontWeight:700, color:T.muted, textTransform:"uppercase", letterSpacing:1 }}>{h}</th>
                ))}
              </tr></thead>
              <tbody>
                {ORDERS.map(o=>(
                  <tr key={o.id} style={{ borderBottom:`1px solid ${T.border}`, transition:"background 0.15s" }}
                    onMouseEnter={e=>e.currentTarget.style.background=`${T.blue}06`}
                    onMouseLeave={e=>e.currentTarget.style.background="transparent"}>
                    <td style={{ padding:"11px 16px", fontSize:11, fontFamily:"JetBrains Mono,monospace", color:T.blue }}>{o.id}</td>
                    <td style={{ padding:"11px 16px", fontSize:12, color:T.text, fontWeight:500 }}>{o.product}</td>
                    <td style={{ padding:"11px 16px", fontSize:12, color:T.sub }}>{o.buyer}</td>
                    <td style={{ padding:"11px 16px", fontSize:13, fontWeight:700, color:T.text }}>â‚¹{o.amount}</td>
                    <td style={{ padding:"11px 16px", fontSize:11, color:T.muted }}>{o.date}</td>
                    <td style={{ padding:"11px 16px" }}>
                      <span style={{ fontSize:10, padding:"3px 9px", borderRadius:6, background:`${statusColor[o.status]}18`, color:statusColor[o.status], fontWeight:700, border:`1px solid ${statusColor[o.status]}28` }}>{o.status}</span>
                    </td>
                    <td style={{ padding:"11px 16px" }}>
                      {o.rt ? <div style={{ display:"flex", gap:1 }}>{[1,2,3,4,5].map(s=><Icon key={s} name="star" size={11} color={s<=o.rt?T.amber:T.border} strokeWidth={s<=o.rt?0:1.5}/>)}</div> : <span style={{ color:T.muted }}>â€”</span>}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* PRODUCTS */}
      {tab==="products" && (
        <div>
          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:18 }}>
            <div><div style={{ fontSize:15, fontWeight:700, color:T.text }}>My Products</div><div style={{ fontSize:12, color:T.muted }}>5 items</div></div>
            <button style={{ background:T.grad, color:"#fff", border:"none", borderRadius:11, padding:"10px 18px",
              fontWeight:700, fontSize:13, cursor:"pointer", fontFamily:"inherit",
              display:"flex", alignItems:"center", gap:7, boxShadow:`0 4px 16px ${T.blue}35` }}>
              <Icon name="plus" size={15} color="#fff" strokeWidth={2.5}/>Add Product
            </button>
          </div>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(210px,1fr))", gap:14 }}>
            {PRODS.map(p=>(
              <div key={p.id} className="card" style={{ background:T.surface, border:`1px solid ${T.border}`, borderRadius:16, padding:18, position:"relative" }}>
                <div style={{ position:"absolute", top:0, left:0, right:0, height:3,
                  background:p.on ? T.grad : `${T.red}60`, borderRadius:"16px 16px 0 0" }}/>
                <div style={{ position:"absolute", top:14, right:14, fontSize:9, padding:"3px 8px",
                  borderRadius:6, background:p.on?`${T.green}14`:`${T.red}14`,
                  color:p.on?T.green:T.red, fontWeight:700, border:`1px solid ${p.on?T.green:T.red}25`,
                  display:"flex", alignItems:"center", gap:4 }}>
                  <div style={{ width:5,height:5,borderRadius:"50%",background:p.on?T.green:T.red }}/>
                  {p.on?"ACTIVE":"INACTIVE"}
                </div>
                <div style={{ width:50,height:50,borderRadius:13,background:`${T.blue}15`,border:`1px solid ${T.blue}20`,
                  display:"flex",alignItems:"center",justifyContent:"center",marginBottom:12 }}>
                  <Icon name="tag" size={24} color={T.blue} strokeWidth={1.8}/>
                </div>
                <div style={{ fontSize:14, fontWeight:700, color:T.text, marginBottom:2 }}>{p.name}</div>
                <div style={{ fontSize:11, color:T.muted, marginBottom:12 }}>{p.cat}</div>
                <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:7 }}>
                  {[["Price",`â‚¹${p.price}`,T.blue],["Stock",p.stock===0?"Out":p.stock,p.stock===0?T.red:T.text],["Sales",`${p.sales} sold`,T.green],["Rating",`â˜… ${p.rt}`,T.amber]].map(([k,v,c])=>(
                    <div key={k} style={{ background:T.card, borderRadius:9, padding:"7px 9px", border:`1px solid ${T.border}` }}>
                      <div style={{ fontSize:9, color:T.muted, marginBottom:2 }}>{k}</div>
                      <div style={{ fontSize:12, fontWeight:700, color:c }}>{v}</div>
                    </div>
                  ))}
                </div>
                <div style={{ display:"flex", gap:7, marginTop:12 }}>
                  <button style={{ flex:1, background:`${T.blue}12`, color:T.blue, border:`1px solid ${T.blue}22`,
                    borderRadius:8, padding:"7px", fontSize:11, fontWeight:600, cursor:"pointer",
                    display:"flex", alignItems:"center", justifyContent:"center", gap:5, fontFamily:"inherit" }}>
                    <Icon name="edit" size={12} color={T.blue} strokeWidth={2}/>Edit
                  </button>
                  <button style={{ flex:1, background:`${T.red}10`, color:T.red, border:`1px solid ${T.red}20`,
                    borderRadius:8, padding:"7px", fontSize:11, fontWeight:600, cursor:"pointer",
                    display:"flex", alignItems:"center", justifyContent:"center", gap:5, fontFamily:"inherit" }}>
                    <Icon name="trash" size={12} color={T.red} strokeWidth={2}/>Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ANALYTICS */}
      {tab==="analytics" && (
        <div>
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:16, marginBottom:16 }}>
            <Box T={T} title="Review Distribution" icon="barChart" color={T.blue}>
              <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                  <Pie data={FRAUD} cx="50%" cy="50%" innerRadius={52} outerRadius={84} dataKey="value" paddingAngle={4}>
                    {FRAUD.map((e,i)=><Cell key={i} fill={e.color}/>)}
                  </Pie>
                  <Tooltip {...ttStyle(T)}/><Legend wrapperStyle={{fontSize:11,color:T.sub}}/>
                </PieChart>
              </ResponsiveContainer>
            </Box>
            <Box T={T} title="Complaint Categories" icon="alertTri" color={T.amber}>
              <div style={{ display:"flex", flexDirection:"column", gap:8 }}>
                {COMP.map((c,i)=>(
                  <div key={c.n}>
                    <div style={{ display:"flex", justifyContent:"space-between", fontSize:11, color:T.sub, marginBottom:3 }}>
                      <span>{c.n}</span>
                      <span style={{ fontFamily:"JetBrains Mono,monospace", fontWeight:600, color:T.blue }}>{c.v}</span>
                    </div>
                    <div style={{ background:T.card, borderRadius:4, height:6, overflow:"hidden" }}>
                      <div style={{ width:`${(c.v/817)*100}%`, height:"100%", borderRadius:4,
                        background:`linear-gradient(90deg,hsl(${200+i*16},75%,58%),hsl(${220+i*16},75%,68%))`,
                        transition:"width 0.8s ease" }}/>
                    </div>
                  </div>
                ))}
              </div>
            </Box>
          </div>
          <Box T={T} title="Platform Breakdown" icon="grid" color={T.green}>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={PSTATS} margin={{left:-20}}>
                <CartesianGrid strokeDasharray="3 3" stroke={T.border}/>
                <XAxis dataKey="p" tick={{fill:T.muted,fontSize:9}} angle={-20} textAnchor="end" height={38}/>
                <YAxis tick={{fill:T.muted,fontSize:9}}/>
                <Tooltip {...ttStyle(T)}/>
                <Bar dataKey="genuine" fill="#10b981" name="Genuine" stackId="a"/>
                <Bar dataKey="complaint" fill="#f59e0b" name="Complaint" stackId="a"/>
                <Bar dataKey="fake" fill="#f43f5e" name="Fake" stackId="a" radius={[4,4,0,0]}/>
              </BarChart>
            </ResponsiveContainer>
          </Box>
        </div>
      )}

      {/* REVIEWS */}
      {tab==="reviews" && (
        <div style={{ display:"grid", gridTemplateColumns:"220px 1fr", gap:16 }}>
          <div style={{ background:T.surface, border:`1px solid ${T.border}`, borderRadius:16, padding:20, textAlign:"center" }}>
            <div style={{ fontSize:11, fontWeight:700, color:T.muted, textTransform:"uppercase", letterSpacing:1, marginBottom:10 }}>Trust Score</div>
            <Gauge score={trust} size={155}/>
            <div style={{ marginTop:12, display:"inline-block", fontSize:11, padding:"5px 14px",
              borderRadius:8, background:`${T.amber}18`, color:T.amber, fontWeight:800,
              border:`1px solid ${T.amber}28` }}>TRUSTED SELLER</div>
            <div style={{ marginTop:14, display:"flex", flexDirection:"column", gap:7 }}>
              {[["Avg Rating","4.6/5",T.amber],["Genuine","78%",T.green],["Fake Detected","2%",T.red],["Complaints","20%",T.amber]].map(([k,v,c])=>(
                <div key={k} style={{ display:"flex", justifyContent:"space-between", padding:"7px 11px",
                  background:T.card, borderRadius:9, fontSize:12, border:`1px solid ${T.border}` }}>
                  <span style={{ color:T.sub }}>{k}</span>
                  <span style={{ fontWeight:700, color:c }}>{v}</span>
                </div>
              ))}
            </div>
          </div>
          <Box T={T} title="Customer Reviews" icon="star" color={T.amber}>
            {[
              {nm:"Rahul M.",st:5,tx:"Excellent quality and fast delivery!",dt:"Feb 20",vr:true,lb:"Genuine",lc:T.green},
              {nm:"Priya S.",st:4,tx:"Good product, packaging could be better.",dt:"Feb 18",vr:true,lb:"Genuine",lc:T.green},
              {nm:"Unknown User",st:5,tx:"Best product ever! Amazing!!",dt:"Feb 17",vr:false,lb:"Suspicious",lc:T.red},
              {nm:"Amit K.",st:2,tx:"Color was different from what was shown.",dt:"Feb 15",vr:true,lb:"Complaint",lc:T.amber},
              {nm:"Sneha R.",st:5,tx:"Loved it, will buy again!",dt:"Feb 12",vr:true,lb:"Genuine",lc:T.green},
            ].map((rv,i)=>(
              <div key={i} style={{ padding:"11px 0", borderBottom:`1px solid ${T.border}` }}>
                <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:5 }}>
                  <div style={{ display:"flex", alignItems:"center", gap:9 }}>
                    <div style={{ width:30,height:30,borderRadius:"50%",background:T.grad,
                      display:"flex",alignItems:"center",justifyContent:"center",color:"#fff",fontSize:12,fontWeight:800,flexShrink:0 }}>{rv.nm[0]}</div>
                    <div>
                      <div style={{ fontSize:13, fontWeight:600, color:T.text }}>{rv.nm}</div>
                      <div style={{ fontSize:10, color:T.muted, display:"flex", alignItems:"center", gap:5 }}>
                        {rv.dt}
                        <span style={{ color:rv.vr?T.green:T.amber, display:"flex", alignItems:"center", gap:3 }}>
                          <Icon name={rv.vr?"checkCircle":"alertTri"} size={9} color={rv.vr?T.green:T.amber} strokeWidth={2}/>
                          {rv.vr?"Verified":"Unverified"}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div style={{ display:"flex", alignItems:"center", gap:8 }}>
                    <div style={{ display:"flex", gap:1 }}>{[1,2,3,4,5].map(s=><Icon key={s} name="star" size={11} color={s<=rv.st?T.amber:T.border} strokeWidth={s<=rv.st?0:1.5}/>)}</div>
                    <span style={{ fontSize:9, padding:"2px 8px", borderRadius:5, background:`${rv.lc}15`, color:rv.lc, fontWeight:700, border:`1px solid ${rv.lc}25` }}>{rv.lb}</span>
                  </div>
                </div>
                <div style={{ fontSize:13, color:T.sub, paddingLeft:39, fontStyle:"italic" }}>"{rv.tx}"</div>
              </div>
            ))}
          </Box>
        </div>
      )}

      {/* PAYMENTS */}
      {tab==="payments" && (
        <div>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(180px,1fr))", gap:14, marginBottom:20 }}>
            <KCard T={T} label="Total Earnings" value="â‚¹12,840" icon="dollar" color={T.green}/>
            <KCard T={T} label="Pending Payout" value="â‚¹2,340" icon="bell" color={T.amber}/>
            <KCard T={T} label="Settled" value="â‚¹10,500" icon="check" color={T.blue}/>
            <KCard T={T} label="Refunds" value="â‚¹499" icon="alertTri" color={T.red}/>
          </div>
          <Box T={T} title="Transaction History" icon="dollar" color={T.green}>
            {ORDERS.filter(o=>o.status==="Delivered").map(o=>(
              <div key={o.id} style={{ display:"flex", justifyContent:"space-between", alignItems:"center", padding:"11px 0", borderBottom:`1px solid ${T.border}` }}>
                <div style={{ display:"flex", alignItems:"center", gap:11 }}>
                  <div style={{ width:38,height:38,borderRadius:10,background:`${T.green}14`,border:`1px solid ${T.green}25`,display:"flex",alignItems:"center",justifyContent:"center" }}>
                    <Icon name="dollar" size={17} color={T.green} strokeWidth={2}/>
                  </div>
                  <div>
                    <div style={{ fontSize:13, fontWeight:600, color:T.text }}>{o.product}</div>
                    <div style={{ fontSize:10, color:T.muted, fontFamily:"JetBrains Mono,monospace" }}>{o.id} Â· {o.date}</div>
                  </div>
                </div>
                <div style={{ fontSize:16, fontWeight:800, color:T.green }}>+â‚¹{o.amount}</div>
              </div>
            ))}
          </Box>
        </div>
      )}

      {/* SETTINGS */}
      {tab==="settings" && (
        <div style={{ maxWidth:540 }}>
          <Box T={T} title="Profile Settings" icon="settings" color={T.blue}>
            {[["Shop Name",user?.shopName||"My Shop","tag"],["Email",user?.email||"seller@example.com","mail"],["Phone",user?.phone||"+91 9876543210","phone"],["Platform","Meesho, Instagram","grid"]].map(([k,v,ic])=>(
              <div key={k} style={{ marginBottom:16 }}>
                <label style={{ fontSize:11, color:T.muted, display:"flex", alignItems:"center", gap:5, marginBottom:6, fontWeight:600, textTransform:"uppercase", letterSpacing:0.8 }}>
                  <Icon name={ic} size={12} color={T.muted} strokeWidth={1.8}/>{k}
                </label>
                <input defaultValue={v} style={{ width:"100%", background:T.card, border:`1.5px solid ${T.border}`, borderRadius:10, padding:"11px 14px", color:T.text, fontSize:13, outline:"none", fontFamily:"inherit", transition:"border-color 0.2s" }}
                  onFocus={e=>{e.target.style.borderColor=T.blue;}}
                  onBlur={e=>{e.target.style.borderColor=T.border;}}/>
              </div>
            ))}
            <button style={{ background:T.grad, color:"#fff", border:"none", borderRadius:10, padding:"11px 24px", fontWeight:700, fontSize:14, cursor:"pointer", boxShadow:`0 4px 16px ${T.blue}35`, fontFamily:"inherit" }}>Save Changes</button>
          </Box>
        </div>
      )}
    </Shell>
  );
}

/* ================================================================
   CUSTOMER DASHBOARD
================================================================ */
function CustomerDash({ user, onLogout, theme, toggleTheme }) {
  const T = theme==="dark" ? DARK : LIGHT;
  const [tab, setTab] = useState("home");
  const [search, setSearch] = useState("");
  const [plat, setPlat] = useState("All");
  const platforms = ["All", ...new Set(SELLERS.map(s=>s.pl))];
  const filtered = SELLERS.filter(s => s.id.toLowerCase().includes(search.toLowerCase()) && (plat==="All"||s.pl===plat)).sort((a,b)=>b.sc-a.sc);

  const nav = [
    {id:"home",     ic:"home",    label:"Home",          c:T.blue},
    {id:"search",   ic:"search",  label:"Find Sellers",  c:T.purple},
    {id:"analytics",ic:"barChart",label:"Analytics",     c:T.green},
    {id:"alerts",   ic:"bell",    label:"Fraud Alerts",  c:T.red},
    {id:"profile",  ic:"user",    label:"My Profile",    c:T.amber},
  ];

  return (
    <Shell T={T} theme={theme} toggleTheme={toggleTheme} onLogout={onLogout}
      nav={nav} active={tab} setActive={setTab}
      topName={user?.name||"Customer"} topSub="Buyer Account"
      sideExtra={
        <div style={{ display:"flex", alignItems:"center", gap:5, marginTop:4 }}>
          <Icon name="checkCircle" size={12} color={T.green} strokeWidth={2}/>
          <span style={{ fontSize:11, color:T.green, fontWeight:600 }}>Verified Buyer</span>
        </div>
      }>

      {/* HOME */}
      {tab==="home" && (
        <div>
          <div style={{ background:`linear-gradient(135deg,${T.purple},${T.blue})`, borderRadius:20,
            padding:"26px 30px", marginBottom:22, position:"relative", overflow:"hidden" }}>
            <div style={{ position:"absolute", right:-30, top:-30, width:200, height:200, borderRadius:"50%", background:"rgba(255,255,255,0.07)" }}/>
            <div style={{ position:"absolute", right:80, bottom:-50, width:140, height:140, borderRadius:"50%", background:"rgba(255,255,255,0.05)" }}/>
            <div style={{ fontSize:22, fontWeight:800, color:"#fff", marginBottom:6 }}>
              Welcome, {(user?.name||"Buyer").split(" ")[0]}! ðŸ‘‹
            </div>
            <div style={{ fontSize:13, color:"rgba(255,255,255,0.8)", marginBottom:18 }}>AI verifies every seller â€” shop with confidence</div>
            <div style={{ display:"flex", gap:10 }}>
              <div style={{ flex:1, position:"relative" }}>
                <div style={{ position:"absolute", left:13, top:"50%", transform:"translateY(-50%)" }}>
                  <Icon name="search" size={15} color="rgba(255,255,255,0.6)" strokeWidth={2}/>
                </div>
                <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Enter seller ID to check trust..."
                  style={{ width:"100%", padding:"11px 16px 11px 42px", background:"rgba(255,255,255,0.15)", border:"1.5px solid rgba(255,255,255,0.25)", borderRadius:11, color:"#fff", fontSize:13, outline:"none", fontFamily:"inherit" }}/>
              </div>
              <button onClick={()=>setTab("search")} style={{ background:"#fff", color:T.purple, border:"none", borderRadius:11, padding:"11px 20px", fontWeight:700, fontSize:13, cursor:"pointer", fontFamily:"inherit", display:"flex", alignItems:"center", gap:7, flexShrink:0 }}>
                <Icon name="search" size={15} color={T.purple} strokeWidth={2.5}/>Search
              </button>
            </div>
          </div>

          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(145px,1fr))", gap:14, marginBottom:22 }}>
            {[{l:"Sellers Tracked",v:1498,ic:"store",c:T.blue},{l:"Fakes Detected",v:315,ic:"alertTri",c:T.red},{l:"Trusted Sellers",v:423,ic:"shield",c:T.green},{l:"Platforms",v:8,ic:"grid",c:T.purple}].map(k=>(
              <div key={k.l} className="card" style={{ background:T.surface, border:`1px solid ${T.border}`, borderRadius:14, padding:16, textAlign:"center" }}>
                <div style={{ width:46,height:46,borderRadius:13,background:`${k.c}16`,border:`1px solid ${k.c}24`,display:"flex",alignItems:"center",justifyContent:"center",margin:"0 auto 10px" }}>
                  <Icon name={k.ic} size={22} color={k.c} strokeWidth={1.8}/>
                </div>
                <div style={{ fontSize:24, fontWeight:900, color:k.c, fontFamily:"JetBrains Mono,monospace" }}><Counter to={k.v}/></div>
                <div style={{ fontSize:10, color:T.muted, marginTop:3, fontWeight:500 }}>{k.l}</div>
              </div>
            ))}
          </div>

          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:14 }}>
            <Box T={T} title="Top Trusted Sellers" icon="shield" color={T.green}>
              {SELLERS.filter(s=>s.sc>=88).slice(0,5).map(s=>{
                const C = trustColor(s.sc);
                return (
                  <div key={s.id} onClick={()=>{setSearch(s.id);setTab("search");}}
                    style={{ display:"flex", justifyContent:"space-between", alignItems:"center", padding:"9px 0", borderBottom:`1px solid ${T.border}`, cursor:"pointer", transition:"padding-left 0.15s" }}
                    onMouseEnter={e=>e.currentTarget.style.paddingLeft="8px"}
                    onMouseLeave={e=>e.currentTarget.style.paddingLeft="0"}>
                    <div>
                      <div style={{ fontSize:13, fontWeight:700, color:T.text, fontFamily:"JetBrains Mono,monospace" }}>{s.id}</div>
                      <div style={{ fontSize:10, color:T.muted }}>{s.pl}</div>
                    </div>
                    <div style={{ display:"flex", alignItems:"center", gap:8 }}>
                      <div style={{ width:44, height:4, background:T.card, borderRadius:2 }}>
                        <div style={{ width:`${s.sc}%`, height:"100%", background:`linear-gradient(90deg,${C}70,${C})`, borderRadius:2 }}/>
                      </div>
                      <span style={{ fontSize:13, fontWeight:800, color:C, fontFamily:"JetBrains Mono,monospace", minWidth:28 }}>{s.sc}</span>
                    </div>
                  </div>
                );
              })}
            </Box>
            <Box T={T} title="High Risk Sellers" icon="alertTri" color={T.red}>
              {SELLERS.filter(s=>s.sc<50).map(s=>{
                const C = trustColor(s.sc);
                return (
                  <div key={s.id} style={{ display:"flex", justifyContent:"space-between", alignItems:"center", padding:"9px 0", borderBottom:`1px solid ${T.border}` }}>
                    <div>
                      <div style={{ fontSize:12, fontWeight:700, color:T.text, fontFamily:"JetBrains Mono,monospace" }}>{s.id}</div>
                      <div style={{ fontSize:10, color:T.muted }}>{s.pl} Â· {s.fk} fakes</div>
                    </div>
                    <span style={{ fontSize:10, fontWeight:800, color:C, background:`${C}12`, border:`1px solid ${C}28`, borderRadius:6, padding:"3px 8px", display:"flex", alignItems:"center", gap:4 }}>
                      <Icon name="alertTri" size={9} color={C} strokeWidth={2}/>{trustLabel(s.sc)}
                    </span>
                  </div>
                );
              })}
            </Box>
          </div>
        </div>
      )}

      {/* FIND SELLERS */}
      {tab==="search" && (
        <div>
          <div style={{ display:"flex", gap:10, marginBottom:18, flexWrap:"wrap" }}>
            <div style={{ flex:1, minWidth:200, position:"relative" }}>
              <div style={{ position:"absolute", left:12, top:"50%", transform:"translateY(-50%)", zIndex:1 }}>
                <Icon name="search" size={15} color={T.muted} strokeWidth={1.8}/>
              </div>
              <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search Seller ID..."
                style={{ width:"100%", padding:"10px 14px 10px 40px", background:T.surface, border:`1.5px solid ${T.border}`, borderRadius:11, color:T.text, fontSize:13, outline:"none", fontFamily:"inherit", transition:"border-color 0.2s" }}
                onFocus={e=>{e.target.style.borderColor=T.blue;}}
                onBlur={e=>{e.target.style.borderColor=T.border;}}/>
            </div>
            <select value={plat} onChange={e=>setPlat(e.target.value)}
              style={{ background:T.surface, border:`1.5px solid ${T.border}`, borderRadius:11, padding:"10px 14px", color:T.text, fontSize:13, fontFamily:"inherit", cursor:"pointer", outline:"none" }}>
              {platforms.map(p=><option key={p}>{p}</option>)}
            </select>
          </div>
          <div style={{ fontSize:12, color:T.muted, marginBottom:14, display:"flex", alignItems:"center", gap:6 }}>
            <Icon name="filter" size={12} color={T.muted} strokeWidth={1.8}/>{filtered.length} sellers found
          </div>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(195px,1fr))", gap:14 }}>
            {filtered.map(s=>{
              const C = trustColor(s.sc);
              return (
                <div key={s.id} className="card" style={{ background:T.surface, border:`1px solid ${T.border}`, borderRadius:14, padding:16, cursor:"pointer", position:"relative", overflow:"hidden" }}
                  onMouseEnter={e=>{e.currentTarget.style.borderColor=C;}}
                  onMouseLeave={e=>{e.currentTarget.style.borderColor=T.border;}}>
                  <div style={{ position:"absolute", top:0, left:0, right:0, height:3, background:`linear-gradient(90deg,${C},${C}60)` }}/>
                  <div style={{ display:"flex", justifyContent:"space-between", marginBottom:10 }}>
                    <div>
                      <div style={{ fontSize:14, fontWeight:800, color:T.text, fontFamily:"JetBrains Mono,monospace" }}>{s.id}</div>
                      <div style={{ fontSize:10, color:T.muted, marginTop:2 }}>{s.pl}</div>
                    </div>
                    <span style={{ fontSize:9, fontWeight:700, padding:"3px 7px", borderRadius:5, color:C, border:`1px solid ${C}35`, background:`${C}12`, height:"fit-content" }}>{trustLabel(s.sc)}</span>
                  </div>
                  <Gauge score={s.sc} size={115}/>
                  <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:5, marginTop:10 }}>
                    {[["Rating",s.rt+"/5","star",T.amber],["Reviews",s.rv,"eye",T.blue],["Genuine",s.gn,"check",T.green],["Complaints",s.co,"bell",T.amber]].map(([k,v,ic,c])=>(
                      <div key={k} style={{ background:T.card, borderRadius:7, padding:"5px 7px", border:`1px solid ${T.border}` }}>
                        <div style={{ fontSize:8, color:T.muted, display:"flex", alignItems:"center", gap:3, marginBottom:2 }}>
                          <Icon name={ic} size={8} color={T.muted} strokeWidth={1.8}/>{k}
                        </div>
                        <div style={{ fontSize:12, fontWeight:700, color:c }}>{v}</div>
                      </div>
                    ))}
                  </div>
                  <div style={{ marginTop:8, fontSize:9, color:T.muted, display:"flex", gap:10 }}>
                    <span style={{ display:"flex", alignItems:"center", gap:3 }}><Icon name="tag" size={8} color={T.muted} strokeWidth={1.8}/>{s.ct}</span>
                    <span style={{ display:"flex", alignItems:"center", gap:3 }}><Icon name="arrowR" size={8} color={T.muted} strokeWidth={1.8}/>{s.dl}d</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ANALYTICS */}
      {tab==="analytics" && (
        <div>
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:16, marginBottom:16 }}>
            <Box T={T} title="Review Classification" icon="barChart" color={T.blue}>
              <ResponsiveContainer width="100%" height={210}>
                <PieChart>
                  <Pie data={FRAUD} cx="50%" cy="50%" innerRadius={52} outerRadius={84} dataKey="value" paddingAngle={4}>
                    {FRAUD.map((e,i)=><Cell key={i} fill={e.color}/>)}
                  </Pie>
                  <Tooltip {...ttStyle(T)}/><Legend wrapperStyle={{fontSize:11,color:T.sub}}/>
                </PieChart>
              </ResponsiveContainer>
            </Box>
            <Box T={T} title="Fake Rate by Platform" icon="alertTri" color={T.red}>
              <ResponsiveContainer width="100%" height={210}>
                <BarChart data={PSTATS} margin={{left:-24}}>
                  <CartesianGrid strokeDasharray="3 3" stroke={T.border}/>
                  <XAxis dataKey="p" tick={{fill:T.muted,fontSize:8}} angle={-25} textAnchor="end" height={40}/>
                  <YAxis tick={{fill:T.muted,fontSize:9}}/><Tooltip {...ttStyle(T)}/>
                  <Bar dataKey="fr" fill={T.red} radius={[4,4,0,0]} name="Fake %"/>
                </BarChart>
              </ResponsiveContainer>
            </Box>
          </div>
          <Box T={T} title="Monthly Review Volume" icon="trending" color={T.blue}>
            <ResponsiveContainer width="100%" height={200}>
              <AreaChart data={MO}>
                <defs><linearGradient id="ag3" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor={T.blue} stopOpacity={0.3}/><stop offset="95%" stopColor={T.blue} stopOpacity={0}/></linearGradient></defs>
                <CartesianGrid strokeDasharray="3 3" stroke={T.border}/>
                <XAxis dataKey="m" tick={{fill:T.muted,fontSize:10}}/><YAxis tick={{fill:T.muted,fontSize:10}}/>
                <Tooltip {...ttStyle(T)}/><Area type="monotone" dataKey="v" stroke={T.blue} fill="url(#ag3)" strokeWidth={2.5} name="Reviews"/>
              </AreaChart>
            </ResponsiveContainer>
          </Box>
        </div>
      )}

      {/* ALERTS */}
      {tab==="alerts" && (
        <div>
          <div style={{ background:`linear-gradient(135deg,${T.red}18,${T.red}06)`, border:`1px solid ${T.red}28`, borderRadius:14, padding:18, marginBottom:18, display:"flex", alignItems:"center", gap:14 }}>
            <div style={{ width:50,height:50,borderRadius:14,background:`${T.red}18`,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0 }}>
              <Icon name="alertTri" size={24} color={T.red} strokeWidth={2}/>
            </div>
            <div>
              <div style={{ fontSize:15, fontWeight:700, color:T.red, marginBottom:3 }}>Active Fraud Alerts</div>
              <div style={{ fontSize:13, color:T.sub }}>AI detected 315 fake reviews across 8 platforms.</div>
            </div>
          </div>
          {[
            {tp:"Fake Review Ring",sl:"S200",pl:"Instagram",sv:"HIGH",dt:"3 fake reviews from same IP cluster within 2 hours",tm:"2h ago",ic:"layers"},
            {tp:"Burst Activity",sl:"S305",pl:"OLX",sv:"HIGH",dt:"12 reviews posted in 30 min â€” suspicious burst pattern",tm:"5h ago",ic:"zap"},
            {tp:"Sentiment Mismatch",sl:"S10",pl:"WhatsApp",sv:"MEDIUM",dt:"5-star rating but sentiment score is strongly negative (-0.8)",tm:"1d ago",ic:"activity"},
            {tp:"Device Reuse",sl:"S1",pl:"Facebook",sv:"MEDIUM",dt:"Same device fingerprint across 7 different reviews",tm:"2d ago",ic:"cpu"},
            {tp:"Unverified Reviews",sl:"S100",pl:"Quikr",sv:"LOW",dt:"40% of reviews are from unverified buyers",tm:"3d ago",ic:"user"},
          ].map((a,i)=>{
            const SC = a.sv==="HIGH"?T.red:a.sv==="MEDIUM"?T.amber:T.blue;
            return (
              <div key={i} className="card" style={{ background:T.surface, border:`1px solid ${T.border}`, borderRadius:14, padding:16, marginBottom:10, borderLeft:`4px solid ${SC}`, cursor:"pointer" }}>
                <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:7 }}>
                  <div style={{ display:"flex", alignItems:"center", gap:10 }}>
                    <div style={{ width:36,height:36,borderRadius:10,background:`${SC}16`,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0 }}>
                      <Icon name={a.ic} size={17} color={SC} strokeWidth={2}/>
                    </div>
                    <div>
                      <div style={{ fontSize:13, fontWeight:700, color:T.text }}>{a.tp}</div>
                      <span style={{ fontSize:9, fontWeight:800, padding:"2px 7px", borderRadius:4, background:`${SC}16`, color:SC, border:`1px solid ${SC}28` }}>{a.sv} RISK</span>
                    </div>
                  </div>
                  <span style={{ fontSize:11, color:T.muted }}>{a.tm}</span>
                </div>
                <div style={{ fontSize:12, color:T.sub, marginBottom:5, paddingLeft:46 }}>{a.dt}</div>
                <div style={{ fontSize:11, color:T.muted, paddingLeft:46, display:"flex", alignItems:"center", gap:5 }}>
                  <Icon name="user" size={10} color={T.muted} strokeWidth={1.8}/>
                  Seller <span style={{ fontFamily:"JetBrains Mono,monospace", color:T.blue, fontWeight:600 }}>{a.sl}</span> Â· {a.pl}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* PROFILE */}
      {tab==="profile" && (
        <div style={{ maxWidth:500 }}>
          <Box T={T} title="My Profile" icon="user" color={T.amber}>
            <div style={{ display:"flex", alignItems:"center", gap:16, marginBottom:22, padding:16,
              background:`${T.blue}08`, borderRadius:12, border:`1px solid ${T.blue}15` }}>
              <div style={{ width:58,height:58,borderRadius:"50%",background:T.grad,display:"flex",alignItems:"center",justifyContent:"center",color:"#fff",fontSize:22,fontWeight:900,boxShadow:`0 6px 20px ${T.blue}40`,flexShrink:0 }}>
                {(user?.name||"C")[0].toUpperCase()}
              </div>
              <div>
                <div style={{ fontSize:17, fontWeight:800, color:T.text }}>{user?.name||"Customer"}</div>
                <div style={{ fontSize:12, color:T.muted, marginBottom:5 }}>{user?.email}</div>
                <span style={{ fontSize:10, color:T.green, background:`${T.green}14`, border:`1px solid ${T.green}25`, borderRadius:6, padding:"2px 9px", fontWeight:700, display:"inline-flex", alignItems:"center", gap:4 }}>
                  <Icon name="checkCircle" size={10} color={T.green} strokeWidth={2}/>Verified Buyer
                </span>
              </div>
            </div>
            {[["Full Name",user?.name||"Demo Customer","user"],["Email",user?.email||"customer@example.com","mail"],["Phone",user?.phone||"+91 9876543210","phone"]].map(([k,v,ic])=>(
              <div key={k} style={{ marginBottom:15 }}>
                <label style={{ fontSize:11, color:T.muted, display:"flex", alignItems:"center", gap:5, marginBottom:6, fontWeight:600, textTransform:"uppercase", letterSpacing:0.8 }}>
                  <Icon name={ic} size={12} color={T.muted} strokeWidth={1.8}/>{k}
                </label>
                <input defaultValue={v} style={{ width:"100%", background:T.card, border:`1.5px solid ${T.border}`, borderRadius:10, padding:"11px 14px", color:T.text, fontSize:13, outline:"none", fontFamily:"inherit", transition:"border-color 0.2s" }}
                  onFocus={e=>{e.target.style.borderColor=T.blue;}}
                  onBlur={e=>{e.target.style.borderColor=T.border;}}/>
              </div>
            ))}
            <button style={{ background:T.grad, color:"#fff", border:"none", borderRadius:10, padding:"11px 24px", fontWeight:700, fontSize:14, cursor:"pointer", boxShadow:`0 4px 16px ${T.blue}35`, fontFamily:"inherit", display:"flex", alignItems:"center", gap:8 }}>
              <Icon name="check" size={15} color="#fff" strokeWidth={2.5}/>Update Profile
            </button>
          </Box>
        </div>
      )}
    </Shell>
  );
}

/* ================================================================
   ROOT APP
================================================================ */
export default function App() {
  const [theme, setTheme] = useState("dark");
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);
  const toggle = () => setTheme(t => t==="dark"?"light":"dark");
  const login = (r, d) => { setRole(r); setUser(d); };
  const logout = () => { setUser(null); setRole(null); };
  return (
    <>
      {!user && <LoginPage onLogin={login} theme={theme} toggleTheme={toggle}/>}
      {user && role==="seller"   && <SellerDash   user={user} onLogout={logout} theme={theme} toggleTheme={toggle}/>}
      {user && role==="customer" && <CustomerDash user={user} onLogout={logout} theme={theme} toggleTheme={toggle}/>}
    </>
  );
}
