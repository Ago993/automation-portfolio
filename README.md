# Software Automation Portfolio

Landing page portfolio per presentare servizi di automazione software e cinque demo funzionanti:

- QuoteFlow: preventivi, catalogo locale, prezzi e IVA;
- ReportFlow: KPI, margini e report da CSV;
- ListinoDiff: confronto automatico tra listini CSV;
- ImportFlow: mappatura, validazione e normalizzazione di export tra sistemi già esistenti.
- ReconcileFlow: riconciliazione di due export con match, differenze, mancanti e duplicati.

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

`problema -> soluzione -> pacchetti -> scenari dimostrativi -> demo -> metodo -> contatto`.

Il canale commerciale principale collegato alla landing e la LinkedIn Service Page; il profilo LinkedIn personale resta disponibile nel footer insieme al profilo GitHub. La landing presenta tre pacchetti iniziali: Data Bridge da EUR 149, Control & Reconcile da EUR 199 e Workflow Lite da EUR 249. I prezzi sono punti di partenza per micro-progetti con scope definito.

## Stack

HTML, CSS e JavaScript puro. Nessuna dipendenza runtime.

## Demo collegate

- https://ago993.github.io/quoteflow-demo/
- https://ago993.github.io/reportflow-demo/
- https://ago993.github.io/listinodiff-demo/
- https://ago993.github.io/importflow-demo/
- https://ago993.github.io/reconcileflow-demo/

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

Il canale commerciale principale collegato alla landing è la LinkedIn Service Page, con profilo LinkedIn personale disponibile nel footer.
