# Genera sito/index.html = originale + ritocchi al bundle + effetti iniettati prima dell'ultimo </body>
import pathlib
base = pathlib.Path(__file__).resolve().parent.parent
s = (base / "index-originale.html").read_text(encoding="utf-8")

# Ritocchi testuali al bundle React (ogni testo deve comparire esattamente una volta)
sostituzioni = [
    # "Un partner." / "One partner." in uno span stilizzabile
    ('children:["Un partner.",', 'children:[A.jsx("span",{className:"sg-partner",children:"Un partner."}),'),
    ('children:["One partner.",', 'children:[A.jsx("span",{className:"sg-partner",children:"One partner."}),'),
    # pulsante secondario dell'hero: porta al calendario (lo scorrimento lo gestisce sg-effetti.js)
    ('variant:"ghost-light",children:t("Parla con noi","Talk to us")',
     'variant:"ghost-light",children:t("Prenota una chiamata conoscitiva","Book an intro call")'),
]
for vecchio, nuovo in sostituzioni:
    n = s.count(vecchio)
    assert n == 1, f"{vecchio!r} trovato {n} volte"
    s = s.replace(vecchio, nuovo)

css = (base / "modifiche/sg-effetti.css").read_text(encoding="utf-8")
js = (base / "modifiche/sg-effetti.js").read_text(encoding="utf-8")
# marchio Studio Galilei (estratto dalla favicon del sito) per i timbri
js = js.replace("__MARCHIO_PATH__", (base / "modifiche/marchio-path.txt").read_text(encoding="utf-8").strip())
blocco = f"<style id=\"sg-effetti-css\">\n{css}</style>\n<script id=\"sg-effetti-js\">\n{js}</script>\n"
i = s.rfind("</body>")
(base / "index.html").write_text(s[:i] + blocco + s[i:], encoding="utf-8")
print("ok", len(s) + len(blocco))
