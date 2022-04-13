import { Candidate } from '../schema/candidate.schema';
import { Types } from 'mongoose';

export const candidateStub = (): Candidate => {
  return {
    _id: new Types.ObjectId(),
    name: 'Juan Tamad',
  };
};
