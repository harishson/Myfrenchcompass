import { type SchemaTypeDefinition } from 'sanity'
import { batch } from './batch'

/* Only one type on this project — do not invent others (brief). */
export const schema: { types: SchemaTypeDefinition[] } = {
  types: [batch],
}
