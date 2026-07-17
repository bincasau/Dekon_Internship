export type Course = {
  id: number;
  title: string;
  description: string;
  completedLessons: number;
  totalLessons: number;
  icon: string;
};

export type PopularCourse = {
  tag: string;
  title: string;
  lessons: number;
  rating: string;
  image: string;
};
