let lunches = [];
function addLunchToEnd(menu, item) { 
  menu.push(item);
  console.log(`${item} added to the end of the lunch menu.`);
  return menu;
}
function addLunchToStart(menu, item) { 
  menu.unshift(item);
  console.log(`${item} added to the start of the lunch menu.`); 
  return menu; 
}
function removeLastLunch(menu) { 
  if (menu.length === 0) {
    console.log("No lunches to remove."); 
    return menu;
  }
  const removed = menu.pop();
  console.log(`${removed} removed from the end of the lunch menu.`); 
  return menu; 
}
function removeFirstLunch(menu) { 
  if (menu.length === 0) {
    console.log("No lunches to remove."); 
    return menu;
  }
  const removed = menu.shift();
  console.log(`${removed} removed from the start of the lunch menu.`);
  return menu; 
}
function getRandomLunch(menu) { 
  if (menu.length === 0) {
    console.log("No lunches available."); 
    return;
  }
  const randomIndex = Math.floor(Math.random() * menu.length);
  console.log(`Randomly selected lunch: ${menu[randomIndex]}`); 
}
function showLunchMenu(menu) { 
  if (menu.length === 0) {
    console.log("The menu is empty."); 
  } else {
    console.log(`Menu items: ${menu.join(", ")}`); 
  }
}

