import {Entity, model, property} from '@loopback/repository';

@model({
  name: 'family_apg',
})
export class FamilyApg extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'string',
    required: true,
  })
  name: string;


  constructor(data?: Partial<FamilyApg>) {
    super(data);
  }
}

export interface FamilyApgRelations {
  // describe navigational properties here
}

export type FamilyApgWithRelations = FamilyApg & FamilyApgRelations;
