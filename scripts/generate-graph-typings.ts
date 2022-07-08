import { GraphQLDefinitionsFactory } from '@nestjs/graphql';
import { join } from 'path';

const definitionsFactory = new GraphQLDefinitionsFactory();

definitionsFactory.generate({
  typePaths: ['../src/**/*.graphql'],
  path: join(process.cwd(), '../src/graphql/graphql.ts'),
  watch: true,
  outputAs: 'class',
});
