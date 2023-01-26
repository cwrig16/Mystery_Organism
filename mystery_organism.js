// Returns a random DNA base
const returnRandBase = () => {
  const dnaBases = ['A', 'T', 'C', 'G'];
  return dnaBases[Math.floor(Math.random() * 4)];
};

// Returns a random single stand of DNA containing 15 bases
const mockUpStrand = () => {
  const newStrand = [];
  for (let i = 0; i < 15; i++) {
    newStrand.push(returnRandBase());
  }
  return newStrand;
};

// Factory function to create multiple objects more easily.
const pAequorFactory = (id, dnaArray) => {
  return {
    id,
    dnaArray,
    // mutate() changes a random base in the DNA sequence
    mutate() {
      let mutation = dnaArray;
      let indexToChange = Math.floor(Math.random() * 15);
      let base = dnaArray[indexToChange]
      do {
        newBase = returnRandBase();
        mutation[indexToChange] = newBase;
      }
      while (newBase === base);
      return mutation;
    },
    // compareDNA() compares DNA sequence of this object to another object given as the argument and returns how closely the two DNAs are related.
    compareDNA(pAequor) {
      let matches = 0;
      for (i = 0; i < this.dnaArray.length; i++) {
        if (dnaArray[i] === pAequor.dnaArray[i]) {
          matches += 1;
        }
      }
      console.log(`Specimen #${this.id} and specimen #${pAequor.id} have ${((matches/15) * 100).toFixed(2)}% DNA in common.`);
    },
    // willLikelySurvive() calculates whether an object will survive based on its DNA sequence.  A DNA sequence consisting of at least 60% 'C' or 'G' bases is likely to survive.
    willLikelySurvive() {
      let cOrG = 0;
      for (i of this.dnaArray) {
        if (i === 'C' || i === 'G') {
          cOrG += 1;
        }
      }
      let survivalPercentage = ((cOrG/15) * 100).toFixed(2)
      if (survivalPercentage >= 60) {
        return true;
      }
      else return false;
    }
  }
};

// Creates 30 instances of pAequor which can survive and stores the objects in an array.
const thirtypAequors = () => {
  let thirtyInstances = [];
  let uniqueID = 100
  do { 
    let presentpAequor = pAequorFactory(uniqueID, mockUpStrand());
    uniqueID += 1
    if (presentpAequor.willLikelySurvive()) {
      thirtyInstances.push(presentpAequor);
    }
  }
  while (thirtyInstances.length < 30);
  return thirtyInstances;
};