/* ============================================================
   DATA LAYER — CONNECTED MODE
   Every table (Departments, Roles, Categories, Users, Ideas,
   Comments, Ratings, Reactions, Approvals) now lives in your
   Google Sheet and is served through the Apps Script Web App
   (see apps-script/Code.gs + js/remoteApi.js).

   This file keeps the exact same STORE.xxx().all()/find()/where()/
   insert()/update()/remove() shape the rest of the app already
   uses, so pages barely changed — the difference is:
     - all()/find()/where() read from an in-memory cache (sync,
       instant — no network call per render)
     - insert()/update()/remove() call the Google Sheet over the
       network (so they're async — pages `await` them, then the
       cache is refreshed automatically before re-rendering)

   Call `await STORE.init()` once at the top of every page, before
   rendering anything, to load the cache from the Sheet.
   ============================================================ */

const STORE = (function(){

  const TABLES = ['departments','roles','categories','users','ideas','comments','ratings','reactions','approvals'];
  const cache = {}; TABLES.forEach(t => cache[t] = []);
  let loaded = false;
  let loadingPromise = null;

  function uid(prefix){ return prefix + '_' + Math.random().toString(36).slice(2,9); }
  function nowISO(){ return new Date().toISOString(); }

  async function refresh(name){
    cache[name] = await REMOTE_API[name]().all();
  }

  async function refreshAll(){
    const results = await Promise.all(TABLES.map(t => REMOTE_API[t]().all()));
    TABLES.forEach((t,i) => cache[t] = results[i]);
  }

  // Loads once per page view. Safe to call multiple times.
  function init(){
    if(loaded) return Promise.resolve();
    if(loadingPromise) return loadingPromise;
    loadingPromise = refreshAll().then(()=>{ loaded = true; loadingPromise = null; });
    return loadingPromise;
  }

  function table(name){
    return {
      all(){ return cache[name]; },
      find(id){ return cache[name].find(r => String(r.id) === String(id)); },
      where(pred){ return cache[name].filter(pred); },
      async insert(record){
        if(!record.id) record.id = uid(name.slice(0,3));
        await REMOTE_API[name]().insert(record);
        await refresh(name);
        return record;
      },
      async update(id, patch){
        await REMOTE_API[name]().update(id, patch);
        await refresh(name);
        return table(name).find(id);
      },
      async remove(id){
        await REMOTE_API[name]().remove(id);
        await refresh(name);
      },
    };
  }

  return {
    departments: () => table('departments'),
    roles: () => table('roles'),
    categories: () => table('categories'),
    users: () => table('users'),
    ideas: () => table('ideas'),
    comments: () => table('comments'),
    ratings: () => table('ratings'),
    reactions: () => table('reactions'),
    approvals: () => table('approvals'),
    uid, nowISO,
    init, refreshAll,
    isLoaded: () => loaded,
  };
})();
