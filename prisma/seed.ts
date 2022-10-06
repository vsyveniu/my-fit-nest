import { PrismaClient } from '@prisma/client';
import commonExercises from './seeds/commonExercices';
import chains from './seeds/chains';
import days from './seeds/days';
import workouts from './seeds/workouts';
import exercisesOnWorkouts from './seeds/exercisesOnWorkouts';
import exercises from './seeds/exercises';

const prisma = new PrismaClient();

async function commonExercisesSeed() {
  try {
    console.log('CLEAR TABLE COMMONEXERCISES');
    const isClear = await prisma.commonExercise.deleteMany({});
    console.log('🚀 ~ file: seed.ts ~ line 9 ~ commonExercise ~ isClear', isClear);
    console.log('RESTART AUTOINCREMENT');
    const isRestarted = await prisma.$queryRaw`ALTER SEQUENCE "CommonExercise_id_seq" RESTART WITH 1`;
    console.log('🚀 ~ file: seed.ts ~ line 12 ~ commonExercise ~ isRestarted', isRestarted);

    for (let el of commonExercises) {
      console.log('🚀 ~ file: seed.ts ~ line 7 ~ main ~ el', el);
      await prisma.commonExercise.create({
        data: el,
      });
    }
  } catch (e) {
    console.log('ERROR IN COMMONEXERCICES');
    console.log('🚀 ~ file: seed.ts ~ line 16 ~ commonExercise ~ e', e);
  }
}

async function usersSeed() {
  try {
    const king = await prisma.user.upsert({
      where: { email: 'king@gmail.com' },
      update: {},
      create: {
        email: 'king@gmail.com',
        password: '42424242',
        phone: '380934450318',
      },
    });
    console.log('🚀 ~ file: seed.ts ~ line 66 ~ user ~ king', king);

    const negro = await prisma.user.upsert({
      where: { email: 'negro@gmail.com' },
      update: {},
      create: {
        email: 'n@gmail.com',
        password: '21212121',
        phone: '380633189508',
      },
    });
    console.log('🚀 ~ file: seed.ts ~ line 105 ~ user ~ negro', negro);

    const patrick = await prisma.user.upsert({
      where: { email: 'patrick@gmail.com' },
      update: {},
      create: {
        email: 'patrick@gmail.com',
        password: '24242424',
        phone: '380937572620',
      },
    });
    console.log('🚀 ~ file: seed.ts ~ line 145 ~ user ~ patrick', patrick);
  } catch (e) {
    console.log('ERROR IN USER');
    console.log('🚀 ~ file: seed.ts ~ line 16 ~ commonExercise ~ e', e);
  }
}

async function chainsSeed() {
  console.log('CLEAR TABLE CHAINS');
  const isClear = await prisma.chain.deleteMany({});
  console.log('🚀 ~ file: seed.ts ~ line 71 ~ chainsSeed ~ isClear', isClear);
  console.log('RESTART AUTOINCREMENT');
  const isRestarted = await prisma.$queryRaw`ALTER SEQUENCE "Chain_id_seq" RESTART WITH 1`;
  console.log('🚀 ~ file: seed.ts ~ line 74 ~ chainsSeed ~ isRestarted', isRestarted);

  try {
    for (const el of chains) {
      await prisma.chain.create({
        data: el,
      });
    }
    console.log('CHAINS CREATED');
  } catch (e) {
    console.log('🚀 ~ file: seed.ts ~ line 83 ~ chainsSeed ~ e', e);
  }
}

async function daysSeed() {
  console.log('CLEAR TABLE DAYS');
  const isClear = await prisma.day.deleteMany({});
  console.log('🚀 ~ file: seed.ts ~ line 90 ~ daysSeed ~ isClear', isClear);
  console.log('RESTART AUTOINCREMENT');
  const isRestarted = await prisma.$queryRaw`ALTER SEQUENCE "Day_id_seq" RESTART WITH 1`;
  console.log('🚀 ~ file: seed.ts ~ line 93 ~ daysSeed ~ isRestarted', isRestarted);

  try {
    for (const el of days) {
      await prisma.day.create({
        data: el,
      });
    }
    console.log('DAYS CREATED');
  } catch (e) {
    console.log('🚀 ~ file: seed.ts ~ line 102 ~ daysSeed ~ e', e);
  }
}

async function workoutsSeed() {
  console.log('CLEAR TABLE WORKOUTS');
  const isClear = await prisma.workout.deleteMany({});
  console.log('🚀 ~ file: seed.ts ~ line 112 ~ workoutsSeed ~ isClear', isClear);
  console.log('RESTART AUTOINCREMENT');
  const isRestarted = await prisma.$queryRaw`ALTER SEQUENCE "Workout_id_seq" RESTART WITH 1`;
  console.log('🚀 ~ file: seed.ts ~ line 115 ~ workoutsSeed ~ isRestarted', isRestarted);

  try {
    for (const el of workouts) {
      await prisma.workout.create({
        data: el,
      });
    }
    console.log('WORKOUTS CREATED');
  } catch (e) {
    console.log('🚀 ~ file: seed.ts ~ line 126 ~ workoutsSeed ~ e', e);
  }
}

async function exercisesSeed() {
  console.log('CLEAR TABLE EXERCISES');
  const isClear = await prisma.exercise.deleteMany({});
  console.log('🚀 ~ file: seed.ts ~ line 134 ~ exercisesSeed ~ isClear', isClear);
  console.log('RESTART AUTOINCREMENT');
  const isRestarted = await prisma.$queryRaw`ALTER SEQUENCE "Exercise_id_seq" RESTART WITH 1`;
  console.log('🚀 ~ file: seed.ts ~ line 137 ~ exercisesSeed ~ isRestarted', isRestarted);

  try {
    for (const el of exercises) {
      await prisma.exercise.create({
        data: el,
      });
    }
    console.log('WORKOUTS CREATED');
  } catch (e) {
    console.log('🚀 ~ file: seed.ts ~ line 147 ~ exercisesSeed ~ e', e);
  }
}

async function exercicesOnWorkoutsSeed() {
  console.log('CLEAR TABLE EXERCISES ON WORKOUTS');
  const isClear = await prisma.exercisesOnWorkouts.deleteMany({});
  console.log('🚀 ~ file: seed.ts ~ line 133 ~ exercicesOnWorkoutsSeed ~ isClear', isClear);

  try {
    for (const el of exercisesOnWorkouts) {
      await prisma.exercisesOnWorkouts.create({
        data: el,
      });
    }
    console.log('WORKOUTS CREATED');
  } catch (e) {
    console.log('🚀 ~ file: seed.ts ~ line 167 ~ exercicesOnWorkoutsSeed ~ e', e);
  }
}

async function main() {
  await commonExercisesSeed();
  await usersSeed();
  await chainsSeed();
  await daysSeed();
  await workoutsSeed();
  await exercisesSeed();
  await exercicesOnWorkoutsSeed();
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
