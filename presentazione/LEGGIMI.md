# Presentazione aziendale

`presentazione.html` è la sorgente (dieci pagine, 1280x720). Le immagini vengono da `../public/images`.

Per rigenerare il PDF e metterlo sul sito:

```bash
"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" --headless=new --no-pdf-header-footer --virtual-time-budget=8000 --print-to-pdf="$PWD/Studio-Galilei-presentazione.pdf" "file://$PWD/presentazione.html"
cp Studio-Galilei-presentazione.pdf ../public/
```
