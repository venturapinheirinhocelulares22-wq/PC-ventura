/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Store, Review } from './types';

// Import local store images (Request 4 reverse ordered mapping)
import storeImg0 from './assets/images/regenerated_image_1780162263222.jpg';
import storeImg1 from './assets/images/regenerated_image_1780162262396.jpg';
import storeImg2 from './assets/images/regenerated_image_1780162261287.jpg';
import storeImg3 from './assets/images/regenerated_image_1780162260623.jpg';
import storeImg4 from './assets/images/regenerated_image_1780162259479.jpg';
import storeImg5 from './assets/images/regenerated_image_1780162258867.jpg';
import storeImg6 from './assets/images/regenerated_image_1780162257777.jpg';
import storeImg7 from './assets/images/regenerated_image_1780162257183.jpg';
import storeImg8 from './assets/images/regenerated_image_1780162256179.jpg';
import storeImg9 from './assets/images/regenerated_image_1780162255531.jpg';
import storeImg10 from './assets/images/regenerated_image_1780162254962.jpg';
import storeImg11 from './assets/images/regenerated_image_1780162253362.jpg';
import storeImg12 from './assets/images/regenerated_image_1780162252732.jpg';
import storeImg13 from './assets/images/regenerated_image_1780162252167.jpg';
import storeImg14 from './assets/images/regenerated_image_1780162251232.jpg';
import storeImg15 from './assets/images/regenerated_image_1780162250089.jpg';
import storeImg16 from './assets/images/regenerated_image_1780162249310.jpg';

// Import local client review images (Request 5 chronological mapping)
import revImg0 from './assets/images/regenerated_image_1780162435740.jpg';
import revImg1 from './assets/images/regenerated_image_1780162436926.jpg';
import revImg2 from './assets/images/regenerated_image_1780162443597.jpg';
import revImg3 from './assets/images/regenerated_image_1780162445194.jpg';

// Pinheirinho Celulares official stores in Curitiba Metropolitan key locations
export const STORES_DATA: Store[] = [
  {
    id: 'sitio-cercado-osternack',
    name: 'Sítio Cercado / Osternack',
    address: 'R. Eduardo Pinto da Rocha, 2874 - Sítio Cercado - Curitiba - PR, 81935-000',
    city: 'Curitiba',
    hours: 'Segunda à Sábado — 9h00 às 19h00 | Domingo — Fechado',
    whatsapp: '41991573958',
    whatsappUrl: 'https://wa.me/5541991573958?text=Ol%C3%A1%21+Gostaria+de+agendar+meu+atendimento+na+unidade+S%C3%ADtio+Cercado+/+Osternack%21',
    imageUrl: storeImg0
  },
  {
    id: 'sitio-cercado-sao-jose',
    name: 'Sítio Cercado (R. São José)',
    address: 'R. São José dos Pinhais, 1179 Sítio Cercado – Curitiba - Paraná',
    city: 'Curitiba',
    hours: 'Segunda à Sexta — 9h00 às 19h00 | Sábado — 9h00 às 18h00',
    whatsapp: '41991573958',
    whatsappUrl: 'https://wa.me/5541991573958?text=Ol%C3%A1%21+Gostaria+de+agendar+meu+atendimento+na+unidade+S%C3%ADtio+Cercado%21',
    imageUrl: storeImg1,
    phone: '(41) 3308-1789'
  },
  {
    id: 'shopping-pinheirinho',
    name: 'Shopping Pinheirinho',
    address: 'Av. Winston Churchill, 2630 Pinheirinho – Curitiba – Paraná',
    city: 'Curitiba',
    hours: 'Segunda à Sexta — 9h00 às 19h00 | Sábado — 9h00 às 18h00',
    whatsapp: '41933008539',
    whatsappUrl: 'https://wa.me/5541933008539?text=Ol%C3%A1%21+Gostaria+de+agendar+meu+atendimento+no+Shopping+Pinheirinho%21',
    imageUrl: storeImg2,
    phone: '(41) 3247-0032'
  },
  {
    id: 'shopping-jardim-americas',
    name: 'Shopping Jardim das Américas',
    address: 'Av. Nossa Sra. de Lourdes, 63 - Jardim das Américas, Curitiba - PR, 81530-020 Segundo piso',
    city: 'Curitiba',
    hours: 'Segunda à Sábado — 10h00 às 22h00 | Domingo — 12h00 às 20h00',
    whatsapp: '41999146774',
    whatsappUrl: 'https://wa.me/5541999146774?text=Ol%C3%A1%21+Gostaria+de+agendar+meu+atendimento+no+Shopping+Jardim+das+Am%C3%A9ricas%21',
    imageUrl: storeImg3
  },
  {
    id: 'praca-rui-barbosa',
    name: 'Praça Rui Barbosa',
    address: 'Praca Rui Barbosa, 793',
    city: 'Curitiba',
    hours: 'Segunda à Sexta — 9h00 às 19h00 | Sábado — 9h00 às 18h00',
    whatsapp: '41984689154',
    whatsappUrl: 'https://wa.me/5541984689154?text=Ol%C3%A1%21+Gostaria+de+agendar+meu+atendimento+na+Pra%C3%A7a+Rui+Barbosa%21',
    imageUrl: storeImg4
  },
  {
    id: 'shopping-ventura-loja-404',
    name: 'Shopping Ventura (Loja 404)',
    address: 'Shopping Ventura loja 404 Corredor vermelho',
    city: 'Curitiba',
    hours: 'Segunda à Sábado — 10h00 às 22h00 | Domingo — 12h00 às 20h00',
    whatsapp: '41920025785',
    whatsappUrl: 'https://wa.me/5541920025785?text=Ol%C3%A1%21+Gostaria+de+agendar+meu+atendimento+no+Shopping+Ventura%21',
    imageUrl: storeImg5
  },
  {
    id: 'nicola-pellanda',
    name: 'Nicola Pellanda',
    address: 'R. Nicola Pellanda, 1256 – Loja 02 Umbará – Curitiba – Paraná',
    city: 'Curitiba',
    hours: 'Segunda à Sexta — 9h00 às 19h00 | Sábado — 9h00 às 18h00',
    whatsapp: '41985022602',
    whatsappUrl: 'https://wa.me/5541985022602?text=Ol%C3%A1%21+Gostaria+de+agendar+meu+atendimento+na+Nicola+Pellanda%21',
    imageUrl: storeImg6,
    phone: '(41) 3049-5184'
  },
  {
    id: 'muffato-portao',
    name: 'Muffato Portão',
    address: 'R. Eduardo Carlos Pereira, 3605 - Portão Curitiba - PR, 81020-235 loja 14 e 15',
    city: 'Curitiba',
    hours: 'Segunda à Sábado — 08h00 às 22h00 | Domingo e Feriados— 08h00 às 20h00',
    whatsapp: '41920036347',
    whatsappUrl: 'https://wa.me/5541920036347?text=Ol%C3%A1%21+Gostaria+de+agendar+meu+atendimento+no+Muffato+Port%C3%A3o%21',
    imageUrl: storeImg7
  },
  {
    id: 'muffato-max-roca-grande',
    name: 'Muffato Max Roça Grande',
    address: 'Av. São Gabriel, 647 - Roça Grande Colombo - PR',
    city: 'Colombo',
    hours: 'Segunda à Sábado — 08h00 às 22h00 | Domingo e Feriados— 08h00 às 20h00',
    whatsapp: '41920037081',
    whatsappUrl: 'https://wa.me/5541920037081?text=Ol%C3%A1%21+Gostaria+de+agendar+meu+atendimento+no+Muffato+Max+Ro%C3%A7a+Grande%21',
    imageUrl: storeImg8
  },
  {
    id: 'muffato-max-pinheirinho',
    name: 'Muffato Max Pinheirinho',
    address: 'R. Lothário Boutin, 554 Pinheirinho – Curitiba – Paraná',
    city: 'Curitiba',
    hours: 'Segunda à Sábado — 08h00 às 22h00 | Domingo e Feriados— 08h00 às 20h00',
    whatsapp: '41998931004',
    whatsappUrl: 'https://wa.me/5541998931004?text=Ol%C3%A1%21+Gostaria+de+agendar+meu+atendimento+no+Muffato+Max+Pinheirinho%21',
    imageUrl: storeImg9,
    phone: '(41) 3153-2854'
  },
  {
    id: 'muffato-max-pinhais',
    name: 'Muffato Max Pinhais',
    address: 'Av. Ayrton Senna da Silva, 2806 – Lj 03 Estância Pinhais – Pinhais – Paraná',
    city: 'Pinhais',
    hours: 'Segunda à Sábado — 08h00 às 22h00 | Domingo e Feriados— 08h00 às 20h00',
    whatsapp: '41995098857',
    whatsappUrl: 'https://wa.me/5541995098857?text=Ol%C3%A1%21+Gostaria+de+agendar+meu+atendimento+no+Muffato+Max+Pinhais%21',
    imageUrl: storeImg10
  },
  {
    id: 'muffato-max-vila-hauer',
    name: 'Muffato Max - Vila Hauer',
    address: 'Rua Tenente Francisco Ferreira de Souza, 645 - Hauer, Curitiba - PR, 81630-010',
    city: 'Curitiba',
    hours: 'Segunda à Sábado — 08h00 às 22h00 | Domingo e Feriados— 08h00 às 20h00',
    whatsapp: '41991824465',
    whatsappUrl: 'https://wa.me/5541991824465?text=Ol%C3%A1%21+Gostaria+de+agendar+meu+atendimento+no+Muffato+Max+-+Vila+Hauer%21',
    imageUrl: storeImg11
  },
  {
    id: 'muffato-max-taruma',
    name: 'Muffato Max - Tarumã',
    address: 'Av. Victor Ferreira do Amaral, 1088 - Tarumã, Curitiba - PR, 82530-230',
    city: 'Curitiba',
    hours: 'Segunda à Sábado — 09h00 às 19h00 | Domingo — 09h00 às 19h00',
    whatsapp: '41999326893',
    whatsappUrl: 'https://wa.me/5541999326893?text=Ol%C3%A1%21+Gostaria+de+agendar+meu+atendimento+no+Muffato+Max+-+Tarum%C3%A3%21',
    imageUrl: storeImg12
  },
  {
    id: 'matriz',
    name: 'Matriz Pinheirinho',
    address: 'Av. Winston Churchill, 2412 Pinheirinho – Curitiba – Paraná',
    city: 'Curitiba',
    hours: 'Segunda à Sexta — 9h00 às 19h00 | Sábado — 9h00 às 18h00',
    whatsapp: '41992678941',
    whatsappUrl: 'https://wa.me/5541992678941?text=Ol%C3%A1%21+Gostaria+de+agendar+meu+atendimento+na+Matriz%21',
    imageUrl: storeImg13,
    phone: '(41) 3268-3091'
  },
  {
    id: 'loja-xaxim',
    name: 'Loja Xaxim',
    address: 'R. Francisco Derosso, 3073 Xaxim – Curitiba – Paraná',
    city: 'Curitiba',
    hours: 'Segunda à Sexta — 9h00 às 19h00 | Sábado — 9h00 às 18h00',
    whatsapp: '41920025293',
    whatsappUrl: 'https://wa.me/5541920025293?text=Ol%C3%A1%21+Gostaria+de+agendar+meu+atendimento+na+Loja+Xaxim%21',
    imageUrl: storeImg14
  },
  {
    id: 'loja-izaac',
    name: 'Loja Izaac',
    address: 'R. Izaac Ferreira da Cruz, 2750 Sítio Cercado - Curitiba - PR',
    city: 'Curitiba',
    hours: 'Segunda à Sexta — 9h00 às 19h00 | Sábado — 9h00 às 18h00',
    whatsapp: '41995652823',
    whatsappUrl: 'https://wa.me/5541995652823?text=Ol%C3%A1%21+Gostaria+de+agendar+meu+atendimento+na+Loja+Izaac%21',
    imageUrl: storeImg15,
    phone: '(41) 3264-9168'
  },
  {
    id: 'centro-sao-jose-dos-pinhais',
    name: 'Centro São José dos Pinhais',
    address: 'R. XV de Novembro, 1851 - Centro - São José dos Pinhais - PR, 83005-000',
    city: 'São José dos Pinhais',
    hours: 'Segunda à Sábado — 9h00 às 18h00 | Domingo — Fechado',
    whatsapp: '41996209177',
    whatsappUrl: 'https://wa.me/5541996209177?text=Ol%C3%A1%21+Gostaria+de+agendar+meu+atendimento+na+unidade+Centro+S%C3%A3o+Jos%C3%A9+dos+Pinhais%21',
    imageUrl: storeImg16
  }
];

// Satisfied customer reviews inside stores with realistic photos
export const REVIEWS_DATA: Review[] = [
  {
    id: 'rev-1',
    clientName: 'Matheus Henrique',
    text: 'Fiz minha pré-análise online de manhã, agendei na Matriz Pinheirinho e saí de tarde com meu iPhone 15 Pro Max financiado sem nenhuma complicação! Recomendo muito!',
    stars: 5,
    imageUrl: revImg0,
    tag: 'Cliente Matriz'
  },
  {
    id: 'rev-2',
    clientName: 'Ana Cláudia Silva',
    text: 'Atendimento nota mil! O pessoal tirou todas as minhas dúvidas e o parcelamento no boleto coube perfeitamente no meu orçamento. O melhor suporte de Curitiba!',
    stars: 5,
    imageUrl: revImg1,
    tag: 'Cliente Ventura Shopping'
  },
  {
    id: 'rev-3',
    clientName: 'Ronaldo Peixoto',
    text: 'Sem burocracia nenhuma. Achei que não seria aprovado por ter score baixo, mas eles facilitam de verdade. Levei meu Motorola Zero Km para casa no mesmo dia!',
    stars: 5,
    imageUrl: revImg2,
    tag: 'Cliente Sítio Cercado'
  },
  {
    id: 'rev-4',
    clientName: 'Carla Vasconcellos',
    text: 'O atendimento no Whatsapp foi super ágil depois da pré-análise e o agendamento evitou qualquer fila. Já é o terceiro celular que nossa família compra aqui!',
    stars: 5,
    imageUrl: revImg3,
    tag: 'Cliente Jardim das Américas'
  }
];
