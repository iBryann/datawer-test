import { GridRowsProp, GridColDef } from '@mui/x-data-grid';

export const COLUMNS: GridColDef[] = [
  { field: 'id', headerName: 'ID', flex: 1 },
  { field: 'name', headerName: 'Name', flex: 1 },
  { field: 'email', headerName: 'E-mail', flex: 1 },
  {
    field: 'qualifications',
    headerName: 'Qualifications',
    flex: 1,
  },
];

export const ROWS: GridRowsProp = [
  {
    id: 'e20d0d28-4a56-4d1b-9d01-c6f76fa1aac7',
    createdAt: '2025-05-29T15:36:47.399Z',
    updatedAt: '2025-05-29T15:36:47.399Z',
    name: 'Lucas Andrade',
    email: 'lucas.andrade@example.com',
    qualifications: 'Engenheiro de Software',
  },
  {
    id: 'cd5693bc-a733-473f-8398-a87e1b0b4652',
    createdAt: '2025-05-29T15:36:47.399Z',
    updatedAt: '2025-05-29T15:36:47.399Z',
    name: 'Mariana Silva',
    email: 'mariana.silva@example.com',
    qualifications: 'Designer Gráfico',
  },
  {
    id: '26730812-4d8a-4714-b3b4-385f26e146b8',
    createdAt: '2025-05-29T15:36:47.399Z',
    updatedAt: '2025-05-29T15:36:47.399Z',
    name: 'Bruno Oliveira',
    email: 'bruno.oliveira@example.com',
    qualifications: 'Médico Veterinário',
  },
  {
    id: 'c7374182-1a3d-4911-babe-2d1dbca7a603',
    createdAt: '2025-05-29T15:36:47.399Z',
    updatedAt: '2025-05-29T15:36:47.399Z',
    name: 'Carla Mendes',
    email: 'carla.mendes@example.com',
    qualifications: 'Arquiteta',
  },
  {
    id: '92c318d2-9d7e-4bba-b66e-4570b2831f98',
    createdAt: '2025-05-29T15:36:47.399Z',
    updatedAt: '2025-05-29T15:36:47.399Z',
    name: 'Rafael Souza',
    email: 'rafael.souza@example.com',
    qualifications: 'Professor de História',
  },
];
