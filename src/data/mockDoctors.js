const now = new Date().toISOString();
export default [
  {
    id: 'd1',
    name: 'Иван Петров',
    specialty: 'Терапевт',
    experience: 8,
    avatar: null,
    rating: 4.5,
    reviews: [
      {id:'r1', userId:'u1', userName:'Андрей', stars:5, text:'Очень внимательный врач', date: now},
      {id:'r2', userId:'u2', userName:'Ольга', stars:4, text:'Хороший прием', date: now},
    ],
    about: 'Доктор общей практики, специализируется на терапии взрослых.'
  },
  {
    id: 'd2',
    name: 'Мария Сидорова',
    specialty: 'Дерматолог',
    experience: 5,
    avatar: null,
    rating: 4.2,
    reviews: [],
    about: 'Опытный дерматолог с фокусом на эстетические процедуры.'
  },
  {
    id: 'd3',
    name: 'Павел Кузнецов',
    specialty: 'Хирург',
    experience: 12,
    avatar: null,
    rating: 4.8,
    reviews: [],
    about: 'Стажирующий хирург, специализация — общая хирургия.'
  }
];
