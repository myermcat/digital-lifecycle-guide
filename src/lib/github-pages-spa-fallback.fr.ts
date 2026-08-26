/**
 * Restores the client route after GitHub Pages serves public/404.html.
 * Pair with public/404.html (rafgraph spa-github-pages pattern).
 */
export const GITHUB_PAGES_SPA_RESTORE_SCRIPT = `(function(l){if(l.search[1]==="/"){var decoded=l.search.slice(1).split("&").map(function(s){return s.replace(/~and~/g,"&")}).join("?");window.history.replaceState(null,null,l.pathname.slice(0,-1)+decoded+l.hash)}})(window.location)`;
