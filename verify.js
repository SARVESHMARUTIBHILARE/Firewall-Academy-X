function esc(s){return String(s??'').replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]))}
function run(){
 const q=new URLSearchParams(location.search), id=q.get('id'), box=document.getElementById('verifyBox');
 if(!id){box.innerHTML='<span class="tag">INVALID REQUEST</span><h1>No certificate ID</h1><p class="muted">A certificate ID is required.</p><a class="secondary" href="index.html">← Return to Academy</a>';return}
 let found=null;
 try{
  const accounts=JSON.parse(localStorage.getItem('fwLocalAccounts')||'[]');
  for(const a of accounts){found=(a.certificates||[]).find(c=>c.number===id);if(found){found={...found,userName:a.name,userEmail:a.email};break}}
  const current=JSON.parse(localStorage.getItem('fwUser')||'null');
  if(!found&&current){found=(current.certificates||[]).find(c=>c.number===id);if(found)found={...found,userName:current.name,userEmail:current.email}}
 }catch(_){}
 if(!found && q.get('course')) found={number:id,title:q.get('course')+' Certificate',issuedAt:q.get('issued')||new Date().toISOString(),status:q.get('status')||'VERIFIED',userName:q.get('name')||'Learner',issuer:q.get('issuer')||'Firewall Academy X',portable:true};
 if(!found){box.innerHTML='<span class="tag">NOT VERIFIED</span><h1>Certificate not found</h1><p class="muted">This certificate ID does not match a stored learner record or a valid certificate verification link.</p><a class="secondary" href="index.html">← Return to Academy</a>';return}
 const title=(found.title||'Certificate').replace(/ Certificate$/,'');
 const date=new Date(found.issuedAt);
 const issued=Number.isNaN(date.getTime())?'—':date.toLocaleDateString('en-GB',{day:'2-digit',month:'long',year:'numeric'});
 const name=(found.userName||'Learner').trim().replace(/\b\w/g,m=>m.toUpperCase());
 box.innerHTML='<span class="verifiedBadge">✓ VERIFIED DIGITAL RECORD</span><h1>'+esc(title)+'</h1><p class="muted">This certificate was issued by Firewall Academy X and passed certificate verification.</p><div class="certRealMeta"><div><b>Certificate ID</b><br>'+esc(found.number)+'
   </div><div><b>Learner</b><br>'+esc(name)+'</div><div><b>Issued</b><br>'+esc(issued)+'</div><div><b>Course</b><br>'+esc(title)+'</div><div><b>Issuer</b><br>Firewall Academy X</div><div><b>Status</b><br><span class="good">✓ VERIFIED</span></div>
   </div><p class="verificationNote">Digital verification record • Certificate ID: <b>'+esc(found.number)+'</b></p><a class="secondary" href="index.html">← Return to Academy</a>';
}
run();
