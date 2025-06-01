import Image from 'next/image';
import styles from '../styles/InstructorSection.module.css';

const instructors = [
  {
    id: '1',
    name: '山田 美咲',
    image: '/instructor1.jpg',
    experience: '着付け師歴15年',
    description: '成人式、七五三、結婚式など、様々な場面での着付け経験が豊富です。',
  },
  {
    id: '2',
    name: '佐藤 和子',
    image: '/instructor2.jpg',
    experience: '着付け師歴10年',
    description: '特に振袖の着付けを得意としており、多くのお客様から好評をいただいています。',
  },
];

export default function InstructorSection() {
  return (
    <section className={styles.instructors}>
      <h2>着付け師紹介</h2>
      <div className={styles.instructorGrid}>
        {instructors.map((instructor) => (
          <div key={instructor.id} className={styles.instructorCard}>
            <Image
              src={instructor.image}
              alt={instructor.name}
              width={200}
              height={200}
              className={styles.instructorImage}
            />
            <h3>{instructor.name}</h3>
            <p className={styles.experience}>{instructor.experience}</p>
            <p>{instructor.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
} 