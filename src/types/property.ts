import * as data from '../data/data.json' assert { type: 'json' }
import { z } from 'zod'

const PropertyRecordSchema = z.object({
  parcelId: z.string(),
  currentOwnersName: z.array(z.string()),
  propertyLocation: z.string(),
  propertyClass: z.string(),
  fullMarketValue: z.number().nullable().optional().default(null),
  totalAssessment: z.number().nullable().optional().default(null),
  rawTaxes: z.record(z.number().nullable()).nullable().optional().default(null),
})

const CalculatedTaxSchema = z.object({
  note: z.string(),
  code: z.string(),
  calculatedValue: z.number(),
  explanation: z.string(),
  formula: z.string(),
  realValueFormula: z.string(),
})

const TownOrVillageParcelSchema = z.object({
  propertyRecord: PropertyRecordSchema,
  calculatedTaxes: z.array(CalculatedTaxSchema),
})

export const RolledUpParcelSchema = z.object({
  topParcelId: z.string(),
  propertyLocation: z.string(),
  currentOwnersName: z.array(z.string()),
  fullMarketValue: z.number(),
  villageParcels: z.array(TownOrVillageParcelSchema),
  townParcels: z.array(TownOrVillageParcelSchema),
  allTaxes: z.array(CalculatedTaxSchema),
  totalTaxes: z.number(),
  totalVillageAssessment: z.number(),
  totalTownAssessment: z.number(),
})

export type RolledUpParcelType = z.infer<typeof RolledUpParcelSchema>

const RolledUpParcelArraySchema = z.array(RolledUpParcelSchema)

export interface HasDefault {
  default: any
}

export const RolledUpParcels: RolledUpParcelType[] = RolledUpParcelArraySchema.parse(
  (data as any as HasDefault).default,
)
