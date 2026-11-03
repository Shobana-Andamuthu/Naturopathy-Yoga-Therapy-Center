const fs = require('fs');

const files = ['index.html', 'home-2.html', 'about.html', 'therapies.html', 'doctors.html', 'contact.html'];
let allPassed = true;

for (const f of files) {
  const content = fs.readFileSync(f, 'utf8');
  if (!content.includes('mobile-drawer-actions')) {
    console.error(`FAIL: ${f} missing mobile-drawer-actions`);
    allPassed = false;
  }
  if (content.includes('mobile-drawer-tools')) {
    console.error(`FAIL: ${f} still has mobile-drawer-tools`);
    allPassed = false;
  }
  if (content.includes('theme-label')) {
    console.error(`FAIL: ${f} still has theme-label`);
    allPassed = false;
  }
  if (content.includes('data-icon="globe"')) {
    console.error(`FAIL: ${f} still has data-icon="globe"`);
    allPassed = false;
  }
  const actionMatch = content.match(/<div class="mobile-drawer-actions">([\s\S]*?)<\/div>/);
  if (!actionMatch) {
    console.error(`FAIL: ${f} mobile-drawer-actions block not found`);
    allPassed = false;
  } else {
    const block = actionMatch[1];
    if (!block.includes('toggle-dir') || !block.includes('rtl-label')) {
      console.error(`FAIL: ${f} mobile-drawer-actions missing toggle-dir or rtl-label`);
      allPassed = false;
    }
    if (!block.includes('toggle-theme') || !block.includes('theme-icon')) {
      console.error(`FAIL: ${f} mobile-drawer-actions missing toggle-theme or theme-icon`);
      allPassed = false;
    }
    if (!block.includes('close-mobile-nav')) {
      console.error(`FAIL: ${f} mobile-drawer-actions missing close-mobile-nav`);
      allPassed = false;
    }
  }
}

if (allPassed) {
  console.log('SUCCESS: All 6 public pages passed mobile drawer checks with 100% compliance!');
}

