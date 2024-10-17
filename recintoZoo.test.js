// recintoZoo.test.js
import { RecintosZoo } from './recintoZoo';

describe('Testes para a função analisaRecintos', () => {
  let zoo;

  beforeEach(() => {
    zoo = new RecintosZoo();
  });

  test('Deve encontrar recinto viável para MACACO', () => {
    const resultado = zoo.analisaRecintos('MACACO', 2);
    expect(resultado.recintosViaveis).toContain('Recinto 2 (espaço livre: 5, total: 5)');
    expect(resultado.recintosViaveis).toContain('Recinto 3 (espaço livre: 3, total: 7)');
    expect(resultado.recintosViaveis).toContain('Recinto 5 (espaço livre: 7, total: 9)');
  });

  test('Deve encontrar recinto viável para LEAO', () => {
    const resultado = zoo.analisaRecintos('LEAO', 1);
    expect(resultado.recintosViaveis).toContain('Recinto 1 (espaço livre: 7, total: 10)');
    expect(resultado.recintosViaveis).toContain('Recinto 3 (espaço livre: 4, total: 7)');
    expect(resultado.recintosViaveis).toContain('Recinto 5 (espaço livre: 6, total: 9)');
  });

  test('Deve retornar erro para animal inválido', () => {
    const resultado = zoo.analisaRecintos('UNICORNIO', 1);
    expect(resultado.erro).toBe('Animal inválido');
  });

  test('Deve retornar erro para quantidade inválida', () => {
    const resultado = zoo.analisaRecintos('MACACO', -1);
    expect(resultado.erro).toBe('Quantidade inválida');
  });

  test('Não deve encontrar recinto viável quando todos estão ocupados', () => {
    zoo.recintos[0].animais.push({ especie: 'LEAO', quantidade: 1 });
    zoo.recintos[1].animais.push({ especie: 'MACACO', quantidade: 5 });
    zoo.recintos[2].animais.push({ especie: 'GAZELA', quantidade: 3 });
    zoo.recintos[3].animais.push({ especie: 'CROCODILO', quantidade: 2 });
    zoo.recintos[4].animais.push({ especie: 'HIPOPOTAMO', quantidade: 1 });

    const resultado = zoo.analisaRecintos('MACACO', 1);
    expect(resultado.erro).toBe('Não há recinto viável');
  });
});