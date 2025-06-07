// ANIMATION STUFF
const {annotate, annotationGroup} = window.RoughNotation;

function setupAnnotations() 
{
    // Remove any previous annotations
    document.querySelectorAll('.rough-annotation').forEach(el => el.remove());
    const isDark = document.body.classList.contains('dark-mode');
    const e1 = document.querySelector('#ss1');
    const e2 = document.querySelector('#ss2');
    const e3 = document.querySelector('#ss3');
    // Use different colors for dark mode
    const a1 = annotate(e1, {type:'highlight', color: isDark ? 'red' : 'gold', animationDuration: 1000, multiline: true, padding: 1});
    const a2 = annotate(e2, {type:'highlight', color: isDark ? 'blue' : 'aquamarine', animationDuration: 1000, multiline: true, padding: 1});
    const a3 = annotate(e3, {type:'highlight', color: isDark ? 'orange' : 'LightPink', animationDuration: 1000, multiline: true, padding: 1});
    const ag = annotationGroup([a1, a2, a3]);
    ag.show();
    function repeatAnnotation() {
        ag.hide();
        setTimeout(() => {
            ag.show();
            setTimeout(repeatAnnotation, 4000);
        }, 500);
    }
    setTimeout(repeatAnnotation, 4000);
}

// Initial annotation setup
setupAnnotations();

// CLIPBOARD STUFF
function showToast(message) 
{
    const toast = document.getElementById('copy-toast');
    toast.textContent = message;
    toast.style.display = 'block';
    setTimeout(() => {
        toast.style.display = 'none';
    }, 1500);
}

function copyToClipboard(text) 
{
    navigator.clipboard.writeText(text)
    .then(() => {
        showToast('Phone number copied!');
    })
    .catch(err => {
        showToast('Failed to copy number.');
    });
}

document.addEventListener('DOMContentLoaded', () => 
    {
    const phoneDiv = document.getElementById('phone-number');
    phoneDiv.style.cursor = "pointer";
    phoneDiv.title = "Click to copy phone number";
    phoneDiv.addEventListener('click', () => {
        copyToClipboard("6309994501");
    });
});

function setContactIconsForTheme() {
    const isDark = document.body.classList.contains('dark-mode');
    const phonePic = document.getElementById('phone-pic');
    const emailPic = document.getElementById('email-pic');
    const linkedinPic = document.getElementById('linkedin-pic');
    if (phonePic) phonePic.src = isDark ? './resources/images/white-phone.svg' : './resources/images/phone.svg';
    if (emailPic) emailPic.src = isDark ? './resources/images/white-email.svg' : './resources/images/email.svg';
    if (linkedinPic) linkedinPic.src = isDark ? './resources/images/white-linkedin.svg' : './resources/images/linkedin.svg';
}


document.addEventListener('DOMContentLoaded', function() 
{
    setContactIconsForTheme(); // Set icons on load
    const toggle = document.getElementById('theme-toggle');
    const body = document.body;
    // Load saved theme
    if (localStorage.getItem('theme') === 'dark')
    {
        body.classList.add('dark-mode');
        toggle.checked = true;
    }
    toggle.addEventListener('change', function() 
    {
        if (toggle.checked) 
        {
            body.classList.add('dark-mode');
            localStorage.setItem('theme', 'dark');
        } 
        else 
        {
            body.classList.remove('dark-mode');
            localStorage.setItem('theme', 'light');
        }
        setupAnnotations(); // Update annotation colors on theme change
        setContactIconsForTheme(); // Update icons on theme change
    });
});