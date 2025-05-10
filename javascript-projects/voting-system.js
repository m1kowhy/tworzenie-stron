
let poll = new Map();


function addOption(option) {
    if (option === "") {
        return "Option cannot be empty.";
    }
    if (!poll.has(option)) {
        poll.set(option, new Set());
        return `Option "${option}" added to the poll.`;
    } else {
        return `Option "${option}" already exists.`;
    }
}


function vote(option, voterId) {
    if (!poll.has(option)) {
        return `Option "${option}" does not exist.`;
    }
    
    const voters = poll.get(option);
    if (voters.has(voterId)) {
        return `Voter ${voterId} has already voted for "${option}".`;
    }
    
    voters.add(voterId);
    return `Voter ${voterId} voted for "${option}".`;
}


function displayResults() {
    let result = "Poll Results:\n";
    for (let [option, voters] of poll) {
        result += `${option}: ${voters.size} votes\n`;
    }
    return result.trim(); 
}


console.log(addOption("Turkey"));  
console.log(addOption("Morocco")); 
console.log(addOption("USA"));    
console.log(addOption("Turkey")); 

console.log(vote("Turkey", 1));  
console.log(vote("Turkey", 2));   
console.log(vote("Morocco", 3)); 
console.log(vote("USA", 4)); 
console.log(vote("USA", 1));
console.log(vote("Turkey", 1));   
console.log(displayResults());



