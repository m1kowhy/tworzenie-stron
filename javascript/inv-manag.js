let inventory=[]; 
function findProductIndex(productName){return inventory.findIndex(product=>product.name.toLowerCase()===productName.toLowerCase())} 
function addProduct(product){ 
  let index=findProductIndex(product.name.toLowerCase()); 
  if(index!==-1){ 
    inventory[index].quantity+=product.quantity; 
    console.log(`${product.name.toLowerCase()} quantity updated`)} 
  else{ 
    inventory.push({name:product.name.toLowerCase(),quantity:product.quantity}); 
    console.log(`${product.name.toLowerCase()} added to inventory`)} 
} 
function removeProduct(productName,quantity){ 
  let index=findProductIndex(productName.toLowerCase()); 
  if(index===-1){ 
    console.log(`${productName.toLowerCase()} not found`)} 
  else{ 
    if(inventory[index].quantity>=quantity){ 
      inventory[index].quantity-=quantity; 
      if(inventory[index].quantity===0){ 
        inventory.splice(index,1)} 
      console.log(`Remaining ${productName.toLowerCase()} pieces: ${inventory[index]?.quantity||0}`)} 
    else{ 
      console.log(`Not enough ${productName.toLowerCase()} available, remaining pieces: ${inventory[index].quantity}`)}} 
}

