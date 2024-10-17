// recintoZoo.js
class RecintosZoo {
    constructor() {
      this.recintos = [
        { numero: 1, bioma: "savana", tamanho: 10, animais: [{ especie: "MACACO", quantidade: 3 }] },
        { numero: 2, bioma: "floresta", tamanho: 5, animais: [] },
        { numero: 3, bioma: "savana e rio", tamanho: 7, animais: [{ especie: "GAZELA", quantidade: 1 }] },
        { numero: 4, bioma: "rio", tamanho: 8, animais: [] },
        { numero: 5, bioma: "savana", tamanho: 9, animais: [{ especie: "LEAO", quantidade: 1 }] }
      ];
  
      this.animaisPermitidos = {
        LEAO: { tamanho: 3, bioma: ["savana"], carnivoro: true },
        LEOPARDO: { tamanho: 2, bioma: ["savana"], carnivoro: true },
        CROCODILO: { tamanho: 3, bioma: ["rio"], carnivoro: true },
        MACACO: { tamanho: 1, bioma: ["savana", "floresta"], carnivoro: false },
        GAZELA: { tamanho: 2, bioma: ["savana"], carnivoro: false },
        HIPOPOTAMO: { tamanho: 4, bioma: ["savana", "rio"], carnivoro: false },
      };
    }
  
    analisaRecintos(especie, quantidade) {
      if (!this.animaisPermitidos[especie]) {
        return { erro: "Animal inválido" };
      }
  
      if (typeof quantidade !== "number" || quantidade <= 0) {
        return { erro: "Quantidade inválida" };
      }
  
      const animalInfo = this.animaisPermitidos[especie];
      const tamanhoNecessario = animalInfo.tamanho * quantidade;
  
      const recintosViaveis = [];
  
      this.recintos.forEach((recinto) => {
        let espacoOcupado = recinto.animais.reduce((acc, animal) => {
          const infoAnimal = this.animaisPermitidos[animal.especie];
          return acc + (infoAnimal.tamanho * animal.quantidade);
        }, 0);
  
        if (!animalInfo.bioma.includes(recinto.bioma)) return;
  
        const temCarnivoro = recinto.animais.some(a => this.animaisPermitidos[a.especie].carnivoro);
        if (animalInfo.carnivoro && temCarnivoro && recinto.animais.length > 0) return;
        if (!animalInfo.carnivoro && temCarnivoro) return;
  
        if (recinto.animais.length > 0 && !animalInfo.carnivoro) {
          espacoOcupado += 1;
        }
  
        const espacoLivre = recinto.tamanho - espacoOcupado;
        if (espacoLivre >= tamanhoNecessario) {
          recintosViaveis.push({
            numero: recinto.numero,
            espacoLivre: espacoLivre - tamanhoNecessario,
            espacoTotal: recinto.tamanho
          });
        }
      });
  
      if (recintosViaveis.length === 0) {
        return { erro: "Não há recinto viável" };
      }
  
      recintosViaveis.sort((a, b) => a.numero - b.numero);
  
      return {
        recintosViaveis: recintosViaveis.map(recinto =>
          `Recinto ${recinto.numero} (espaço livre: ${recinto.espacoLivre}, total: ${recinto.espacoTotal})`
        )
      };
    }
  }
  
  export { RecintosZoo };
  