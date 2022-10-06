import { workoutTypes } from '../../src/types/types';

export default [
  {
    chainId: 1,
    isToday: true,
    type: workoutTypes.STRENGHT,
  },
  {
    chainId: 1,
    isToday: false,
    type: workoutTypes.ENDURANCE,
  },
  {
    chainId: 1,
    type: workoutTypes.CYCLING,
  },
  {
    chainId: 2,
    type: workoutTypes.AERO,
  },
  {
    chainId: 3,
    type: workoutTypes.STRENGHT,
  },
  {
    chainId: 4,
  },
];
