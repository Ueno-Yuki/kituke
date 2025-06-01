import Image from 'next/image';
import styles from '../styles/ServiceSection.module.css';

const services = [
  {
    id: '1',
    name: '成人式の着付け',
    price: '¥15,000〜',
    image: '/service1.jpg',
    description: '振袖の着付けからヘアメイクまで、トータルコーディネートいたします。',
  },
  {
    id: '2',
    name: '七五三の着付け',
    price: '¥10,000〜',
    image: '/service2.jpg',
    description: 'お子様の着付けから、ご家族の着付けまで承ります。',
  },
  {
    id: '3',
    name: '結婚式の着付け',
    price: '¥25,000〜',
    image: '/service3.jpg',
    description: '花嫁様の着付けから、ご列席の方の着付けまで対応いたします。',
  },
];

export default function ServiceSection() {
  return (
    <section className={styles.services}>
      <h2>サービス内容</h2>
      <div className={styles.serviceGrid}>
        {services.map((service) => (
          <div key={service.id} className={styles.serviceCard}>
            <Image
              src={service.image}
              alt={service.name}
              width={300}
              height={200}
              className={styles.serviceImage}
            />
            <h3>{service.name}</h3>
            <p>{service.description}</p>
            <p className={styles.price}>{service.price}</p>
          </div>
        ))}
      </div>
    </section>
  );
} 