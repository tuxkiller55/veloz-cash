import EB03Image from '../assets/biciElectrica/EB_03.jpeg';
import EB04Image from '../assets/biciElectrica/EB_04.jpeg';
import EB39Image from '../assets/biciElectrica/EB39.jpeg';
import EB40Image from '../assets/biciElectrica/EB40.jpeg';

export const electricBikes = [
  {
    id: 'urban-lite',
    category: 'bikes',
    name: 'Bicicleta Electrica modelo EB-03',
    price: 8999,
    badge: 'Ciudad',
    specs: 'Carga soportada de 150 Kg limitada a solo 35 km por carga.',
    image: EB03Image,
  },
  {
    id: 'urban-lite2',
    category: 'bikes',
    name: 'Bicicleta Electrica modelo EB-04',
    price: 7499,
    badge: 'Ciudad',
    specs: 'Carga soportada de 120 Kg, motor de 350W, velocidad maxima 25 Km/H.',
    image: EB04Image,
  },
  {
    id: 'work-pro',
    category: 'bikes',
    name: 'Bicicleta Electrica modelo EB39',
    price: 17999,
    badge: 'Trabajo',
    specs: 'Pensada para repartos, autonomia de 45 a 60 Km, con velocidad maxima de 35 Km/h, peso soportado de 150 Kg.',
    image: EB39Image,
  },
  {
    id: 'work-pro2',
    category: 'bikes',
    name: 'Bicicleta Electrica modelo EB40',
    price: 17999,
    badge: 'Trabajo',
    specs: 'Soporta hasta 150 Kg de peso, Motor de 500W una bateria de 48V/20AH dando una autonomia de 45 a 60 Km.',
    image: EB40Image,
  }
];
