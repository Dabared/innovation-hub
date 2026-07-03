/* ============================================================
   DATA LAYER
   Mirrors the Google Sheet table structure 1:1 — each "table"
   below is one Sheet tab (see /database/Innovation_System_Database_Structure.xlsx).
   Persisted to localStorage so the demo works with zero backend.
   Swap STORE.* methods for real Google Sheets / Apps Script Web
   App calls later without touching page code — see README.
   ============================================================ */

const DB_KEY = 'innovation_system_db_v1';

const STORE = (function(){

  function uid(prefix){ return prefix + '_' + Math.random().toString(36).slice(2,9); }
  function nowISO(){ return new Date().toISOString(); }

  function seed(){
    const departments = [
      { id: 'dept_it',      name: 'Information Technology' },
      { id: 'dept_ops',     name: 'Operations' },
      { id: 'dept_mkt',     name: 'Marketing' },
      { id: 'dept_hr',      name: 'Human Resources' },
      { id: 'dept_fin',     name: 'Finance' },
      { id: 'dept_cs',      name: 'Customer Service' },
    ];
    const roles = [
      { id: 'role_admin',     name: 'Administrator',        description: 'Full system access — user & system maintenance' },
      { id: 'role_committee', name: 'Innovation Committee',  description: 'Reviews and approves submitted ideas' },
      { id: 'role_lead',      name: 'Department Lead',       description: 'Views dashboard analytics for their department' },
      { id: 'role_employee',  name: 'Employee',               description: 'Submits and engages with innovation ideas' },
    ];
    const categories = [
      { id: 'cat_process',  name: 'Process Improvement' },
      { id: 'cat_product',  name: 'Product Innovation' },
      { id: 'cat_tech',     name: 'Technology & Automation' },
      { id: 'cat_cx',       name: 'Customer Experience' },
      { id: 'cat_sustain',  name: 'Sustainability' },
      { id: 'cat_culture',  name: 'Workplace Culture' },
    ];
    const users = [
      { id: 'u_admin',   fullName: 'Ayesha Perera',   callName: 'Ayesha',  department: 'dept_it',  email: 'admin@innovate.com',     role: 'role_admin',     password: 'admin123',  status: 'Active', createdAt: nowISO() },
      { id: 'u_lead',    fullName: 'Ruwan Silva',     callName: 'Ruwan',   department: 'dept_ops', email: 'lead@innovate.com',      role: 'role_lead',      password: 'lead123',   status: 'Active', createdAt: nowISO() },
      { id: 'u_comm',    fullName: 'Nadeeka Fonseka', callName: 'Nadeeka', department: 'dept_hr',  email: 'committee@innovate.com', role: 'role_committee', password: 'comm123',   status: 'Active', createdAt: nowISO() },
      { id: 'u_emp1',    fullName: 'Kasun Jayasuriya',callName: 'Kasun',   department: 'dept_it',  email: 'kasun@innovate.com',     role: 'role_employee',  password: 'user123',   status: 'Active', createdAt: nowISO() },
      { id: 'u_emp2',    fullName: 'Dilani Wickrama', callName: 'Dilani',  department: 'dept_mkt', email: 'dilani@innovate.com',    role: 'role_employee',  password: 'user123',   status: 'Active', createdAt: nowISO() },
    ];
    const ideas = [
      { id: 'idea_1', title: 'AI-assisted ticket triage for Customer Service', categoryId: 'cat_tech', targetChallenge: 'First-response time exceeds SLA during peak hours.', currentProblem: 'Agents manually read and tag every incoming ticket before routing, causing a backlog.', proposedSolution: 'Use a lightweight classifier to auto-tag and route tickets to the right queue, flagging urgent ones instantly.', targetAudience: 'Customer Service team, all shifts', attachmentName: 'triage-flow.pdf', authorId: 'u_emp1', department: 'dept_it', status: 'Submitted', createdAt: nowISO(), updatedAt: nowISO() },
      { id: 'idea_2', title: 'Reusable packaging pilot for regional distribution', categoryId: 'cat_sustain', targetChallenge: 'Single-use packaging waste across regional warehouses.', currentProblem: 'Cardboard and plastic wrap are discarded after every delivery cycle with no return loop.', proposedSolution: 'Pilot a returnable crate system with three regional partners, tracked via QR code.', targetAudience: 'Operations & Logistics', attachmentName: 'packaging-pilot.xlsx', authorId: 'u_emp2', department: 'dept_mkt', status: 'Approved', createdAt: nowISO(), updatedAt: nowISO() },
      { id: 'idea_3', title: 'Internal skills marketplace', categoryId: 'cat_culture', targetChallenge: 'Cross-department projects stall waiting on the right skillset.', currentProblem: 'No visibility into who has bandwidth or hidden skills outside their job title.', proposedSolution: 'A lightweight internal board where staff list skills and availability for short-term project loans.', targetAudience: 'All departments', attachmentName: '', authorId: 'u_emp1', department: 'dept_it', status: 'Needs Revision', createdAt: nowISO(), updatedAt: nowISO() },
    ];
    const comments = [
      { id: uid('cm'), ideaId: 'idea_1', userId: 'u_lead', text: 'Strong idea — do we have a rough estimate on classifier accuracy?', createdAt: nowISO(), context: 'view' },
      { id: uid('cm'), ideaId: 'idea_2', userId: 'u_comm', text: 'Approved for a 3-month pilot. Please loop in Procurement.', createdAt: nowISO(), context: 'approval' },
    ];
    const ratings = [ { id: uid('rt'), ideaId: 'idea_1', userId: 'u_lead', stars: 4 } ];
    const reactions = [ { id: uid('rx'), ideaId: 'idea_2', userId: 'u_emp1', type: 'insightful' } ];
    const approvals = [
      { id: uid('ap'), ideaId: 'idea_2', committeeUserId: 'u_comm', decision: 'Approved', comment: 'Great sustainability win, low cost to trial.', createdAt: nowISO() },
      { id: uid('ap'), ideaId: 'idea_3', committeeUserId: 'u_comm', decision: 'Needs Revision', comment: 'Please clarify how availability data stays current.', createdAt: nowISO() },
    ];
    return { departments, roles, categories, users, ideas, comments, ratings, reactions, approvals };
  }

  function load(){
    const raw = localStorage.getItem(DB_KEY);
    if(!raw){ const data = seed(); localStorage.setItem(DB_KEY, JSON.stringify(data)); return data; }
    try { return JSON.parse(raw); } catch(e){ const data = seed(); localStorage.setItem(DB_KEY, JSON.stringify(data)); return data; }
  }
  function save(data){ localStorage.setItem(DB_KEY, JSON.stringify(data)); }

  let db = load();

  function table(name){
    return {
      all(){ return db[name]; },
      find(id){ return db[name].find(r => r.id === id); },
      where(pred){ return db[name].filter(pred); },
      insert(record){ if(!record.id) record.id = uid(name.slice(0,3)); db[name].push(record); save(db); return record; },
      update(id, patch){ const r = db[name].find(r=>r.id===id); if(!r) return null; Object.assign(r, patch); save(db); return r; },
      remove(id){ db[name] = db[name].filter(r=>r.id!==id); save(db); },
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
    resetDemo(){ db = seed(); save(db); },
    _raw(){ return db; }
  };
})();
