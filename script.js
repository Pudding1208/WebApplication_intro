(()=>{
  const page=Number(document.body.dataset.page);
  const pages=['','cover','website','web-page-website-app','html-file','html-structure','browser-html','html-only','html-css-js','static-site','web-application','architecture','frontend','backend-database','login-flow','summary'];
  const labels=['','封面｜從網頁到 Web Application','打開網站時發生了什麼？','網頁、網站與 Web Application','HTML 檔案是什麼？','HTML 的基本結構','瀏覽器如何讀懂 HTML？','只有 HTML 可以做到什麼？','HTML、CSS、JavaScript 如何分工？','什麼是靜態網站？','什麼是 Web Application？','Web Application 的三個部分','前端是什麼？','後端與資料庫是什麼？','一次登入的系統流程','從 HTML 到 Web Application'];
  const go=n=>{if(n>0&&n<=15)location.href=`${String(n).padStart(2,'0')}-${pages[n]}.html`};
  document.querySelector('[data-next]')?.addEventListener('click',()=>go(page+1));
  document.querySelector('[data-prev]')?.addEventListener('click',()=>go(page-1));
  document.querySelectorAll('[data-target]').forEach(button=>button.addEventListener('click',()=>{const switcher=button.closest('[data-switcher]');switcher.querySelectorAll('button').forEach(item=>item.classList.toggle('active',item===button));switcher.parentElement.querySelectorAll('.state').forEach(item=>item.classList.toggle('active',item.dataset.state===button.dataset.target))}));
  const trigger=document.querySelector('[data-fullscreen]');
  let panel,backdrop;
  const closeMenu=()=>{panel?.classList.remove('open');backdrop?.classList.remove('open');trigger?.setAttribute('aria-expanded','false')};
  const openMenu=()=>{panel?.classList.add('open');backdrop?.classList.add('open');trigger?.setAttribute('aria-expanded','true');panel?.querySelector('a,button')?.focus()};
  if(trigger){
    trigger.className='menu-toggle';trigger.textContent='選單';trigger.setAttribute('aria-label','開啟頁面選單');trigger.setAttribute('aria-expanded','false');
    backdrop=document.createElement('div');backdrop.className='menu-backdrop';backdrop.addEventListener('click',closeMenu);
    panel=document.createElement('aside');panel.className='menu-panel';panel.setAttribute('aria-label','簡報導覽');
    const items=pages.slice(1).map((name,index)=>{const number=index+1;return `<a href="${String(number).padStart(2,'0')}-${name}.html"${number===page?' aria-current="page"':''}>${String(number).padStart(2,'0')}｜${labels[number]}</a>`}).join('');
    panel.innerHTML=`<div class="menu-head"><h3>簡報目錄</h3><button type="button" aria-label="關閉選單" data-close-menu>×</button></div><nav class="menu-list">${items}</nav><div class="menu-actions"><button type="button" data-enter-fullscreen>全螢幕</button></div>`;
    document.body.append(backdrop,panel);
    trigger.addEventListener('click',()=>panel.classList.contains('open')?closeMenu():openMenu());
    panel.querySelector('[data-close-menu]').addEventListener('click',closeMenu);
    panel.querySelector('[data-enter-fullscreen]').addEventListener('click',()=>{document.documentElement.requestFullscreen?.();closeMenu()});
  }
  document.addEventListener('keydown',event=>{if(event.key==='Escape')closeMenu();if(['ArrowRight','PageDown',' '].includes(event.key)&&!panel?.classList.contains('open')){event.preventDefault();go(page+1)}if(['ArrowLeft','PageUp'].includes(event.key)&&!panel?.classList.contains('open')){event.preventDefault();go(page-1)}if(event.key.toLowerCase()==='f')document.documentElement.requestFullscreen?.()});
})();
