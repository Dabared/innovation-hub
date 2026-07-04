/* ============================================================
   SHARED UI — sidebar, topbar, toasts, modals, icons, formatting
   ============================================================ */

const ICONS = {
  dashboard: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="7" height="9" rx="1.5"/><rect x="14" y="3" width="7" height="5" rx="1.5"/><rect x="14" y="12" width="7" height="9" rx="1.5"/><rect x="3" y="16" width="7" height="5" rx="1.5"/></svg>',
  post: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2 L14.5 8.5 L21 9 L16 13.5 L17.5 20 L12 16.5 L6.5 20 L8 13.5 L3 9 L9.5 8.5 Z"/></svg>',
  view: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7-11-7-11-7Z"/><circle cx="12" cy="12" r="3"/></svg>',
  approve: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M9 11.5 11.3 14 15.5 8.5"/><circle cx="12" cy="12" r="9.5"/></svg>',
  users: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="8" r="3.2"/><path d="M2.5 20c0-3.6 2.9-6.2 6.5-6.2s6.5 2.6 6.5 6.2"/><circle cx="17.5" cy="8.5" r="2.6"/><path d="M16 13.9c2.9.3 5 2.6 5 6.1"/></svg>',
  settings: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3.2"/><path d="M19.4 13.5a1.7 1.7 0 0 0 .3 1.9l.1.1a2 2 0 1 1-2.9 2.9l-.1-.1a1.7 1.7 0 0 0-1.9-.3 1.7 1.7 0 0 0-1 1.6v.2a2 2 0 1 1-4 0v-.1a1.7 1.7 0 0 0-1.1-1.6 1.7 1.7 0 0 0-1.9.3l-.1.1a2 2 0 1 1-2.9-2.9l.1-.1a1.7 1.7 0 0 0 .3-1.9 1.7 1.7 0 0 0-1.6-1H2.5a2 2 0 1 1 0-4h.1a1.7 1.7 0 0 0 1.6-1.1 1.7 1.7 0 0 0-.3-1.9l-.1-.1a2 2 0 1 1 2.9-2.9l.1.1a1.7 1.7 0 0 0 1.9.3H8.9a1.7 1.7 0 0 0 1-1.6V2.5a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 1 1.6 1.7 1.7 0 0 0 1.9-.3l.1-.1a2 2 0 1 1 2.9 2.9l-.1.1a1.7 1.7 0 0 0-.3 1.9v.1a1.7 1.7 0 0 0 1.6 1h.2a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.6 1Z"/></svg>',
  logout: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><path d="M16 17l5-5-5-5"/><path d="M21 12H9"/></svg>',
  search: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="7.5"/><path d="M21 21l-4.3-4.3"/></svg>',
  trash: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M3.5 6.5h17"/><path d="M8.5 6.5V4.2a1.2 1.2 0 0 1 1.2-1.2h4.6a1.2 1.2 0 0 1 1.2 1.2v2.3"/><path d="M6 6.5 6.9 20a2 2 0 0 0 2 1.9h6.2a2 2 0 0 0 2-1.9l.9-13.5"/></svg>',
  edit: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M14.5 4.5l5 5L8 21H3v-5Z"/></svg>',
  key: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="7.5" cy="15.5" r="4.5"/><path d="M10.9 12.1 19 4l2 2-2 2 1.5 1.5L18 12l-1.5-1.5-2.6 2.6"/></svg>',
  paperclip: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M21 11.5 12.4 20a4.6 4.6 0 0 1-6.5-6.5L14.6 5a3 3 0 1 1 4.3 4.3l-8.6 8.6a1.4 1.4 0 1 1-2-2l7.9-7.9"/></svg>',
  star: '<svg viewBox="0 0 24 24" fill="currentColor" stroke="none"><path d="M12 2.5l3 6.4 6.9.8-5.1 4.8 1.4 6.8-6.2-3.5-6.2 3.5 1.4-6.8-5.1-4.8 6.9-.8Z"/></svg>',
  starOutline: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M12 2.5l3 6.4 6.9.8-5.1 4.8 1.4 6.8-6.2-3.5-6.2 3.5 1.4-6.8-5.1-4.8 6.9-.8Z"/></svg>',
  comment: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4.5h16a1 1 0 0 1 1 1V16a1 1 0 0 1-1 1H9l-5 4.5V17.5H4a1 1 0 0 1-1-1V5.5a1 1 0 0 1 1-1Z"/></svg>',
  thumb: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M7 10.5v10H4a1 1 0 0 1-1-1v-8a1 1 0 0 1 1-1Z"/><path d="M7 10.5l4-8a2 2 0 0 1 2 2v4.5h5.4a2 2 0 0 1 2 2.4l-1.4 6.5a2 2 0 0 1-2 1.6H10a3 3 0 0 1-3-3Z"/></svg>',
  bulb: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M9 18h6"/><path d="M10 21.5h4"/><path d="M12 2.5a6.5 6.5 0 0 0-3.8 11.8c.6.5 1 1.2 1 2v.7h5.6v-.7c0-.8.4-1.5 1-2A6.5 6.5 0 0 0 12 2.5Z"/></svg>',
  fire: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 21.5c4 0 6.5-2.6 6.5-6 0-3-2-4.8-3-7-1 1.4-1.6 2-2.6 2 .3-2 .1-3.6-1.4-5.5C11 8 7.5 9.5 7.5 13.8c0 .9.2 1.7.6 2.4-1-.4-1.6-1.1-2-2.1-1 4.4 1.9 7.4 5.9 7.4Z"/></svg>',
  building: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="3" width="16" height="18" rx="1"/><path d="M9 8h1M14 8h1M9 12h1M14 12h1M9 16h1M14 16h1"/></svg>',
  chevronDown: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 9l6 6 6-6"/></svg>',
  inbox: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M3 12h4.5l1.5 3h6l1.5-3H21"/><path d="M5.5 5.5h13l2.5 6.5v7a1.5 1.5 0 0 1-1.5 1.5h-15A1.5 1.5 0 0 1 3 19v-7Z"/></svg>',
};

function fmtDate(iso){
  const d = new Date(iso);
  return d.toLocaleDateString('en-GB', { day:'2-digit', month:'short', year:'numeric' });
}
function fmtDateTime(iso){
  const d = new Date(iso);
  return d.toLocaleDateString('en-GB', { day:'2-digit', month:'short', year:'numeric' }) + ' · ' + d.toLocaleTimeString('en-GB', { hour:'2-digit', minute:'2-digit' });
}
function initials(name){
  return name.split(' ').filter(Boolean).slice(0,2).map(w=>w[0].toUpperCase()).join('');
}
function escapeHtml(str){
  const div = document.createElement('div'); div.textContent = str ?? ''; return div.innerHTML;
}

/* ---------- NAV CONFIG ---------- */
const NAV_ITEMS = [
  { page: 'dashboard.html',  label: 'Lead Dashboard',    icon: 'dashboard', roles: ['role_admin','role_lead','role_committee','role_employee'] },
  { page: 'idea-post.html',  label: 'Post an Idea',      icon: 'post',      roles: ['role_admin','role_lead','role_committee','role_employee'] },
  { page: 'idea-view.html',  label: 'Browse Ideas',      icon: 'view',      roles: ['role_admin','role_lead','role_committee','role_employee'] },
  { page: 'approve.html',    label: 'Approve Ideas',     icon: 'approve',   roles: ['role_admin','role_committee'] },
  { page: 'admin.html',      label: 'User Administration', icon: 'users',   roles: ['role_admin'] },
  { page: 'maintenance.html',label: 'System Maintenance', icon: 'settings', roles: ['role_admin'] },
];

function renderShell({ activePage, title, eyebrow, topbarActionsHtml }){
  const user = AUTH.guard();
  if(!user) return null;

  const items = NAV_ITEMS.filter(i => i.roles.includes(user.role));
  const navHtml = items.map(i => `
    <a class="sidebar__link ${i.page===activePage?'active':''}" href="${i.page}">
      ${ICONS[i.icon]}<span>${i.label}</span>
    </a>`).join('');

  document.body.insertAdjacentHTML('afterbegin', `
    <div class="app-shell">
      <aside class="sidebar" id="sidebar">
        <div class="sidebar__brand">
          <div class="brand-mark"></div>
          <div class="sidebar__brand-text">Innovation Hub<span>Idea Management System</span></div>
        </div>
        <nav class="sidebar__nav">
          <div class="sidebar__section-label">Workspace</div>
          ${navHtml}
        </nav>
        <div class="sidebar__footer">
          <div class="sidebar__user" ${user.role==='role_admin'?`onclick="window.location.href='admin.html'" style="cursor:pointer;"`:''} title="${user.role==='role_admin'?'Manage users':''}">
            <div class="avatar">${initials(user.fullName)}</div>
            <div class="sidebar__user-meta">
              <div class="sidebar__user-name">${escapeHtml(user.callName)}</div>
              <div class="sidebar__user-role">${escapeHtml(AUTH.roleName(user))}</div>
            </div>
          </div>
          <button class="logout-btn" id="logout-btn">${ICONS.logout} Sign out</button>
        </div>
      </aside>
      <div class="main">
        <header class="topbar">
          <div>
            <div class="topbar__eyebrow">${eyebrow||''}</div>
            <div class="topbar__title">${title||''}</div>
          </div>
          <div class="topbar__actions">${topbarActionsHtml||''}</div>
        </header>
        <main class="content" id="content-mount"></main>
      </div>
    </div>
    <div class="toast-stack" id="toast-stack"></div>
    <div class="modal-backdrop" id="modal-backdrop"><div class="modal" id="modal-root"></div></div>
  `);

  document.getElementById('logout-btn').addEventListener('click', () => {
    AUTH.logout(); window.location.href = 'index.html';
  });

  return user;
}

function toast(msg, type){
  const stack = document.getElementById('toast-stack');
  if(!stack) return;
  const el = document.createElement('div');
  el.className = 'toast ' + (type||'');
  el.textContent = msg;
  stack.appendChild(el);
  setTimeout(()=>{ el.style.opacity='0'; el.style.transition='opacity .25s'; setTimeout(()=>el.remove(), 260); }, 2600);
}

function openModal(html){
  document.getElementById('modal-root').innerHTML = html;
  document.getElementById('modal-backdrop').classList.add('open');
}
function closeModal(){
  document.getElementById('modal-backdrop').classList.remove('open');
  document.getElementById('modal-root').innerHTML = '';
}
document.addEventListener('click', (e)=>{
  if(e.target && e.target.id === 'modal-backdrop') closeModal();
});

function confirmAction({ title, message, confirmLabel, danger, onConfirm }){
  openModal(`
    <div class="modal__head"><h3>${escapeHtml(title)}</h3><button class="modal-close" onclick="closeModal()">&times;</button></div>
    <div class="modal__body"><p style="margin:0;color:var(--text-muted);font-size:13.5px;">${escapeHtml(message)}</p></div>
    <div class="modal__foot">
      <button class="btn btn-outline" onclick="closeModal()">Cancel</button>
      <button class="btn ${danger?'btn-danger':'btn-primary'}" id="confirm-action-btn">${escapeHtml(confirmLabel||'Confirm')}</button>
    </div>
  `);
  document.getElementById('confirm-action-btn').addEventListener('click', ()=>{ closeModal(); onConfirm(); });
}

/* ---------- GLOBAL LOADER / ERROR OVERLAY (used while talking to the Google Sheet) ---------- */
function ensureLoaderEl(){
  let el = document.getElementById('global-loader');
  if(!el){
    el = document.createElement('div');
    el.id = 'global-loader';
    el.className = 'global-loader';
    document.body.appendChild(el);
  }
  return el;
}
function showLoader(msg){
  const el = ensureLoaderEl();
  el.innerHTML = `<div class="global-loader__box"><div class="spinner"></div><div>${escapeHtml(msg||'Loading…')}</div></div>`;
  el.style.display = 'flex';
}
function hideLoader(){
  const el = document.getElementById('global-loader');
  if(el) el.style.display = 'none';
}
function showLoadError(msg){
  const el = ensureLoaderEl();
  el.innerHTML = `
    <div class="global-loader__box error">
      <b>Couldn't load data from Google Sheets</b>
      <div style="margin-top:6px;font-size:12.5px;color:var(--text-muted);">${escapeHtml(msg)}</div>
      <div style="margin-top:6px;font-size:11.5px;color:var(--text-muted);">Check your internet connection, the Apps Script deployment access setting, and that WEB_APP_URL in js/remoteApi.js is correct.</div>
      <button class="btn btn-primary btn-sm" style="margin-top:14px;" onclick="location.reload()">Retry</button>
    </div>`;
  el.style.display = 'flex';
}
// Wraps the common page bootstrap: show loader, load the Sheet cache, run `fn`, hide loader.
// `fn` receives nothing and should do its own AUTH.guard()/renderShell()/rendering.
async function bootPage(fn){
  showLoader('Loading data from Google Sheets…');
  try{
    await STORE.init();
  } catch(err){
    showLoadError(err && err.message ? err.message : String(err));
    return;
  }
  hideLoader();
  try{
    await fn();
  } catch(err){
    console.error(err);
    toast('Something went wrong: ' + (err && err.message ? err.message : err), 'error');
  }
}
