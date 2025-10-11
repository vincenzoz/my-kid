import {Section} from '../../models/enums/current-section.enum';

export interface SectionConfig {
  title: string;
  bgColor: string;
  border: string;
  borderTopColor: string;
  text: string;
  outline: string;
  icon: string;
}

export const SECTION_CONFIGS: Record<Section, SectionConfig> = {
  [Section.SCHOOL]: {
    title: 'Scuola',
    bgColor: 'bg-school',
    border: 'border-b-school-dark',
    borderTopColor: 'border-t-school',
    text: 'text-school-dark',
    outline: 'outline-school-dark',
    icon: '/icons/school.svg',
  },
  [Section.HEALTH]: {
    title: 'Salute',
    bgColor: 'bg-health',
    border: 'border-b-health-dark',
    borderTopColor: 'border-t-health-dark',
    text: 'text-health-dark',
    outline: 'outline-health-dark',
    icon: '/icons/health.svg',
  },
  [Section.DIARY]: {
    title: 'Diario',
    bgColor: 'bg-diary',
    border: 'border-b-diary-dark',
    borderTopColor: 'border-t-diary',
    text: 'text-diary-dark',
    outline: 'outline-diary-dark',
    icon: '/icons/diary.svg',
  },
  [Section.SPORT]: {
    title: 'Sport',
    bgColor: 'bg-sport',
    border: 'border-b-sport-dark',
    borderTopColor: 'border-t-sport',
    text: 'text-sport-dark',
    outline: 'outline-sport-dark',
    icon: '/icons/sport.svg',
  },
};
