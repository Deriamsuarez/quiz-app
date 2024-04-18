const shuffleData = (data, groupSize = 4) => {
    const shuffledArray = [...data];
    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
    }
  
    const groups = [];
    for (let i = 0; i < shuffledArray.length; i += groupSize) {
      groups.push(shuffledArray.slice(i, i + groupSize));
    }
  
    return groups;
  };
  
  export {shuffleData}