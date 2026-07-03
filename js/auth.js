/* ============================================================
   AUTH LAYER — session stored in sessionStorage (per browser tab)
   Login is by Email Address + Password, per spec.
   ============================================================ */

const AUTH = (function(){
  const SESSION_KEY = 'innovation_system_session';

  function login(email, password){
    const user = STORE.users().where(u =>
      u.email.toLowerCase() === String(email).toLowerCase() && u.password === password
    )[0];
    if(!user) return { ok:false, error: 'Incorrect email or password.' };
    if(user.status !== 'Active') return { ok:false, error: 'This account has been deactivated. Contact your Administrator.' };
    sessionStorage.setItem(SESSION_KEY, JSON.stringify({ userId: user.id, at: STORE.nowISO() }));
    return { ok:true, user };
  }

  function currentUser(){
    const raw = sessionStorage.getItem(SESSION_KEY);
    if(!raw) return null;
    try{
      const { userId } = JSON.parse(raw);
      const user = STORE.users().find(userId);
      if(!user || user.status !== 'Active'){ logout(); return null; }
      return user;
    } catch(e){ return null; }
  }

  function logout(){ sessionStorage.removeItem(SESSION_KEY); }

  function roleName(user){
    const r = STORE.roles().find(user.role);
    return r ? r.name : 'Unknown';
  }
  function deptName(user){
    const d = STORE.departments().find(user.department);
    return d ? d.name : '—';
  }
  function isAdmin(user){ return user && user.role === 'role_admin'; }
  function isCommittee(user){ return user && (user.role === 'role_committee' || user.role === 'role_admin'); }
  function isLead(user){ return user && (user.role === 'role_lead' || user.role === 'role_admin'); }

  // Redirect to login if no session; call at top of every protected page.
  function guard(){
    const user = currentUser();
    if(!user){ window.location.href = 'index.html'; return null; }
    return user;
  }
  // For pages restricted to certain roles (e.g. Admin screens)
  function guardRole(allowedRoles){
    const user = guard();
    if(!user) return null;
    if(!allowedRoles.includes(user.role)){
      alert('You do not have permission to view this screen.');
      window.location.href = 'dashboard.html';
      return null;
    }
    return user;
  }

  return { login, logout, currentUser, roleName, deptName, isAdmin, isCommittee, isLead, guard, guardRole };
})();
