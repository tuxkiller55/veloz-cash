import eSolomo01Image from '../assets/biciElectrica/e-solomo-01.png';
import eSolomo02Image from '../assets/biciElectrica/e-solomo-02.png';
import eSolomo03Image from '../assets/biciElectrica/e-solomo-03.png';
import eSolomo04Image from '../assets/biciElectrica/e-solomo-04.png';
import eSolomoVideo from '../assets/biciElectrica/e-solomo-demo.mp4';

export const electricBikes = [
  {
    id: 'e-solomo',
    category: 'bikes',
    name: 'Bicicleta Electrica e-solomo',
    price: 10999,
    badge: 'e-solomo',
    specs: 'Carga soportada de 150 Kg.',
    image: eSolomo01Image,
    media: [
      { type: 'image', src: eSolomo01Image, alt: 'Bicicleta electrica e-solomo vista completa' },
      { type: 'image', src: eSolomo02Image, alt: 'Tablero de bicicleta electrica e-solomo' },
      { type: 'image', src: eSolomo03Image, alt: 'Asiento y parte trasera de bicicleta electrica e-solomo' },
      { type: 'image', src: eSolomo04Image, alt: 'Canastilla y faro de bicicleta electrica e-solomo' },
      { type: 'video', src: eSolomoVideo, poster: eSolomo01Image },
    ],
    financing: {
      downPayment: 1390,
      plans: {
        13: { weeklyPayment: 969 },
        26: { weeklyPayment: 676 },
      },
    },
  },
];
