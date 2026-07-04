/* ============================================================
   REMOTE API CLIENT (optional) — talks to the Apps Script Web App
   deployed from apps-script/Code.gs, so every user shares the
   same live Google Sheet instead of separate localStorage copies.

   This mirrors STORE's table() methods 1:1 in *name*, but every
   method here returns a Promise, since it's a real network call.
   Not wired in by default — see "Going live" in README.md for the
   short list of call sites in each page that would need `await`.
   ============================================================ */

const REMOTE_API = (function(){
  // Deployed Apps Script Web App URL (Deploy > Manage deployments):
  const WEB_APP_URL = 'https://script.google.com/macros/s/AKfycbyi9QKmOvRZv0QQKbbH818gn7tBIDAe6EuuYqnPDxLsBdbxYcdAF-_Z50ul3ILmEcmkkA/exec';

  async function list(table){
    const res = await fetch(`${WEB_APP_URL}?action=list&table=${encodeURIComponent(table)}`);
    const json = await res.json();
    if(!json.ok) throw new Error(json.error);
    return json.data;
  }
  async function find(table, id){
    const res = await fetch(`${WEB_APP_URL}?action=find&table=${encodeURIComponent(table)}&id=${encodeURIComponent(id)}`);
    const json = await res.json();
    if(!json.ok) throw new Error(json.error);
    return json.data;
  }
  async function where(table, field, value){
    const res = await fetch(`${WEB_APP_URL}?action=where&table=${encodeURIComponent(table)}&field=${encodeURIComponent(field)}&value=${encodeURIComponent(value)}`);
    const json = await res.json();
    if(!json.ok) throw new Error(json.error);
    return json.data;
  }
  // Content-Type text/plain avoids a CORS preflight, which Apps Script can't answer.
  async function post(body){
    const res = await fetch(WEB_APP_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'text/plain;charset=utf-8' },
      body: JSON.stringify(body),
    });
    const json = await res.json();
    if(!json.ok) throw new Error(json.error);
    return json.data;
  }
  const insert = (table, payload) => post({ action:'insert', table, payload });
  const update = (table, id, payload) => post({ action:'update', table, id, payload });
  const remove = (table, id) => post({ action:'remove', table, id });

  function table(name){
    return {
      all: () => list(name),
      find: (id) => find(name, id),
      where: (field, value) => where(name, field, value),
      insert: (payload) => insert(name, payload),
      update: (id, payload) => update(name, id, payload),
      remove: (id) => remove(name, id),
    };
  }

  return {
    departments: () => table('Departments'),
    roles: () => table('Roles'),
    categories: () => table('Categories'),
    users: () => table('Users'),
    ideas: () => table('Ideas'),
    comments: () => table('Comments'),
    ratings: () => table('Ratings'),
    reactions: () => table('Reactions'),
    approvals: () => table('Approvals'),
  };
})();
