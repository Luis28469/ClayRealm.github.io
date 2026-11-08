const spells = [
  {
    "name": "Magic Missile",
    "icon": "✦",
    "color": "#7252bb",
    "label": "YOUR STARTING SPELL",
    "text": "A steady stream of arcane darts. Upgrade into faster shots and multi-missile bursts."
  },
  {
    "name": "Fireball Arsenal",
    "icon": "◉",
    "color": "#bc4b28",
    "label": "MAKE SOME SPACE",
    "text": "Throw molten clay into the crowd. Explosive splash damage makes packed hordes a little less crowded."
  },
  {
    "name": "Lightning Conduit",
    "icon": "ϟ",
    "color": "#276783",
    "label": "KEEP THE CHAIN GOING",
    "text": "Call down a strike that jumps between enemies. More upgrades mean more targets caught in the storm."
  },
  {
    "name": "Arcane Nova",
    "icon": "✺",
    "color": "#7252bb",
    "label": "YOUR MOMENT TO CAST",
    "text": "Press 1 to release a blast around your hero. Save it for a tight escape, then let the cooldown recharge."
  }
];

const tabs = [...document.querySelectorAll('[role="tab"]')];
const panel = document.querySelector('#spell-detail');
function selectSpell(index) {
  const spell = spells[index];
  tabs.forEach((tab, i) => {
    tab.setAttribute('aria-selected', String(i === index));
    tab.tabIndex = i === index ? 0 : -1;
  });
  panel.setAttribute('aria-labelledby', tabs[index].id);
  const orb = panel.querySelector('.spell-orb');
  orb.style.color = spell.color;
  orb.textContent = spell.icon;
  panel.querySelector('.eyebrow').textContent = spell.label;
  panel.querySelector('h3').textContent = spell.name;
  panel.querySelector('p:not(.eyebrow)').textContent = spell.text;
  const captions = ['Available from the first wave', 'Unlock in the shop · casts automatically', 'Unlock in the shop · casts automatically', 'Unlock in the shop · cast with 1'];
  panel.querySelector('.detail-tag').textContent = captions[index];
}
tabs.forEach((tab, index) => {
  tab.addEventListener('click', () => selectSpell(index));
  tab.addEventListener('keydown', event => {
    const steps = {ArrowDown: 1, ArrowRight: 1, ArrowUp: -1, ArrowLeft: -1};
    let next;
    if (event.key === 'Home') next = 0;
    else if (event.key === 'End') next = tabs.length - 1;
    else if (event.key in steps) next = (index + steps[event.key] + tabs.length) % tabs.length;
    else return;
    event.preventDefault();
    selectSpell(next);
    tabs[next].focus();
  });
});
const dialog = document.createElement('dialog');
dialog.className = 'lightbox';
dialog.style.display = 'none';
dialog.setAttribute('aria-label', 'Enlarged game scene');
dialog.innerHTML = '<button type="button" aria-label="Close enlarged scene">Close ×</button><img alt="">';
document.body.append(dialog);
const fullImage = dialog.querySelector('img');
dialog.querySelector('button').addEventListener('click', () => dialog.close());
dialog.addEventListener('click', event => {
  if (event.target === dialog) dialog.close();
});
dialog.addEventListener('close', () => {
  dialog.style.display = 'none';
  document.body.style.overflow = '';
});
document.querySelectorAll('.scene-button').forEach(button => {
  button.addEventListener('click', () => {
    const image = button.querySelector('img');
    fullImage.src = image.src;
    fullImage.alt = image.alt;
    dialog.style.display = '';
    dialog.showModal();
    document.body.style.overflow = 'hidden';
  });
});
