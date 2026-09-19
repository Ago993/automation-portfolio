# Software Automation Portfolio

Landing page portfolio per presentare servizi di automazione software e tre demo funzionanti:

- QuoteFlow: preventivi, catalogo locale, prezzi e IVA;
- ReportFlow: KPI, margini e report da CSV;
- ListinoDiff: confronto automatico tra listini CSV.

I nomi delle demo sono nomi di lavoro e non rappresentano necessariamente brand commerciali definitivi.

## Design

Direzione visiva **Tech Premium**:

- hero con mockup reali in profondita 3D;
- showcase 3D navigabile delle demo;
- animazioni leggere CSS/DOM;
- fallback responsive per mobile;
- rispetto di `prefers-reduced-motion`;
- nessuna libreria grafica o WebGL richiesta.

## Obiettivo

La pagina e costruita come landing commerciale, non come semplice elenco di progetti:

`problema -> soluzione -> demo -> metodo -> contatto`.

## Stack

HTML, CSS e JavaScript puro. Nessuna dipendenza runtime.

## Demo collegate

- https://ago993.github.io/quoteflow-demo/
- https://ago993.github.io/reportflow-demo/
- https://ago993.github.io/listinodiff-demo/

## Test

```bash
node --check app.js
node tests/test_static.js
```

## Avvio locale

```bash
python -m http.server 8030
```

Poi apri `http://localhost:8030/`.

## Nota commerciale

Prima dell'outreach verra collegato il canale di contatto commerciale definitivo (ad esempio il profilo/Service Page LinkedIn).
