
// ANIMATION STUFF
const {annotate, annotationGroup} = window.RoughNotation;

const e1 = document.querySelector('#ss1');
const a1 = annotate(e1, {type:'highlight', color:'gold', animationDuration: 1000, multiline: true, padding: 1});
const e2 = document.querySelector('#ss2');
const a2 = annotate(e2, {type:'highlight', color:'aquamarine', animationDuration: 1000, multiline: true, padding: 1});
const e3 = document.querySelector('#ss3');
const a3 = annotate(e3, {type:'highlight', color:'LightPink', animationDuration: 1000, multiline: true, padding: 1});

const ag = annotationGroup([a1, a2, a3]);
ag.show();

function repeatAnnotation() {
    ag.hide();
    setTimeout(() => {
        ag.show();
        setTimeout(repeatAnnotation, 4000); // Adjust 2000ms for your preferred interval
    }, 500); // Wait for hide animation to finish
}

setTimeout(repeatAnnotation, 4000); // Start the loop after the first show

// CLIPBOARD STUFF
function showToast(message) {
    const toast = document.getElementById('copy-toast');
    toast.textContent = message;
    toast.style.display = 'block';
    setTimeout(() => {
        toast.style.display = 'none';
    }, 1500);
}

function copyToClipboard(text) {
    navigator.clipboard.writeText(text)
    .then(() => {
        showToast('Phone number copied!');
    })
    .catch(err => {
        showToast('Failed to copy number.');
    });
}

document.addEventListener('DOMContentLoaded', () => {
    const phoneDiv = document.getElementById('phone-number');
    phoneDiv.style.cursor = "pointer";
    phoneDiv.title = "Click to copy phone number";
    phoneDiv.addEventListener('click', () => {
        copyToClipboard("6309994501");
    });
});