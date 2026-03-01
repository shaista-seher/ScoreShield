import re

with open('ScoreShield.html', 'r', encoding='utf-8') as f:
    text = f.read()

# Shared state variables for the main app
app_state = """
  const [globalProds, setGlobalProds] = useState(INIT_PRODS);
  const [globalOrders, setGlobalOrders] = useState(ORDERS);
"""
text = text.replace('const [theme, setTheme] = useState("dark");', 'const [theme, setTheme] = useState("dark");\n' + app_state)

text = text.replace('<SellerDash   user={user}', '<SellerDash globalProds={globalProds} setGlobalProds={setGlobalProds} globalOrders={globalOrders} setGlobalOrders={setGlobalOrders} user={user}')
text = text.replace('<CustomerDash user={user}', '<CustomerDash globalProds={globalProds} setGlobalProds={setGlobalProds} globalOrders={globalOrders} setGlobalOrders={setGlobalOrders} user={user}')


text = text.replace('function SellerDash({ user, onLogout, theme, toggleTheme, onUpdateUser }) {', 'function SellerDash({ user, onLogout, theme, toggleTheme, onUpdateUser, globalProds, setGlobalProds, globalOrders, setGlobalOrders }) {')

text = text.replace('const [prods, setProds] = useState(INIT_PRODS);', 'const prods = globalProds;\n  const setProds = setGlobalProds;\n  const ORDERS = globalOrders;')
text = text.replace('const prods = globalProds;\n  const setProds = setGlobalProds;\n  const showAddProd', 'const prods = globalProds;\n  const setProds = setGlobalProds;\n  const ORDERS = globalOrders;\n  const showAddProd')


text = text.replace('function CustomerDash({ user, onLogout, theme, toggleTheme, onUpdateUser }) {', 'function CustomerDash({ user, onLogout, theme, toggleTheme, onUpdateUser, globalProds, setGlobalProds, globalOrders, setGlobalOrders }) {')

cust_buying_state = """
  const [activeProd, setActiveProd] = useState(null);
  const [showReviewFor, setShowReviewFor] = useState(null);
  const [reviewForm, setReviewForm] = useState({ rating: 5, text: "" });
"""
text = text.replace('const [search, setSearch] = useState("");', cust_buying_state + '\n  const [search, setSearch] = useState("");')


cust_nav = """    {id:"home",     ic:"home",    label:"Home",          c:T.blue},
    {id:"shop",     ic:"package", label:"Shop Items",    c:T.amber},
    {id:"search",   ic:"search",  label:"Find Sellers",  c:T.purple},
    {id:"analytics",ic:"barChart",label:"Analytics",     c:T.green},
    {id:"alerts",   ic:"bell",    label:"Fraud Alerts",  c:T.red},
    {id:"orders",   ic:"tag",     label:"My Orders",     c:T.blue},
    {id:"profile",  ic:"user",    label:"My Profile",    c:T.amber},"""

text = re.sub(r'\{id:"home",.*?\{id:"profile",.*?c:T\.amber\},', cust_nav, text, flags=re.DOTALL)


shop_tab = """
      {/* SHOP ITEMS */}
      {tab==="shop" && (
        <div>
          <h2 style={{ fontSize: 20, color: T.text, marginBottom: 16 }}>Available Products</h2>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(210px,1fr))", gap:14 }}>
            {globalProds.filter(p=>p.on).map(p=>(
              <div key={p.id} className="card" style={{ background:T.surface, border:`1px solid ${T.border}`, borderRadius:16, padding:18 }}>
                <div style={{ fontSize:14, fontWeight:700, color:T.text, marginBottom:2 }}>{p.name}</div>
                <div style={{ fontSize:11, color:T.muted, marginBottom:12 }}>{p.cat}</div>
                <div style={{ fontSize:16, fontWeight:800, color:T.blue, marginBottom:12 }}>₹{p.price}</div>
                <div style={{ fontSize:10, color:T.muted, marginBottom:8 }}>Seller Rating: {SELLERS[Math.floor(Math.random()*SELLERS.length)].sc}/100</div>
                <button onClick={() => {
                   alert("Successfully purchased " + p.name + "!");
                   const newOrder = { id: "ORD-" + Math.floor(Math.random()*10000), product: p.name, buyer: user?.name || "Demo Customer", amount: p.price, status: "Delivered", date: "Just Now", rt: null, prodId: p.id };
                   setGlobalOrders([newOrder, ...globalOrders]);
                   setTab("orders");
                }} style={{ width:"100%", background:T.gradG, color:"#fff", border:"none", borderRadius:8, padding:"8px", cursor:"pointer", fontWeight:600 }}>Buy Now</button>
              </div>
            ))}
          </div>
        </div>
      )}
"""
text = text.replace('{/* FIND SELLERS */}', shop_tab + '\n      {/* FIND SELLERS */}')

orders_tab = """
      {/* MY ORDERS & REVIEWS */}
      {tab==="orders" && (
        <Box T={T} title="My Purchases & Reviews" icon="package" color={T.blue}>
          {globalOrders.filter(o => o.buyer === (user?.name || "Demo Customer")).length === 0 && <div style={{ color: T.muted, fontSize: 13 }}>No orders yet.</div>}
          {globalOrders.filter(o => o.buyer === (user?.name || "Demo Customer")).map(o => (
            <div key={o.id} style={{ padding: "12px 0", borderBottom: `1px solid ${T.border}` }}>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 700, color: T.text }}>{o.product}</div>
                  <div style={{ fontSize: 11, color: T.sub }}>Status: {o.status} | ₹{o.amount}</div>
                </div>
                {o.status === "Delivered" && !o.rt && showReviewFor !== o.id && (
                  <button onClick={() => setShowReviewFor(o.id)} style={{ background: T.amber, color: "#000", border: "none", borderRadius: 6, padding: "5px 12px", cursor: "pointer", fontSize: 11, fontWeight: 700, height: "fit-content" }}>Leave Review</button>
                )}
                {o.rt && (
                  <div style={{ fontSize: 11, color: T.green, fontWeight: "bold" }}>Reviewed (★ {o.rt})</div>
                )}
              </div>
              
              {showReviewFor === o.id && (
                <div style={{ marginTop: 10, background: T.card, padding: 12, borderRadius: 8, border: `1px solid ${T.border}` }}>
                   <div style={{ marginBottom: 8, fontSize: 12, color: T.text }}>Rate out of 5:
                     <select value={reviewForm.rating} onChange={e=>setReviewForm({...reviewForm, rating: Number(e.target.value)})} style={{ marginLeft: 8, padding: 4, borderRadius: 4, background: T.surface, color: T.text, outline: "none", border: `1px solid ${T.border}` }}>
                       <option value={1}>1</option><option value={2}>2</option><option value={3}>3</option><option value={4}>4</option><option value={5}>5</option>
                     </select>
                   </div>
                   <textarea placeholder="Write your review focusing on product authenticity..." value={reviewForm.text} onChange={e=>setReviewForm({...reviewForm, text: e.target.value})} style={{ width: "100%", padding: 8, borderRadius: 6, background: T.surface, border: `1px solid ${T.border}`, color: T.text, outline: "none", resize: "none", minHeight: 60, marginBottom: 8 }}></textarea>
                   <div style={{ display: "flex", gap: 8 }}>
                     <button onClick={() => {
                       if (!reviewForm.text) return alert("Please enter review text.");
                       const suspicionLabel = reviewForm.text.toLowerCase().includes("fake") ? "High Suspicion" : "Genuine";
                       alert("Review submitted! AI Analysis: " + suspicionLabel);
                       setGlobalOrders(globalOrders.map(ord => ord.id === o.id ? {...ord, rt: reviewForm.rating} : ord));
                       setShowReviewFor(null);
                       setReviewForm({ rating: 5, text: "" });
                     }} style={{ background: T.green, color: "#fff", border: "none", borderRadius: 6, padding: "6px 14px", cursor: "pointer", fontSize: 12, fontWeight: 700 }}>Submit Review securely</button>
                     <button onClick={() => setShowReviewFor(null)} style={{ background: "transparent", border: `1px solid ${T.muted}`, color: T.muted, borderRadius: 6, padding: "6px 14px", cursor: "pointer", fontSize: 12, fontWeight: 600 }}>Cancel</button>
                   </div>
                </div>
              )}
            </div>
          ))}
        </Box>
      )}
"""
text = text.replace('{/* PROFILE */}', orders_tab + '\n      {/* PROFILE */}')

with open('ScoreShield.html', 'w', encoding='utf-8') as f:
    f.write(text)
