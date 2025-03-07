export const calculateProduction = (inputs) => {
    const machines = [
      { protein: 10, electricity: 2 },
      { protein: 20, electricity: 5 },
      { protein: 35, electricity: 10 },
      { protein: 50, electricity: 15 },
      { protein: 100, electricity: 40 }
    ];
  
    let totalProtein = 0;
    let totalElectricity = 0;
  
    inputs.forEach((value, index) => {
      const runs = Number(value) || 0;
      totalProtein += runs * machines[index].protein;
      totalElectricity += runs * machines[index].electricity;
    });
  
    return {
      valid: totalElectricity <= 50,
      protein: totalProtein,
      electricity: totalElectricity
    };
  };
  