import re

with open('ScoreShield.html', 'r', encoding='utf-8') as f:
    text = f.read()

with open('sellers_data.json', 'r', encoding='utf-8') as f:
    json_data = f.read()

# 1. Update SELLERS array entirely with new trust scores
text = re.sub(r'const SELLERS = \[.*?\];', f'const SELLERS = {json_data};', text, flags=re.DOTALL)

# 2. Update trustLabel thresholds based on the requested logic:
# 0–40 → High Risk 🔴
# 40–60 → Moderate Risk 🟡
# 60–80 → Reliable 🟢
# 80–100 → Highly Trusted 🟢⭐

trust_label_search = 'const trustLabel = s => s>=80?"TRUSTED":s>=60?"MODERATE":s>=40?"RISKY":"DANGER";'
trust_label_replace = 'const trustLabel = s => s>=80?"HIGHLY TRUSTED ⭐":s>=60?"RELIABLE":s>=40?"MODERATE RISK":"HIGH RISK";'

text = text.replace(trust_label_search, trust_label_replace)

trust_color_search = 'const trustColor = s => s>=80?"#10b981":s>=60?"#f59e0b":s>=40?"#f97316":"#f43f5e";'
trust_color_replace = 'const trustColor = s => s>=80?"#10b981":s>=60?"#84cc16":s>=40?"#f59e0b":"#f43f5e";'

text = text.replace(trust_color_search, trust_color_replace)

seller_ui_tag_search = 'TRUSTED SELLER'
seller_ui_tag_replace = 'HIGHLY TRUSTED ⭐'
text = text.replace(seller_ui_tag_search, seller_ui_tag_replace)

with open('ScoreShield.html', 'w', encoding='utf-8') as f:
    f.write(text)
