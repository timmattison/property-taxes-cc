import React, { FC } from 'react'
import PropTypes from 'prop-types'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'

import { PropertyTaxDetailList } from 'src/components/property-tax-detail-list'
import { z } from 'zod'
import { CardContent } from '@mui/material'
import { RolledUpParcelSchema } from '../../types/property'

export const PropertyBasicDetailsSchema = RolledUpParcelSchema

export type PropertyBasicDetailsProps = Partial<
  z.infer<typeof PropertyBasicDetailsSchema>
>

export const PropertyDetails: FC<PropertyBasicDetailsProps> = (props) => {
  return (
    <Card>
      <CardHeader title="Details" />
      <CardContent>
        <PropertyTaxDetailList propertyDetails={props} />
      </CardContent>
    </Card>
  )
}

PropertyDetails.propTypes = {
  topParcelId: PropTypes.string,
  propertyLocation: PropTypes.string,
  currentOwnersName: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  totalTaxes: PropTypes.number,
}
