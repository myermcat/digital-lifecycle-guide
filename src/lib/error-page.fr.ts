export function renderErrorPage(): string {
  // The English twin hard-codes href="/", which sends a French reader out of the
  // French site. BASE_URL is the same value on the server render and in the browser,
  // and it already carries the locale: "/digital-lifecycle-guide/fr/" on GitHub Pages,
  // "/" on the French dev server. Deriving the link from it beats a hard-coded string.
  const home = import.meta.env.BASE_URL || "/";
  return `<!doctype html>
<html lang="fr">
  <head>
    <meta charset="utf-8" />
    <title>Cette page ne s’est pas chargée</title>
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <style>
      body { font: 15px/1.5 system-ui, -apple-system, sans-serif; background: #fafafa; color: #111; display: grid; place-items: center; min-height: 100vh; margin: 0; padding: 1.5rem; }
      .card { max-width: 28rem; width: 100%; text-align: center; padding: 2rem; }
      h1 { font-size: 1.25rem; margin: 0 0 0.5rem; }
      p { color: #4b5563; margin: 0 0 1.5rem; }
      .actions { display: flex; gap: 0.5rem; justify-content: center; flex-wrap: wrap; }
      a, button { padding: 0.5rem 1rem; border-radius: 0.375rem; font: inherit; cursor: pointer; text-decoration: none; border: 1px solid transparent; }
      .primary { background: #111; color: #fff; }
      .secondary { background: #fff; color: #111; border-color: #d1d5db; }
    </style>
  </head>
  <body>
    <div class="card">
      <h1>Cette page ne s’est pas chargée</h1>
      <p>Quelque chose a mal tourné de notre côté. Vous pouvez essayer d’actualiser ou revenir à l’accueil.</p>
      <div class="actions">
        <button class="primary" onclick="location.reload()">Réessayer</button>
        <a class="secondary" href="${home}">Aller à l’accueil</a>
      </div>
    </div>
  </body>
</html>`;
}
