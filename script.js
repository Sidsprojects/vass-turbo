const nav=document.getElementById('nav');
window.addEventListener('scroll',()=>nav.classList.toggle('scrolled',window.scrollY>40),{passive:true});

// scroll progress bar
const progress=document.getElementById('scrollProgress');
function updateProgress(){
  const h=document.documentElement;
  const scrolled=h.scrollTop || document.body.scrollTop;
  const height=h.scrollHeight - h.clientHeight;
  const pct = height>0 ? (scrolled/height)*100 : 0;
  if(progress) progress.style.width = pct+'%';
}
window.addEventListener('scroll', updateProgress, {passive:true});
updateProgress();

// count-up animation for the stats numbers
function animateCount(el){
  const target=parseInt(el.dataset.count,10);
  const pad=parseInt(el.dataset.pad||'0',10);
  if(isNaN(target)) return;
  const duration=1400;
  const start=performance.now();
  function tick(now){
    const t=Math.min(1,(now-start)/duration);
    const eased=1-Math.pow(1-t,3);
    const val=Math.round(target*eased);
    el.textContent = pad ? String(val).padStart(pad,'0') : String(val);
    if(t<1) requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);
}

const observer=new IntersectionObserver((entries)=>{
  entries.forEach(entry=>{
    if(entry.isIntersecting){
      entry.target.classList.add('visible');
      const counters=entry.target.classList.contains('count') ? [entry.target] : entry.target.querySelectorAll?.('.count');
      counters && counters.forEach && counters.forEach(c=>{ if(!c.dataset.done){ c.dataset.done='1'; animateCount(c); } });
    }
  });
},{threshold:.12});
document.querySelectorAll('.reveal').forEach(el=>observer.observe(el));

const menu=document.getElementById('menu');
const desktop=document.querySelector('.desktop-nav');
menu?.addEventListener('click',()=>{
  const open=desktop.classList.toggle('mobile-open');
  menu.setAttribute('aria-expanded',open);
});
document.querySelectorAll('.desktop-nav a').forEach(a=>a.addEventListener('click',()=>desktop.classList.remove('mobile-open')));

// EmailJS Configuration
emailjs.init('YOUR_PUBLIC_KEY'); // Get this from emailjs.com

const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const statusDiv = document.getElementById('formStatus');
    const submitBtn = contactForm.querySelector('button');
    
    try {
      submitBtn.disabled = true;
      statusDiv.textContent = 'Sending...';
      statusDiv.className = 'form-status sending';
      
      const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
        message: document.getElementById('message').value,
        to_email: 'marinevess.tanko@gmail.com,technical@vesstanko.com'
      };
      
      await emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', formData);
      
      statusDiv.textContent = '✓ Message sent successfully! We will get back to you soon.';
      statusDiv.className = 'form-status success';
      contactForm.reset();
      
      setTimeout(() => {
        statusDiv.textContent = '';
      }, 5000);
    } catch (error) {
      statusDiv.textContent = '✗ Failed to send message. Please try again or email us directly.';
      statusDiv.className = 'form-status error';
      console.error('Email error:', error);
    } finally {
      submitBtn.disabled = false;
    }
  });
}
