import MealtyPic from '../asset/projects/mealty.png';
import WebMealtyPic from '../asset/projects/mealty_web.png';
import ToeflPensPic from '../asset/projects/toefl_pens.jpg';
import SiSabi from '../asset/projects/sisabi.png';
import Kammari from '../asset/projects/kammari.png';
import MachineLearning from '../asset/projects/machine_learning.jpg';

const portfolioData = [
  {
    id: '08',
    imgUrl: MealtyPic,
    title: 'Agile PdBL : Mealty App',
    description:
      'Crafted with React and Vite, our cutting-edge dashboard project features dynamic data visualization using Tremor components. Experience real-time insights and seamless user interaction, all powered by the latest web technologies.',
    tech: ['Flutter'],
    siteUrl: 'https://play.google.com/store/apps/details?id=com.development.mealty',
  },
  {
    id: '09',
    imgUrl: WebMealtyPic,
    title: 'Agile PdBL : Mealty Website',
    description:
      'Crafted with React and Vite, our cutting-edge dashboard project features dynamic data visualization using Tremor components. Experience real-time insights and seamless user interaction, all powered by the latest web technologies.',
    tech: ['Flutter, Supabase'],
    siteUrl: 'https://mealty.agileteknik.com/',
  },
  {
    id: '10',
    imgUrl: ToeflPensPic,
    title: 'Toefl PENS',
    description:
      'A modern TOEFL dashboard application developed using Flutter, featuring dynamic data visualization for real-time insights. Built with a focus on seamless performance and intuitive user interaction, this project combines Flutter’s flexibility with efficient state management and clean UI design.',
    tech: ['Flutter, Supabase'],
    siteUrl: 'https://github.com/jhiven/toefl_app',
  },
  {
    id: '11',
    imgUrl: SiSabi,
    title: 'Bank Indonesia KPW Jatim System Monitoring ',
    description:
      'Crafted with React and Vite, our cutting-edge dashboard project features dynamic data visualization using Tremor components. Experience real-time insights and seamless user interaction, all powered by the latest web technologies.',
    tech: ['NextJS, Tailwind, MongoDB'],
    siteUrl: 'https://mealty.agileteknik.com/',
  },
  {
    id: '12',
    imgUrl: Kammari,
    title: 'Kammari — a simple and efficient web-based Point of Sales application.',
    description:
      'Kammari is a web-based Point of Sales (POS) application built with Laravel, a powerful PHP framework. Designed for simplicity and efficiency, Kammari helps businesses manage sales, inventory, and customer data seamlessly. Leveraging Laravel’s robust features, it ensures security, scalability, and easy maintenance. Perfect for small to medium businesses looking for a reliable and modern POS solution powered by Laravel.',
    tech: ['Laravel'],
    siteUrl: 'https://github.com/RobyArjuna/kammari-project',
  },
  {
    id: '13',
    imgUrl: MachineLearning,
    title: 'Object Detection — a real-time object detection system with custom dataset.',
    description:
      'This project is a real-time object detection system built using Python, YOLO (You Only Look Once), and OpenCV. It utilizes a custom-trained YOLO model with a tailored dataset to detect specific objects in images and video streams. Designed for accuracy and speed, the system processes frames in real-time while ensuring reliable detection performance. Ideal for applications in surveillance, monitoring, or smart automation solutions.',
    tech: ['Python', 'YOLO', 'OpenCV', 'NumPy'],
    siteUrl: 'https://machinelearning.meetaza.com/',
  },
];

export default portfolioData;
